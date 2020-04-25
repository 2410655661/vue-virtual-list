<template>
  <div class="virtual-list">
    <slot name="header"></slot>
    <div
      class="virtual-list_content"
      ref="content"
      @scroll.passive="scrollHandle"
    >
      <div :style="{
          paddingTop: lineTopHeight + 'px',
          paddingBottom: lineBottomHeight + 'px'
        }">
        <span
          v-for="item in previewList"
          :key="item.title"
        >
          <slot :row="item"></slot>
        </span>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import VirtualList from './virtual-helper';
import { debouce } from './utils';

export default {
  name: 'VirtualList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 50
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      virtual: null,
      start: 0,
      end: 0,
    }
  },
  computed: {
    previewList() {
      return this.list.slice(this.start, this.end);
    },
    lineTopHeight() {
      return this.start * this.height;
    },
    lineBottomHeight() {
      return (this.list.length - this.end) * this.height;
    }
  },
  mounted() {
    this.initData();
  },
  watch: {
    list(newVal) {
      if (newVal) {
        this.virtual.totalChange(newVal.length);
      }
    }
  },
  methods: {
    initData() {
      const boxHeight = this.reviceHeight();
      this.virtual = new VirtualList({
        ...boxHeight,
        total: this.list.length
      }, this.rangeChange);
    },
    reviceHeight() {
      const { content } = this.$refs;
      return {
        clientHeight: content.offsetHeight,
        scrollHeight: content.scrollHeight,
        itemHeight: this.height
      }
    },
    rangeChange(start, end) {
      this.start = start;
      this.end = end;
    },
    scrollHandle: debouce(function ({ target }) {
      const scrollTop = target.scrollTop;
      const isCanLoad = this.total > this.list.length;
      const isLoad = this.virtual.scroll(scrollTop, isCanLoad);
      isCanLoad && isLoad && this.load();
    }, 100),
    load() {
      this.$emit('load');
    }
  }
}
</script>

<style scoped>
.virtual-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.virtual-list_content {
  flex: 1;
  overflow: auto;
}
</style>
