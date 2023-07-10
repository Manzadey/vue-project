<script>
export default {
  name: 'my-alert',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'alert-success'
    },
    isClosest: {
      type: Boolean,
      default: true,
    },
    id: Number
  },

  methods: {
    close() {
      this.$emit('close', this.id);
    }
  }
}
</script>

<template>
  <div :class="type" class="alert d-flex alert-dismissible" role="alert">
    <div>{{ message }}</div>
    <button
        type="button"
        class="btn-close"
        @click="close()"
        v-if="isClosest"
    ></button>
  </div>
</template>