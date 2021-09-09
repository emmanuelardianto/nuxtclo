<template>
    <div class="container">
        <b-row>
            <b-col cols="12">
                <h1 class="mb-3">{{ $t('resetPassword') }}</h1>
                <p class="mb-3">ユニクロ、ジーユーオンラインストアのパスワードが変更になります。</p>
            </b-col>
            <b-col cols="12" md="8">
                <div class="border py-4 px-3">
                    <h5>確認メールの送信を完了いたしました。</h5>
                    <p>ご登録されているメールアドレスに、確認メールをお送りしました。メールに記載されているURLをクリックして再設定を進めてください。</p>
                    <p>お受け取りいただいたメールの説明をご確認の上、2時間以内にパスワード再設定のお手続きをしてください。</p>
                    <b-button size="lg" variant="dark" squared @click="$router.push('/')">お買い物を続ける</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    layout: 'plain',
    layout (context) {
        return 'plain';
    },
}
</script>

<style>

</style>