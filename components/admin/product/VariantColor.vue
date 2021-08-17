<template>
  <div>
    <div class="filter-box" :class="isSelected(color.id) ? 'active' : ''" v-for="color in colors" :key="color.id" @click="selectColor(color)">
        <div class="inner" :style="'background: #' + color.value + ';'"></div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["colors", "exists"],
    data() {
        return {
            selected: []
        }
    },
    mounted() {
        this.selected = this.exists.map(function(obj) {
            return obj.variant_value1
        });
    },
    methods: {
        selectColor(color) {
            if(this.exists.filter(x => x.variant_value1 == color.id).length > 0) 
                return;

            if(this.selected.indexOf(color.id) != -1)
                this.selected.splice(this.selected.indexOf(color.id), 1);
            else
                this.selected.push(color.id);
                
            this.$emit("updateSelected", this.selected);
        },
        isSelected(colorId) {
            return this.selected.indexOf(colorId) != -1;
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