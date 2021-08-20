<template>
    <div class="container py-4 px-3 border my-5">
        <b-row>
            <b-col cols="12" md="6">
                <b-form @submit="login">
                    <h5 class="mb-3">{{ $t('login') }}</h5>
                    <p class="mb-3">{{ $t('insertLoginInfo') }}</p>
                    <b-alert variant="danger" :show="alert" dismissible>
                        {{ alert }}
                    </b-alert>
                    <div role="group" class="mb-3">
                        <label>{{ $t('email') }}</label>
                        <b-form-input v-model="email" placeholder="email" type="email" required></b-form-input>
                    </div>
                    <div role="group" class="mb-3">
                        <label>{{ $t('password') }}</label>
                        <b-form-input v-model="password" type="password" placeholder="password" required></b-form-input>
                    </div>
                    <div role="group" class="mb-3">
                        <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                        {{ $t('showPassword')}}
                        </b-form-checkbox>
                    </div>
                    <b-button size="lg" variant="dark" squared class="mb-3" type="submit">{{ $t('login') }}</b-button>
                    <div>
                        <a href="#" class="font-weight-bold">{{ $t('forgotPassword') }}</a>
                    </div>
                </b-form>
            </b-col>
            <b-col cols="12" md="6">
                <h4 class="mb-3">{{ $t('register') }}</h4>
                <p class="mb-3">{{ $t('registrationPromotion') }}</p>
                <a href="/register" class="btn btn-dark btn-lg rounded-0">{{ $t('register') }}</a>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import AuthAPI from '@/api/auth';
export default {
    layout: 'plain',
    layout (context) {
        return 'plain';
    },
    data() {
        return {
            email : "",
            password: "",
            status: false,
            alert: null
        }
    },
    methods: {
        async login() {
            try {
                this.alert = null
                const { data } = await AuthAPI.login({
                    email: this.email,
                    password: this.password
                });
                if(data.success) {
                    alert('login success');
                } else {
                    this.alert = data.message;
                }
            } catch (error) {
                this.alert = error;
            }
        }
    }
}
</script>

<style>

</style>