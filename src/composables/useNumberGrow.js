import { ref, computed, watch, onMounted, getCurrentScope, onScopeDispose } from "vue";
import moneyMasker from "../directives/money/money.js";

export function useNumberGrow(nums = 0, duration = 500) {
  let growTimeout;
  
  const money = new moneyMasker();
  money.options.precision = 0;
  
  const newNumber = ref(0);
  const numbers = ref(nums);

  const growingNumber = computed(() =>
    newNumber.value < 1000 ? newNumber.value : money.format(newNumber.value, money.options)
  );

  function grow(m){
    const v = Math.ceil(newNumber.value + m);
  
    if (v > numbers.value) {
      newNumber.value = numbers.value;
      return;
    }
  
    newNumber.value = v;
  
    growTimeout = setTimeout(() => {
      grow(m);
    }, 25);
  };

  const growInit = () => {
    let initialNum = numbers.value / (duration / 25);
    newNumber.value = 0;
    grow(initialNum);
  };

  watch(
    numbers, 
    () => {
      growInit();
    },
    { immediate: true },
  );

  if (getCurrentScope()) {
    onScopeDispose(() => clearTimeout(growTimeout));
  }

  return {
    growingNumber
  } 
}