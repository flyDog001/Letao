### 布局(实现左右布局) 
    * 1.栅格布局
    * 2.左边固定宽度的容器添加浮动属性 , 右边的父容器添加一个overflow: hidden;
    * 3.布局中遇到的问题: inline-block(行内块元素)的垂直对齐问题
    * 4.写页面结构时,最外层的容器 建议使用id选择器命中(防止插件太多,选择器优先级不够的情况)

### 代码规范
    * 使用面向对象编程
    * 创建一个构造函数, 通过给构造函数的原型对象添加方法来管理所有的方法

### 获取地址栏中传递的参数
    /*获取地址栏中传递的参数*/
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }
    }

### 实现本地预览图片
 


