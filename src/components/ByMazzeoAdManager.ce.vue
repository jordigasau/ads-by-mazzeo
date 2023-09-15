<template>
  <div class="ads">
    hello ad manager {{ text }}
    <input type="text" v-model="text">
  </div>
  
</template>
<script setup>
import { ref } from 'vue';

const text = ref('')
</script>

<style>
.ads{
  background-color: black; 
  color:white;
  min-height: 88px;
}</style>