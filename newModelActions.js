require('dotenv').config()
let env = process.env
let _ = require('lodash')
let collect = require('collect.js')
let pluralize = require('pluralize')
let getMigrationTimestamp = require('./getMigrationTimestamp')

_.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });

module.exports = (context) => {
  context.modelNamePlural = pluralize(_.lowerCase(context.modelName))

  context.barOpen = "{"
  context.barClose = "}"

  context.timestampFields = collect(context.fields)
    .filter(field => field.type == 'timestamp')
    .all()

  context.fields = context.fields.map(field => {
    // set field.hasDecimals
    if (["float", "double", "decimal"].includes(field.type)) {
      field.hasDecimals = true
    } else {
      field.hasDecimals = false
    }
    // set field.isNumber
    if ([
      "float", "double", "decimal",
      "tinyInteger", "smallInteger", "mediumInteger", "integer", "bigInteger",
    ].includes(field.type)) {
      field.isNumber = true
    } else {
      field.isNumber = false
    }
    // make it easy to check field type
    field[`is${_.upperFirst(field.type)}`] = true
    // Set a component name for each field
    // Timestamp
    // 
    field.componentName = `${_.pascalCase(context.modelName)}${_.pascalCase(field.name)}Input`

    return field
  })

  context.hasDates = !!context.fields.find(field => field.type == 'timestamp')

  // Map Admin Access
  if (context.adminAccess) {
    let adminAccess = context.adminAccess

    context.adminAccess.forEach(item => {
      adminAccess[item] = true
    })

    context.adminAccess = adminAccess

    context.adminFullAccess = (
      adminAccess.create && adminAccess.index && adminAccess.read
      && adminAccess.update && adminAccess.delete
    )
  }

  // Map Client Access
  if (context.clientAccess) {
    let clientAccess = context.clientAccess

    context.clientAccess.forEach(item => {
      clientAccess[item] = true
    })

    context.clientAccess = clientAccess

    if (!context.adminFiles) context.adminFiles = []
    if (!context.clientFiles) context.clientFiles = []
    if (!context.backendFiles) context.backendFiles = []
  }

  return [
    // PHP Model
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/app/{{pascalCase modelName}}.php`,
      templateFile: 'templates/Model.php',
      skip () {
        if (!context.backendFiles.includes('model')) return 'not selected'
      }
    },
    // Migration
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/database/migrations/${getMigrationTimestamp()}_create_{{snakeCase modelNamePlural}}_table.php`,
      templateFile: 'templates/create_model_table_migration.php',
      skip () {
        if (!context.backendFiles.includes('migration')) return 'not selected'
      }
    },
    // Factory
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/database/factories/{{pascalCase modelName}}Factory.php`,
      templateFile: 'templates/ModelFactory.php',
      skip () {
        if (!context.backendFiles.includes('factory')) return 'not selected'
      }
    },
    // Routes
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/app/Http/Routes/{{pascalCase modelName}}Routes.php`,
      templateFile: 'templates/modelRoutes.php',
      skip () {
        if (!context.backendFiles.includes('routes')) return 'not selected'
      }
    },
    // Controller
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/app/Http/Controllers/{{pascalCase modelName}}Controller.php`,
      templateFile: 'templates/ModelController.php',
      skip () {
        if (!context.backendFiles.includes('controller')) return 'not selected'
      }
    },
    // API Tests
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/tests/Feature/API/{{pascalCase modelName}}Test.php`,
      templateFile: 'templates/ModelApiTest.php',
      skip () {
        if (!context.backendFiles.includes('apiTests')) return 'not selected'
      }
    },
    // Unit Tests
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/tests/Unit/{{pascalCase modelName}}Test.php`,
      templateFile: 'templates/ModelUnitTest.php',
      skip () {
        if (!context.backendFiles.includes('unitTests')) return 'not selected'
      }
    },
    // Policy
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/app/Policies/{{pascalCase modelName}}Policy.php`,
      templateFile: 'templates/ModelPolicy.php',
      skip () {
        if (!context.backendFiles.includes('policy')) return 'not selected'
      }
    },
    // Observer
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/app/Observers/{{pascalCase modelName}}Observer.php`,
      templateFile: 'templates/ModelObserver.php',
      skip () {
        if (!context.backendFiles.includes('observer')) return 'not selected'
      }
    },
    // Seeder
    {
      type: 'add',
      path: `${env.API_DIRECTORY}/database/seeds/{{pascalCase modelName}}Seeder.php`,
      templateFile: 'templates/ModelSeeder.php',
      skip () {
        if (!context.backendFiles.includes('seeder')) return 'not selected'
      }
    },

    // VuexORM Class
    {
      type: 'add',
      path: `${env.CLASSES_SRC_DIRECTORY}/classes/{{pascalCase modelName}}.js`,
      templateFile: 'templates/ModelClass.js',
      skip () {
        if (!context.adminFiles.includes('vuexOrmClass')
          && !context.clientFiles.includes('vuexOrmClass')
        ) return 'not selected'
      }
    },
    {
      type: 'add',
      path: `${env.ADMIN_DIRECTORY}/src/components/Create{{pascalCase modelName}}Button.vue`,
      templateFile: 'templates/CreateModelButton.vue',
      skip () {
        if (!context.adminFiles.includes('createButton')) return 'not selected'
      }
    },
    // Admin Update Button (Includes Form and Modal)
    {
      type: 'add',
      path: `${env.ADMIN_DIRECTORY}/src/components/Update{{pascalCase modelName}}Button.vue`,
      templateFile: 'templates/UpdateModelButton.vue',
      skip () {
        if (!context.adminFiles.includes('updateButton')) return 'not selected'
      }
    },
    // Admin Form
    {
      type: 'add',
      path: `${env.ADMIN_DIRECTORY}/src/components/{{pascalCase modelName}}Form.vue`,
      templateFile: 'templates/ModelForm.vue',
      skip () {
        if (
          !context.adminFiles.includes('form')
          && !context.adminFiles.includes('createButton')
          && !context.adminFiles.includes('updateButton')
        ) return 'not selected'
      }
    },
    // Admin Fields
    ...context.fields.map(field => {
      return {
        type: 'add',
        data: { field },
        path: `${env.ADMIN_DIRECTORY}/src/components/{{pascalCase modelName}}${_.upperFirst(_.camelCase(field.name))}Input.vue`,
        templateFile: 'templates/ModelFieldInput.vue',
        skip () {
          if (!context.adminFiles.includes('inputFieldComponents')) return 'not selected'
        }
      }
    }),
    // Client Create Button (Includes Form and Modal)
    {
      type: 'add',
      path: `${env.APP_DIRECTORY}/src/components/Create{{pascalCase modelName}}Button.vue`,
      templateFile: 'templates/CreateModelButton.vue',
      skip () {
        if (!context.clientFiles.includes('createButton')) return 'not selected'
      }
    },
    // Client Update Button (Includes Form and Modal)
    {
      type: 'add',
      path: `${env.APP_DIRECTORY}/src/components/Update{{pascalCase modelName}}Button.vue`,
      templateFile: 'templates/UpdateModelButton.vue',
      skip () {
        if (!context.clientFiles.includes('updateButton')) return 'not selected'
      }
    },
    // Client Form
    {
      type: 'add',
      path: `${env.APP_DIRECTORY}/src/components/{{pascalCase modelName}}Form.vue`,
      templateFile: 'templates/ModelForm.vue',
      skip () {
        if (!context.clientFiles.includes('form')) return 'not selected'
      }
    },
    // Client Fields
    ...context.fields.map(field => {
      return {
        type: 'add',
        data: { field },
        path: `${env.APP_DIRECTORY}/src/components/{{pascalCase modelName}}${_.upperFirst(_.camelCase(field.name))}Input.vue`,
        templateFile: 'templates/ModelFieldInput.vue',
        skip () {
          if (!context.clientFiles.includes('inputFieldComponents')) return 'not selected'
        }
      }
    }),

    // Add to api.php routes file
    {
      type: 'append',
      path: `${env.API_DIRECTORY}/routes/api.php`,
      pattern: '\/\/ RESTful routes',
      template: "    require ($routes_dir.'{{pascalCase modelName}}Routes.php');",
      skip () {
        if (!context.backendFiles.includes('routes')) return 'not selected'
      }
    },
    // Append import to orm-classes package
    {
      type: 'append',
      path: `${env.CLASSES_SRC_DIRECTORY}/index.js`,
      pattern: '\/\/ Imports',
      template: "import {{pascalCase modelName}} from './classes/{{pascalCase modelName}}'",
      skip () {
        if (
          !context.adminFiles.includes('vuexOrmClass')
          && !context.clientFiles.includes('vuexOrmClass')
        ) return 'not selected'
      }
    },
    // Append export to orm-classes package
    {
      type: 'append',
      path: `${env.CLASSES_SRC_DIRECTORY}/index.js`,
      pattern: '\/\/ Exports',
      template: "  {{pascalCase modelName}},",
      skip () {
        if (
          !context.adminFiles.includes('vuexOrmClass')
          && !context.clientFiles.includes('vuexOrmClass')
        ) return 'not selected'
      }
    },
    // Append VuexORM Class import Admin
    {
      type: 'append',
      path: `${env.ADMIN_DIRECTORY}/src/store/VuexORMClasses.js`,
      pattern: '\/\/ Import Classes',
      template: "  {{pascalCase modelName}},",
      skip () {
        if (!context.adminFiles.includes('vuexOrmClass')) return 'not selected'
      }
    },
    // Append VuexORM Database import Admin
    {
      type: 'append',
      path: `${env.ADMIN_DIRECTORY}/src/store/VuexORMClasses.js`,
      pattern: '\/\/ Register Classes',
      template: "database.register({{pascalCase modelName}})",
      skip () {
        if (!context.adminFiles.includes('vuexOrmClass')) return 'not selected'
      }
    },
    // Append VuexORM Class import Client
    {
      type: 'append',
      path: `${env.APP_DIRECTORY}/src/store/VuexORMClasses.js`,
      pattern: '\/\/ Import Classes',
      template: "  {{pascalCase modelName}},",
      skip () {
        if (!context.clientFiles.includes('vuexOrmClass')) return 'not selected'
      }
    },
    // Append VuexORM Database import Client
    {
      type: 'append',
      path: `${env.APP_DIRECTORY}/src/store/VuexORMClasses.js`,
      pattern: '\/\/ Register Classes',
      template: "database.register({{pascalCase modelName}})",
      skip () {
        if (!context.clientFiles.includes('vuexOrmClass')) return 'not selected'
      }
    },
  ]
}