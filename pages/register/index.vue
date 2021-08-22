<template>
    <div class="container py-3">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="6" lg="8" md="10">
                <h1 class="mb-3">{{ $t('register') }}</h1>
                <p class="mb-3">{{ $t('registrationInfo') }}</p>
                <b-form class="border py-4 px-4" @submit.prevent="register">
                    <h4 class="mb-3">{{ $t('register') }}</h4>
                    <b-alert variant="danger" :show="alert" dismissible>
                        {{ alert }}
                    </b-alert>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('email') }}</label>
                        <b-form-input placeholder="name@nextclo.com" v-model="email" type="email" required></b-form-input>
                    </div>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('emailCheck') }}</label>
                        <b-form-input placeholder="name@nextclo.com" v-model="reEmail" type="email" required></b-form-input>
                    </div>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('password') }}</label>
                        <b-form-input placeholder="8 or more" v-model="password" type="password" required></b-form-input>
                    </div>
                    <div class="mb-3">
                        <b-form-checkbox>{{ $t('showPassword')}}</b-form-checkbox>
                    </div>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('zipcode') }}</label>
                        <b-form-input type="text"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('birthdate') }}</label>
                        <b-form-input type="date"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('gender') }}</label>
                        <b-form-radio-group 
                            :options="genders"
                            v-model="gender"
                            stacked
                            ></b-form-radio-group>
                    </div>
                    <div class="mb-3">
                        <b-button variant="dark" size="lg" squared type="submit">{{ $t('toConfirmationPage')}}</b-button>
                    </div>
                </b-form>
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
            reEmail : "",
            password: "",
            birthdate: null,
            gender: null,
            genders: [
                { text: this.$t('male'), value: 'male'},
                { text: this.$t('female'), value: 'female'},
                { text: this.$t('other'), value: 'other'},
            ],
            alert: null
        }
    },
    methods: {
        async register() {
            try {
                this.alert = null
                const { data } = await AuthAPI.register({
                    email: this.email,
                    password: this.password,
                    gender: this.gender
                });
                if(data.success) {
                    alert('register success');
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