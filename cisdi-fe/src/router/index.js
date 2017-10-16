import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/content/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/content',
      name: 'content',
      component: Content
    }
  ]
})
