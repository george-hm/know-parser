const parseDomain = require("parse-domain");

/**
 * A know-parser plugin which returns all domains found in a piece of text
 *
 * @class KnowDomains
 * @author George Meadows
 */
class KnowDomains {

    /**
     * Creates an instance of KnowDomains.
     *
     * @param {KnowParser}  knowParser  know-parser instance
     * @memberof KnowDomains
     */
    constructor(knowParser) {
        this._knowParser = knowParser;
    }

    /**
     * Extracts domains from a piece of text
     *
     * @returns {Array}  Found domains
     * @memberof KnowDomains
     */
    main() {
        const links = this._knowParser.get("links");
        const domains = [];

        for (let i = 0; i < links.length; i++) {
            const currentLink = links[i];
            const data = parseDomain(currentLink);
            if (data) {
                domains.push(`${data.domain}.${data.tld}`);
            }
        }

        return [
            ...new Set(
                domains.filter(_=>_)
            )
        ];
    }
}

module.exports = KnowDomains;
