<!--  -->
<template>
  <div class="main">
    <h2>俄罗斯方块</h2>
    <h4>得分：{{ score }}</h4>
    <Button @click="restart">重新开始</Button>
    <div class="centerAll">
      <div class="center">
        <div class="gameMap">
          <div v-for="(item, index) in mapStart" :key="index">
            <div
              v-if="!item.hasDiv"
              style=" background-color: rgb(0, 0, 0); color:#fff"
              class="mapDiv"
            ></div>
            <div
              v-if="item.hasDiv && item.squareType == 1"
              style=" background-color:#19CAAD;"
              class="mapDiv"
            ></div>
            <div
              v-if="item.hasDiv && item.squareType == 2"
              style=" background-color:#F4606C;"
              class="mapDiv"
            ></div>
            <div
              v-if="item.hasDiv && item.squareType == 3"
              style=" background-color:#D1BA74;"
              class="mapDiv"
            ></div>
            <div
              v-if="item.hasDiv && item.squareType == 4"
              style=" background-color:#A0EEE1;"
              class="mapDiv"
            ></div>
            <div
              v-if="item.hasDiv && item.squareType == 5"
              style=" background-color:#BEEDC7;"
              class="mapDiv"
            ></div>
            <div
              v-if="item.hasDiv && item.squareType == 6"
              style=" background-color:#D6D5B7;"
              class="mapDiv"
            ></div>
            <div
              v-if="item.hasDiv && item.squareType == 7"
              style=" background-color:#ECAD9E;"
              class="mapDiv"
            ></div>
          </div>
        </div>
      </div>
      <div class="prompt">
        <h4>提示：</h4>
        <p>⇧： 变形</p>
        <p>⇩： 加速</p>
        <p>⇦： 向左</p>
        <p>⇨： 向右</p>
        <p>空格：暂停/开始</p>
        <br />
        <hr />
        <br />
        <p>温馨提示：</p>
        <br />
        <P>一次消掉多行可以获得多倍积分</P>
        <br />
      </div>
    </div>
    <Modal v-model="model" title="游戏失败" @on-ok="ok" @on-cancel="cancel">
      <p>游戏结束，您的得分为{{ score }}，是否重新开始</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapStart: [], //地图
      squarePosition: [], //记录方块位置
      gameOver: false, //记录游戏结束
      gamePause: false, //记录游戏暂停
      move: '',
      squareType: 0,
      num: 0,
      score: 0, //得分
      model: false
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.statMap();
    this.randomSquare();
    this.playGame();
  },

  methods: {
    //初始化地图
    statMap() {
      this.mapStart = [];
      this.gameOver = false;
      this.gamePause = false;
      for (let i = 0; i < 500; i++) {
        let obj = {};
        obj['hasDiv'] = false;
        obj['hasSuo'] = false;
        obj['squareType'] = 0;
        obj['Row'] = parseInt(i / 20) + 1;
        obj['Column'] = (i + 1) % 20;
        if (obj['Column'] == 0) {
          obj['Column'] = 20;
        }
        this.mapStart.push(obj);
      }
      //console.log(this.mapStart[30]);
    },
    //生成随机方块
    randomSquare() {
      this.num = Math.round(Math.random() * 6);
      //console.log(num);
      if (this.num == 0) {
        this.squarePosition[0] = 8;
        this.squarePosition[1] = 9;
        this.squarePosition[2] = 10;
        this.squarePosition[3] = 11;
      } else if (this.num == 1) {
        this.squarePosition[0] = 11;
        this.squarePosition[1] = 30;
        this.squarePosition[2] = 31;
        this.squarePosition[3] = 32;
      } else if (this.num == 2) {
        this.squarePosition[0] = 10;
        this.squarePosition[1] = 11;
        this.squarePosition[2] = 30;
        this.squarePosition[3] = 31;
      } else if (this.num == 3) {
        this.squarePosition[0] = 11;
        this.squarePosition[1] = 29;
        this.squarePosition[2] = 30;
        this.squarePosition[3] = 31;
      } else if (this.num == 4) {
        this.squarePosition[0] = 9;
        this.squarePosition[1] = 29;
        this.squarePosition[2] = 30;
        this.squarePosition[3] = 31;
      } else if (this.num == 5) {
        this.squarePosition[0] = 12;
        this.squarePosition[1] = 31;
        this.squarePosition[2] = 32;
        this.squarePosition[3] = 51;
      } else if (this.num == 6) {
        this.squarePosition[0] = 11;
        this.squarePosition[1] = 31;
        this.squarePosition[2] = 32;
        this.squarePosition[3] = 52;
      }
      for (let i = 0; i < this.squarePosition.length; i++) {
        if (this.mapStart[this.squarePosition[i]].hasDiv) {
          this.gameOver = true;
          break;
        }
        this.mapStart[this.squarePosition[i]].hasDiv = true;
        this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
      }
    },

    //方块往下移动
    squareMove() {
      let canMove = true;
      for (let i = 0; i < this.squarePosition.length; i++) {
        if (
          this.squarePosition[i] + 20 >= 500 ||
          this.mapStart[this.squarePosition[i] + 20].hasSuo
        ) {
          canMove = false;
          break;
        }
      }
      if (canMove) {
        let n;
        n = this.mapStart[this.squarePosition[0]].squareType;
        for (let i = 0; i < 4; i++) {
          this.mapStart[this.squarePosition[i]].hasDiv = false;
          this.mapStart[this.squarePosition[i]].squareType = 0;
          this.squarePosition[i] = this.squarePosition[i] + 20;
        }
        for (let i = 0; i < 4; i++) {
          this.mapStart[this.squarePosition[i]].squareType = n;
          this.mapStart[this.squarePosition[i]].hasDiv = true;
        }
      } else {
        for (let i = 0; i < this.squarePosition.length; i++) {
          this.mapStart[this.squarePosition[i]].hasSuo = true;
        }
        this.squareDisappear();
        this.squareType = 0;
        this.randomSquare();
      }
      if (this.gameOver) {
        clearInterval(this.move);
        if (!this.gamePause) {
          this.model = true;
        }
      }
    },
    //进行游戏
    playGame() {
      this.move = setInterval(() => {
        this.squareMove();
      }, 500);
    },
    //键盘事件
    keyboardEvent(obj) {
      console.log(obj);
      if (obj == 37) {
        let canMove = true;
        for (let i = 0; i < 4; i++) {
          if (
            this.mapStart[this.squarePosition[i]].Column == 1 ||
            this.mapStart[this.squarePosition[i] - 1].hasSuo
          ) {
            canMove = false;
            break;
          }
        }
        if (canMove) {
          let n = this.mapStart[this.squarePosition[0]].squareType;
          for (let i = 0; i < 4; i++) {
            this.mapStart[this.squarePosition[i]].hasDiv = false;
            this.mapStart[this.squarePosition[i]].squareType = 0;
            this.squarePosition[i] = this.squarePosition[i] - 1;
          }
          for (let i = 0; i < 4; i++) {
            this.mapStart[this.squarePosition[i]].hasDiv = true;
            this.mapStart[this.squarePosition[i]].squareType = n;
          }
        }
      } else if (obj == 39) {
        let canMove = true;
        for (let i = 0; i < 4; i++) {
          if (
            this.mapStart[this.squarePosition[i]].Column == 20 ||
            this.mapStart[this.squarePosition[i] + 1].hasSuo
          ) {
            canMove = false;
            break;
          }
        }
        if (canMove) {
          let n = this.mapStart[this.squarePosition[0]].squareType;
          for (let i = 0; i < 4; i++) {
            this.mapStart[this.squarePosition[i]].hasDiv = false;
            this.mapStart[this.squarePosition[i]].squareType = 0;
            this.squarePosition[i] = this.squarePosition[i] + 1;
          }
          for (let i = 0; i < 4; i++) {
            this.mapStart[this.squarePosition[i]].hasDiv = true;
            this.mapStart[this.squarePosition[i]].squareType = n;
          }
        }
      } else if (obj == 38) {
        //this.gameOver = !this.gameOver;
        this.squareChange();
      } else if (obj == 40) {
        this.squareMove();
      } else if (obj == 32) {
        if (!this.gameOver) {
          clearInterval(this.move);
        } else {
          this.playGame();
        }
        this.gameOver = !this.gameOver;
        this.gamePause = !this.gamePause;
      }
    },
    //变形
    squareChange() {
      if (this.num == 0) {
        if (this.squareType == 0) {
          if (
            !this.mapStart[this.squarePosition[1] - 20].hasDiv &&
            !this.mapStart[this.squarePosition[1] + 40].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[1] - 20;
            this.squarePosition[2] = this.squarePosition[1] + 20;
            this.squarePosition[3] = this.squarePosition[1] + 40;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 1;
          }
        } else if (this.squareType == 1) {
          if (
            !this.mapStart[this.squarePosition[1] - 1].hasDiv &&
            !this.mapStart[this.squarePosition[1] + 2].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[1] - 1;
            this.squarePosition[2] = this.squarePosition[1] + 1;
            this.squarePosition[3] = this.squarePosition[1] + 2;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 0;
          }
        }
      } else if (this.num == 1) {
        if (this.squareType == 0) {
          if (!this.mapStart[this.squarePosition[2] + 20].hasDiv) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[1] = this.squarePosition[2] + 20;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 1;
          }
        } else if (this.squareType == 1) {
          if (!this.mapStart[this.squarePosition[2] - 1].hasDiv) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[2] - 1;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 2;
          }
        } else if (this.squareType == 2) {
          if (!this.mapStart[this.squarePosition[2] - 20].hasDiv) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[3] = this.squarePosition[2] - 20;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 3;
          }
        } else if (this.squareType == 3) {
          if (!this.mapStart[this.squarePosition[2] + 1].hasDiv) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[2] - 20;
            this.squarePosition[1] = this.squarePosition[2] - 1;
            this.squarePosition[3] = this.squarePosition[2] + 1;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 0;
          }
        }
      } else if (this.num == 3) {
        if (this.squareType == 0) {
          if (
            !this.mapStart[this.squarePosition[2] - 20].hasDiv &&
            !this.mapStart[this.squarePosition[2] - 40].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[2] - 20;
            this.squarePosition[1] = this.squarePosition[2] - 40;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 1;
          }
        } else if (this.squareType == 1) {
          if (
            !this.mapStart[this.squarePosition[2] + 2].hasDiv &&
            !this.mapStart[this.squarePosition[2] + 20].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[2] + 2;
            this.squarePosition[1] = this.squarePosition[2] + 20;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 2;
          }
        } else if (this.squareType == 2) {
          if (
            !this.mapStart[this.squarePosition[3] + 40].hasDiv &&
            !this.mapStart[this.squarePosition[3] + 20].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[3] + 40;
            this.squarePosition[1] = this.squarePosition[3] + 20;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 3;
          }
        } else if (this.squareType == 3) {
          if (
            !this.mapStart[this.squarePosition[3] - 2].hasDiv &&
            !this.mapStart[this.squarePosition[3] - 20].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[3] - 20;
            this.squarePosition[1] = this.squarePosition[3] - 2;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 0;
          }
        }
      } else if (this.num == 4) {
        if (this.squareType == 0) {
          if (
            !this.mapStart[this.squarePosition[1] + 20].hasDiv &&
            !this.mapStart[this.squarePosition[1] + 40].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[1] + 20;
            this.squarePosition[3] = this.squarePosition[1] + 40;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 1;
          }
        } else if (this.squareType == 1) {
          if (
            !this.mapStart[this.squarePosition[2] - 2].hasDiv &&
            !this.mapStart[this.squarePosition[2] + 20].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[2] - 2;
            this.squarePosition[3] = this.squarePosition[2] + 20;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 2;
          }
        } else if (this.squareType == 2) {
          if (
            !this.mapStart[this.squarePosition[2] - 20].hasDiv &&
            !this.mapStart[this.squarePosition[2] - 40].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[2] - 20;
            this.squarePosition[3] = this.squarePosition[2] - 40;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 3;
          }
        } else if (this.squareType == 3) {
          if (
            !this.mapStart[this.squarePosition[1] - 20].hasDiv &&
            !this.mapStart[this.squarePosition[1] + 2].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[1] - 20;
            this.squarePosition[3] = this.squarePosition[1] + 2;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 0;
          }
        }
      } else if (this.num == 5) {
        if (this.squareType == 0) {
          if (
            !this.mapStart[this.squarePosition[2] + 20].hasDiv &&
            !this.mapStart[this.squarePosition[2] + 21].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[2] + 20;
            this.squarePosition[3] = this.squarePosition[2] + 21;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 1;
          }
        } else if (this.squareType == 1) {
          if (
            !this.mapStart[this.squarePosition[2] - 20].hasDiv &&
            !this.mapStart[this.squarePosition[2] + 19].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[2] - 20;
            this.squarePosition[3] = this.squarePosition[2] + 19;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 0;
          }
        }
      } else if (this.num == 6) {
        if (this.squareType == 0) {
          if (
            !this.mapStart[this.squarePosition[1] + 20].hasDiv &&
            !this.mapStart[this.squarePosition[1] + 19].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[1] + 20;
            this.squarePosition[3] = this.squarePosition[1] + 19;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 1;
          }
        } else if (this.squareType == 1) {
          if (
            !this.mapStart[this.squarePosition[2] + 20].hasDiv &&
            !this.mapStart[this.squarePosition[1] - 20].hasDiv
          ) {
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = false;
              this.mapStart[this.squarePosition[i]].squareType = 0;
            }
            this.squarePosition[0] = this.squarePosition[1] - 20;
            this.squarePosition[3] = this.squarePosition[2] + 20;
            for (let i = 0; i < 4; i++) {
              this.mapStart[this.squarePosition[i]].hasDiv = true;
              this.mapStart[this.squarePosition[i]].squareType = this.num + 1;
            }
            this.squareType = 0;
          }
        }
      }
    },
    //抵消
    squareDisappear() {
      let row = [];
      let index = 0;
      for (let i = 0; i < 25; i++) {
        let count = 0;
        for (let j = 0; j < 20; j++) {
          if (this.mapStart[i * 20 + j].hasSuo) {
            count++;
          }
        }
        if (count == 20) {
          row[index] = i + 1;
          index++;
          // this.score++;//普通的加分方式
        }
      }
      if (row.length == 4) {
        this.$Message.info('干的漂亮！');
      }
      this.score = this.score + row.length * row.length;
      //console.log(row);
      if (row != '') {
        for (let i = 0; i < 500; i++) {
          for (let j = 0; j < row.length; j++) {
            if (this.mapStart[i].Row == row[j]) {
              this.mapStart[i].hasDiv = false;
              this.mapStart[i].hasSuo = false;
            }
          }
        }
        for (let i = 499; i >= 0; i--) {
          for (let j = 0; j < row.length; j++) {
            if (this.mapStart[i].hasSuo && this.mapStart[i].Row < row[j]) {
              this.mapStart[i].hasDiv = false;
              this.mapStart[i].hasSuo = false;
              this.mapStart[i + 20 * row.length].hasDiv = true;
              this.mapStart[i + 20 * row.length].hasSuo = true;
            }
          }
        }
      }
    },
    ok() {
      this.restart();
      this.playGame();
    },
    cancel() {
      //this.$Message.info('Clicked cancel');
    },
    restart() {
      this.statMap();
      this.randomSquare();
      // this.playGame();
    }
  },
  //接收键盘事件
  created: function() {
    var _this = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      _this.keyboardEvent(key);
    };
  }
};
</script>
<style lang="scss" scoped>
.center {
  width: 440px;
  height: 550px;
  background-color: rgb(71, 71, 71);
  // margin-left: auto;
  //margin-right: auto;
  float: left;
}
.gameMap {
  width: 440px;
  height: 550px;
  margin: auto;
  overflow: hidden;
  top: 20px;
}
.centerAll {
  width: 560px;
  margin-left: calc(50% - 220px);
}
.mapDiv {
  width: 20px;
  height: 20px;
  //background-color: rgb(192, 192, 192);
  float: left;
  margin: 1px 1px 1px 1px;
}
.prompt {
  float: left;
  width: 100px;
  margin-left: 20px;
}
</style>