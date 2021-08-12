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
                    <b-form-group
                        :label="$t('gender')"
                        v-slot="{ ariaDescribedby }"
                        >
                        <b-form-checkbox-group
                            v-model="gender"
                            :options="genders"
                            :aria-describedby="ariaDescribedby"
                            name="buttons-1"
                            buttons
                            button-variant="primary"
                        ></b-form-checkbox-group>
                    </b-form-group>
                </div>
                <div class="form-group mb-3">
                    <b-button @click="save" size="lg" variant="dark" squared class="mb-3">{{ $t('save') }}</b-button>
                    <b-button size="lg" v-if="isUpdate" variant="danger" squared class="mb-3" @click="deleteData">{{ $t('delete') }}</b-button>
                    <b-button size="lg" variant="secondary" squared class="mb-3" @click="$router.push('/admin/category')">{{ $t('cancel') }}</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import CategoryAPI from '@/api/category';
import ProductAPI from '@/api/product';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            name: "",
            alert: "",
            genders: [],
            gender: [],
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
    },
    async asyncData({ params }) { 
        if(params.id === 'update') {
            return {
                isUpdate: false
            }
        }
        const { data } = await CategoryAPI.getById(params.id); 
        return {
            id: data.data.id,
            name: data.data.name,
            gender: data.data.gender ? data.data.gender : [],
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
                    gender: this.gender
                }

                if(this.isUpdate) {
                    result = await CategoryAPI.update(payload);
                } else {
                    result = await CategoryAPI.create(payload);
                }
                const { data } = result;

                if(data.success) {
                    alert('Successfuly updated data');
                    this.$router.push('/admin/category')
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteData() {
            try {
                if(confirm(this.$t("Do you really want to delete?"))){ 
                    const { data } = await CategoryAPI.delete({ id: this.id }); 

                    if(data.success) {
                        alert('Successfuly deleted data.');
                        this.$router.push('/admin/category')
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    async fetch() {
        try {
            const { data } = await ProductAPI.getAssets();
            this.genders = data.data.genders;
        } catch (error) {
            console.log(error);
        }
    },
}
</script>

<style>

</style>