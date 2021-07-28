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
                    <div class="form-group mb-3" v-if="!isUpdate">
                        <label for="password">{{ $t('password') }}</label>
                        <b-form-input type="password" v-model.trim="$v.password.$model"></b-form-input>
                    </div>
                    <div class="form-group mb-3" v-if="!isUpdate">
                        <label for="confirmPassword">{{ $t('confirmPassword') }}</label>
                        <b-form-input type="password" v-model.trim="$v.confirmPassword.$model"></b-form-input>
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
                        <b-form-select v-model="gender" :options="genderOptions">
                        </b-form-select>
                    </div>
                    <div class="form-group mb-3">
                        <b-button size="lg" variant="dark" squared class="mb-3" @click="save">{{ $t('save') }}</b-button>
                        <b-button size="lg" v-if="isUpdate" variant="danger" squared class="mb-3" @click="deleteData">{{ $t('delete') }}</b-button>
                        <b-button size="lg" variant="secondary" squared class="mb-3" @click="$router.push('/admin/user')">{{ $t('cancel') }}</b-button>
                    </div>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import UserAPI from '@/api/user';
import { required, minLength, email, requiredIf, sameAs } from 'vuelidate/lib/validators';
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
            gender: "female",
            genderOptions: [
                {
                    text: "Female",
                    value: "female"
                },
                {
                    text: "Male",
                    value: "male"
                }
            ],
            alert: "",
            isUpdate: false,
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
        password: {
            requiredIfCreate: requiredIf(function(item) {
                return !item.isUpdate;
            }),
            minLength: minLength(8)
        },
        confirmPassword: {
            sameAsPassword: sameAs(function(item) {
                return item.password;            
            })
        },
    },
    async asyncData({ params }) { 
        if(params.id != 'create') {

            const { data } = await UserAPI.getById(params.id); 
            return {
                id: data.data.id,
                email : data.data.email,
                name: data.data.name,
                isAdmin: data.data.is_admin,
                status: data.data.status,
                gender: data.data.gender,
                isUpdate: true
            }
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
                let result = null;
                let payload = {
                    id: this.id,
                    name: this.name,
                    email: this.email,
                    is_admin: this.isAdmin,
                    password: this.password,
                    status: this.status,
                    gender: this.gender
                };
                if(this.isUpdate) {
                    result = await UserAPI.update(payload);
                } else {
                    result = await UserAPI.create(payload);
                }
                const { data } = result;

                if(data.success) {
                    alert('Successfuly updated data');
                    this.$router.push('/admin/user')
                } else {
                    alert(data.message);
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