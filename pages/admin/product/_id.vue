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
                        <b-form-radio-group
                            v-model="gender"
                            :options="genders"
                            :aria-describedby="ariaDescribedby"
                            name="buttons-1"
                            buttons
                            button-variant="primary"
                        ></b-form-radio-group>
                    </b-form-group>
                </div>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('name') }}</label>
                    <b-form-input v-model.trim="$v.name.$model"></b-form-input>
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
                <div v-if="isUpdate">
                    <h4>Gallery</h4>
                    <b-row class="mb-5">
                        <b-col xl="1" lg="2" md="3" v-for="gallery in galleries" :key="gallery.id">
                            <img :src="gallery.path" :alt="name" :title="name" class="w-100">
                            <a href="javascript:void()" @click="imageDelete(gallery.id)">Remove</a>
                        </b-col>
                        <b-col xl="2" lg="3" md="4">
                            <input type="file" class="custom-file-input" id="file" ref="file" @change="handleFileObject()">
                            <b-button variant="secondary" onclick="document.getElementById('file').click()">Add</b-button>
                        </b-col>
                    </b-row>
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
                            <AdminProductVariantColor :colors="colors" @updateSelected="updateSelectedColor" :exists="variantData"  />
                        </div>
                    </b-col>
                    <b-col cols="6">
                        <div class="form-group pb-3 mb-3" v-if="selectedVariants.indexOf('size') != -1">
                            <label for="description">{{ $t('size') }}</label>
                            <AdminProductVariantSize :sizes="sizes" @updateSelected="updateSelectedSize" :exists="variantData" />
                        </div>
                    </b-col>
                </b-row>
                <div v-if="variantTableData.length > 0" class="mb-3 text-right">
                    <b-button v-b-modal.modal-1>一度に設定</b-button>

                    <b-modal id="modal-1" ref="modal-1" title="一度に設定" centered>
                        <label for="">Price</label>
                        <b-form-input v-model="allPrice" type="number" class=""></b-form-input>
                        <label for="">Qty</label>
                        <b-form-input type="number" v-model="allQty"></b-form-input>
                        <template #modal-footer="{ cancel }">
                            <b-button block variant="dark" squared @click="apply()">実行</b-button>
                            <b-button block variant="light" squared @click="cancel()">キャンセル</b-button>
                        </template>
                    </b-modal>
                </div>
                <div class="mb-5">
                    <b-table 
                        :fields="variantFields"
                        :items="variantTableData"
                        :select-mode="selectMode"
                        selectable
                        @row-selected="onRowSelected"
                        v-if="variantTableData.length > 0"
                        >
                        <template #cell(image)="data">
                            <div><img :src="data.gallery_id ? data.gallery_id : 'https://via.placeholder.com/50?text=no%20image'" alt="no image" v-b-modal.modal-gallery /></div>
                        </template>
                        <template #cell(id)="data">
                            <span>{{ variantNameConcat(variantTableData[data.index]) }}</span>
                        </template>
                        <template #cell(price)="data">
                            <b-form-input type="number" v-model="variantTableData[data.index].price"></b-form-input>
                        </template>
                        <template #cell(qty)="data">
                            <b-form-input type="number" v-model="variantTableData[data.index].qty"></b-form-input>
                        </template>
                        <template #cell(status)="data">
                            <b-form-checkbox v-model="variantTableData[data.index].status" value="1"></b-form-checkbox>
                        </template>
                    </b-table>
                    <b-button variant="outline-danger" @click="removeRow" size="sm" v-if="variantTableData.length > 0" :disabled="variantSelected.length == 0">{{ $t('Remove Selected') }}</b-button>
                </div>
                <div class="form-group mb-3">
                    <label for="">Collections</label>
                    <div>
                        <b-badge pill variant="light" v-for="item in collections.filter(x => selectedCollections.indexOf(x.id) != -1)" :key="item.id">{{ item.title }}</b-badge>
                    </div>
                    <b-button v-b-modal.modal-scrollable>Select Collection</b-button>
                </div>
                <div class="form-group mb-3">
                    <b-button @click="save" size="lg" variant="primary" squared class="mb-3">{{ $t('save') }}</b-button>
                    <b-button size="lg" variant="secondary" squared class="mb-3" @click="$router.push('/admin/category')">{{ $t('cancel') }}</b-button>
                </div>
            </b-col>
        </b-row>
        <div>
            <b-modal id="modal-scrollable" scrollable title="Collection">
                <b-form-checkbox-group
                v-model="selectedCollections"
                :options="collections"
                class="mb-3"
                value-field="id"
                text-field="title"
                stacked
                ></b-form-checkbox-group>
            </b-modal>
            <b-modal id="modal-gallery" scrollable title="Gallery">
                <b-row class="mb-5" v-if="isUpdate">
                    <b-col xl="2" lg="3" md="4" v-for="gallery in galleries" :key="gallery.id">
                        <img :src="gallery.path" :alt="name" :title="name" class="w-100">
                        <a href="javascript:void()" @click="imageDelete(gallery.id)">Remove</a>
                    </b-col>
                    <b-col xl="2" lg="3" md="4">
                        <input type="file" class="custom-file-input" id="file" ref="file" @change="handleFileObject()">
                        <b-button variant="secondary" onclick="document.getElementById('file').click()">Add</b-button>
                    </b-col>
                </b-row>
            </b-modal>
        </div>
    </div>
</template>

<script>
import ProductAPI from '@/api/product';
import GalleryAPI from '@/api/gallery';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            id: null,
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
            variantTableData: [],
            variantFields: [
                { key: 'image', label: '' },
                { key: 'id', label: 'Variant' },
                { key: 'price', label: 'Price' },
                { key: 'qty', label: 'Qty' },
                { key: 'status', label: 'Is Active' },
            ],
            variantSelected: [],
            selectMode: 'multi',
            allPrice: 0,
            allQty: 0,
            collections: [],
            selectedCollections: [],
            file: null,
            galleries: []
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
            id: params.id,
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
            this.collections = data.data.collections;

            this.variantData.forEach(item => {
                if(item.variant_type1 == 'color')
                    this.selectedColors.push(this.colors.filter(x => x.id == item.variant_value1)[0]);
                else if(item.variant_type1 == 'size')
                    this.selectedSizes.push(this.sizes.filter(x => x.id == item.variant_value1)[0]);
                if(item.variant_type2 == 'size')
                    this.selectedSizes.push(this.sizes.filter(x => x.id == item.variant_value2)[0]);
            });
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
    created() {
        if(this.isUpdate) {
            this.loadData();
        }
    },
    methods: {
        onRowSelected(items) {
            this.variantSelected = items
        },
        removeRow() {
            this.variantTableData = this.variantTableData.filter(x => !this.variantSelected.includes(x));
        },
        async save() {
            try {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.alert = "Error";
                    return;
                }
                let payload = {
                    id: this.id,
                    category: this.category,
                    gender: this.gender,
                    name: this.name,
                    variant_type: this.selectedVariants.join(''),
                    description: this.description,
                    variants: this.variantTableData,
                    collections: this.selectedCollections
                }
                let result = null;
                if(this.isUpdate) {
                    result = await ProductAPI.update(payload);
                } else {
                    result = await ProductAPI.create(payload);
                }
                const { data } = result;

                if(data.success) {
                    alert('Successfuly created data');
                    this.$router.push('/admin/product')
                } else {
                    alert('Failed to save data');
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
            this.selectedColors = [];
            colors.forEach(colorId => {
                this.selectedColors.push(this.colors.filter(x => x.id == colorId)[0]);
            });
        },
        updateSelectedSize(sizes) {
            this.selectedSizes = [];
            sizes.forEach(sizeId => {
                this.selectedSizes.push(this.sizes.filter(x => x.id == sizeId)[0]);
            });
        },
        generateVariant() {
            this.variantTableData = [];
            const colors = [...new Set(this.selectedColors)];
            const sizes = [...new Set(this.selectedSizes)];
            if(colors.length > 0 && sizes.length > 0) {
                colors.forEach(color => {
                    sizes.forEach(size => {
                        let exists = this.variantData.filter(x => x.variant_value1 == color.id && x.variant_value2 == size.id)
                        this.variantTableData.push({
                            id: exists.length > 0 ? exists[0].id : null,
                            variant_type1: color.name,
                            variant_value1: color.id,
                            variant_type2: size.name,
                            variant_value2: size.id,
                            price: exists.length > 0 ? exists[0].price : 0,
                            qty: exists.length > 0 ? exists[0].qty : 0,
                            status: exists.length > 0 ? exists[0].status : 1
                        });
                    });
                });
            } else if(colors.length > 0) {
                this.variantTableData = colors.map(function(color) {
                    return {
                        variant_type1: color.name,
                        variant_value1: color.id,
                        variant_type2: '',
                        variant_value2: '',
                        price: 0,
                        qty: 0,
                        status: 1
                    }
                });
            } else if(sizes.length > 0) {
                this.variantTableData = sizes.map(function(size) {
                    return {
                        variant_type1: size.name,
                        variant_value1: size.id,
                        variant_type2: '',
                        variant_value2: '',
                        price: 0,
                        qty: 0,
                        status: 1
                    }
                });
            }
        },
        variantNameConcat(data) {
            let name = '';
            if(data.variant_type1 == 'color') {
                let color = this.colors.filter(x => x.id == data.variant_value1);
                name = color.length > 0 ? color[0].text : 'undefined';
            } else if(data.variant_type1 == 'size') {
                let size = this.sizes.filter(x => x.id == data.variant_value1);
                name = size.length > 0 ? size[0].text : 'undefined';
            }

            if(data.variant_type2 == 'size' ) {
                let size = this.sizes.filter(x => x.id == data.variant_value2);
                name += size.length > 0 ? ' - ' + size[0].text : 'undefined';
            }
                
            return name;
        },
        apply() {
            this.variantTableData.forEach(item => {
                item.price = this.allPrice;
                item.qty = this.allQty;
            });
            this.$refs['modal-1'].hide();
            this.allPrice = 0;
            this.allQty = 0;
        },
        handleFileObject(id) {
            this.file = this.$refs.file.files[0];
            this.imageUpload(id);
        },
        async imageUpload(id) {
            try {
                let formData = new FormData();
                formData.set('img', this.file);
                formData.set('id', this.id);
                let response = null;
                if(id) {
                    const { data } = await ProductAPI.variantImageUpdate(formData); 
                    response = data;
                } else {
                    const { data } = await ProductAPI.imageUpdate(formData); 
                    response = data;
                }
                
                alert(response.message);
                if(response.success) {
                    this.loadData()
                }
            } catch (error) {
                alert(error);
            }
        },
        async imageDelete(id) {
            try {
                if(confirm(this.$t("Do you really want to delete?"))){ 
                    const { data } = await ProductAPI.imageRemove({ id: this.id, gallery_id: id }); 
                    alert(data.message);
                    if(data.success) {
                        this.loadData()
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async loadData() {
            try {
                const { data } = await ProductAPI.getById(this.id);
                let selectedVariants = [];
                if(data.data.product.variant_type.includes('color')) 
                    selectedVariants.push('color');
                
                if(data.data.product.variant_type.includes('size')) 
                    selectedVariants.push('size');
                
                this.id = data.data.product.id
                this.category = data.data.product.category_id;
                this.gender = data.data.product.gender;
                this.name = data.data.product.name;
                this.description = data.data.product.description;
                this.selectedVariants = selectedVariants;
                this.variantData = data.data.product.product_variants;
                this.isUpdate = true;
                this.galleries = data.data.product.galleries;
            } catch (error) {
                alert(error);
            }
        },
        async getGallery() {
            try {
                const { data } = await ProductAPI.GalleryAPI(this.id);
                let selectedVariants = [];
                if(data.data.product.variant_type.includes('color')) 
                    selectedVariants.push('color');
                
                if(data.data.product.variant_type.includes('size')) 
                    selectedVariants.push('size');
                
                this.id = data.data.product.id
                this.category = data.data.product.category_id;
                this.gender = data.data.product.gender;
                this.name = data.data.product.name;
                this.description = data.data.product.description;
                this.selectedVariants = selectedVariants;
                this.variantData = data.data.product.product_variants;
                this.isUpdate = true;
                this.galleries = data.data.product.galleries;
            } catch (error) {
                alert(error);
            }
        }
    }
}
</script>

<style>

</style>