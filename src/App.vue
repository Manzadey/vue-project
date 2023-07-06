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
      this.posts.push(post);

      localStorage.setItem(storageName, JSON.stringify(this.posts));
    },

    getPosts() {
      const storage = localStorage.getItem(storageName);

      if (storage === null) {
        return [];
      }

      return JSON.parse(storage);
    }
  }
})
</script>

<template>
  <section class="container pt-5">
    <div class="pb-3">
      <h1>List Posts</h1>
    </div>
    <div class="form">
      <Form @create="createPost"/>
      <List :posts="posts"/>
    </div>
  </section>
</template>