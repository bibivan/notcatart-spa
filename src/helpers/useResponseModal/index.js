import { ref } from 'vue'

const useResponseModal = () => {
  return {
    responseMessage: ref(''),
    messageModalIsShown: ref(false),
    dataSending: ref(false)
  }
}

export { useResponseModal }
