<template>
  <b-container>
      <BaseBreadcrumb class="mb-5" />
      <b-row>
          <b-col cols="3">
              <FrontMemberMenu />
          </b-col>
          <b-col cols="9">
              <h1>会員バーコード</h1>
              <div class="border px-4 py-4">
                  <b-button class="float-right" size="sm" variant="outline-secondary" squared>印刷する</b-button>
                  <div class="font-weight-bold mb-3">会員バーコード</div>
                  <p>店舗レジにてお会計時に、こちらの会員IDバーコードをご提示ください。</p>
                  <img src="~/assets/front/barcode.png" alt="barcode">
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
}
</script>

<style>

</style>