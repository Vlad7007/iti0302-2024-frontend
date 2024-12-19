<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdminService from '@/services/AdminService';
import type { IManageUsers } from '@/models/IManageUsers';
import UserModal from '@/components/admin/UserModal.vue';

const users = ref<IManageUsers[]>([]);
const selectedUser = ref<IManageUsers | null>(null);
const showModal = ref(false);
const modalError = ref<string>('');
const isLoading = ref(true);

const fetchUsers = async () => {
  try {
    const result = await AdminService.getAllUsers();
    if (result.data) {
      users.value = result.data;
    } else {
      console.error(result.errors);
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
  } finally {
    isLoading.value = false;
  }
};

const saveUser = async (user: IManageUsers) => {
  try {
    const result = await AdminService.updateUser(user.id, user);
    if (!result.errors) {
      const index = users.value.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users.value[index] = user;
      }
      modalError.value = '';

      closeModal();
    } else {
      modalError.value = result.errors.join('\n');
    }
  } catch (error) {
    modalError.value = 'An unexpected error occurred while saving the product';
  }
};

const deleteUser = async (userId: bigint) => {
  try {
    const result = await AdminService.deleteUser(userId);
    if (!result.errors) {
      users.value = users.value.filter(user => user.id !== userId);
    } else {
      console.error(result.errors);
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};

onMounted(() => {
  fetchUsers();
});

const openEditModal = (user: IManageUsers) => {
  selectedUser.value = { ...user };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedUser.value = null;
};

</script>

<template>
  <div>
    <h1>Users</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <UserModal v-if="showModal" :user="selectedUser" :modal-error="modalError" @close="closeModal" @save="saveUser">
        <template #title>
          <h2>Edit User</h2>
        </template>
      </UserModal>
        <table class="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="String(user.id)">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <div class="d-flex gap-2">
              <button @click="openEditModal(user)" class="btn btn-warning btn-sm">Edit</button>
              <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
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
