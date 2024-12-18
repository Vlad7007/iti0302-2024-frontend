<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['close', 'save']);

function closeModal() {
  emit('close');
}

function saveProduct() {
  emit('save');
}
</script>

<template>
  <Teleport to="body">
    <div class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="title">
          <slot name="title">Product Form</slot>
        </div>
        <button class="close" @click="closeModal">X</button>
        <slot name="body">
          <div>
            <p>Product details go here...</p>
            <button @click="saveProduct">Save</button>
          </div>
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
