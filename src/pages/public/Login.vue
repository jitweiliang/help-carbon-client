<template>
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-12">

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Sign In</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Register</button>
                        </li>
                    </ul>
                    
                    <div class="tab-content vl-parent" id="myTabContent">
                        <loading :active="isLoading" :is-full-page="false" />
                        <!-- ====================== s i g n   i n ===================== -->
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="card">
                                <div class="card-body p-3 p-md-4 p-xl-5">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mb-4">
                                            <h3>Sign in</h3>
                                        </div>
                                    </div>
                                </div>

                                <div class="row gy-3 overflow-hidden">
                                    <form>
                                        <div class="col-12">
                                            <div class="form-floating mb-3">
                                                <input v-model="loginCredential.email" type="email" class="form-control" name="email" id="email" autocomplete="on" placeholder="name@example.com" :class="{ 'border-danger': $v.email.$dirty && $v.email.$invalid }">
                                                <label for="email" class="form-label">Email</label>
                                                <div v-if="$v.email.$dirty && $v.email.email.$invalid" style="color: red">Invalid email format</div>
                                                <div v-if="$v.email.$dirty && $v.email.required.$invalid" style="color: red">This field is required</div>
                                                <div v-if="$v.email.$dirty && $v.email.minLength.$invalid" style="color: red">Minimum length is 6</div>
                                                <div v-if="$v.email.$dirty && $v.email.maxLength.$invalid" style="color: red">Maximum length is 30</div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating mb-3">
                                                <input v-model="loginCredential.password" type="password" class="form-control" name="password" autocomplete="off" id="password" value="" placeholder="Password" :class="{ 'border-danger': $v.password.$dirty && $v.password.$invalid }">
                                                <label for="password" class="form-label">Password</label>
                                                <div v-if="$v.password.$dirty && $v.password.required.$invalid" style="color: red">This field is required</div>
                                                <div v-if="$v.password.$dirty && $v.password.minLength.$invalid" style="color: red">Minimum length is 4</div>
                                                <div v-if="$v.password.$dirty && $v.password.maxLength.$invalid" style="color: red">Maximum length is 20</div>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button class="btn btn-primary btn-lg" @click="loginEmail">Log in now</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <p class="mt-4 mb-4">Or continue with</p>

                                        <div class="d-flex gap-2 gap-sm-3 justify-content-centerX">
                                            <button type="button" class="btn btn-danger btn-lg submit" @click="loginGoogle" data-bs-toggle title="google">
                                                <i class="bi bi-google"></i>
                                            </button>
                                            <button type="button" class="submit btn btn-warning btn-lg" @click="loginFacebook" data-bs-toggle title="facebook">
                                                <i class="bi bi-facebook"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <!-- ==================== r e g i s t e r  ==================== -->
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="card">
                                <div class="card-body p-3 p-md-4 p-xl-5">
                                    <div class="row">
                                      <div class="col-12">
                                          <div class="mb-4">
                                              <h3>Register</h3>
                                          </div>
                                      </div>
                                    </div>
                                    <div class="row gy-3 overflow-hidden">
                                        <form>
                                            <div class="col-12">
                                                <div class="form-floating mb-3">
                                                    <input v-model="registerCredential.regEmail" type="email" class="form-control" name="regEmail" id="regEmail" placeholder="name@example.com" :class="{ 'border-danger': $v2.regEmail.$dirty && $v2.regEmail.$invalid }">
                                                    <label for="regEmail" class="form-label">Email</label>
                                                    <div v-if="$v2.regEmail.$dirty && $v2.regEmail.email.$invalid" style="color: red">Invalid email format</div>
                                                    <div v-if="$v2.regEmail.$dirty && $v2.regEmail.required.$invalid" style="color: red">This field is required</div>
                                                    <div v-if="$v2.regEmail.$dirty && $v2.regEmail.minLength.$invalid" style="color: red">Minimum length is 6</div>
                                                    <div v-if="$v2.regEmail.$dirty && $v2.regEmail.maxLength.$invalid" style="color: red">Maximum length is 30</div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-floating mb-3">
                                                    <input v-model="registerCredential.regName" type="email" class="form-control" name="regName" id="regName" placeholder="name" :class="{ 'border-danger': $v2.regName.$dirty && $v2.regName.$invalid }">
                                                    <label for="regName" class="form-label">Display Name</label>
                                                    <div v-if="$v2.regName.$dirty && $v2.regName.required.$invalid" style="color: red">This field is required</div>
                                                    <div v-if="$v2.regName.$dirty && $v2.regName.minLength.$invalid" style="color: red">Minimum length is 6</div>
                                                    <div v-if="$v2.regName.$dirty && $v2.regName.maxLength.$invalid" style="color: red">Maximum length is 30</div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-floating mb-3">
                                                    <input v-model="registerCredential.regPassword" type="password" class="form-control" name="regPassword" id="regPassword" value="" autocomplete="off" placeholder="Password" :class="{ 'border-danger': $v2.regPassword.$dirty && $v2.regPassword.$invalid }">
                                                    <label for="regPassword" class="form-label">Password</label>
                                                    <div v-if="$v2.regPassword.$dirty && $v2.regPassword.required.$invalid" style="color: red">This field is required</div>
                                                    <div v-if="$v2.regPassword.$dirty && $v2.regPassword.minLength.$invalid" style="color: red">Minimum length is 6</div>
                                                    <div v-if="$v2.regPassword.$dirty && $v2.regPassword.maxLength.$invalid" style="color: red">Maximum length is 30</div>
                                                </div>
                                            </div>
                                        </form>
                                        <div class="col-12">
                                          <div class="d-grid">
                                              <button class="btn btn-primary btn-lg" @click="registerEmail">Register</button>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { required, maxLength, minLength, email } from '@vuelidate/validators'

    import { useRouter } from 'vue-router'

    import Swal from 'sweetalert2'
    import Loading from 'vue-loading-overlay'
    import Authentication from '@/utilities/Authentication'


    const isLoading = ref(false)
    const router = useRouter()

    const loginCredential = ref({})
    const rules = {
        email     : { required, email, minLength: minLength(6),  maxLength: maxLength(30), $autoDirty: true },
        password  : { required, minLength: minLength(4), maxLength:maxLength(20), $autoDirty: true }
    }
    const $v = useVuelidate(rules, loginCredential)


    const registerCredential = ref({})
    const rules2 = {
        regEmail     : { required, email, minLength: minLength(6),  maxLength: maxLength(30), $autoDirty: true },
        regName      : { required, minLength: minLength(6),  maxLength: maxLength(30), $autoDirty: true },
        regPassword  : { required, minLength: minLength(4), maxLength:maxLength(20), $autoDirty: true }
    }
    const $v2 = useVuelidate(rules2, registerCredential)

    
    async function loginEmail() {
        if (isNotificationsEnabled()) {
            // -- check valid inputs
            const isFormCorrect = await $v.value.$validate()
            if (!isFormCorrect) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Incomplete Form!',
                    text: 'Please check all input fields',
                })
                
                return
            }

            try {
                isLoading.value = true
                await Authentication.authenticateEmail(loginCredential.value.email, loginCredential.value.password)

                router.push("/main/dashboard")
            } 
            catch (err) {
                Swal.fire({
                    title: "Email/Password Authentication",
                    text: err,
                    icon: 'warning'
                })
            }
            finally {
                isLoading.value = false
            }
        }
    }

    async function loginFacebook() {
        // -- make sure notifications in enabled in browser
        if (isNotificationsEnabled()) {
            try {
                isLoading.value = true

                await Authentication.authenticateFacebook();
                router.push("/main/dashboard")  
            } 
            catch (err) {
                Swal.fire({
                    title: "Facebooke Authentication",
                    text: err,
                    icon: 'warning'
                })
            }
            finally {
                isLoading.value = false
            }
        }
    }

    async function loginGoogle() {
        debugger
        // -- make sure notifications in enabled in browser
        if (isNotificationsEnabled()) {
            try {
                isLoading.value = true

                await Authentication.authenticateGoogle();
                router.push("/main/dashboard")
            } 
            catch (err) {
                Swal.fire({
                    title: "Firebase Google Authentication",
                    text: err,
                    icon: 'warning'
                })
            }
            finally {
                isLoading.value = false
            }
        }
    }


    async function registerEmail() {
        const isFormCorrect = await $v2.value.$validate()
            if (!isFormCorrect) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Incomplete Form!',
                    text: 'Please check all input fields',
                })
                return
            }

        try {
            isLoading.value = true

            await Authentication.registerEmail(registerCredential.value.regEmail, registerCredential.value.regName, registerCredential.value.regPassword);

            Swal.fire({
                icon: 'success',
                title: 'Account registration successful!',
                text: 'You may now use your newly registered',
            })
        }
        catch(err) {
            Swal.fire({
                    icon: 'error',
                    title: 'Unable to register email!',
                    text: err,
                })
        }
        finally {
            isLoading.value = false
        }
    }

    function isNotificationsEnabled() {
        let errMsg = null;

        // Notification is syntax that refers to the browser's notification 'state'
        if (!window.Notification) {
            errMsg = "Your browser does not support notification!!!";
        } 
        else {
            if (window.Notification.permission != "granted") {
                errMsg = "Please enable broswer notifications permission to continue!!!";
            }
        }

        if (errMsg) {
            Swal.fire({
                title: 'Browser Notifications',
                text: errMsg,
                icon: 'warning'
            })
            return false
        } 
        else return true;
    }
</script>


<style scoped>   
</style>