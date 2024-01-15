<script setup lang="ts">
//import { storageDemo } from '~/logic/storage'

const time = ref('0 ч. 0 мин.')

const handleButtonClick = () => {
  localStorage.setItem('tymely-on', JSON.stringify(false));
  window.open('https://vk.com')
}
</script>

<template>
  <div class="background">
    <div class="wrapper">
      <h1>Вы уверены, что хотите посетить этот сайт?</h1>
      <a style="margin:auto;" @click="handleButtonClick"><div class="button"><p style='margin: 10px'>Перейти на сайт</p></div></a>
      <h3>Расширение автоматически отключится</h3>
      <h3>За эту сессию вы работали {{ time }}</h3>
    </div>
    
  </div>
  
</template>

<style scoped>
html, body {
  height: 100%;
  min-height: 100%;
}

h1 {
  font-size: 46pt;
  font-weight: bolder;
  color: #4462bb;
  line-height: 1.5em;
  height: 3em;
  text-align: center;
}

.background {
  background-color: #fffaeb;
  margin: 0;
  padding: 0;
  height: 100%;
}

.wrapper {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 60%;
}

.button {
  background-color: #4462bb;
  width: fit-content;
  margin: auto;
  height: 40px;
  width: 220px;
  border-radius: 15px;
}

.button:hover {
  cursor: pointer;
}

h3 {
  font-weight: bold;
  font-size: 10pt;
  text-align: center;
}

p {
  font-weight: bold;
  font-size: 16pt;
  text-align: center;
  color: #fffaeb;
}
</style>