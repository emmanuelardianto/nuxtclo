<template>
  <div>
    <FrontCarousel class="mb-5" />
    <b-container>
      <b-row>
        <b-col cols="12"><h1>Recommendation</h1></b-col>
        <b-col cols="12" lg="3" md="4" v-for="index in 10" :key="index">
          <FrontProductItem  />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'default',
  layout (context) {
    return 'default';
  }
}
</script>
