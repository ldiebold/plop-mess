<template>
  <ModalButton
    v-bind="$attrs"
    v-on="listeners"
    :toolbar="{
      title: 'Create {{titleCase modelName}}'
    }"
    ref="create{{properCase modelName}}Button"
  >
    <slot />

    <template v-slot:body>
      <{{properCase modelName}}Form
        method="create"
        @success="$refs.create{{properCase modelName}}Button.close()"
      />
    </template>
  </ModalButton>
</template>

<script>
import ModalButton from 'components/ModalButton'
import {{properCase modelName}}Form from 'components/{{properCase modelName}}Form.vue'

export default {
  props: {
    
  },

  components: {
    ModalButton,
    {{properCase modelName}}Form
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: value => this.$emit('input', value)
      }
    },
  },

  data () {
    return {

    }
  },

  methods: {

  },
}
</script>