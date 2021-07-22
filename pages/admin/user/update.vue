<template>
    <div class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="4" lg="6" md="10">
                <h2 class="mb-3">{{ $t('createData') }}</h2>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('name') }}</label>
                    <b-form-input v-model="name"></b-form-input>
                </div>
                <div class="form-group mb-3">
                    <label for="email">{{ $t('email') }}</label>
                    <b-form-input v-model="email"></b-form-input>
                </div>
                <div class="form-group mb-3">
                    <label for="password">{{ $t('password') }}</label>
                    <b-form-input v-model="password"></b-form-input>
                </div>
                <div class="form-group mb-3">
                    <label for="confirmPassword">{{ $t('confirmPassword') }}</label>
                    <b-form-input v-model="confirmPassword"></b-form-input>
                </div>
                <div class="form-group mb-3">
                    <b-form-checkbox id="isAdmin" v-model="isAdmin" name="isAdmin">
                    {{ $t('isAdmin')}}
                    </b-form-checkbox>
                </div>
                <div class="form-group mb-3">
                    <b-form-checkbox id="status" v-model="status" name="status">
                    {{ $t('isActive')}}
                    </b-form-checkbox>
                </div>
                <div class="form-group mb-3">
                    <b-button size="lg" variant="dark" squared class="mb-3">{{ $t('save') }}</b-button>
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
            name: "",
            password: "",
            confirmPassword: "",
            isAdmin: false,
            status: false
        }
    }
}
</script>

<style>

</style>