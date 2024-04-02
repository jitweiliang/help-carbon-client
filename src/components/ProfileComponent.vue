<!-- https://mdbootstrap.com/docs/standard/extended/profiles/ -->
<!-- https://www.bootdey.com/snippets/view/bs4-seller-cards --> 
<template>
 <div class="col-md">
    <div class="row d-flex justify-content-center align-items-center">
        <div class="card border-0">
            <div class="card-body text-center">
                <div class="mb-1">
                    <img :src="model.photoUrl" class="rounded-circle img-fluid" style="width: 100px;" /> 
                </div>
                <h4 class="mb-1">{{ model.userName }}</h4>
                <p class="text-muted mb-4">{{ model.userEmail }}</p>
                
                <!-- <div class="row">
                    <div class="col-6">
                        <p class="mb-1 h5">12/03/2024</p>
                        <p class="text-muted mb-0">Last Submission Date</p>
                    </div>
                    <div class="col-6">
                        <p class="mb-1 h5">38512</p>
                        <p class="text-muted mb-0">Last Emission Score</p>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
  </div></template>

<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const props = defineProps({
        model: { type: Object, required: false, default: {}}
    })
    
    function editProfile() {
        router.push('/main/profile')
    }
</script>

<style scoped></style>