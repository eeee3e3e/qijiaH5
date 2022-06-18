<template>
	<view>
		<view class="fanku_con">
			<view class="img_z">
				<view class="imgadf center" @click="ongetimg()">
					<image style="width: 54px;height: 41px;" src="../../static/experience/pastesIssue.png" mode=""></image>
					<text style="margin-top: 14rpx;">上传图片</text>
				</view>
				<view style="position: relative;" v-for="(item,index) in img_list" :key="index">
					<image @click="preview(index,img_list)" style="width: 120rpx;height: 120rpx;margin-left: 20rpx;margin-bottom: 20rpx;background-color:rgba(0,0,0,0.1);border-radius: 10rpx;"
					 :src="'https://www.qijiazhiguo.top' + item"></image>
					<image class="shancs" src="./shanchus2.png" mode="" @click="selec(index)"></image>
					<view style="position: absolute;top: -9%;left: 86%;font-weight: 700;font-size: 20px;color: #ededed;" @click="selec(index)">
						×
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_list: [],
				img_list2:[]
			}
		},
		props: {
			// 最多上数量 1-9
			count: {
				type: Number,
				default: false
			},
			//图片上传地址
			url: {
				type: String,
				default: ''
			},
			//文件对应的 key 
			name: {
				type: String,
				default: ''
			},
			//请求头
			header: {
				type: Object,
				default: {}
			}
		},
		computed: {},
		methods: {
			ongetimg() { //上传图片方法
				var that = this
				if (!that.url) {
					return uni.showToast({
						title: '请填写上传地址',
						icon: 'none',
						position: 'bottom'
					});
				}
				uni.chooseImage({ //选中本地图片
					count: that.count,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						res.tempFilePaths.forEach((item, index) => { //本地选中的图片组
							console.log(item)
							uni.showLoading({ //加载框
								title: '上传中...'
							})
							uni.uploadFile({ //上传图片
								url: that.url, //上传接口地址
								filePath: item, //一张图
								name: that.name,
								header: that.header,
								success: res => {
									console.log(111,res)
									if (that.img_list.length >= that.count) //限制
										return uni.showToast({
											title: '最多上传' + that.count + '张图片',
											icon: 'none',
											position: 'bottom'
										});
										console.log(res.data)
									that.img_list.push(JSON.parse(res.data).Data); //plus数组
									that.img_list2.push('https://www.qijiazhiguo.top' + JSON.parse(res.data).Data); //plus数组
									console.log(that.img_list)
									that.$emit('obtain_img', that.img_list)
									uni.hideLoading()
									uni.showToast({
										title: JSON.parse(res.data).ReturnMessage,
										icon: 'none',
									});
								},
							});
						});
					}
				});
			},
			//删除
			selec(index) {
				this.img_list2.splice(index, 1)
				this.img_list.splice(index, 1)
				this.$emit('obtain_img', this.img_list)
			},
			//预览
			preview(index, urls) {
				console.log(index)
				console.log(urls)
				console.log(this.img_list2)
				uni.previewImage({
					urls: this.img_list2,
					current: index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style>
	page {
		padding-top: 66rpx;
		box-sizing: border-box;
	}

	.fanku_con {
		width: 690rpx;
		border-radius: 10rpx;
		margin-left: 30rpx;
		padding-top: 20rpx;
		padding-bottom: 70rpx;
		box-sizing: border-box;
	}

	.imgadf {
		width: 160rpx;
		height: 160rpx;
		border: 1px #d8d8d8 solid;
		background-color: #eeeeee;
		margin-left: 20rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		font-size: 20rpx;
		color: #666666;
		flex-direction: column;
	}

	.img_z {
		display: flex;
		flex-wrap: wrap;
		margin-top: 90rpx;
		padding-right: 10rpx;
		box-sizing: border-box;
	}

	.shancs {
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		top: -10rpx;
		right: -10rpx;
		background-color: red;
		border-radius: 100%;
	}

	.dianhua_on {
		width: 364rpx;
		height: 74rpx;
		background: linear-gradient(to right, #F55C63, #F78361);
		border-radius: 38rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		margin-top: 130rpx;
		margin-left: 192rpx;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
