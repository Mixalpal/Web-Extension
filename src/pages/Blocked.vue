<script setup lang="ts">
import { onMounted, onUpdated } from 'vue';

const siteList = ref(['first', 'second']);
const siteEdit = ref(true);
const siteString = ref('');

const fetchList = async () => {
  //siteList.value = await browser.storage.local.get(['tymelyBlockedSites']);

  browser.storage.sync.get(["tymelyBlockedSites"])
}

onMounted(async () => {
  //await fetchList();
})

onUpdated(async () => {
  await fetchList();  
})

const handleAddClick = () => {
  siteEdit.value = false;
  // siteList.value.push(url);
  // browser.storage.local.set('tymely-blocked-sites', siteList);
}

const saveSite = async () => {
  siteEdit.value = true;
  if (siteList.value.length === 0) {
    siteList.value = [siteString.value]
  } else {
    siteList.value.push(siteString.value);
  }

  await browser.storage.sync.set({ tymelyBlockedSites: siteString.value });
  siteEdit.value = false;
  
  await fetchList();
}


</script>

<template>
  <div style="width: 100%">
    Blocked
    <div class="blocked-sites-list">
      <div v-for="site in siteList"
        v-bind="site.indexOf"
       class="site-item">
        <h3>{{site}}</h3>
        <img class="delete-icon" src="./../assets/delete.png">
      </div>
      <input v-model="siteString" class="site-item-input" type='text' 
      @blur="saveSite"
      :disabled="siteEdit"/>
    </div>
    <div class="add-circle"
      @click="handleAddClick">

    </div>
  </div>
</template>

<style>
.add-circle {
  width: 60px;
  height: 60px;
  background-color: aqua;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.blocked-sites-list {
  width: 100%;
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
