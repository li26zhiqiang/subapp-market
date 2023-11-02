import { createRouter, createWebHashHistory } from 'vue-router';

/* Layout */

/**
 * hidden: true
 * alwaysShow: true
 * redirect: noredirect
 * name:'router-name'
 * meta : {
    title: 'title'
    icon: 'svg-name'
  }
 **/
export const constantRouterMap = [
    { path: '/', redirect: '/account/management' },
];

const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: constantRouterMap, // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        top: 0
    })
});

export default router;
