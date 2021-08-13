<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef" v-show="getShow">
    <FormItem name="account" class="enter-x">
      <Input size="large" v-model:value="formData.account" placeholder="账号" />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="密码"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small"> 记住我 </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            忘记密码?
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        登录
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        注册
      </Button> -->
    </FormItem>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue'

  import { Checkbox, Form, Input, Row, Col, Button } from 'ant-design-vue'
  import LoginFormTitle from './LoginFormTitle.vue'

  import { useMessage } from '/@/hooks/web/useMessage'

  import { useUserStore } from '/@/store/modules/user'
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { onKeyStroke } from '@vueuse/core'

  export default defineComponent({
    name: 'LoginForm',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Checkbox,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      LoginFormTitle,
      InputPassword: Input.Password,
    },
    setup() {
      const userStore = useUserStore()
      const { notification } = useMessage()
      const { prefixCls } = useDesign('login')

      const { setLoginState, getLoginState } = useLoginState()
      const { getFormRules } = useFormRules()

      const formRef = ref()
      const loading = ref(false)
      const rememberMe = ref(false)

      const formData = reactive({
        account: 'admin',
        password: '123456',
      })

      const { validForm } = useFormValid(formRef)

      onKeyStroke('Enter', handleLogin)

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

      async function handleLogin() {
        const data = await validForm()
        if (!data) return
        try {
          loading.value = true
          const userInfo = await userStore.login(
            toRaw({
              password: data.password,
              username: data.account,
            })
          )
          if (userInfo) {
            notification.success({
              message: '登录成功',
              description: `欢迎回来: ${userInfo.realName}`,
              duration: 3,
            })
          }
        } finally {
          loading.value = false
        }
      }

      return {
        prefixCls,
        formRef,
        formData,
        getFormRules,
        rememberMe,
        handleLogin,
        loading,
        setLoginState,
        LoginStateEnum,
        getShow,
      }
    },
  })
</script>
