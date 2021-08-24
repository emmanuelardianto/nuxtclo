<template>
    <ul class="tab-navi list-unstyled border-bottom" v-if="selectedMenu">
        <li v-for="menu in selectedMenu.items" :key="menu.name" :class="menu.name == name ? 'active' : ''" ><a :href="menu.link">{{ menu.title }}</a></li>
    </ul>
</template>

<script>
export default {
    props: ['page', 'name'],
    data() {
        return {
            menus: [
                {
                    page: "coupon",
                    items: [
                        {
                            name: "store",
                            title: "店舗",
                            link: "/member/coupon/wallet-store"
                        },
                        {
                            name: "online",
                            title: "オンラインストア",
                            link: "/member/coupon/wallet-online-store"
                        }
                    ]
                },
                {
                    page: "wishlist",
                    items: [
                        {
                            name: "product",
                            title: "店舗",
                            link: "/member/coupon/wallet-store"
                        },
                        {
                            name: "style",
                            title: "オンラインストア",
                            link: "/member/coupon/wallet-online-store"
                        }
                    ]
                }
            ],
            selectedMenu: null
        }
    },
    created() {
        this.selectedMenu = this.menus.filter(x => x.page == this.page)[0];
    }
}
</script>

<style>
.tab-navi li {
    display: inline-block;
}
.tab-navi li a {
    display: inline-block;
    padding: 10px 15px;
    color: #a3a3a3;
}
.tab-navi li a:hover {
    text-decoration: none;
    color: inherit;
}
.tab-navi li.active {
    border-bottom: #000 2px solid;
}
.tab-navi li.active a {
    font-weight: bold;
    color: inherit;
}
</style>