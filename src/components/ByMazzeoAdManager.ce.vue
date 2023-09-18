<template>
  <div ref="display" class="display">
    <div class="row">
      <div class="column start">      
        {{ width }} {{ height }}      
      </div>
      <div class="column middle">Dimarts 15</div>
      <div class="column end">Sala Gran</div>
    </div>
    <div class="row">
      <div class="column">
        <h1> Maya Nui a l'Auditori de Girona</h1>
      </div>
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

const backgroundImage = " url('http://localhost:3000/music.jpg')"

</script>

<style lang="css">
.display{
  margin:0px;

  color:white;
  background-color: aquamarine;
  height: 100%;
  width: 100%;
  min-height: 20vh;
  background: no-repeat center center fixed; 
  background-image: v-bind(backgroundImage);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}
.row{
    display: flex;
  flex-wrap: wrap;
}
.column {
  flex: 25%;
  margin:5px;
  align-content: end;
}

.middle{
  text-align: center;
}

.end{
  text-align: right;
}



</style>
