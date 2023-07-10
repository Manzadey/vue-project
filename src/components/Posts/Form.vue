<script>
  import MyInput from "@/components/UI/MyInput.vue";

  export default {
    components: {MyInput},
    data() {
      return {
        form: {
          title: '',
          body: '',
        }
      }
    },
    methods: {
      addPost() {
        if (this.form.title.length === 0) {
          this.$emit('error', 'Title is empty!');

          return false;
        }

        this.form.id = Date.now();
        this.form.date = Date.now();
        this.$emit('create', this.form, `"${this.form.title}" success added!`);
        this.form = {
          title: '',
          body: '',
        };

        return true;
      }
    }
  }
</script>

<template>
  <div class="border p-4 bg-success-subtle">
    <h2>Add new post:</h2>
    <form @submit.prevent="addPost">
      <my-input label="Title" name="title" class="mb-3" v-model="form.title"/>
      <my-input label="Body" name="body" v-model="form.body"/>
      <button type="submit" class="btn btn-secondary mt-4">Add</button>
    </form>
  </div>
</template>

<style scoped>

</style>