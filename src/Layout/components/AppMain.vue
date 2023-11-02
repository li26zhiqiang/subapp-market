<template>
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </section>
</template>

<script>
export default {
    name: 'AppMain'
};
</script>
