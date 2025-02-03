<script setup>
import { reactive, ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog,
  mdiPencil,
  mdiTrashCan,
  mdiHeart,
  mdiPlus,
  mdiAccountPlus,
  mdiCart,
  mdiChartBar,
  mdiChartLine,
  mdiDotsVertical, 
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import PictureCard from '../components/card/PictureCard.vue';
import Button from '../components/Button.vue';
import FieldOption from '../components/form/FieldOption.vue';
import Rating from '../components/form/Rating.vue';
import ProgressCard from '../components/card/ProgressCard.vue';
import ListCard from '../components/card/ListCard.vue';
import Chip from '../components/Chip.vue';
import Dropdown from '../components/dropdown/Dropdown.vue';
import ProgressBar from '../components/progressbar/ProgressBar.vue';

const rating = ref(2.6);
const progress = ref(50);
</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Cards" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Default Card" subTitle="Sub Title">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
        </Card>
        <Card title="Card with close button" :color="theme.activeColors.inverse" closable>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
        </Card>
        <Card title="Card without footer" :color="theme.activeColors.inverse" noFooter>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
        </Card>
        <Card :color="theme.activeColors.inverse">
          <template #header>
            <h2 class="p-2 md:p-4 text-center">Card with header and footer slots</h2>
          </template>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
          <template #footer>
            <div class="flex justify-center items-center p-2 md:p-4 gap-2">
              <Button color="info" label="Submit" />
              <Button color="danger" label="Cancel" outline />
            </div>
          </template>
        </Card>
        <Card class="md:col-span-2" title="Icon" :color="theme.activeColors.inverse" noHeader noFooter>
          <p class="text-center">Card without header and footer</p>
        </Card>
      </div>
    </Section>
    <Section
      title="Picture Cards" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PictureCard
          title="Picture Card"
          imageSrc="/images/cart.jpg"
          :color="theme.activeColors.inverse"
          :checkboxColor="theme.activeColors.default"
          :menuBtnColor="theme.activeColors.inverse"
          selectable
        >
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
        </PictureCard>
        <PictureCard
          title="Picture Card"
          imageSrc="/images/cart.jpg"
          :color="theme.activeColors.inverse"
          :checkboxColor="theme.activeColors.default"
          :menuBtnColor="theme.activeColors.inverse"
          :menuItems="[
            {label: 'Edit', iconPath: mdiPencil}, 
            {label: 'Delete', iconPath: mdiTrashCan},
          ]"
          selectable
        >
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
        </PictureCard>
        <PictureCard
          title="Picture Card"
          subTitle="$500"
          imageSrc="/images/cart.jpg"
          :color="theme.activeColors.inverse"
          saveBtnLabel="Buy now"
          cancelBtnLabel="Add to cart"
          :cancelBtnIconPath="mdiPlus"
        >
          <template #topRight>
            <FieldOption 
              type="icon"
              color="danger"
              :iconPath="mdiHeart" 
            />
          </template>
          <template #titleBarSectionRight>
            <Rating v-model="rating" color="warning" />
          </template>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </p>
        </PictureCard>
      </div>
    </Section>
    <Section
      title="Progress Cards" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card title="Default" :color="theme.activeColors.inverse" noFooter>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProgressCard 
            :progress="40" 
            color="info" 
            :number="88" 
            label="New Users"  
            :iconPath="mdiAccountPlus"
            trackColor="info-primary"
            activeTrackColor="white"
          />
          <ProgressCard 
            :progress="70" 
            color="warning" 
            :number="189" 
            label="Product Sold"  
            :iconPath="mdiCart"
            trackColor="warning-primary"
            activeTrackColor="white"
            infoColor="warning-primary" 
          />
          <ProgressCard 
            :progress="30" 
            color="success" 
            :number="45668"
            numberPrefix="$"  
            label="Profit"  
            :iconPath="mdiChartBar"
            trackColor="success-primary"
            activeTrackColor="white"
          />
          <ProgressCard 
            :progress="90" 
            color="danger" 
            :number="90"
            numberSuffix="%"  
            label="Performance"  
            :iconPath="mdiChartLine"
            trackColor="danger-primary"
            activeTrackColor="white"
            infoColor="danger-primary"
          />
        </div>
      </Card>
      <Card title="Outline" :color="theme.activeColors.inverse" noFooter>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProgressCard 
            :progress="40" 
            color="info" 
            :number="88" 
            label="New Users"  
            :iconPath="mdiAccountPlus"
            trackColor="info-primary"
            activeTrackColor="info"
            outline
          />
          <ProgressCard 
            :progress="70" 
            color="warning" 
            :number="189" 
            label="Product Sold"  
            :iconPath="mdiCart"
            trackColor="warning-primary"
            activeTrackColor="warning"
            outline 
          />
          <ProgressCard 
            :progress="30" 
            color="success" 
            :number="45668"
            numberPrefix="$"  
            label="Profit"  
            :iconPath="mdiChartBar"
            trackColor="success-primary"
            activeTrackColor="success"
            outline
          />
          <ProgressCard 
            :progress="90" 
            color="danger" 
            :number="90"
            numberSuffix="%"  
            label="Performance"  
            :iconPath="mdiChartLine"
            trackColor="danger-primary"
            activeTrackColor="danger"
            outline
          />
        </div>
      </Card>
    </Section>
    <Section
      title="Lists" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card title="Default" :color="theme.activeColors.inverse" noFooter>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <ListCard color="black" imgAlt="List 4" title="Black" subTitle="Sub Title"></ListCard>
          <ListCard color="gray" imgAlt="List 5" title="Gray" subTitle="Sub Title"></ListCard>
          <ListCard color="info" imgAlt="List 6" title="Info" subTitle="Sub Title"></ListCard>
          <ListCard color="success" imgAlt="List 7" title="Success" subTitle="Sub Title"></ListCard>
          <ListCard color="warning" imgAlt="List 8" title="Warning" subTitle="Sub Title"></ListCard>
          <ListCard color="danger" imgAlt="List 9" title="Danger" subTitle="Sub Title"></ListCard>
        </div>
      </Card>
      <Card title="Outline" :color="theme.activeColors.inverse" noFooter>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <ListCard color="black" imgAlt="List 4" title="Black" subTitle="Sub Title" outline></ListCard>
          <ListCard color="gray" imgAlt="List 5" title="Gray" subTitle="Sub Title" outline></ListCard>
          <ListCard color="info" imgAlt="List 6" title="Info" subTitle="Sub Title" outline></ListCard>
          <ListCard color="success" imgAlt="List 7" title="Success" subTitle="Sub Title" outline></ListCard>
          <ListCard color="warning" imgAlt="List 8" title="Warning" subTitle="Sub Title" outline></ListCard>
          <ListCard color="danger" imgAlt="List 9" title="Danger" subTitle="Sub Title" outline></ListCard>
        </div>
      </Card>
      <Card title="Custom" :color="theme.activeColors.inverse" noFooter>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <ListCard color="info" imgAlt="labels" title="List with labels" subTitle="Sub Title" hoverShadow>
            <template #rightSectionItems>
              <Chip color="success" label="Success"></Chip>
              <Chip color="warning" label="Warning"></Chip>
              <Chip color="danger" label="Danger"></Chip>
            </template>
          </ListCard>
          <ListCard color="info" imgAlt="status" title="List with labels" subTitle="Sub Title" outline hoverShadow>
            <template #rightSectionItems>
              <div class="flex flex-col items-end">
                <h4 class="self-start">Status</h4>
                <Chip color="success" label="Success"></Chip>
              </div>
            </template>
          </ListCard>
          <ListCard color="info" imgAlt="menu" title="List with menu" subTitle="Sub Title" outline hoverShadow>
            <template #rightSectionItems>
              <Dropdown 
                :items="[
                  {label: 'Edit', iconPath: mdiPencil}, 
                  {label: 'Delete', iconPath: mdiTrashCan}
                ]">
                <template #selector>
                  <Button
                    :iconPath="mdiDotsVertical"
                    outline
                    rounded 
                  />
                </template>
              </Dropdown>
            </template>
          </ListCard>
          <ListCard color="info" imgAlt="Progress" title="List with progress" subTitle="Sub Title" outline hoverShadow>
            <template #rightSection>
              <div class="flex flex-col items-center w-full md:w-1/3">
                <h4>Progress</h4>
                <ProgressBar
                  class="!w-1/2 md:!w-full"
                  v-model="progress"
                  trackColor="info-primary"
                  activeTrackColor="info" 
                />
              </div>
            </template>
          </ListCard>
        </div>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>