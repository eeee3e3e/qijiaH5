<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
	  uni.request({
	  	url: 'https://www.qijiazhiguo.top/api/System/GetImage',
	  	header: { 'authorization': wx.getStorageSync('Ticket') },
	  	data:{
	  		key:'membercard'
	  	},
	  	success: res => {
	  		if(res.data.ReturnCode == 401){
	  			uni.removeStorageSync('ID');
	  			uni.removeStorageSync('openID');
	  			uni.showModal({
	  			    title: '友情提示',
	  			    content:res.data.ReturnMessage,
	  				success: (res) => {
	  					uni.switchTab({
	  						url:'@pages/my/my'
	  					})
	  				},
	  			})
	  		}
	  	}
	  });
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>
<style lang="scss">
	// 全局css
  /*每个页面公共css */
  /* @import url("uview-ui/index.scss"); */
  @import "uview-ui/index.scss";
  page {
    background-color: #F9F9F9;
  }
  view {
    box-sizing: border-box;
    // line-height: 100%; 这样设置无效
    line-height: 1em;
  }
  image, video {
    display: block;
    box-sizing: border-box;
  }
  /* image { will-change: transform} */
  /* 单行省略 */
  .ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ellipsis2{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
  
  .floor {
  	display: flex;
  	align-items: center;
  	justify-content: center;
    padding: 20rpx 0;;
  	image {
  		margin-right: 12rpx;
  		width: 20rpx;
  		height: 20rpx;
  	}
  
  	view {
  		height: 20rpx;
  		font-size: 20rpx;
  		font-family: PingFangSC, PingFangSC-Medium;
  		font-weight: 500;
  		color: #aaaaaa;
  	}
  }
</style>
