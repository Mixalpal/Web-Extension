<script setup lang="ts">
import { ref } from 'vue'
import { onMessage, sendMessage } from 'webext-bridge/background';
import Blocked from './../pages/Blocked.vue'
import Pomodoro from './../pages/Pomodoro.vue'
import Settings from './../pages/Settings.vue'
import Stats from './../pages/Stats.vue'

enum Pages {
  blocked,
  pomodoro,
  settings,
  stats,
}

const activeTab = ref(Pages.blocked)
// const activeTab = computed(() => {activeTabPage.value})

const handleTabChange = (page: Pages) => {
  activeTab.value = page
}

onMessage('get-status', async() => {
  
  const status = JSON.parse(localStorage.getItem('tymely-on')!);
  console.log(`got ${status}`)
  sendMessage('set-status', status, 'background')
}) 
</script>

<template>
  <div id="popup-content" class="popup-content">
    <div class="navbar">
      <div
        id="navbar-blocked"
        class="navbar-item"
        :class="{ selected: activeTab === Pages.blocked }"
        @click="handleTabChange(Pages.blocked)"
      >
        <img class="navbar-icon" src="./../assets/blocked.png">
      </div>
      <div
        id="navbar-pomodoro"
        class="navbar-item"
        :class="{ selected: activeTab === Pages.pomodoro }"
        @click="handleTabChange(Pages.pomodoro)"
      >
        <img class="navbar-icon" src="../assets/pomodoro.png">
      </div>
      <div
        id="navbar-settings"
        class="navbar-item"
        :class="{ selected: activeTab === Pages.settings }"
        @click="handleTabChange(Pages.settings)"
      >
        <img class="navbar-icon" src="../assets/settings.png">
      </div>
      <div
        id="navbar-stats"
        class="navbar-item"
        :class="{ selected: activeTab === Pages.stats }"
        @click="handleTabChange(Pages.stats)"
      >
        <img class="navbar-icon" src="../assets/stats.png">
      </div>
    </div>
    <div id="main-window" class="main-window">
      <Blocked v-if="activeTab === Pages.blocked" />
      <Pomodoro v-if="activeTab === Pages.pomodoro" />
      <Settings v-if="activeTab === Pages.settings" />
      <Stats v-if="activeTab === Pages.stats" />
    </div>
  </div>
</template>

<style>
body {
    width: 400px;
    height: 300px;
    margin: 0;
    padding: 0;
    background-color: rgba(253, 245, 230, 1);
}

.popup-content {
    display:flex;
    width: 100%;
    height: 300px;
    margin-bottom: 0;
}

.navbar {
    width: 17%;
    height: 300px;
    border-right: solid 1px black;
}

.navbar-item {
    border-bottom: solid 1px black ;
    display: flex;
    align-items: center;
}

.selected {
    background-color: #797372;
}

.navbar-icon {
    margin-left: auto;
    margin-right: auto;
    pointer-events: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
}

.main-window {
  width: 83%;
    padding: 6px;
}
</style>
