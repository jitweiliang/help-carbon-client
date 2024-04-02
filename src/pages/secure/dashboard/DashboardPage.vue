<!-- 
    https://jbaysolutions.github.io/vue-grid-layout/guide/08-responsive-predefined-layouts.html
    https://github.com/jbaysolutions/vue-grid-layout/blob/master/website/docs/.vuepress/components/Example08ResponsivePredefinedLayouts.vue 
-->

<template>
    <div class="pt-4">
        <div class="row">
            <header class="header bg-white shadow align-self-end py-1 px-xl-5 w-100">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start fw-bold ribbon-box">
                            <p class="ribbon-big ribbon-primary">Dashboard</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div class="my-2 py-2 p-2">
            <div class="row">
                <div class="col-sm-4">
                    <user-widget :params="userWidgetData"></user-widget>
                </div>
                <div class="col-sm-4">
                    <avg-emission-widget :params="emissionWidgetData"></avg-emission-widget> 
                </div>
                <div class="col-sm-4">
                    <activity-widget :params="activityWidgetData"></activity-widget>
                </div>
            </div>

            <!-- <smart-widget-grid ref="smartGrid" :layout="layout" :col-num=2 :responsive="true" :auto-size="true" :prevent-collison="true" :resizable="false">   -->
            <div style="width: 100%;height: 100%;" class=" border border-success border-5">
                <smart-widget-grid ref="smartGrid" :layout="layout" :col-num="2" :is-resizable="false" :responsive="true" :auto-size="true">  
                <template #0>
                    <smart-widget title="" sub-title="Drag on me" class="border border-1">
                        <chart-history-widget></chart-history-widget>
                    </smart-widget>
                </template>
                <template #1>
                    <smart-widget title="" sub-title="Drag on me" class="border border-1">
                        <div class="layout-center">
                            <reminder-widget></reminder-widget>
                        </div>
                    </smart-widget>
                </template>
                <template #2>
                    <smart-widget title="" sub-title="Drag on me" class="border border-1">
                        <div class="layout-center">
                            <chart-category-widget></chart-category-widget>
                        </div>
                    </smart-widget>
                </template>
                <!-- <template #3>
                    <smart-widget simple class="border border-1">
                        <div class="layout-center">
                            <h4 class="card-title">Widfer 3</h4>
                            <p class="card-text">Some quick example text to build on the card title</p>
                        </div>
                    </smart-widget>
                </template> -->
            </smart-widget-grid>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    import UserWidget     from '@/pages/secure/dashboard/widgets/UserWidget.vue'
    import AvgEmissionWidget from '@/pages/secure/dashboard/widgets/AvgEmissionWidget.vue'
    import ReminderWidget from '@/pages/secure/dashboard/widgets/ReminderWidget.vue'
    import ActivityWidget from '@/pages/secure/dashboard/widgets/ActivityWidget.vue'

    import ChartHistoryWidget   from '@/pages/secure/dashboard/widgets/ChartHistoryWidget.vue'
    import ChartCategoryWidget  from '@/pages/secure/dashboard/widgets/ChartCategoryWidget.vue'


    import { useUserStore }     from '@/stores/UserStore'
    import { useEmissionStore } from '@/stores/EmissionStore'


    // 0. -- smart widget layout configurations
    const smartGrid = ref(null)
    const layout = ref([
        { x: 0, y: 0,  w: 12, h: 9, i: "0" }, 
        { x: 0, y: 9,  w: 5,  h: 7, i: "1" }, 
        { x: 5, y: 9,  w: 5,  h: 7, i: "2" },
        // { x: 0, y: 16, w: 12, h: 8, i: "3" },
    ])


    const user = ref()
    const userStore = useUserStore()
    const emissionStore = useEmissionStore()


    // populate top widgets ================================ //
    // 1. -- user widget
    const userWidgetData = ref({})
    const emissionWidgetData = ref({})
    const activityWidgetData = ref({})

    async function loadUserWidgetData() {
        await userStore.retrieveUserSummary()
        userWidgetData.value = userStore.getSummary
    }
    // 2. -- activity widget
    async function loadActivityWidgetData() {
        debugger;
        await userStore.retrieveUserActivities(user.value.userId)
        activityWidgetData.value = userStore.getActivities
    }
    // 3. -- emission widget
    async function loadEmissionWidgetData() {
        await emissionStore.retrieveUserAverageEmission(user.value.userId)
        emissionWidgetData.value = emissionStore.getAverages
    }


    // page events =========================================== //
    onMounted(async() => {
        debugger;
        user.value = userStore.getUser

        await loadUserWidgetData()
        await loadEmissionWidgetData()
        await loadActivityWidgetData()
    })
</script>

<style scoped>

</style>