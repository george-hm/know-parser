const EmailPlugin = require("../src/plugins/emails.js");

describe("emails_plugin", () => {
    describe("constructor", () => {
        it("should set instance param", () => {
            const instance = "Not a real instance";
            const plugin = new EmailPlugin(instance);
            expect(plugin.instance).toBe(instance);
        });
    });
    describe("main", () => {
        it("should not call extractEmails on bad data", () => {
            const lines = ["foo", "bar"];
            const plugin = new EmailPlugin();
            plugin.extractEmails = jest.fn(() => []);

            plugin.main(lines);
            expect(plugin.extractEmails.mock.calls.length).toEqual(0);
        });
        it("should return results", () => {
            const emails = [
                "knowparser@implink.org",
                "notarealemail@somefakedomain.com"
            ];
            const plugin = new EmailPlugin();
            plugin.extractEmails = jest.fn();
            plugin.extractEmails.mockImplementationOnce(jest.fn(() => [emails[0]]));
            plugin.extractEmails.mockImplementationOnce(jest.fn(() => [emails[1]]));

            expect(plugin.main(emails)).toEqual(emails);
            expect(plugin.extractEmails.mock.calls.length).toEqual(2);
        });
        it("should not return bad data", () => {
            const lines = [
                "knowparser@implink.org",
                "this is not an email address"
            ];
            const plugin = new EmailPlugin();
            plugin.extractEmails = jest.fn(() => [lines[0]]);

            expect(plugin.main(lines)).toEqual([lines[0]]);
            expect(plugin.extractEmails.mock.calls.length).toEqual(1);
        });
    });
    describe("extractEmails", () => {
        it("should return valid emails", () => {
            const line = "knowparser@implink.org aperfectlyvalidemail@gmail.com no a valid @foo.com";
            const plugin = new EmailPlugin();

            expect(plugin.extractEmails(line)).toEqual(line.split(" ").slice(0, 2));
        });
        it("should accept arrays", () => {
            const lineArray = [
                "knowparser@implink.org",
                "aperfectlyvalidemail@gmail.com"
            ];
            const plugin = new EmailPlugin();

            expect(plugin.extractEmails(lineArray)).toEqual(lineArray);
        });
        it("should return an empty array on no matches", () => {
            const line = "bunch of garbage @stuff.org";
            const anotherLine = "more useless data that isn't an email";
            const plugin = new EmailPlugin();

            expect(plugin.extractEmails(line)).toEqual([]);
            expect(plugin.extractEmails(anotherLine)).toEqual([]);
        });
    });
});
