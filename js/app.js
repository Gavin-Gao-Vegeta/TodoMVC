;
(function () {
	const todos = [{
			id: 0,
			title: '吃饭',
			completed: false
		},
		{
			id: 1,
			title: '写代码',
			completed: true
		},
		{
			id: 2,
			title: '吃饭',
			completed: false
		}
	]
	new Vue({
		el: '#app',
		data() {
			return {
				todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
				message: '',
				currentEditing: null
			}
		},
		watch: {
			todos: {
				handler() {
					window.localStorage.setItem('todos', JSON.stringify(this.todos))
				},
				deep: true
			}
		},
		computed: {
			remaining() {
				let count = 0;
				this.todos.forEach(item => {
					if (item.completed === false) {
						count++
					}
				})
				return count;
			}
		},
		methods: {
			handleEnter() {
				//1.获取点击事件，注册到组件上
				//2.双向绑定数据，得到输入框内容。				
				//3.将数据保存到列表中
				const todos = this.todos;
				//4.判断输入内容是否为空
				if (!this.message) {
					return;
				} else {
					todos.push({
						id: todos.length ? todos[todos.length - 1].id + 1 : 1,
						title: this.message,
						isFinish: false
					})
				}
				//5.完成后将输入框清空
				this.message = '';
			},
			handleClick(e) {
				const checked = e.target.checked;
				this.todos.forEach(item => {
					item.completed = checked;
				})
			},
			handleRemove(index, e) {
				this.todos.splice(index, 1);
			},
			handleGetEdit(item) {
				this.currentEditing = item;
			},
			handleSaveEdit(todo, index, e) {
				const target = e.target;
				const value = target.value.trim();
				if (!value.length) {
					this.todos.splice(index, 1)
				} else {
					todo.title = value;
					this.currentEditing = null;
				}
			},
			handleCancelEdit() {
				//1.把样式去除
				this.currentEditing = null;
			},
			handleClearDone() {
				for (let i = 0; i < this.todos.length; i++) {
					if (this.todos[i].completed) {
						this.todos.splice(i, 1);
						//删除完毕之后，把索引减去一位，回到最开始;
						i--;
					}
				}
			}
		}
	}).$mount('#app')
})()
