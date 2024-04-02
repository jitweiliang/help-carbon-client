import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import LandingPage    from '@/pages/public/Landing.vue'
import IntroPage      from '@/pages/public/Intro.vue'
import LoginPage      from '@/pages/public/Login.vue'
import DetailPage     from '@/pages/public/Details.vue'
import ResourcesPage  from '@/pages/public/Resources.vue'

import ResultPage     from '@/pages/public/ResultPage.vue'

import MainPage       from '@/pages/secure/mainPage.vue'
import DashBoardPage  from '@/pages/secure/dashboard/dashBoardPage.vue'
import ProfilePage    from '@/pages/secure/ProfilePage.vue'
import BulletinPage   from '@/pages/secure/BulletinPage.vue'
import EventsPage     from '@/pages/secure/EventsPage.vue'
import CalculatorPage from '@/pages/secure/CalculatorPage.vue'
import ResourcePage   from '@/pages/secure/ResourcePage.vue'

import{ useUserStore } from '@/stores/UserStore'


const routes = [
    // -- Public Access
    {
        path: '/',
        redirect: '/landing'
    },
    {
        path: '/landing',
        component: LandingPage,
        children: [
            {
                path: '',
                components: {
                    leftView: IntroPage,
                    rightView: LoginPage,
                    detailsView: DetailPage,
                    resourceView: ResourcesPage
                }
            }            
        ]
    },
    {
        path: '/result',
        name: 'Result',
        component: ResultPage
    },
    // -- Secure Acess
    {
        path: '/main',
        name: 'MainPage',
        component: MainPage,
        children: [
            {
                path: '/main',
                redirect: 'main/dashboard'
            },
            {
                path: '/main/dashboard',
                name: 'Dashboard',
                component: DashBoardPage
            },
            {
                path: '/main/profile',
                name: 'Profile',
                component: ProfilePage
            },
            {
                path: '/main/bulletins',
                name: 'Bulletin',
                component: BulletinPage
            },
            {
                path: '/main/events',
                name: 'Events',
                component: EventsPage
            },
            {
                path: '/main/calculator',
                name: 'Calculator',
                component: CalculatorPage
            },
            {
                path: '/main/resources',
                name: 'Resources',
                component: ResourcePage
            }
        ]
    }
];

// --- prepare user store

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})


// -- navigation guard
router.beforeEach((to, from) => {
    const userStore = useUserStore()

    if(to.fullPath.match('/main')) {
        if(!userStore.getUser) {
            router.push('/landing')
        }
    }

    return true
})


  export default router;