<template>
    <div class="container">
        <b-row>
            <b-col cols="12">
                <h1 class="mb-3">{{ $t('resetPassword') }}</h1>
                <p class="mb-3">{{ $t('resetPasswordInfo') }}</p>
            </b-col>
            <b-col cols="12" md="8">
                <div class="border py-4 px-3">
                    <b-form @submit.prevent="sendRequest">
                        <h5 class="mb-3">メールアドレスの入力</h5>
                        <p class="mb-3">下記のフォームにメールアドレスと登録済みの確認項目を一つ選んで記入してください。ご登録のメールアドレスにパスワードの再設定画面のURLを記載したメールをお送りします。</p>
                        <b-alert variant="danger" :show="alert" dismissible>
                            {{ alert }}
                        </b-alert>
                        <div role="group" class="mb-3">
                            <label>{{ $t('email') }}</label>
                            <b-form-input v-model="email" placeholder="email" type="email" required></b-form-input>
                        </div>
                        <h5 class="mb-3">確認事項</h5>
                        <div class="font-weight-bold mb-2">パスワードリセットの方法を選択してください。</div>
                        <div class="mb-3">
                            <b-form-radio v-model="accountCheck" name="accountCheck" value="0">郵便番号</b-form-radio>
                            <div v-if="accountCheck == 0" class="ml-4">
                                <label>郵便番号を入力してください。</label>
                                <b-form-input v-model="zipCode" type="text"></b-form-input>
                            </div>
                        </div>
                        <div class="mb-3">
                            <b-form-radio v-model="accountCheck" name="accountCheck" value="1">生年月日</b-form-radio>
                            <div v-if="accountCheck == 1" class="ml-4">
                                <label>生年月日を入力してください。</label>
                                <b-form-input v-model="birthDate" type="date"></b-form-input>
                            </div>
                        </div>
                        <div class="mb-5">
                            <b-form-radio v-model="accountCheck" name="accountCheck" value="2">電話番号</b-form-radio>
                            <div v-if="accountCheck == 2" class="ml-4">
                                <label>電話番号を入力してください。</label>
                                <b-form-input v-model="phoneNumber" type="text"></b-form-input>
                            </div>
                        </div>
                        <b-button size="lg" variant="dark" squared type="submit">{{ $t('apply') }}</b-button>
                        <b-button size="lg" variant="outline-dark" squared type="button" @click="$router.push('/')">Topページへ</b-button>
                    </b-form>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import AuthAPI from '@/api/auth';
export default {
    layout: 'plain',
    layout (context) {
        return 'plain';
    },
    data() {
        return {
            email : "",
            accountCheck: 0,
            status: false,
            alert: null,
            zipCode: null,
            birthDate: null,
            phoneNumber: null,
            processing: false,
        }
    },
    methods: {
        async sendRequest() {
            this.processing = true
            try {
                const { data } = await AuthAPI.forgotPassword({ 
                    email: this.email
                }); 
                alert(data.message);
                if(data.success) {
                    this.$router.push('/auth/password/forgot-sent');
                }
            } catch (err) {
                console.log(err)
                this.processing = false
            }
        }
    }
}
</script>

<style>

</style>