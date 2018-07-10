'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-javascript-plugin:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['build/rollup.js']);
    assert.file(['dist']);
    assert.file(['src']);
    assert.file(['test']);
    assert.file(['package.json']);
    assert.file(['.babelrc']);
    assert.file(['.editorconfig']);
    assert.file(['.eslintignore']);
    assert.file(['.eslintrc.js']);
    assert.file(['.gitignore']);
    assert.file(['jsdoc.json']);
    assert.file(['docs']);
    assert.file(['README.md']);
  });
});
