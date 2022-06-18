<template name="commentStars">
  <view class="commentStars">
    <view :class="{starActive:item}" @tap="choise(index)" class="flex-item iconfont" v-for="(item, index) in star_list" :key="index">
      <text v-if="item" class="starIcon">{{'\ue8bc'}}</text>
      <text v-else class="starIcon">{{'\ue658'}}</text>
    </view>
  </view>
</template>
<script>
  export default {
    props: {},
    data() {
      return {
        star_list: [false, false, false, false, false]
      }
    },
    methods: {
      choise(num) {
        this.star_list = [false, false, false, false, false];
        num++;
        for (let i = 0; i < num; i++) this.star_list[i] = true;
        this.$emit('getScore', num);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @font-face { font-family: uniicons; src: url('@/static/iconfont.ttf') format('truetype'); }
  .iconfont { font-family: uniicons; font-size: 40rpx; color: #333; }
  .commentStars {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    display: flex;
    .flex-item {
      margin-top: 4rpx;
      padding: 0 12rpx;
      .starIcon { font-size: 48rpx; }
      color: #999;
    }
    .starActive { color: #f7a900; }
  }
</style>
