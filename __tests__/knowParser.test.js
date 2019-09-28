"use strict";

const knowParser = require("../src/knowParser.js");

describe("knowParser", () => {
    describe("constructor", () => {
        it("should set text argument", () => {
            const testString = "This is some text\nThis is a new line";
            const parser = new knowParser(testString);

            expect(parser.lines).toEqual(testString.split("\n"));
        });
        it("should set an empty array if no text is provided", () => {
            const parser = new knowParser();

            expect(parser.lines).toEqual([]);
        });
        xit("should register default plugins", () => {
            // @TODO: figure our how to mock index.js properly
        });
    });
    describe("register", () => {
        it("should not accept invalid plugins", () => {
            const invalidPlugins = [
                class NoData {},
                class NoMain {
                    constructor() {
                        return;
                    }
                }
            ];

            const parser = new knowParser();
            for (let i = 0; i < invalidPlugins.length; i++) {
                const plugin = invalidPlugins[i];

                expect(
                    () => parser.register(plugin)
                ).toThrow("know-parser - failed to register");
            }
        });
        it("should register a plugin", () => {
            const parser = new knowParser();
            class ValidPlugin {

                constructor(parser) {
                    this._know = parser;
                }

                main() {
                    return;
                }
            }

            parser.register(ValidPlugin, "testPlugin");

            expect(parser._plugins.testPlugin instanceof ValidPlugin).toEqual(true);
        });
        it("should accept plugins without a name", () => {
            const parser = new knowParser();

            class ValidPlugin {

                constructor(parser) {
                    this._know = parser;
                }

                main() {
                    return;
                }
            }
            class InvalidPlugin {}
            const pluginAmount = Object.keys(parser._plugins).length;
            parser.register(ValidPlugin);
            expect(Object.keys(parser._plugins).length).toEqual(pluginAmount + 1);
            expect(typeof parser._plugins.ValidPlugin).toEqual("object");
            expect(parser._plugins.ValidPlugin instanceof InvalidPlugin).toEqual(false);
            expect(parser._plugins.ValidPlugin instanceof ValidPlugin).toEqual(true);
        });
        it("should not override existing plugins", () => {
            const parser = new knowParser();
            const pluginName = "APluginNameThatNoOneWillEverUseEver";

            class ValidPlugin {

                constructor(parser) {
                    this._know = parser;
                }

                main() {
                    return;
                }
            }

            parser.register(ValidPlugin, pluginName);

            class AnotherValidPlugin {

                constructor(parser) {
                    this._know = parser;
                }

                main() {
                    return;
                }
            }

            expect(
                () => parser.register(AnotherValidPlugin, pluginName)
            ).toThrow("know-parser - plugin already registered.");

            expect(parser._plugins[pluginName] instanceof ValidPlugin).toEqual(true);
        });
    });
    describe("unregister", () => {
        it("should delete the correct plugin", () => {
            const parser = new knowParser();
            const pluginName = "knowParserTestPluginName";

            class Plugin {
                constructor() {}
                main() {}
            }

            parser.register(Plugin, pluginName);

            const pluginAmount = Object.keys(parser._plugins).length;
            expect(parser._plugins[pluginName] instanceof Plugin).toEqual(true);

            parser.unregister(pluginName);
            expect(parser._plugins[pluginName]).toBeUndefined();
            expect(Object.keys(parser._plugins).length).toEqual(pluginAmount - 1);
        });
        it("should not delete on invalid name", () => {
            const parser = new knowParser();
            const pluginName = "knowParserTestPluginName";
            const pluginAmount = Object.keys(parser._plugins).length;
            expect(parser._plugins[pluginName]).toBeUndefined();
            parser.unregister(pluginName);
            expect(Object.keys(parser._plugins).length).toEqual(pluginAmount);
        });
    });
    describe("set/get lines", () => {
        it("should set the _text variable", () => {
            const parser = new knowParser();
            const text = "this is some testing text";

            parser.lines = text;
            expect(typeof parser._text === "undefined").toEqual(false);
        });
        it("should set a line", () => {
            const parser = new knowParser();
            const text = "this is some testing text";

            parser.lines = text;
            expect(parser.lines).toEqual([text]);
        });
        it("should split the text correctly", () => {
            const parser = new knowParser();
            const text = "this is some testing text\nand here is another line";

            parser.lines = text;
            expect(parser.lines).toEqual(text.split("\n"));
        });
        it("should handle setting an array", () => {
            const parser = new knowParser();
            const text = ["know", "parser"];

            parser.lines = text;
            expect(parser._text).toEqual(text.join("\n"));
            expect(parser.lines).toEqual(text);
        });
        it("should create an empty array if missing text", () => {
            const parser = new knowParser();
            const text = "";

            parser.lines = text;
            expect(parser._text).toEqual(text);
            expect(parser.lines).toEqual([]);
        });
    });
    describe("get", () => {
        it ("should call the correct plugin", () => {
            const parser = new knowParser();

            function TestPlugin() {}
            TestPlugin.prototype.main = jest.fn(() => []);

            parser.register(TestPlugin);
            expect(TestPlugin.prototype.main.mock.calls.length).toEqual(0);
            parser.get("TestPlugin");
            expect(TestPlugin.prototype.main.mock.calls.length).toEqual(1);
        });
        it("should pass on arguments", () => {
            const parser = new knowParser();
            parser.lines = ['some', 'lines'];
            const argsToPass = [123, 456, 789];
            const expected = [parser.lines].concat(argsToPass);

            function TestPlugin() {}
            TestPlugin.prototype.main = jest.fn((foo, bar, baz) => []);

            parser.register(TestPlugin);
            parser.get("TestPlugin", argsToPass[0], argsToPass[1], argsToPass[2]);
            expect(TestPlugin.prototype.main.mock.calls[0]).toEqual(expected);
            expect(TestPlugin.prototype.main.mock.calls.length).toEqual(1);
        });
        it("should give the correct text to the plugin", () => {
            const text = "here is some testing\ntest";
            const moreText = "more testing text\nhere";
            const parser = new knowParser(text);

            class TestingPlugin {
                constructor(knowParser) {
                    this.instance = knowParser;
                }
                main() {
                    return this.instance.lines;
                }
            }

            parser.register(TestingPlugin);
            expect(parser.get("TestingPlugin")).toEqual(parser.lines);

            parser.lines = moreText;
            expect(parser.get("TestingPlugin")).toEqual(parser.lines);
        });
        it("should return an empty array on invalid plugin", () => {
            const parser = new knowParser();
            expect(parser.get("not a real plugin")).toEqual([]);
        });
        it("should error correctly", () => {
            const parser = new knowParser();
            class TestingPlugin {
                main() {
                    throw "fake error";
                }
            }

            parser.register(TestingPlugin);
            expect(() => parser.get("TestingPlugin")).toThrow("fake error");
        });
    });
});
