<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CategoryService from '@/services/categories/CategoryService';
import type { ICategory } from '@/models/ICategory';
import { useAuthenticationStore } from '@/stores/AuthenticationStore';
import GeneralModal from '@/components/GeneralModal.vue'

const categories = ref<ICategory[]>([]);
const showModal = ref(false);
const selectedCategory = ref<ICategory>({ name: '', description: '' });
const isLoading = ref(true);
const showError = ref<string>('');
const authenticationStore = useAuthenticationStore();
const hasManagerOrAdminRole = authenticationStore.userInfo?.role === 'ROLE_MANAGER' || authenticationStore.userInfo?.role === 'ROLE_ADMIN';

const loadCategories = async () => {
  try {
    const response = await CategoryService.getInstance().getAll();

    if (response.errors) {
      showError.value = response.errors.join('\n');
    } else {
      categories.value = response.data || [];
    }
  } catch (error: any) {
    showError.value = 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};

const modalError = ref<string>('');

const saveCategory = async (category: ICategory) => {
  try {
    let response;
    if (selectedCategory.value.id) {
      response = await CategoryService.getInstance().update(selectedCategory.value.id, selectedCategory.value);
    } else {
      response = await CategoryService.getInstance().create(selectedCategory.value);
    }

    if (response.errors) {
      modalError.value = response.errors.join('\n');
    } else {
      await loadCategories();
      modalError.value = '';
      closeModal();
    }
  } catch (error: any) {
    modalError.value = 'An unexpected error occurred while saving the category';
  }
};

const openCreateModal = () => {
  selectedCategory.value = { name: '', description: '' };
  showModal.value = true;
};

const openEditModal = async (category: ICategory) => {
  try {
    const response = await CategoryService.getInstance().getById(category.id!);
    if (response.data) {
      selectedCategory.value = response.data;
      showModal.value = true;
    } else if (response.errors) {
      showError.value = response.errors.join('\n');
    }
  } catch (error: any) {
    showError.value = 'An error occurred while fetching the category details';
  }
};

function closeModal() {
  showModal.value = false;
}

const deleteCategory = async (id: number) => {
  try {
    const response = await CategoryService.getInstance().delete(id);
    if (!response.errors) {
      categories.value = categories.value.filter(category => category.id !== id);
    } else {
      showError.value = response.errors.join('\n');
    }
  } catch (err) {
    showError.value = 'An error occurred while deleting the category';
  }
};

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <div>
    <h1>Categories</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="showError" class="alert alert-danger" style="white-space: pre-line">{{ showError }}</div>
      <GeneralModal v-if="showModal" @close="closeModal" @save="saveCategory">
        <template #title>
          <h2>{{ selectedCategory.id ? 'Edit' : 'Add' }} Category</h2>
        </template>
        <template #body>
          <div v-if="modalError" class="alert alert-danger" style="white-space: pre-line">{{ modalError }}</div>
          <div class="form-group">
            <label for="categoryName">Name</label>
            <input v-model="selectedCategory.name" type="text" class="form-control" id="categoryName" placeholder="Enter category name" />
          </div>
          <div class="form-group">
            <label for="categoryDescription">Description</label>
            <input v-model="selectedCategory.description" type="text" class="form-control" id="categoryDescription" placeholder="Enter category description" />
          </div>
          <br>
          <button class="btn btn-primary" @click="saveCategory(selectedCategory)">Save</button>
        </template>
      </GeneralModal>
      <button @click="openCreateModal" class="btn btn-success mb-2" v-if="hasManagerOrAdminRole">Add Category</button>

      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th v-if="hasManagerOrAdminRole">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td v-if="hasManagerOrAdminRole">
            <div class="d-flex gap-2">
              <button @click="openEditModal(category)" class="btn btn-warning btn-sm">Edit</button>
              <button @click="deleteCategory(category.id!)" class="btn btn-danger btn-sm">Delete</button>
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
