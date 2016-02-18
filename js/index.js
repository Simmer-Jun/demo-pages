/*
****************  UMD 通用模块定义 ==>
*/
// 策略模式 策略类 ==>
var moduleObj = {
    amd: function(args) {
        args.define(args.factory);
    },
    commonJs: function (args) {
        arg.module.exports = args.factory( );
    },
    global: function(args) {
        args.root[args.name] = args.factory( );
    }
};
// context
function moduleDe(moduleClass, args) {
    moduleObj[moduleClass](args);
};
~function (root, name, factory) {
    if(typeof define === 'function' && define.amd) {
        moduleDe('amd', {
            define: define,
            factory: factory
        });
    } else if (typeof exports === 'object') {
        moduleDe('commonJs', {
            module: module,
            factory: factory
        });
    } else {
        moduleDe('global', {
            root: root,
            name: name,
            factory: factory
        });
    }
}(window, 'demoConstructor', function ( ) {
    // factory function begain here ==>
    /*
    ***********   constructor 构造器
    @para options {object}
    */
    function Constructor(options) {
        this.render = options.renderEngine || 'pure'; // render engine string
        this.renderFn = render[this.render]; // render 引擎   策略类 里面有具体实现逻辑
        this.prepare = prepare[this.render]; // 指定相应的prepare函数
        this.items = (function (arr) { // IIFE
            return arr.sort(function() { // 打乱数组显示
                return Math.random() > 0.5;
            });
        } (options.items|| [ ])); 
        this.prepareResult = null;
        this.dom = document.getElementsByClassName(options.classChoose || null); // 获取dom
        this.init(); // init 初始化
    };
    Constructor.prototype.init = function( ) {
        this.prepareResult = this.prepare(this.items); // 传入数据
        this.renderFn(this.dom, this.prepareResult); // 传入之前准备好的结果开始渲染开始渲染
    };
    /*
    ************    render engine
    */
    var render = {
        react: function (dom, child) {
            // use react to render
        },
        pure: function(dom, child) { // dom {arryLike} child {arry}
            // use 原生渲染
            for(var i = 0, l = dom.length;i < l; i++ ) {
                dom[i].appendChild(child[i]);
                //console.log(dom[i], child[i]);
            };
            return;
        },
        jQuery: function (dom, child) {
            // use jQuery to render
        }
    };
    /*
    *************   prepare before render ==>
    */
    var prepare = {
        react: function(data) {
            ReactDom(data);
        },
        pure: function(data) {
            var arr = [];
            for(var i = 0, l = data.length; i < l; i++ ) {
                arr.push(DomCreate(data[i]));
            };
            return arr;
        },
        jQuery: function(data) {
            //
        }
    };
    /*
    ************   prepare needed function ==>
    */
    /*
    * React needed
    */
    function ReactDom(data) {
        
       //window.DOMContentLoaded();
    };
    /*
    **********  创建DOM的基础结构
    * @para data {object}  描述一个项目的对象 包括 title link 介绍等
    */
    function DomCreate(data) {
        /*
        * @para tagName {string}
        * @para className {string}
        * @para text {string}
        */
        
        function create(tagName, attr, child) {
            var e = document.createElement(typeof tagName === 'string'? tagName.toUpperCase(): null);
            var i, j;
            for(i in attr) { // 标签属性
                e.setAttribute(i, attr[i]);
            };
            for(i = 0,l = child.length; i < l; i ++) {
                e.appendChild(child[i]);
            };
            return e;
        };
        var h2 = create('h2', {}, [document.createTextNode(data.title)]);
        var itemHeader = create('div', {class: 'item-header'}, [h2]);
        
        var introLine = create('p', {class: 'intro-line'}, [document.createTextNode(data.introduction)]);
        var demoA = create('a', {
                        class: 'demo-link', // class not className !!!!!
                        title:'点击查看在线demo',
                        href: data.link.demo
                        }, [document.createTextNode('DEMO')]);
        var sourceA, linkBox;
        if(data.link.source) {
            sourceA = create('a',{
                        class: 'source-link',
                        title:'点击查看源码',
                        href: data.link.source
                        }, [document.createTextNode('SOURCE')]);
            linkBox = create('div', {class: 'link-line'},[demoA, sourceA]);
        } else {
            linkBox = create('div', {class: 'link-line'},[demoA]);
        }
        
        var itemIntro = create('div', {class: 'item-intro'}, [introLine, linkBox]);

        var itemContent = create('div', {class: 'item-content'}, [itemHeader, itemIntro]);
        return itemContent;
    };

    return Constructor;
});

