<template>
  <div class="checkbox privacy-confirm">
    <input
      id="data_processing_consent"
      v-model="isConfirmed"
      class="checkbox__input privacy-confirm__input"
      type="checkbox"
    >
    <label
      class="checkbox__label privacy-confirm__label"
      for="data_processing_consent"
    >
          <span>
            Регистрируясь, ты соглашаешься с нашей<br>
            <RouterLink to="/privacy" class="checkbox__link">
              Политикой конфиденциальности
            </RouterLink>
          </span>
    </label>
    <ErrorMessage :errorInstance="v$"/>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import ErrorMessage from '@/components/base/ErrorMessage'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default defineComponent({
  name: 'PrivacyConfirm',
  components: { ErrorMessage },
  props: {
    modelValue: Boolean
  },
  setup (props, { emit }) {
    const isConfirmed = computed({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val)
    })

    // валидация
    const validationRules = computed(() => ({
      required: helpers.withMessage('Необходимо согласие', required)
    }))
    const v$ = useVuelidate(validationRules, isConfirmed)

    return {
      isConfirmed,
      v$
    }
  }
})
</script>

<style scoped>

</style>
