<!-- https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details -->
<template>
    <div class="p-3">
        <div class="row">
            <header class="header bg-white shadow align-self-end py-1 px-xl-5 w-100">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start fw-bold ribbon-box">
                            <p class="ribbon-big ribbon-primary">Profile</p>
                        </div>
                        <div class="col-md-6 text-center text-md-end text-gray-400">
                        </div>
                    </div>
                </div>
            </header>
        </div>

        <div class="my-3 p-3 bg-white rounded box-shadow vl-parent">
            <div class="row d-flex">
                <div class="col-12 col-md-4 justify-content-center">
                    <div class="card mb-4">
                        <div class="card-header"></div>
                        <div class="card-body text-center">
                                <span>
                                    <img class="image image-contain" :src="user.photoUrl" style="width:180px; height:180px;object-fit: contain;"/>
                                </span>
                                <!-- <img class="card-profile-img" src="https://therichpost.com/wp-content/uploads/2021/03/avatar2.png" alt="Jassa Rich"> -->
                                <file-pond 
                                        ref="pond" 
                                        name="profileImg" 
                                        class="filepond"
                                        multiple="false" 
                                        accepted-file-types="image/jpeg, image/png"
                                        allowImagePreview="true"
                                        labelIdle="Edit profile image" 

                                        @addfile="imageUpdated" /> 

                                <!-- <h5 class="mb-3">Jassa Rich</h5>
                                <p class="mb-4"></p> -->
                                <!-- <button class="btn btn-outline-dark btn-sm"><span class="fab fa-twitter"></span> Edit Image</button> -->
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-8 vl-parent">
                    <loading :active="isLoading" :is-full-page="false" />

                    <form class="card mb-4">
                        <div class="card-header">
                            <h4 class="card-heading">Edit Profile</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-6 col-md-6">
                                    <div class="mb-4">
                                        <label class="form-label">Username</label>
                                        <input class="form-control" type="text" v-model="user.userName" :class="{ 'border-danger': $v.userName.$dirty && $v.userName.$invalid }">
                                        <div v-if="$v.userName.$dirty && $v.userName.required.$invalid" style="color: red">This field is required</div>
                                        <div v-if="$v.userName.$dirty && $v.userName.minLength.$invalid" style="color: red">Minimum length is 10</div>
                                        <div v-if="$v.userName.$dirty && $v.userName.maxLength.$invalid" style="color: red">Maximum length is 100</div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-6">
                                    <div class="mb-4">
                                        <label class="form-label">Email address</label>
                                        <input class="form-control" type="email" v-model="user.userEmail" :class="{ 'border-danger': $v.userEmail.$dirty && $v.userEmail.$invalid }">
                                        <div v-if="$v.userEmail.$dirty && $v.userEmail.required.$invalid"  style="color: red">This field is required</div>
                                        <div v-if="$v.userEmail.$dirty && $v.userEmail.minLength.$invalid" style="color: red">Minimum length is 10</div>
                                        <div v-if="$v.userEmail.$dirty && $v.userEmail.maxLength.$invalid" style="color: red">Maximum length is 100</div>
                                        <div v-if="$v.userEmail.$dirty && $v.userEmail.email.$invalid" style="color: red">Not a valid email format</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="mb-4">
                                        <label class="form-label">Address</label>
                                        <!-- User Address Line 1 -->
                                        <input class="form-control" type="text" v-model="user.userAddress1" :class="{ 'border-danger': $v.userAddress1.$dirty && $v.userAddress1.$invalid }">
                                        <div v-if="$v.userAddress1.$dirty && $v.userAddress1.required.$invalid" style="color: red">This field is required</div>
                                        <div v-if="$v.userAddress1.$dirty && $v.userAddress1.minLength.$invalid" style="color: red">Min length is 10</div>
                                        <div v-if="$v.userAddress1.$dirty && $v.userAddress1.maxLength.$invalid" style="color: red">Max length is 80</div>

                                        <!-- User Address Line 2 -->
                                        <input class="form-control" type="text" v-model="user.userAddress2">

                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-4">
                                        <label class="form-label">Contact No</label>
                                        <input class="form-control" type="text" v-model="user.userContactNo" :class="{ 'border-danger': $v.userContactNo.$dirty && $v.userContactNo.$invalid }">
                                        <div v-if="$v.userContactNo.$dirty && $v.userContactNo.required.$invalid" style="color: red">This field is required</div>
                                        <div v-if="$v.userContactNo.$dirty && $v.userContactNo.minLength.$invalid" style="color: red">Min length is 6</div>
                                        <div v-if="$v.userContactNo.$dirty && $v.userContactNo.maxLength.$invalid" style="color: red">Max length is 20</div>
                                    </div>
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="mb-0">
                                        <label class="form-label">About Me</label>
                                        <textarea class="form-control" rows="5" v-model="user.aboutMe"></textarea>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-end">
                            <button type="button" class="btn btn-outline-primary" @click="updateProfile" :disabled="!$v.$anyDirty || $v.$error">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>  
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useUserStore } from '@/stores/userStore'

    import { useToast } from 'vue-toastification'
    import Loading from 'vue-loading-overlay'
    import Swal from 'sweetalert2'

    import { useVuelidate } from '@vuelidate/core'
    import { required, maxLength, minLength, email } from '@vuelidate/validators'

    import vueFilePond from 'vue-filepond';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';

    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';



    // -- filepond components
    const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

    const isLoading = ref(false)
    const user = ref({})
    const toast = useToast()
    const userStore = useUserStore()


    // --- validation
    // --- vm validation object
    const rules = {
        userName      : { required, minLength: minLength(6),  maxLength: maxLength(60), $autoDirty: true },
        userEmail     : { required, minLength: minLength(10), maxLength: maxLength(40), $autoDirty: true, email },
        userAddress1  : { required, minLength: minLength(10), maxLength: maxLength(60), $autoDirty: true },
        userContactNo : { required, minLength: minLength(6),  maxLength: maxLength(20), $autoDirty: true }
    }
    const $v = useVuelidate(rules, user)



    // --- methods
    const handleFilePondInit = () => {
        console.log('FilePond has initialized');
    }


    async function updateProfile() {
        try {
            isLoading.value = true
            await userStore.updateProfile(user.value)

            toast.info("Data updated")
        }
        catch(err) {
            Swal.fire({
                title: "Update profile error",
                text: err,
                icon: 'warning'
            })
        }
        finally {
            isLoading.value = false
        }
    }
    async function imageUpdated(unused, fileRes) {
        try {
            isLoading.value = true
            await userStore.uploadImage(user.value.userEmail, fileRes)
        }
        catch(err) {
            Swal.fire({
                title: "Upload image error",
                text: err,
                icon: 'warning'
            })
        }
        finally {
            isLoading.value = false
        }
    }

    async function loadData() {
        let userId = userStore.getUser.userId

        await userStore.retrieveUserById(userId)
        user.value = userStore.getUser
    }

    // --- page events
    onMounted(async() => {
        await loadData()
    })
</script>

<style scoped>
  .filepond--root,
  .filepond--root .filepond--drop-label {
    height: 80px;
  }
  .filepond--panel-root {
      background-color: transparent;
      border: 2px solid #2c3340;
  }

  .image {
        background: #34495e;
        border: 1px solid #34495e;
        width: 200px;
        height: 200px;
    }
    .image-contain {
        object-fit: contain;
        object-position: center;
    }
    .image-cover {
        object-fit: cover;
        object-position: right top;
    }

  /* @media only screen and (max-width: 768) {
    .img-section {
        width:100px;
    }
  }
  @media only screen and (max-width: 768) {
    .img-section {
        width: 800px;
    }
  }   */
</style>