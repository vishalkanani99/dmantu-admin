<script>
import { ref, computed, h, defineComponent, shallowRef} from 'vue';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import StepList from './StepList.vue';
import StepPanel from './StepPanel.vue';
import StepPanels from './StepPanels.vue';
import Button from '../Button.vue';

export default defineComponent({
  name: "Steps",
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    vertical: Boolean,
    outline: Boolean,
    color: String,
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    
    const modelValue = shallowRef(props.modelValue);
    const activeStep = computed({
      get: () => modelValue.value,
      set: (value) => {
        modelValue.value = value;
        context.emit('update:modelValue', value);
      }
    })

    const slotSteps = computed( () => {
      let steps = [];
      if( context.slots && context.slots.hasOwnProperty('default')) {
        steps = context.slots.default();
      }
      return steps.filter((step) => step.type 
          && step.type.constructor === Object 
            && step.type.hasOwnProperty('__name') 
             && step.type.__name === 'Step'
      );
    })

    const renderSteps = computed( () => {
      return slotSteps.value.map((step, index) => {
        return h(
          step,
          { 
            vertical: props.vertical,
            number: index + 1,
            isCompleted: activeStep.value > (index + 1), 
            color: props.color, 
            isActive: activeStep.value === (index + 1) ? true : false,
            disabled: activeStep.value < (index + 1),
          },
          () => '',  // empty default slot for Step Component 
        );
      });
    })

    const renderStepsSlots = computed( () => {
      return slotSteps.value.map((step, index) => {
        let stepsSlots = [];
        if(step.children && step.children.constructor === Object && step.children.hasOwnProperty('default')) {
          stepsSlots = step.children.default().map((childEl) => {
            return h(
              childEl,
            );
          });
        }
        return h(
          StepPanel,
            {
              isActive: activeStep.value === (index + 1) ? true : false,
              btnColor: props.color,
            },
            {
              default: () => stepsSlots, // Attached steps default slot to the stepPanel Component slot
              buttons: () => [
                h(
                  Button,
                  {
                    color: props.color,
                    iconPath: mdiArrowLeft,
                    disabled: index < 1,
                    onClick: () => changeStep(index),
                  }
                ),
                h(
                  Button,
                  {
                    color: props.color,
                    iconPath: mdiArrowRight,
                    disabled: index > ( slotSteps.value.length - 2 ),
                    onClick: () => changeStep(index + 2),
                  }
                )
              ]
            }
          );
      });
    })

    const changeStep = (step) => {
      activeStep.value = step;
    }

    // return the render function
    return () => h(
      "div",
      {class: 'grid grid-cols-12 gap-4'},
      [
        //Rendring Steps
        h(StepList,
          { vertical: props.vertical }, 
          () => renderSteps.value
        ),

        //Rendring Step Panels
        h(StepPanels,
          { vertical: props.vertical },
          () => renderStepsSlots.value
        ),
      ],
    );
  },

});
</script>
