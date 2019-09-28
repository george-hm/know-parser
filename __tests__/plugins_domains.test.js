const DomainsPlugin = require("../src/plugins/domains.js");
const parseDomain = require("parse-domain");
jest.mock("parse-domain");

describe("plugin_domains", () => {
    describe("constructor", () => {
        it("should take params", () => {
            const fakeParser = "foobar";

            expect(new DomainsPlugin(fakeParser)._knowParser).toEqual(fakeParser);
        });
    });
    describe("main", () => {
        it("should return results", () => {
            const urls = [
                "https://www.example.com",
                "http://www.foobar.com",
                "www.bazbizz.org"
            ];
            const fakeParser = {
                get: jest.fn(() => urls)
            };
            const plugin = new DomainsPlugin(fakeParser);
            parseDomain.mockImplementation((line) => {
                const domain = line.replace("https://", "");
                return {
                    domain: domain.split(".")[1],
                    tld: domain.split(".")[2]
                };
            });
            const results = plugin.main();
            expect(fakeParser.get.mock.calls.length).toEqual(1);
            expect(Array.isArray(results)).toEqual(true);
            expect(results.length).toEqual(urls.length);

            for (let i = 0; i < results.length; i++) {
                const currentUrl = results[i];
                const passedUrl = urls[i];

                expect(currentUrl).toEqual(passedUrl.split(".").slice(1).join("."));
            }
        });
        it("should return an empty array on no urls", () => {
            parseDomain.mockClear();
            const fakeParser = {
                get: jest.fn(() => [])
            };
            const plugin = new DomainsPlugin(fakeParser);

            expect(plugin.main()).toEqual([]);
            expect(parseDomain.mock.calls.length).toEqual(0);
        });
        it("should return an empty array on no domains", () => {
            parseDomain.mockClear();
            const urls = [
                "not a real url",
                "not-an-actual-domain",
                "https://foo"
            ];
            const fakeParser = {
                get: jest.fn(() => urls)
            };
            parseDomain.mockImplementation(() => null);
            const plugin = new DomainsPlugin(fakeParser);

            expect(plugin.main()).toEqual([]);
            expect(parseDomain.mock.calls.length).toEqual(urls.length);
        });
    });
});
