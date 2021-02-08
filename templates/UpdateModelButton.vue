<template>
  <ModalButton
    :toolbar="{
      title: 'Update {{titleCase modelName}}'
    }"
    ref="update{{properCase modelName}}Button"
  >
    <template v-slot:body>
      <{{properCase modelName}}Form
        method="update"
        @success="$refs.update{{titleCase modelName}}Button.close()"
      />
    </template>
  </ModalButton>
</template>

<script>
import ModalButton from 'components/ModalButton'
import {{properCase modelName}}Form from 'components/{{properCase modelName}}Form.vue'
import {{pascalCase modelName}} from 'classes/{{pascalCase modelName}}'

export default {
  props: {
    {{camelCase modelName}}: {
      required: true,
      type: {{pascalCase modelName}},
    }
  },

  components: {
    ModalButton,
    {{properCase modelName}}Form
  },

  computed: {
    
  },

  data () {
    return {

    }
  },

  methods: {

  },
}
</script>