<script>
import { ref, computed, h, defineComponent, shallowRef, watch} from 'vue';
import TabList from './TabList.vue';
import TabPanels from './TabPanels.vue';
import TabPanel from './TabPanel.vue';

export default defineComponent({
  name: "Tabs",
  props: {
    modelValue: Number,
    vertical: Boolean,
    outline: Boolean,
    color: String,
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    
    const modelValue = shallowRef(props.modelValue ?? 1);
    const TabPanelTransitionName = shallowRef(props.vertical ? 'slide-down' : 'slide-right');

    const activeTab = computed({
      get: () => props.modelValue ?? modelValue.value,
      set: (value) => {
        modelValue.value = value;
        context.emit('update:modelValue', value);
      }
    })

    const slotTabs = computed( () => {
      let tabs = [];
      if( context.slots && context.slots.hasOwnProperty('default')) {
        tabs = context.slots.default();
      }
      return tabs.filter((tab) => tab.type 
          && tab.type.constructor === Object 
            && tab.type.hasOwnProperty('__name') 
             && tab.type.__name === 'Tab'
      );
    })

    const renderTabs = computed( () => {
      return slotTabs.value.map((tab, index) => {
        return h(
          tab,
          { 
            vertical: props.vertical,
            outline: props.outline, 
            color: props.color, 
            isActive: activeTab.value === (index + 1) ? true : false, 
            onClick: () => changeTab(index + 1) 
          },
          () => '',  // empty default slot for Tab Component 
        );
      });
    })

    const renderTabsSlots = computed( () => {
      return slotTabs.value.map((tab, index) => {
        let tabsSlots = [];
        if(tab.children && tab.children.constructor === Object && tab.children.hasOwnProperty('default')) {
          tabsSlots = tab.children.default().map((childEl) => {
            return h(
              childEl,
            );
          });
        }
        return h(
            TabPanel,
            {isActive: activeTab.value === (index + 1) ? true : false, transitionName: TabPanelTransitionName.value},
            () => tabsSlots, // Attached tabs default slot to the TabPanel Component slot
          );
      });
    })

    const changeTab = (tab) => {
      activeTab.value = tab;
    }

    watch(
      activeTab,
      (value, oldValue) => {
        if(props.vertical) {
          TabPanelTransitionName.value = value > oldValue ? 'slide-up' : 'slide-down';
        } else {
          TabPanelTransitionName.value = value > oldValue ? 'slide-left' : 'slide-right';
        }
      }
    );

    // return the render function
    return () => h(
      "div",
      {class: 'grid grid-cols-12 gap-4'},
      [
        //Rendring Tabs
        h(TabList,
          { vertical: props.vertical }, 
          () => renderTabs.value
        ),

        //Rendring Tab Panels
        h(TabPanels,
          { vertical: props.vertical },
          () => renderTabsSlots.value
        ),
      ],
    );
  },

});
</script>
