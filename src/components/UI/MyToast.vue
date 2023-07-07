<script>
export default {
  name: 'my-toast',
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      fromNow: this.$dayjs(this.timestamp).fromNow()
    }
  },

  mounted() {
    setInterval(() => {
      this.fromNow = this.$dayjs(this.timestamp).fromNow()
    }, 5000)
  },
}
</script>

<template>
  <div class="toast fade show" :id="'toast-' + timestamp" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">{{ title }}</strong>
      <small>{{ fromNow }}</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{ body }}
    </div>
  </div>
</template>