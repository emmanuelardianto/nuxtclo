<template>
    <div class="container">
        <b-row>
            <b-col cols="12">
                <h1 class="mb-3">{{ $t('resetPassword') }}</h1>
                <p class="mb-3">{{ $t('resetPasswordInfo') }}</p>
            </b-col>
            <b-col cols="12" md="8">
                <div class="border py-4 px-3">
                    <b-form @submit.prevent="reset">
                        <h5 class="mb-3">{{ $t('setupNewPassword') }}</h5>
                        <p class="mb-4">{{ $t('resetPasswordDescription') }}</p>
                        <b-alert variant="danger" :show="alert" dismissible>
                            {{ alert }}
                        </b-alert>
                        <div role="group" class="mb-3">
                            <label>{{ $t('password') }}</label>
                            <b-form-input v-model="password" :placeholder="$t('setupNewPassword')" type="password" required></b-form-input>
                            <b-form-text>{{ $t('formWarning.password') }}</b-form-text>
                        </div>
                        <div role="group" class="mb-3">
                            <b-form-checkbox v-model="showPassword">{{ $t('showPassword') }}</b-form-checkbox>
                        </div>
                        <p class="text-danger" v-if="!tokenIsValid">{{ $t('linkExpired') }}</p>
                        <b-button size="lg" variant="dark" squared :disabled="!tokenIsValid" type="submit">{{ $t('update') }}</b-button>
                        <b-button size="lg" variant="outline-dark" squared type="button" @click="$router.push('/')">Topページへ</b-button>
                    </b-form>
                </div>
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
            password : "",
            showPassword: false,
            password: "",
            status: false,
            alert: null,
            tokenIsValid: false,
            token: null,
            email: null
        }
    },
    mounted() {
        this.token = this.$route.query.token;
        this.validateToken()
    },
    methods: {
        async validateToken() {
            this.processing = true
            try {
                const { data } = await AuthAPI.validateToken({ 
                    token: this.token
                }); 
                if(data.success) {
                    this.tokenIsValid = true;
                    this.email = data.data.email;
                }
            } catch (err) {
                console.log(err)
                this.processing = false
            }
        },
        async reset() {
            this.processing = true
            try {
                const { data } = await AuthAPI.resetPassword({ 
                    token: this.token,
                    email: this.email,
                    password: this.password
                }); 
                if(data.success) {
                    alert("Password updated");
                    this.$router.push('/login');
                }
            } catch (err) {
                console.log(err)
                this.processing = false
            }
        },
    }
}
</script>

<style>

</style>