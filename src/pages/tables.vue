<script setup>
import { ref } from 'vue';
import { mdiTable, mdiCog, mdiTrashCan, mdiPencil } from '@mdi/js';
import SectionTitle from '../components/SectionTitle.vue';
import Button from '../components/Button.vue';
import FieldOption from '../components/FieldOption.vue';
import Avatar from '../components/Avatar.vue';
import Pagination from '../components/Pagination.vue';
import DataTable from '../components/datatable/DataTable.vue';

const activePage = ref(5);

const checkedRows = ref([]);

const columns = ref([
  { key: 'src', label: 'Image', imageable: true, },
  { key: 'name', label: 'Name', sortable: true, orderBy: 'asc', sortOrder: 2, searchable: true,},
  { key: 'city', label: 'City', sortable: true, orderBy: 'desc', searchable: true, },
  { key: 'status', label: 'Status'},
  { key: 'created_at', label: 'Created On', sortable: true, orderBy: 'desc', sortOrder: 0, },
])

const tableRows = ref([
  {
    id:1,
    name: 'John Doe',
    city: 'New York',
    status: 1,
    created_at: '19, Dec 2024'
  },
  {
    id:13,
    name: 'John Doe',
    city: 'Mosvil',
    status: 1,
    created_at: '18, Dec 2024'
  },
  {
    id:14,
    name: 'John Doe',
    city: 'New York',
    status: 1,
    created_at: '21, Dec 2024'
  },
  {
    id:2,
    name: 'Anne Doe',
    city: 'Mosvil',
    status: 1,
    created_at: '20, Dec 2024'
  },
  {
    id:3,
    name: 'Joanne Doe',
    city: 'Eighpus',
    status: 1,
    created_at: '21, Dec 2024'
  },
  {
    id:4,
    name: 'Chloe Doe',
    city: 'Vruddon',
    status: 1,
    created_at: '19, Dec 2024'
  },
  {
    id:5,
    name: 'Deirdre Doe',
    city: 'Teupus',
    status: 1,
    created_at: '11, Dec 2024',
    children: [{
      id:7,
      name: 'Maria Madeleine',
      city: 'Qimont',
      status: 1,
      created_at: '12, Dec 2024'
    },
    {
      id:8,
      name: 'Kimberly Lillian',
      city: 'Khuprough',
      status: 1,
      created_at: '14, Dec 2024',
      children: [{
        id:11,
        name: 'Kylie Lauren',
        city: 'Vlopolis',
        status: 1,
        created_at: '22, Dec 2024'
      },
      {
        id:12,
        name: 'Molly Michelle',
        city: 'Ring',
        status: 1,
        created_at: '26, Dec 2024'
      }]
    }]
  },
  {
    id:6,
    name: 'Hannah Doe',
    city: 'Kans',
    status: 1,
    created_at: '19, Dec 2024',
    children: [{
      id:9,
      name: 'Wanda Deirdre',
      city: 'Yesa',
      status: 1,
      created_at: '22, Dec 2024'
    },
    {
      id:10,
      name: 'Sally Vanessa',
      city: 'Eighlas',
      status: 1,
      created_at: '24, Dec 2024'
    }]
  },
]);

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
          <th>
            <span class="center">
              <FieldOption />
            </span>
          </th>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Status</th>
          <th>Created On</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span class="center">
              <FieldOption />
            </span>
          </td>
          <td data-label="Image">
            <div class="center">
              <Avatar class="w-12 h-12" username="John Doe" />
            </div>
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td>
            <div class="center">
              <Button :iconPath="mdiPencil" color="info" ></Button>
              <Button :iconPath="mdiTrashCan" color="danger" ></Button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span class="center">
              <FieldOption />
            </span>
          </td>
          <td data-label="Image">
            <div class="center">
              <Avatar class="w-12 h-12" username="John Doe" />
            </div>
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td>
            <div class="center">
              <Button :iconPath="mdiPencil" color="info" ></Button>
              <Button :iconPath="mdiTrashCan" color="danger" ></Button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span class="center">
              <FieldOption />
            </span>
          </td>
          <td data-label="Image">
            <div class="center">
              <Avatar class="w-12 h-12" username="John Doe" />
            </div>
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td>
            <div class="center">
              <Button :iconPath="mdiPencil" color="info" ></Button>
              <Button :iconPath="mdiTrashCan" color="danger" ></Button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span class="center">
              <FieldOption />
            </span>
          </td>
          <td data-label="Image">
            <div class="center">
              <Avatar class="w-12 h-12" username="John Doe" />
            </div>
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td>
            <div class="center">
              <Button :iconPath="mdiPencil" color="info" ></Button>
              <Button :iconPath="mdiTrashCan" color="danger" ></Button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span class="center">
              <FieldOption />
            </span>
          </td>
          <td data-label="Image">
            <div class="center">
              <Avatar class="w-12 h-12" username="John Doe" />
            </div>
          </td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@test.com</td>
          <td data-label="City">New York</td>
          <td data-label="Status">Active</td>
          <td data-label="Created On">19, Dec 2024</td>
          <td>
            <div class="center">
              <Button :iconPath="mdiPencil" color="info" ></Button>
              <Button :iconPath="mdiTrashCan" color="danger" ></Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-model="activePage" :recordsTotal="50"/>

    <SectionTitle 
      title="Data Table" 
      :iconPath="mdiTable" 
      :btnIconPath="mdiCog" 
      btnColor="theme" 
    />
    <DataTable
      v-model="checkedRows" 
      :columns="columns" 
      :data="tableRows"
      isCheckable
      isCollapsible
      isEditable
    >

    </DataTable>
  </div>
</template>