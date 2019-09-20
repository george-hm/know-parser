"use strict";

jest.dontMock("../src/knowParser.js");

describe("knowParser", () => {
    describe("constructor", () => {
        it("should set text argument", () => {
            const knowParser = require("../src/knowParser.js");
            const testString = "This is some text\nThis is a new line";
            const parser = new knowParser(testString);

            expect(parser._text).toEqual(testString.split("\n"));
        });
        it("should set an empty array if no text is provided", () => {
            const knowParser = require("../src/knowParser.js");
            const parser = new knowParser();

            expect(parser._text).toEqual([]);
        });
    });
});
