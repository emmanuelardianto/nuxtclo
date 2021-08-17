<template>
  <div>
    <div class="filter-box" :class="isSelected(size.id) ? 'active' : ''" v-for="size in sizes" :key="size.id" @click="selectSize(size)">
        <div class="inner">{{ size.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["sizes", "exists"],
    data() {
        return {
            selected: []
        }
    },
    mounted() {
        this.selected = this.exists.map(function(obj) {
            return obj.variant_type1 == 'size' ? obj.variant_value1 : obj.variant_value2;
        });
    },
    methods: {
        selectSize(size) {
            if(this.exists.filter(x => x.variant_type1 == 'size' && (x.variant_value1 == size.id || x.variant_value2)).length > 0) 
                return;

            if(this.selected.indexOf(size.id) != -1)
                this.selected.splice(this.selected.indexOf(size), 1);
            else
                this.selected.push(size.id);
                
            this.$emit("updateSelected", this.selected);
        },
        isSelected(sizeId) {
            return this.selected.indexOf(sizeId) != -1;
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