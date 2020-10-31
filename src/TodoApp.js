import Component from "./core/Component.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCounter from "./components/TodoCounter.js";

export default class App extends Component {
	init() {
		this.$state = {
			todos: {

			},
			filterType: 0,
		};
	};

	addItem(text) {
		const id = Math.max(0, ...Object.keys(this.$state.todos)) + 1;
		const active = false;

		this.setState({
			todos: {
				...this.$state.todos,
				[id] : { id, text, active }
			}
		});
	};

	toggleItem(id) {
		const { todos } = this.$state;
		this.setState({
			todos: {
				...this.$state.todos,
				[id] : { ...todos[id], active: !todos[id].active }
			}
		});
	};

	deleteEvent(id) {
		const todos = { ...this.$state.todos };

		delete todos[id];

		this.setState({ todos });
	};

	filterItem(filterType) {
		this.setState({ filterType });
	};

	render() {
		const { todos } = this.$state;

		const $todoapp = document.querySelector(".todoapp");
		const $main = document.querySelector("main");
		const $todoCountBox = document.querySelector(".count-container");

		const input = new TodoInput($todoapp, {
			addItem: contents => this.addItem(contents)
		});
		const list = new TodoList($main, { todos });
		const countBox = new TodoCounter($todoCountBox, {
			todoCount: Object.keys(todos).length
		});

		this.$target.innerHTML = `
			<h1>TODOS</h1>
			${input.template()}
			${list.template()}
			${countBox.template()}
		`
	};

	setEvent() {
		this.addEvent("change", ".toggle", ({ target }) => {
			const id = target.closest("[data-id]").dataset.id;
			this.toggleItem(id);
		});
		this.addEvent("click", ".destroy", ({ target }) => {
			this.deleteEvent(target.closest("[data-id]").dataset.id);
		});
		this.addEvent("dblclick", ".label", ({ target }) => {
			const id = target.closest("[data-id]").dataset.id;

			console.log(this.$state.todos)
		});
	};
};