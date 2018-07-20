'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the beautiful
        ${chalk.red('generator-javascript-plugin')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'namespace',
        message: 'Please input your project namespace,such as @xunlei:',
        default: ''
      },
      {
        type: 'input',
        name: 'name',
        message: 'Please input project name:',
        default: 'js-plugin'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please input project description:',
        default: 'a javascript plugin'
      },
      {
        type: 'input',
        name: 'main',
        message: 'Main file (index.js):',
        default: 'index.js'
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        default: 'javascript,plugin'
      },
      {
        type: 'input',
        name: 'author',
        message: '"Author\'s Name"',
        default: ''
      },
      {
        type: 'input',
        name: 'email',
        message: '"Author\'s Email"',
        default: ''
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Project homepage url',
        default: ''
      },
      {
        type: 'input',
        name: 'homepage',
        message: '"Author\'s Homepage"',
        default: ''
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: 'MIT'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      if (this.props.namespace) {
        this.props.fullName = this.props.namespace + '/' + this.props.name;
      } else {
        this.props.fullName = this.props.name;
      }
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  _getCamelCaseName(name) {
    if (name.indexOf('-')) {
      let tempName = name.toLowerCase().split('-');

      for (let i = 1; i < tempName.length; i++) {
        tempName[i] =
          tempName[i].substring(0, 1).toUpperCase() + tempName[i].substring(1);
      }

      return tempName.join('');
    }
    return name;
  }

  writing() {
    this.log('\nWriting...\n');

    this._writingPackageJSON();
    this._writingREADME();
    this._writingBabelrc();
    this._writingGitignore();
    this._writingEditorConfig();
    this._writingEslintignore();
    this._writingEslintrc();
    this._writingJsDoc();
    this._writingSrc();
    this._writingBuild();
    this._writingDist();
    this._writingTest();
    this._writingDocs();
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        fullName: this.props.fullName,
        description: this.props.description,
        keywords: this.props.keywords.split(','),
        author: this.props.author,
        email: this.props.email,
        repository: this.props.repository,
        homepage: this.props.homepage,
        license: this.props.license
      }
    );
  }

  _writingREADME() {
    this.fs.copyTpl(
      this.templatePath('README.md'),

      this.destinationPath('README.md'),
      {
        name: this.props.name,
        fullName: this.props.fullName,
        description: this.props.description,
        author: this.props.author,
        year: new Date().getFullYear()
      }
    );
  }

  _writingBabelrc() {
    this.fs.copyTpl(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
  }

  _writingGitignore() {
    this.fs.copyTpl(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
  }

  _writingEditorConfig() {
    this.fs.copyTpl(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }

  _writingEslintrc() {
    this.fs.copyTpl(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );
  }

  _writingEslintignore() {
    this.fs.copyTpl(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );
  }

  _writingJsDoc() {
    this.fs.copyTpl(this.templatePath('jsdoc.json'), this.destinationPath('jsdoc.json'));
  }

  _writingSrc() {
    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js'),
      {
        name: this.props.name,
        fullName: this.props.fullName,
        author: this.props.author,
        license: this.props.license,
        camelCaseName: this._getCamelCaseName(this.props.name),
        year: new Date().getFullYear()
      }
    );
  }

  _writingTest() {
    this.fs.copyTpl(
      this.templatePath('test/index.js'),
      this.destinationPath('test/index.js')
    );
  }

  _writingBuild() {
    this.fs.copyTpl(
      this.templatePath('build/rollup.js'),
      this.destinationPath('build/rollup.js'),
      {
        name: this.props.name,
        camelCaseName: this._getCamelCaseName(this.props.name)
      }
    );
  }

  _writingDocs() {
    mkdirp('docs');
  }

  _writingDist() {
    mkdirp('dist');
  }

  install() {
    this.log('\nInstall deps...\n');
    this.installDependencies({ bower: false });
  }
};
