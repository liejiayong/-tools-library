const htmlDom = document.getElementsByClassName('html')[0]

function initHTML() {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
}

initHTML()
window.addEventListener('resize', () => {
  initHTML()
})