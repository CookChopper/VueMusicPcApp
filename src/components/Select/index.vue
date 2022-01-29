<template>
  <div class="wrap">
      <div class="loco" v-if="showOpiton">
      </div>
      <div class="select-options" v-if="showOpiton">
        <div class="hot" >
          <div class="item" v-for="item,index in hotData" :key="index" @click="handleClick(item)">
            <div class="left">
            {{index+1}}
            </div>
            <div class="right">
              <p class="title">{{item.searchWord}} <span style="font-style:oblique;color:#ccc;">{{item.score}}</span></p>
              <p class="description">{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Selecter',
  props: {
    showOpiton: {
      type: Boolean,
      default: false
    },
    hotData: {
      type: Array,
      default: null
    }
  },
  methods: {
    handleClick (item) {
      this.$emit('handleClick', item, 'hot')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  width: 100%;
  position: relative;
  z-index: 9;
  .select-box{
    width: 100px;
    height: 40px;
    padding: 5px;
    line-height: 40px;
    box-sizing:border-box;
    display: flex;
    justify-content:  center;
    align-items: center;
    border:1px solid #e5e5e5;
    border-radius: 8px;

    cursor: pointer;
    &-left{
      width: 70px;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
    }
    &-right{
      .svg-icon{
      vertical-align: -2px;
      }
    }
  }
  .loco{
    background-color: #fff;
      position: absolute;
      margin: 0;
      padding: 0;
      left: 20px;
      top:50px;
      border: 1px solid #d5d5d5;
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
      border-right:none;
      border-bottom:none;

    }
  .select-options{
    width: 500px;
    height: 300px;
    border:1PX solid #d5d5d5;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 60px;
    box-sizing:border-box;
    padding:0 10px;
    overflow-y: auto;
    .hot{
      width: 100%;
      box-sizing: border-box;
      padding: 5px;
      font-size: 14px;
      .item{
        width: 100%;
        height: 60px;
        display: flex;
        margin: 10px 0;
        cursor: pointer;
        &:nth-of-type(1){
          .left{
            color: red;
          }
        }
        &:nth-of-type(2){
          .left{
            color: red;
          }
        }
        &:nth-of-type(3){
          .left{
            color: red;
          }
        }
        .left{
        width: 40px;
        line-height: 60px;
        text-align: center;
        }

        .right{
          width: 260px;
          height: 50px;
          margin-left: 10px;
          text-align: left;
          overflow: hidden;
          display: flex;
          flex-direction:column;
          justify-content: space-between;
          p{
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
