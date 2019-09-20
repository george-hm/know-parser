class KnowDates {

    constructor(knowInstance) {
        this._shortDate = /(\d{1,4})(?:-|\/)(\d{2})(?:-|\/)(\d{1,4})/;
        this._formats = [
            "US",
            "UK"
        ];
        this._layout = this._formats[0];
        this.instance = knowInstance;
    }

    main() {
        const lineList = this.instance.lines;

        for (let i = 0; i < lineList.length; i++) {
            const line = lineList[i];
            const short = line.match(this._shortDate);

            if (short) {
                this.findLayout(short);
            }
        }
    }

    /**
     * Find a date format layout, if we can.
     * e.g. "20-09-2019" is a UK layout
     *
     * @param {Array}  date  An array of date elements, the match from this._shortDate
     * @memberof KnowDates
     */
    findLayout(date) {
        let foundLayout = 0;

        for (let i = 0; i < date.length; i++) {

        }

        this._layout = this._formats[foundLayout];
    }

    getYear(line) {

    }

    getMonth() {

    }

    getDay() {

    }
}
