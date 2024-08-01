<script setup>
import { reactive, ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiDotsVertical, 
  mdiEmail,
  mdiRefresh,
  mdiAlertCircle,
  mdiCheckCircle,
  mdiEye,
  mdiEyeOff,
} from '@mdi/js';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import PictureCard from '../components/card/PictureCard.vue';
import Button from '../components/Button.vue';
import FieldOption from '../components/form/FieldOption.vue';

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Cards" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <Card title="Default Card" subTitle="Sub Title">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </p>
      </Card>
      <Card title="Card with close button" closable>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </p>
      </Card>
      <Card title="Card without footer" noFooter>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </p>
      </Card>
      <PictureCard
        title="Picture Card"
        class="mx-auto w-1/3" 
        imageSrc="/images/cart.jpg">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </p>
      </PictureCard>
      <Card>
        <template #header>
          <h2 class="p-4 text-center">Card with header and footer slots</h2>
        </template>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </p>
        <template #footer>
          <div class="flex justify-center items-center p-4 space-x-2">
            <Button color="info" label="Submit" />
            <Button color="danger" label="Cancel" outline />
          </div>
        </template>
      </Card>
      <Card title="Icon" noHeader noFooter>
        <p class="text-center">Card without header and footer</p>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>