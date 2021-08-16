import { computed } from 'vue'
import { useAppStore } from '/@/store/modules/app'
import { HeaderSetting } from '/#/config'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getHeaderShow = computed(() => appStore.getHeaderSetting.show)

  const getShowDoc = computed(() => appStore.getHeaderSetting.showDoc)

  function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
    appStore.setProjectConfig({ headerSetting })
  }

  return {
    getHeaderShow,
    getShowDoc,
    setHeaderSetting,
  }
}
