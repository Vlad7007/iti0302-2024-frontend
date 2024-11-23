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

const isLoading = ref(true);
const error = ref('');
const authenticationStore = useAuthenticationStore();
const name = ref('');
const page = ref(0);
const size = ref(10);
const totalPages = ref(0);

const criteria: ProductSearchCriteria = {
  name: '',
  page: 0,
  size: 10,
  sortBy: 'name',
  sortDirection: 'ASC'
};

const loadProducts = async () => {
  try {
    const userInfo = authenticationStore.userInfo;
    const response = await ProductsService.getInstance().getAll(criteria, userInfo!);
    if (response.data) {
      products.value = response.data;
      totalPages.value = Math.ceil(response.data.length / criteria.size!);
    } else {
      error.value = response.errors?.join('\n') || 'Failed to load products';
    }
  } catch (err) {
    error.value = 'An error occurred while loading products';
  } finally {
    isLoading.value = false;
  }
};

const saveProduct = async (product: IProduct) => {
  try {
    product.categoryIds = product.categoryIds.split(',').map(id => parseInt(id.trim(), 10));
    if (product.id) {
      await ProductsService.getInstance().update(product.id, product, authenticationStore.userInfo!);
    } else {
      await ProductsService.getInstance().create(product, authenticationStore.userInfo!);
    }
    await loadProducts();
    closeModal();
  } catch (error) {
    console.error('Error saving product:', error);
  }
};

const toggleSortDirection = () => {
  criteria.sortDirection = criteria.sortDirection === 'ASC' ? 'DESC' : 'ASC';
  loadProducts();
};

const searchProducts = () => {
  criteria.name = name.value;
  loadProducts();
};

const sort = (field: string) => {
  criteria.sortBy = field;
  criteria.sortDirection = criteria.sortDirection === 'ASC' ? 'DESC' : 'ASC';
  loadProducts();
};

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    criteria.page = page.value;
    loadProducts();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value - 1) {
    page.value++;
    criteria.page = page.value;
    loadProducts();
  }
};

const openCreateModal = () => {
  selectedProduct.value = { name: '', price: 0, quantity: 0, categoryIds: [], supplierId: 0 };
  showModal.value = true;
};

const openEditModal = (product: IProduct) => {
  selectedProduct.value = { ...product };
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
      error.value = response.errors.join('\n');
    }
  } catch (err) {
    error.value = 'An error occurred while deleting the product';
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
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <ProductModal v-if="showModal" @close="closeModal" @save="saveProduct">
        <template #title>
          <h2>{{ selectedProduct.id ? 'Edit' : 'Add' }} Product</h2>
        </template>
        <template #body>
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
            <input v-model="selectedProduct.categoryIds" type="text" class="form-control" id="productCategories" placeholder="Enter category IDs separated by commas" />
          </div>
          <div class="form-group">
            <label for="productSupplier">Supplier ID</label>
            <input v-model="selectedProduct.supplierId" type="number" class="form-control" id="productSupplier" placeholder="Enter supplier ID" />
          </div>
          <br>
          <button class="btn btn-primary" @click="saveProduct(selectedProduct)">Save</button>
        </template>
      </ProductModal>
      <button @click="openCreateModal" class="btn btn-success mb-2">Add Product</button>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="input-group">
          <input v-model="name" type="text" class="form-control" placeholder="Search products..." />
          <button @click="searchProducts" class="btn btn-outline-secondary">Search</button>
        </div>
      </div>

      <label for="sortOptions" class="me-2">Sort by: </label>
      <div class="d-flex align-items-center">
        <select id="sortOptions" v-model="criteria.sortBy" @change="loadProducts" class="form-select me-2">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
        </select>
        <button @click="toggleSortDirection" class="btn btn-outline-primary">
          {{ criteria.sortDirection === 'ASC' ? 'Ascending' : 'Descending' }}
        </button>
      </div>


      <table class="table">
        <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('price')">Price</th>
          <th @click="sort('quantity')">Quantity</th>
          <th>Categories</th>
          <th>Supplier</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.categoryIds.join(', ') }}</td>
          <td>{{ product.supplierId }}</td>
          <td>
            <button @click="openEditModal(product)" class="btn btn-warning btn-sm">Edit</button>
            <button @click="deleteProduct(product.id!)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div>
        <div>
          <span>Page {{ page + 1 }} of {{ totalPages }}</span>
        </div>
        <button @click="prevPage" :disabled="page === 0" class="btn btn-outline-secondary">Previous</button>
        <button @click="nextPage" :disabled="page >= totalPages - 1" class="btn btn-outline-secondary">Next</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>
