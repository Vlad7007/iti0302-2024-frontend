<script setup lang="ts">
import { defineEmits, ref, watch, defineProps } from 'vue';
import type { IManageUsers } from '@/models/IManageUsers';

const emit = defineEmits(['close', 'save']);
const props = defineProps<{
  user: IManageUsers | null
  modalError: string
}>();

const user = ref<IManageUsers | null>(null);

watch(() => props.user, (newUser) => {
  user.value = newUser ? { ...newUser } : null;
}, { immediate: true });

function closeModal() {
  emit('close');
}

function saveUser() {
  if (user.value) {
    emit('save', user.value);
  }
}
</script>


<template>
  <Teleport to="body">
    <div class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="title">
          <slot name="title">Edit User</slot>
        </div>
        <button class="close" @click="closeModal">X</button>
        <slot name="body">
          <div v-if="props.modalError" class="alert alert-danger" style="white-space: pre-line">{{ props.modalError }}</div>
          <div v-if="user">
            <div class="form-group">
              <label for="userName">Name</label>
              <input v-model="user.username" type="text" class="form-control" id="userName" placeholder="Enter user name" />
            </div>
            <div class="form-group">
              <label for="userEmail">Email</label>
              <input v-model="user.email" type="email" class="form-control" id="userEmail" placeholder="Enter user email" />
            </div>
            <div class="form-group">
              <label for="userRole">Role</label>
              <select v-model="user.role" class="form-control" id="userRole">
                <option value="ROLE_USER">User</option>
                <option value="ROLE_MANAGER">Manager</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>
          </div>
          <br>
          <button class="btn btn-primary" @click="saveUser">Save</button>
        </slot>
      </div>
    </div>
  </Teleport>
</template>


<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 500px;
  width: 100%;
}
.title {
  font-size: 1.5em;
  margin-bottom: 10px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}
</style>
