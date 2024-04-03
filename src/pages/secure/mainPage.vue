<!-- https://www.bootdey.com/snippets/view/bs4-Profile-with-dashboard -->
<template>
    <div class="content">
        <div class="">
            <!-- navigation bar -->
            <div class="row">
                <div class="col-12">
                    <!-- meta -->
                    <header class="header fixed-top bg-white shadow align-self-end py-1 px-xl-5 w-100">
                        <nav class="navbar navbar-expand-sm">
                            <div class="container-fluid">
                                <img src="@/assets/terra.svg" alt="" width="50" height="65">
                                <h5>HELP Carbon Emission Application</h5>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                                    <ul class="navbar-nav me-2">
                                        <li class="nav-item">
                                            <a class="nav-link">
                                                <router-link to="/main/dashboard">Dashboard</router-link>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link">
                                                <router-link to="/main/events">Events</router-link>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link">
                                                <router-link to="/main/bulletins">Bulletins</router-link>
                                            </a>
                                        </li>                
                                        <li class="nav-item">
                                            <a class="nav-link">
                                                <router-link to="/main/calculator">Emission</router-link>
                                            </a>
                                        </li>                
                                        <li class="nav-item">
                                            <a class="nav-link">
                                                <router-link to="/main/profile">Profile</router-link>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link">
                                                <router-link to="/main/resources">Links</router-link>
                                            </a>
                                        </li>
                                        <li class="nav-item d-flex align-items-center">
                                            <button class="btn btn-danger btn-sm" @click="logout()">Logout</button>
                                        </li>               
                                    </ul>
                                </div>
                                <div>
                                    <span>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" id="thememode" @change="toggleTheme"/>
                                            <label class="form-check-label" for="thememode">mode</label>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </nav>
                    </header>
                    <!--/ meta -->
                </div>
            </div>
            <!-- page contents-->
            <div class="row">
                <!-- left pane-->
                <div class="col-12 col-xl-8 p-1">
                    <div class="row pt-2">
                        <!-- https://router.vuejs.org/guide/advanced/transitions.html -->
                        <router-view v-slot="{ Component, route }">
                            <transition name="page">
                                <div :key="route.name">
                                    <component :is="Component"></component>
                                </div>
                            </transition>
                        </router-view>                     
                       
                        <!-- <router-view></router-view> -->
                    </div>
                </div>
                
                <!-- right pane -->
                <div class="col-12 col-xl-4 p-5">
                    <!-- Personal Info Component -->
                    <div class="card card-box ribbon-box border border-warning border-1">
                        <div class="ribbon ribbon-primary">Personal Profile</div>
                        <div class="clearfix"></div>
                        <profile-component :model="user"></profile-component>
                    </div>
                    <!-- Leaderboard component -->
                    <div class="card card-box ribbon-box border border-warning border-1">
                        <div class="ribbon ribbon-primary">Top 10 Submissions</div>
                        <div class="clearfix"></div>
                        <leaderboard-component></leaderboard-component>
                    </div>
                </div>
            </div>

            <footer class="footer fixed-bottom mt-auto py-3 bg-light" v-if="deferredPrompt">
                <div class="container text-center">
                    <button type="button" class="btn btn-danger" @click="installApp">Install on your device</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'

    import { useUserStore } from '@/stores/UserStore'

    import ProfileComponent from '@/components/ProfileComponent.vue'
    import LeaderboardComponent from '@/components/LeaderboardComponent.vue'

    const router = useRouter();
    const toast = useToast()

    const userStore = useUserStore()
    const user = ref({})

    // --- 0. theming 
    const isLightTheme = ref() 
    function toggleTheme() {
        isLightTheme.value = isLightTheme.value == 1 ? 0 : 1
    }
    watch(isLightTheme, (n, o) => {
        document.documentElement.setAttribute("data-bs-theme", n == 1 ? 'dark' : 'light')
        localStorage.setItem('carbon-app-isLightTheme', isLightTheme.value)
    })


    // --- 1. pwa installation prompt
    const deferredPrompt = ref(null)
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt.value = e;
    });
    async function installApp() {
        deferredPrompt.value.prompt()
        deferredPrompt.value = null
    }

    

    function logout() {
        localStorage.clear();
        userStore.user = null;
        toast.warning("Logging you out!");

        router.push('/landing');
    }

    onMounted(() => {
        user.value = userStore.getUser || {}

        //
        isLightTheme.value = localStorage.getItem("carbon-app-isLightTheme") ?? 1;
    })
</script>

<style scoped>
    .nav-link {
        font-size: 1.12rem;
    }
</style>