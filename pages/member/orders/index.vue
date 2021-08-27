<template>
  <b-container>
      <BaseBreadcrumb class="mb-5" />
      <b-row>
          <b-col cols="3">
              <FrontMemberMenu name="order" />
          </b-col>
          <b-col cols="9">
              <h1>オンラインストア注文状況</h1>
              <p>「注文キャンセル」は、注文後30分以内に限りお客様自身でキャンセルできます。配送状況が「ご注文が成立していません。」の場合は、注文は自動でキャンセルされますので、再度ご注文ください。出荷後、保管期間を過ぎたご注文は、弊社からの連絡なくキャンセルとなります。</p>
              <div class="border px-4 py-4 my-4">
                  <h5>1 件中 1 件表示</h5>
                  <b-row v-for="product in products" :key="product.id" class="py-3 border-bottom">
                      <b-col cols="3">
                          <img :src="product.image" :alt="product.name" class="w-100">
                      </b-col>
                      <b-col cols="6">
                          <h5>{{ product.name }}</h5>
                          <div>商品番号:&nbsp;{{ product.id }}</div>
                          <div>カラー:&nbsp;{{ product.color }}</div>
                          <div>サイズ:&nbsp;{{ product.size }}</div>
                          <div>購入日:&nbsp;{{ product.date }}</div>
                          <div>購入場所:&nbsp;{{ product.place }}</div>
                      </b-col>
                      <b-col cols="3" class="text-right">
                          <b-button variant="outline-dark" size="sm" squared>注文詳細</b-button>
                      </b-col>
                  </b-row>
                  <div class="text-center mt-3">
                      <a href="#">もっとも見る</a>
                  </div>
              </div>
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
            products: [
                {
                    image : require("~/assets/front/product-01.webp"),
					name : "スーピマコットンリラックスフィットクルーT（半袖）",
					id: "4361332",
                    color: "56 OLIVE",
                    size: "Men M",
                    date: "2021/8/5",
                    place: "ユニクロ原宿店"
                },
                {
                    image : require("~/assets/front/product-01.webp"),
					name : "スーピマコットンリラックスフィットクルーT（半袖）",
					id: "4361323",
                    color: "56 OLIVE",
                    size: "Men M",
                    date: "2021/8/5",
                    place: "ユニクロ原宿店"
                },
                {
                    image : require("~/assets/front/product-01.webp"),
					name : "スーピマコットンリラックスフィットクルーT（半袖）",
					id: "436133",
                    color: "56 OLIVE",
                    size: "Men M",
                    date: "2021/8/5",
                    place: "ユニクロ原宿店"
                },
                {
                    image : require("~/assets/front/product-01.webp"),
					name : "スーピマコットンリラックスフィットクルーT（半袖）",
					id: "4363133",
                    color: "56 OLIVE",
                    size: "Men M",
                    date: "2021/8/5",
                    place: "ユニクロ原宿店"
                },
            ]
        }
    }
}
</script>

<style>

</style>