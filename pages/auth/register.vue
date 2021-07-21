<template>
    <div class="container py-3">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="6" lg="8" md="10">
                <h1 class="mb-3">{{ $t('register') }}</h1>
                <p class="mb-3">{{ $t('registrationInfo') }}</p>
                <div class="border py-4 px-4">
                    <h4 class="mb-3">{{ $t('register') }}</h4>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('email') }}</label>
                        <b-form-input placeholder="name@nextclo.com" type="email"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('emailCheck') }}</label>
                        <b-form-input placeholder="name@nextclo.com" type="email"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <label for="input-live">{{ $t('password') }}</label>
                        <b-form-input placeholder="8 or more" type="password"></b-form-input>
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
                        <b-form-checkbox>{{ $t('male')}}</b-form-checkbox>
                        <b-form-checkbox>{{ $t('female')}}</b-form-checkbox>
                        <b-form-checkbox>{{ $t('other')}}</b-form-checkbox>
                    </div>
                    <div class="mb-3">
                        <b-button variant="dark" size="lg">{{ $t('toConfirmationPage')}}</b-button>
                    </div>
                </div>
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
            email : ""
        }
    }
}
</script>

<style>

</style>