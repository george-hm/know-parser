export default class KnowParser {
    /**
     * Creates an instance of KnowParser.
     *
     * @param {String}  [text]  Text to perform a search on
     * @memberof KnowParser
     */
    constructor(text?: string|string[]);
    /**
     * Register your custom plugin with know-parser.
     */
    register(plugin: typeof Plugin, name?: string): this;
    /**
     * Unregister a know-parser plugin
     */
    unregister(pluginName: string): this;

    // annoyingly get and set must have the same types
    // however lines only returns string[]
    // but to set lines we accept string and string[]
    // I've set both to return string[] here
    // because allow setting of lines as string is very useful (e.g. not splitting lines yourself)
    set lines(text: string|string[]);
    get lines(): string|string[];

    /**
     * Call a know-parser plugin
     */
    get(pluginName: string, ...args: any[]): any;
}

declare class Plugin {
    constructor(knowParser: KnowParser);
    main(lines: string[], ...args: any[]): any
}
