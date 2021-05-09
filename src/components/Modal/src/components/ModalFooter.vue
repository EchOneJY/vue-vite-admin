<template>
  <div>
    <slot name="insertFooter"></slot>
    <Button v-bind="cancelButtonProps" @click="handleCancel" v-if="showCancelBtn">
      {{ cancelText }}
    </Button>
    <slot name="centerFooter"></slot>
    <Button
      :type="okType"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      v-if="showOkBtn"
    >
      {{ okText }}
    </Button>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Button } from 'ant-design-vue'

  import { basicProps } from '../props'
  export default defineComponent({
    name: 'BasicModalFooter',
    components: { Button },
    props: basicProps,
    emits: ['ok', 'cancel'],
    setup(_, { emit }) {
      function handleOk() {
        emit('ok')
      }

      function handleCancel() {
        emit('cancel')
      }
      return { handleOk, handleCancel }
    },
  })
</script>
