/**
 * Extracts links found in a piece of text
 *
 * @class KnowLinks
 * @author George Meadows
 */
class KnowLinks {
    /**
     * Returns an array of links found in the text.
     * Duplicates removed.
     *
     * @param {Array}  lines  Lines from know-parser
     * @returns
     * @memberof KnowLinks
     */
    main(lines, filter) {
        let links = [];
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];
            links.push(...this.grabURL(currentLine));
        }

        if (filter && Array.isArray(filter) && filter.length) {
            links = this.filterResults(links, filter);
        }

        return [
            ...new Set(links),
        ];
    }

    /**
     * Runs regex on a line, returning links found.
     *
     * @param {String}  line  A line of text
     * @returns {Array}       All links found
     * @memberof KnowLinks
     */
    grabURL(line) {
        // looking at urls starting with either
        // https, http or www as others are too broad (e.g. window.href)
        const regex = /(https:\/\/|http:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:;%_\+.~#?&//=]*)/ig;
        const results = line.match(regex);

        return results || [];
    }

    /**
     * Filters out urls not matching the passed filter
     *
     * @param {Array}  links   Links found in this plugin
     * @param {Array}  filter  The filter e.g. ["facebook.com"]
     * @returns
     * @memberof KnowLinks
     */
    filterResults(links, filter) {
        return links.filter(link => {
            for (let i = 0; i < filter.length; i++) {
                if (link.includes(filter[i])) {
                    return true;
                }
            }

            return false;
        });
    }
}

module.exports = KnowLinks;
