<template>
    <div class="container">
        <div class="float-right"><NuxtLink to="/admin/user/update" class="btn btn-primary">Create</NuxtLink></div>
        <h2>{{ $t('user') }}</h2>
        <b-row class="my-3">
            <b-col lg="3" md="4" cols="12">
                <b-input-group>
                    <b-form-input></b-form-input>
                    <b-input-group-append>
                        <b-button variant="light"><i class="fa fa-search"></i></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-table striped hover bordered :items="products"></b-table>
    </div>
</template>

<script>
import ProductAPI from '@/api/product';
export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            products : []
        }
    },
    // async fetch() {
    //   this.products = await ProductAPI.getList();
    // }
}
</script>

<style>

</style>