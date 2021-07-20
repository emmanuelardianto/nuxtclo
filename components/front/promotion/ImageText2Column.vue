<template>
    <b-row class="my-3">
        <b-col v-for="item in items" :key="item.title" cols="12" md="6" class="my-3">
            <img :src="item.image" :alt="item.title" :title="item.title" class="w-100 mb-3">
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