<script>
export default {
  name: 'my-input',
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    help: {
      type: String,
      default: null
    },
    modelValue: {
      type: [String, Number]
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<template>
  <div>
    <label for="{{ name }}" class="form-label">{{ label }}</label>
    <input type="{{ type }}" class="form-control" id="{{ name }}" :value="modelValue" @input="updateInput">
    <div id="{{ name }}" class="form-text" v-if="help !== null && help.length > 0">{{ help }}</div>
  </div>
</template>

<style scoped>

</style>