import Vue from 'vue'
import store from '@/store'

/**
 * 自定义页面权限指令
 * @type {DirectiveOptions}
 */
const permission = Vue.directive('permission', {
  bind: function(el, binding, vnode) {
    let values = binding.value.split(',')
    let roles = store.getters.roles
    if (!check(values, roles)) {
      el.remove()
    }
  }
})

/**
 * 检查权限函数
 * @param values v-permission的值
 * @param roles 当前用户的权限
 * @returns {boolean}
 */
function check(values, roles) {
  for (var index1 in values) {
    for (var index2 in roles) {
      if (roles[index2] == values[index1]) {
        return true
      }
    }
  }
  return false
}

export default { permission }
