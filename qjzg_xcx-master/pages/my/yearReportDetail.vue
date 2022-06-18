<template>
  <view class="yearReportDetail">
    <view class="userinfo">
      <view class="user">
        <image :src="'https://www.qijiazhiguo.top' + homelist1.HeadImage" mode=""></image>
        <view class="nickname"> {{homelist1.Name}} </view>
      </view>
      <view class="info">
        <view class="per">
          <view class="value">
            <text class="t1">{{homelist1.StudyTime }}</text>
            <text class="t2">天</text>
          </view>
          <view class="key"> 学习时间 </view>
        </view>
        <view class="per" @tap="goto(`/pages/my/activity?current=` + current + '&endTime=' + endTime + '&startTime=' + startTime)">
          <view class="value"> {{homelist2.ActivityNum }} </view>
          <view class="key"> 参与活动 </view>
        </view>
        <view class="per" @tap="goto(`/pages/my/childAward?ID=` + key.id + '&endTime=' + endTime + '&startTime=' + startTime)">
          <view class="value"> {{homelist2.MedalNum }} </view>
          <view class="key"> 获得荣誉 </view>
        </view>
      </view>
      <view class="comment">
        <view class="title"> 年度评语 </view>
        <view class="content"> {{homelist.YearComment }} </view>
      </view>
    </view>
   <view class="character" v-if="zhuangtai">
     <view class="titlebar"> 性格心理分析 </view>
     <view class="main">
       <view class="charts-box">
         <qiun-data-charts type="radar" :chartData="chartData" />
       </view>
     </view>
   </view>
   <view class="character" style="text-align: center;justify-content: center;height: 210px; background-color: #FFFFFF;border-radius: 10px;padding-top: 10px;" v-else>
   	<image style="width: 120px;height: 120px; margin: 20px 0 20px 115px;" :src="blank" mode=""></image>
   	<text style="color: #c7c7c7;">暂无性格数据</text>
   </view>
    <view class="Detail">
      <view class="title"> 详细报告 </view>
      <view class="content">
		  {{homelist.Description}}
		</view>
    </view>
	<view class="Detail" v-if="homelist.YearGrowupRichExt != null">
		<view class="title"> 图文展示 </view>
	  <view class="content">
		  <view v-html="ExpandIntroduce"></view>
		</view>
	</view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
		  chartData: {
		    "categories": [],
		    "series": [
		      {
		        "name": "本年度得分",
		        "data": [],
		        "color": "#7aaaff"
		      },
		      {
		        "name": "上年度得分",
		        "data": [],
		        "color": "#ff931d"
		      }
		    ]
		  },
        list: [
          {
            isFold: true, //是否折叠
            fold: '能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很…',
            noFold: '能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
          }, {
            isFold: false, //是否折叠
            fold: '能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很…',
            noFold: '能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
          }, {
            isFold: true, //是否折叠
            fold: '能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很…',
            noFold: '能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
          }
        ],
		homelist:[],
		homelist1:[],
		zhuangtai: true,
		key:[],
		current:0,
		homelist2:[],
		endTime: '',
		startTime:'',
		blank:'',
		ExpandIntroduce:''
      }
    },
	created() {
		    //#ifdef MP-WEIXIN
		    wx.showShareMenu({
		        withShareTicket: true,
		        menus: ['shareAppMessage', 'shareTimeline']
		    });
		    //#endif
		},
	onLoad(option) {
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'blank'
			},
			success: res => {
				this.blank = 'https://www.qijiazhiguo.top' + res.data.Data
				console.log('这','https://www.qijiazhiguo.top' + res.data.Data)
			}
		});
		this.endTime = option.Year + '-12-31'
		this.startTime = option.Year + '-01-01'
		console.log(this.endTime,this.startTime)
		console.log('奥术大师大所',option.SourceID)
		this.current = option.current
		this.key = option
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserYearReport/GetUserYearReport',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				id:option.SourceID
			},
			success: res => {
				console.log(res.data.Data)
				this.homelist = res.data.Data
				this.ExpandIntroduce = this.homelist.YearGrowupRichExt.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
				for(var i=0;i<res.data.Data.CharacterContrast[0].length;i++){
					this.chartData.categories.push(res.data.Data.CharacterContrast[0][i].BehaviorName)
					this.chartData.series[0].data.push(res.data.Data.CharacterContrast[0][i].Score)
				}
				if(res.data.Data.CharacterContrast[0] == ''){
					this.zhuangtai = false
				}
			},
		})
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Child/GetChildJoinNums',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				userId:option.id,
				startTime: this.startTime,
				endTime:this.endTime,
			},
			success: res => {
				console.log(res.data.Data)
				this.homelist2 = res.data.Data
			},
		})
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Child/GetOneChildren',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				childId:option.id
			},
			success: res => {
				this.homelist1 = res.data.Data
				console.log('阿萨德',res.data.Data.AverageBehavior)
			},
		})
	},
    methods: {
      goto(url) { uni.navigateTo({ url }) },
      fun(index) {
        this.$set(this.list, index, {
          isFold: !this.list[index].isFold,
          fold: '能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很…',
          noFold: '能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .yearReportDetail {
    padding: 24rpx 24rpx 48rpx;
    .userinfo {
      padding: 48rpx 40rpx 40rpx;
      background: #ffffff;
      border-radius: 12rpx;
      box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
      .user {
        margin-bottom: 54rpx;
        image {
          margin: 0 auto;
          width: 136rpx;
          height: 136rpx;
          border: 2rpx solid #ecf1f6;
          border-radius: 70rpx;
        }
        .nickname {
          margin-top: 28rpx;
          height: 36rpx;
          font-size: 36rpx;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: center;
          color: #333333;
        }
      }
      .info {
        margin: 0 20rpx;
        display: flex;
        justify-content: space-between;
        .per {
          .value {
            height: 32rpx;
            font-size: 32rpx;
            font-family: DINAlternate, DINAlternate-Bold;
            font-weight: 700;
            text-align: center;
            color: #333333;
          }
          .key {
            margin-top: 22rpx;
            height: 24rpx;
            font-size: 24rpx;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #999999;
          }
        }
      }
      .comment{
        margin-top: 60rpx;
        .title{
          height: 36rpx;
          font-size: 36rpx;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #333333;
        }
        .content{
          margin-top: 36rpx;
          font-size: 28rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
          line-height: 44rpx;
        }
      }
    }
    .character {
      margin: 20rpx 0;
      padding: 36rpx 40rpx 48rpx;
      background: #ffffff;
      border-radius: 12rpx;
      box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
      .titlebar {
        height: 32rpx;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #333333;
      }
      .main {
        margin: 52rpx 0 48rpx;
        height: 440rpx;
      }
      .extra {
        margin: 0 130rpx;
        display: flex;
        justify-content: space-between;
        .explain {
          height: 24rpx;
          font-size: 24rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #666666;
          display: flex;
          align-items: center;
          &::before {
            content: "";
            display: block;
            width: 24rpx;
            height: 24rpx;
            border-radius: 50%;
            margin-right: 12rpx;
          }
        }
        .exp1::before {
          background: #d6e7ff;
          border: 2rpx solid #7aaaff;
        }
        .exp2::before {
          background: #ffe9d6;
          border: 2px solid #ff931d;
        }
      }
    }
    .Detail{
      margin: 20rpx 0;
      padding: 36rpx 40rpx 48rpx;
      background: #ffffff;
      border-radius: 12rpx;
      box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
      .title{
        height: 32rpx;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #333333;
      }
      .content{
        margin-top: 36rpx;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 44rpx;
        image{
          margin: 20rpx 0;
        }
      }
    }
  }
</style>
