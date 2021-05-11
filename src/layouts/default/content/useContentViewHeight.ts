import { ref, computed, unref } from 'vue'
import { createPageContext } from '/@/hooks/component/usePageContext'
import { useWindowSize } from '/@/hooks/event/useWindowSize'
export const headerHeightRef = ref(0)

export function useContentViewHeight() {
  const contentHeight = ref(window.innerHeight)
  const pageHeight = ref(window.innerHeight)
  const getViewHeight = computed(() => {
    return unref(contentHeight) - unref(headerHeightRef) || 0
  })

  useWindowSize(
    () => {
      contentHeight.value = window.innerHeight
    },
    100,
    { immediate: true }
  )

  async function setPageHeight(height: number) {
    pageHeight.value = height
  }

  createPageContext({
    contentHeight: getViewHeight,
    setPageHeight,
    pageHeight,
  })
}
