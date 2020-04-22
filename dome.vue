<template>
  <div class="screen-model">
    <virtual-list>
      <template v-slot:header>
        <div class="header">
          <span v-for="item in 4" :key="item">{{item}}</span>
        </div>
      </template>
      <template v-slot:footer>
        <p class="footer">I'm footer which used to jump new link!</p>
      </template>
    </virtual-list>
  </div>
</template>

<script>
import VirtualList from './vue-virtual-list';

export default {
  name: 'dome',
  components: {
    'virtual-list': VirtualList
  }
}
</script>

<style scoped>
.screen-model {
  border: 1px #333 solid;
  width: 300px;
  height: 500px;
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
