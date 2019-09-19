/**
 * Gathers from numbers from a piece of text
 *
 * @class PhoneNumbers
 * @author George Meadows
 */
class Phones {

    /**
     * Creates an instance of PhoneNumbers.
     * Also creates our regex etc.
     * @param {KnowParser}  knowInstance  The KnowParser instance
     * @memberof Phones
     */
    constructor(knowInstance) {
        this._regex = [
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
     * @memberof Phones
     */
    main() {
        const wordArray = this.instance.getText();
        const numsFound = [];

        for (let i = 0; i < wordArray.length; i++) {
            const word = wordArray[i];

            if (word.includes("tel:")) {
                const tel = this.grabHrefTel(word);

                if (tel) {
                    console.log(tel);
                    numsFound.push(tel);
                    continue;
                }
            }

            numsFound.push(...this.validate(word.replace(/\s/g, "")));
        }
        // return the numbers, no duplicates
        console.log(numsFound);
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
     * @param   {Array}    word  A word containing "tel:"
     * @returns {String}         The phone number (or null if not found)
     * @memberof Phones
     */
    grabHrefTel(word) {
        const telWord = word.split("tel:").pop().replace(/\s/g, "").split("'")[0].split("\"")[0].split(",")[0];

        if (/[A-z<>"']/.test(telWord)) {
            return null;
        }

        return telWord;
    }

    /**
     * Run regex on a word
     *
     * @param {String}  word  A word to run regex on
     * @returns
     * @memberof Phones
     */
    validate(word) {
        const results = [];
        for (let x = 0; x < this._regex.length; x++) {
            const currentRegex = this._regex[x];
            const result = word.match(currentRegex) || word.replace(/-/g, "").match(currentRegex);
            if (result) {
                results.push(...result.map(num => num.replace(/-/g, "")));
            }
        }

        return results;
    }
}

module.exports = Phones;
