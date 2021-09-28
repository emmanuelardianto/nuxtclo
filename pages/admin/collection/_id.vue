<template>
    <div class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="4" lg="6" md="10">
                <h2 class="mb-3">{{ $t('createData') }}</h2>
                <b-alert :show="alert != ''" variant="danger" class="mb-3">{{ alert }}</b-alert>
                <div class="form-group mb-3">
                    <label for="title">{{ $t('title') }}</label>
                    <b-form-input v-model.trim="$v.title.$model"></b-form-input>
                    <span class="text-danger" ></span>
                </div>
                <div class="form-group mb-5">
                    <label for="description">{{ $t('description') }}</label>
                    <b-form-textarea
                        v-model="description"
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                </div>
                <div class="form-group mb-3">
                    <b-form-checkbox id="status" v-model="status" name="status" value="1">
                    {{ $t('isActive')}}
                    </b-form-checkbox>
                </div>
                <div class="form-group mb-3">
                    <b-button @click="save" size="lg" variant="dark" squared class="mb-3">{{ $t('save') }}</b-button>
                    <b-button size="lg" v-if="isUpdate" variant="danger" squared class="mb-3" @click="deleteData">{{ $t('delete') }}</b-button>
                    <b-button size="lg" variant="secondary" squared class="mb-3" @click="$router.push('/admin/collection')">{{ $t('cancel') }}</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import CollectionAPI from '@/api/collection';
import ProductAPI from '@/api/product';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            title: "",
            status: true,
            description: "",
            alert: "",
            genders: [],
            gender: [],
        }
    },
    validations: {
        title: {
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
        const { data } = await CollectionAPI.getById(params.id); 
        return {
            id: data.data.id,
            title: data.data.title,
            status: data.data.status,
            description: data.data.description,
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
                    title: this.title,
                    status: this.status,
                    description: this.description
                }
                
                const { data } = await CollectionAPI.update(payload);

                alert(data.message);
                if(data.success) {
                    this.$router.push('/admin/collection')
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteData() {
            try {
                if(confirm(this.$t("Do you really want to delete?"))){ 
                    const { data } = await CollectionAPI.delete({ id: this.id }); 

                    if(data.success) {
                        alert('Successfuly deleted data.');
                        this.$router.push('/admin/collection')
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