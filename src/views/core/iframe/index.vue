<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <Spin :spinning="loading" size="large" :style="getWrapStyle">
      <iframe :src="frameSrc" :class="`${prefixCls}__main`" ref="frameRef"></iframe>
    </Spin>
  </div>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue'
  import { defineComponent, ref, unref, onMounted, nextTick, computed } from 'vue'
  import { Spin } from 'ant-design-vue'

  import { getViewportOffset } from '/@/utils/dom'

  import { useWindowSize } from '/@/hooks/event/useWindowSize'

  import { propTypes } from '/@/utils/propTypes'
  import { useDesign } from '/@/hooks/web/useDesign'

  export default defineComponent({
    name: 'IFrame',
    components: { Spin },
    props: {
      frameSrc: propTypes.string.def(''),
    },
    setup(props) {
      const loading = ref(false)
      const topRef = ref(50)
      const heightRef = ref(window.innerHeight)
      const frameRef = ref<HTMLFrameElement | null>(null)

      const { prefixCls } = useDesign('iframe-page')
      useWindowSize(calcHeight, 150, { immediate: true })

      const getWrapStyle = computed(
        (): CSSProperties => {
          return {
            height: `${unref(heightRef)}px`,
          }
        }
      )

      function calcHeight() {
        const iframe = unref(frameRef)
        if (!iframe) {
          return
        }
        let { top } = getViewportOffset(iframe)
        top += 20
        topRef.value = top
        heightRef.value = window.innerHeight - top
        const clientHeight = document.documentElement.clientHeight - top
        iframe.style.height = `${clientHeight}px`
      }

      function hideLoading() {
        loading.value = false
        calcHeight()
      }

      function init() {
        nextTick(() => {
          const iframe = unref(frameRef)
          if (!iframe) return

          console.log(iframe)
          console.log(props.frameSrc)

          const _frame = iframe as any
          if (_frame.attachEvent) {
            _frame.attachEvent('onload', () => {
              hideLoading()
            })
          } else {
            iframe.onload = () => {
              hideLoading()
            }
          }
        })
      }
      onMounted(() => {
        loading.value = true
        init()
      })

      return {
        getWrapStyle,
        loading,
        frameRef,
        prefixCls,
      }
    },
  })
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-iframe-page';

  .@{prefix-cls} {
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;

      .ant-spin-container {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
    }

    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: @component-background;
      border: 0;
      box-sizing: border-box;
    }
  }
</style>
