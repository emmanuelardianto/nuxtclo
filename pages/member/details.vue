<template>
  <b-container>
      <BaseBreadcrumb class="mb-5" />
      <b-row>
          <b-col cols="3">
              <FrontMemberMenu name="detail" />
          </b-col>
          <b-col cols="9">
              <h1>会員情報詳細</h1>
              <p>こちらの内容はユニクロ・ジーユーで共通です。編集を行った場合はユニクロ・ジーユー双方のアカウントへ反映されます。</p>
              <div class="border px-4 py-4">
                  <b-button class="float-right" size="sm" variant="outline-dark" squared>メールアドレスの変更</b-button>
                  <h5 class="mb-3">会員メールアドレス</h5>
                  <div class="font-weight-bold">メールアドレス</div>
                  <p>myemail@email.com</p>
                  <div class="border-bottom mb-3"></div>
                  <b-button class="float-right" size="sm" variant="outline-dark" squared>会員情報の変更</b-button>
                  <h5 class="mb-4">会員情報詳細</h5>
                  <div class="mb-4" v-for="data in userData" :key="data.name">
                      <div class="font-weight-bold">{{ data.name }}</div>
                        <p>{{ data.value }}</p>
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
            userData: [
                {
                    name: "名前",
                    value: "Ｓｉｔｉｎｊａｋ Ｅｍｍａｎｕｅｌ"
                },
                {
                    name: "フリガナ",
                    value: "シチンジャク エマニュエル"
                },
                {
                    name: "郵便番号",
                    value: "〒187-0001"
                },
                {
                    name: "住所",
                    value: "東京都荒川区東日暮里１－３－１４０４号パークウェル三ノ輪駅前"
                },
                {
                    name: "電話番号(1)",
                    value: "08035032875"
                },
                {
                    name: "電話番号(2)",
                    value: "未登録"
                },
                {
                    name: "生年月日",
                    value: "1991/12/17"
                },
                {
                    name: "性別",
                    value: "男性"
                },
            ]
        }
    }
}
</script>

<style>

</style>