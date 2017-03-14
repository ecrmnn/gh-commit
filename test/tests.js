'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const git = require('../src');
const axios = require('axios');
const uuid = require('uuid4');
require('dotenv').config();

git.config.repo = {
  author: process.env.REPO_AUTHOR,
  name: process.env.REPO_NAME + '-' + uuid()
};

git.config.auth = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
}

describe('Module Boilerplate Test Suite', function () {

  describe('Create testing repository on Github', function () {
    let results;

    before(function (done) {
      axios.post('https://api.github.com/user/repos', {
        name: git.config.repo.name,
        private: false,
        has_issues: true,
        has_wiki: true,
        auto_init: true
      }, {
        auth: git.config.auth
      })
        .then(response => {
          results = response.data;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it('Create repository', function () {
      expect(results.id).to.be.a('number');
      expect(results.name).to.be.eql(git.config.repo.name);
    });
  });

  describe('Create files in repository', function () {
    let success = false;

    before(function (done) {
      git.commit([{
        path: 'hello.txt',
        content: 'hello from hello.txt'
      }, {
        path: 'xoxo.txt',
        content: 'hello from xoxo.txt'
      }])
        .then(() => {
          success = true;
          done();
        })
        .catch(() => {
          success = false;
          done();
        });
    });

    it('Create files', function () {
      expect(success).to.eql(true);
    });
  });

  describe('Validate committed file', function () {
    let results;

    before(function (done) {
      axios
        .get('https://raw.githubusercontent.com/' +
          process.env.REPO_AUTHOR + '/' + git.config.repo.name +
          '/master/hello.txt'
        )
        .then(response => {
          results = response.data;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it('Validate contents of hello.txt', function () {
      expect(results).to.eql('hello from hello.txt');
    });
  });

  describe('Delete testing repository on Github', function () {
    before(function (done) {
      axios
        .delete('https://api.github.com/repos/' + process.env.REPO_AUTHOR + '/' + git.config.repo.name, {
          auth: git.config.auth
        })
        .then(response => {
          console.log(response.data);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});