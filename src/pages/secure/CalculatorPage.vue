<!-- https://vue3-form-wizard-document.netlify.app/demos/#with-font-awsome-icon -->
<template>
    <div class="p-3">
        <div class="row">
            <header class="header bg-white shadow align-self-end py-1 px-xl-5 w-100">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start fw-bold ribbon-box">
                            <p class="ribbon-big ribbon-primary">Emission Calculator</p>
                        </div>
                        <div class="col-md-6 text-center text-md-end text-gray-400">
                            <button type="button" class="btn btn-primary" @click="check">check</button>
                        </div>
                    </div>
                </div>
            </header>
        </div>

        <!-- https://www.climatestewards.org/offset/ -->

        <div class="my-3 p-3 bg-white rounded box-shadow vl-parent">
            <loading :active="isLoading" :is-full-page="false" />

            <div class="row">
                <div class="col-12">
                    <form-wizard @on-complete="onComplete" shape="tab" color="#9b59b6">                        
                        <!-- ===================================================================== -->
                        <tab-content icon="bi bi-house" title="Home" :before-change="()=>beforeTabSwitch(1)">
                            <div class="container p-3">
                                <div class="col-12 text-center pt-3">
                                    <h4>Household Carbon Footprint Calculator</h4>
                                </div>
                                <div class="container border row mt-3 pt-5 mx-3">
                                    <div class="row pt-3">
                                    <div class="form-label mb-3 col-12 col-md-6">
                                        <label for="electricity">Electricity (kWh):</label>
                                        <input type="number" min="0" class="form-control" id="electricity" v-model="household.electricity">
                                    </div>
                                    <div class="form-label col-12 col-md-6">
                                        <label for="propane">Propane (litres):</label>
                                        <input type="number" min="0" class="form-control" id="propane" name="propane" v-model="household.propane">
                                    </div>
                                </div>
                                <div class="row pt-3">
                                    <div class="form-label mb-3 col-12 col-md-6">
                                        <label for="heatingoil">Heating Oil (litres):</label>
                                        <input type="number" min="0" class="form-control" id="heatingoil" name="heatingoil" v-model="household.heatingoil">
                                    </div>
                                    <div class="form-label col-12 col-md-6">
                                        <label for="coal">Coal (kWh):</label>
                                        <input type="number" min="0" class="form-control" id="coal" name="coal" v-model="household.coal">
                                    </div>
                                </div>
                                <div class="row pt-3">
                                    <div class="form-label mb-3 col-12 col-md-6">
                                        <label for="lpg">Liquedied Petroleum Gas (litres):</label>
                                        <input type="number" min="0" class="form-control" id="lpg" name="lpg" v-model="household.lpg">
                                    </div>
                                    <div class="form-label col-12 col-md-6">
                                        <label for="gas">Natural Gas (kWh):</label>
                                        <input type="number" min="0" class="form-control" id="gas" name="gas" v-model="household.gas">
                                    </div>
                                </div>
                                <div class="col-12 py-4 text-center">
                                    <span class="align-middle">
                                        <button type="button" class="btn btn-outline-primary" @click="calcHousehold()">Calculate Household Footprint</button>
                                    </span>
                                </div>
                                <div class="col-12 text-center">
                                    <span class="align-items-middle justify-content-middle flex">
                                        <!-- {{ household.getTotal() }} -->
                                        <label class="border display-5 mb-2">{{ household.total }}</label><h4>kg C02^e</h4>
                                    </span>
                                </div>

                                </div>
                            </div>
                        </tab-content>

                        <!-- ===================================================================== -->
                        <tab-content icon="bi bi-car-front" title="Transportation" :before-change="()=>beforeTabSwitch(2)">
                            <div class="container p-3">
                                <div class="col-12 text-center pt-3">
                                    <h4>Transportation Carbon Emission</h4>
                                </div>
                                <div class="container border row mt-3 pb-3 mx-3">
                                    <div class="col-12 col-md-6 p-4">
                                        <div class="text-center pb-2">
                                            <h5>Car 1</h5>
                                        </div>
                                        <div class="form-label mb-4">
                                            <label for="car1">Car Type:</label>
                                            <select class="form-select" v-model="transportation.type1" aria-label="Default select example" id="car1" name="car1">
                                                <option :value=0 selected>No Car</option>
                                                <option :value=1>Small Car</option>
                                                <option :value=2>Medium Car</option>
                                                <option :value=3>SUV</option>
                                                <option :value=4>Van</option>
                                                <option :value=5>Truck</option>
                                            </select>                        
                                        </div>
                                        <div class="form-label mb-4">
                                            <label for="car1">Fuel Type:</label>
                                            <select class="form-select" v-model="transportation.fuel1" :disabled="transportation.type1 == 0" aria-label="Default select example" id="fuel1" name="fuel1">
                                                <option :value=0 selected>N/A</option>
                                                <option :value=4>Petrol</option>
                                                <option :value=3>Diesel</option>
                                                <option :value=2>Hybrid</option>
                                                <option :value=1>Electric</option>                                    
                                            </select>                                                    
                                        </div>
                                        <div class="form-label mb-4">
                                            <label for="gas">Distance driven Daily (km):</label>
                                            <input type="number" v-model="transportation.distance1" :disabled="transportation.type1 == 0" class="form-control" id="distance1" name="distance1">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 p-4">
                                        <div class="text-center pb-2">
                                            <h5>Car 2</h5>
                                        </div>
                                        <div class="form-label mb-4">
                                            <label for="car1">Car Type:</label>
                                            <select class="form-select" v-model="transportation.type2" aria-label="Default select example" id="car2" name="car2">
                                                <option :value=0 selected>No Car</option>
                                                <option :value=1>Small Car</option>
                                                <option :value=2>Medium Car</option>
                                                <option :value=3>SUV</option>
                                                <option :value=4>Van</option>
                                                <option :value=5>Truck</option>
                                            </select>
                                        </div>
                                        <div class="form-label mb-4">
                                            <label for="fuel1">Fuel Type</label>
                                            <select class="form-select" v-model="transportation.fuel2" :disabled="transportation.type2 == 0" aria-label="Default select example" id="fuel2" name="fuel2">
                                                <option :value=0 selected>N/A</option>
                                                <option :value=4>Petrol</option>
                                                <option :value=3>Diesel</option>
                                                <option :value=2>Hybrid</option>
                                                <option :value=1>Electric</option>                                    
                                            </select>
                                        </div>
                                        <div class="form-label mb-4">
                                            <label for="gas">Daily distance (km)</label>
                                            <input type="number" v-model="transportation.distance2" :disabled="transportation.type2 == 0" class="form-control" id="gas2" name="gas2">
                                        </div>
                                    </div>

                                    <div class="col-12 py-4 text-center">
                                        <span class="align-middle">
                                            <button type="button" class="btn btn-outline-primary" @click="calcTransportation()">Calculate Transportation Footprint</button>
                                        </span>
                                    </div>
                                    <div class="col-12 text-center">
                                        <span class="align-middle">
                                            <label class="border display-5 mb-2">{{ transportation.total }}</label><h4>kg C02^e</h4>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </tab-content>

                        <!-- ===================================================================== -->
                        <tab-content icon="bi bi-egg-fried" title="Food" :before-change="()=>beforeTabSwitch(3)">
                            <div class="container p-3">
                                <div class="col-12 text-center pt-3">
                                    <h4>Food Consumption Carbon Emission</h4>
                                </div>
                                <div class="container border p-2">
                                    <div class="col-8 p-4">
                                        <div class="mb-4">
                                            <label class="form-label" for="meat" >Meat consumed Daily (Servings):</label>
                                            <input class="form-control" type="number" v-model="food.meat" id="meat" name="meat">
                                        </div>
                                        <div class="mb-4">
                                            <label class="form-label" for="vegetables">Vegetables consumed Daily (Servings):</label>
                                            <input class="form-control" type="number" v-model="food.vegetables" id="vegetables" name="vegetables">                     
                                        </div>
                                        <div class="mb-4">
                                            <label class="form-label" for="fruits">Fruits consumed Daily (Servings):</label>
                                            <input class="form-control" type="number" v-model="food.fruits" id="fruits" name="fruits">                       
                                        </div>
                                        <div class="mb-4">
                                            <label class="form-label" for="junk">Snacks/Junk Food consumed Daily (Servings):</label>
                                            <input class="form-control" type="number" v-model="food.snacks" id="junk" name="junk">
                                        </div>
                                    </div>
                                    
                                    <div class="col-12 py-3 text-center">
                                        <span class="align-middle">
                                            <button type="button" class="btn btn-outline-primary" @click="calcFood()">Calculate Food Footprint</button>
                                        </span>
                                    </div>
                                    <div class="col-12 text-center">
                                        <span class="align-middle">
                                            <label class="border display-6 mb-2">{{ food.total }}</label><h4>kg C02^e</h4>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </tab-content>
                    </form-wizard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useToast } from 'vue-toastification' 
    import { useUserStore } from '@/stores/UserStore'
    import { useEmissionStore } from '@/stores/EmissionStore'

    import Loading from 'vue-loading-overlay'
    import Swal from 'sweetalert2'

    const userStore = useUserStore()
    const toast = useToast()
    const emissionStore = useEmissionStore()    
    const isLoading = ref(false)


    // -- initialize models (household / transportation / food)
    const household = ref({
        electricity: 0,
        propane: 0,
        heatingoil: 0,
        coal: 0,
        lpg: 0,
        gas: 0,
        total: 0
    })
    const transportation = ref({
        type1: 0,
        fuel1: 0,
        distance1: 0,
        type2: 0,
        fuel2: 0,
        distance2: 0,
        total: 0
    })
    const food = ref({
        meat: 0,
        vegetables: 0,
        fruits: 0,
        snacks: 0,
        total: 0
    })


    // -- Check that all fields are manip-ed before allowing page swap
    function beforeTabSwitch(pageNum) {
        var isReady;

        switch (pageNum) {
            case 1:
                isReady = household.value.total > 0
                break;
            case 2:
                isReady = transportation.value.total > 0
                break;
            case 3:
                isReady = food.value.total > 0
                break;
        }

        if (!isReady) {
            toast.warning('Missed an input!',{
                position: "top-center",
                timeout: 3000,
                closeOnClick: true,
            })
            return false
        }
        return true;
     }

    function calcHousehold() {
        household.value.total = household.value.electricity * 600 + household.value.propane * 1200 + household.value.heatingoil * 600
                        + household.value.coal * 2000 + household.value.lpg * 1100 + household.value.gas * 1300
        toast.success("Calculation Finished!");
    }
    function calcTransportation() {
        transportation.value.total = (transportation.value.type1 * transportation.value.fuel1 * 0.8 * transportation.value.distance1 * 0.75)
                                    + (transportation.value.type2 * transportation.value.fuel2 * 0.8 * transportation.value.distance2 * 0.75);
        transportation.value.total = parseInt(transportation.value.total)

        toast.success("Calculation Finished!");
    }
    function calcFood() {
        food.value.total = (food.value.meat * 50) + (food.value.vegetables * 15) + (food.value.fruits * 15) + (food.value.snacks * 125);
        toast.success("Calculation Finished!");
    }


    async function onComplete() {        
        try {
            isLoading.value = true
            const user = userStore.getUser

            // -- build vm
            let vm = {
                userId          : user.userId,
                userName        : user.userName,
                household       : household.value.total,
                transportation  : transportation.value.total,
                food            : food.value.total,
                totalEmission   : household.value.total + transportation.value.total + food.value.total
            }

            await emissionStore.postResult(vm)
            if(emissionStore.lastEmissionId > 0) {
                window.open(`/result?id=${emissionStore.lastEmissionId}`)
            }

            // --- reset current page data
            window.location.reload()
        }
        catch(err) {
            Swal.fire({
                    title: "Emission Calculator Submission Error",
                    text: err,
                    icon: 'warning'
                })
        }
        finally {
            isLoading.value = false
        }
    }
</script>

<style scoped></style>