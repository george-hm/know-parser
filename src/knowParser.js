const defaultPlugins = require("./plugins");

class KnowParser {

    /**
     * Creates an instance of KnowParser.
     *
     * @param {String}  [text]  Text to perform a search on
     * @memberof KnowParser
     */
    constructor(text) {
        this.lines = text || "";
        this._plugins = {};

        // register default plugins
        for (const name in defaultPlugins) {
            const plugin = defaultPlugins[name];
            this.register(plugin, name);
        }
    }

    /**
     * Register your plugin with know-parser.
     *
     * @param {Function}  plugin    Plugin to register
     * @param {String}    [name]    Name of the plugin
     * @memberof KnowParser
     */
    register(plugin, name) {

        // validate that we have a know-parser plugin
        if (
            !plugin ||
            typeof plugin !== "function" ||
            !plugin.prototype ||
            !plugin.prototype.constructor.name ||
            !plugin.prototype.main
        ) {
            throw new Error("know-parser - failed to register plugin. Is it a class with 'main' method?");
        }

        if (!name) {
            name = plugin.prototype.constructor.name;
        }

        if (this._plugins[name]) {
            throw new Error("know-parser - plugin already registered.");
        }

        this._plugins[name] = new plugin(this);

        return this;
    }

    /**
     * Unregister a know-parser plugin
     *
     * @param    {String} pluginName
     * @returns  {KnowParser}
     * @memberof KnowParser
     */
    unregister(pluginName) {
        delete this._plugins[pluginName];

        return this;
    }

    /**
     * know-parser lines
     *
     * @type {Array}
     * @memberof KnowParser
     */
    set lines(text) {
        if (Array.isArray(text)) {
            text = text.join("\n");
        }
        this._text = text;
        return this._text;
    }

    get lines() {
        if (!this._text) {
            return [];
        }
        return this._text.split("\n");
    }

    /**
     * Call a know-parser plugin
     *
     * @param   {String}  pluginName
     * @param   {*}       args        Arguments a plugin might require
     * @returns {*}                   Result(s) from the plugin
     * @memberof KnowParser
     */
    get(pluginName, ...args) {
        if (!Object.keys(this._plugins).includes(pluginName)) {
            return [];
        }

        //We will pass each plugin a clone of .lines for safety
        const lines = Array.from(this.lines);
        try {
            return this._plugins[pluginName].main(lines, ...args);
        } catch (err) {
            throw new Error(`know-parser plugin '${pluginName}' error: ${err}`);
        }
    }
}

module.exports = KnowParser;
