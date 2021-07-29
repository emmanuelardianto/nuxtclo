<template>
    <div class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" md="10">
                <h2 class="mb-3">{{ $t('createData') }}</h2>
                <b-alert :show="alert != ''" variant="danger" class="mb-3">{{ alert }}</b-alert>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('category') }}</label>
                    <b-form-select v-model="category" :options="categories"
                        value-field="id"
                        text-field="name"
                        disabled-field="notEnabled"
                        >
                        <template #first>
                            <b-form-select-option value="" disabled>-- Please select an option --</b-form-select-option>
                        </template>
                    </b-form-select>
                </div>
                <div class="form-group mb-3">
                    <b-form-group :label="$t('gender')" v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                            v-model="gender"
                            :options="genders"
                            :aria-describedby="ariaDescribedby"
                            name="radios-btn-default"
                            buttons
                            button-variant="outline-primary"
                        ></b-form-radio-group>
                    </b-form-group>
                </div>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('name') }}</label>
                    <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                </div>
                <div class="form-group pb-3 mb-3 border-bottom">
                    <label for="description">{{ $t('description') }}</label>
                    <b-form-textarea
                        v-model="description"
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                </div>
                <h4>Variants</h4>
                <div class="form-group pb-3 border-bottom">
                    <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        id="checkbox-group-1"
                        v-model="selectedVariants"
                        :options="variantSelections"
                        :aria-describedby="ariaDescribedby"
                    ></b-form-checkbox-group>
                    </b-form-group>
                </div>
                <div class="form-group pb-3 mb-3 border-bottom" v-if="selectedVariants.indexOf('color') != -1">
                    <label for="description">{{ $t('color') }}</label>
                    <AdminProductVariantColor :colors="colors" @selectColor="selectColor" />
                </div>
                <div class="form-group pb-3 mb-3 border-bottom" v-if="selectedVariants.indexOf('size') != -1">
                    <label for="description">{{ $t('size') }}</label>
                    <AdminProductVariantSize :sizes="sizes" @selectSize="selectSize" />
                </div>
                <div>
                    <b-table :items="variantData"></b-table>
                </div>
                <div class="form-group mb-3">
                    <b-button @click="save" size="lg" variant="primary" squared class="mb-3">{{ $t('save') }}</b-button>
                    <b-button size="lg" v-if="isUpdate" variant="danger" squared class="mb-3" @click="deleteData">{{ $t('delete') }}</b-button>
                    <b-button size="lg" variant="secondary" squared class="mb-3" @click="$router.push('/admin/category')">{{ $t('cancel') }}</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ProductAPI from '@/api/product';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            categories: [],
            category: "",
            genders: [
                {
                    text: "Female",
                    value: "female"
                },
                {
                    text: "Male",
                    value: "male"
                }
            ],
            gender: "",
            name: "",
            description: "",
            alert: "",
            variantSelections: [
                {
                    text: "Color",
                    value: "color"
                },
                {
                    text: "Size",
                    value: "size"
                }
            ],
            selectedVariants: [],
            colors: [],
            selectedColors: [],
            sizes: [],
            selectedSizes: [],
            variantData: []
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
    },
    async asyncData({ params }) { 
        if(params.id === 'create') {
            return {
                isUpdate: false
            }
        }
        // const { data } = await ProductAPI.getAssets(params.id); 
        return {
            isUpdate: true
        }
    },
    async fetch() {
        try {
            const { data } = await ProductAPI.getAssets();
            this.categories = data.data.categories;
            this.colors = data.data.colors;
            this.sizes = data.data.sizes;
        } catch (error) {
            console.log(error);
        }
    },
    watch: {
        selectedSizes() {
            this.generateVariant();
        },
        selectedColors() {
            this.generateVariant();
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
        },
        selectColor(color) {
            this.selectedColors.push(color);
        },
        selectSize(size) {
            this.selectedSizes.push(size);
        },
        generateVariant() {
            this.variantData = this.selectedColors.map(function(item) {
                return this.selectedSizes.map(function(size) {
                    return {
                        color: item,
                        size: size
                    }
                }, this);
            }, this);
        }
    }
}
</script>

<style>

</style>