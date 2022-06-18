<template>
	<view class="content">
		<view class="content_head">
			<image src="../../static/home/icon2.png" mode=""></image>
			<text>子女信息</text>
		</view>
		<view class="content_item">
			<view class="itme_portrait">
				<view class="itme_text_portrait">
					头像
				</view>
				<view class="itme_head_portrait">
					<view>
						<view class="fanku_con">
							<view class="img_z">
								<view class="imgadf center" @click="ongetimg()">
									<view  v-if="img_list == ''">
										<image style="width: 55px;height: 55px;border-radius:50%;margin-left: -10px;" src="../../static/my/portrait.png" mode=""></image>
										<u-icon style="position: relative;top: -33px;left: 60px;" name="arrow-right" size="26" color="#ccc"></u-icon>
									</view>
									<view style="position: relative;" v-for="(item,index) in img_list" :key="index" v-else>
										<image style="width: 120rpx;height: 120rpx;margin-left: 20rpx;margin-bottom: 20rpx;background-color:rgba(0,0,0,0.1);border-radius:50%"
										 :src="'https://www.qijiazhiguo.top' + item"></image>
										<image class="shancs" src="./shanchus2.png" mode="" @click="selec(index)"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="itme_input">
				<view class="itme_text_input">
					姓名
				</view>
				<view class="itme_head_input">
					<input type="text" value="" v-model="name" placeholder="请输入"/>
				</view>
			</view>
			<view class="itme_input">
				<view class="itme_text_input">
					出生日期
				</view>
				<view class="itme_head_input">
					 <picker mode="date" :value="birthday" start="1970-01-01" @change="bindDateChange">
					    <view>{{birthday}}</view>
						<u-icon style="position: relative;top: -39px;left: 200px;" name="arrow-right" size="26" color="#ccc"></u-icon>
					  </picker>
				</view>
			</view>
			<view class="itme_input">
				<view class="itme_text_input">
					性别
				</view>
				<view class="itme_head_input">
					<picker :range="company" @change="binPickerChange">
						<view style="width: 100px;">{{ company[companyvalue] }}</view>
						<u-icon style="position: relative;top: -39px;left: 200px;" name="arrow-right" size="26" color="#ccc"></u-icon>
					</picker>
				</view>
			</view>
			<view class="itme_input">
				<view class="itme_text_input">
					所在学校
				</view>
				<view class="itme_head_input">
					<input type="text" value="" v-model="school" placeholder="请输入"/>
				</view>
			</view>
		</view>
		<view class="content_but">
			<view class="content_but_tom" @click="shangchuan">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				company: ['男','女','未知'],
				companyvalue: 0,
				birthday: '请选择',
				img_list: [],
				img_list2:[],
				name:'',
				school:'',
				Genders:1,
				homelist:[],
				key:''
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
			this.key  = option.key
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Child/GetOneChildren',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					childId: option.key
				},
				success: res => {
					console.log(res.data.Data)
					var asda = res.data.Data.BirthDate.split(" ");
					console.log(asda)
					this.birthday = asda[0]
					this.homelist = res.data.Data
					this.school = res.data.Data.SchoolName
					this.companyvalue = (res.data.Data.Gender-1)
					this.name = res.data.Data.Name
					this.img_list.push(res.data.Data.HeadImage)
				}
			});
		},
		methods: {
			shangchuan(){
				let that = this
				if(this.companyvalue == 0){
					this.Genders = 1
				}else if(this.companyvalue == 1){
					this.Genders = 2
				}else if(this.companyvalue == 2){
					this.Genders = 3
				}
				console.log(this.Genders)
				if(this.birthday == '请选择'){
					return uni.showToast({
						title: '请选择出生年月日',
						icon: 'none',
						position: 'bottom'
					});
				}else if(this.name == ''){
					return uni.showToast({
						title: '请填写孩子姓名',
						icon: 'none',
						position: 'bottom'
					});
				}else if(this.school == ''){
					return uni.showToast({
						title: '请填写孩子学校',
						icon: 'none',
						position: 'bottom'
					});
				}else if(this.img_list[0] == ''){
					return uni.showToast({
						title: '请上传头像',
						icon: 'none',
						position: 'bottom'
					});
				}else{
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/UserInfo/AddChildUser',
						method:'POST',
						header: { 'authorization': wx.getStorageSync('Ticket') },
						data: {
							ID:this.key,
							ParentID :wx.getStorageSync('ID'),
							SchoolName: this.school,
							Name:this.name,
							BirthDate:this.birthday,
							HeadImage:this.img_list[0],
							Gender: that.Genders
						},
						success: res => {
							if(res.data.ReturnCode == 401){
								uni.removeStorageSync('ID');
								uni.removeStorageSync('openID');
								this.isLogin = false
								this.gethome(wx.getStorageSync('openID'),wx.getStorageSync('ID'))
								uni.showModal({
								    title: '友情提示',
								    content:res.data.ReturnMessage,
									success: (res) => {
										uni.switchTab({
											url:'my'
										})
									},
								})
							}else{
								uni.navigateBack({
									url: `/pages/my/nuechild`
								})
							}
						}
					});
				}
			},
			binPickerChange(e) {
				this.companyvalue = e.target.value;
			},
			bindDateChange (e) {
				let that = this
				that.birthday = e.detail.value
			},
			ongetimg() { //上传图片方法
				var that = this
				// if (!that.url) {
				// 	return uni.showToast({
				// 		title: '请填写上传地址',
				// 		icon: 'none',
				// 		position: 'bottom'
				// 	});
				// }
				uni.chooseImage({ //选中本地图片
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						uni.showLoading({ //加载框
							title: '加载中...'
						})
						const tempFilePaths = res.tempFilePaths;
						that.img_list = []
						res.tempFilePaths.forEach((item, index) => { //本地选中的图片组
							console.log(item)
							uni.uploadFile({ //上传图片
								url: 'https://www.qijiazhiguo.top/api/System/UploadFileBack', //上传接口地址
								filePath: item, //一张图
								name: 'pic',
								header: {'Content-Type': 'application/json'},
								success: res => {
									if (that.img_list.length >= 1) //限制
										return uni.showToast({
											title: '最多上传' + 1 + '张图片',
											icon: 'none',
											position: 'bottom'
										});
										console.log(res.data)
									that.img_list.push(JSON.parse(res.data).Data); //plus数组
									that.img_list2.push('https://www.qijiazhiguo.top' + JSON.parse(res.data).Data); //plus数组
									console.log(that.img_list)
									that.$emit('obtain_img', that.img_list)
								}
							});
							uni.hideLoading() //关闭加载框
						});
					}
				});
			},
			//删除
			selec(index) {
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
	.content{
		padding: 12px;
		
	}
	.content_head{
		line-height: 20px;
		margin: 5px;
		display: flex;
	}
	.content_head image{
		width: 20px;
		height: 20px;
	}
	.content_item{
		border-radius: 8px;
		background: #FFFFFF;
	}
	.itme_portrait{
		display: flex;
		height: 80px;
		border-bottom: 1px #e7e7e7 solid; 
	}
	.itme_input{
		display: flex;
		height: 70px;
		border-bottom: 1px #e7e7e7 solid; 
	}
	.itme_text_portrait{
		color: #989898;
		margin-left: 10px;
		flex: 9;
		line-height: 80px;
		font-size: 16px;
		font-weight: 800;
	}
	.itme_text_input{
		color: #989898;
		margin-left: 10px;
		flex: 4;
		line-height: 70px;
		font-size: 16px;
		font-weight: 800;
	}
	.itme_head_portrait{
		flex: 3;
	}
	.itme_head_input{
		display: flex;
		flex: 8;
	}
	.itme_head_input input{
		font-size: 16px;
		margin-top: 23px;
	}
	.itme_head_input view{
		font-size: 16px;
		margin-top: 25px;
	}
	.itme_head_portrait image{
		margin-top: 10px;
		width: 60px;
		height: 60px;
	}
	.content_but{
		position: absolute;
		bottom: 18px;
		width: 92%;
		height: 50px;
	}
	.content_but_tom{
		height: 40px;
		margin-left: 10px;
		background: #ff8a0c;
		color: #FFFFFF;
		line-height: 40px;
		text-align: center;
		border-radius: 5px;
	}
</style>
