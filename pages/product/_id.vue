<template>
  <div class="container product-detail">
    <BaseBreadcrumb class="mb-5" />
    <b-row>
        <b-col cols="12" xl="1" lg="1" class="d-none d-md-none d-lg-block d-xl-block">
            <div class="thumbnail" :class="slide == index ? 'active' : ''" v-for="(item, index) in images" :key="index" @click="slide = index">
                <img :src="item" class="w-100" />
            </div>
        </b-col>
        <b-col cols="12" xl="7" lg="7" md="12" class="mb-5">
            <b-carousel
                v-model="slide"
                controls
                indicators
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                >
                <b-carousel-slide v-for="(item, index) in images" :key="index" :img-src="item"></b-carousel-slide>
            </b-carousel>
        </b-col>
        <b-col cols="12" lg="4" md="12">
            <h1 class="mb-4">{{ product.name }}</h1>
            <b-row class="mb-3">
                <b-col cols="6" class="price">¥1,000</b-col>
                <b-col cols="6" class="text-right align-self-center"><FrontProductRating /></b-col>
            </b-row>
            <div class="mb-3 pb-3 border-bottom">{{ product.description }}</div>
            <div class="mb-3">
                <div class="mb-2"><b>カラー</b>: 65 BLUE</div>
                <div class="filter-box" :class="color == '#FFF' ? 'active' : ''" v-for="color in colors" :key="color">
                    <div class="inner" :style="'background: ' + color + ';'"></div>
                </div>
            </div>
            <div class="mb-3">
                <div class="mb-2"><b>サイズ</b>: 男女兼用 M</div>
                <div class="filter-box" :class="size == 'L' ? 'active' : ''" v-for="size in sizes" :key="size">
                    <div class="inner">{{ size }}</div>
                </div>
            </div>
            <b-row class="mb-3">
                <b-col cols="12" xl="4" md="6">
                    <div class="font-weight-bold mb-2">数量</div>
                    <b-form-select v-model="qtySelected" :options="qty"></b-form-select>
                </b-col>
            </b-row>
            <b-button variant="primary" size="lg" squared block class="mb-3">カートに入れる</b-button>
            <b-row>
                <b-col cols="6">
                    <b-button variant="outline-dark" size="lg" squared block class="mb-3">店舗在庫の検索</b-button>
                </b-col>
                <b-col cols="6">
                    <b-button variant="outline-dark" size="lg" squared block class="mb-3"><i class="fa fa-heart"></i> お気に入り</b-button>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" lg="7" md="6">
            <h4 class="border-bottom pb-3">この商品について</h4>
            <div class="mb-3"><FrontCollapse v-for="detail in productDetails" :key="detail.title" :title="detail.title" :content="detail.content" /></div>
            <b-row class="border-bottom py-3 no-gutters">
                <b-col cols="6"><h4>お客様のレビュー</h4></b-col>
                <b-col cols="6" class="text-right align-self-center"><FrontProductRating /></b-col>
            </b-row>
            <b-row class="border-bottom py-3 no-gutters">
                <b-col cols="6" class="font-weight-bold">お客様のレビュー</b-col>
                <b-col cols="6" class="text-right align-self-center"><a href="#">レビューを書く</a></b-col>
            </b-row>
            <FrontProductTestimony />
        </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductAPI from '@/api/product';
export default {
    layout: 'default',
    layout (context) {
        return 'default';
    },
    data() {
        return {
            slide: 0,
            sliding: null,
            sizes: [
                "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"
            ],
            colors: [
                "#000", "#00F", "#0F0", "#F00", "#FFF"
            ],
            qty: [
                1,2,3,4,5,6,7,8,9,10
            ],
            qtySelected: 1,
            productDetails: [
                {
                    title: "概要",
                    content: "・アーティスティックディレクターのクリストフ・ルメールが率いるデザインチームが、世界中のファッションと新素材の情報が集まるパリのR&Dセンターとともに、上質なワードローブを追求するコレクション。 <br />・表面に程良い光沢感が出る特殊加工を施した天竺素材を使用。<br />・ドロップショルダーでボクシーなシルエットに長めの袖もポイント。<br />・上品でクリーンな印象にトレンドのビックシルエットがポイントになった新しいTシャツ。"
                },
                {
                    title: "商品詳細",
                    content: "・アーティスティックディレクターのクリストフ・ルメールが率いるデザインチームが、世界中のファッションと新素材の情報が集まるパリのR&Dセンターとともに、上質なワードローブを追求するコレクション。 <br />・表面に程良い光沢感が出る特殊加工を施した天竺素材を使用。<br />・ドロップショルダーでボクシーなシルエットに長めの袖もポイント。<br />・上品でクリーンな印象にトレンドのビックシルエットがポイントになった新しいTシャツ。"
                },
            ],
            images: [
                require("~/assets/front/product-01.webp"),
                require("~/assets/front/product-02.webp"),
                require("~/assets/front/product-03.webp"),
                require("~/assets/front/product-04.webp"),
                require("~/assets/front/product-05.webp"),
                require("~/assets/front/product-06.webp")
            ]
        }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
    async asyncData({ params }) { 
        const { data } = await ProductAPI.getById(params.id);
            
        return {
            product: data
        }
    },
}
</script>

<style>
.product-detail .thumbnail {
    padding: 3px;
    border: 1px solid #dddddd;
    cursor: pointer;
    margin-bottom: 5px;
}
.product-detail .thumbnail:hover {
    border: 1px solid #3d3d3d;
    padding: 3px;
}

.product-detail .thumbnail.active {
    border: 2px solid #3d3d3d;
    padding: 2px;
}
.product-detail .color {
    width: 45px;
    height: 45px;
    border: 1px solid #dddddd;
    margin-right: 5px;
    margin-bottom: 5px;
    display: inline-block;
}
.product-detail .filter-box {
    width: 49px;
    height: 47px;
    padding: 2px;
    border: 2px solid #FFFFFF;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
}
.product-detail .filter-box:hover {
    padding: 3px;
    border: 1px solid #3d3d3d;
    transition: 0.2s linear all;
}

.product-detail .filter-box.active,
.product-detail .filter-box.active:hover {
    border: 2px solid #3d3d3d;
    padding: 2px;
}
.product-detail .filter-box .inner {
    border: 1px solid #dddddd;
    padding: 4px 0;
    height: 39px;
    font-size: 1.3em;
    text-align: center;
}
.product-detail .price {
    font-size: 2em;
    font-weight: bold;
}
</style>