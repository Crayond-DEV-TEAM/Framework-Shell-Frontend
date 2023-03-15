const toCamelWord = (word, idx) =>
  idx === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

const toCamelCase = (text) =>
  text
    .split(/[_-\s]+/)
    .map(toCamelWord)
    .join('');

module.exports = function (plop) {
  plop.addHelper('directory', (type, appName, compName) => {
    if (type === 'atom') {
      return `packages/ui/${type}s/${toCamelCase(compName)}`;
    }
    if (type === 'component' && !appName) {
      return `packages/ui/${type}s/${toCamelCase(compName)}`;
    }
    if (type === 'component' && appName) {
      return `packages/ui/${type}s/${appName}/${toCamelCase(compName)}`;
    }
  });

  plop.addHelper('storyName', (comp) => `${toCamelCase(comp)}.stories.tsx`);

  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What do you want to create?',
        choices: ['atom', 'component'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of it?',
        validate: function (name) {
          if (name.trim().length === 0) {
            return 'Name is required';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'isForwardRef',
        message: 'Do you want to add forward ref?',
        default: false,
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'Is it a common component or app specific?',
        choices: ['common', 'app'],
        default: 'common',
        when(answers) {
          return answers.type === 'component';
        },
      },
      {
        type: 'input',
        name: 'appName',
        message: 'name of the app?',
        when(answers) {
          return answers.componentType === 'app';
        },
        validate: function (appName) {
          if (appName.trim().length === 0) {
            return 'App Name is required';
          }
          return true;
        },
      },
    ],
    actions: () => {
      const actions = [
        {
          type: 'add',
          path: '{{directory type appName name}}/index.tsx',
          templateFile: 'plop-templates/component/component.hbs',
        },
        {
          type: 'add',
          path: '{{directory type appName name}}/{{storyName name}}',
          templateFile: 'plop-templates/component/story.hbs',
        },
        {
          type: 'add',
          path: '{{directory type appName name}}/style.ts',
          templateFile: 'plop-templates/component/style.hbs',
        },
        {
          type: 'append',
          description: 'Appends the export of atom/component to the atoms/components index',
          path: 'packages/ui/{{type}}s/index.tsx',
          templateFile: 'plop-templates/component/export.hbs',
        },
      ];
      return actions;
    },
  });

  plop.setGenerator('package', {
    description: 'Create a new package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your package?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/package/index.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{camelCase name}}/.eslintrc.js',
        templateFile: 'plop-templates/package/eslint.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{camelCase name}}/package.json',
        templateFile: 'plop-templates/package/packageJson.hbs',
      },
    ],
  });
};
