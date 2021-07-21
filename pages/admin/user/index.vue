<template>
    <div class="container">
        <h2>{{ $t('user') }}</h2>
        <NuxtLink to="/admin/user/update" class="btn btn-primary">Create</NuxtLink>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            email : "",
            status: false
        }
    }
}
</script>

<style>

</style>