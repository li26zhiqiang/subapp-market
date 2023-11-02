<template>
  <div class="general-page-container" :class="classObj">
    <aside class="left sidebar-container">
      <sidebar></sidebar>
    </aside>

    <main class="right main-container">
      <navbar></navbar>
      <app-main></app-main>
    </main>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components';
import './index.less';

export default {
    name: 'layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    computed: {
        // sidebar() {
        //   console.log("111333", this)
        //     return this.$store.state.app.sidebar;
        // },
        // device() {
        //     return this.$store.state.app.device;
        // },
        // classObj() {
        //     return {
        //         hideSidebar: !this.sidebar.opened,
        //         withoutAnimation: this.sidebar.withoutAnimation,
        //         mobile: this.device === 'mobile'
        //     };
        // }
    }
};
</script>
