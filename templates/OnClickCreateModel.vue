<template>
  <div>
    <div @click="handleClicked">
      <slot />
    </div>
  </div>
</template>

<script>
import {{properCase model}} from 'classes/{{properCase model}}'

export default {
  props: {

  },

  components: {
    
  },

  computed: {
    
  },

  mounted() {
    this.$emit('created')
  },

  data () {
    return {

    }
  },

  methods: {
    handleClicked() {
      this.$emit('creating')
      {{properCase model}}.$create({})
      .then(this.handleCreated)
      .catch(this.handleError)
    },

    handleCreated(response) {
      this.$emit('created', response)
    },

    handleError(error) {
      this.$q.notify(error.message)
    }
  },
}
</script>