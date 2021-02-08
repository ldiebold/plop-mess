<?php

/**
 * {{ titleCase modelName }} Routes
 */
{{#if clientAccess}}
Route::prefix('{{snakeCase modelNamePlural}}')->group(function() {
{{else}}
Route::group(['prefix' => 'expenses', 'middleware' => 'admin'], function () {
{{/if}}
  /**
   * CRUD
   */
  // Create
  Route::post('', '{{properCase modelName}}Controller@store'){{#unless clientAccess}};{{/unless}}
    {{#if clientAccess}}->middleware('can:create,App\\{{pascalCase modelName}}');{{/if}}
  // Index
  Route::get('', '{{properCase modelName}}Controller@index'){{#unless clientAccess}};{{/unless}}
    {{#if clientAccess}}->middleware('can:viewAny,App\\{{pascalCase modelName}}');{{/if}}
  // Show
  Route::get('{{barOpen}}{{snakeCase modelName}}{{barClose}}', '{{properCase modelName}}Controller@show'){{#unless clientAccess}};{{/unless}}
    {{#if clientAccess}}->middleware('can:view,App\\{{snakeCase modelName}}');{{/if}}
  // Update
  Route::patch('{{barOpen}}{{snakeCase modelName}}{{barClose}}', '{{properCase modelName}}Controller@update'){{#unless clientAccess}};{{/unless}}
    {{#if clientAccess}}->middleware('can:update,{{snakeCase modelName}}');{{/if}}
  // Delete
  Route::delete('{{barOpen}}{{snakeCase modelName}}{{barClose}}', '{{properCase modelName}}Controller@destroy'){{#unless clientAccess}};{{/unless}}
    {{#if clientAccess}}->middleware('can:delete,{{snakeCase modelName}}');{{/if}}
});