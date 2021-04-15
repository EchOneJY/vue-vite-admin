import { useAppProviderContext } from '/@/components/AppProvider/useAppContext'

export function useDesign(scope: string) {
  const values = useAppProviderContext()
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  }
}
