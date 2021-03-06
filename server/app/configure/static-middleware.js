'use strict';
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

module.exports = function (app) {

  const root = app.getValue('projectRoot');

  const npmPath = path.join(root, './node_modules');
  const bowerPath = path.join(root, './bower_components');
  const publicPath = path.join(root, './public');
  const browserPath = path.join(root, './browser');
  const assetsPath = path.join(root, './assets');

  app.use(favicon(app.getValue('faviconPath')));
  app.use(express.static(npmPath));
  app.use(express.static(bowerPath));
  app.use(express.static(publicPath));
  app.use(express.static(browserPath));
  app.use(express.static(assetsPath));

};
