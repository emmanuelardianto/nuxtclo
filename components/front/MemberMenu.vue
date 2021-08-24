<template>
  <div>
      <div v-for="menu in menus" :key="menu.header" class="mb-4">
          <div class="font-weight-bold mb-2">{{ menu.header }}</div>
          <ul class="list-unstyled">
             <li v-for="item in menu.items" :key="item.title" class="my-2" :class="item.name == name ? 'font-weight-bold' : ''"><a :href="item.link" class="text-decoration-none">{{ item.title }}</a></li> 
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    props: ["name"],
    data() {
        return {
            menus: [
                {
                    header: "会員情報",
                    items: [
                        {
                            name: "memberinfo",
                            title: "会員バーコード",
                            link: "/member"
                        },
                        {
                            name: "coupon",
                            title: "クーポン一覧",
                            link: "/member/coupon/wallet-store"
                        },
                        {
                            name: "",
                            title: "お気に入り",
                            link: ""
                        },
                        {
                            name: "",
                            title: "購入商品一覧",
                            link: ""
                        },
                        {
                            name: "",
                            title: "オンラインストア注文状況",
                            link: ""
                        },
                        {
                            name: "",
                            title: "投稿したレビュー",
                            link: ""
                        },
                        {
                            name: "",
                            title: "ユニクロギフトカード残高・有効期限を確認する",
                            link: ""
                        },
                    ]
                }, 
                {
                    header: "お客様情報の確認・変更",
                    items: [
                        {
                            name: "detail",
                            title: "会員情報詳細",
                            link: "/member/details"
                        },
                        {
                            name: "",
                            title: "メールマガジン",
                            link: ""
                        },
                        {
                            name: "",
                            title: "マイサイズ",
                            link: ""
                        },
                        {
                            name: "",
                            title: "アドレス帳",
                            link: ""
                        },
                        {
                            name: "",
                            title: "パスワードの変更",
                            link: ""
                        },
                        {
                            name: "",
                            title: "クレジットカード",
                            link: ""
                        },
                        {
                            name: "",
                            title: "UNIQLO Pay",
                            link: ""
                        },
                        {
                            name: "",
                            title: "会員情報のつながりを解除",
                            link: ""
                        },
                        {
                            name: "",
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