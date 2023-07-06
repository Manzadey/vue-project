<script>
  export default {
    props: {
      posts: {
        type: Array,
        default: []
      }
    },
  }
</script>

<template>
  <div class="mt-5">
    <h2>List posts:</h2>
    <div class="mt-3">
      <ul class="list-group" v-if="posts.length > 0">
        <li class="list-group-item" v-for="post in posts"><strong>{{ post.title }}:</strong> {{ post.body }} </li>
      </ul>
      <div class="alert alert-danger" role="alert" v-else>
        Posts list is empty!
      </div>
    </div>
  </div>
</template>