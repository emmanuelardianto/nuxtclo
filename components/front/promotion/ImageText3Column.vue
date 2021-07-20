<template>
    <b-row>
        <b-col v-for="(item, index) in items" :key="index" cols="12" md="4" class="my-3">
            <img :src="require('~/assets/front/' + item.image)" :alt="item.title" :title="item.title" class="w-100 mb-3">
            <h5>{{ item.title }}</h5>
            <p>{{ item.description }}</p>
        </b-col>
    </b-row>
</template>

<script>
export default {
    props: ["items"]
}
</script>

<style>

</style>