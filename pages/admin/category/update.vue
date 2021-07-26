<template>
    <div class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="4" lg="6" md="10">
                <h2 class="mb-3">{{ $t('createData') }}</h2>
                <b-alert :show="alert != ''" variant="danger" class="mb-3">{{ alert }}</b-alert>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('name') }}</label>
                    <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                    <span class="text-danger" ></span>
                </div>
                <div class="form-group mb-3">
                    <b-button @click="save" size="lg" variant="dark" squared class="mb-3">{{ $t('save') }}</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import CategoryAPI from '@/api/category';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            name: "",
            alert: ""
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
    },
    methods: {
        async save() {
            try {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.alert = "Error";
                    return;
                }
                const { data } = await CategoryAPI.create({
                    name: this.name
                });

                if(data.success) {
                    alert('Successfuly created data');
                    this.$router.push('/admin/category')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>