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
                <div class="form-group pb-3">
                    <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        id="checkbox-group-1"
                        v-model="selectedVariants"
                        :options="variantSelections"
                        :aria-describedby="ariaDescribedby"
                    ></b-form-checkbox-group>
                    </b-form-group>
                </div>
                <b-row>
                    <b-col cols="6">
                        <div class="form-group pb-3 mb-3" v-if="selectedVariants.indexOf('color') != -1">
                            <label for="description">{{ $t('color') }}</label>
                            <AdminProductVariantColor :colors="colors" @updateSelected="updateSelectedColor"  />
                        </div>
                    </b-col>
                    <b-col cols="6">
                        <div class="form-group pb-3 mb-3" v-if="selectedVariants.indexOf('size') != -1">
                            <label for="description">{{ $t('size') }}</label>
                            <AdminProductVariantSize :sizes="sizes" @updateSelected="updateSelectedSize" />
                        </div>
                    </b-col>
                </b-row>
                <div class="mb-5">
                    <b-table 
                        :fields="variantFields"
                        :items="variantData"
                        :select-mode="selectMode"
                        selectable
                        @row-selected="onRowSelected"
                        >
                        <template #cell(price)="data">
                            <b-form-input :value="data.value"></b-form-input>
                        </template>
                        <template #cell(qty)="data">
                            <b-form-input :value="data.value"></b-form-input>
                        </template>
                    </b-table>
                    <b-button variant="outline-danger" @click="removeRow" size="sm" v-if="variantData.length > 0" :disabled="variantSelected.length == 0">{{ $t('Remove Selected') }}</b-button>
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
            genders: [],
            gender: [],
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
            variantData: [],
            variantFields: [
                { key: 'variant', label: 'Variant Name' },
                { key: 'price', label: 'Price' },
                { key: 'qty', label: 'Qty' },
            ] ,
            variantSelected: [],
            selectMode: 'multi',
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
            this.genders = data.data.genders;
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
        onRowSelected(items) {
            this.variantSelected = items
        },
        removeRow() {
            this.variantData = this.variantData.filter(x => !this.variantSelected.includes(x));
        },
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
        updateSelectedColor(colors) {
            this.selectedColors = colors;
        },
        updateSelectedSize(sizes) {
            this.selectedSizes = sizes;
        },
        generateVariant() {
            this.variantData = [];
            const colors = [...new Set(this.selectedColors)];
            const sizes = [...new Set(this.selectedSizes)];
            if(colors.length > 0 && sizes.length > 0) {
                colors.forEach(color => {
                    sizes.forEach(size => {
                        this.variantData.push({
                            variant: color.name + ' - ' + size.name,
                            price: 0,
                            qty: 0,
                            status: 1
                        });
                    });
                });
            } else if(colors.length > 0) {
                this.variantData = colors.map(function(color) {
                    return {
                        variant: color.name,
                        price: 0,
                        qty: 0,
                        status: 1
                    }
                });
            } else if(sizes.length > 0) {
                this.variantData = sizes.map(function(size) {
                    return {
                        variant: size.name,
                        price: 0,
                        qty: 0,
                        status: 1
                    }
                });
            }
        }
    }
}
</script>

<style>

</style>