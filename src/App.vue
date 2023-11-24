<template>
  <div id="app" class="d-flex flex-column h-100">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="route in routes" :key="route.name">
          <router-link :to="route.path" class="nav-link">{{ route.name }}</router-link>
        </li>
      </ul>
    </header>
    <main class="flex-shrink-0">
      <router-view />
    </main>
    <footer class="footer mt-auto py-3 bg-body-tertiary">
      <div class="container">
        <span class="text-body-secondary">Place sticky footer content here.</span>
      </div>
    </footer>
  </div>
</template>
<script>
import { routes } from './router'
export default {
  name: 'App',
  data() {
    return {
      routes: routes
    }
  },
  components: {}
}
</script>
<style lang="less"></style>
