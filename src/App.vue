<template>
  <div id="app">
   	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style type="less">
#app{
    background-color: white;
    bottom: 0px;
    position: absolute;
    width: 100%;
    top: 0px;
    overflow-x: hidden;
}
</style>
