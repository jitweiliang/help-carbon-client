<template>
    <div class="p-2 vl-parent">
        <loading :active="isLoading" :is-full-page="false" />

        <highcharts class="hc" :options="chartOptions" style="height: 325px"></highcharts>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useEmissionStore } from '@/stores/EmissionStore'

    import Swal from 'sweetalert2'
    import Loading from 'vue-loading-overlay'

    const isLoading = ref(false)
    const chartData = ref()
    const emissionStore = useEmissionStore()
    
    const chartOptions = ref({
        chart: {
            type: 'pie',
            plotAreaHeight: 200
        },
        title: {
            text: 'Average Emission By Category'
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            pie: {
                size: 185
            },
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20,
                    style: {
                        fontSize: '0.88em',
                        opacity: 0.88
                    }
                }] 
            }
        },
        series: [{
            name: 'Category',
            colorByPoint: true,
            data: []
        }]    
    })

    async function loadData() {
        try {
            isLoading.value = true

            await emissionStore.retrieveCategoryAverage();
            chartData.value = emissionStore.getCatAverages
            chartOptions.value.series[0].data = chartData.value
        }
        catch(err) {
            Swal.fire({
                title: "Load ChartCategoryWidget Error",
                text: err,
                icon: 'warning'
            })
        }
        finally {
            isLoading.value = false
        }
    }

    onMounted(async() => {
        await loadData()
    })
</script>

<style scoped>
</style>