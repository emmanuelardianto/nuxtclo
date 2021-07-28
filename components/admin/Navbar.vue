<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="bg-white" fixed="top">
      <b-container>
        <b-navbar-brand href="#">
          <img src="~/assets/header.svg" alt="logo" title="uniqlo">
        </b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :href="menu.url" v-for="(menu, index) in menus" :key="index" class="font-weight-bold text-uppercase">{{ menu.name }}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
    data() {
    return {
      menus: [
          {
              name: this.$t("user"),
              url: "/admin/user"
          },
          {
              name: this.$t("product"),
              url: "/admin/product"
          },
          {
              name: this.$t("category"),
              url: "/admin/category"
          },
          {
              name: this.$t("transaction"),
              url: "/admin/user"
          },
      ]
    }
  }
}
</script>

<style scoped>

</style>