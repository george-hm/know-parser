# Writing Plugins

The core of know-parser is the plugins it uses, by creating your own you can extend the functionality of the package.

Without plugins, know-parser would be an empty vessel

The few default plugins which are available allow for parsing of generic cases, if you need something more specific, you could create your own.

If you've decided you want to create your own plugin, you've come to the right place.

## know-parser plugin template

Here's a basic template for a parser plugin:

```javascript

    class MyPlugin {

        constructor(knowParser) {
            this.instance = knowParser;
        }

        main() {
            const lines = this.instance.lines;
            // parser code here
        }
    }

    module.exports = MyPlugin;
```

### Step by step explanation

1. When you register your plugin via `knowParser.register()`, the parser instance is passed to your plugin, you should save this instance as it will give you access to the text to parse.

    ```javascript
        class MyPlugin {
            constructor(knowParser) {
                this.instance = knowParser;
            }
        }
    ```

2. Every plugin must have a method called `main()`, this is the method that is called when running `knowParser.get("MyPlugin");`

    ```javascript
        main() {
            // the lines given to knowParser
            const lines = this.instance.lines;
        }
    ```

3. Your plugin should use the text given to knowParser (DO NOT MODIFY  THIS)

    ```javascript
        knowParser.lines = "one\ntwo";
        knowParser.get("MyPlugin");

        // knowParser.lines would be ["one", "two"]
    ```

4. Your plugin should return an array of results

    ```javascript
        // returns [] on no result, or full of results
        knowParser.get("MyPlugin");
    ```

## knowParser.register()

`knowParser.register` should be used when giving your plugin to know-parser. The first argument is your plugin, the second argument is the name if the plugin. If the second argument is omitted then the name of your plugin will be the name of the plugin class.

Example usage: `knowParser.register(MyPlugin, "MyAwesomePluginName");`

This method throws an error if it fails to validate a correct plugin

It's important to note that this method won't override existing plugins, if you wish to override this, you must first unregister a plugin using `knowParser.unregister`

## knowParser.unregister()

Unregisters a plugin, call with the plugin name e.g. `knowParser.unregister("phones");`
Nothing happens if the plugin doesn't exist.

## knowParser.get()

This method calls plugins. Any arguments (after the first argument) passed to this method are given to your plugin.

Here's an example:

```javascript
knowParser.lines = "here is some text";

class MyPlugin {

    constructor(knowParser) {
        this.instance = knowParser;
    }

    main(foo, bar, baz) {
        return `Foo: ${foo}, Bar: ${bar}, Baz: ${baz}`;
    }
}

knowParser.register(MyPlugin, "MyCoolPlugin");

// logs "Foo: 1, Bar: 2, Baz: 3"
console.log(knowParser.get("MyCoolPlugin", 1, 2, 3));
```

## knowParser.lines

This variable is a getter/setter, containing all the text that knowParser will use and give to plugins. Text given to know-parser is split by newlines.

If the given text is an array, then it is first joined with newlines before being split

Please do not modify this inside of your plugin as it could cause problems for the other know-parser plugins.

## Standards and Best Practices

A few simple guidelines you should try to follow:

1. Your plugin should all be in one file, with one class
2. You should not modify `knowParser.lines` within your plugin, if you wish to do something like splitting on each space, create a copy of this variable
3. Your plugin should gather the knowParser text during the `main()` function call, in order to have the latest text changes
4. Have fun!

## Contributing

If you wish to make your plugin public you should create a GitLab or GitHub repository containing your plugin.

If you wish to submit your plugin to be included by default, do not hesitate to contact/create a pull request explaining what it does, and why it should be included.

## Further Help

The default plugins should give you some insight on how to create your own, you can find these in `./src/plugins`

If you have any questions or require help, please feel free to contact my via email: `georgehm@pm.me`

Have fun!
