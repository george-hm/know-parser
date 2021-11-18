/**
 * Gathers from numbers from a piece of text
 *
 * @class PhoneNumbers
 * @author George Meadows, Robert Langton
 */
const regex = [
    /(^\+[0-9]{2}|^\+[0-9]{2}0|^00[0-9]{2}|^0)(-)?([0-9]{8,9}$|[0-9\s]{9,13})/g,
    /(([+]\d{2}[ ][1-9]\d{0,2}[ ])|([0]\d{1,3}[-]))((\d{2}([ ]\d{2}){2})|(\d{3}([ ]\d{3})*([ ]\d{2})+))/g,
    /[+]44(7|1)\d{9}/g,
    /([0-9]{3})[-.]?([0-9]{3})[-.]([0-9]{4})/g,
];
const hrefRegex = /href="tel:([\d\s()+-\/]+\d[\d\s()+-\/]+)"/g;
class KnowPhones {
    /**
     * Gathers phone numbers from a string
     *
     * @returns  {Array}  All the numbers found
     * @memberof KnowPhones
     */
    main(linesRaw) {
        let lineList = linesRaw.join('\n');
        const numsFound = [];

        // First we grab all href="tel:xxxx" from the entire html
        numsFound.push(...this.grabHrefTel(lineList));

        // We now remove all tags, leaving us with only the content of the webpage
        lineList = lineList
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
            .replace(/<[^>]*>/ig, ' ')
            .replace(/\n/g, 'knowparserbreaker')
            .replace(/\s{3,}/g, 'knowparserbreaker')
            .replace(/tel/gi, 'knowparserbreaker tel')
            .replace(/phone/gi, 'knowparserbreaker phone')
            .replace(/fax/gi, 'knowparserbreaker fax')
            .split('knowparserbreaker')
            .filter(line => {
                if (!line) {
                    return false;
                }

                const nums = /[0-9]/;
                if (!line.match(nums)) {
                    return false;
                }

                return true;
            });

        for (let i = 0; i < lineList.length; i++) {
            let line = lineList[i];

            // We don't want to grab fax numbers
            if (line.includes('fax')) {
                continue;
            }

            // Removes everything before the phone number & gets it ready for the regex
            line = line
                .replace(/^[^\d+]*/, '')
                .replace(/[\s()]/g, '');

            numsFound.push(...this.runRegex(line));
        }

        const toReturn = [
            ...new Set(
                numsFound.map(
                    num => num.replace(/(?:\s|-|\.|\\|\(|\)|\/)/g, ''),
                ),
            ),
        ];

        for (let i = 0; i < toReturn.length; i++) {
            const num = toReturn[i];
            if (num.startsWith('+440')) {
                if (toReturn.includes(num.replace('+440', '+44'))) {
                    toReturn.splice(i, 1);
                }
            }
        }
        // return the numbers, no duplicates, filter out errors
        return toReturn.filter(num => (/\d/.test(num)));
    }

    /**
     * Grabs the href="tel:xxxx"
     *
     * @param   {String}    line  A line containing "tel:"
     * @returns {Array}           Array of phone numbers
     * @memberof KnowPhones
     */
    grabHrefTel(line) {
        const phones = [];
        let matches;
        while ((matches = hrefRegex.exec(line)) !== null) {
            if (matches[1].includes('/')) {
                const cleanedMatches = matches[1].split('/').map(el => el.trim());
                phones.push(...cleanedMatches);
                continue;
            }
            phones.push(matches[1]);
        }
        return phones;
    }

    /**
     * Run regex on a line, returning results and removing duplicates
     *
     * @param {String}  line  A string to run regex on
     * @returns {Array}  Phone numbers found via regex
     * @memberof KnowPhones
     */
    runRegex(line) {
        const results = [];
        for (let x = 0; x < regex.length; x++) {
            const currentRegex = regex[x];
            const matches = line.match(currentRegex) || line.replace(/-/g, '').match(currentRegex);
            if (matches) {
                results.push(...matches.map(num => num.replace(/-/g, '')));
            }
        }

        return [
            ...new Set(
                results.map(num => num.replace(/\s/g, '')),
            ),
        ];
    }
}

module.exports = KnowPhones;
