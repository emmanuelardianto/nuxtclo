<template>
    <div class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" xl="4" lg="6" md="10">
                <b-form>
                    <h2 class="mb-3">{{ $t('createData') }}</h2>
                    <b-alert :show="alert != ''" variant="danger" class="mb-3">{{ alert }}</b-alert>
                    <div class="form-group mb-3">
                        <label for="name">{{ $t('name') }}</label>
                        <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                    </div>
                    <div class="form-group mb-3">
                        <label for="email">{{ $t('email') }}</label>
                        <b-form-input v-model.trim="$v.email.$model"></b-form-input>
                    </div>
                    <div class="form-group mb-3">
                        <b-form-checkbox id="isAdmin" v-model="isAdmin" name="isAdmin" value="1">
                        {{ $t('isAdmin')}}
                        </b-form-checkbox>
                    </div>
                    <div class="form-group mb-3">
                        <b-form-checkbox id="status" v-model="status" name="status" value="1">
                        {{ $t('isActive')}}
                        </b-form-checkbox>
                    </div>
                    <div class="form-group mb-3">
                        <b-form-select v-model="gender" :options="genderOptions"></b-form-select>
                    </div>
                    <div class="form-group mb-3">
                        <b-button size="lg" variant="dark" squared class="mb-3" @click="save">{{ $t('save') }}</b-button>
                        <b-button size="lg" variant="danger" squared class="mb-3" @click="deleteData">{{ $t('delete') }}</b-button>
                        <b-button size="lg" variant="secondary" squared class="mb-3" @click="$router.push('/admin/user')">{{ $t('cancel') }}</b-button>
                    </div>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import UserAPI from '@/api/user';
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            genderOptions: ["female", "male"],
            alert: "",
            isLoading: true
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        email: {
            required,
            email
        },
        gender: {
            required
        },
    },
    async asyncData({ params }) { 
        const { data } = await UserAPI.getById(params.id); 
        return {
            id: data.data.id,
            email : data.data.email,
            name: data.data.name,
            isAdmin: data.data.is_admin,
            status: data.data.status,
            gender: data.data.gender,
        }
    },
    methods: {
        async save() {
            try {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.alert = "Error";
                    return;
                }
                const { data } = await UserAPI.update({
                    id: this.id,
                    name: this.name,
                    email: this.email,
                    is_admin: this.isAdmin,
                    status: this.status,
                    gender: this.gender
                });

                if(data.success) {
                    alert('Successfuly updated data');
                    this.$router.push('/admin/user')
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteData() {
            try {
                if(confirm(this.$t("Do you really want to delete?"))){ 
                    this.isLoading = true;
                    const { data } = await UserAPI.delete({ id: this.id }); 
                    this.isLoading = false;
                    if(data.success) {
                        alert('Successfuly deleted data.');
                        this.$router.push('/admin/user')
                    }
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