<script setup>
import { 
  mdiArrowCollapseVertical,
  mdiCog,
} from '@mdi/js';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import CollapseGroup from '../components/CollapseGroup.vue';
import Collapse from '../components/Collapse.vue';

const content = [
  { 
    title: 'Accordion 1',
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',  
  },
  { 
    title: 'Accordion 2',
    expanded: true,
    content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',  
  },
  { 
    title: 'Accordion 3',
    content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable',  
  },
  { 
    title: 'Accordion 4',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',  
  },
];
</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Accordions" 
      :iconPath="mdiArrowCollapseVertical" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <Card title="Default" noFooter>
        <Collapse title="Default Accordion">
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
      </Card>
      <Card title="Group" noFooter>
        <CollapseGroup :content="content">
          <template #default="{ data }">
            {{ data.content }}
          </template>
        </CollapseGroup>
      </Card>
      <Card title="Colors" noFooter>
        <Collapse
          title="Accordion Theme Dark"
          color="theme-dark"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
        <Collapse
          title="Accordion Theme Light"
          color="theme-light"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
        <Collapse
          title="Accordion White"
          color="white"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
        <Collapse
          title="Accordion Black"
          color="black"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
        <Collapse
          title="Accordion Gray"
          color="gray"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
        <Collapse
          title="Accordion Info"
          color="info"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
        <Collapse
          title="Accordion Success"
          color="success"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
        <Collapse
          title="Accordion Warning"
          color="warning"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
        <Collapse
          title="Accordion Danger"
          color="danger"
        >
          <div class="py-3 px-6">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>
        </Collapse>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>