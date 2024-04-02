<template>
    <div class="card card-box tilebox-one ribbon-box border border-primary border-1">
        <div class="clearfix"></div>

        <div>
            <div class="ribbon ribbon-primary">
                Total Users
            </div>
            <i class="bi bi-person-fill bi-text float-end"></i>
        </div>

        <h2 class="">{{ params.totalUsers ?? 0}}</h2>
        <span class="badge badge-custom">{{ params.activeUsers ?? 0 }}</span>
        <span class="text-muted">Active current month</span>
    </div>
</template>

<script setup>
    const props = defineProps({
        params: Object, required: true, default: {}
    })
</script>

<style scoped></style>