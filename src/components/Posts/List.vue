<script>
import Item from "@/components/Posts/Item.vue";
import MyAlert from "@/components/UI/MyAlert.vue";

export default {
  components: {MyAlert, Item},
  props: {
    posts: {
      type: Array,
      default: []
    }
  },

  emits: [
    'delete',
    'deleteAll',
    'closed',
  ],

  data() {
    return {
      postExists: false,
    }
  },

  methods: {
    deletePost(id) {
      this.$emit('delete', id);
    },
    deletePosts() {
      this.$emit('deleteAll');
    },

    closedPost(id, closed, date) {
      this.$emit('closed', id, closed, date);
    }
  },

  computed: {
    postExists() {
      return this.posts.length > 0;
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2>List:</h2>
      <button
          class="btn btn-danger btn-sm"
          @click.prevent="deletePosts"
          v-if="postExists"
      >
        Delete all
      </button>
    </div>
    <div class="mt-3">
      <ul class="list-group"
          v-if="postExists">
        <item
            v-for="post in posts"
            :id="post.date"
            :title="post.title"
            :body="post.body"
            :date="post.date"
            :date_closed="post.date_closed"
            @delete="deletePost"
            @closed="closedPost"
        />
      </ul>
      <my-alert
          message="dsadsa"
          type="alert-danger"
          :is-closest="false"
          v-else
      />
    </div>
  </div>
</template>