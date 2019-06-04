import _ from 'lodash';
import './style.css';
import iconMatch from './asset/images/matchstick.jpg';
import noteXml from './asset/xml/note.xml';
import printMe from './print.js';

function component() {
  let element = document.createElement('div');
  let btn = document.createElement('button');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('color-red', 'ff-hunzi')

  btn.innerHTML = '点击这里，然后查看 console！';
  btn.onclick = printMe;
  element.appendChild(btn);

  var Icon = new Image()
  Icon.src = iconMatch
  Icon.width = 100
  element.appendChild(Icon)

  console.log(noteXml)

  return element;
}

document.body.appendChild(component());