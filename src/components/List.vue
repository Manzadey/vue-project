<script>
export default {
  props: {
    posts: {
      type: Array,
      default: []
    }
  },

  methods: {
    deletePost(id) {
      this.$emit('delete', id);
    },
    deletePosts() {
      this.$emit('deleteAll');
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2>List:</h2>
      <button class="btn btn-danger btn-sm" @click.prevent="deletePosts">Delete all</button>
    </div>
    <div class="mt-3">
      <ul class="list-group" v-if="posts.length > 0">
        <li class="list-group-item" v-for="post in posts">
          <div class="d-flex justify-content-between">
            <div>
              <strong>{{ post.title }}<span v-if="post.body.length > 0">:</span></strong> {{ post.body }}
            </div>
            <div class="d-flex align-items-center small text-secondary gap-3">
              <span v-if="post.date">{{ $dayjs(post.date).format('D MMMM YYYY HH:mm') }}</span>
              <button class="btn btn-danger btn-sm" @click.prevent="deletePost(post.id)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="alert alert-danger" role="alert" v-else>
        Posts list is empty!
      </div>
    </div>
  </div>
</template>