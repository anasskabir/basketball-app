<script setup>
// script setup syntax (Vue 3) allows for a more concise component definition.
import { RouterView } from 'vue-router' // => renders the matched component for the given path.
</script>

<template>
  <RouterView />  <!-- acts as an outlet where the matched routes' components will be displayed. -->
  <!-- When the route changes, RouterView automatically updates to display the component associated with the new route. -->
</template>
