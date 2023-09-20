<template>
  <div ref="display" class="container" style="background-color: black;">
      <div class="column" style="justify-self: start;">
        ads
      </div>
      <div class="column" style="justify-self: end;">
        
      </div>
      <div class="column content" style="">
           <h1>Streaming Satellites</h1>
           <h3>23 Novembre 2023, La Mirona, Salt</h3>
        </div>
      <div class="column" style="justify-self: start; align-self:end;">
         bottom-left
      </div>
      <div class="column" style="justify-self: end; align-self:end;">
        <button class="btn">Comprar entrades</button>
      </div>
      

  </div>
  
</template>
<script setup>

import { onMounted,ref,computed } from 'vue';

const rect = ref(null)
const display = ref(null)
onMounted(() => {
  window.addEventListener('resize', getDimensions);
  rect.value = display.value.getBoundingClientRect()
});

const getDimensions = () => { 
  rect.value = display.value.getBoundingClientRect()
}

const width = computed(() => {
  if (rect.value) {
  return parseInt(rect.value.width)
  }
  return 0
  
})

const height = computed(() => { 
  if (rect.value) {
    return parseInt(rect.value.height)
  }
  return 0
})

const backgroundImage = "url('https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"

</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Skranji&display=swap');

h1{
  font-family: 'Skranji', cursive;
}
a{
  color: aliceblue;
}


.container{
  background-image:  v-bind(backgroundImage) ;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Roboto', sans-serif;
  display: grid;
  aspect-ratio: 3 / 2;
  max-width: 1200px;
  grid-template-rows: 10% auto 10%;
  grid-template-columns: 1fr 1fr ;
  background-color: black;
  

  grid-auto-rows: 150px;
  color:white;
}

.content{
  grid-column-start: 1;
  grid-column-end: 3;
  align-self:center;
  justify-self: center;
}

.column{
  padding:30px;
}

h1{
  margin:0;
  font-size: 8vw;
  line-height: 1em;
}

.btn{
  padding:10px 20px;
  border-radius: 20px;
  border: none;
  background-color: white;
  color:black;
}


</style>
