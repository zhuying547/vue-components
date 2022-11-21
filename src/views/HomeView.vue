<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter";
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  mixins: [Emitter],
  components: {
    HelloWorld,
  },
  methods: {
    listenClick(val) {
      console.log("listenClick", val);
    },
  },
  mounted() {
    this.$on("on-click", (...args) => {
      console.log(args);
    });
  },
};
</script>
