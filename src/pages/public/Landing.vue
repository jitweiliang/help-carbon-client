<template>
    <nav class="navbar navbar-expand-lg pt-2 sticky-top">
        <div class="container-fluid">
            <img src="@/assets/terra.svg" alt="" width="50" height="65">
            <h3>My Terra Carbon</h3>
            <p style="">0.0.2</p>

            <div class="d-flex flex-grow-1">
                <span class="w-100 d-lg-none d-block">
                    <!-- hidden spacer to center brand on mobile --></span>
                <div class="w-100 text-right">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar7">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>

            <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar7">
                <ul class="navbar-nav ms-auto flex-nowrap">
                    <li class="nav-item">
                        <a href="#section0" class="nav-link" v-smooth-scroll>Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="#section1" class="nav-link" v-smooth-scroll>About Us</a>
                    </li>
                    <li class="nav-item">
                        <a href="#section2" class="nav-link" v-smooth-scroll>Resources</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="pt-3">
        <section id="section0">
            <div class="row d-flex justify-content-center">
                <div class="col-10">
                    <div class="row">
                        <div class="col-12 col-md-4 col-lg-6">
                            <div class="container">
                                <router-view name="leftView"></router-view>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-6">
                            <div class="container">
                                <router-view name="rightView"></router-view>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </section>        

        <section id="section1">
            <div class="col-12">
                <div class="container pt-5">
                    <div class="row p-5 parallax">
                        <router-view name="detailsView"></router-view>
                    </div>
                </div>
            </div>
        </section>

        <section id="section2">
            <div class="col-12">
                <div class="container pt-5">
                    <router-view name="resourceView"></router-view>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
</script>

<style scoped>
    a {
        font-size: 1.35rem;
        font-weight: 600;
    }

    /* https://www.w3schools.com/howto/howto_css_parallax.asp */
    .parallax {
        background-image: url("@/assets/rainforest_background.jpg");
        min-height: 500px;

        /* Create the parallax scrolling effect */
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .navbar {
        background-color: #AAAAAA;
    }
</style>