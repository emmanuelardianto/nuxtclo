<template>
    <b-container>
		<BaseBreadcrumb class="mb-5" :breadcrumbs="breadcrumbs" />
		<h3 class="mb-3" v-if="category">{{ category.name }}</h3>
        <FrontProductGenderTab />
		<FrontSmallCarousel :items="carousel" class="mb-5" />
		<b-row class="mb-4">
			<b-col cols="6" xl="2" lg="3" md="4">
				<small class="font-weight-bold">結果</small>
				<div class="my-2">{{ pagination.total }}</div>
			</b-col>
			<b-col cols="6" xl="7" md="5" lg="6" class="d-none d-md-none d-lg-block">
				<small class="font-weight-bold">適用済みフィルター</small>
				<div class="my-2">
					<div class="d-inline-block px-4 py-2 bg-light mr-2">Men</div>
					<div class="d-inline-block px-4 py-2 bg-light mr-2">トップス</div>
					<div class="d-inline-block px-4 py-2 bg-light mr-2">Tシャツ</div>
				</div>
			</b-col>
			<b-col cols="6" md="3" lg="3">
				<small class="font-weight-bold">並べ替え</small>
				<div>
					<b-form-select v-model="orderSelected" :options="orders"></b-form-select>
				</div>
			</b-col>
		</b-row>
		<b-row>
            <b-col cols="12" xl="2" lg="3" md="4">
				<div>
					<h5>カテゴリー</h5>
					<div class="pl-3">
						<a :href="'/category/' + category.slug" class="text-dark d-block py-2" v-for="category in categories" :key="category.id">{{ category.name }}</a>
					</div>
				</div>
			</b-col>
            <b-col cols="12" xl="10" lg="9" md="8">
				<b-row>
					<b-col cols="6" lg="3" md="4" v-for="product in products" :key="product.id">
						<FrontProductItem :product="product" />
					</b-col>
				</b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import CategoryAPI from '@/api/category';
export default {
    layout: 'default',
    layout (context) {
        return 'default';
    },
    data() {
        return {
			orders: [
				"おすすめ順",
				"新作順"
			],
			orderSelected: "おすすめ順",
			carousel: [
				{
				image : require("~/assets/front/lineup/01.jpeg"),
				title : "Nuxtclo JW",
				},
				{
				image : require("~/assets/front/lineup/02.jpeg"),
				title : "Airism",
				},
			],
            products: [],
            categories: [],
            category_id: null,
            slug: '',
            category: null,
            pagination: {
                total: 0
            }
        }
    },
    async asyncData({params}) { 
        return {
            slug: params.collection,
            breadcrumbs: params
        }
    },
    async fetch() {
        await this.getData();
        await this.getCategory();
    },
    methods: {
        async getData() {
            try {
                const { data } = await CategoryAPI.getWithProduct({ 
                    slug: this.slug
                }); 
                this.products = data.data.products.data;
                this.pagination.total = data.data.products.total;
                this.category = data.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getCategory() {
            try {
                const { data } = await CategoryAPI.getList(); 
                this.categories = data.data.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
