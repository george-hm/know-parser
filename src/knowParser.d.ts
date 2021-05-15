declare class KnowParser {
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
    register(plugin: Plugin, name?: string): this;
    /**
     * Unregister a know-parser plugin
     */
    unregister(pluginName: string): this;

    set lines(text: string|string[]);
    get lines(): string[];
    /**
     * Call a know-parser plugin
     */
    get(pluginName: string, ...args: any[]): any;
}

declare class Plugin {
    constructor(knowParser: KnowParser);
    main(lines: string[], ...args?: any[]): any
}
