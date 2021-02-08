let _ = require('lodash')
let moment = require('moment')
let pluralize = require('pluralize')
let newModelGenerator = require('./newModelGenerator')
let inquirerRecursive = require('inquirer-recursive')

module.exports = function (plop) {
  plop.setPrompt('recursive', inquirerRecursive)

  plop.setHelper('pluralizeSnakeCase', function (text) {
    return pluralize(_.lowerCase(text))
  });

  plop.setGenerator('model', newModelGenerator)

  // Model With API Generator
  // plop.setGenerator('model', {
  //   description: 'create a model for the front and backend!',
  //   prompts: [
  //     {
  //       message: 'Choose a model location:',
  //       type: 'list',
  //       name: 'folder',
  //       choices: ["admin", "client"],
  //     },
  //     {
  //       type: 'input',
  //       name: 'model',
  //       message: 'model name:'
  //     },
  //     {
  //       type: 'input',
  //       name: 'fields_string',
  //       message: 'add fields (e.g. first_name=string age=number ...)'
  //     },
  //     {
  //       type: 'boolean',
  //       name: 'create_vue_table',
  //       message: 'create vue table?'
  //     },
  //   ],
  //   actions(context) {
  //     context.model_pluralized = pluralize(_.lowerCase(context.model))
  //     context.barOpen = "{"
  //     context.barClose = "}"
  //     context.fields = createFieldsArray(context.fields_string)
  //     let actions =  [
  //       {
  //         type: 'add',
  //         path: `frontend/${context.folder}/src/components/OnClickCreate{{properCase model}}.vue`,
  //         templateFile: 'plop/templates/OnClickCreateModel.vue',
  //       },
  //       {
  //         type: 'add',
  //         path: 'app/{{properCase model}}.php',
  //         templateFile: 'plop/templates/Model.php',
  //       },
  //       {
  //         type: 'add',
  //         path: `database/migrations/${getMigrationTimestamp()}_create_{{snakeCase model_pluralized}}_table.php`,
  //         templateFile: 'plop/templates/create_model_table_migration.php',
  //       },
  //       {
  //         type: 'add',
  //         path: 'app/Http/Controllers/{{properCase model}}Controller.php',
  //         templateFile: 'plop/templates/ModelController.php',
  //       },
  //       {
  //         type: 'add',
  //         path: 'app/Http/Routes/{{properCase model}}Routes.php',
  //         templateFile: 'plop/templates/modelRoutes.php',
  //       },
  //       {
  //         type: 'add',
  //         path: `frontend/${context.folder}/src/store/classes/{{properCase model}}.js`,
  //         templateFile: 'plop/templates/ModelClass.js',
  //       },
  //       {
  //         type: 'append',
  //         path: 'routes/api.php',
  //         pattern: '\/\/ RESTful routes',
  //         template: "    require($routes_dir . '{{properCase model}}Routes.php');"
  //       },
  //       {
  //         type: 'append',
  //         path: `frontend/${context.folder}/src/store/VuexORMClasses.js`,
  //         pattern: '\/\/ Import Classes',
  //         template: "import {{properCase model}} from 'classes/{{properCase model}}'"
  //       },
  //       {
  //         type: 'append',
  //         path: `frontend/${context.folder}/src/store/VuexORMClasses.js`,
  //         pattern: '\/\/ Register Classes',
  //         template: "database.register({{properCase model}})"
  //       },
  //     ]

  //     if(context.create_vue_table) {
  //       actions.push(
  //         {
  //           type: 'add',
  //           path: `frontend/${context.folder}/src/components/{{properCase model_pluralized}}Table.vue`,
  //           templateFile: 'plop/templates/ModelTable.vue',
  //         },
  //       )
  //     }

  //     return actions
  //   }
  // });

  plop.setGenerator('test', {
    description: 'Create Test',
    prompts: [
      {
        type: 'input',
        name: 'model',
        message: 'Model Name: '
      },
      {
        type: 'checkbox',
        name: 'testType',
        message: 'Test Type: ',
        choices: ['api', 'unit']
      },
      {
        when: (context) => {
          return context.testType.includes('api')
        },
        type: 'confirm',
        name: 'clientAccess',
        message: 'Can a client access this resource? '
      },
    ],
    actions (context) {
      context.namePascal = _.chain(context.model)
        .camelCase().upperFirst().value()

      context.model_pluralized = pluralize(_.lowerCase(context.model))

      let actions = []

      if (context.testType.includes('api')) {
        actions.push({
          type: 'add',
          path: `tests/Feature/API/${context.namePascal}.php`,
          templateFile: 'plop/templates/ModelApiTest.php'
        })
      }

      if (context.testType.includes('unit')) {
        actions.push({
          type: 'add',
          path: `tests/Unit/${namePascal}.php`,
          templateFile: 'plop/templates/ModelUnitTest.php'
        })
      }

      return actions
    }
  });
};


function getMigrationTimestamp () {
  return moment().format("YYYY_MM_DD_HHMMSS")
}

function createFieldsArray (fields_string) {
  return fields_string.split(" ").map(field_type => {
    return {
      field: field_type.split("=")[0],
      type: field_type.split("=")[1],
      isFloat: field_type.split("=")[1] == 'float',
      isTimestamp: field_type.split("=")[1] == 'timestamp',
    }
  })
}