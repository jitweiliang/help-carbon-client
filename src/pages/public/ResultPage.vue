
<template>
    <!-- https://codepen.io/seebrosky/pen/xLzKOV -->
    <!-- https://codepen.io/fosmont/pen/oNbOQWd -->

    <div class="container pm-certificate-container">
        <div class="outer-border"></div>
        <div class="inner-border"></div>
    
        <div class="pm-certificate-border col-xs-12">
            <div class="row pm-certificate-header">
                <div class="pm-certificate-title cursive col-xs-12 text-center text-primary">
                  <h2>HELP Carbon Emission Achievement</h2>
                </div>
            </div>

            <div class="row pm-certificate-body">        
                <div class="pm-certificate-block">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                            <div class="pm-certificate-name underline margin-0 col-xs-8 text-center">
                            <span class="pm-name-text bold">{{ emission.userName }}</span>
                            </div>
                            <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                        </div>
                    </div>          

                    <div class="col-xs-12"> 
                        <div class="row">
                            <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                            <div class="pm-earned col-xs-8 text-center">
                            <span class="pm-earned-text padding-0 block cursive">has achieved</span>
                            <span class="pm-credits-text block bold sans fs-2">
                                {{emission.totalEmission}}
                            </span>
                            </div>
                            <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                            <div class="col-xs-12"></div>
                        </div>
                    </div>
                    
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                            <div class="pm-course-title col-xs-8 text-center block cursive">
                                <!-- <span class="pm-earned-text block cursive">while completing the training course entitled</span> -->
                                <div class="row">
                                    <div class="col-4">
                                        Household
                                    </div>
                                    <div class="col-4">
                                        Transportation
                                    </div>
                                    <div class="col-4">
                                        Food
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                        </div>
                    </div>

                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                            <div class="pm-course-title underline bold col-xs-8 text-center">
                              <div class="row">
                                <div class="col-4">
                                  {{ emission.household }}
                                </div>
                                <div class="col-4">
                                  {{ emission.transportation }}
                                </div>
                                <div class="col-4">
                                  {{ emission.food }}
                                </div>
                              </div>
                              <!-- <span class="pm-credits-text block bold sans">BPS PGS Initial PLO for Principals at Cluster Meetings</span> -->
                            </div>
                            <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                        </div>
                    </div>
                </div>       
                
                <div class="col-xs-12">
                    <div class="pm-certificate-footer">
                        <div class="col-xs-4 pm-certified col-xs-4 text-center">
                            <span class="pm-credits-text block sans">{{ emission.submittedDate }}</span>
                            <span class="pm-empty-space block underline"></span>
                            <span class="bold block">HELP School of IT, Subang 2</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container text-center">
        <div>
            <s-facebook :share-options="shareOptions" :use-native-behavior="false">
              <span>
                  <i class="bi bi-facebook h1"></i>
              </span>
            </s-facebook>
            <s-twitter :share-options="shareOptions" :use-native-behavior="false">
                <span>
                    <i class="bi bi-twitter h1"></i>
                </span>
          </s-twitter>
        </div>   
    </div>

    <!-- ================= F L O A T I N G   A C T I O N  B A R ================-->
    <!-- <div class="fab-container">
      <div class="fab shadow">
          <div class="fab-content">
              <span><i class="bi bi-share"></i></span>
          </div>
      </div>
      <div class="sub-button shadow">
          <s-facebook :share-options="shareOptions" :use-native-behavior="false">
                <span>
                    <i class="bi bi-facebook h1"></i>
                </span>
          </s-facebook>
      </div>
      <div class="sub-button shadow">
        <s-twitter :share-options="shareOptions" :use-native-behavior="false">
                <span>
                    <i class="bi bi-twitter h1"></i>
                </span>
          </s-twitter>
      </div>
    </div> -->
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    import { useRoute } from 'vue-router'
    import { useEmissionStore } from '@/stores/EmissionStore'

    import { SFacebook, STwitter, SWhatsApp} from 'vue-socials'

    const emission = ref({})
    const emissionStore = useEmissionStore()
    const route = useRoute()

    const shareOptions = ref({
        url: `https://carbon-project-9a417.web.app/result?id=${route.query.id}`,
        title: 'HELP Carbon Emission Achievements',
        image: "https://storage.googleapis.com/carbon-project-9a417.appspot.com/profile_08096.png"
    })

    
    onMounted(async () => {
        const params = route.query

        await emissionStore.retrieveById(params.id)
        emission.value = emissionStore.getEmission
    })
</script>

<style scoped>
    @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-stretch: normal;
    src: url(https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf) format('truetype');
    }
    @font-face {
    font-family: 'Pinyon Script';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/pinyonscript/v21/6xKpdSJbL9-e9LuoeQiDRQR8WOXaPw.ttf) format('truetype');
    }
    @font-face {
    font-family: 'Rochester';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/rochester/v22/6ae-4KCqVa4Zy6Fif-UC2FHS.ttf) format('truetype');
    }

    .cursive {
      font-family: 'Pinyon Script', cursive;
    }
    .sans {
      font-family: 'Open Sans', sans-serif;
    }
    .bold {
      font-weight: bold;
    }
    .block {
      display: block;
    }
    .underline {
      border-bottom: 1px solid #777;
      padding: 5px;
      margin-bottom: 15px;
    }
.margin-0 {
  margin: 0;
}
.padding-0 {
  padding: 0;
}
.pm-empty-space {
  height: 40px;
  width: 100%;
}
body {
  padding: 20px 0;
  background: #ccc;
}
.pm-certificate-container {
  position: relative;
  width: 800px;
  height: 600px;
  background-color: #618597;
  padding: 30px;
  color: #333;
  font-family: 'Open Sans', sans-serif;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  /*background: -webkit-repeating-linear-gradient(
    45deg,
    #618597,
    #618597 1px,
    #b2cad6 1px,
    #b2cad6 2px
  );
  background: repeating-linear-gradient(
    90deg,
    #618597,
    #618597 1px,
    #b2cad6 1px,
    #b2cad6 2px
  );*/
}
.pm-certificate-container .outer-border {
  width: 794px;
  height: 594px;
  position: absolute;
  left: 50%;
  margin-left: -397px;
  top: 50%;
  margin-top: -297px;
  border: 2px solid #fff;
}
.pm-certificate-container .inner-border {
  width: 730px;
  height: 530px;
  position: absolute;
  left: 50%;
  margin-left: -365px;
  top: 50%;
  margin-top: -265px;
  border: 2px solid #fff;
}
.pm-certificate-container .pm-certificate-border {
  position: relative;
  width: 720px;
  height: 520px;
  padding: 0;
  border: 1px solid #E1E5F0;
  background-color: #ffffff;
  background-image: none;
  left: 50%;
  margin-left: -360px;
  top: 50%;
  margin-top: -260px;
}
.pm-certificate-container .pm-certificate-border .pm-certificate-block {
  width: 650px;
  height: 200px;
  position: relative;
  left: 50%;
  margin-left: -325px;
  top: 70px;
  margin-top: 0;
}
.pm-certificate-container .pm-certificate-border .pm-certificate-header {
  margin-bottom: 10px;
}
.pm-certificate-container .pm-certificate-border .pm-certificate-title {
  position: relative;
  top: 40px;
}
.pm-certificate-container .pm-certificate-border .pm-certificate-title h2 {
  font-size: 34px !important;
}
.pm-certificate-container .pm-certificate-border .pm-certificate-body {
  padding: 20px;
}
.pm-certificate-container .pm-certificate-border .pm-certificate-body .pm-name-text {
  font-size: 20px;
}
.pm-certificate-container .pm-certificate-border .pm-earned {
  margin: 15px 0 20px;
}
.pm-certificate-container .pm-certificate-border .pm-earned .pm-earned-text {
  font-size: 20px;
}
.pm-certificate-container .pm-certificate-border .pm-earned .pm-credits-text {
  font-size: 15px;
}
.pm-certificate-container .pm-certificate-border .pm-course-title .pm-earned-text {
  font-size: 20px;
}
.pm-certificate-container .pm-certificate-border .pm-course-title .pm-credits-text {
  font-size: 15px;
}
.pm-certificate-container .pm-certificate-border .pm-certified {
  font-size: 12px;
}
.pm-certificate-container .pm-certificate-border .pm-certified .underline {
  margin-bottom: 5px;
}
  .pm-certificate-container .pm-certificate-border .pm-certificate-footer {
    width: 650px;
    height: 100px;
    position: relative;
    left: 50%;
    margin-left: -325px;
    bottom: -105px;
  }

  .fab-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  position: absolute;
  bottom: 30px;
  right: 30px;
}
.fab-container:hover {
  height: 100%;
}
.fab-container:hover .sub-button:nth-child(2) {
  transform: translateY(-80px);
}
.fab-container:hover .sub-button:nth-child(3) {
  transform: translateY(-140px);
}
.fab-container:hover .sub-button:nth-child(4) {
  transform: translateY(-200px);
}
.fab-container:hover .sub-button:nth-child(5) {
  transform: translateY(-260px);
}
.fab-container:hover .sub-button:nth-child(6) {
  transform: translateY(-320px);
}
.fab-container .fab {
  position: relative;
  height: 70px;
  width: 70px;
  background-color: #4ba2ff;
  border-radius: 50%;
  z-index: 2;
}
.fab-container .fab::before {
  content: " ";
  position: absolute;
  bottom: 0;
  right: 0;
  height: 35px;
  width: 35px;
  background-color: inherit;
  border-radius: 0 0 10px 0;
  z-index: -1;
}
.fab-container .fab .fab-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.fab-container .fab .fab-content .material-icons {
  color: white;
  font-size: 48px;
}
.fab-container .sub-button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
  /* background-color: #4ba2ff; */
  border-radius: 50%;
  transition: all 0.3s ease;
}
.fab-container .sub-button:hover {
  cursor: pointer;
}
.fab-container .sub-button .material-icons {
  color: white;
  padding-top: 6px;
}
</style>