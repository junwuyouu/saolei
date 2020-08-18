<!--  -->
<template>
    <div>
        <div>
            <h2>贪吃蛇</h2>
            <span>得分：</span><span>{{ score }}</span>
            <div class="mapSnake">
                <div v-for="(item, index) in mapStart" :key="index">
                    <div class="item">{{ item.col }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            score: 0,
            mapStart: []
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.install();
    },

    methods: {
        install() {
            for (let i = 0; i < 600; i++) {
                let obj = {
                    row: parseInt(i / 30) + 1,
                    col: (i % 30) + 1,
                    isSnake: false,
                    isEat: false
                };
                this.mapStart.push(obj);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.mapSnake {
    width: 572px;
    height: 382px;
    background-color: rgb(0, 0, 0);
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid rgb(71, 71, 71);
    .item {
        width: 19px;
        height: 19px;
        float: left;
        border: 1px solid rgb(71, 71, 71);
    }
}
</style>