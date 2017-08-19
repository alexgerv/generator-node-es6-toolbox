const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const run = () => helpers.run(path.join(__dirname, '../generators-src/app'));

describe('generator', () => {
  const files = [
    'src/index.js',
    'test/index.js',
    '.babelrc',
    '.editorconfig',
    '.gitignore',
    'README.md',
    'package.json'
  ];

  it('copies files properly', async () => {
    await run();
    assert.file(files);
  });

  it('copies files passing name as argument', async () => {
    const dir = await run().withPrompts({name: 'generated-test'});
    assert.file(files);
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json')));
    expect(pkg.name).toBe('generated-test');
  });
});

