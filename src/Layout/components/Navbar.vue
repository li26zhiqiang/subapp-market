<template>
    <el-menu class="navbar" mode="horizontal">
        <breadcrumb></breadcrumb>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';

export default {
    components: {
        Breadcrumb
    },
    computed: {
        ...mapGetters(['sidebar', 'avatar'])
    },
    methods: {}
};
</script>

<style lang="less" scoped>
.navbar {
    height: 32px;
    line-height: 32px;
    border-radius: 0px !important;
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }

    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;

        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }

            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
