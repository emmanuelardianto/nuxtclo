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
				<div class="mb-3">
					<h5>カテゴリー</h5>
					<div class="pl-3">
						<a :href="'/category/' + category.slug" class="text-dark d-block py-2" v-for="category in categories" :key="category.id">{{ category.name }}</a>
					</div>
				</div>
                <div>
					<div v-b-toggle.collapse-price class="d-flex py-2 justify-content-between cursor-pointer">
                        <span class="text-bigger">価格</span>
                        <span class="when-opened text-secondary align-self-center">
                            <i class="fa plus fa-minus"></i>
                        </span>
                        <span class="when-closed text-secondary align-self-center">
                            <i class="fa plus fa-plus"></i>
                        </span>
                    </div>
                    <b-collapse id="collapse-price">
                        <div class="py-1 text-bigger text-secondary cursor-pointer" v-for="price in 9" :key="price" @click="selectPrice(price * 1000)">
                            <i class="fa-lg" :class="selectedFilter.price == price * 1000 ? 'fas fa-check-square' : 'far fa-square' "></i> ~ ¥{{ price * 1000 }}
                        </div>
                    </b-collapse>
				</div>
                <div>
					<div v-b-toggle.collapse-size class="d-flex py-2 justify-content-between cursor-pointer">
                        <span class="text-bigger">サイズ</span>
                        <span class="when-opened text-secondary align-self-center">
                            <i class="fa plus fa-minus"></i>
                        </span>
                        <span class="when-closed text-secondary align-self-center">
                            <i class="fa plus fa-plus"></i>
                        </span>
                    </div>
                    <b-collapse id="collapse-size" class="size-filter">
                        <div class="py-1 text-bigger text-secondary cursor-pointer" v-for="size in sizes" :key="size" @click="selectSize(size)">
                            <i class="fa-lg" :class="selectedFilter.sizes.indexOf(size) != -1 ? 'fas fa-check-square' : 'far fa-square' "></i> {{ size }}
                        </div>
                    </b-collapse>
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
            },
            selectedFilter: {
                price: -1,
                sizes: []
            },
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']
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
        },
        selectPrice(price) {
            if(this.selectedFilter.price == price) {
                this.selectedFilter.price = -1;
                return;
            }
            this.selectedFilter.price = price;
        },
        selectSize(size) {
            if(this.selectedFilter.sizes.indexOf(size) == -1) {
                this.selectedFilter.sizes.push(size);
                return;
            }
            this.selectedFilter.sizes = this.selectedFilter.sizes.filter(x => x != size);
        }
    },
}
</script>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
    display: none;
}
</style>