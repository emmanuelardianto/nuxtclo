<template>
  <div>
    <FrontCarousel class="mb-5" />
    <b-container>
      <!-- special links -->
      <b-row class="mb-5">
        <b-col v-for="link in specialLinks" :key="link" cols="6" lg="3" md="6" class="text-center my-4">
          <h4>{{ link }}</h4>
          <a href="#" v-for="gender in genders" :key="gender" class="mx-2 text-dark border-bottom text-uppercase pb-1">{{ gender }}</a>
        </b-col>
      </b-row>
      <!-- topics -->
      <b-row class="my-3">
        <b-col v-for="topic in topics" :key="topic.title" cols="12" md="4">
          <b-row class="my-2">
            <b-col cols="6"><img :src="require('~/assets/front/' + topic.image)" :alt="topic.title" :title="topic.title" class="w-100"></b-col>
            <b-col cols="6">
              <h5>{{ topic.title }}</h5>
              <p>{{ topic.description }}</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <!-- promotion 01 -->
      <h2>ふだん着の日が、人生になる。</h2>
      <b-row class="my-3">
        <b-col v-for="promotion in promotions" :key="promotion.title" cols="12" md="6" class="my-3">
          <img src="~/assets/front/promotion-01.jpeg" :alt="promotion.title" :title="promotion.title" class="w-100 mb-3">
          <h5>{{ promotion.title }}</h5>
          <p>{{ promotion.description }}</p>
        </b-col>
      </b-row>
      <b-row class="justify-content-center my-4">
        <b-col cols="12" md="10" lg="8">
          <b-button block variant="outline-dark" class="font-weight-bold" squared>特集ページを見る</b-button>
        </b-col>
      </b-row>
      <h2>About LifeWear</h2>
      <b-row class="my-3">
        <b-col v-for="promotion in promotions" :key="promotion.title" cols="12" md="6" lg="3" class="my-3">
          <img src="~/assets/front/promotion-01.jpeg" :alt="promotion.title" :title="promotion.title" class="w-100 mb-3">
          <h5>{{ promotion.title }}</h5>
          <p>{{ promotion.description }}</p>
        </b-col>
      </b-row>
      <b-row class="justify-content-center my-4">
        <b-col cols="12" md="10" lg="8">
          <b-button block variant="outline-dark" class="font-weight-bold" squared>About LifeWearを見る</b-button>
        </b-col>
      </b-row>
      <h2>インフォメーション</h2>
      <b-row class="my-3">
        <b-col v-for="info in informations" :key="info" cols="12" md="3" lg="4" class="my-2">
          <a href="#" class="text-dark">{{ info }}</a>
        </b-col>
      </b-row>
    </b-container>
    <div class="bg-light py-4">
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
      products: [],
      isLoading: true,
      specialLinks: [
        '新作商品',
        '今週のチラシ',
        '期間限定価格商品',
        '値下げ商品'
      ],
      genders: [
        'Women',
        'Men',
        'Kids',
        'Baby'
      ],
      topics: [
        {
          image : "topic-01.jpeg",
          title : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
          description: "ご不在時にも荷物を受取れる置き配サービスを指定できるようになりました。"
        },
        {
          image : "topic-02.jpeg",
          title : "NUXTCLO PAY",
          description: "ご不在時にも荷物を受取れる置き配サービスを指定できるようになりました。"
        },
        {
          image : "topic-03.png",
          title : "置き配サービスがスタート",
          description: "ご不在時にも荷物を受取れる置き配サービスを指定できるようになりました。"
        },
      ],
      promotions: [
        {
          image : "topic-01.jpeg",
          title : "7月22日(木)20時　夏物セール　夏までに買い足したい、マストバイTOP3",
          description: "ご不在時にも荷物を受取れる置き配サービスを指定できるようになりました。"
        },
        {
          image : "topic-02.jpeg",
          title : "NUXTCLO PAY",
          description: "ご不在時にも荷物を受取れる置き配サービスを指定できるようになりました。"
        },
        {
          image : "topic-03.png",
          title : "置き配サービスがスタート",
          description: "ご不在時にも荷物を受取れる置き配サービスを指定できるようになりました。"
        },
        {
          image : "topic-03.png",
          title : "置き配サービスがスタート2",
          description: "ご不在時にも荷物を受取れる置き配サービスを指定できるようになりました。"
        },
      ],
      informations: [
        "店舗における感染防止対策",
        "着こなし発見アプリStyleHint",
        "ユニクロアプリで買い物上手に",
        "法人様・企業様へ大量購入/プリント加工サービス",
        "プレスリリース",
        "ショッピングバッグ有料化のお知らせ"
      ],
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
  },
  async fetch() {
    try {
      const { data } = await ProductAPI.getList(); 
      this.products = data.data;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {
    console.log(this.products.data);
  }
}
</script>
