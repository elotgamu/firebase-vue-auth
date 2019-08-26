<template>
  <div id="welcome">
    <h1>Time to learn something new!</h1>
    <p>
      You found the best place to learn - and now you're just one sign in (or sign up) away from it!
    </p>
    <div class="home">
      <img class="vue-logo" alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="cta">
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/login">Sign In</router-link>
    </div>
  </div>
</template>

<style scoped>
#welcome {
  width: 80%;
  margin: auto;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
}

.cta {
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.cta a {
  margin: 10px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #521751;
  border-radius: 3px;
  width: 100px;
  padding: 10px;
  box-sizing: border-box;
  color: #521751;
}

.cta a:hover,
.cta a:active {
  background-color: #521751;
  color: white;
}
.vue-logo {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home'
  // components: {
  //   HelloWorld,
  // },
};
</script>
