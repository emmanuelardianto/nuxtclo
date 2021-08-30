<template>
  <div>
      <b-navbar toggleable="lg" type="light" class="bg-white">
      <b-container>
        <b-navbar-brand href="/">
          <img src="~/assets/header.svg" alt="logo" title="uniqlo">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" v-for="menu in menus" :key="menu" class="font-weight-bold text-uppercase">{{ menu }}</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form class="mr-3">
              <b-input-group>
                  <b-form-input squared :placeholder="$t('search')"></b-form-input>
                  <b-input-group-append>
                    <b-button squared variant="outline-secondary"><i class="fa fa-search"></i></b-button>
                  </b-input-group-append>
              </b-input-group>
            </b-nav-form>
            <b-nav-item href="#"><i class="fa fa-store"></i></b-nav-item>
            <b-nav-item-dropdown right>
              <template slot="button-content">
                <i class="far fa-user"></i>
              </template>
              <b-dropdown-item v-if="!this.$auth.loggedIn" href="/login">{{ $t('login') }}</b-dropdown-item>
              <template v-else>
                <b-dropdown-item href="/member">{{ $t('会員情報') }}</b-dropdown-item>
                <b-dropdown-item @click="logout">{{ $t('logout') }}</b-dropdown-item>
              </template>
            </b-nav-item-dropdown>
            <b-nav-item href="#"><i class="far fa-heart"></i></b-nav-item>
            <b-nav-item href="#"><i class="fa fa-shopping-cart"></i></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        "women",
        "men",
        "kids",
        "baby"
      ]
    }
  },
  methods: {
    async logout() {
      try {
            await this.$auth.logout()
            .then(()=>{
                this.$router.push('/login');
            })
        } catch (err) {
            console.log(err)
        }
    }
  }
}
</script>

<style scoped>
.navbar-light .navbar-nav .nav-link {
  color: #1b1b1b;
}
</style>