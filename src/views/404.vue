<template>
  <v-container fluid class="page-not-found pa-0"></v-container>  
</template>

<style scoped>
.page-not-found {
  height: 82vh;
  background-image: url('../assets/404.svg');  
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #e9fdff;
}
.inner {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 75px;
}
@media (max-width: 960px) {
  .page-not-found { height: 83.3vh; }  
}
</style>