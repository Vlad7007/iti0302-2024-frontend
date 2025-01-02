<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SupplierService from '@/services/suppliers/SuppliersService';
import type { ISupplier } from '@/models/ISupplier';
import { useAuthenticationStore } from '@/stores/AuthenticationStore';
import GeneralModal from '@/components/GeneralModal.vue'

const suppliers = ref<ISupplier[]>([]);
const showModal = ref(false);
const selectedSupplier = ref<ISupplier>({ name: '', email: '' });
const isLoading = ref(true);
const showError = ref<string>('');
const authenticationStore = useAuthenticationStore();
const hasManagerOrAdminRole = authenticationStore.userInfo?.role === 'ROLE_MANAGER' || authenticationStore.userInfo?.role === 'ROLE_ADMIN';

const loadSuppliers = async () => {
  try {
    const response = await SupplierService.getInstance().getAll();

    if (response.errors) {
      showError.value = response.errors.join('\n');
    } else {
      suppliers.value = response.data || [];
    }
  } catch (error: any) {
    showError.value = 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};

const modalError = ref<string>('');

const saveSupplier = async (supplier: ISupplier) => {
  try {
    let response;
    if (selectedSupplier.value.id) {
      response = await SupplierService.getInstance().update(selectedSupplier.value.id, selectedSupplier.value);
    } else {
      response = await SupplierService.getInstance().create(selectedSupplier.value);
    }

    if (response.errors) {
      modalError.value = response.errors.join('\n');
    } else {
      await loadSuppliers();
      modalError.value = '';
      closeModal();
    }
  } catch (error: any) {
    modalError.value = 'An unexpected error occurred while saving the supplier';
  }
};

const openCreateModal = () => {
  selectedSupplier.value = { name: '', email: '' };
  showModal.value = true;
};

const openEditModal = async (supplier: ISupplier) => {
  try {
    const response = await SupplierService.getInstance().getById(supplier.id!);
    if (response.data) {
      selectedSupplier.value = response.data;
      showModal.value = true;
    } else if (response.errors) {
      showError.value = response.errors.join('\n');
    }
  } catch (error: any) {
    showError.value = 'An error occurred while fetching the supplier details';
  }
};

function closeModal() {
  showModal.value = false;
}

const deleteSupplier = async (id: number) => {
  try {
    const response = await SupplierService.getInstance().delete(id);
    if (!response.errors) {
      suppliers.value = suppliers.value.filter(supplier => supplier.id !== id);
    } else {
      showError.value = response.errors.join('\n');
    }
  } catch (err) {
    showError.value = 'An error occurred while deleting the supplier';
  }
};

onMounted(() => {
  loadSuppliers();
});
</script>

<template>
  <div>
    <h1>Suppliers</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="showError" class="alert alert-danger" style="white-space: pre-line">{{ showError }}</div>
      <GeneralModal v-if="showModal" @close="closeModal" @save="saveSupplier">
        <template #title>
          <h2>{{ selectedSupplier.id ? 'Edit' : 'Add' }} Supplier</h2>
        </template>
        <template #body>
          <div v-if="modalError" class="alert alert-danger" style="white-space: pre-line">{{ modalError }}</div>
          <div class="form-group">
            <label for="supplierName">Name</label>
            <input v-model="selectedSupplier.name" type="text" class="form-control" id="supplierName" placeholder="Enter supplier name" />
          </div>
          <div class="form-group">
            <label for="supplierEmail">Email</label>
            <input v-model="selectedSupplier.email" type="text" class="form-control" id="supplierEmail" placeholder="Enter supplier email" />
          </div>
          <br>
          <button class="btn btn-primary" @click="saveSupplier(selectedSupplier)">Save</button>
        </template>
      </GeneralModal>
      <button @click="openCreateModal" class="btn btn-success mb-2" v-if="hasManagerOrAdminRole">Add Supplier</button>

      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th v-if="hasManagerOrAdminRole">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="supplier in suppliers" :key="supplier.id">
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.email }}</td>
          <td v-if="hasManagerOrAdminRole">
            <div class="d-flex gap-2">
              <button @click="openEditModal(supplier)" class="btn btn-warning btn-sm">Edit</button>
              <button @click="deleteSupplier(supplier.id!)" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
