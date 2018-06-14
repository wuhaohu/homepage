new Vue({
  el: "#fileList",
  data() {
    return {
      applist: [],
      apklist: [],
      selectedIndex: 0,
      appName: "",
      dialogFormVisible: false,
      form: {
        name: "",
        date: "",
        version: "",
        type: [],
        desc: ""
      },
      dialogAppVisible: false,
      formApp: {
        name: "",
        date: "",
        desc: ""
      },
      formLabelWidth: "100px",
      loading: false
    };
  },
  computed: {
    noneApp() {
      return this.applist.length == 0 ? true : false;
    }
  },
  methods: {
    selectApp: function(app, index) {
      this.appName = app.name;
      this.selectedIndex = index;
      this.getApklist();
    },
    createNewApp() {
      var that = this;
      if (
        this.formApp.name.length &&
        this.formApp.desc.length &&
        this.formApp.date != null &&
        this.formApp.date.length
      ) {
        console.log("create");
        axios({
          method: "post",
          url: "",
          data: that.formApp
        }).then(function(response) {
          that.upDateData();
          that.dialogAppVisible = false;
        });
      } else {
        this.$message.error("请填入名称、描述和日期");
      }
    },
    submitUpload() {
      if (
        this.form.name.length &&
        this.form.version.length &&
        this.form.date != null &&
        this.form.date.length
      ) {
        this.$refs.upload.submit();
      } else {
        this.$message.error("请至少填入名称、版本号和日期");
      }
    },
    uploadDone() {
      this.dialogFormVisible = false;
      this.$message({
        message: "上传成功",
        type: "success"
      });
      this.getApklist();
    },
    uploadFail() {
      this.$message.error("上传失败，请稍后再试");
    },
    // upDateData() {
    //   this.loading = true;
    //   this.getApplist();
    // },
    upDateData() {
      this.loading = true;
      var that = this;
      axios({
        method: "get",
        url: "/api-dev"
      })
        .then(function(response) {
          if (response.data.applist) {
            that.applist = response.data.applist;
            that.appName = that.applist[that.selectedIndex].name;
          }
          that.getApklist();
        })
        .catch(function(error) {
          console.log(error);
          this.$message.error(error);
          that.loadingFinished();
        });
    },
    getApklist() {
      var that = this;
      axios({
        method: "post",
        url: "/api-dev/apklist",
        data: {
          id: that.applist[that.selectedIndex].id
        }
      })
        .then(function(response) {
          if (response.data) {
            that.apklist = response.data;
          }
          that.loadingFinished();
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error(error);
          that.loadingFinished();
        });
    },
    loadingFinished() {
      this.loading = false;
      this.$el.setAttribute("style", "opacity: 1");
    }
  },
  created() {
    this.upDateData();
  }
});
