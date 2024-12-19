<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductsService from '@/services/products/ProductsService';
import type { IProduct } from '@/models/IProduct';
import { useAuthenticationStore } from '@/stores/AuthenticationStore';
import type { ProductSearchCriteria } from '@/models/ProductSearchCriteria';
import ProductModal from '@/components/products/ProductModal.vue'

const products = ref<IProduct[]>([]);

const showModal = ref(false);
const selectedProduct = ref<IProduct>({ name: '', price: 0, quantity: 0, categoryIds: [], supplierId: 0 });
const categoryIdsInput = ref('');

const isLoading = ref(true);
const showError = ref<string>('');
const authenticationStore = useAuthenticationStore();
const hasManagerOrAdminRole = authenticationStore.userInfo?.role === 'ROLE_MANAGER' || authenticationStore.userInfo?.role === 'ROLE_ADMIN';
const name = ref('');
const page = ref(1);
const totalPages = ref(0);

const criteria: ProductSearchCriteria = {
  name: '',
  minPrice: undefined,
  maxPrice: undefined,
  page: 1,
  size: 10,
  sortBy: 'name',
  sortDirection: 'ASC'
};

const loadProducts = async () => {
  try {
    const userInfo = authenticationStore.userInfo;
    const response = await ProductsService.getInstance().getAll(criteria, userInfo!);

    if (response.errors) {
      showError.value = response.errors.join('\n');
    } else {
      products.value = response.content;
      totalPages.value = response.totalPages;
    }
  } catch (error: any) {
    showError.value = 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};


const modalError = ref<string>('');

const saveProduct = async (product: IProduct) => {
  try {
    selectedProduct.value.categoryIds = categoryIdsInput.value.split(',').map(id => parseInt(id.trim(), 10));
    let response;
    if (selectedProduct.value.id) {
      response = await ProductsService.getInstance().update(selectedProduct.value.id, selectedProduct.value, authenticationStore.userInfo!);
    } else {
      response = await ProductsService.getInstance().create(selectedProduct.value, authenticationStore.userInfo!);
    }

    if (response.errors) {
      modalError.value = response.errors.join('\n');
    } else {
      await loadProducts();
      modalError.value = '';
      closeModal();
    }
  } catch (error: any) {
    modalError.value = 'An unexpected error occurred while saving the product';
  }
};

const searchProducts = () => {
  criteria.name = name.value;
  loadProducts();
};

const sort = (field: string) => {
  if (criteria.sortBy === field) {
    criteria.sortDirection = criteria.sortDirection === 'ASC' ? 'DESC' : 'ASC';
  } else {
    criteria.sortBy = field;
    criteria.sortDirection = 'ASC';
  }
  loadProducts();
};


const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    criteria.page = page.value;
    loadProducts();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    criteria.page = page.value;
    loadProducts();
  }
};

const openCreateModal = () => {
  selectedProduct.value = { name: '', price: 0, quantity: 0, categoryIds: [], supplierId: 0 };
  categoryIdsInput.value = '';
  showModal.value = true;
};

const openEditModal = (product: IProduct) => {
  selectedProduct.value = { ...product };
  categoryIdsInput.value = product.categoryIds.join(', ');
  showModal.value = true;
};

function closeModal() {
  showModal.value = false;
}


const deleteProduct = async (id: number) => {
  try {
    const userInfo = authenticationStore.userInfo;
    const response = await ProductsService.getInstance().delete(id, userInfo!);
    if (!response.errors) {
      products.value = products.value.filter(product => product.id !== id);
    } else {
      showError.value = response.errors.join('\n');
    }
  } catch (err) {
    showError.value = 'An error occurred while deleting the product';
  }
};

onMounted(() => {
  loadProducts();
});
</script>


<template>
  <div>
    <h1>Products</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="showError" class="alert alert-danger" style="white-space: pre-line">{{ showError }}</div>
      <ProductModal v-if="showModal" @close="closeModal" @save="saveProduct">
        <template #title>
          <h2>{{ selectedProduct.id ? 'Edit' : 'Add' }} Product</h2>
        </template>
        <template #body>
          <div v-if="modalError" class="alert alert-danger" style="white-space: pre-line">{{ modalError }}</div>
          <div class="form-group">
            <label for="productName">Name</label>
            <input v-model="selectedProduct.name" type="text" class="form-control" id="productName" placeholder="Enter product name" />
          </div>
          <div class="form-group">
            <label for="productPrice">Price</label>
            <input v-model="selectedProduct.price" type="number" class="form-control" id="productPrice" placeholder="Enter product price" />
          </div>
          <div class="form-group">
            <label for="productQuantity">Quantity</label>
            <input v-model="selectedProduct.quantity" type="number" class="form-control" id="productQuantity" placeholder="Enter product quantity" />
          </div>
          <div class="form-group">
            <label for="productCategories">Categories</label>
            <input v-model="categoryIdsInput" type="text" class="form-control" id="productCategories" placeholder="Enter category IDs separated by commas" />
          </div>
          <div class="form-group">
            <label for="productSupplier">Supplier ID</label>
            <input v-model="selectedProduct.supplierId" type="number" class="form-control" id="productSupplier" placeholder="Enter supplier ID" />
          </div>
          <br>
          <button class="btn btn-primary" @click="saveProduct(selectedProduct)">Save</button>
        </template>
      </ProductModal>
      <button @click="openCreateModal" class="btn btn-success mb-2" v-if="hasManagerOrAdminRole">Add Product</button>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="input-group">
          <input v-model="name" type="text" class="form-control" placeholder="Search products..." />
          <button @click="searchProducts" class="btn btn-outline-secondary">Search</button>
        </div>
      </div>

      <table class="table">
        <thead>
        <tr>
          <th @click="sort('name')">
            Name
            <span v-if="criteria.sortBy === 'name'">
          {{ criteria.sortDirection === 'ASC' ? '▲' : '▼' }}
        </span>
          </th>
          <th @click="sort('price')">
            Price
            <span v-if="criteria.sortBy === 'price'">
          {{ criteria.sortDirection === 'ASC' ? '▲' : '▼' }}
        </span>
          </th>
          <th @click="sort('quantity')">
            Quantity
            <span v-if="criteria.sortBy === 'quantity'">
          {{ criteria.sortDirection === 'ASC' ? '▲' : '▼' }}
        </span>
          </th>
          <th>Categories</th>
          <th>Supplier</th>
          <th v-if="hasManagerOrAdminRole">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }} $</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.categoryIds.join(', ') }}</td>
          <td>{{ product.supplierId }}</td>
          <td v-if="hasManagerOrAdminRole">
            <div class="d-flex gap-2">
              <button @click="openEditModal(product)" class="btn btn-warning btn-sm">Edit</button>
              <button @click="deleteProduct(product.id!)" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <div>
        <div>
          <span>Page {{ page }} of {{ totalPages }}</span>
        </div>
        <div class="d-flex gap-2">
          <button @click="prevPage" :disabled="page === 1" class="btn btn-outline-secondary">Previous</button>
          <button @click="nextPage" :disabled="page >= totalPages" class="btn btn-outline-secondary">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>
