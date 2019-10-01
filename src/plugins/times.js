class KnowTimes {

    /**
     * Returns times found in a string. In either:
     * - the exact type found
     * - timestamp format (e.g. seconds from midnight)
     * - 24 hour format
     * - 12 hour format
     *
     * @param {String}  lines  Lines from know-parser
     * @param {String}  type  The return type either:
     * - timestamp
     * - (twenty|twentyfour|24)
     * - (twelve|12)
     * @returns {Array}  Times found in the string
     * @memberof KnowTimes
     */
    main(lines, type) {

        let results = [];
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];

            const time = this.extractTime(currentLine);
            if (time) {
                results.push(...time);
            }
        }

        switch (String(type).toLowerCase()) {
            case "timestamp":
                results = results.map(t => this.convertToTimestamp(this.convertTo24(t)));
                break;
            case "twenty":
            case "twentyfour":
            case "24":
                results = results.map(t => this.convertTo24(t));
                break;
            case "twelve":
            case "12":
                    results = results.map(t => this.convertTo12(t));
        }

        return [
            ... new Set(results)
        ];
    }

    /**
     * Converts a time to a timestamp, representing seconds from midnight
     *
     * @param   {String}  time  A time in 24 hour format (e.g. 23:12)
     * @returns {Integer}        Number of seconds since midnight
     * @memberof KnowTimes
     */
    convertToTimestamp(time) {
        const figures = time.split(":").map(t => parseInt(t));
        const minute = 60;
        const hour = minute * minute;

        figures[0] = figures[0] * hour;
        figures[1] = figures[1] * minute;

        return figures.reduce((first, second) => first + second);
    }


    /**
     * Converts a time to 24 hour format.
     *
     * @param    {String}  time  A time e.g. "11:36pm"
     * @returns  {String}        A 24-hour time e.g. "23:36"
     * @memberof KnowTimes
     */
    convertTo24(time) {
        if (!time.includes("am") && !time.includes("pm")) {
            return time;
        }

        let hour = parseInt(time.split(":").shift());

        if (!hour) {
            throw new Error("something went wrong trying to convert");
        }

        if (hour === 12 && time.includes("am")) {
            hour = "00";
        } else {
            hour = time.includes("pm") && hour !== 12 ? hour + 12 : hour;
        }

        return `${hour}:${time.split(":").pop().slice(0,2).replace("am", "").replace("pm", "")}`;
    }

    /**
     * Converts a time to 12 hour format.
     *
     * @param    {String}  time  A time e.g. "22:36"
     * @returns  {String}        A 24-hour time e.g. "10:36pm"
     * @memberof KnowTimes
     */
    convertTo12(time) {
        if (time.includes("pm") || time.includes("pm")) {
            return time;
        }
        let hour = parseInt(time.split(":").shift());

        if (!hour) {
            throw new Error("something went wrong trying to convert");
        }

        const ampm = hour < 12 ? "am" : "pm";
        hour = hour > 12 ? hour - 12 : hour;
        return `${hour}:${time.split(":").pop().slice(0,2)}${ampm}`;
    }

    extractTime(line) {
        // https://regex101.com/r/RYG0v6/1
        const twelveHour = line.match(/[^0-9]((?:[0]?[0-9]|1[0-2])(?:\s?:\s?[0-5][0-9]))\s?(am|pm)/g);
        const twentyFourHour = line.match(/([0-1]?[0-9]|2[0-3])\s?:\s?[0-5][0-9]([^ap]|$)/g);

        const timesFound = [];

        if (twelveHour) {
            timesFound.push(...twelveHour.map(time => time.trim()));
        }
        if (twentyFourHour) {
            timesFound.push(...twentyFourHour.map(time => time.trim()));
        }

        return timesFound;
    }
}

module.exports = KnowTimes;
