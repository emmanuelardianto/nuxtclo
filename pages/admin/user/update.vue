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
                        <label for="password">{{ $t('password') }}</label>
                        <b-form-input type="password" v-model.trim="$v.password.$model"></b-form-input>
                    </div>
                    <div class="form-group mb-3">
                        <label for="confirmPassword">{{ $t('confirmPassword') }}</label>
                        <b-form-input type="password" v-model.trim="$v.confirmPassword.$model"></b-form-input>
                    </div>
                    <div class="form-group mb-3">
                        <b-form-checkbox id="isAdmin" v-model="isAdmin" name="isAdmin">
                        {{ $t('isAdmin')}}
                        </b-form-checkbox>
                    </div>
                    <div class="form-group mb-3">
                        <b-form-checkbox id="status" v-model="status" name="status">
                        {{ $t('isActive')}}
                        </b-form-checkbox>
                    </div>
                    <div class="form-group mb-3">
                        <b-form-select v-model="gender" :options="genderOptions"></b-form-select>
                    </div>
                    <div class="form-group mb-3">
                        <b-button size="lg" variant="dark" squared class="mb-3" @click="save">{{ $t('save') }}</b-button>
                    </div>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import UserAPI from '@/api/user';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
export default {
    layout: 'admin',
    layout (context) {
        return 'admin';
    },
    data() {
        return {
            email : "",
            name: "",
            password: "",
            confirmPassword: "",
            isAdmin: false,
            status: false,
            gender: "",
            genderOptions: ["female", "male"],
            alert: ""
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
        password: {
            required,
            minLength: minLength(4)
        },
        confirmPassword: {
            required
        },
        gender: {
            required
        },
    },
    methods: {
        async save() {
            try {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.alert = "Error";
                    return;
                }
                const { data } = await UserAPI.create({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    is_admin: this.isAdmin,
                    status: this.status,
                    gender: this.gender
                });

                if(data.success) {
                    alert('Successfuly created data');
                    this.$router.push('/admin/user')
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