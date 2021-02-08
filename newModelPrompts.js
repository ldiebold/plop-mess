module.exports = [
  {
    message: 'Model Name',
    type: 'input',
    name: 'modelName',
  },

  {
    message: 'Frontends',
    type: 'checkbox',
    name: 'frontends',
    choices: ['admin', 'client']
  },

  {
    when(context) { return context.frontends.includes('admin') },
    message: 'How can an admin access this resource?',
    type: 'checkbox',
    choices: ["create", "index", "read", "update", "delete", "delete all"],
    default: ["create", "index", "read", "update", "delete"],
    name: 'adminAccess',
  },

  {
    when(context) { return context.frontends.includes('client') },
    message: 'How can a client access this resource?',
    choices: ["create", "index", "read"],
    default: ["index", "read"],
    type: 'checkbox',
    name: 'clientAccess',
  },

  {
    message: 'What backend files need to be generated?',
    choices: [
      { name: 'Model', value: 'model' },
      { name: 'Migration', value: 'migration' },
      { name: 'Factory', value: 'factory' },
      { name: 'Routes', value: 'routes' },
      { name: 'Controller', value: 'controller' },
      { name: 'API Tests', value: 'apiTests' },
      { name: 'Unit Tests', value: 'unitTests' },
      { name: 'Policy', value: 'policy' },
      { name: 'Observer', value: 'observer' },
      { name: 'Seeder', value: 'seeder' },
    ],
    default: [
      'model',
      'migration',
      'factory',
      'routes',
      'controller',
      'apiTests',
      'policy',
      'observer',
      'seeder',
    ],
    type: 'checkbox',
    name: 'backendFiles',
  },

  {
    when(context) { return context.frontends.includes('admin') },
    message: 'What admin frontend files need to be generated?',
    choices: [
      { name: 'VuexORM Class', value: 'vuexOrmClass' },
      { name: 'Create Button (Includes Form)', value: 'createButton' },
      { name: 'Update Button (Includes Form)', value: 'updateButton' },
      // { name: 'Editable Table', value: 'editableTable' },
      // { name: 'Viewable Table', value: 'viewableTable' },
      { name: 'Form', value: 'form' },
      { name: 'Input Field Components', value: 'inputFieldComponents' },
    ],
    default: ['vuexOrmClass', 'createButton', 'updateButton', 'form', 'inputFieldComponents'],
    type: 'checkbox',
    name: 'adminFiles',
  },

  {
    when(context) { return context.frontends.includes('client') },
    message: 'What client frontend files need to be generated?',
    choices: [
      { name: 'VuexORM Class', value: 'vuexOrmClass' },
      { name: 'Create Button (Includes Form and Modal)', value: 'createButton' },
      { name: 'Update Button (Includes Form and Modal)', value: 'updateButton' },
      // { name: 'Editable Table', value: 'editableTable' },
      // { name: 'Viewable Table', value: 'viewableTable' },
      { name: 'Form', value: 'form' },
      { name: 'Input Field Components', value: 'inputFieldComponents' },
    ],
    default: ['vuexOrmClass', 'inputFieldComponents'],
    type: 'checkbox',
    name: 'clientFiles',
  },

  {
    message: 'Would you like to add a field?',
    type: 'recursive',
    name: 'fields',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Field Name',
      },

      {
        type: 'list',
        name: 'type',
        message: 'Field Type:',
        choices: [
          "string", "text", "json",
          "boolean",
          "timestamp",
          "float", "double", "decimal",
          "tinyInteger", "smallInteger", "mediumInteger", "integer", "bigInteger",
        ]
      },

      {
        type: 'confirm',
        when(context) {
          return ["tinyInteger", "smallInteger", "mediumInteger", "integer", "bigInteger"].includes(context.type)
        },
        name: 'isUnsigned',
        message: 'Is the integer unsigned?',
      },

      /**
       * Prompt for extra data with decimal types
       */
      {
        when(context) {
          return ["float", "double", "decimal"].includes(context.type)
        },
        message: 'Total digits:',
        type: 'input',
        name: 'digits',
      },

      {
        when(context) {
          return ["float", "double", "decimal"].includes(context.type)
        },
        message: 'Total decimals:',
        type: 'input',
        name: 'decimals',
      },

      /**
       * Prompt for nullable
       */
      {
        message: 'Will this field be nullable?',
        type: 'confirm',
        name: 'nullable',
      },
    ]
  },
]