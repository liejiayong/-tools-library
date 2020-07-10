/*
 * Description: 
 * version: 
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-06-18 17:37:09
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-07-10 19:37:26
 */

/**
* 判断是否DOM元素
* @param {*} obj DOM Object
*/
function isElement(obj) {
  return (typeof HTMLElement === 'object')
    ? (obj instanceof HTMLElement)
    : !!(obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === 'string');
}
/**
 * 判断是否为函数对象
 * @param {*} obj Function Object
 */
function isFunction(obj) {
  return obj && typeof obj === 'function'
}

function preStyleCss(style) {
  var el = document.createElement('div');

  var vendor = (function () {
    var transformName = {
      webkit: 'webkitTransform',
      moz: 'MozTransform',
      o: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
    };
    for (var key in transformName) {
      if (el[key] !== 'undefined') {
        return key;
      }
    }
    return false;
  })();

  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    return style;
  }

  return '-' + vendor + '-' + style;
}

/**
 * document对象
 */
const docEle = document.documentElement || document.body
const cssName = {
  transform: preStyleCss('transform')
  , 'transform-origin': preStyleCss('transform-origin')
  , transition: preStyleCss('transition')
}

export default class Orient {
  // _VERSION = '0.0.1'
  // get version() {
  //   return this._VERSION
  // }
  // set version(v) {
  //   return new Error('this params version can modifity!')
  // }

  constructor(el, config) {
    this.listeners = []
    this.mode = config.mode || Orient.MODE.portrait
    this.modeStat = Orient._detectOrient()
    this.icon = {
      portrait: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAS1BMVEUAAAD09PT5+fn8/Pz////5+fny8vL////5+fn39/f6+vr////x8fH////////+/v7////x8fH39/f////////////////x8fH///+HBPvxAAAAF3RSTlMADSCUBmbWn1c2gvHBvq1uKOpP187lQw7/C7wAAAPMSURBVHja7d3JkpswEIDh1mYWA8Ispt//STNS2XHbcQgkyK0k/R/mMKevRsgGaQrBI1Wa5rJ8qEtjSgU/ps3y8YyG52y9sFRbIOnTwtRJPxTVZWHrUsEtzaAgDg0xdVpYO6nIqBfm6jgkC3saAMzCngFQu4dyULCaGnZfbArK/RfUL1N7HeXuMRlgQ8PuUWl2//02tHekG7jkwLjAksOgLLDkcIl+MXKYsF+MLBKGMIQhjL+f4RR8NOXeMRx8PP+GoeDjqTcMYEgYwhCGMIQhDGF8JQyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCWKvyph3PiHie28JXloFhyy4AaOeuVHBP+w8wtCEGKjEaYmoakzN0gT+viJAOsUrLsDWuV1swiGiSMvoRvzcZf+210v3Vmenx69GEn3NKhsN7rVNAU67Fp67pGAZvFf3bK5cyilQMe782Ow3v0x2ZNioR46aYB/h55cNRpmEYjLUaViJ/ji4Jw2GssOtUkkrA6DFmYC2PNHc8w44bLv8Bn2qPZ9QYai2s1ZemnYlDH83QGJo1/Do91N2IMX8cg87VAbamKl9MOB3M0GQG7qg/mGEiQzPfBNozmSV8jBJDPTeji5OV/c48jonjZlQYUtwMHxQT++NSnK6GndEGhmdnjIFxZWfEidKzM8gnOSejDlnYmzIh9vUNjSF2Rh+fVtgZ18AY2Rk+MFp2hgkM/kt0CgzPzVAYqrgZLk4U9nXRNjA6bkaPoZKbUcQxscwMTZ7/j2P0sLMuMvTBjAmnwlcKtjaQZYgDGR5jY1cPm57q51QLC4/m1pTrg2RbDNVwNANafGrYsAwx2uMZDml+y5JhD8czFFWYLYu4DhIwNi946pZQD2LsX/4dZrJinoChzhjbtmZe2EQMKJBk3kH6glw8qRhXyljfT3GQjgFx1M3T7pK77S75p92lHlIyTFBs2mtLyqgQu007j2kZME5qwz5scobXcE+93ZW2DHv0tvJFO8c9+rE1vvrP/2NBGMK4JwyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAkjafm+JzCTtyZm8g7Jnf3rL/bckTBowqBlx2ictla7hpVxquBWdeJjNAq+pxouxkkBSZ2YGBU8VfEwGnipYWE4eMmxMDS8pFkYFl6yLAyVB6M/clAuy+9Wwkvl8rtdoMlhwjZgcvj4MlDm8GFegsrhq00BGP4vegMA+o9ve1T/h7c9Op/DsHI5GiyTg9JyOTYul0P0cjlSMJcDFrmPm/wGYAznCtxJQgcAAAAASUVORK5CYII='
      , landscape: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAS1BMVEUAAAD09PT5+fn8/Pz////5+fny8vL////5+fn39/f6+vr////x8fH////////+/v7////x8fH39/f////////////////x8fH///+HBPvxAAAAF3RSTlMADSCUBmbWn1c2gvHBvq1uKOpP187lQw7/C7wAAAPMSURBVHja7d3JkpswEIDh1mYWA8Ispt//STNS2XHbcQgkyK0k/R/mMKevRsgGaQrBI1Wa5rJ8qEtjSgU/ps3y8YyG52y9sFRbIOnTwtRJPxTVZWHrUsEtzaAgDg0xdVpYO6nIqBfm6jgkC3saAMzCngFQu4dyULCaGnZfbArK/RfUL1N7HeXuMRlgQ8PuUWl2//02tHekG7jkwLjAksOgLLDkcIl+MXKYsF+MLBKGMIQhjL+f4RR8NOXeMRx8PP+GoeDjqTcMYEgYwhCGMIQhDGF8JQyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCWKvyph3PiHie28JXloFhyy4AaOeuVHBP+w8wtCEGKjEaYmoakzN0gT+viJAOsUrLsDWuV1swiGiSMvoRvzcZf+210v3Vmenx69GEn3NKhsN7rVNAU67Fp67pGAZvFf3bK5cyilQMe782Ow3v0x2ZNioR46aYB/h55cNRpmEYjLUaViJ/ji4Jw2GssOtUkkrA6DFmYC2PNHc8w44bLv8Bn2qPZ9QYai2s1ZemnYlDH83QGJo1/Do91N2IMX8cg87VAbamKl9MOB3M0GQG7qg/mGEiQzPfBNozmSV8jBJDPTeji5OV/c48jonjZlQYUtwMHxQT++NSnK6GndEGhmdnjIFxZWfEidKzM8gnOSejDlnYmzIh9vUNjSF2Rh+fVtgZ18AY2Rk+MFp2hgkM/kt0CgzPzVAYqrgZLk4U9nXRNjA6bkaPoZKbUcQxscwMTZ7/j2P0sLMuMvTBjAmnwlcKtjaQZYgDGR5jY1cPm57q51QLC4/m1pTrg2RbDNVwNANafGrYsAwx2uMZDml+y5JhD8czFFWYLYu4DhIwNi946pZQD2LsX/4dZrJinoChzhjbtmZe2EQMKJBk3kH6glw8qRhXyljfT3GQjgFx1M3T7pK77S75p92lHlIyTFBs2mtLyqgQu007j2kZME5qwz5scobXcE+93ZW2DHv0tvJFO8c9+rE1vvrP/2NBGMK4JwyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAkjafm+JzCTtyZm8g7Jnf3rL/bckTBowqBlx2ictla7hpVxquBWdeJjNAq+pxouxkkBSZ2YGBU8VfEwGnipYWE4eMmxMDS8pFkYFl6yLAyVB6M/clAuy+9Wwkvl8rtdoMlhwjZgcvj4MlDm8GFegsrhq00BGP4vegMA+o9ve1T/h7c9Op/DsHI5GiyTg9JyOTYul0P0cjlSMJcDFrmPm/wGYAznCtxJQgcAAAAASUVORK5CYII='
      , current: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAS1BMVEUAAAD09PT5+fn8/Pz////5+fny8vL////5+fn39/f6+vr////x8fH////////+/v7////x8fH39/f////////////////x8fH///+HBPvxAAAAF3RSTlMADSCUBmbWn1c2gvHBvq1uKOpP187lQw7/C7wAAAPMSURBVHja7d3JkpswEIDh1mYWA8Ispt//STNS2XHbcQgkyK0k/R/mMKevRsgGaQrBI1Wa5rJ8qEtjSgU/ps3y8YyG52y9sFRbIOnTwtRJPxTVZWHrUsEtzaAgDg0xdVpYO6nIqBfm6jgkC3saAMzCngFQu4dyULCaGnZfbArK/RfUL1N7HeXuMRlgQ8PuUWl2//02tHekG7jkwLjAksOgLLDkcIl+MXKYsF+MLBKGMIQhjL+f4RR8NOXeMRx8PP+GoeDjqTcMYEgYwhCGMIQhDGF8JQyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCWKvyph3PiHie28JXloFhyy4AaOeuVHBP+w8wtCEGKjEaYmoakzN0gT+viJAOsUrLsDWuV1swiGiSMvoRvzcZf+210v3Vmenx69GEn3NKhsN7rVNAU67Fp67pGAZvFf3bK5cyilQMe782Ow3v0x2ZNioR46aYB/h55cNRpmEYjLUaViJ/ji4Jw2GssOtUkkrA6DFmYC2PNHc8w44bLv8Bn2qPZ9QYai2s1ZemnYlDH83QGJo1/Do91N2IMX8cg87VAbamKl9MOB3M0GQG7qg/mGEiQzPfBNozmSV8jBJDPTeji5OV/c48jonjZlQYUtwMHxQT++NSnK6GndEGhmdnjIFxZWfEidKzM8gnOSejDlnYmzIh9vUNjSF2Rh+fVtgZ18AY2Rk+MFp2hgkM/kt0CgzPzVAYqrgZLk4U9nXRNjA6bkaPoZKbUcQxscwMTZ7/j2P0sLMuMvTBjAmnwlcKtjaQZYgDGR5jY1cPm57q51QLC4/m1pTrg2RbDNVwNANafGrYsAwx2uMZDml+y5JhD8czFFWYLYu4DhIwNi946pZQD2LsX/4dZrJinoChzhjbtmZe2EQMKJBk3kH6glw8qRhXyljfT3GQjgFx1M3T7pK77S75p92lHlIyTFBs2mtLyqgQu007j2kZME5qwz5scobXcE+93ZW2DHv0tvJFO8c9+rE1vvrP/2NBGMK4JwyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAmDJgyaMGjCoAkjafm+JzCTtyZm8g7Jnf3rL/bckTBowqBlx2ictla7hpVxquBWdeJjNAq+pxouxkkBSZ2YGBU8VfEwGnipYWE4eMmxMDS8pFkYFl6yLAyVB6M/clAuy+9Wwkvl8rtdoMlhwjZgcvj4MlDm8GFegsrhq00BGP4vegMA+o9ve1T/h7c9Op/DsHI5GiyTg9JyOTYul0P0cjlSMJcDFrmPm/wGYAznCtxJQgcAAAAASUVORK5CYII='
    } // 预设竖屏与横屏图标

    this.default = Orient._getDefault(config)
    this.$parent = isElement(el) ? el : typeof el === 'string' ? document.querySelector(el) : null

    if (this.default.isModal) {
      Orient._createTipsStyle(Orient.DEFAULTS.modal.zIndex)
      Orient._createTipsDOM({ ...this.default.modal, mode: this.mode, iconURL: this.icon.current })
        .then(el => {
          this.$modal = el
          this.update()
        })
    }

    window.addEventListener('resize', () => {
      this.update()

      this.listeners.forEach(handler => {
        const callback = handler.callback
        if (isFunction(callback)) {
          callback({
            current: this.modeStat,
            mode: this.mode,
            modeCustom: handler.mode
          })
        }
      })
    })
  }
  update() {
    this.modeStat = Orient._detectOrient()
    this.$parent.style.cssText = Orient._getParentStyle(this.modeStat, this.default.modal.zIndex)

    if (this.default.isModal) {
      if (this.modeStat != this.mode) {
        this.$modal.classList.add('active')
      } else {
        this.$modal.classList.remove('active')
      }
    }
  }
  /**
   * window 窗口切换
   * @param {*} mode 匹配模式。若都不匹配则在两种模式下佳运行
   * @param {*} callback 回调函数
   */
  onOrient(mode, callback) {
    if (isFunction(callback)) {
      this.listeners.push({ mode, callback })
    } else {
      return new TypeError('callback must be a function!')
    }
  }
  //   /**
  //  * 设置icon
  //  * @param {String} param0 
  //  */
  // setIcon({ mode, portrait, landscape }) {
  //   if (mode) this.default.mode = mode
  //   if (portrait) this.icon.portrait = portrait
  //   if (landscape) this.icon.landscape = landscape
  // }
  // /**
  //  * 设置模式
  //  * @param {String} mode 屏幕显示模式：portrait|landscape
  //  */
  // setMode(mode) {
  //   if (!Orient.MODE[mode]) return
  //   this.mode = mode
  // }
  // /**
  //  * 构造函数初始化，模态框DOM挂载前
  //  * @param {*} callback 回调函数
  //  */
  // beforeMount(callback) {
  //   if (isFunction(callback)) {
  //     callback()
  //   } else {
  //     return new TypeError('callback must be a function!')
  //   }
  // }
  // /**
  //  * 构造函数初始化，模态框DOM挂载后
  //  * @param {*} callback 回调函数
  //  */
  // mounted(callback) {
  //   if (isFunction(callback)) {
  //     callback()
  //   } else {
  //     return new TypeError('callback must be a function!')
  //   }
  // }
  static _detectOrient() {
    const screen = window.screen
    const clientWidth = docEle.clientWidth
    const min = Math.min(screen.width, screen.height)
    const max = Math.max(screen.width, screen.height)

    if (clientWidth === max) {
      return Orient.MODE.landscape
    }
    if (clientWidth === min) {
      return Orient.MODE.portrait
    }
    return false
  }
  static _getParentStyle(mode, zIndex) {
    const clientWidth = docEle.clientWidth
    const clientHeight = docEle.clientHeight

    let width
      , height
      , rotate
      , originX
      , originY

    switch (mode) {
      case Orient.MODE.portrait:
        width = clientHeight
        height = clientWidth
        rotate = '-90deg'
        originX = clientHeight / 2
        originY = clientHeight / 2
        break
      case Orient.MODE.landscape:
        width = clientHeight
        height = clientWidth
        rotate = '90deg'
        originX = clientWidth / 2
        originY = clientWidth / 2
        break
      default:
        width = clientWidth
        height = clientHeight
        rotate = '0'
        originX = '0'
        originY = '0'
    }

    const cssText = `
      display: block;
      // position: fixed;
      position: absolute;
      top: 0;
      left: 0;
      z-index: ${zIndex};
      width: ${width}px;
      height: ${height}px;
      ${cssName['transform']}: rotate(${rotate});
      ${cssName['transform-origin']}: ${originX}px ${originY}px;
    `

    return cssText
  }
  static _createTipsStyle(zIndex) {
    const cssText = `
      .${Orient.DEFAULTS.modal.containerCls} {
        display: none;
        pointer-events: none;
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0, 0.8);
        z-index: ${zIndex};
      }
      .${Orient.DEFAULTS.modal.containerCls}.${Orient.DEFAULTS.modal.activeCls} {
        display: block;
        visibility: visible;
        pointer-events: auto;
        animation: fadeIn .3s ease-in;
      }
      .${Orient.DEFAULTS.modal.innerCls}{
        position: absolute;top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
      .${Orient.DEFAULTS.modal.iconCls} {
        margin:30px auto;
        display: block;
        width: 38px;
        animation: rotate90 1.6s ease-in infinite;
      }
      .${Orient.DEFAULTS.modal.iconCls} img {
        display:block;
        width: 100%;
        -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;
      }
      .${Orient.DEFAULTS.modal.textCls} {
        white-space: nowrap;
        font-size: 14px;
        text-align: center;
        color: #fff;
      }
      @-webkit-keyframes fadeIn { 0% { display: none;
        opacity: 0; }
        100% { display: block;
          opacity: 1; } }
      
      @-moz-keyframes fadeIn { 0% { display: none;
          opacity: 0; }
        100% { display: block;
          opacity: 1; } }
      
      @keyframes fadeIn { 0% { display: none;
          opacity: 0; }
        100% { display: block;
          opacity: 1; } }
      @-webkit-keyframes rotate90 { 
        0% { 
          -ms-transform: rotate(0);
          -o-transform: rotate(0);
          -moz-transform: rotate(0);
          -webkit-transform: rotate(0);
          transform: rotate(0);
        }
        50% {
          -ms-transform: rotate(90deg);
          -o-transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
        } 
        100% {
          -ms-transform: rotate(0);
          -o-transform: rotate(0);
          -moz-transform: rotate(0);
          -webkit-transform: rotate(0);
          transform: rotate(0);
        } 
      }
      
      @-moz-keyframes rotate90 {
        0% { 
          -ms-transform: rotate(0);
          -o-transform: rotate(0);
          -moz-transform: rotate(0);
          -webkit-transform: rotate(0);
          transform: rotate(0);
        }
        50% {
          -ms-transform: rotate(90deg);
          -o-transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
        } 
        100% {
          -ms-transform: rotate(0);
          -o-transform: rotate(0);
          -moz-transform: rotate(0);
          -webkit-transform: rotate(0);
          transform: rotate(0);
        } 
      }
      
      @keyframes rotate90 {
        0% { 
          -ms-transform: rotate(0);
          -o-transform: rotate(0);
          -moz-transform: rotate(0);
          -webkit-transform: rotate(0);
          transform: rotate(0);
        }
        50% {
          -ms-transform: rotate(90deg);
          -o-transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
        } 
        100% {
          -ms-transform: rotate(0);
          -o-transform: rotate(0);
          -moz-transform: rotate(0);
          -webkit-transform: rotate(0);
          transform: rotate(0);
        } 
      }
    `

    const doc = document
    const style = doc.createElement('style')
    if (style.styleSheet) {
      // IE8 and below.
      style.styleSheet.cssText = cssText
    } else {
      style.appendChild(doc.createTextNode(cssText))
    }
    doc.head.appendChild(style)
  }

  static _createTipsDOM({ mode, id, containerCls, innerCls, iconCls, textCls, tip, portrait, landscape, iconURL }) {
    return new Promise((resolve, reject) => {
      try {
        const doc = document
        const docEle = document.documentElement.body || document.body
        const frame = doc.createDocumentFragment()
        const $orient = doc.createElement('div')
        $orient.id = id
        $orient.className = containerCls

        const $inner = doc.createElement('div')
        $inner.className = innerCls

        const $icon = doc.createElement('div')
        $icon.className = iconCls

        const $text = doc.createElement('p'),
          modeStat = Orient.MODE.portrait === mode ? portrait : landscape
        $text.className = textCls
        $text.innerText = tip.replace(/{mode}/g, modeStat)

        const $img = new window.Image()
        $img.src = iconURL
        $img.onload = () => {
          resolve($orient)
          $icon.appendChild($img)
        }
        $img.onerror = err => {
          reject(err)
          console.log(11)
        }

        $orient.appendChild($inner)
        $inner.appendChild($text)
        $inner.appendChild($icon)
        frame.appendChild($orient)
        docEle.appendChild(frame)

      } catch (error) {
        reject()
      }
    })
  }

  static _getDefault(config) {
    const modal = Object.assign({}, Orient.DEFAULTS.modal, config.modal)
    const ret = Object.assign({}, Orient.DEFAULTS, config)
    ret.modal = modal
    ret.mode = config.mode
    return ret
  }
}


Orient.MODE = {
  portrait: 'portrait'
  , landscape: 'landscape'
}

Orient.DEFAULTS = {
  modal: {
    id: 'jyModalOrient'
    , containerCls: 'jy_modal_orient_'
    , innerCls: 'jy_modal_orient_inner'
    , iconCls: 'jy_modal_orient_icon'
    , textCls: 'jy_modal_orient_text'
    , activeCls: 'active'
    , tip: '为了更好的体验，请锁定屏幕保持{mode}浏览'
    , portrait: '竖屏'
    , landscape: '横屏'
    , zIndex: 1000
  } // 模态框基础
  // , container:,
  , mode: Orient.MODE.portrait // 默认：portrait。 portrait|landscape
  , isModal: true
}
