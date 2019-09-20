const axios = require("axios");
const knowParser = require("../../src/knowParser.js");

async function main() {
    const domains = [
        // enter domains here
    ];

    for (let i = 0; i < domains.length; i++) {
        const dom = domains[i];
        console.log(`DOMAIN: ${dom}`);

        const result = await axios(`https://www.${dom}.com`);
        const instance = new knowParser(result.data);

        console.log(`NUMBERS: ${instance.get("phones")}`);
    }
}

main();
