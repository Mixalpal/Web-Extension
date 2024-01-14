<script setup lang="ts">
type Props = {
    text: string;
    dataKey: string;
}
const props = defineProps<Props>()
const value = ref(false);

onMounted(async () => {
    value.value = JSON.parse(localStorage.getItem(props.dataKey)!)
})

const saveSetting = (event : any) => {
    console.log(JSON.stringify(value.value))
    localStorage.setItem(props.dataKey, JSON.stringify(value.value))
}
</script>

<template>
<div class="setting-item-container">
    <h1 class="text">{{ props.text }}</h1>
    <div class="checkbox-container">
        <input type="checkbox" name="checkbox" height="55px" v-model="value" @input="saveSetting"/>
    </div> 
</div>

</template>

<style>
.setting-item-container {
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;    
    align-items: center;
    border: solid 1px black;
    border-radius: 5px;
}

.text {
    width: 91%;
    font-weight: 700;
    margin-left: 10px;
    font-size: medium;
}

.checkbox-container {
    width: 9%;
}

input[type=checkbox] {
    transform: scale(1.4);
}
</style>