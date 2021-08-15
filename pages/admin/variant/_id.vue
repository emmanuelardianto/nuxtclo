<template>
    <div class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="4" lg="6" md="10">
                <h2 class="mb-3">{{ $t('createData') }}</h2>
                <b-alert :show="alert != ''" variant="danger" class="mb-3">{{ alert }}</b-alert>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('name') }}</label>
                    <b-form-select v-model.trim="$v.name.$model" :options="names"></b-form-select>
                    <span class="text-danger" ></span>
                </div>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('text') }}</label>
                    <b-form-input v-model.trim="$v.text.$model"></b-form-input>
                    <span class="text-danger" ></span>
                </div>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('value') }}</label>
                    <b-form-input v-model.trim="$v.value.$model"></b-form-input>
                    <span class="text-danger" ></span>
                </div>
                <div class="form-group mb-3">
                    <b-button @click="save" size="lg" variant="dark" squared class="mb-3">{{ $t('save') }}</b-button>
                    <b-button size="lg" variant="secondary" squared class="mb-3" @click="$router.push('/admin/variabt')">{{ $t('cancel') }}</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ProductVariantRefAPI from '@/api/productVariantRef';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            id: null,
            names: [
                {
                    text: 'Color',
                    value: 'color',
                },
                {
                    text: 'Size',
                    value: 'size',
                }
            ],
            name: "color",
            text: "",
            value: "",
            alert: "",
        }
    },
    validations: {
        name: {
            required,
        },
        text: {
            required,
        },
        value: {
            required,
        },
    },
    async asyncData({ params }) { 
        if(params.id === 'update') {
            return {
                isUpdate: false
            }
        }
        const { data } = await ProductVariantRefAPI.getById(params.id); 
        return {
            id: data.data.id,
            name: data.data.name,
            text: data.data.text,
            value: data.data.value,
            isUpdate: true
        }
    },
    methods: {
        async save() {
            try {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.alert = "Error";
                    return;
                }
                let result = null;
                const payload = {
                    id: this.id,
                    name: this.name,
                    text: this.text,
                    value: this.value,
                }

                if(this.isUpdate) {
                    result = await ProductVariantRefAPI.update(payload);
                } else {
                    result = await ProductVariantRefAPI.create(payload);
                }
                const { data } = result;

                if(data.success) {
                    alert('Successfuly updated data');
                    this.$router.push('/admin/variant')
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>

<style>

</style>