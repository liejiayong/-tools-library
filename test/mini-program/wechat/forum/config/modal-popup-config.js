const TYPE_POPUP_OPORATION_REPLY = '0'
const TYPE_POPUP_OPORATION_DELETE = '1'
const TYPE_POPUP_OPORATION_COPY = '2'
const TYPE_POPUP_OPORATION_CANCEL = '3'

const popupOporation = {
  [TYPE_POPUP_OPORATION_REPLY]: {
    type: TYPE_POPUP_OPORATION_REPLY,
    name: 'reply',
    text: '评论',
    status: true
  },
  [TYPE_POPUP_OPORATION_DELETE]: {
    type: TYPE_POPUP_OPORATION_DELETE,
    name: 'delete',
    text: '删除',
    status: false
  },
  [TYPE_POPUP_OPORATION_COPY]: {
    type: TYPE_POPUP_OPORATION_COPY,
    name: 'copy',
    text: '复制文字',
    status: true
  }
  // [TYPE_POPUP_OPORATION_CANCEL]: {
  //     type: TYPE_POPUP_OPORATION_CANCEL,
  //     name: 'cancel',
  //     text: '取消',
  //     status: true
  // }
}

module.exports = {
  popupOporation,
  TYPE_POPUP_OPORATION_CANCEL,
  TYPE_POPUP_OPORATION_DELETE,
  TYPE_POPUP_OPORATION_REPLY,
  TYPE_POPUP_OPORATION_COPY
}
