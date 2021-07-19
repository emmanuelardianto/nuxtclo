<template>
  <div>
      <b-navbar toggleable="lg" type="light" class="bg-white">
      <b-container>
        <b-navbar-brand href="#">
          <img src="~/assets/header.svg" alt="logo" title="uniqlo">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Women</b-nav-item>
            <b-nav-item href="#">Men</b-nav-item>
            <b-nav-item href="#">Kids</b-nav-item>
            <b-nav-item href="#">Baby</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-input-group>
                  <b-form-input squared placeholder="Search"></b-form-input>
                  <b-input-group-append>
                    <b-button squared variant="outline-secondary"><i class="fa fa-search"></i></b-button>
                  </b-input-group-append>
              </b-input-group>
            </b-nav-form>
            <b-nav-item href="#"><i class="fa fa-store"></i></b-nav-item>
            <b-nav-item href="#"><i class="far fa-user"></i></b-nav-item>
            <b-nav-item href="#"><i class="far fa-heart"></i></b-nav-item>
            <b-nav-item href="#"><i class="fa fa-shopping-cart"></i></b-nav-item>

            <!-- <b-nav-item-dropdown right>
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown> -->
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar-light .navbar-nav .nav-link {
  color: #1b1b1b;
}
</style>