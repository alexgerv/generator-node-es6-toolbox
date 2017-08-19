const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    const prompts = [{
      name: 'name',
      message: 'What do you want to name your project?',
      default: _.kebabCase(this.appname) // Defaults to the project's folder name
    }, {
      name: 'description',
      message: 'What is the description of your module?',
      default: 'An awesome module'
    }, {
      name: 'authorName',
      message: 'What is your name?',
      default: this.user.git.name()
    }, {
      name: 'authorEmail',
      message: 'What is your email?',
      default: this.user.git.email()
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.props);
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this.props);
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('test'), this.destinationPath('test'));
    this.fs.copy(this.templatePath('./.*'), this.destinationPath());
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
};
