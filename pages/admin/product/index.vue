<template>
    <div class="container">
        <div class="float-right"><NuxtLink to="/admin/product/create" class="btn btn-primary">Create</NuxtLink></div>
        <h2>{{ $t('product') }}</h2>
        <b-row class="my-3">
            <b-col lg="3" md="4" cols="12">
                <b-input-group>
                    <b-form-input v-model="search"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="light"><i class="fa fa-search"></i></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <BaseLoading v-if="isLoading" />
        <div v-else>
            <b-table 
                striped 
                hover 
                bordered 
                :fields="productFields"
                :items="products" 
                class="mb-3" 
                empty-text>
                <template #cell(id)="data">
                    <a :href="'/admin/product/' + data.value">{{ products[data.index].name }}</a>
                </template>
            </b-table>
        </div>
        <b-row>
            <b-col cols="6">
                <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                ></b-pagination>
            </b-col>
            <b-col cols="6" class="text-right">
                <b-button-group>
                    <b-button 
                        v-for="show in showDataSelections" 
                        :key="show" 
                        @click="perPage = show" 
                        :variant="perPage == show ? 'primary' : 'light'">{{ show }}</b-button>
                </b-button-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ProductAPI from '@/api/product';
export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            products : [],
            isLoading: false,
            currentPage: 1,
            rows: 0,
            perPage: 10,
            showDataSelections: [
                10, 20, 50, 100
            ],
            search: '',
            productFields: [
                { key: 'id', label: 'Name' },
                { key: 'category.name', label: 'Category' },
                { key: 'gender', label: 'Gender' },
            ],
        }
    },
    async fetch() {
        await this.getData();
    },
    watch: {
        async currentPage() {
            await this.getData();
        },
        async perPage() {
            await this.getData();
        },
        async search() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() =>  {
                this.getData();
            }, 800);
        }
    },
    methods: {
        async getData() {
            try {
                this.isLoading = true;
                const { data } = await ProductAPI.getList({ 
                    page: this.currentPage, 
                    per_page: this.perPage, 
                    search: this.search 
                }); 
                this.products = data.data.data;
                this.rows = data.data.total;
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>