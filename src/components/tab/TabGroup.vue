<script>
import { ref, computed, h, defineComponent} from 'vue'

export default defineComponent({
  name: "TabGroup",
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
    vertical: Boolean,
  },
  setup(props, context) {
    const activeTab = ref(props.activeTab)

    const hasSlot = computed( () => { 
      return context.slots && 
        context.slots.hasOwnProperty('default') && 
        context.slots.default().length > 0 ? true : false 
      }
    )

    const changeTab = (index) => {
      activeTab.value = index
    }
    // return the render function
    return () => h(
      "div",
      {class: 'grid grid-cols-12 gap-4'},
      hasSlot.value
        ? context.slots.default().map((element) => {
            
            if (
              element &&
              element.type &&
              typeof element.type === "object" &&
              element.type.constructor === Object &&
              element.type.hasOwnProperty('__name') && 
              ( element.type.__name === 'TabList' || element.type.__name === 'TabPanels' ) &&
              element.children &&
              typeof element.children === "object" && 
              element.children.constructor === Object && 
              element.children.hasOwnProperty('default')
            ) {

              if( element.props && element.props.constructor === Object) {
                element.props['vertical'] = props.vertical;
              } else {
                element.props = { vertical: props.vertical };
              }
              
              return h(
                element,
                {},
                () => element.children.default().map((child, index) => {

                  if( child.props && child.props.constructor === Object) {
                    child.props['vertical'] = props.vertical;
                  } else {
                    child.props = { vertical: props.vertical };
                  }

                  if(element.type.__name === 'TabList') {
                    return h(child, { isActive: activeTab.value === index ? true : false, onClick: () => changeTab(index) });
                  }
                  if(element.type.__name === 'TabPanels') {
                    return h(child, {isActive: activeTab.value === index ? true : false});
                  }
                })
              );
            }
          })
        : null
    );
  },

});
</script>
