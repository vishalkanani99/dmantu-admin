<script setup>
import { ref, shallowRef } from 'vue';
import { mdiTable, mdiCog, mdiTrashCan, mdiPencil } from '@mdi/js';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Button from '../components/Button.vue';
import FieldOption from '../components/form/FieldOption.vue';
import Avatar from '../components/Avatar.vue';
import Pagination from '../components/Pagination.vue';
import Table from '../components/table/Table.vue';
import TableHeader from '../components/table/TableHeader.vue';
import TableHeaderCell from '../components/table/TableHeaderCell.vue';
import TableRow from '../components/table/TableRow.vue';
import TableCell from '../components/table/TableCell.vue';
import TableBody from '../components/table/TableBody.vue';
import DataTable from '../components/datatable/DataTable.vue';

const activePage = ref(5);

const checkedRows = ref([]);
const isLoading = shallowRef(false);

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

const ssrTableRows = ref([]);
const getData = (config) => {
  isLoading.value = true;
  setTimeout(() => {
    ssrTableRows.value = [
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
        id:4,
        name: 'Chloe Doe',
        city: 'Vruddon',
        status: 1,
        created_at: '19, Dec 2024'
      },
      {
        id:14,
        name: 'John Doe',
        city: 'New York',
        status: 1,
        created_at: '21, Dec 2024'
      },
      {
        id:6,
        name: 'Hannah Doe',
        city: 'Kans',
        status: 1,
        created_at: '19, Dec 2024',
      },
    ];
    isLoading.value = false;
  }, 1000)
}
</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Basic Table" 
      :iconPath="mdiTable" 
      :btnIconPath="mdiCog"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableHeaderCell>
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>City</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Created On</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Pagination v-model="activePage" :recordsTotal="50"/>
    </Section>
    <Section
      title="Data Table" 
      :iconPath="mdiTable" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <DataTable
        v-model="checkedRows" 
        :columns="columns" 
        :data="tableRows"
        isCheckable
        isCollapsible
        isEditable
      >
      </DataTable>
    </Section>
    <Section
      title="Data Table (Nested Sort By Sort Order)" 
      :iconPath="mdiTable" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <DataTable
        v-model="checkedRows" 
        :columns="columns" 
        :data="tableRows"
        isCheckable
        isCollapsible
        isEditable
        isNestedSort
      >
      </DataTable>
    </Section>
    <Section
      title="Data Table (SSR)" 
      :iconPath="mdiTable" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <DataTable
        v-model="checkedRows" 
        :columns="columns" 
        :data="ssrTableRows"
        isSsr
        isCheckable
        isCollapsible
        isEditable
        :isLoading="isLoading"
        @update="getData"
      >
      </DataTable>
    </Section>
  </LayoutAuthenticated>
</template>