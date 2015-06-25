'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var copyDotFile = function(fileName) {
  this.fs.copy(
    this.templatePath(fileName),
    this.destinationPath('.' + fileName)
  );
};

var copyTemplate = function(fileName) {
  this.fs.copyTpl(
    this.templatePath('_' + fileName),
    this.destinationPath(fileName),
    this.props
  );
};

module.exports = yeoman.generators.Base.extend({

  initializing: function() {
    var name = path.basename(process.cwd());
    this.props = {
      name: name,
      lowerCaseName: name.toLowerCase(),
      year: new Date().getFullYear()
    };
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.blue('ThomNPM') + ' generator!'
    ));

    this.log('Generating:', this.appname);

    var prompts = [{
      type: 'input',
      name: 'description',
      message: 'Enter a description of the package:',
      default: ''
    }];

    this.prompt(prompts, function(props) {
      this.props.description = props.description;
      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function() {
      ['editorconfig', 'eslintignore', 'eslintrc', 'gitignore', 'travis.yml', 'npmignore', 'babelrc']
        .forEach(copyDotFile.bind(this));
      this.fs.copy(
        this.templatePath('test-setup.js'),
        this.destinationPath('test-setup.js')
      );
    },

    templates: function() {
      ['README.md', 'LICENSE', 'package.json']
        .forEach(copyTemplate.bind(this));
    },

    blanks: function() {
      this.fs.write(this.destinationRoot() + '/src/__tests__/index_tests.js', '');
      this.fs.write(this.destinationRoot() + '/src/index.js', '');
    }
  },

  install: function() {
    this.npmInstall();
  }
});
