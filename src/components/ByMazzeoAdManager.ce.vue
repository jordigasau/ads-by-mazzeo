<template>
  <div ref="display" class="container" style="background-color: black;">
      <div class="column" style="justify-self: start;">
        top-lefty
      </div>
      <div class="column" style="justify-self: end;">
        top-right
      </div>
      <div class="column content" style="">
           <h1>Streaming satellites a la Mirona</h1>
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

const backgroundImage = "url('https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"

</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

h1{
  font-family: 'Roboto', sans-serif;
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
  grid-template-rows: 1fr auto 1fr;
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
}

.btn{
  padding:10px 20px;
  border-radius: 20px;
  border: none;
  background-color: white;
  color:black;
}


</style>
