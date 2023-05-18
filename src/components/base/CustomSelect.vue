<template>
  <div
    :class="['custom-select', { 'custom-select--opened': selectIsOpened }]"
    ref="selectRef"
    @click="selectIsOpened = !selectIsOpened"
  >
    <div class="custom-select__wrapper">
      <div class="custom-select__current-option">
        {{ selectedOption }}
      </div>
      <div
        v-if="selectIsOpened"
        class="custom-select__list"
      >
        <div
          v-for="option in options"
          :key="'payment-option-key-' + option.id"
          class="custom-select__item">
          <input
            :id="option.id"
            v-model="selectValue"
            class="custom-select__input"
            type="radio"
          />
          <label
            :for="option.id"
            class="custom-select__label"
          > {{ option.name }} </label>
        </div>
      </div>
    </div>
    <ErrorMessage :errorInstance="v$"/>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import ErrorMessage from '@/components/base/ErrorMessage'

export default defineComponent({
  name: 'CustomSelect',
  components: { ErrorMessage },
  props: {
    modelValue: [Number, String],
    options: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const selectValue = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })
    const selectRef = ref()
    const selectIsOpened = ref(false)
    const selectedOption = computed(() => props.options
      .filter(item => item.value === selectValue.value)[0].name)

    // валидация
    const validationRules = computed(() => ({
      required: helpers.withMessage('Выберите один из вариантов', required)
    }))
    const v$ = useVuelidate(validationRules, selectValue)

    onMounted(() => {
      document.body.addEventListener('click', e => {
        if (selectRef.value === e.target || selectRef.value.contains(e.target)) {
          console.log(selectRef.value.contains(e.target))
        } else selectIsOpened.value = false
      })
    })

    return {
      selectValue,
      selectRef,
      selectIsOpened,
      selectedOption,
      v$
    }
  }
})
</script>

<style scoped>

</style>
