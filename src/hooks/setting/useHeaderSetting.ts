import { computed } from 'vue'
import { useAppStore } from '/@/store/modules/app'
import { HeaderSetting } from '/#/config'

export function useHeaderSetting() {
  const appStore = useAppStore()
  const getHeaderShow = computed(() => appStore.getHeaderSetting.show)

  function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
    appStore.setProjectConfig({ headerSetting })
  }

  return {
    getHeaderShow,
    setHeaderSetting,
  }
}
