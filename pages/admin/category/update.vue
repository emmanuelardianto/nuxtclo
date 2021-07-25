<template>
    <div class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="4" lg="6" md="10">
                <h2 class="mb-3">{{ $t('createData') }}</h2>
                <b-alert :show="alert != ''" variant="danger" class="mb-3">{{ alert }}</b-alert>
                <div class="form-group mb-3">
                    <label for="name">{{ $t('name') }}</label>
                    <b-form-input v-model="name"></b-form-input>
                </div>
                <div class="form-group mb-3">
                    <b-button @click="save" size="lg" variant="dark" squared class="mb-3">{{ $t('save') }}</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import CategoryAPI from '@/api/category';
export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            name: "",
            alert: ""
        }
    },
    methods: {
        checkForm() {
            if(this.name || this.name.length <= 0) {
                this.alert = 'Name is required';
                return false;
            }
            return true;
        },
        async save() {
            try {
                if(!this.checkForm())
                    return;

                const { data } = await CategoryAPI.create({
                    name: this.name
                });

                if(data.success) {
                    alert('Successfuly created data');
                    this.$router.push('/admin/category')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>