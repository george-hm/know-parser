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
    main(lines) {
        const lineList = lines;
        const numsFound = [];

        for (let i = 0; i < lineList.length; i++) {
            const line = lineList[i];

            if (line.includes("tel:")) {
                const tel = this.grabHrefTel(line);

                if (tel) {
                    numsFound.push(tel);
                    continue;
                }
            }

            numsFound.push(...this.validate(line.replace(/\s/g, "")));
        }
        // return the numbers, no duplicates
        return [
            ...new Set(
                numsFound.map(
                    num => num.replace(/\s/g, "").replace(/-/g, "").replace(/\./g, "")
                )
            )
        ];
    }

    /**
     * Grabs the href="tel:xxxx" and tries to ensure its a phone number
     *
     * @param   {Array}    line  A line containing "tel:"
     * @returns {String}         The phone number (or null if not found)
     * @memberof KnowPhones
     */
    grabHrefTel(line) {
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
     * @returns
     * @memberof KnowPhones
     */
    validate(line) {
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
