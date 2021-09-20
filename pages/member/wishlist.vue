<template>
  <b-container>
      <BaseBreadcrumb class="mb-5" />
      <b-row>
          <b-col cols="3">
              <FrontMemberMenu name="wishlist" />
          </b-col>
          <b-col cols="9">
              <h1>お気に入り</h1>
              <div class="border px-4 py-4 my-4">
                  <h5>{{ wishlists.length }}件</h5>
                  <BaseLoading v-if="isLoading" />
                  <div v-else>
                      <div v-if="wishlists && wishlists.length > 0">
                          <b-row v-for="wishlist in wishlists" :key="wishlist.id" class="py-3 border-bottom">
                            <b-col cols="3">
                                <img :src="require('~/assets/front/product-01.webp')" :alt="wishlist.product.name" class="w-100">
                            </b-col>
                            <b-col cols="6">
                                <h5>{{ wishlist.product.name }}</h5>
                                <div class="mb-3">商品番号:&nbsp;{{ wishlist.product.id }}</div>
                                <div><a href="javascript:void(0)" class="text-underline" @click="removeWishlist(wishlist.id)">削除</a></div>
                            </b-col>
                            <b-col cols="3" class="text-right">
                                <b-button variant="outline-dark" size="sm" squared>レビューの投稿</b-button>
                            </b-col>
                        </b-row>
                        <div class="text-center mt-3">
                            <a href="#">もっとも見る</a>
                        </div>
                      </div>
                      <div v-else>現在お気に入りに登録された商品はありません。</div>
                  </div>
              </div>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import WistlistAPI from '@/api/wishlist';
export default {
    layout: 'default',
    layout (context) {
        return 'default';
    },
    middleware: ['auth'],
    data() {
        return {
            wishlists: [],
            isLoading: false
        }
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                this.isLoading = true;
                const { data } = await WistlistAPI.getList({ 
                    user_id: this.$auth.user.id
                }); 
                this.wishlists = data.data;
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
        async removeWishlist(id) {
            try {
                this.isLoading = true;
                const { data } = await WistlistAPI.toggle({ 
                    id: id
                }); 
                this.wishlists = data.data;
                if(data.success) {
                    alert('Successfuly deleted data');
                    this.getData();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>