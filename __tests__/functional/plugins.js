const axios = require("axios");
const knowParser = require("../../src/knowParser.js");

async function main() {
    const domains = [
        // domains here
    ];

    for (let i = 0; i < domains.length; i++) {
        const dom = domains[i];
        console.log(`DOMAIN: ${dom}`);

        const result = await axios(`https://www.${dom}.com`);
        const instance = new knowParser(result.data);

        console.log(`PHONES: ${instance.get("phones")}`);
        console.log(`EMAILS: ${instance.get("emails")}`);
        console.log(`LINKS: ${JSON.stringify(instance.get("links"), null, 2)}`);
        console.log("\n");
    }
}

main();
