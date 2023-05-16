<template>
<!--  <template v-if="validatedProperty && nestedValidatedProperty">-->
<!--    <div class="input-block__error-message"-->
<!--         v-for="error in errorInstance[validatedProperty][nestedValidatedProperty].$errors"-->
<!--         :key="error.$uid">-->
<!--      {{ error.$message }}-->
<!--    </div>-->
<!--  </template>-->
  <template v-if="validatedProperty">
    <div class="field__error-message">
      {{ errorInstance[validatedProperty]?.$errors[0]?.$message }}
    </div>
  </template>
  <template v-else>
    <div class="field__error-message">
      {{ errorInstance.$errors[0]?.$message }}
    </div>
  </template>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorMessage',
  props: {
    errorInstance: Object,
    validatedProperty: String,
    nestedValidatedProperty: String,
    position: {
      type: String,
      default: 'absolute'
    }
  }
})
</script>

<style scoped>

</style>
