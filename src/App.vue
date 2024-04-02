<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup>
    // ---- testing only - consider user already logged in --- //
    //import { useUserStore } from '@/stores/UserStore'
    // const userStore = useUserStore()
    // userStore.mockLogin()
</script>

<style>
</style>