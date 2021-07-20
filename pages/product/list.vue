<template>
    <b-container>
		<BaseBreadcrumb class="mb-5" />
		<h3 class="mb-3">トップス</h3>
        <FrontProductGenderTab />
		<FrontSmallCarousel :items="carousel" class="mb-5" />
		<b-row class="mb-4">
			<b-col cols="6" lg="3" md="4">
				<small class="font-weight-bold">結果</small>
				<div class="my-2">80</div>
			</b-col>
			<b-col cols="6" md="5" lg="6" class="d-none d-md-none d-lg-block">
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
            <b-col cols="12" lg="3" md="4">
				<div>
					<h5>カテゴリー</h5>
					<div class="pl-3">
						<a href="#" class="text-dark d-block py-2" v-for="category in categories" :key="category">{{ category }}</a>
					</div>
				</div>
			</b-col>
            <b-col cols="12" lg="9" md="8">
				<b-row>
					<b-col cols="6" lg="3" md="4" v-for="product in products" :key="product.name">
						<FrontProductItem :product="product" />
					</b-col>
				</b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
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
			products: [
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
				{
					image : require("~/assets/front/product-01.webp"),
					name : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
					price: "¥1,000"
				},
			],
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
			categories: [
				'Category 1',
				'Category 2',
				'Category 3',
				'Category 4',
				'Category 5',
				'Category 6',
				'Category 7',
			]
        }
  }
}
</script>
