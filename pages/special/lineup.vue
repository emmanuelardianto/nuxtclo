<template>
    <b-container>
		<BaseBreadcrumb class="mb-5" />
		<h3 class="mb-3">トップス</h3>
		<FrontSmallCarousel :items="carousel" class="mb-5" />
		<h4>ラインナップ</h4>
    	<FrontPromotionImageText3Column :items="promotions" class="mb-5" />
		<div class="text-right"><a href="#" class="font-weight-bold text-dark text-underline">すべてのトップスを見る</a></div>
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
		{
          image : "topic-03.png",
          title : "置き配サービスがスタート2",
          description: "ご不在時にも荷物を受取れる置き配サービスを指定できるようになりました。"
        },
      ],
	  carousel: [
        {
          image : require("~/assets/front/lineup/01.jpeg"),
          title : "Nuxtclo JW",
        },
        {
          image : require("~/assets/front/lineup/02.jpeg"),
          title : "Airism",
        },
      ],
    }
  }
}
</script>
