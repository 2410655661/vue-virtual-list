// total: 数据总条数
// index：当前可视区域的索引
// maxIndex：最大可视区域的索引
// amount: 可视item的数量
// itemHeight: item高度
// rangeNotify: range通知事件
// prevScroll: 上一次滚动的位置

class VirtualList {
  constructor(params, notify) {
    this.rangeNotify = notify;
    this.init(params);
  }

  get start() {
    const rawStart = (this.index - 1) * this.amount;
    return Math.max(rawStart, 0);
  }

  get end() {
    const rawEnd = (this.index + 2) * this.amount;
    return Math.min(rawEnd, this.total);
  }

  init(params) {
    this.generateAmount(params);
    this.initIndex(params);

  }

  initIndex({ total }) {
    this.index = 0;
    this.total = total;
    this.maxIndex = Math.ceil(total / this.amount) - 1;
  }

  generateAmount({ clientHeight, itemHeight }) {
    const amount = Math.ceil(clientHeight / itemHeight);
    this.itemHeight = itemHeight;
    this.amount = amount;
  }

  isBottom() {
    return this.index >= this.maxIndex;
  }

  totalChange(total) {
    this.total = total;
    this.notify();
  }

  notify() {
    this.rangeNotify(this.start, this.end);
  }

  scroll(scrollTop, isCanLoad) {
    const currentIndex = Math.round(scrollTop / this.itemHeight / this.amount);
    const prevScroll = this.prevScroll;
    this.prevScroll = scrollTop;
    let isNeedLoad = false;
    // 优先当前屏的情况
    if (currentIndex === this.index) {
      isNeedLoad = this.total < (currentIndex + 1) * this.amount;
    } else if (prevScroll > scrollTop) {
      // 向上滚动逻辑
      this.upScroll(currentIndex);
    } else if (isCanLoad && prevScroll < scrollTop) {
      // 向下滚动逻辑
      isNeedLoad = this.downScroll(currentIndex);
    }
    return isNeedLoad;
  }

  upScroll(index) {
    this.setIndexAndNotify(index);
  }

  downScroll(index) {
    this.setIndexAndNotify(index);
    return true;
  }

  setIndexAndNotify(index) {
    this.index = index;
    this.notify();
  }
}

export default VirtualList;
