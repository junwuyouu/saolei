<!--  -->
<template>
  <div>
    <h2>扫雷</h2>
    <h4>剩余雷数：{{ leiHas }} &nbsp;所用时间：{{ time }}秒</h4>

    <br />
    <hr />
    <br />
    <div class="map">
      <div
        v-for="(item, index) in mapStart"
        @click.left="cheackDiv(index)"
        @click.right="cheackDivRight(index)"
        @contextmenu.prevent
        :key="index"
      >
        <div class="mapDivbegin" v-if="!mapStart[index].clicked && !mapStart[index].right"></div>
        <div
          class="mapDivkong"
          v-if="mapStart[index].clicked && mapStart[index].num != '0' && !mapStart[index].islei"
        >
          {{ item.num }}
        </div>
        <div
          class="mapDivkong"
          v-if="mapStart[index].clicked && mapStart[index].num == '0' && !mapStart[index].islei"
        ></div>
        <!-- 雷的渲染 -->
        <div class="mapDivlei" v-if="mapStart[index].clicked && mapStart[index].islei">
          <Icon type="logo-xbox" />
        </div>
        <!-- 红旗的渲染 -->
        <div class="mapDivRight" v-if="mapStart[index].right">
          <Icon type="md-flag" />
        </div>
      </div>
    </div>
    <br />
    <hr />
    <Button type="primary" @click="statMap">重新开始</Button>
    <Modal v-model="visible" title="游戏结束" @on-ok="OkModal" @on-cancel="CloseModal">
      <p>{{ massage }}</p>
    </Modal>
  </div>
</template>
  
<script>
import { stat, close } from 'fs';

export default {
  data() {
    return {
      mapStart: [], //地图
      leiNum: 20, //埋雷数量
      //gameOver: false,
      visible: false,
      leiHas: '', //剩余雷数
      massage: '', //消息提示
      knowNum: '', //已知的格子数量
      time: 0 //记录用时
    };
  },

  components: {},

  computed: {},

  mounted() {},
  created() {
    this.statMap();
    this.currentTime();
  },
  methods: {
    //初始化地图
    statMap() {
      this.mapStart = [];
      this.knowNum = 0;
      this.leiHas = this.leiNum;
      for (let i = 0; i < 150; i++) {
        let obj = {};
        obj['islei'] = false;
        obj['clicked'] = false;
        obj['num'] = 0;
        obj['right'] = false;
        this.mapStart.push(obj);
      }
      //随机埋雷
      this.maiLei();
      this.hintNum();
    },
    //随机埋雷
    maiLei() {
      for (let i = 0; i < this.leiNum; i++) {
        let num = Math.round(Math.random() * 149);

        if (this.mapStart[num].islei == false) {
          this.mapStart[num].islei = true;
        } else {
          i--;
        }
      }
    },
    //生成提示数字
    hintNum() {
      for (let i = 0; i < 150; i++) {
        if (this.mapStart[i].islei == true) {
          let a = i % 15;
          if (i == 0) {
            this.mapStart[i + 1].num++;
            this.mapStart[i + 15].num++;
          } else if (i == 14) {
            this.mapStart[i - 1].num++;
            this.mapStart[i + 15].num++;
          } else if (i == 135) {
            this.mapStart[i + 1].num++;
            this.mapStart[i - 15].num++;
          } else if (i == 149) {
            this.mapStart[i - 1].num++;
            this.mapStart[i - 15].num++;
          } else if (i < 14) {
            this.mapStart[i - 1].num++;
            this.mapStart[i + 1].num++;
            this.mapStart[i + 14].num++;
            this.mapStart[i + 15].num++;
            this.mapStart[i + 16].num++;
          } else if (a == 0) {
            this.mapStart[i - 15].num++;
            this.mapStart[i - 14].num++;
            this.mapStart[i + 1].num++;
            this.mapStart[i + 15].num++;
            this.mapStart[i + 16].num++;
          } else if (a == 14) {
            this.mapStart[i - 15].num++;
            this.mapStart[i - 16].num++;
            this.mapStart[i - 1].num++;
            this.mapStart[i + 15].num++;
            this.mapStart[i + 14].num++;
          } else if (i > 135) {
            this.mapStart[i - 1].num++;
            this.mapStart[i - 15].num++;
            this.mapStart[i - 14].num++;
            this.mapStart[i - 16].num++;
            this.mapStart[i + 1].num++;
          } else {
            this.mapStart[i - 1].num++;
            this.mapStart[i - 15].num++;
            this.mapStart[i - 14].num++;
            this.mapStart[i - 16].num++;
            this.mapStart[i + 1].num++;
            this.mapStart[i + 15].num++;
            this.mapStart[i + 14].num++;
            this.mapStart[i + 16].num++;
          }
        }
      }
    },
    //点击触发事件
    cheackDiv(key) {
      console.log(key);
      if (!this.mapStart[key].right) {
        if (this.mapStart[key].islei) {
          for (let i = 0; i < 150; i++) {
            this.mapStart[i].clicked = true;
            this.mapStart[i].right = false;
          }
          this.visible = true;
          this.massage = '游戏失败,点击确认重新开始';
        } else {
          this.mapStart[key].clicked = true;
          this.knowNum = 0;
          // for (let i = 0; i < 150; i++) {
          //   if (this.mapStart[i].clicked || this.mapStart[i].right) {
          //     this.knowNum++;
          //     console.log(this.knowNum);
          //   }
          // }
          // if (this.knowNum == 150) {
          //   this.visible = true;
          //   this.massage = "游戏胜利,点击确认重新开始";
          // }
          let cont = 0;
          for (let i = 0; i < 150; i++) {
            if (this.mapStart[i].clicked) cont++;
          }
          if (cont == 150 - this.leiNum) {
            this.visible = true;
            this.massage = '游戏胜利,点击确认重新开始';
          }
          if (this.mapStart[key].num == 0) {
            if (
              this.mapStart[key - 1] &&
              !this.mapStart[key - 1].islei &&
              !this.mapStart[key - 1].right
            )
              this.mapStart[key - 1].clicked = true;
            if (
              this.mapStart[key + 1] &&
              !this.mapStart[key + 1].islei &&
              !this.mapStart[key + 1].right
            )
              this.mapStart[key + 1].clicked = true;
            if (
              this.mapStart[key - 15] &&
              !this.mapStart[key - 15].islei &&
              !this.mapStart[key - 15].right
            )
              this.mapStart[key - 15].clicked = true;
            if (
              this.mapStart[key - 14] &&
              !this.mapStart[key - 14].islei &&
              !this.mapStart[key - 14].right
            )
              this.mapStart[key - 14].clicked = true;
            if (
              this.mapStart[key - 16] &&
              !this.mapStart[key - 16].islei &&
              !this.mapStart[key - 16].right
            )
              this.mapStart[key - 16].clicked = true;
            if (
              this.mapStart[key + 14] &&
              !this.mapStart[key + 14].islei &&
              !this.mapStart[key + 14].right
            )
              this.mapStart[key + 14].clicked = true;
            if (
              this.mapStart[key + 15] &&
              !this.mapStart[key + 15].islei &&
              !this.mapStart[key + 15].right
            )
              this.mapStart[key + 15].clicked = true;
            if (
              this.mapStart[key + 16] &&
              !this.mapStart[key + 16].islei &&
              !this.mapStart[key + 16].right
            )
              this.mapStart[key + 16].clicked = true;
          }
        }
      }
    },
    cheackDivRight(key) {
      if (!this.mapStart[key].clicked) {
        if (this.mapStart[key].right) {
          this.leiHas++;
          this.mapStart[key].right = false;
        } else {
          this.leiHas--;
          this.mapStart[key].right = true;
          this.knowNum = 0;
          // for (let i = 0; i < 150; i++) {
          //   if (this.mapStart[i].clicked || this.mapStart[i].right) {
          //     this.knowNum++;
          //     console.log(this.knowNum);
          //   }
          // }
          // if (this.knowNum == 150) {
          //   this.visible = true;
          //   this.massage = "游戏胜利,点击确认重新开始";
          // }
          let cont = 0;
          for (let i = 0; i < 150; i++) {
            if (this.mapStart[i].islei && this.mapStart[i].right) cont++;
          }
          if (cont == this.leiNum) {
            this.visible = true;
            this.massage = '游戏胜利,点击确认重新开始';
          }
        }
      }
    },
    //关闭窗口调用函数
    OkModal() {
      //this.$Message.info("Clicked ok");
      //console.log(this.gameOver, this.visible);
      this.gameOver = false;
      //this.visible = false;

      this.statMap();
    },
    CloseModal() {
      //this.$Message.info("Clicked cancel");
      this.gameOver = false;
      //this.visible = false;
    },
    //时间函数
    getTime: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      _this.time = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
    },
    currentTime() {
      setInterval(this.getTime, 500);
    }
  }
};
</script>
<style >
.map {
  width: 754px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  border: rgb(48, 0, 44) 2px solid;
}
.mapDivbegin {
  height: 50px;
  width: 50px;
  float: left;
  background-color: #6da6e2;
  border: azure 1px solid;
}
.mapDivkong {
  height: 50px;
  width: 50px;
  float: left;
  background-color: rgb(85, 85, 85);
  color: aliceblue;
  font-size: 25px;
  line-height: 50px;
  border: azure 1px solid;
}
.mapDivlei {
  height: 50px;
  width: 50px;
  float: left;
  background-color: rgb(233, 0, 0);
  color: aliceblue;
  font-size: 25px;
  line-height: 50px;
  border: azure 1px solid;
}
.mapDivRight {
  height: 50px;
  width: 50px;
  float: left;
  background-color: rgb(184, 176, 64);
  color: aliceblue;
  font-size: 25px;
  line-height: 50px;
  border: azure 1px solid;
}
</style>