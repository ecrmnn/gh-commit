# gh-commit
> Fastest way of committing new files to Github

[![Travis](https://img.shields.io/travis/ecrmnn/gh-commit.svg?style=flat-square)](https://travis-ci.org/ecrmnn/gh-commit'.svg?branch=master)
[![npm version](https://img.shields.io/npm/v/gh-commit.svg?style=flat-square)](http://badge.fury.io/js/gh-commit')
[![npm downloads](https://img.shields.io/npm/dm/gh-commit.svg?style=flat-square)](http://badge.fury.io/js/gh-commit')
[![npm license](https://img.shields.io/npm/l/gh-commit.svg?style=flat-square)](http://badge.fury.io/js/gh-commit')

### Installation
```bash
npm install gh-commit --save
```

### Usage
```js
const git = require('gh-commit');

git.config.repo = {
  author: 'github username or organization name',
  name: 'name-of-repository'
};

git.config.auth = {
  username: 'github username',
  password: 'github password or access token'
}

git.commit([{
    path: 'hello.txt',
    content: 'hello from hello.txt'
  }, {
    path: 'xoxo.txt',
    content: 'hello from xoxo.txt'
  }])
  .then(() => {
    // Do stuff
  })
  .catch(err => console.log(err));
```

### License
MIT © [Daniel Eckermann](http://danieleckermann.com)