<template>
  <div
    :class="['field', {
      'field--dirty': !!inputValue,
      'field--focused': isFocused
    }]"
  >
    <label class="field__label" :for="id">{{ label }}</label>
    <input
      v-model="inputValue"
      :id="id"
      class="field__input"
      type="text"
      :placeholder="placeholder"
      @focus="isFocused = true"
      @blur="v$.$touch(); isFocused = false"
    >
    <ErrorMessage :errorInstance="v$"/>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { email, helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import ErrorMessage from '@/components/base/ErrorMessage'

export default defineComponent({
  name: 'TextInput',
  components: { ErrorMessage },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'ФИО'
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  setup (props, { emit }) {
    const isFocused = ref(false)
    const inputValue = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })

    // валидация
    const baseRules = { required: helpers.withMessage('Обязательное поле', required) }
    if (props.type === 'email') baseRules.email = helpers.withMessage('Некорректный адрес', email)
    const validationRules = computed(() => (baseRules))
    const v$ = useVuelidate(validationRules, inputValue)

    return {
      isFocused,
      inputValue,
      v$
    }
  }
})
</script>
