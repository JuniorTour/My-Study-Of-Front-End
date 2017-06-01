<template>
  <li class="sec_li">
    <router-link to="/detail" class="lp_li_a">
      <div class="lp_li_imgWrap">
        <!--<img src="../assets/img/eg_0.jpg" :alt="index">-->
        <img :src="dynamicSrc(index)" :alt="index">
      </div>
      <p class="lp_li_name">{{ title }}</p>
      <p class="lp_li_price">￥{{ price }}元</p>
    </router-link>
  </li>
</template>

<script>
  export default {
    props: ['price', 'title', 'index'],
    methods: {
      dynamicSrc: function (index) {
        index %= 3
        return '/static/img/eg_' + index + '.jpg'
        /*参考https://segmentfault.com/q/1010000006743502,vue+webpack动态设置图片src导致404错误
        * 1.js动态生成的路径无法被url-loader解析到，如果你去build，会发现图片甚至不会打包输出到dist目录（webpack是按需打包的）。

         如果你是vue-cli初始化的项目，解决的办法：
         第一步，把图片放到src同级的static目录（build/build.js文件中有一段代码是把static目录拷贝到dist/static的），比如图片放在static/a.png
         第二步，js中使用/static/a.png去引用就行了。

                  我采用了这种解决方案。

         2.v-bind:src是作用于运行时的,简单来说就是绑定了一个属性,属性在程序运行过程中发生了变化,才会导致绑定src发生变化,你上面的第一种写法,最终生成的html就是

         <img src="../assets/logo1.png"/>
         <img src="../assets/logo2.png"/>
         <img src="../assets/logo3.png"/>
         会404是正常的,因为webpack根本没有打包相应的图片
         webpack完成的任务,实际上应该算编译时。
         你会发现最终打包处理的模板会是

         <img src="/path/to/your/image/logo1.hash.jpg"/>
         <img src="/path/to/your/image/logo2.hash.jpg"/>
         <img src="/path/to/your/image/logo.hash.jpg"/>*/
      }
    }
  }
</script>

<style scoped>

  .sec_li {
    float: left;
    width: 50%;
    margin-bottom: 0.1rem;
  }

  .lp_li_a {
    display: block;
    padding: 0.3rem 0;
    margin: 0 0.05rem;
    text-align: center;
    background: #fff;
  }

  .lp_li_imgWrap {
    padding: 0.24rem 0;
  }

  .lp_li_imgWrap > img {
    width: auto;
    height: 2.3rem;
  }

  .lp_li_name {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 16px;
    color: #333;
  }

  .lp_li_price {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 16px;
    color: #fb3b3b;
  }
</style>
