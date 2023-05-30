<template>
  <div class="message-modal" @click="onCloseModal">
    <div v-if="dataSending" class="spinner"></div>
    <div v-else class="message-modal__dialog">
      <div class="message-modal__text text">{{ message }}</div>
      <button class="message-modal__btn btn" @click="$emit('closeModal')">Закрыть</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageModal',
  props: {
    message: String,
    dataSending: Boolean
  },
  setup (props, { emit }) {
    const onCloseModal = event => {
      if (event.target.classList.contains('message-modal__dialog')) return
      emit('closeModal')
    }

    return { onCloseModal }
  }
})
</script>

<style scoped>

</style>
