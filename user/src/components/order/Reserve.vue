<template>
  <div>
    <el-table :height="400"
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
      <!--<el-table-column-->
      <!--  label="编号"-->
      <!--  width="100">-->
      <!--  <template slot-scope="scope">-->
      <!--    <span style="margin-left: 10px">{{ scope.row.id }}</span>-->
      <!--  </template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="姓名"
        width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>手机号: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column width="130" label="身份证号" prop="id"></el-table-column>
      <el-table-column width="110" label="日期" prop="time"></el-table-column>
      <el-table-column width="110" label="性别" prop="sex"></el-table-column>
      <el-table-column width="110" label="航班号" prop="flightNum"></el-table-column>
      <el-table-column width="110" label="出发地" prop="departure"></el-table-column>
      <el-table-column width="110" label="目的地" prop="destination"></el-table-column>
      <!--
            scope.$index:当前行的索引，
            scope.row：当前行的行对象
            -->
      <el-table-column
        align="right" >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入姓名搜索"
            style="border: 1px solid dodgerblue "/>
        </template>

        <!--<template slot-scope="scope">-->
        <!--  <el-button-->
        <!--    size="mini"-->
        <!--    @click="handleEdit(scope.$index, scope.row)">编辑-->
        <!--  </el-button>-->
        <!--  &lt;!&ndash;Popconfirm 气泡确认框&ndash;&gt;-->
        <!--  <el-popconfirm-->
        <!--    confirmButtonText='确定'-->
        <!--    cancelButtonText='取消'-->
        <!--    icon="el-icon-info"-->
        <!--    iconColor="blue"-->
        <!--    title="确定要删除当前用户吗？"-->
        <!--    @onConfirm="handleDelete(scope.$index, scope.row)"-->
        <!--  >-->
        <!--    <el-button size="mini"-->
        <!--               type="danger"-->
        <!--               slot="reference">删除-->
        <!--    </el-button>-->
        <!--  </el-popconfirm>-->
        <!--</template>-->
      </el-table-column>
    </el-table>




    <el-button  type="primary" size="medium" round
                style="margin-top: 10px"
                @click="show=!show">添加
    </el-button>

    <!--内容过滤动画-->
    <transition name="el-fade-in-linear">
      <div v-show="show" class="transition-box" >
        <el-form hide-required-asterisk :rules="rules" ref="form" :model="form" label-width="80px" label-suffix=":">

          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>

          <el-form-item label="日期" prop="time">
            <el-col :span="11">
              <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="性别" >
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input type="textarea" v-model="form.phone" ></el-input>
          </el-form-item>
          <el-form-item label="航班号" prop="flightNum">
            <el-input type="textarea" v-model="form.flightNum" ></el-input>
          </el-form-item>
          <el-form-item label="出发地" prop="departure">
            <el-input type="textarea" v-model="form.departure" ></el-input>
          </el-form-item>
          <el-form-item label="目的地" prop="destination">
            <el-input type="textarea" v-model="form.destination" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交订单</el-button>
            <el-button @click="resetForm('form')" >重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </transition>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        search: '',
        show: false,
        form: {
          name: '',
          time: '2020-10-12',
          id:'',
          sex: '男',
          phone: "",
          flightNum:'',
          destination: '',
          departure:'',
        },
        // total:0,
        // size:4,
        // pageNow:1,
        rules: {
          name: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
          time: [{required: true, message: '请输入出发日期', trigger: 'blur'}],
          departure: [{required: true, message: '请输入出发地', trigger: 'blur'}],
          destination: [{required: true, message: '请输入目的地', trigger: 'blur'}],
          flightNum: [{required: true, message: '请输入航班号', trigger: 'blur'}],
        },
      };
    },
    methods: {

      // findSize(size) { //用来处理每页显示记录发生变化的方法
      //   console.log(size);
      //   this.size = size;
      //   this.findAllTableData(this.page,size);
      // },
      // findPage(page) {//用来处理分页相关方法
      //   this.page = page;
      //   this.findAllTableData(page, this.size);
      // },
      //添加按钮事件
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      // handleEdit(index, row) {
      //   console.log(index, row);
      //   this.show=true;   //展示表单，同添加表单
      //   this.form=row;  // 将对应行对象信息赋给表单
      // },
      // handleDelete(index, row) {
      //   console.log(index, row);
      //   //发送axios异步请求
      //   this.$http.get("http://localhost:8989/user/delete?id="+row.id).then(res=>{
      //     if (res.data.status) {
      //       this.$message({
      //         message: '用户信息添加成功',
      //         type: 'success'
      //       })
      //       //删除后刷新数据
      //       this.findAllTableData();
      //     }else{
      //       this.$message.error(res.data.msg);
      //     }
      //   })
      // },
      onSubmit(form) {
        /*
        用Ajax发送post请求
        参数一：controller层url
        参数二：具体提交的data(){}里的数据
        */
        this.$http.post('http://localhost:8989/reserve/saveOrder', this.form).then(res => {
          console.log(res.data);
          this.$refs[form].validate((valid) => {
            if (valid) {
              if (res.data.status) {

                // 添加成功后清空表单信息
                this.$message.success("订单信息保存成功")
                this.form = {sex: '男'};
                // 隐藏表单
                this.show = false;
                //添加完数据后刷新表单
                // this.findAllTableData();
              } else {
                this.$message.error(res.data.msg);
              }
            } else {
              this.$message.error("输入数据不合法");
              return false;
            }
          });

        })


      },
      /*
        vue实例初始后，获取后端JSon数据,赋给表单数据，并在页面显示
        then：成功获取后端传来的数据之后执行
        res.data:后端响应数据
      */
      findAllTableData() {
        this.$http.get("http://localhost:8989/reserve/findOrders").then(res => {
          this.tableData = res.data;
        });
      },
      // findAllTableData(page,size) {
      //   page = page ? page : this.pageNow;
      //   size = size ? size : this.size;
      //   this.$http.get("http://localhost:8989/user/findByPage?pageNow="+page+"pageSize="+size).then(res => {
      //     this.tableData = res.data.users;
      //     this.total=res.data.total;
      //   });
      // },

    },
    created() {
      this.findAllTableData();
    }
  };

</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 100%;
    height: 600px;
    border-radius: 4px;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
