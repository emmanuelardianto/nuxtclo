<template>
    <div class="container py-4 px-3 border my-5">
        <b-row>
            <b-col cols="12" md="6">
                <b-form @submit.prevent="login">
                    <h5 class="mb-3">{{ $t('login') }}</h5>
                    <p class="mb-3">{{ $t('insertLoginInfo') }}</p>
                    <b-alert variant="danger" :show="alert" dismissible>
                        {{ alert }}
                    </b-alert>
                    <div role="group" class="mb-3">
                        <label>{{ $t('email') }}</label>
                        <b-form-input v-model="auth.email" placeholder="email" type="email" required></b-form-input>
                    </div>
                    <div role="group" class="mb-3">
                        <label>{{ $t('password') }}</label>
                        <b-form-input v-model="auth.password" type="password" placeholder="password" required></b-form-input>
                    </div>
                    <div role="group" class="mb-3">
                        <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                        {{ $t('showPassword')}}
                        </b-form-checkbox>
                    </div>
                    <b-button size="lg" variant="dark" squared class="mb-3" type="submit">{{ $t('login') }}</b-button>
                    <div>
                        <a href="/auth/password/forgot" class="font-weight-bold">{{ $t('forgotPassword') }}</a>
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
            alert: null,
            auth: {
                email : '',
                password : '',
                error :false
            },
            processing: false,
        }
    },
    methods: {
        async login() {
            this.auth.error = false
            this.processing = true
            try {
                await this.$auth.loginWith('User', { data: this.auth })
                .then(()=>{
                    this.processing = false;
                    this.$router.push('/');
                })
            } catch (err) {
                console.log(err)
                this.auth.error = true
                this.processing = false
            }
        }
    }
}
</script>

<style>

</style>