<template>
    <div class="card card-box tilebox-one ribbon-box border border-primary border-1">
        <div class="clearfix"></div>

        <div>
            <div class="ribbon ribbon-primary">
                My Activities
            </div>
            <i class="bi bi-graph-up bi-text float-end"></i>
        </div>

        <div class="row pt-4">
            <div class="col-10">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width: params.emissionsCnt/50*100 + '%'}"></div>
                </div>
                <span>Submissions <span class="fw-bold">{{ params.emissionsCnt ?? 0}}/50</span></span>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="{width: params.bulletinsCnt/50*100 + '%'}"></div>
                </div>
                <span>Bulletins <span class="fw-bold">{{ params.bulletinsCnt ?? 0}}/50</span></span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        params: Object, required: true, default: {}
    })

    const emissionsPcnt = ref(0)
    const bulletinsPcnt = ref(0)
</script>

<style scoped>
</style>