<template>
  {{#if field.isBoolean}}
  <QCheckbox
    :value="value"
    v-bind="$attrs"
    v-on="listeners"
    :label="label"
  />
  {{else}}
  <QInput
    :value="value"
    v-bind="$attrs"
    v-on="listeners"
    :rules="[
      value => true || ''
    ]"
    :label="label"
    {{#if field.isNumber}}
    type="number"
    {{/if}}
    {{#if field.isTimestamp}}
    mask="##/##/##"
    placeholder="MM/DD/YY"
    {{/if}}
  >
    {{#if field.isTimestamp}}
    <template v-slot:prepend>
      <QIcon name="mdi-calendar"></QIcon>
    </template>
    {{/if}}
  </QInput>
  {{/if}}
</template>

<script>
// import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    value: {
      required: true,
    },

    label: {
      required: false,
      default: '{{sentenceCase this.field.name}}'
    }
  },

  components: {

  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: value => this.$emit('input', value)
      }
    },
  },

  methods: {
    
  },

  data() {
    return {
      
    }
  },
}

</script>