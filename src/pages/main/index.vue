<template>
  <div>
    <!-- 操作区域 -->
    <el-row :gutter="10">
      <!-- 新建内容 -->
      <el-col :span="2"><el-button @click="addData">新建</el-button></el-col>
      <!-- 按关键词搜索 -->
    <el-col :span="8">
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
      </el-col>
      <!-- 撤销 -->
    <el-col :span="2" :offset="16"><el-button>撤销</el-button></el-col>
  </el-row>
    <!-- 表格区域 -->
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
    prop="name"
      label="姓名"
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.name }}</template> -->
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="120">
    </el-table-column>
    <el-table-column
    prop="sex"
      label="性别"
      width="55"
      >
    </el-table-column>
    <el-table-column
      prop="tel"
      label="联系电话"
  >
    </el-table-column>
    <el-table-column
      label="详细地址"
      show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.addition+scope.row.address }}</template>
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 批量删除 -->
  <el-row >
      <el-col :span="4"><el-button @click="deleteMany">批量删除</el-button></el-col>
  </el-row>

  <!-- 弹出框 -->
  <el-dialog
  title="新建/编辑用户"
  :visible.sync="dialogVisible"
  width="40%"
>
  <!-- <span>这是一段信息</span> -->

  <!-- 表单 -->
  <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px">
  <el-row :gutter="20">
    <el-col :span="8">
      <el-form-item label="姓名"><el-input v-model="form.name"></el-input></el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="性别"><el-input v-model="form.sex"></el-input></el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="年龄"><el-input v-model="form.age"></el-input></el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-form-item label="联系电话"><el-input v-model="form.tel"></el-input></el-form-item>
    </el-col>
  </el-row>
      <el-form-item label="详细地址"  class="address">
        <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange"
      :placeholder="place"
      >
       </el-cascader>
       <el-input style="width:48%;margin-left: 1em;" placeholder="请输入详细地址" v-model="form.detail"></el-input>
  </el-form-item>
  
</el-form>
<!-- 表单 -->

<!-- 底部操作区 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import {regionData, CodeToText} from 'element-china-area-data'
export default {
  name: 'DemoIndex',

  data() {
    return {
      // 表格诗句
      tableData: [{
          name: '王小虎',
          age:'18',
          sex:'男',
          tel:'13141318577',
          address: '金沙江路 1518 弄',
          addition:'上海市普陀区'
        },
        {
          name: '王小虎',
          age:'18',
          sex:'男',
          tel:'13141318578',
          address: '金沙江路 1518 弄',
          addition:'上海市普陀区'
        }
      ],
        // 搜索按钮数据
        multipleSelection: [],
        restaurants: [],
        state1: '',
        state2: '',
        // 对话框
        dialogVisible: false,
        // 表单数据
        form: {
          // 名字
          name: '',
          // 性别
          sex: '',
          // 电话
          tel:'',
          // 详细地址
          detail:'',
          // 年龄
          age:''
        },
        // 表单提示文字位置
        labelPosition:'top',
        // 地址相关数据
        options: regionData,
      selectedOptions: [],
      addtions: {},
      detailAddress: '',
      // 显示省市区
      place: '',
      getMode: [],
      // 联级选择器的显示值
      place:'请选择',
      // 判断操作是增加还是编辑(0为增加,1为编辑)
      operate:0,
      operNum:0
    };
  },
  created(){
     //在页面加载时读取localStorage里的状态信息
     if (window.localStorage.getItem('list')) {
          //this.$store.replaceState()替换 store 的根状态
          // this.$store.replaceState(Object.assign({}, this.$store.state,
          // JSON.parse(window.localStorage.getItem('list'))))
          this.tableData=JSON.parse(window.localStorage.getItem('list'))
      }
          //在页面刷新时将vuex里的信息保存到localStorage里
          window.addEventListener('beforeunload', () => {
          window.localStorage.setItem('list', JSON.stringify(this.tableData))
      })
  },
  mounted() {
    this.restaurants = this.loadAll();
  },

  methods: {
    // 表格多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 搜索相关
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        // console.log(restaurants);
        // var results =queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        let results=[]
        restaurants.forEach(item=>{
          if(item.value.indexOf(queryString)!==-1){
            results.push(item)
          }
        })
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        // console.log(queryString);
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        let suggest=[]
        this.tableData.forEach(item=>{
          let obj={"value":item.name+item.tel+item.addition+item.address}
          suggest.push(obj)
        })
        return suggest
      },
      handleSelect(item) {
        this.tableData.forEach(data=>{
          if(data.tel===item.value){
            console.log(data);
          }
        })
      },
      // 编辑操作
      handleClick(index,row) {
        this.operate=1
        this.operNum=index
        this.dialogVisible=true
        this.place=row.addition
        this.form={
          name:row.name,
          sex:row.sex,
          tel:row.tel,
          detail:row.address,
          age:row.age
        }
      },
      // 弹框关闭
      
      // 提交表单
      onSubmit() {
        // 如果是新建
        if(this.operate===0){
          this.tableData.unshift({
            name:this.form.name,
            age:this.form.age,
            sex:this.form.sex,
            tel:this.form.tel,
            address:this.form.detail,
            addition:this.addtions.names
          })
        }else{
          this.tableData[this.operNum].name=this.form.name
          this.tableData[this.operNum].age=this.form.age
          this.tableData[this.operNum].sex=this.form.sex
          this.tableData[this.operNum].tel=this.form.tel
          this.tableData[this.operNum].address=this.form.address
          this.tableData[this.operNum].addition=this.addtions.names
        }
       
        this.dialogVisible = false
        // console.log(this.form);
        // console.log('submit!');
      },
      // 详细地址改变
      handleChange (value) {
      // 我们选择地址后，selectedOptions 会保存对应的区域码，例如北京的区域码为'110000'
      // 我们要取出区域码对应的汉字，就需要用CodeToText(区域码)进行输出
      this.addtions.selectedOptions = value
      var name = ''
      this.selectedOptions.map(item => { name += CodeToText[item]})
        // 省市区地址
      this.addtions.names = name
    },
    // 新建数据
    addData(){
      this.operate=0
      this.form={}
      this.place=''
      this.dialogVisible = true
    },
    // 删除数据
    deleteRecord(index,row){
      this.tableData.splice(index,1)
    },
    // 批量删除
    deleteMany(){
      this.multipleSelection.forEach(val=>{
        this.tableData.forEach((item,index)=>{
          // 如果手机号相同，则是被选中的行
          if(item.tel===val.tel){
            this.tableData.splice(index,1)
          }
        })
      })
    }
  }
};
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>