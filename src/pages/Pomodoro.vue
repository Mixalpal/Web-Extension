<script setup lang="ts">
//const time = ref(new Date(0, 25, 0))
const timerStarted = ref(false)
const minutesleft = ref(24)
const secondsLeft = ref(59)
const rotation1 = ref(0)

const handleStart = () => {
  timerStarted.value = true
  localStorage.setItem('tymely-on', JSON.stringify(true))
  rotation1.value = 70;
  setInterval(() => {secondsLeft.value = secondsLeft.value - 1}, 1000)
}


</script>

<template>
  <div>
    <div style="height:50px"></div>
    <div class="wrapper" @click="handleStart"> 
      <div class="arc arc_start" @click="handleStart"></div> 
      <div class="arc arc_end" @click="handleStart"></div> 
      <div v-if="timerStarted" style="position: absolute;
  top: 40px;
  left: 32px;">
        <!-- <vue-countdown :time="25 * 60 * 1000" v-slot="{ minutes, seconds }">
          {{ minutes }} : {{ seconds }}
        </vue-countdown> -->
        {{ minutesleft }} : {{ secondsLeft }}
      </div>
      <div v-else class="arrow-right"></div>
      
    </div>  
  </div>
</template>

<style>
.wrapper {
   position:relative;
   left:25%;
   top: 50%;
   margin:20px;
}
.arc {
   position:absolute;
   top:0;
   left:0;
   width:100px;
   height:100px;
   border-radius:100%;
   border:2px solid;
}
.arc_start {
   border-color:transparent #4462bb #4462bb #4462bb;
   -webkit-transform: rotate(v-bind(rotation1));
   -moz-transform: rotate(v-bind(rotation1));
   -ms-transform: rotate(v-bind(rotation1));
   -o-transform: rotate(v-bind(rotation1));
   transform: rotate(v-bind(rotation1));
}
.arc_end {
   border-color:#4462bb #4462bb #4462bb transparent;
   -webkit-transform: rotate(75deg);
   -moz-transform: rotate(75deg);
   -ms-transform: rotate(75deg);
   -o-transform: rotate(75deg);
   transform: rotate(0deg);
}
.arrow-right {
  position: absolute;
  top: 32px;
  left: 40px;
  width: 0; 
  height: 0; 
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 24px solid #4462bb;
}
</style>