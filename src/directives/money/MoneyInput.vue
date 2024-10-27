<script>
import Money from './money.js'
export default function (el, binding) {
	let money = new Money(binding.value);
	let opt = money.options;

	// v-money used on a component that's not a input
	if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
		let els = el.getElementsByTagName('input')
		if (els.length !== 1) {
			// throw new Error("v-money requires 1 input, found " + els.length)
		} else {
			el = els[0]
		}
	}

	el.oninput = function () {
		let positionFromEnd = el.value.length - el.selectionEnd
		el.value = money.format(el.value, opt)
		positionFromEnd = Math.max(positionFromEnd, opt.suffix.length) // right
		positionFromEnd = el.value.length - positionFromEnd
		positionFromEnd = Math.max(positionFromEnd, opt.prefix.length + 1) // left
		money.setCursor(el, positionFromEnd)
		el.dispatchEvent(money.event('change')) // v-model.lazy
	}

	el.onfocus = function () {
		money.setCursor(el, el.value.length - opt.suffix.length)
	}

	el.oninput()
	el.dispatchEvent(money.event('input')) // force format after initialization
}

</script>
