<script>
import Masker from './masker.js'

export default function (el, binding) {
	let masker = new Masker;
	let mask = binding.value

	if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
		let els = el.getElementsByTagName('input')
		if (els.length !== 1) {
			throw new Error("v-mask directive requires 1 input, found " + els.length)
		} else {
			el = els[0]
		}
	}

	el.oninput = function (evt) {
		if (!evt.isTrusted) return // avoid infinite loop

		// by default, keep cursor at same position as before the mask
		let position = el.selectionEnd
		// save the character just inserted
		let digit = el.value[position-1]
		
		el.value = masker.create(el.value, mask);
		// if the digit was changed, increment position until find the digit again
		while (position < el.value.length && el.value.charAt(position-1) !== digit) {
			position++
		}
		if (el === document.activeElement) {
			el.setSelectionRange(position, position)
			setTimeout(function () {
				el.setSelectionRange(position, position)
			}, 0)
		}
		el.dispatchEvent(masker.event('input'))
	}
	
	let newDisplay = masker.create(el.value, mask);
	if (newDisplay !== el.value) {
		el.value = newDisplay
		el.dispatchEvent(masker.event('input'))
	}
}
</script>