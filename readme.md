fontmin-typeface 
===

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]


> typeface fontmin plugin

## Install

```sh
$ npm install --save fontmin-typeface
```

## Usage

Fontmin convert `font.ttf` to `font.typeface.json` as <https://github.com/mrdoob/three.js/tree/master/examples/fonts>

```js
var Fontmin = require('fontmin');
var typeface = require('fontmin-typeface');

var fontmin = new Fontmin()
    .src('fonts/*.ttf')
    .use(Fontmin.glyph({text: 'hello world'}))
    .use(typeface({filetype: 'json'}))
    .dest('build/fonts');
    
fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log('Files typeface successfully!'); 
});
```

## Example

```sh
npm run example
```
open <http://127.0.0.1:8080/example/> or <https://junmer.github.io/fontmin-typeface/example/#00FF32501#hello>

![hello](./example/img/hello.jpeg)

## Related

- [fontmin](https://github.com/ecomfe/fontmin)
- [three.js](https://github.com/mrdoob/three.js)

[travis-url]: https://travis-ci.org/junmer/fontmin-typeface
[travis-image]: http://img.shields.io/travis/junmer/fontmin-typeface.svg
[downloads-image]: http://img.shields.io/npm/dm/fontmin-typeface.svg
[npm-url]: https://npmjs.org/package/fontmin-typeface
[npm-image]: http://img.shields.io/npm/v/fontmin-typeface.svg
[dep-url]: https://david-dm.org/junmer/fontmin-typeface
[dep-image]: http://img.shields.io/david/junmer/fontmin-typeface.svg
