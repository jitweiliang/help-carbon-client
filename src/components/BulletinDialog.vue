<!-- https://writejavascript.com/blog/form-validation-in-vue-js-with-vuelidate/ -->
<template>
    <div class="overlay">
        <div class="modal-display">
            <loading :active="isLoading" :is-full-page="true" />

            <div class="col-12 text-center bg-dark text-light">
                <h5>Add message</h5>
            </div>

            <div class="container-fluid p-3">
                <div class="row">
                    <div class="col-12 col-md-8 col-lg-8">
                        <div class="row mb-3">
                            <div class="col-12">
                                <label for="title" class="form-label">Tile:</label>
                                <input type="text" id="title" name="title" class="form-control" v-model="bulletin.title" :class="{ 'border-danger': $v.title.$dirty && $v.title.$invalid }">
                                <div v-if="$v.title.$dirty && $v.title.required.$invalid" style="color: red">This field is required</div>
                                <div v-if="$v.title.$dirty && $v.title.minLength.$invalid" style="color: red">Minimum length is 10</div>
                                <div v-if="$v.title.$dirty && $v.title.maxLength.$invalid" style="color: red">Maximum length is 100</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-8 col-lg-8">
                        <div class="row mb-3">
                            <div class="col-12">
                                <label for="message" class="form-label">Message:</label>
                                <input type="text" id="message" name="message" class="form-control" v-model="bulletin.message" :class="{ 'border-danger': $v.message.$dirty && $v.message.$invalid }">
                                <div v-if="$v.message.$dirty && $v.message.required.$invalid" style="color: red">This field is required</div>
                                <div v-if="$v.message.$dirty && $v.message.minLength.$invalid" style="color: red">Minimum length is 10</div>
                                <div v-if="$v.message.$dirty && $v.message.maxLength.$invalid" style="color: red">Maximum length is 100</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-secondary" @click="closeDialog()">Close</button>
                    &nbsp;&nbsp;
                    <button type="button" class="btn btn-primary" :disabled="!$v.$anyDirty || $v.$anyError" @click="saveDialog()">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { required, maxLength, minLength, minValue } from '@vuelidate/validators'

    import Loading from 'vue-loading-overlay'
    import Swal from 'sweetalert2'
    import { useToast } from 'vue-toastification'
    import { useBulletinStore } from '@/stores/BulletinStore'

    // --- events for dialog
    const emit = defineEmits(['dialogClosed'])
    // --- params passed in
    const props = defineProps(['userId', 'userName'])

    const isLoading = ref(false)
    const bulletinStore = useBulletinStore();
    const Toast = useToast();

    // --- vm validation object
    const bulletin = ref({})
    const rules = {
        title   : { required, minLength: minLength(10), maxLength: maxLength(100), $autoDirty: true },
        message : { required, minLength: minLength(10), maxLength: maxLength(100), $autoDirty: true },
    }
    const $v = useVuelidate(rules, bulletin)


    function closeDialog() {
        emit('dialogClosed')
    }
    async function saveDialog() {
        // --- check if data entry complete
        const isFormCorrect = await $v.value.$validate()
        if (!isFormCorrect) {
            Swal.fire({
                icon: 'warning',
                title: "Incomplete Form!",
                text: "Please check all input fields."
            })
            return
        }


        // --- create vm for message
        var vm = {
            userId: props.userId,
            userName: props.userName,
            title: bulletin.value.title,
            message: bulletin.value.message,
            imgUrl: "",
        }

        try {
            isLoading.value = true

            await bulletinStore.addMessage(vm);
            Toast.success("Data saved successfully!")

            closeDialog()
        }
        catch(err) {
            Swal.fire({
                    title: "Post Bulletin Error",
                    text: err,
                    icon: 'warning'
                })
        }
        finally {            
            isLoading.value = false
        }
    }
</script>

<style scoped>
   .overlay {
     height: 100%;
     width: 100%;
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: rgba(0,0,0, 0.6);
     /* padding: 20px;
     margin: 20px; */
     border-radius: 5px;
     z-index: 10 !important;
   }
   .modal-display {
     height: auto;
     width: 60%;
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: white;
     padding: 20px;
     margin: 20px;
     border-radius: 5px;
     z-index: 10 !important;
   }
</style>