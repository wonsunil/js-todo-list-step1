export default class Component{
	$target; $state; $props;

	constructor($target, $props = {}) {
		this.$target = $target;
		this.$props = $props;
		this.init();
		this.setEvent();
		this.render();
	};

	template() {return ``};

	init () {};
	render() {};
	setEvent() {};

	setState(newState) {
		this.$state.todos = newState.todos;

		this.render();
	};

	addEvent(eventName, eventTarget, callback) {
		this.$target.addEventListener(eventName, event => {
			const children = [ ...this.$target.querySelectorAll(eventTarget) ];

			if (!children.includes(event.target)) return;

			callback(event);
		});
	};
};