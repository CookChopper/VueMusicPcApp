<template>
  <div class="login-wrap" >
    <div class="close" @click="$emit('close')">
      <svg-icon icon-class="close"></svg-icon>
    </div>
    <div class="logo">
      <svg-icon icon-class="phone"></svg-icon>
    </div>
    <div class="form">
      <el-form :model="formData" :rules="rules" ref="loginRef">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="formData.password" show-password></el-input>
        </el-form-item>
        <el-form-item style="display:flex;flex-direction:column">
            <el-button type="danger" round style="width:100%" @click="submit">登录</el-button>
            <el-button type="text" style="width:100%;margin-left:0;color:#000;">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { checkPhone } from '@/utils/validate.js'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      formData: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, trigger: 'blur', message: '手机号必填' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码必填' },
          { min: 6, max: 12, trigger: 'blur', message: '请输入6-12位密码' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    submit () {
      this.$refs.loginRef.validate(async valid => {
        if (valid) {
          const { avatarUrl } = await this.login(this.formData)
          this.$emit('close')
          this.$message.success('登录成功!')
          this.$store.state.avatar = avatarUrl
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap{
  width: 300px;
  height: 500px;
  box-sizing:border-box;
  padding: 0 50px;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index:99;
  .close{
    position: absolute;
    right: 10px;
    top: 10px;
    .svg-icon{
      width: 20px;
      height: 20px;
    }
  }
  .logo{
    margin-top: 100px;
    .svg-icon{
      width: 80px;
      height: 80px;
      fill: crimson;
    }
  }
  .form{
    width: 100%;
    margin-top: 20px;
  }
}
.login-slide-enter-active{
  animation: slideInDown 1s;
}
</style>
