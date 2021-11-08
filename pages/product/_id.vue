<template>
  <div class="container product-detail">
    <BaseBreadcrumb class="mb-5" />
    <b-row>
        <b-col cols="12" xl="1" lg="1" class="d-none d-md-none d-lg-block d-xl-block">
            <div class="thumbnail" :class="slide == index ? 'active' : ''" v-for="(item, index) in product.galleries" :key="index" @click="slide = index">
                <img :src="item.path" class="w-100" />
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
                <b-carousel-slide v-for="(item, index) in product.galleries" :key="index" :img-src="item.path"></b-carousel-slide>
            </b-carousel>
        </b-col>
        <b-col cols="12" lg="4" md="12">
            <h1 class="mb-4">{{ product.name }}</h1>
            <b-row class="mb-3">
                <b-col cols="6" class="price">{{ selectedVariant ? selectedVariant.price : 'Sold Out' }}</b-col>
                <b-col cols="6" class="text-right align-self-center"><FrontProductRating /></b-col>
            </b-row>
            <div class="mb-3 pb-3 border-bottom">{{ product.description }}</div>
            <div class="mb-3">
                <div class="mb-2" v-if="selectedColor"><b>カラー</b>: {{  selectedColor.text }}</div>
                <div class="filter-box" @click="selectedColor = color" :class="selectedColor == color ? 'active' : ''" v-for="color in colors" :key="color.id">
                    <div class="inner" :style="'background: #' + color.value + ';'"></div>
                </div>
            </div>
            <div class="mb-3">
                <div class="mb-2" v-if="selectedSize"><b>サイズ</b>: {{ selectedSize.text }}</div>
                <div class="filter-box" @click="selectedSize = size" :class="selectedSize == size ? 'active' : ''" v-for="size in sizes" :key="size.id">
                    <div class="inner">{{ size.text }}</div>
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
                    <b-button variant="outline-dark" size="lg" squared block class="mb-3" @click="addToWishlist"><i class="fa fa-heart"></i> お気に入り</b-button>
                </b-col>
            </b-row>
            <b-row v-if="wishlists.length > 0">
                <b-col cols="12">
                    <div class="font-weight-bold mb-3">この商品のお気に入り登録情報</div>
                    <div v-for="wishlist in wishlists" :key="wishlist.id">
                        カラー: {{ wishlist.color.text }} / サイズ: {{ wishlist.size.text }}
                    </div>
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
import WistlistAPI from '@/api/wishlist';
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
            selectedSize: null,
            selectedColor: null,
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
            ],
            wishlists: []
        }
    },
    mounted() {
        this.getWishlist();
    },
    watch: {
        selectedSize(val) {
            if(this.product.variant_type == 'colorsize') {
                if(this.selectedColor) {
                    this.selectedVariant = this.variants.filter(
                                                        x => x.variant_type1 == 'color' &&
                                                        x.variant_value1 == this.selectedColor.id &&
                                                        x.variant_type2 == 'size' &&
                                                        x.variant_value2 == val.id)[0];
                }
            } else if(this.product.variant_type == 'size') {
                this.selectedVariant = this.variants.filter(
                                                        x => x.variant_type1 == 'size' &&
                                                        x.variant_value1 == val.id)[0];
            }
        },
        selectedColor(val) {
            if(this.product.variant_type == 'colorsize') {
                if(this.selectedSize) {
                    this.selectedVariant = this.variants.filter(
                                                        x => x.variant_type1 == 'color' &&
                                                        x.variant_value1 == val.id &&
                                                        x.variant_type2 == 'size' &&
                                                        x.variant_value2 == this.selectedSize.id)[0];
                }
            } else if(this.product.variant_type == 'color') {
                this.selectedVariant = this.variants.filter(
                                                        x => x.variant_type1 == 'color' &&
                                                        x.variant_value1 == val.id)[0];
            }
        }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      async addToWishlist() {
        if(!this.$auth.loggedIn) {
            this.$router.push('/login')
            return;
        }
        
        if(!this.selectedSize || !this.selectedColor) {
            alert("Please select variant");
            return;
        }
        try {
            this.isLoading = true;
            const { data } = await WistlistAPI.toggle({ 
                user_id: this.$auth.user.id,
                product_id: this.product.id,
                product_variant_id: this.selectedVariant.id
            }); 
            this.getWishlist()
            alert(data.message);
        } catch (error) {
            console.log(error);
        }
      },
      async getWishlist() {
        try {
            if(!this.$auth.loggedIn)
                return;

            this.isLoading = true;
            const { data } = await WistlistAPI.getList({ 
                user_id: this.$auth.user.id,
                product_id: this.product.id
            }); 
            this.wishlists = data.data;
            this.wishlists = data.data.map(function(w) {
                return this.variants.filter(x => x.id == w.product_variant_id).map(function(x) {
                        return {
                            id: w.id,
                            color: this.colors.filter(col => col.id == x.variant_value1)[0],
                            size: this.sizes.filter(col => col.id == x.variant_value2)[0],
                        }
                }, this)[0];
            }, this);
            this.isLoading = false;
            console.log(this.wishlists);
        } catch (error) {
            console.log(error);
        }
      },
    },
    async asyncData({ params }) { 
        const { data } = await ProductAPI.getBySlug(params.id);
        return {
            product: data.data.product,
            variants: data.data.product.product_variants,
            selectedVariant: data.data.product.product_variants[0],
            colors: data.data.assets.filter(x => x.name == 'color'),
            sizes: data.data.assets.filter(x => x.name == 'size'),
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