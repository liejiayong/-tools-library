Component({
  externalClasses: ['comment-cls', 'comment-hover'],
  properties: {
    list: {
      type: Array,
      observer(newVal, oldVal, changedPath) {
      }
    }
  },
  data: {
    likeLink: '../../common/images/icon-like.png',
    likedLink: '../../common/images/icon-liked.png'
  },
  methods: {
    // 点赞
    handleLike(e) {
      const dataSet = e.target.dataset;
      const liked = dataSet.liked ? 0 : 1;
      const index = dataSet.index;
      const currClick = this.data.list[index].liked ? true : false;
      const isClick = currClick ? false : true;
      const total = isClick ? +dataSet.total + 1 : +dataSet.total - 1;
      const opt = {
        capturePhase: true,
        bubbles: true
      };
      this.triggerEvent('likedchange', {
        liked,
        index,
        total
      }, opt);
    }
  }
})
