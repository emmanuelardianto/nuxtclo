<template>
  <div>
    <div class="filter-box" :class="selected.indexOf(size) != -1 ? 'active' : ''" v-for="size in sizes" :key="size.id" @click="selectSize(size)">
        <div class="inner">{{ size.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["sizes"],
    data() {
        return {
            selected: []
        }
    },
    methods: {
        selectSize(size) {
            if(this.selected.indexOf(size) != -1)
                this.selected.splice(this.selected.indexOf(size), 1);
            else
                this.selected.push(size);
                
            this.$emit("updateSelected", this.selected);
        }
    }
}
</script>

<style>
.filter-box {
    width: 49px;
    height: 47px;
    padding: 2px;
    border: 2px solid #FFFFFF;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
}
.filter-box:hover {
    padding: 3px;
    border: 1px solid #3d3d3d;
    transition: 0.2s linear all;
}

.filter-box.active,
.filter-box.active:hover {
    border: 2px solid #3d3d3d;
    padding: 2px;
}
.filter-box .inner {
    border: 1px solid #dddddd;
    padding: 4px 0;
    height: 39px;
    font-size: 1.3em;
    text-align: center;
}
</style>