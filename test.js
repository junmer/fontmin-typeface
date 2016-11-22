/**
 * @file test
 * @author junmer
 */

/* eslint-env node */

'use strict';


var assert = require('assert');
var path = require('path');
var fs = require('fs');
var del = require('del');
var vfs = require('vinyl-fs');
var typeface = require('./index');

var Fontmin = require('fontmin');

var outputPath = 'example/fonts/build';
var fontFileName = 'sentybrush_regular';

before(function (done) {
    del(outputPath).then(function () {
        done();
    });
});


it('output is typeface.json', function (done) {

    var fsOpt = {cwd: __dirname};

    var stream = vfs.src(['fixtures/*.ttf'], fsOpt)
        .pipe(Fontmin.glyph({text: 'hello world'})())
        .pipe(typeface({clone: false})())
        .pipe(vfs.dest(outputPath, fsOpt));

    stream.on('end', function (a) {
        var filePath = path.resolve(outputPath, fontFileName + '.typeface.json');
        assert.ok(fs.existsSync(filePath));
        done();
    });

});
