<template>
  <b-container>
      <BaseBreadcrumb class="mb-5" />
      <b-row>
          <b-col cols="3">
              <FrontMemberMenu name="address" />
          </b-col>
          <b-col cols="9">
              <h1>アドレス帳</h1>
              <div class="border px-4 py-4 mb-4">
                  <h5 class="mb-3">会員住所</h5>
                  <div class="font-weight-bold">Ｓｉｔｉｎｊａｋ Ｅｍｍａｎｕｅｌ (シチンジャク エマニュエル) (会員住所)</div>
                  <p>〒187-0001<br />東京都荒川区東日暮里１－３－１４０４号パークウェル三ノ輪駅前<br />08035032875</p>
                  <a href="#">会員情報の変更</a> | <a href="#">現在のお届け先</a>
              </div>
              <div class="border px-4 py-4">
                  <h5 class="mb-3">お届け先</h5>
                  <p>最大で10件のお届け先を登録できます。</p>
                  <div class="border-bottom my-3"></div>
                  <p>お届け先住所が登録されていません</p>
                  <b-button variant="dark" squared>新しいお届け先を登録</b-button>
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
        }
    }
}
</script>

<style>

</style>