import VirtualList from './src/vue-virtual-list';

VirtualList.install = function(Vue) {
  Vue.component(VirtualList.name, VirtualList);
}

export default VirtualList;
