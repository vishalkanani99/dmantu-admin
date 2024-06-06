<script setup>
import { mdiTable, mdiCog, mdiTrashCan, mdiPencil } from '@mdi/js';
import SectionTitle from '../components/SectionTitle.vue';
import Button from '../components/Button.vue';
import FieldOption from '../components/FieldOption.vue';
import Avatar from '../components/Avatar.vue';

</script>
<template>
  <div class="space-y-6">
    <SectionTitle 
      title="Basic Table" 
      :iconPath="mdiTable" 
      :btnIconPath="mdiCog" 
      btnColor="theme" 
    />
    <table>
      <thead>
        <tr>
          <td class="center">
            <FieldOption />
          </td>
          <td>Image</td>
          <td>Name</td>
          <td>Email</td>
          <td>City</td>
          <td>Status</td>
          <td>Created On</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="center">
            <FieldOption />
          </td>
          <td data-label="Image">
            <Avatar class="w-12 h-12" username="John Doe" />
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td class="center">
            <Button :iconPath="mdiPencil" color="info" ></Button>
            <Button :iconPath="mdiTrashCan" color="danger" ></Button>
          </td>
        </tr>
        <tr>
          <td class="center">
            <FieldOption />
          </td>
          <td data-label="Image">
            <Avatar class="w-12 h-12" username="John Doe" />
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td class="center">
            <Button :iconPath="mdiPencil" color="info" ></Button>
            <Button :iconPath="mdiTrashCan" color="danger" ></Button>
          </td>
        </tr>
        <tr>
          <td class="center">
            <FieldOption />
          </td>
          <td data-label="Image">
            <Avatar class="w-12 h-12" username="John Doe" />
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td class="center">
            <Button :iconPath="mdiPencil" color="info" ></Button>
            <Button :iconPath="mdiTrashCan" color="danger" ></Button>
          </td>
        </tr>
        <tr>
          <td class="center">
            <FieldOption />
          </td>
          <td data-label="Image">
            <Avatar class="w-12 h-12" username="John Doe" />
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td class="center">
            <Button :iconPath="mdiPencil" color="info" ></Button>
            <Button :iconPath="mdiTrashCan" color="danger" ></Button>
          </td>
        </tr>
        <tr>
          <td class="center">
            <FieldOption />
          </td>
          <td data-label="Image">
            <Avatar class="w-12 h-12" username="John Doe" />
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td class="center">
            <Button :iconPath="mdiPencil" color="info" ></Button>
            <Button :iconPath="mdiTrashCan" color="danger" ></Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>