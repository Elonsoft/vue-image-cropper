<template>
  <div id="app">
    <v-app id="example-1" toolbar footer>
      <drawer v-model="drawer"></drawer>
      <v-toolbar class="indigo" dark fixed>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>vue-image-cropper</v-toolbar-title>
      </v-toolbar>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
      <v-footer class="indigo">
        <span class="white--text">Created by Elonsoft © 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import Drawer from './components/Drawer.vue'

  export default {
    data () {
      return {
        drawer: false
      }
    },
    components: { Drawer }
  }
</script>

<style>
</style>
