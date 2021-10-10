<template>
  <div class="mt-2 mb-4">
      <a href="#" class="mr-1 text-dark text-underline">NUXTCLO</a>
      <span v-for="item in breadcrumbs" :key="item.value">/<a href="#" class="mx-2 text-dark text-underline">{{ item.toUpperCase() }}</a></span> 
  </div>
</template>

<script>
export default {
  props: ['breadcrumbs'],
  mounted() {
    console.log('breadcrumbs', this.breadcrumbs);
  }
}
</script>

<style>

</style>