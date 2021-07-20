<template>
  <div class="mb-3 border-bottom">
      <a href="#" 
      v-for="gender in genders" 
      :key="gender" 
      class="tab mr-3 px-1 py-2" 
      :class="active == gender ? 'active' : ''">
        {{ gender }}
    </a>
  </div>
</template>

<script>
export default {
    data() {
        return {
            genders: [
                'Women',
                'Men',
                'Kids'
            ],
            active: 'Women'
        }
    }
}
</script>

<style>
.tab {
    text-transform: uppercase;
    font-size: 1.2em;
    font-weight: bold;
    display: inline-block;
    border-bottom: 3px solid #FFF;
    color: #dddddd;
}
.tab.active, .tab.active:hover {
    color: #3d3d3d;
    text-decoration: none;
    border-bottom: 3px solid #3d3d3d;
}
.tab:hover {
    color: #aaaaaa;
    text-decoration: none;
    border-bottom: 3px solid #FFF;
}
</style>