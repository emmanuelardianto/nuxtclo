<template>
  <div>
    <FrontCarousel class="mb-5" />
    <b-container>
      <b-row v-if="!isLoading">
        <b-col cols="12"><h1>Recommendation</h1></b-col>
        <b-col cols="12" lg="3" md="4" v-for="(item, index) in products.data" :key="index">
          <FrontProductItem :product="item"  />
        </b-col>
      </b-row>
      <div v-else>Loading <i class="fa fa-spin fa-spinner"></i></div>
    </b-container>
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
      isLoading: true
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
