<script>
export default {
  emits: [
    'delete',
    'closed'
  ],

  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: '',
    },
    date: {
      type: Number,
      required: true
    },
    date_closed: {
      type: Number,
    },
    id: {
      type: Number,
      required: true
    },
  },

  data() {
    return {
      closed: !!this.date_closed,
    }
  },
  methods: {
    deletePost() {
      this.$emit('delete', this.id);
    },

    checkClosed() {
      this.$emit('closed', this.id, this.closed, Date.now());
    },

    dateFormat(date) {
      return this.$dayjs(date).format('D MMMM YYYY HH:mm');
    },

    dateFromNow(date) {
      return this.$dayjs(date).fromNow();
    }
  },

  computed: {
    listItemClassObject: function () {
      return {
        'list-group-item': true,
        'list-group-item-success': this.date_closed,
      }
    }
  }
}
</script>

<template>
  <li
      :class="listItemClassObject"
  >
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="form-check m-0">
          <input
              class="form-check-input"
              type="checkbox"
              :id="id + '-success'"
              v-model="closed"
              @change="checkClosed"
          >
          <label
              class="form-check-label"
              :for="id + '-success'">
          </label>
        </div>

        <div>
          <strong>{{ title }}<span v-if="body">: </span></strong> {{ body }}
        </div>
      </div>
      <div class="d-flex align-items-center small text-secondary gap-3">
        <span
            class="badge bg-secondary rounded-pill"
            v-if="date_closed"
            :title="dateFromNow(date_closed)"
        >{{ dateFormat(date_closed) }}</span>
        <span
            class="badge bg-primary rounded-pill"
            v-if="date"
            :title="dateFromNow(date)"
            data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover"
        >{{ dateFormat(date) }}</span>
        <button
            class="btn btn-danger btn-sm"
            @click.prevent="deletePost(id)"
        >Delete
        </button>
      </div>
    </div>
  </li>
</template>