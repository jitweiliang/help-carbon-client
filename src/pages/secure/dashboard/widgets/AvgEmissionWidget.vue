<template>
    <div class="card card-box tilebox-one ribbon-box border border-primary border-1">
        <div class="clearfix"></div>

        <div>
            <div class="ribbon ribbon-primary">
                My Average Emission
            </div>
            <i class="bi bi-lungs-fill bi-text float-end"></i>
        </div>
                

        <h2 class="">{{ params.avgEmission ?? 0}}</h2>
        <span class="badge badge-custom">{{  params.emissionCount ?? 0}}</span>
        <span class="text-muted">number of submissions</span>
    </div>
</template>

<script setup>
    const props = defineProps({
        params: { type: Object, required: true, default: {} }
    })
</script>

<style scoped>
</style>