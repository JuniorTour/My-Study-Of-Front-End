import _ from 'lodash'
import '../css/main.css'
import '../css/sub.css'

let moment = require('moment');
console.log(moment().format());

function component () {
    let element = document.createElement('div');

    /* 需要引入 lodash，下一行才能正常工作 */
    element.innerHTML = _.join(['Hello','webpack'], ' ');

    return element;
}

document.body.appendChild(component());