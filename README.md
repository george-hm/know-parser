# know-parser

[![](https://img.shields.io/npm/v/know-parser.svg)](https://www.npmjs.com/package/know-parser)
[![](https://img.shields.io/npm/dm/know-parser.svg)](https://www.npmjs.com/package/know-parser)
[![Coverage Status](https://coveralls.io/repos/github/george-hm/know-parser/badge.svg?branch=master)](https://coveralls.io/github/george-hm/know-parser?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/george-hm/know-parser/badge.svg)](https://snyk.io/test/github/george-hm/know-parser)

**Parses a piece of text to grab the most useful data**

know-parser is a JavaScript plugin-based package designed to extract useful data from a piece of text

This package comes bundled with a few pre-existing plugins to use right out of the box.
If you would like to create your own plugins, see `./PLUGIN_DEVELOPMENT.md`

This plugin was inspired by knwl.js

## Installation

`npm install --save know-parser`

## Usage Guide

### Example script

``` javascript
const parser = require("know-parser");
const knowParser = new parser("a bunch of words with an email: knowparser@implink.org");

const emails = knowParser.get("emails");
console.log(emails); // output: ["knowparser@implink.org"]
```

### Detailed walkthrough

1. Create a new instance of `know-parser`

    ```javascript
    const parser = require("know-parser");
    const knowParser = new parser();
    ```

2. Provide a piece of text to parse

    ``` javascript
    // string
    knowParser.lines = "this is a piece of text";

    // array
    knowParser.lines = ["an array", "of words"];

    // you can also provide lines via the constructor
    const knowParser = new parser("this is a piece of text");
    ```

3. Run a plugin on the piece of text

    ```javascript
    const emails = knowParser.get("emails");
    console.log(emails); // an array of email addresses
    ```

## Default Plugins

These are automatically loaded by default.

### emails

```javascript
const emails = knowParser.get("emails");
console.log(emails); // An array of email addresses
```

### phones

```javascript
const phones = knowParser.get('phones');
console.log(phones); // An array of phone numbers
```

### links

```javascript
const links = knowParser.get('links');
console.log(links); // An array of links (starting with http/https/www) e.g. "https://www.example.com"
```

### domains

```javascript
const domains = knowParser.get('domains');
console.log(domains); // an array of domains e.g. "example.com"
```

## Developing Parser Plugins

Because of the plugin-based nature of this package, it's surprisingly simple to create your own plugins for know-parser.
If you would like to contribute to/create a plugin please see `./PLUGIN_DEVELOPMENT.md`
