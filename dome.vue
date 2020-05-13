<template>
  <div class="screen-model">
    <virtual-list
      :list="list"
      :size="66"
      :total="total"
      @load="loadData"
    >
      <template v-slot:header>
        <div class="header">
          <span
            v-for="item in 4"
            :key="item"
          >{{item}}</span>
        </div>
      </template>
      <template v-slot:default="row">
        <div class="row-box">
          <h3>{{ row.row.todo }}</h3>
          <p>{{ row.row.desc }}</p>
        </div>
      </template>
      <template v-slot:footer>
        <p class="footer">I'm footer which used to jump new link!</p>
      </template>
    </virtual-list>
  </div>
</template>

<script>
import VirtualList from './virtual-list';

export default {
  name: 'dome',
  components: {
    'virtual-list': VirtualList
  },
  data() {
    return {
      list: [],
      size: 15,
      page: 1,
      total: 1000
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      setTimeout(() => {
        const result = this.generateData();
        this.list.push(...result);
      }, 100);
    },
    generateData() {
      const todos = ['吃饭', '睡觉', '聊天', '学习'];
      const list = [];
      for (let i = 0; i < 20; i++) {
        const id = `${(this.page - 1) * 15 + i}`.padStart(5, 'a');
        list.push({
          id,
          todo: todos[Math.floor(Math.random() * 3)],
          desc: '今天又是很充实的一天啊！'
        });
      }
      this.page++;
      return list;
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

body,
h3,
p {
  margin: 0;
}

.screen-model {
  height: 100%;
}

.row-box {
  padding: 10px;
  height: 46px;
  background-color: #f9f9f9;
}

.header {
  height: 80px;
  text-align: center;
  color: #fff;
  line-height: 80px;
  background-color: #2973b7;
}

.footer {
  overflow: hidden;
  margin: 0;
  height: 30px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
  line-height: 30px;
  background-color: #f2f2f2;
}
</style>
