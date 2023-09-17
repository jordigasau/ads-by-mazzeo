<template>
  <div class="ads" style="text-align: center;">
    ByMazzeo mola més que {{ text }} <input type="text" v-model="text">
  </div>
  
</template>
<script setup>
import {ref} from 'vue'
const text = ref('')
</script>

<style>
.ads{
  background-color: black; 
  color:white;
}</style>