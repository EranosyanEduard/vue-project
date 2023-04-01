<script lang="ts">
  import { AllStores, RouteName, router, useStore } from '@/plugins'
  import is from 'relax-is'
  import { reactive, ref } from 'vue'

  /**
   * Название компонента.
   * @constant
   */
  export const name = 'V_SIGN_IN'

  export default {
    name,
    setup() {
      const {
        VITE_APP_MODE = 'DEV',
        VITE_DEFAULT_PASSWORD = '[7wjw8,D',
        VITE_DEFAULT_USERNAME = 'web@stack-it.ru'
      } = import.meta.env

      const credentials = reactive(
        VITE_APP_MODE === 'DEV'
          ? { password: VITE_DEFAULT_PASSWORD, username: VITE_DEFAULT_USERNAME }
          : { password: '', username: '' }
      )
      const isValid = ref(false)

      const submitButtonLoading = ref(false)
      const submitError = ref('')

      const onsubmit = async (): Promise<void> => {
        const { auth } = useStore(AllStores.auth)
        submitButtonLoading.value = true

        try {
          await auth.signIn({ recaptchaToken: '', ...credentials })
          await router.push({ name: RouteName.V_MY_CONTRACTS })
        } catch (error: unknown) {
          submitError.value = is.str(error) ? error : 'Неожиданная ошибка'
        } finally {
          submitButtonLoading.value = false
        }
      }

      return {
        credentials,
        isValid,
        name,
        RouteName,
        submitButtonLoading,
        submitError,
        onsubmit
      }
    }
  }
</script>

<template lang="pug">
v-form(v-model='isValid', :data-vue-view='name', @submit.prevent='onsubmit')
  fieldset.form__fieldset
    legend.mb-6.text-h6 Войдите в личный кабинет
    x-field-box(label='Логин')
      template(#default='{ pickRules, props }')
        v-text-field(
          v-bind='props',
          v-model='credentials.username',
          :rules='pickRules("isRequired")'
        )
    x-field-box(label='Пароль')
      template(#default='{ pickRules, props }')
        v-text-field(
          v-bind='props',
          v-model='credentials.password',
          :rules='pickRules("isRequired")'
        )
    router-link.font-weight-regular.text-2--text.text-button(:to='{ name: RouteName.V_SIGN_UP }') Забыли пароль?
    span.error--text.text-caption {{ submitError }}
    v-btn.mb-6(
      type='submit',
      color='primary',
      depressed,
      :disabled='!isValid',
      :loading='submitButtonLoading'
    ) Войти
    router-link.form__reference.font-weight-regular.text-button.text-center.text-decoration-none(
      :to='{ name: RouteName.V_SIGN_UP }'
    ) Подать заявку на регистрацию
</template>

<style src="./SignIn.scss"></style>
