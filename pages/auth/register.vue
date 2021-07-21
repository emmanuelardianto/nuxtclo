<template>
    <div class="container py-3">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="6" lg="8" md="10">
                <h1 class="mb-3">{{ $t('register') }}</h1>
                <p class="mb-3">{{ $t('registrationInfo') }}</p>
                <div class="border py-4 px-4">
                    <h4 class="mb-3">{{ $t('register') }}</h4>
                    <div role="group">
                        <label for="input-live">Name:</label>
                        <b-form-input
                        id="input-live"
                        v-model="email"
                        aria-describedby="input-live-help input-live-feedback"
                        placeholder="Enter your name"
                        trim
                        ></b-form-input>
                        <b-form-invalid-feedback id="input-live-feedback">
                        Enter at least 3 letters
                        </b-form-invalid-feedback>
                        <b-form-text id="input-live-help">Your full name.</b-form-text>
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