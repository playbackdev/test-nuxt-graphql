<template>
    <div class="content">
      <Pagination @page-changed="changePage" :page="page" />
      <ProductEditForm
        v-if="editing"
        :product="editing"
        @save-init="saveProduct"
        @close-edit-form="closeEditForm"
      />
      <div v-if="$apollo.loading">Loading...</div>
      <table v-else class="table-products">
        <tr>
          <td>№</td>
          <td>Наименование</td>
          <td>Артикул</td>
          <td>Серия</td>
          <td>Цена</td>
          <td></td>
        </tr>
        <ProductRow
          v-for="(product, i) in products"
          :key="product.id"
          :index="i"
          :product="product"
          @edit-begin="startEditing"
        />
      </table>
    </div>
</template>

<script>
import ProductRow from "../components/productRow";
import ProductEditForm from "../components/productEditForm";
import {getProducts, updateProduct} from "../graphql/queries";
import Pagination from "../components/Pagination";
export default {
    components: {Pagination, ProductEditForm, ProductRow},
    data: () => ({
        editing: null,
        limit: 40,
        page: 1,
    }),
    computed: {
        offset() {
            return this.limit * (this.page - 1);
        }
    },
    apollo: {
      products: {
          query: getProducts,
          variables() {
              return {
                  limit: this.limit,
                  offset: this.offset
              }
          }
      },
  },
  methods: {
        startEditing(product) {
            this.editing = product;
        },
        saveProduct({id, name, vendor_code}) {
            this.$apollo.mutate({
                mutation: updateProduct,
                variables: {
                    id,
                    name,
                    vendor_code
                }
            }).then(data => {
                console.log(data);
            });
            this.editing = null;
        },
        changePage({page}) {
          this.page = page;
        },
        closeEditForm() {
            this.editing = null;
        }
  }
}
</script>

<style>
  .content {
    margin: 10px;
  }
  .table-products {
    color: #000000;
    font-size: 14px;
    background: rgb(240,240,240);
    border: 1px solid rgb(220,220,220);
    border-collapse:separate;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgb(100, 100, 100);
  }

  .table-products td {
    padding: 5px;
    background-color: rgb(230, 230, 230);
    border-top: 1px solid #ffffff;
    border-bottom:1px solid rgb(180, 180, 180);
    border-left: 1px solid rgb(180, 180, 180);
  }

  .table-products tr:first-child td {
    padding: 10px;
    background-color: rgb(210,210,210);
    text-align: center;
    font-weight: bold;
  }

  .table-products td:first-child {
    text-align: center;
  }

  .table-products td button {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .table-products td:last-child button {
    width: 30px;
    height: 30px;
    padding: 5px;
    border: 1px solid rgb(140, 140, 140);
    box-shadow: 0 1px 2px rgb(160, 160, 160);
    border-radius: 3px;
    background: rgb(220,220,220);
    transition: all 0.3s ease;
  }

  .table-products td:last-child button:hover {
    background: rgb(240,240,240);
    box-shadow: 0 1px 4px rgb(140, 140, 140);
    border: 1px solid rgb(30, 30, 30);
    cursor: pointer;
  }


</style>
