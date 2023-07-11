<script>

import {defineComponent} from "vue";
import Form from "@/components/Posts/Form.vue";
import List from "@/components/Posts/List.vue";
import MyToast from "@/components/UI/MyToast.vue";

const storageName = 'vue-posts';

export default defineComponent({
  components: {MyToast, List, Form},

  data() {
    return {
      posts: this.getPosts(),
      messages: [],
      toasts: [],
    }
  },

  methods: {
    createPost(post, message) {
      this.posts.unshift(post);

      this.addToast('Post created!', message);

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
    },

    addToast(title, body) {
      this.toasts.push({
        title: title,
        body: body,
        timestamp: Date.now()
      });
    },

    closePost(id, isClosed, date) {
      this.posts = this.getPosts().map(post => {
        if (post.id === id) {
          if (isClosed) {
            post['date_closed'] = date;
          } else {
            delete post['date_closed'];
          }
        }

        return post;
      });

      this.updateStoragePosts();
    }
  },

  computed: {
    closestPosts: function () {
      return this.posts.filter(post => typeof post.date_closed === 'number');
    },

    activePosts: function () {
      return this.posts.filter(post => typeof post.date_closed !== 'number');
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
        <my-alert
            v-if="messages.length > 0"
            v-for="message in messages"
            :key="message.id"
            :message="message.text"
            :type="message.type"
            :id="message.id"
            @close="closeAlert"
        />
      </div>

      <List
          title="List of posts:"
          :posts="activePosts"
          @delete="deletePost"
          @deleteAll="deletePosts"
          @closed="closePost"
      />

      <List
          v-if="closestPosts.length"
          class="mt-5"
          title="Closest posts:"
          :posts="closestPosts"
          @delete="deletePost"
          @deleteAll="deletePosts"
          @closed="closePost"
      />

      <div class="toast-container position-fixed start-0 bottom-0 p-3">
        <my-toast v-for="toast in toasts" :body="toast.body" :title="toast.title" :timestamp="toast.timestamp" :key="toast.timestamp"/>
      </div>
    </div>
  </section>
</template>