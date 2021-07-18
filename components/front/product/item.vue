<template>
    <div>
        <b-card
            :title="product.name"
            :img-src="product.image_url"
            :img-alt="product.name"
            img-top
            tag="article"
            class="my-2"
        >
            <b-card-text>
            {{ product.description }}
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
    </div>
</template>

<script>
export default {
    props: [ 'product' ]
}
</script>

<style>

</style>