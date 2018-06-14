var qrcodeContainter = new Vue({
    el: "#qrcode-container",
    data() {
        return {
            apk: {},
            loading: false
        };
    },
    computed: {
        //取到url参数
        getUrlParams() {
            if (window.location.href.indexOf("?") == -1) {
                return false;
            }
            var paramString = window.location.href.split("?")[1];
            var arr = paramString.split("&");
            var result = new Object();
            for (var index = 0; index < arr.length; index++) {
                var objArr = arr[index].split("=");
                result[objArr[0]] = objArr[1];
            }
            return result;
        }
    },
    methods: {
        getApkInfo() {
            var that = this;
            var apkId = that.getUrlParams.id;
            if(!apkId) {
                that.$message.error('此apk不存在,请从文件列表页面重新选择');
                return;
            }
            that.loading = true;
            
            axios({
                method: "post",
                url: "/api-dev/apk",
                data: apkId
            }).then(function (response) {
                that.apk = response.data;
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: that.apk.addr,
                    width: 250,
                    height: 250,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                that.loading = false;
            })
            .catch(function(err) {
                that.loading = false;
                that.$message.error(err);
            });
        }
    },
    created () {
        this.getApkInfo();
    }
});
