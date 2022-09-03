<template>
  <div id="app">
    <el-container>
      <el-header>用户管理</el-header>
      <!-- 操作区域 -->
      <el-main>
       <keep-alive>
        <MainPage></MainPage>
       </keep-alive>
      </el-main>
    </el-container>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MainPage from '@/pages/main/index.vue' 

export default {
  name: 'App',
  data(){
    return{
     
    }
  },
  components: {
    HelloWorld,
    MainPage
  },
  methods:{
    
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  .el-header, .el-footer {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  // .el-main {
  //   background-color: #E9EEF3;
  //   color: #333;
  //   text-align: center;
  //   line-height: 160px;
  // }
  
}
</style>
