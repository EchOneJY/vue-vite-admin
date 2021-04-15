import type { ProjectConfig } from '/@/types/config'

const setting: ProjectConfig = {
  showSettingButton: false,

  // Header configuration
  headerSetting: {
    // header bg color
    bgColor: '#ffffff',
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the document button
  },

  // Menu configuration
  menuSetting: {
    // sidebar menu bg color
    bgColor: '#001529',
    //  Whether to fix the left menu
    fixed: true,
    // Whether to show no dom
    show: true,
    // Menu collapse
    collapsed: false,
    // Menu width
    menuWidth: 210,
    // Fold trigger position
    trigger: 'top',
  },
}

export default setting
