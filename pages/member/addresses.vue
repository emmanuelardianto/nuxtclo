<template>
  <b-container>
      <BaseBreadcrumb class="mb-5" />
      <b-row>
          <b-col cols="3">
              <FrontMemberMenu name="address" />
          </b-col>
          <b-col cols="9">
              <h1>アドレス帳</h1>
              <div class="border px-4 py-4 mb-4">
                  <h5 class="mb-3">会員住所</h5>
                  <div class="font-weight-bold">Ｓｉｔｉｎｊａｋ Ｅｍｍａｎｕｅｌ (シチンジャク エマニュエル) (会員住所)</div>
                  <p>〒187-0001<br />東京都荒川区東日暮里１－３－１４０４号パークウェル三ノ輪駅前<br />08035032875</p>
                  <a href="#">会員情報の変更</a> | <a href="#">現在のお届け先</a>
              </div>
              <div class="border px-4 py-4">
                  <div v-if="addresses && addresses.length > 0" class="pb-3">
                      <div v-for="address in addresses" :key="address.id">
                          <div class="font-weight-bold">Ｓｉｔｉｎｊａｋ Ｅｍｍａｎｕｅｌ (シチンジャク エマニュエル) (会員住所)</div>
                            <p>〒187-0001<br />東京都荒川区東日暮里１－３－１４０４号パークウェル三ノ輪駅前<br />08035032875</p>
                            <a href="#">会員情報の変更</a> | <a href="#">現在のお届け先</a>
                      </div>
                  </div>
                  <div v-else>
                    <h5 class="mb-3">お届け先</h5>
                    <p>最大で10件のお届け先を登録できます。</p>
                    <div class="border-bottom my-3"></div>
                    <p>お届け先住所が登録されていません</p>
                  </div>
                  <b-button variant="dark" squared v-b-modal.form-modal>新しいお届け先を登録</b-button>
              </div>
          </b-col>
      </b-row>
      <b-modal id="form-modal" title="新しいお届け先を登録" scrollable>
          <b-row>
              <b-col cols="12" class="mb-3">入力された配送先の郵便番号や住所に誤りがあると配送の遅れ・キャンセルにつながります。今一度ご確認ください。</b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('last_name') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('first_name') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('last_name_kana') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('first_name_kana') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="7" class="form-group mb-3">
                <label for="name">{{ $t('zip_code') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="5" class="form-group mb-3 pt-2">
                <label for="name">&nbsp;</label><br />
                <a href="#">郵便番号から住所入力</a>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('prefecture') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('city') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('address1') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('address2') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('phone') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
              <b-col cols="12" class="form-group mb-3">
                <label for="name">{{ $t('mobile_phone') }}</label>
                <b-form-input v-model.trim="$v.name.$model"></b-form-input>
                <span class="text-danger" ></span>
              </b-col>
          </b-row>
          <template #modal-footer="{ ok, cancel }">
              <b-button block variant="dark" squared @click="ok()">保存</b-button>
              <b-button block variant="light" squared @click="cancel()">キャンセル</b-button>
          </template>
      </b-modal>
  </b-container>
</template>

<script>
import AddressAPI from '@/api/address';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
    layout: 'default',
    layout (context) {
        return 'default';
    },
    middleware: ['auth'],
    data() {
        return {
            user: null,
            addresses: [],
            isLoading: false,

        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                this.isLoading = true;
                const { data } = await AddressAPI.getList({ 
                    user_id: this.$auth.user.id
                }); 
                this.addresses = data.data;
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>