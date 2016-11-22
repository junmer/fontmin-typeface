# fontmin-typeface [![Build Status](http://img.shields.io/travis/junmer/fontmin-typeface.svg?style=flat)](https://travis-ci.org/junmer/fontmin-typeface) 

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

```
npm run example
```
open <http://127.0.0.1:8080/example/>

![hello](./example/img/hello.jpeg)

## Related

- [fontmin](https://github.com/ecomfe/fontmin)
- [three.js](https://github.com/mrdoob/three.js)
