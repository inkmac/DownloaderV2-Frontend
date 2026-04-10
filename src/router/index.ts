import { createRouter, createWebHashHistory } from 'vue-router'
import DownloadPage from "@/views/DownloadPage.vue";
import GetCookiePage from "@/views/GetCookiePage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/download'
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadPage
    },
    {
      path: '/get-cookie',
      name: 'get-cookie',
      component: GetCookiePage
    },
  ],
})

export default router
