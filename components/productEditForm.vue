<template>
  <div class="form-wrapper">
    <div class="form-container">
      <h2>Editing</h2>
      <form>
        <div class="form-item">
          <label for="id-product-name">Наименование</label>
          <input id="id-product-name" name="name" v-model="name" placeholder="Введите название товара"/>
        </div>
        <div class="form-item">
          <label for="id-product-vendor">Артикул</label>
          <input id="id-product-vendor" name="name" v-model="vendor_code" placeholder="Введите артикул"/>
        </div>
        <div class="form-item">
          <button v-on:click.prevent="saveInit" type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "productEditForm",
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data: () => ({
            name: '',
            vendor_code: ''
        }),
        created() {
            const {name, vendor_code} = this.product;
            this.name = name;
            this.vendor_code = vendor_code;
        },
        watch: {
          product({name, vendor_code}) {
              this.name = name;
              this.vendor_code = vendor_code;
          }
        },
        methods: {
            saveInit() {
                if(this.name === this.product.name && this.vendor_code === this.product.vendor_code) {
                    this.$emit('close-edit-form');
                } else {
                    this.$emit('save-init', {id: this.product.id, name: this.name, vendor_code: this.vendor_code});
                }
            }
        }
    }
</script>

<style scoped>
  .form-wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
  }
  .form-container {
    padding: 10px;
    font-size: 14px;
    background: rgb(240,240,240);
    border: 1px solid rgb(220,220,220);
    border-radius: 5px;
    box-shadow: 1px 2px 3px rgb(100, 100, 100);
  }

  .form-container form .form-item {
    clear: both;
    text-align: right;
    margin: 10px;
  }

  .form-container button {
    padding: 5px;
  }

  .form-container input {
    min-width: 300px;
  }
</style>
