const LinksPlugin = require("../src/plugins/links.js");

describe("links_plugin", () => {
    describe("main", () => {
        it("should call grabURL", () => {
            const lines = [
                "foo",
                "bar"
            ];
            const plugin = new LinksPlugin();
            plugin.grabURL = jest.fn(() => []);

            plugin.main(lines);
            expect(plugin.grabURL.mock.calls.length).toEqual(lines.length);
        });
        it("should return results", () => {
            const lines = [
                "https://www.google.com",
                "www.example.com"
            ];
            const plugin = new LinksPlugin();
            plugin.grabURL = jest.fn((line) => [line]);

            expect(plugin.main(lines)).toEqual(lines);
        });
        it("should not return duplicates", () => {
            const lines = [
                "www.example.com",
                "www.example.com",
                "https://www.google.com",
            ];
            const plugin = new LinksPlugin();
            plugin.grabURL = jest.fn((line) => [line]);

            expect(plugin.main(lines)).toEqual(lines.slice(1));
        });
        it("should return an empty array on no data", () => {
            const lines = [
                "foo",
                "bar"
            ];
            const plugin = new LinksPlugin();
            plugin.grabURL = jest.fn(() => []);

            expect(plugin.main(lines)).toEqual([]);
        });
    });
    describe("grabURL", () => {
        it("should return urls", () => {
            const lines = [
                "https://www.google.com",
                "http://somewebsite.org",
                "www.example.com",
                "https://anotherwebsite.nl",
                "http://onemorewebsite.co.uk"
            ];

            const plugin = new LinksPlugin();

            for (let i = 0; i < lines.length; i++) {
                const currentLine = lines[i];
                expect(plugin.grabURL(currentLine)).toEqual([currentLine]);
            }
        });
        it("should return multiple urls", () => {
            const lines = "https://www.google.com http://somewebsite.org www.example.com https://anotherwebsite.nl http://onemorewebsite.co.uk";

            const plugin = new LinksPlugin();
            expect(plugin.grabURL(lines)).toEqual(lines.split(" "));
        });
        it("should return an empty array on no results", () => {
            const line = "foo bar";

            const plugin = new LinksPlugin();
            expect(plugin.grabURL(line)).toEqual([]);
        });
    });
});
