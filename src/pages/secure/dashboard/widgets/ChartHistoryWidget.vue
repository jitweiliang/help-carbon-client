<template>
    <div class="p-2 vl-parent">
        <loading :active="isLoading" :is-full-page="false" />

        <highcharts class="hc" :options="chartOptions"></highcharts>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    import { useUserStore } from '@/stores/UserStore'
    import { useEmissionStore } from '@/stores/EmissionStore'

    import Swal from 'sweetalert2'
    import Loading from 'vue-loading-overlay'

    const userStore = useUserStore()
    const emissionStore = useEmissionStore()

    const isLoading = ref(false)
    const history = ref()
    const user = ref()

    const chartOptions = ref({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Personal Carbon Emission',
            align: 'center'
        },
        subtitle: {
            text:'Based on last 5 submissions',
            align: 'center'
        },
        xAxis: {
            categories: [],
            crosshair: true,
            accessibility: {
                description: 'SubmitDate'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'kg CO2^e'
            }
        },
        tooltip: {
            valueSuffix: ' (1000 MT)'
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0
            }
        },
        series: [
        ]    
    })

    async function loadData() {
        try {
            isLoading.value = true

            await emissionStore.retrieveHistory(user.value.userId)
            history.value = emissionStore.getHistory
        }
        catch(err) {
            Swal.fire({
                title: "Load ChartHistoryWidget Error",
                text: err,
                icon: 'warning'
            })
        }
        finally {
            isLoading.value = false
        }
    }

    onMounted(async() => {
        user.value = userStore.getUser

        await loadData()

        // let aaa = {
        //     "date": ["2024-03-25 19:53:02", "2024-03-25 19:48:40", "2024-03-25 17:36:37", "2024-03-25 17:35:28", "2024-03-25 17:17:17"],
        //     "household": [88600,8200,2300,1700,2300],
        //     "transportation": [18,270,1550,1400,600],
        //     "food": [150,450,440,270,410]
        // }

        if(history.value) {
            chartOptions.value.xAxis.categories = history.value.date;
            chartOptions.value.series = [
                {
                    name: 'Household',
                    data: history.value.household
                },
                {
                    name: 'Transportation ',
                    data: history.value.household
                },
                {
                    name: 'Food',
                    data: history.value.food
                },
                {
                    name: 'Total',
                    data: history.value.totalEmission
                }
            ]
        }


        // chartOptions.value.xAxis.categories = ['2024-03-01', '2024-04-02', '2024-05-01', '2024-06-01']
        // chartOptions.value.series = [
        //     {
        //         name: 'Household',
        //         data: [40629, 26000, 10700, 6830]
        //     },
        //     {
        //         name: 'Transportation ',
        //         data: [5106, 13600, 550, 14100]
        //     },
        //     {
        //         name: 'Food',
        //         data: [3186, 3600, 250, 8100]
        //     },
        //     {
        //         name: 'Total',
        //         data: [43106, 33600, 2250, 18100]
        //     }

        // ]

    })
</script>

<style scoped>
</style>