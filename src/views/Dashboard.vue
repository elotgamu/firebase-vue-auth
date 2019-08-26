<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p v-if="!email">You should only get here if you're authenticated!</p>
    <p v-if="email">Your email address: {{ email }}</p>

    <br />

    <div v-if="this.token">
      <h3>List of users:</h3>
      <ul>
        <li v-for="(user, key) in users" :key="key">{{ user.email }}</li>
      </ul>
    </div>

    <ul></ul>
  </div>
</template>

<script>
import firebaseApi from '../services/firebaseApi';

export default {
  data() {
    return {
      users: []
    };
  },
  computed: {
    email() {
      return this.$store.state.userEmail;
    },
    token() {
      return this.$store.state.tokenId;
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      if (this.token) {
        firebaseApi
          .get(`/users.json?auth=${this.token}`)
          .then(res => {
            console.log(res);
            this.users = res.data;
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: red;
}
</style>
