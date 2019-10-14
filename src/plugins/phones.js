const phoneFormat = require("phoneformat.js");
/**
 * Gathers from numbers from a piece of text
 *
 * @class PhoneNumbers
 * @author George Meadows
 */
const regex = [
    /(\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10,13})/g,
    /(([+]\d{2}[ ][1-9]\d{0,2}[ ])|([0]\d{1,3}[-]))((\d{2}([ ]\d{2}){2})|(\d{3}([ ]\d{3})*([ ]\d{2})+))/g,
    /[+]44(7|1)\d{9}/g
];
class KnowPhones {

    /**
     * Gathers phone numbers from a string
     *
     * @returns  {Array}  All the numbers found
     * @memberof KnowPhones
     */
    main(lineList) {
        const numsFound = [];
        const toLookup = [];

        for (let i = 0; i < lineList.length; i++) {
            const line = lineList[i];

            const tel = this.grabHrefTel(line);
            if (tel) {
                numsFound.push(tel);
            }

            numsFound.push(...this.runRegex(line.replace(/\s/g, "")));

            const digits = line.replace(/[^\d+]/g, '');
            if (digits.length > 5) {
                toLookup.push(digits);
            }
        }

        numsFound.push(...this.validate(toLookup));


        const toReturn = [
            ...new Set(
                numsFound.map(
                    num => num.replace(/(?:\s|-|\.|\\|\(|\)|\/)/g, "")
                )
            )
        ];

        for (let i = 0; i < toReturn.length; i++) {
            const num = toReturn[i];
            if (num.startsWith("+440")) {
                if (toReturn.includes(num.replace("+440", "+44"))) {
                    toReturn.splice(i, 1);
                }
            }
        }
        // return the numbers, no duplicates
        return toReturn;
    }

    /**
     * From something which looks like a phone number
     * try and validate it
     *
     * @param {Array}  numbers  Array of numbers
     * @returns {Array}  Valid phone numbesr
     * @memberof KnowPhones
     */
    validate(numbers) {
        const validatedNumbers = [];

        for (let i = 0; i < numbers.length; i++) {
            const currentNumber = numbers[i];
            if (currentNumber.startsWith("+") || currentNumber.startsWith("00")) {
                const countryCode = phoneFormat.countryForE164Number(currentNumber);

                if(phoneFormat.isValidNumber(currentNumber, countryCode)) {
                    validatedNumbers.push(phoneFormat.formatE164(countryCode, currentNumber));
                }
            }
        }

        return validatedNumbers;
    }

    /**
     * Grabs the href="tel:xxxx" and tries to ensure its a phone number
     *
     * @param   {Array}    line  A line containing "tel:"
     * @returns {String}         The phone number (or null if not found)
     * @memberof KnowPhones
     */
    grabHrefTel(line) {
        if (!line.includes("tel:")) {
            return null;
        }

        const telWord = line.split("tel:").pop().replace(/\s/g, "").split("'")[0].split("\"")[0].split(",")[0];

        if (/[A-z<>"']/.test(telWord)) {
            return null;
        }

        return telWord;
    }

    /**
     * Run regex on a line, returning results and removing duplicates
     *
     * @param {String}  line  A word to run regex on
     * @returns {Array}  Phone numbers found via regex
     * @memberof KnowPhones
     */
    runRegex(line) {
        const results = [];
        for (let x = 0; x < regex.length; x++) {
            const currentRegex = regex[x];
            const matches = line.match(currentRegex) || line.replace(/-/g, "").match(currentRegex);
            if (matches) {
                results.push(...matches.map(num => num.replace(/-/g, "")));
            }
        }

        return [
            ... new Set(
                results.map(num => num.replace(/\s/g, ""))
            )
        ];
    }
}

module.exports = KnowPhones;
