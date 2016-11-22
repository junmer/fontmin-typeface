/**
 * @file typeface
 * @author junmer
 */

/* eslint-env node */
var through = require('through2');
var replaceExt = require('replace-ext');
var extend = require('xtend');
var svg = require('./lib/svg');

/**
 * ttf2typeface
 *
 * @param  {Object} font ttfobj
 * @return {Object}      typeface
 */
function ttf2typeface (font) {

    var result = {};
    var scale = (1000 * 100) / ( (font.head.unitsPerEm || 2048) *72);
    result.familyName = font.name.fontFamily;
    var fontSubFamily = font.name.fontSubFamily;
    result.cssFontWeight = /bold/i.test(fontSubFamily) ? 'bold' : 'normal';
    result.cssFontStyle = /italic/i.test(fontSubFamily) ? 'bold' : 'normal';
    result.original_font_information = font.name;
    result.resolution = 1000;

    // result.ascender = Math.round(font.hhea.ascent * scale);
    // result.descender = Math.round(font.hhea.descent * scale);

    result.ascender = font.hhea.ascent;
    result.descender = font.hhea.descent;

    result.underlinePosition = font.post.underlinePosition;
    result.underlineThickness = font.post.underlineThickness;

    result.boundingBox = {
        "yMin": font.head.yMin,
        "xMin": font.head.xMin,
        "yMax": font.head.yMax,
        "xMax": font.head.xMax
    };


    result.glyphs = {};
    function getGlyph (glyph) {

        return {
            o: svg.contours2svg(glyph.contours).toLocaleLowerCase(),
            // x_min: Math.round(glyph.xMin * scale),
            // y_min: Math.round(glyph.yMin * scale),
            // x_max: Math.round(glyph.xMax * scale),
            // y_xax: Math.round(glyph.yMax * scale),
            // ha: Math.round(glyph.advanceWidth * scale),

            x_min: glyph.xMin,
            y_min: glyph.yMin,
            x_max: glyph.xMax,
            y_xax: glyph.yMax,
            ha: glyph.advanceWidth

        };
    }

    font.glyf.forEach(function (glyph) {

        if (!glyph.unicode) {
            return;
        }

        glyph.unicode.forEach(function (code) {
            result.glyphs[String.fromCharCode(code)] = getGlyph(glyph);
        });
    });

    return result;
}



/**
 * typeface fontmin plugin
 *
 * @param {Object} opts opts
 * @return {Object} stream.Transform instance
 * @api public
 */
module.exports = function (opts) {

    opts = extend({clone: true, filetype: 'json'}, opts);

    return through.ctor({
        objectMode: true
    }, function (file, enc, cb) {

        // check null
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        // check stream
        if (file.isStream()) {
            cb(new Error('Streaming is not supported'));
            return;
        }

        // check ttfObject
        if (!file.ttfObject) {
            cb(new Error('must resolve ttf before using fontmin.glyph'), file);
            return;
        };

        // clone
        if (opts.clone) {
            this.push(file.clone(false));
        }

        // to typeface format
        var output = '';

        try {
            var typeface = ttf2typeface(file.ttfObject);
        }
        catch (e) {
            cb(e, file);
            return;
        }

        // wrapper
        if (opts.filetype === 'json') {
            output = JSON.stringify(typeface);
        }
        else {
            output = "if (_typeface_js && _typeface_js.loadFace) _typeface_js.loadFace("+ JSON.stringify(typeface) + ");"
        }

        // replace ext
        file.path = replaceExt(file.path, '.typeface.json');

        // output
        file.contents = new Buffer(output);
        cb(null, file);

    });

};
