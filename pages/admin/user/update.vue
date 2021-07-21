<template>
    <div class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="4" lg="6" md="10">
                <h2 class="mb-3">{{ $t('createUser') }}</h2>
                <div class="form-group">
                    <label for="name">{{ $t('name') }}</label>
                    <b-form-input v-model="name"></b-form-input>
                </div>
            </b-col>
        </b-row>
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
            name: ""
        }
    }
}
</script>

<style>

</style>