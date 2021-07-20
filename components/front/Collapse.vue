<template>
  <div class="border-bottom">
    <div class="py-3" :class="isCollapsed ? 'font-weight-bold' : ''" v-b-toggle="title" @click="isCollapsed = !isCollapsed">
        {{ title }}
        <i class="fa float-right" :class="!isCollapsed ? 'fa-plus' : 'fa-minus'"></i>
    </div>
    <b-collapse :id="title">
        <div class="py-3" v-html="content"></div>
    </b-collapse>
  </div>
</template>

<script>
export default {
    props: ["title", "content"],
    data() {
        return {
            isCollapsed: false
        }
    }
}
</script>

<style>

</style>