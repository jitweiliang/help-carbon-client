<!-- https://mdbootstrap.com/docs/standard/extended/comments/ -->

<template>
    <transition name="fade">
        <bulletin-dialog v-if="isModalVisible"  @dialog-closed="closeDialog" :user-id="user.userId" :userName="user.userName"></bulletin-dialog>
    </transition>

    <div class="p-3">
        <div class="row">
            <header class="header bg-white shadow align-self-end py-1 px-xl-5 w-100">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start fw-bold ribbon-box">
                            <p class="ribbon-big ribbon-primary">Bulletins</p>
                        </div>
                        <div class="col-md-6 text-center text-md-end text-gray-400">
                            <button type="button" class="btn btn-circle btn-primary btn-xl" @click="addMessage">
                                  <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div class="my-1 p-3 rounded text-dark">
                <div class="row d-flex justify-content-center vl-parent">
                    <loading :active="isLoading" :is-full-page="false" />

                    <div v-if="bulletins.length > 0" class="col-12">
                        <div class="card mb-1" v-for="item in bulletins">
                            <div class="card-body">
                                <div class="d-flex flex-start">
                                    <img class="rounded-circle shadow-1-strong me-3" :src="item.photoUrl" alt="avatar" width="40" height="40" />
                                    <div class="w-100">
                                        <div class="d-flex justify-content-between align-items-center mb-1">
                                            <h6 class="text-primary fw-bold mb-0">
                                                {{ item.userName }}
                                                <h6 class="text-dark mt-1">{{ item.title }}</h6>
                                            </h6>
                                            <p class="mb-0">{{ item.postDate }}</p>
                                        </div>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p>
                                                {{ item.message }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="bulletins.length == 0">
                        <h6>No messages available</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { collection, onSnapshot, query, where } from 'firebase/firestore'
    import Swal from 'sweetalert2'
    import Loading from 'vue-loading-overlay'

    import { fstore } from '@/utilities/FirebaseConfig'
    import { useBulletinStore } from '@/stores/BulletinStore'
    import { useUserStore } from '@/stores/UserStore'

    import BulletinDialog from '@/components/BulletinDialog.vue'

    const isLoading = ref(false)
    const isModalVisible = ref(false)
    const user = ref()
    const bulletins = ref([])

    const bulletinStore = useBulletinStore()
    const userStore = useUserStore()

    var bulletinFireStore = ref()

    function addMessage() {
       isModalVisible.value = true;
    }
    function closeDialog() {
        isModalVisible.value = false;
    }

    async function loadBulletins() {
        try {
            isLoading.value = true

            await bulletinStore.retrieveLatest()
            bulletins.value = bulletinStore.getBulletins
        }
        catch(err) {
            Swal.fire({
                title: "Load Bulletins Error",
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

        let currentDate = new Date()

        // <!-- https://cloud.google.com/firestore/docs/query-data/listen#web-version-9 -->
        // <!-- https://cloud.google.com/firestore/docs/query-data/queries -->

        // -- setup listener for firestore (bulletins) changes so we can refetch data from api
        try {
            debugger;
            const q = query(collection(fstore, "bulletins"), where('postedDate', '>', currentDate))
            bulletinFireStore.value = onSnapshot(q, async (querySnapshot) => {
                if(querySnapshot.docChanges().length > 0) {
                    await loadBulletins();
                }   
            });
        }
        catch(err) {
            Swal.fire({
                title: "Bulletin Firestore Listener Error",
                text: err,
                icon: 'warning'
            })            
        }

        // --- initial load of bulletins data
        await loadBulletins()
    })
    onUnmounted(() => {
        // https://stackoverflow.com/questions/46642652/how-to-remove-listener-for-documentsnapshot-events-google-cloud-firestore
        // --- this is remove listener when page exits
        bulletinFireStore.value();
    })
</script>

<style scoped>
    /* https://codepen.io/jnbruno/pen/vNpPpW */
    .btn-circle.btn-xl {
        width: 70px;
        height: 70px;
        padding: 10px 16px;
        border-radius: 35px;
        font-size: 24px;
        line-height: 1.33;
        font-weight: 500;
        font-size: 2.1rem;
    }
</style>