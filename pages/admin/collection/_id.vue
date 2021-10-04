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
                <div v-if="items && items.length > 0">
                    <div class="font-weight-bold mb-3">Products</div>
                    <div v-for="item in selectedProducts" :key="item.id" class="border px-2 py-2 mb-2">
                        {{ item.name }}
                        <span class="float-right cursor-pointer" @click="removeCollectionItem(item.id)"><i class="fa fa-times"></i></span>
                    </div>
                </div>
                <b-button v-b-modal.modal-scrollable>Add Product</b-button>
                <div class="form-group mb-3">
                    <b-button @click="save" size="lg" variant="dark" squared class="mb-3">{{ $t('save') }}</b-button>
                    <b-button size="lg" v-if="isUpdate" variant="danger" squared class="mb-3" @click="deleteData">{{ $t('delete') }}</b-button>
                    <b-button size="lg" variant="secondary" squared class="mb-3" @click="$router.push('/admin/collection')">{{ $t('cancel') }}</b-button>
                </div>
            </b-col>
        </b-row>
        <div>
            <b-modal id="modal-scrollable" @show="getProductData" scrollable title="Collection">
                <b-form-checkbox-group
                v-model="selectedProducts"
                :options="products"
                class="mb-3"
                value-field="id"
                text-field="name"
                stacked
                ></b-form-checkbox-group>
            </b-modal>
        </div>
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
            products: [],
            selectedProducts: [],
            perPage: 1,
            search: ""
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
        const { data } = await CollectionAPI.getById(params.id, { with_product: true }); 
        return {
            id: data.data.id,
            title: data.data.title,
            status: data.data.status,
            description: data.data.description,
            isUpdate: true,
            items: data.data.items,
            selectedProducts: data.data.items.map(function(x) {
                return x.product
            })
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
                const payload = {
                    id: this.id,
                    title: this.title,
                    status: this.status,
                    description: this.description,
                    items: this.selectedProducts.map(function(x) {
                        return x.id
                    })
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

                    alert(data.message);
                    if(data.success) {
                        this.$router.push('/admin/collection')
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getProductData() {
            try {
                this.isLoading = true;
                const { data } = await ProductAPI.getList({ 
                    page: this.currentPage, 
                    search: this.search 
                }); 
                this.products = data.data.data;
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
        removeCollectionItem(id) {
            this.selectedProducts = this.selectedProducts.filter(x => x.id != id);
        }
    },
}
</script>

<style>

</style>