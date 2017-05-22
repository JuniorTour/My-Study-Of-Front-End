/**
 * Created by asus-pc on 2017/5/22 0022.
 */
import _ from 'lodash'

function component () {
    var element = document.createElement('div');

    /* 需要引入 lodash，下一行才能正常工作 */
    element.innerHTML = _.join(['Hello','webpack'], ' ');

    return element;
}

document.body.appendChild(component());