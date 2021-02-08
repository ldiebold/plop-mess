<template>
  <QForm ref="form">
    {{#each fields}}
    <!-- {{this.name}} -->
    <{{this.componentName}}
      v-model="form.{{snakeCase this.name}}"
      ref="{{camelCase this.name}}Field"
      name="{{snakeCase this.name}}"
    />

    {{/each}}
    <!-- Submit Button -->
    <QBtn
      :loading="saving"
      @click.native="handleSubmit"
      :label="method == 'create' ? 'create' : 'update'"
      icon="mdi-content-save"
      class="q-mt-md"
      color="secondary"
    />
  </QForm>
</template>

<script>
import {{ properCase modelName }} from 'classes/{{ properCase modelName }}'
{{#each fields}}
import {{this.componentName}} from 'components/{{this.componentName}}.vue'
{{/each}}

export default {
  components: {
    {{#each fields}}
    {{this.componentName}},
    {{/each}}
  },

  props: {
    method: {
      required: true,
      validator(value) {
        return ['create', 'update'].includes(value)
      }
    },

    current{{ properCase modelName }}: {
      required: false,
      type: Object
    }
  },

  data () {
    return {
      formHasError: false,

      saving: false,

      response_errors: [],

      form: {
        {{#each fields}}
        {{this.name}}: null,
        {{/each}}
      },
    }
  },

  created() {
    if(this.method == 'update') {
      let {{ camelCase modelName }} = {{ properCase modelName }}.find(this.current{{ properCase modelName }}.id)
        
      Object.keys(this.form).forEach(key => {
        this.$set(this.form, key, this.current{{ properCase modelName }}[key])
      })
    }
  },

  methods: {
    handleSubmit() {
      this.$refs.form.validate()
      .then(success => {
        if(success) {
          this.saving = true
          if(this.method == 'create') this.create{{ properCase modelName }}()
          if(this.method == 'update') this.update{{ properCase modelName }}()
        }
      })
    },

    // Create Logic
    create{{ properCase modelName }}() {
      {{ properCase modelName }}.$create(this.form)
      .then(this.handleSuccess)
      .catch(this.handleError)
    },

    // Update Logic
    update{{ properCase modelName }}() {
      {{ properCase modelName }}.find(this.current{{ properCase modelName }}.id)
      .$update(this.form)
      .then(this.after{{ properCase modelName }}Updated)
    },

    handleError(error) {
      this.$q.notify({
        message: error.message,
        type: 'negative'
      })
      this.$emit('error', error)
      this.saving = false
    },

    validateForm() {
      // let fieldRefs = [
      //   {{#each fields}}
      //   this.$refs.{{camelCase this.name}}Field,
      //   {{/each}}
      // ]
      // fieldRefs.each(fieldRef => fieldRef.validate())
    },

    handleSuccess() {
      this.$q.notify({
        message: '',
        type: 'positive'
      })

      if(this.created)
        this.$emit('created')

      if(this.updated)
        this.$emit('updated')

      this.$emit('success')

      this.saving = false
    }
  }
}
</script>