/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
{
  var SourceMapGenerator = require('../lib/source-map-generator').SourceMapGenerator;
  var SourceMapConsumer = require('../lib/source-map-consumer').SourceMapConsumer;
  var SourceNode = require('../lib/source-node').SourceNode;
  var util = require('./util');

  exports['test identity first'] = function (assert) {
    var firstSourceMap = {
      version: 3,
      file: 'firstResult.js',
      names: [],
      sources: ['source.js'],
      sourceRoot: '/',
      mappings: 'AAAA'
    };

    var secondSourceMap = {
      version: 3,
      file: 'secondResult.js',
      names: [],
      sources: ['firstResult.js'],
      sourceRoot: '/',
      mappings: 'AAAA,CAAE,CAAE,CAAE,CAAE'
    };

    var expectedMap = {
      version: 3,
      file: 'secondResult.js',
      names: [],
      sources: ['source.js'],
      sourceRoot: '/',
      mappings: 'AAAA,CAAE,CAAE,CAAE,CAAE'
    };

    var sm1 = new SourceMapConsumer(firstSourceMap);
    var sm2 = new SourceMapConsumer(secondSourceMap);


    // apply source map "mapStep1" to "mapStep2"
    var generator = SourceMapGenerator.fromSourceMap(sm2);
    generator.applySourceMap(sm1);
    var actualMap = generator.toJSON();

    util.assertEqualMaps(assert, actualMap, expectedMap);
  };
  
  exports['test identity last'] = function (assert) {
    var firstSourceMap = {
      version: 3,
      file: 'firstResult.js',
      names: [],
      sources: ['source.js'],
      sourceRoot: '/',
      mappings: 'AAAA,CAAE,CAAE,CAAE,CAAE'
    };

    var secondSourceMap = {
      version: 3,
      file: 'secondResult.js',
      names: [],
      sources: ['firstResult.js'],
      sourceRoot: '/',
      mappings: 'AAAA'
    };

    var expectedMap = {
      version: 3,
      file: 'secondResult.js',
      names: [],
      sources: ['source.js'],
      sourceRoot: '/',
      mappings: 'AAAA,CAAE,CAAE,CAAE,CAAE'
    };

    var sm1 = new SourceMapConsumer(firstSourceMap);
    var sm2 = new SourceMapConsumer(secondSourceMap);


    // apply source map "mapStep1" to "mapStep2"
    var generator = SourceMapGenerator.fromSourceMap(sm2);
    generator.applySourceMap(sm1);
    var actualMap = generator.toJSON();

    util.assertEqualMaps(assert, actualMap, expectedMap);
  };
}
