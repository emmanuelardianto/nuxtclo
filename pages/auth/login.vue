<template>
    <div class="container py-3 px-3 border my-5">
        <b-row>
            <b-col cols="12" md="6">
                <h5 class="mb-3">{{ $t('login') }}</h5>
                <p class="mb-3">{{ $t('insertLoginInfo') }}</p>
                <div role="group" class="mb-3">
                    <label>{{ $t('email') }}</label>
                    <b-form-input v-model="email" placeholder="email" type="email"></b-form-input>
                </div>
                <div role="group" class="mb-3">
                    <label>{{ $t('password') }}</label>
                    <b-form-input v-model="email" type="password" placeholder="password"></b-form-input>
                </div>
                <div role="group" class="mb-3">
                    <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                    {{ $t('showPassword')}}
                    </b-form-checkbox>
                </div>
                <b-button size="lg" variant="dark" squared class="mb-3">{{ $t('login') }}</b-button>
                <div>
                    <a href="#" class="font-weight-bold">{{ $t('forgotPassword') }}</a>
                </div>
            </b-col>
            <b-col cols="12" md="6">
                <h4 class="mb-3">{{ $t('register') }}</h4>
                <p class="mb-3">{{ $t('registrationPromotion') }}</p>
                <b-button size="lg" variant="dark" squared>{{ $t('register') }}</b-button>
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
            status: false
        }
    }
}
</script>

<style>

</style>