import Vue from 'vue'
import App from './App.vue'
// import router from '@/router/index.js'
// 引入element-ui
import {Table,TableColumn,Button,Container,Header,Main,Row,Col,Cascader,Autocomplete,Dialog,Form,FormItem,Input,Select,Option,DatePicker,TimePicker,Switch,Radio,RadioGroup,CheckboxGroup,Checkbox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Table).use(TableColumn).use(Button).use(Container).use(Header).use(Main).use(Row).use(Col).use(Cascader).use(Autocomplete).use(Dialog).use(Form).use(FormItem).use(Input).use(Select).use(Option).use(DatePicker).use(TimePicker).use(Switch).use(Radio).use(RadioGroup).use(CheckboxGroup).use(Checkbox);

new Vue({
  render: h => h(App),
}).$mount('#app')
