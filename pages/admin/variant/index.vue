<template>
    <div class="container">
        <div class="float-right"><NuxtLink to="/admin/variant/update" class="btn btn-primary">Create</NuxtLink></div>
        <h2>{{ $t('variant') }}</h2>
        <b-row class="my-3">
            <b-col lg="3" md="4" cols="12">
                <b-input-group>
                    <b-form-select v-model="filter" :options="filters"></b-form-select>
                </b-input-group>
            </b-col>
        </b-row>
        <b-skeleton-table
        :rows="5"
        :columns="4"
        :table-props="{ bordered: true, striped: true }"
        v-if="isLoading"
        ></b-skeleton-table>

        <div v-else>
            <b-table 
                striped 
                hover 
                bordered 
                :items="items" 
                class="mb-3"
                responsive 
                :fields="fields"
                empty-text>
                <template #cell(name)="data">
                    <a :href="'/admin/variant/' + items[data.index].id">{{ data.value }}</a>
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
import ProductVariantRefAPI from '@/api/productVariantRef';
export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            items : [],
            isLoading: false,
            currentPage: 1,
            rows: 0,
            perPage: 10,
            showDataSelections: [
                10, 20, 50, 100
            ],
            search: '',
            timer: null,
            fields: [
                { key: 'name', label: 'Name' },
                { key: 'text', label: 'Text' },
                { key: 'value', label: 'Value' },
            ],
            filters: [
                { text: 'All', value: '' },
                { text: 'Color', value: 'color' },
                { text: 'Size', value: 'size' },
            ],
            filter: ""
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
        async filter() {
            await this.getData();
        }
    },
    methods: {
        async getData() {
            try {
                this.isLoading = true;
                const { data } = await ProductVariantRefAPI.getList({ 
                    page: this.currentPage, 
                    per_page: this.perPage, 
                    search: this.filter 
                }); 
                this.items = data.data.data;
                this.rows = data.data.total;
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style>

</style>