<template>
  <v-navigation-drawer persistent v-model="active" light enable-resize-watcher absolute>
    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: this.value
      }
    },
    watch: {
      value() {
        this.active = this.value;
      },
      active() {
        this.$emit('input', this.active);
      }
    }
  }
</script>

<style>
</style>
