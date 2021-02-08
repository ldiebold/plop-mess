import axios from 'axios'
import { Model } from '@vuex-orm/core'
{{#if hasDates}}import { dateMutator } from '@ldiebold/js-helpers'{{/if}}

export default class {{properCase modelName}} extends Model {
  static entity = '{{snakeCase modelNamePlural}}'

  /**
   * Fields
   */
  static fields () {
    return {
      id: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null),
      
      {{#each fields}}
      {{#if this.isTimestamp}}
      {{this.name}}: this.attr(null, dateMutator),
      {{else}}
      {{this.name}}: this.attr(null),
      {{/if}}
      {{/each}}
      // relationships
    }
  }
}