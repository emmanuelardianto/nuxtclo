<template>
  <div>
      <div v-for="menu in menus" :key="menu.header" class="mb-4">
          <div class="font-weight-bold mb-2">{{ menu.header }}</div>
          <ul class="list-unstyled">
             <li v-for="item in menu.items" :key="item.title" class="my-2"><a :href="item.link" class="text-decoration-none">{{ item.title }}</a></li> 
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            menus: [
                {
                    header: "会員情報",
                    items: [
                        {
                            title: "会員バーコード",
                            link: "/member"
                        },
                        {
                            title: "クーポン一覧",
                            link: "/member/coupon/wallet-store"
                        },
                        {
                            title: "お気に入り",
                            link: ""
                        },
                        {
                            title: "購入商品一覧",
                            link: ""
                        },
                        {
                            title: "オンラインストア注文状況",
                            link: ""
                        },
                        {
                            title: "投稿したレビュー",
                            link: ""
                        },
                        {
                            title: "ユニクロギフトカード残高・有効期限を確認する",
                            link: ""
                        },
                    ]
                }, 
                {
                    header: "お客様情報の確認・変更",
                    items: [
                        {
                            title: "会員情報詳細",
                            link: ""
                        },
                        {
                            title: "メールマガジン",
                            link: ""
                        },
                        {
                            title: "マイサイズ",
                            link: ""
                        },
                        {
                            title: "アドレス帳",
                            link: ""
                        },
                        {
                            title: "パスワードの変更",
                            link: ""
                        },
                        {
                            title: "クレジットカード",
                            link: ""
                        },
                        {
                            title: "UNIQLO Pay",
                            link: ""
                        },
                        {
                            title: "会員情報のつながりを解除",
                            link: ""
                        },
                        {
                            title: "退会をご希望の方",
                            link: ""
                        },
                    ]
                }, 
            ]
        }
    }
}
</script>

<style>

</style>