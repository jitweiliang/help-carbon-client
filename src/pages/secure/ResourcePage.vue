<template>
    <div class="p-3">

        <!-- "Header" bar at the top of the screen -->
        <div class="row">
            <header class="header bg-white shadow align-self-end py-1 px-xl-5 w-100">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start fw-bold ribbon-box">
                            <p class="ribbon-big ribbon-primary">Additional Resources</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>

        <div class="my-3 p-5">

            <div class="row bg-white rounded box-shadow vl-parent mt-2" v-for="resource in resourceList">
                
                <hr/>
                <!-- This is for if it's a static link -->
                <div class="row ms-1 mb-2 d-flex justify-content-start" v-if="resource.type == 1">
                    <div class="card">
                        <div class="card-body">
                            <h4><b><a class="link-opacity-75-hover" :href="resource.url">{{ resource.title }}</a></b></h4>
                            <hr/>
                            <p class="card-text">{{ resource.description }}</p>
                        </div>
                    </div>
                </div>

                <!-- This is for if it's a video -->
                <div class="row m-1" v-if="resource.type == 2">
                    <div class="col-7">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"><b>{{ resource.title }}</b></h4>
                                <hr/>
                                <p>{{ resource.description }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-5 d-flex justify-content-start">
                        <div class="card">
                            <div class="card-body">
                                <div class="embed-responsive embed-responsive-16by9">
                                    <iframe class="embed-responsive-item" :src="resource.url" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<script setup>
    import {ref, onMounted} from 'vue'
    import { useResourceStore } from '@/stores/ResourceStore.js'

    import Loading from 'vue-loading-overlay'
    import Swal from 'sweetalert2'

    const resourceStore = useResourceStore();
    var resourceList = ref([]);

    onMounted(async () => {
        await resourceStore.retrieveResources();
        resourceList.value = resourceStore.getResources;
        debugger;
    })

</script>