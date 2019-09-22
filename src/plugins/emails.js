const regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
/**
 * A know-parser plugin to gather email addresses
 *
 * @class KnowEmails
 * @author George Meadows
 */
class KnowEmails {

    /**
     * Gathers email addresses from an array of strings
     *
     * @param {Array}  lines  Lines from know-parser
     * @returns {Array}       All emails found
     * @memberof KnowEmails
     */
    main(lines) {
        const lineList = lines;
        const emails = [];

        for (let i = 0; i < lineList.length; i++) {
            const line = lineList[i];

            if (!/@.+\.(.)+$/.test(line)) {
                continue;
            }

            emails.push(...this.extractEmails(line));
        }

        return [...new Set(emails)];
    }

    /**
     * Runs regex on a string to find emails, returning matches
     *
     * @param {String}  query  A piece of text to check for emails
     * @returns
     * @memberof KnowEmails
     */
    extractEmails(query) {
        if (!query) {
            return [];
        }

        if (Array.isArray(query)) {
            query = query.join(" ");
        }

        if (!query.includes("@")) {
            return [];
        }

        const results = [];
        const match = query.match(regex);
        if (match) {
            results.push(...match);
        }
        return results;
    }
}

module.exports = KnowEmails;
