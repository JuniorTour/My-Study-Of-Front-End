##### 1.let router = new VueRouter()
而不是：let router = Vue.extend(VueRouter)，这会报错：router.map is not a function...
，脑残，折腾了一下午...

##### 2.又学到一招：手机访问同一局域网下的pc的localhost
1.通过ipconfig(win)/ifconfig(mac)查看本机ipv4 地址，一般是192.168.1.1xx。
2.注意暂时关闭pc的防火墙，所有防火墙，所有！！
3.手机访问相应的192.168.1.1xx:8080，记得加上端口号！！
(～￣▽￣)～ 

##### 3.retina屏1px border hack：

  .border-1px {
    position: relative;
  }
  .border-1px:after {
    width: 100%;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: ' ';
  }
  @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
    .border-1px:after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .border-1px:after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }