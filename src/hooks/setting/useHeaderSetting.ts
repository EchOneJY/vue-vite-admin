import { computed } from 'vue'
import { appStore } from '/@/store/modules/app'
import { HeaderSetting } from '/#/config'

export function useHeaderSetting() {
  const getHeaderShow = computed(() => appStore.getHeaderSetting.show)

  function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
    appStore.commitProjectConfig({ headerSetting })
  }

  return {
    getHeaderShow,
    setHeaderSetting,
  }
}
