<template>
    <div class="vl-parent p-1">
        <loading :active="isLoading" :is-full-page="false" />
        
        <div class="row text-center pt-2">
            <h5><span><b>Event Reminders</b></span></h5>
        </div>
        <div class="row pt-5">
            <!-- https://getbootstrap.com/docs/5.0/utilities/flex/ -->
            <div class="d-flex justify-content-center">
                <div class="col-md scroll">
                    <!-- https://getbootstrap.com/docs/5.0/components/list-group/ -->
                    <!-- <ul class="list-group" style="height: 250px; overflow: auto"> -->
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-bottom" 
                                v-for="(item, index) in reminders">
                            <div class="ms-2 me-auto">
                                <div>
                                    <span>{{ index + 1 }}. </span>
                                    <span class="fw-bold">{{ item.eventName}}</span>
                                </div>
                                {{ item.eventStartDate }}
                            </div>
                            <h4>
                                <span class="badge bg-warning rounded-pill pt-1">{{ item.remindBefore }}</span>
                            </h4>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useReminderStore } from '@/stores/ReminderStore'
    import { useUserStore } from '@/stores/UserStore'

    import Swal from 'sweetalert2'
    import Loading from 'vue-loading-overlay'

    const reminderStore = useReminderStore()
    const userStore = useUserStore()

    const user = ref()
    const reminders = ref([])
    const isLoading = ref(false)

    async function loadReminders() {
        debugger;
        
        try {
            isLoading.value = true

            await reminderStore.retrieveByUser(user.value.userId)
            reminders.value = reminderStore.getReminders
        }
        catch(err) {
            Swal.fire({
                title: "Load ReminderWidget Error",
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

        await loadReminders()
    })
</script>

<style scoped>
    /* https://www.w3docs.com/snippets/css/how-to-make-a-div-vertically-scrollable.html */
    div.scroll {
        /* background-color: #E8E5F2; */
        height: 220px;
        overflow-x: hidden;
        overflow-y: auto;
        text-align: center;
    }
</style>