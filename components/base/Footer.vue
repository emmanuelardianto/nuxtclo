<template>
  <div class="bg-light py-4 mt-5">
      <b-container>
        <div class="mb-3"><a href="#" v-for="footer in footers" :key="footer" class="text-dark mr-3 border-right pr-3">{{ footer }}</a></div>
        <div class="mb-5">
          <span class="font-weight-bold mr-3">グループブランド　オンラインストア</span>
          <a href="#" v-for="brand in footerGlobalBrands" :key="brand" class="text-dark mr-3 border-right pr-3">{{ brand }}</a>
        </div>
        <div class="border-bottom mb-3"></div>
        <b-row>
          <b-col cols="12" md="6" class="text-center text-lg-left text-md-left my-3" >Copyright © NUXTCLO Co., Ltd. All rights reserved.</b-col>
          <b-col cols="12" md="6" class="text-center text-lg-right text-md-right my-3">
            <i class="fab fa-2x fa-facebook mr-2"></i>
            <i class="fab fa-2x fa-instagram mr-2"></i>
            <i class="fab fa-2x fa-twitter mr-2"></i>
            <i class="fab fa-2x fa-youtube"></i>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            footers: [
                "会員情報",
                "返金・交換について",
                "お問い合わせ",
                "利用規約",
                "プライバシーポリシー",
                "推奨環境",
                "企業情報"
            ],
            footerGlobalBrands: [
                "ジーユー",
                "セオリー",
                "プラステ",
                "コントワー・デ・コトニエ"
            ]
        }
    }
}
</script>

<style>

</style>