export default class Mouse {
	constructor(canvas) {
		this.x = 0;
		this.y = 0;
    const { top, left } = canvas.getBoundingClientRect();
		canvas.onmousemove = ({ clientX, clientY }) => {
			this.x = clientX - left;
			this.y = clientY - top;
		};
		canvas.ontouchmove = event => {
			event.preventDefault();
			const { clientX, clientY } = event.touches[0];
			this.x = clientX - left;
			this.y = clientY - top;
		}
	}
}