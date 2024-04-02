<!-- https://codepen.io/Nomamnomam/pen/ZBOpoJ -->
<template>
    <div class="p-3">

        <div class="row">
            <header class="header bg-white shadow align-self-end py-1 px-xl-5 w-100">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start fw-bold ribbon-box">
                            <p class="ribbon-big ribbon-primary">Events</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div class="my-3 p-3 rounded box-shadow vl-parent">
            <loading :active="isLoading" :is-full-page="false" />

            <div v-if="comingEvents.length > 0" class="card timeline">
                <div class="entry" v-for="item in comingEvents">
                    <div class="title">
                        <h3>{{formatDate(item.startDate)}}</h3>
                        <p>{{formatTime(item.startDate)}}</p>
                    </div>

                    <div class="body">
                        <p>{{ item.eventName}}</p>
                        <span class="wrap">
                            {{ item.eventDesc }}
                        </span>

                        <p class="pt-3">
                            <div class="input-group input-group-sm">
                                <div class="row">
                                    <div class="col-md">    
                                        <div class="form-check form-switch">
                                            <!-- <input class="form-check-input" ref="reservation" :id="item.evtId" type="checkbox" role="switch" :checked="item.reminderId != null" @change="toggleReservation(item, $event)"/> -->
                                            <input class="form-check-input" ref="reservation" :id="item.evtId" type="checkbox" role="switch" :checked="item.reminderId != null" @change="toggleReservation(item, $event)"/>
                                            <label class="form-check-label" :for="item.evtId">Reserve</label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <p v-if="item.reminderId">
                                            <div class="btn-group btn-group-md">
                                                <input type="radio" class="btn-check" :name="`opt1-${item.evtId}`" :id="`opt1-${item.evtId}`" value="5m" v-model="item.remindBefore" autocomplete="off" @click="changeReminder(item, '5m')"/>
                                                <label class="btn btn-sm btn-outline-primary check-label" :for="`opt1-${item.evtId}`">5m</label>

                                                <input type="radio" class="btn-check" :name="`opt2-${item.evtId}`" :id="`opt2-${item.evtId}`" value="1d" v-model="item.remindBefore" autocomplete="off" @click="changeReminder(item, '1d')" />
                                                <label class="btn btn-sm btn-outline-primary  check-label" :for="`opt2-${item.evtId}`">1d</label>

                                                <input type="radio" class="btn-check" :name="`opt3-${item.evtId}`" :id="`opt3-${item.evtId}`" value="1w" v-model="item.remindBefore" autocomplete="off" @click="changeReminder(item, '1w')" />
                                                <label class="btn btn-sm btn-outline-primary check-label" :for="`opt3-${item.evtId}`">1w</label>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
    	    </div>
            <div v-if="comingEvents.length == 0">
                <div>
                    <h6>No upcoming events</h6>
                </div>
            </div>
        </div>        
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    import { useToast } from 'vue-toastification'
    import { useUserStore } from '@/stores/UserStore'
    import { useEventStore } from '@/stores/EventStore'
    import { useReminderStore } from '@/stores/ReminderStore'

    import Swal from 'sweetalert2'
    import moment from 'moment'
    import Loading from 'vue-loading-overlay'

    const reservation = ref(null)
    const isLoading = ref(false)
    const comingEvents = ref([])

    const toast = useToast()
    const userStore = useUserStore()
    const eventStore = useEventStore()
    const reminderStore = useReminderStore()


    // -- format raw date for display
    function formatDate(val) {
        return moment(val).format("MMMM Do YYYY")
    }
    function formatTime(val) {
        return moment(val).format("LTS")
    }


    // --
    async function toggleReservation(item, ev) {
        if(ev.currentTarget.checked) {
            item.userId = userStore.getUser.userId
            item.remindBefore = "5m"
            item.reminderDate = moment(item.startDate).subtract(5, 'minutes')
            item.reminderDate = moment(item.reminderDate).format('YYYY-MM-DD HH:mm:ss')

            try {
                isLoading.value = true
                await reminderStore.mark(item);

                toast.success("Data updated")
            }
            catch(err) {
                Swal.fire({
                    title: "Toggle Reservation Error",
                    text: err,
                    icon: 'warning'
                })
            }
            finally {
                isLoading.value = false
            }
        }
        else {
            try {
                isLoading.value = true
                await reminderStore.unmark(item.reminderId);       

                toast.success("Data updated")
            }
            catch(err) {
                Swal.fire({
                    title: "Toggle Reservation II Error",
                    text: err,
                    icon: 'warning'
                })
            }
            finally {
                isLoading.value = false
            }
        }

        await loadEvents()
    }
    async function changeReminder(item, before) {
        item.remindBefore = before
        switch(before) {
            case "5m":
                item.reminderDate = moment(item.startDate).subtract(5, 'minutes')
                break;
            case "1d":
                item.reminderDate = moment(item.startDate).subtract(1, 'days')
                break;
            case "1m":
                item.reminderDate = moment(item.startDate).subtract(5, 'weeks')
                break;
        }

        item.reminderDate = moment(item.reminderDate).format('YYYY-MM-DD HH:mm:ss')

        try {
            isLoading.value = true
            await reminderStore.reminder(item)

            toast.success("Data updated")
        }
        catch(err) {
            Swal.fire({
                    title: "Change Reminder Failed",
                    text: err,
                    icon: 'warning'
                })            
        }
        finally {
            isLoading.value = false
        }
    }


    async function loadEvents() {
        try {
            isLoading.value = true

            let userId = userStore.getUser.userId

            await eventStore.retrieveLatestByUser(userId)
            comingEvents.value = eventStore.getEvents
        }
        catch(err) {
            Swal.fire({
                    title: "Load Events Error",
                    text: err,
                    icon: 'warning'
                })
        }
        finally {
            isLoading.value = false
        }
    }

    onMounted(async() => {
        // -- initial loading of events data
        await loadEvents()
    })
</script>

<style scoped>
    .timeline {
        width: 100%;
        max-width: 90vw;
        /* background: #fff; */
        padding: 45px 20px;
        position: relative;
        /* box-shadow: 0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2); */
    }
    .timeline:before {
        content: "";
        position: absolute;
        top: 0px;
        left: calc(33% + 3px);
        bottom: 0px;
        width: 4px;
        background: purple;
    }
    .timeline:after {
        content: "";
        display: table;
        clear: both;
    }

    .entry {
        clear: both;
        text-align: left;
        position: relative;
    }
    .entry .title {
        margin-bottom: 0.2em;
        float: left;
        width: 33%;
        padding-right: 30px;
        text-align: right;
        position: relative;
        color: mediumseagreen;
    }
    .entry .title:before {
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        border: 8px solid salmon;
        /* background-color: #fff; */
        border-radius: 100%;
        top: 15%;
        right: -8px;
        z-index: 99;
    }
    .entry .title h3 {
        margin: 0;
        font-size: 1.1rem;
    }
    .entry .title p {
        margin: 0;
        font-size: 1.0rem;
    }
    .entry .body {
        margin: 0 0 2em;
        float: right;
        width: 66%;
        padding-left: 30px;
    }
    .entry .body .content {
        /* background-color: white; */
        font-size: 0.85rem;
    }
    .entry .body p {
        line-height: 1.1m;
        font-size: 1rem;
    }
    .entry .wrap {
        word-wrap: break-word;
    }

    .check-label {
        width: 90px;
    }
</style>