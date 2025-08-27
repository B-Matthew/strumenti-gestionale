// composables/useModal.js
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isAnyModalOpen = ref(false)
const modalCount = ref(0)
let originalScrollbarWidth = 0

// Calcola la larghezza della scrollbar per evitare il layout shift
function getScrollbarWidth() {
  if (typeof window === 'undefined') return 0
  
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  outer.style.msOverflowStyle = 'scrollbar'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
  outer.parentNode.removeChild(outer)

  return scrollbarWidth
}

// Blocca/sblocca lo scroll del body
function toggleBodyScroll(block) {
  if (typeof window === 'undefined') return

  const body = document.body
  
  
  
  if (block) {
    // Salva la larghezza della scrollbar
    originalScrollbarWidth = getScrollbarWidth()
    
    // Blocca lo scroll e compensa la scrollbar nascosta
    body.style.overflow = 'hidden'
    body.style.paddingRight = `${originalScrollbarWidth}px`
  } else {
    // Ripristina lo scroll
    body.style.overflow = ''
    body.style.paddingRight = ''
  }
}

export function useModal() {
  const isOpen = ref(false)

  const openModal = () => {
    isOpen.value = true
    modalCount.value++
    
    if (modalCount.value === 1) {
      isAnyModalOpen.value = true
      toggleBodyScroll(true)
    }
  }

  const closeModal = () => {
    if (isOpen.value) {
      isOpen.value = false
      modalCount.value = Math.max(0, modalCount.value - 1)
      
      if (modalCount.value === 0) {
        isAnyModalOpen.value = false
        toggleBodyScroll(false)
      }
    }
  }

  // Cleanup automatico quando il componente viene smontato
  onUnmounted(() => {
    if (isOpen.value) {
      closeModal()
    }
  })

  return {
    isOpen,
    openModal,
    closeModal,
    isAnyModalOpen
  }
}