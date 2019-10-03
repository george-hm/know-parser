const PhonesPlugin = require("../src/plugins/phones.js");

describe("phones_plugin", () => {
    describe("main", () => {
        it("should call grabHrefTel", () => {
            const lines = ["tel:'+44 1632 960983'"];
            const plugin = new PhonesPlugin();
            plugin.grabHrefTel = jest.fn();

            plugin.main(lines);
            expect(plugin.grabHrefTel.mock.calls.length).toEqual(lines.length);
        });
        it("should return results", () => {
            const phones = [
                "href='tel:+44 1632 960983'",
                "+44 1632 960984"
            ];
            const plugin = new PhonesPlugin();
            plugin.grabHrefTel = jest.fn(() => phones[0].split("tel:")[1].split("'")[0]);
            plugin.runRegex = jest.fn(() => [phones[1]]);

            expect(plugin.main(phones)).toEqual(
                [
                    phones[0].split("tel:")[1].split("'")[0].replace(/\s/g, ""),
                    phones[1].replace(/\s/g, "")
                ]
            );
            expect(plugin.grabHrefTel.mock.calls.length).toEqual(phones.length);
            expect(plugin.runRegex.mock.calls.length).toEqual(phones.length);
        });
        it("should return an empty array on no results", () => {
            const lines = [
                "foo",
                "bar"
            ];
            const plugin = new PhonesPlugin();

            expect(plugin.main(lines)).toEqual([]);
        });
    });
    describe("grabHrefTel", () => {
        it("should return a number", () => {
            const line = "href='tel:+44 1632 960983'";
            const plugin = new PhonesPlugin();

            expect(plugin.grabHrefTel(line)).toEqual(
                line.split("tel:")[1].split("'")[0].replace(/\s/g, "")
            );
        });
        it("should not return bad data", () => {
            const line = "href='tel:+44 1632 bunch of crap'";
            const plugin = new PhonesPlugin();

            expect(plugin.grabHrefTel(line)).toBeNull();
        });
    });
    describe("runRegex", () => {
        it("should return results", () => {
            const number = "+441632960983";
            const line = `Here is some text with ${number} inside of it`;
            const plugin = new PhonesPlugin();

            expect(plugin.runRegex(line)).toEqual([number]);
        });
        it("should return an empty array on no results", () => {
            const line = "bunch of words, nothing with a number inside";
            const plugin = new PhonesPlugin();

            expect(plugin.runRegex(line)).toEqual([]);
        });
        it("should remove duplicates", () => {
            const number = "+441632960983";
            const line = `two numbers, ${number} and ${number}`;
            const plugin = new PhonesPlugin();

            expect(plugin.runRegex(line).length).toEqual(1);
        });
    });
});
