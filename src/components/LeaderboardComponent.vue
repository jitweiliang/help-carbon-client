<!-- https://getbootstrap.com/docs/5.0/components/list-group/ -->
<template>
    <div class="col-12 vl-parent" style="min-height: 300px;">
        <loading :active="isLoading" :is-full-page="false" />

        <ol class="list-group list-group-numbered">
            <li class="list-group-item d-flex justify-content-between align-items-start mt-2" v-for="item in emissions">
                <img :src="item.photoUrl" alt="" style="width: 51px; height: 51px" class="rounded-circle" />
                <div class="ms-2 me-auto pt-2">
                    <div class="fw-bold">{{ item.userName }}</div>
                    <p>{{ item.submittedDate }}</p>
                </div>
                <span class="badge text-primary fw-bold mb-2">
                    <h6>{{ item.totalEmission }}</h6>
                </span>
            </li>
        </ol>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { collection, onSnapshot, query, where } from 'firebase/firestore'
    
    import Loading from 'vue-loading-overlay'
    import Swal from 'sweetalert2'

    import { fstore } from '@/utilities/FirebaseConfig'
    import { useEmissionStore } from '@/stores/EmissionStore'

    const emissionFirestore = ref()
    const isLoading = ref(false)
    const emissionStore = useEmissionStore()
    const emissions = ref([])

    async function loadRankings() {
        try {
            isLoading.value = true
            await emissionStore.retrieveRanking()

            emissions.value = emissionStore.getEmissions
        }
        catch(err) {
            Swal.fire({
                title: "Ranking Loading error",
                text: err,
                icon: 'warning'
            })
        }
        finally {
            isLoading.value = false
        }
    }

    function startFirestoreListener() {
        let currentDate = new Date()

        // https://firebase.google.com/docs/firestore/query-data/listen
        try {
            const q = query(collection(fstore, "emissions"), where('postedDate', '>', currentDate))
            emissionFirestore.value = onSnapshot(q, async (querySnapshot) => {
                if(querySnapshot.docChanges().length > 0) {
                    await loadRankings();
                }   
            });
        }
        catch(err) {
            Swal.fire({
                title: "Ranking Loading error",
                text: err,
                icon: 'warning'
            })
        }
    }

    onMounted(async() => {
        startFirestoreListener()
        await loadRankings()
    })
    onUnmounted(() => {
        // detach firestore listener
        emissionFirestore.value();
    })
</script>

<style scoped></style>