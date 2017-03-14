'use strict';

const axios = require('axios');
const sequential = require('promise-sequential');

const config = {
  auth: {
    username: null || process.env.GITHUB_USERNAME,
    password: null || process.env.GITHUB_PASSWORD
  },
  repo: {
    author: null || process.env.GITHUB_AUTHOR,
    name: null || process.env.GITHUB_REPO_NAME
  }
}

const buildEndpoint = function (filePath) {
  return 'https://api.github.com/repos/' + config.repo.author + '/' + config.repo.name + '/contents/' + filePath;
}

exports.config = config;

exports.commit = function (files, credientials) {
  return sequential(files.map((file) => {
    return function () {
      return new Promise((resolve, reject) => {
        axios.put(buildEndpoint(file.path), {
          message: file.path,
          content: new Buffer(file.content).toString('base64')
        }, {
          auth: {
            username: config.auth.username || credientials.username,
            password: config.auth.password || credientials.password,
          }
        }).then(response => {
          resolve(response.data);
        }).catch(err => reject(err));
      });
    }
  }));
};