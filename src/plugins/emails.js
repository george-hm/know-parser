const regex = /(([^<>()\[\]\\.,;:\s@"'\/?=#{}%]+(?!png|jpg|jpeg|zvg)(\.[^<>()\[\]\\.,;:\s@"\/=?]+)*(?!png|jpg|jpeg|zvg)))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+((?!png|jpg|jpeg|zvg)[a-zA-Z]{2,})))/gi;
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
        const lineList = lines.filter(line => line.includes('@'));
        const emails = [];

        for (let i = 0; i < lineList.length; i++) {
            const line = lineList[i];

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

        const finalQuery = Array.isArray(query) ? query.join(' ') : query;

        if (!finalQuery.includes('@')) {
            return [];
        }

        const results = finalQuery.match(regex);
        return results || [];
    }
}

module.exports = KnowEmails;
