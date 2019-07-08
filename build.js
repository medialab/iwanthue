const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

const INCLUDES_RE = /<\?php\s+include\(['"]([^'"]+\.php)['"]\);?\s*\?>/gi;

const GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS,
      TWEET = process.env.TWEET;

if (!GOOGLE_ANALYTICS || !TWEET) {
  console.error('Missing env var!');
  process.exit(1);
}

const phpFiles = glob.sync('*.php');
fs.ensureDirSync('./build');

function solveIncludes(code) {
  return code.replace(INCLUDES_RE, function(m, p) {

    const includedCode = fs.readFileSync(p, 'utf-8')
      .replace(/\$GOOGLE_ANALYTICS/g, GOOGLE_ANALYTICS)
      .replace(/\$TWEET/g, TWEET);

    return includedCode;
  });
}

// Resolving PHP files
phpFiles.forEach(file => {
  console.log(`Processing ${file}...`);

  let code = fs.readFileSync(file, 'utf-8');

  code = solveIncludes(code);

  fs.writeFileSync(path.join('./build', file), code, 'utf-8');
});

// Copying assets
const ASSETS = [
  'css',
  'img',
  'js',
  'res'
];

console.log('Copying assets...');
ASSETS.forEach(dir => {
  fs.copySync(dir, path.join('./build', dir));
});

const GLOB_ASSETS = [
  '*.png',
  'favicon.ico',
  'humans.txt',
  'robots.txt',
  'meta.json'
];

GLOB_ASSETS.forEach(g => {
  glob.sync(g).forEach(p => {
    fs.copyFileSync(p, path.join('./build', p));
  });
});

console.log('Success!');
