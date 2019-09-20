/**
 * Gathers from numbers from a piece of text
 *
 * @class PhoneNumbers
 * @author George Meadows
 */
class KnowPhones {

    /**
     * Creates an instance of PhoneNumbers.
     * Also creates our regex etc.
     * @param {KnowParser}  knowInstance  The KnowParser instance
     * @memberof KnowPhones
     */
    constructor(knowInstance) {
        this.regex = [
            /(\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10,13})/g,
            /(([+]\d{2}[ ][1-9]\d{0,2}[ ])|([0]\d{1,3}[-]))((\d{2}([ ]\d{2}){2})|(\d{3}([ ]\d{3})*([ ]\d{2})+))/g,
            /[+]44(7|1)\d{9}/g
        ];
        this.instance = knowInstance;
    }

    /**
     * Gathers phone numbers from a string
     *
     * @returns  {Array}  All the numbers found
     * @memberof KnowPhones
     */
    main() {
        const lineList = this.instance.getWords();
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
     * Run regex on a line, returning results
     *
     * @param {String}  line  A word to run regex on
     * @returns
     * @memberof KnowPhones
     */
    validate(line) {
        const results = [];
        for (let x = 0; x < this.regex.length; x++) {
            const currentRegex = this.regex[x];
            const result = line.match(currentRegex) || line.replace(/-/g, "").match(currentRegex);
            if (result) {
                results.push(...result.map(num => num.replace(/-/g, "")));
            }
        }

        return results;
    }
}

module.exports = KnowPhones;
