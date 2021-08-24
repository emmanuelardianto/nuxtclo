<template>
  <b-container>
      <BaseBreadcrumb class="mb-5" />
      <b-row>
          <b-col cols="3">
              <FrontMemberMenu name="coupon" />
          </b-col>
          <b-col cols="9">
              <h1>クーポン一覧</h1>
              <FrontTabNavi page="coupon" name="online" />
              <div class="border px-4 py-4">
                  <div class="font-weight-bold mb-3">店舗クーポン</div>
                  <p>2 利用可能クーポン</p>
                  <hr />
                  <b-row class="border-bottom py-3" v-for="coupon in coupons" :key="coupon.title">
                      <b-col cols="3"><img :src="coupon.thumbnail" :alt="coupon.title" class="w-100"></b-col>
                      <b-col cols="7">
                          <h5>{{ coupon.title }}</h5>
                          <p>{{ coupon.endDate }}</p>
                      </b-col>
                      <b-col cols="2"><b-button v-b-modal.modal-1 @click="selectedCoupon = coupon" block variant="outline-dark" squared size="sm">詳細</b-button></b-col>
                  </b-row>
              </div>
          </b-col>
      </b-row>
      <b-modal id="modal-1" v-if="selectedCoupon" centered title="クーポン詳細" hide-footer size="lg">
          <b-row class="py-3">
            <b-col cols="3"><img :src="selectedCoupon.thumbnail" :alt="selectedCoupon.title" class="w-100"></b-col>
            <b-col cols="9">
                <h5>{{ selectedCoupon.title }}</h5>
                <p>{{ selectedCoupon.endDate }}</p>
                <p>
                    ・2021年8月31日（火）までご利用いただけます。
                    ・以下、J Brandポップアップストアのみで使用可能です。
                    三井アウトレットパーク木更津店
                    三井アウトレットパーク幕張店
                    あみプレミアム・アウトレット店
                    神戸三田プレミアム・アウトレット店
                    ・ユニクロ店舗、オンラインストアではご使用いただけません。
                    ・使用可能回数は1回限りとなります。
                    ・1会計につき1枚のクーポンをご利用いただけます。
                    ・本クーポンの第三者の方への譲渡、現金への換金はできません。

                    使用可能店舗:
                    J Brand 三井アウトレットパーク木更津店
                    J Brand 三井アウトレットパーク幕張店
                    J Brand 神戸三田プレミアム・アウトレット店
                    J Brand あみプレミアム・アウトレット店
                </p>
            </b-col>
        </b-row>
        </b-modal>
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
            coupons: [
                {
                    title: "J Brand ポップアップストア オープン記念クーポン1",
                    description: "lalala",
                    endDate: "使用期限: 2021/8/31 23:59 JST",
                    thumbnail : require("~/assets/front/coupon-online.jpeg"),
                },
                {
                    title: "J Brand ポップアップストア オープン記念クーポン2",
                    description: "lilili",
                    endDate: "使用期限: 2021/8/31 23:59 JST",
                    thumbnail : require("~/assets/front/coupon-online.jpeg"),
                }
            ],
            selectedCoupon: null,
        }
    },
}
</script>

<style>
</style>