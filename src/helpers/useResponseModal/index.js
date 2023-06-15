import { ref } from 'vue'
import { useStore } from 'vuex'

const useResponseModal = (successText, failedText) => {
  const store = useStore()
  const responseMessage = ref('')
  const messageModalIsShown = ref(false)
  const dataSending = ref(false)

  const sendData = async (methodName, payload) => {
    console.log(payload)
    messageModalIsShown.value = true
    dataSending.value = true
    const response = await store.dispatch(methodName, payload)
    if (response.success) {
      console.log('here')
      responseMessage.value = successText
    } else {
      responseMessage.value = failedText
    }
    dataSending.value = false
  }

  return {
    messageModalIsShown,
    responseMessage,
    dataSending,
    sendData
  }
}

export { useResponseModal }
