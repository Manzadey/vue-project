<script>

import {defineComponent} from "vue";
import Form from "@/components/Form.vue";
import List from "@/components/List.vue";
import Alert from "@/components/UI/Alert.vue";

const storageName = 'vue-posts';

export default defineComponent({
  components: {Alert, List, Form},

  data() {
    return {
      posts: this.getPosts(),
      message: {
        text: '',
        type: null
      },

      messages: [],
    }
  },

  methods: {
    createPost(post, message) {
      this.posts.unshift(post);

      this.addMessage(message);

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

      this.addMessage('Post deleted!', 'alert-warning');

      this.updateStoragePosts();
    },

    addMessage(message, type) {
      this.messages.push({
        id: Date.now(),
        text: message,
        type: type,
      });
    },

    checkError(message) {
      this.addMessage(message, 'alert-danger');
    },

    closeAlert(id) {
      this.messages = this.messages.filter(message => message.id !== id);
    },

    deletePosts() {
      this.posts = [];

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
      <Form @create="createPost" @error="checkError"/>

      <div class="my-4">
        <Alert v-for="message in messages" :key="message.id" v-if="messages.length > 0" :message="message.text" :type="message.type" :id="message.id" @close="closeAlert"/>
      </div>

      <List :posts="posts" @delete="deletePost" @deleteAll="deletePosts"/>
    </div>
  </section>
</template>