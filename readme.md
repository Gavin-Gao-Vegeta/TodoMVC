##导入之后，下载 npm 依赖
cnmp install 后会安装好项目的两个依赖文件

##安装 Vue
cnpm i vue

##一个现代化的浏览器同步工具：browser-sync
cnpm i -D browser-sync

##配置 scripts
"dev": "browser-sync start --server --files _.html, css/_.css, js/\*.js",
"start": "npm run dev"
可直接在控制台输入 npm start 即可启动项目

##需求 1.数据列表开发
针对要使用 Vue 控制的部分，设置 id="app"

<section class="todoapp" id="app"></section>

由于我们要使任务列表为循环添加的，所以使用 v-for 进行循环输出

<li class="completed" v-for="item in todos"></li>
内容填充为
<label>{{item.title}}</label>
这里我们先写一个简单的数据，用于测试
const todos = [{
			id: 0,
			title: '吃饭',
			isFinish: true
		},
		{
			id: 1,
			title: '写代码',
			isFinish: false
		},
		{
			id: 2,
			title: '吃饭',
			isFinish: false
		}
	]

完成之后保存项目，即可看到页面显示

##需求 2.无数据列表开发
我们需要在无数据时，隐藏除了输入框之外的所有 list。
思路是使用 v-if 进行判断，有 todos 就显示，没有就隐藏。因此 v-if="todos.length"
我们需要隐藏的部分有两个，一个是 main，另一个是 footer，所以添加一个 template 组件，这个组件是 Vue 提供的，在页面刷新时不会增加这个组件进入 html 中，因此不会增加 DOM 结构。
<template v-if="todos.length"></template>
这样，在没有 todos 时，完成无数据列表开发。

##需求 3.添加 todo 数据
//1.获取点击事件，注册到组件上
<input class="new-todo" @keydown.enter="handleEnter" placeholder="What needs to be done?" autofocus>
//2.双向绑定数据，得到输入框内容。
v-model="message"
//3.将数据保存到列表中
const todos = this.todos;
//4.判断输入内容是否为空
if (!this.message) {
return;
} else {
todos.push({
id: todos[todos.length - 1].id + 1,
title: this.message,
isFinish: false
})
}
//5.完成后将输入框清空
this.message = '';

##需求 4.点击扣选框切换任务状态
v-model="item.completed"
由 completed 双向绑定视图显示

:class="{completed :item.completed}"
使用 item.completed 进行判断，true 时 class 就添加到 li 上

##需求 5.标记所有任务完成/未完成
@change="handleClick"
添加按钮的事件
handleClick(e) {
const checked = e.target.checked;
this.todos.forEach(item => {
item.completed = checked;
})

    		}

##需求 6.样式联动

联动切换所有任务状态

##需求 7.删除按键
传入参数，点击 button 拿到对应的数组下标
注意//当事件处理函数没有传参的时候，第一个参数就是默认的事件源对象：event
//当手动传递参数的时候，就没办法获取默认的 event 事件源对象
//这时候我们可以手动在调用方法的时候\$event 来接收 event 事件源对象

<li v-for="(item,index) in todos" :class="{completed :item.completed}">
注册点击事件
<button class="destroy" @click="handleRemove(index)"></button>

##附带问题：删完之后，数组为空，则要添加一个判断即可
todos.push({
id: todos.length ? todos[todos.length - 1].id + 1 : 1,
title: this.message,
isFinish: false
})

##需求 8.双击 lable 进入编辑模式
传递点击 lable 的 item
handleGetEdit(item){
this.currentEditing = item;
console.log(this.currentEditing)
}
<label @dblclick="handleGetEdit(item)">{{item.title}}</label>
li 中进行 class 绑定。

<li v-for="(item,index) in todos" 
					:class="{completed :item.completed,
						editing:currentEditing===item}">

##需求 9.esc 按下取消编辑不保存
所以使用:value="item.title"

##需求 10.敲回车保存更改的内容 1.注册绑定事件函数 2.获取编辑文本框的数据 3.数据校验
<input class="edit"
:value="item.title"
@keydown.enter="handleSaveEdit(item,index,\$event)" >

如果数据为空，则直接删除该元素
否则保存编辑
handleSaveEdit(todo, index, e) {
const target = e.target;
const value = target.value.trim();
if (!value.length) {
this.todos.splice(index, 1)
} else {
todo.title = value;
this.currentEditing = null;
}
}

##需求 11.点击删除所有已完成任务
先进行检索，如果有一个完成的任务，显示 CLear completed，如果没有，既不显示
<button v-if="todos.some(item=>item.completed, class="clear-completed" @click="handleClearDone">Clear completed</button>

handleClearDone() {
for (let i = 0; i < this.todos.length; i++) {
if (this.todos[i].completed) {
this.todos.splice(i, 1);
//删除完毕之后，把索引减去一位，回到最开始;
i--;
}
}
}
