<template>
    <a :href="'/product/' + product.slug " class="product-item mb-5">
        <img :src="require('~/assets/front/product-01.webp')" :title="product.name" :alt="product.name" class="w-100 mb-2" />
        <div class="mb-2">
            <div class="color" style="background: #F00;"></div>
            <div class="color" style="background: #0F0;"></div>
            <div class="color" style="background: #FFF;"></div>
            <div class="color" style="background: #000;"></div>
            <div class="color" style="background: #00F;"></div>
        </div>
        <b-row>
            <b-col cols="6">
                <small>MEN</small>
            </b-col>
            <b-col cols="6" class="text-right">
                <small>S-XL</small>
            </b-col>
        </b-row>
        <h5>{{ product.name }}</h5>
        <div class="font-weight-bold my-2">{{ priceCurrency(product.product_variants[0].price) }}</div>
        <div class="my-2">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            (40)
        </div>
    </a>
</template>

<script>
export default {
    props: [ 'product' ],
    methods: {
        priceCurrency(price) {
            var formatter = new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY',
            });
            return formatter.format(parseInt(price));
        }
    }
}
</script>

<style>
a.product-item {
    display: block;
    color: #3d3d3d;
    text-decoration: none;
    padding: 10px;
    border: 1px solid #FFFFFF;
}
a.product-item:hover {
    border: 1px solid #3d3d3d;
}
.product-item .color {
    width: 15px;
    height: 15px;
    border: 1px solid #dddddd;
    margin-right: 3px;
    display: inline-block;
}
</style>