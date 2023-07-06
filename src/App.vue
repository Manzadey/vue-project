<script>

import {defineComponent} from "vue";
import Form from "@/components/Form.vue";
import List from "@/components/List.vue";

const storageName = 'vue-posts';

export default defineComponent({
  components: {List, Form},

  data() {
    return {
      posts: this.getPosts(),
    }
  },

  methods: {
    createPost(post) {
      this.posts.unshift(post);

      this.updateStoragePosts();
    },

    getPosts() {
      const storage = localStorage.getItem(storageName);

      if (storage === null) {
        return [];
      }

      return JSON.parse(storage);
    },

    updateStoragePosts() {
      localStorage.setItem(storageName, JSON.stringify(this.posts));
    },

    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id);

      this.updateStoragePosts();
    }
  }
})
</script>

<template>
  <section class="container py-5">
    <div class="pb-3">
      <h1>List Posts</h1>
    </div>
    <div class="form">
      <Form @create="createPost"/>
      <List :posts="posts" @delete="deletePost"/>
    </div>
  </section>
</template>