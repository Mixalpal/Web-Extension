<script setup lang="ts">
import { onMounted, onUpdated } from 'vue';
import { sendMessage, onMessage } from 'webext-bridge/popup';

const siteListStorageKey = 'tymelyBlockedSites1';
const siteList = ref<string[]>([""]);
const siteEdit = ref(false);
const siteString = ref('');

const fetchList = async () => {
  //siteList.value = await browser.storage.local.get(['tymelyBlockedSites']);
  let list = localStorage.getItem(siteListStorageKey);
  console.log(list)
  if (list === undefined || list === null) {
    siteList.value = [];
    return;
  }
  siteList.value = JSON.parse(list);
  console.log(siteList.value)
}

onMounted(async () => {
  await fetchList();
  await sendMessage('change-site-list', JSON.stringify(siteList.value), 'background')
})

onUpdated(async () => {
  await fetchList();  
})

const handleDeleteClick = (site : string) => {
  siteList.value = siteList.value.filter((e) => {e !== site});
  localStorage.setItem(siteListStorageKey, JSON.stringify(siteList.value));
}

const handleAddClick = () => {
  siteEdit.value = true;
  // siteList.value.push(url);
  // browser.storage.local.set('tymely-blocked-sites', siteList);
  
}

const saveSite = async () => {
  siteEdit.value = true;
  if (siteString.value.length === 0) {
    return
  } else {
    siteList.value.push(siteString.value);
    localStorage.setItem(siteListStorageKey, JSON.stringify(siteList.value))
    await sendMessage('change-site-list', JSON.stringify(siteList.value), 'background')
    siteString.value = "";
  }

  siteEdit.value = false;
  
  
  await fetchList();
}

onMessage('get-status', async() => {
  
  const status = JSON.parse(localStorage.getItem('tymely-on')!);
  console.log(`got ${status}`)
  sendMessage('set-status', JSON.stringify(status), 'background')
}) 
</script>

<template>
  <div style="width: 100%">
    <div class="blocked-sites-list">
      <div v-for="site in siteList"
        
       class="site-item">
        <h3>{{site}}</h3>
        <img class="delete-icon" src="./../assets/delete.png" @click="handleDeleteClick(site)">
      </div>
      <input v-model="siteString" class="site-item-input" type='text' 
      @blur="saveSite"
      :disabled="!siteEdit"/>
    </div>
    <img class="add-circle"
      src="./../assets/add.png"
      @click="handleAddClick"/>

  </div>
</template>

<style>
.add-circle {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.blocked-sites-list {
  width: 100%;
  scroll-behavior: auto;
}

.site-item {
  display: flex;
  justify-content: space-between;
  width: auto;
  margin-top: 6px;
  background-color: darkgrey;
}

.site-item-input {
  width: auto;
  margin-top: 6px;
  background-color: darkgrey;
}

.site-item-input:disabled {
  display: none;
}

</style>
