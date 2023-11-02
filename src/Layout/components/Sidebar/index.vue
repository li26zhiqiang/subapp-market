<template>
    <div class="accordion-menu-container">
        <div class="top">
            <svg-icon :icon-class="'dashboard'"></svg-icon>
            <div class="app-title">用户管理</div>
        </div>

        <div class="center">
            <el-menu
                mode="vertical"
                :unique-opened="true"
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapse"
            >
                <sidebar-item :routes="routes"></sidebar-item>
            </el-menu>
        </div>

        <div class="bottom" @click="toggleSideBar">
            <el-icon v-if="sidebar.opened"><ElIconFold /></el-icon>
            <el-icon v-else><ElIconExpand /></el-icon>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem.vue';
import './index.less';

export default {
    components: {
        SidebarItem
    },
    computed: {
        ...mapGetters(['sidebar', 'routers']),
        routes() {
            return this.routers;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    methods: {
        toggleSideBar() {
            // this.$store.dispatch('ToggleSideBar');
        }
    }
};
</script>
