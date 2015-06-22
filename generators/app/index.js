'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

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
    packageJson: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintignore'),
        this.destinationPath('.eslintignore')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('travis.yml'),
        this.destinationPath('.travis.yml')
      );
      this.fs.copy(
        this.templatePath('test-setup.js'),
        this.destinationPath('test-setup.js')
      );
    },

    readme: function() {
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        this.props
      );
    },

    license: function() {
      this.fs.copyTpl(
        this.templatePath('_LICENSE'),
        this.destinationPath('LICENSE'),
        this.props
      );
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
