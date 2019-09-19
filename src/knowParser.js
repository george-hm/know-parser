const defaultPlugins = require("./plugins");

class KnowParser {

    /**
     * Creates an instance of KnowParser.
     *
     * @param {String}  [text]  Text to perform a search on
     * @memberof KnowParser
     */
    constructor(text) {
        this.set(text || "");
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
     * @param {Function}  plugin  Plugin to register
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
            throw new Error("know-parser: Cannot validate plugin to be registered.");
        }

        if (!name) {
            name = plugin.prototype.constructor.name;
        }

        this._plugins[name] = new plugin(this);
    }

    /**
     * Get the know-parser text
     *
     * @returns
     * @memberof KnowParser
     */
    get() {
        return this._text;
    }

    /**
     * Set the text for know-parser to look at
     *
     * @param   {String}  text  Text to run plugins on
     * @returns {String}        know-parser text
     * @memberof KnowParser
     */
    set(text) {
        this._text = text.split("\n");

        return this._text;
    }

    /**
     * Call a know-parser plugin
     *
     * @param   {String}  pluginName
     * @param   {*}       args        Arguments a plugin might require
     * @returns {*}                   Result(s) from the plugin
     * @memberof KnowParser
     */
    call(pluginName, ...args) {
        if (!Object.keys(this._plugins).includes(pluginName)) {
            return [];
        }

        try {
            return this._plugins[pluginName].main(...args);
        } catch (err) {
            throw `know-parser plugin '${pluginName}' error: ` + err;
        }
    }
}

module.exports = KnowParser;
