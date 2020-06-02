const { homePageUrl } = require('../../config/config')

Component({
  properties: {
    url: {
      type: String,
      observer(homePageUrl) {
        this.setData({ homePageUrl })
      }
    }
  },
  data: {
    homePageUrl
  },
  methods: {
    
  }
})
