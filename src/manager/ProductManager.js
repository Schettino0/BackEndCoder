import fs from "fs";
export class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.idProduct = 1;

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.log("Error al leer el archivo: " + error);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log("Falta informacion");
    }
    const newProduct = {
      id: this.idProduct++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    try {
      const datos = await this.getProducts();
      if (datos.some((product) => product.code == code)) {
        return console.log("El codigo ya esta siendo utilizado");
      }
      datos.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(datos));
      return console.log("Producto añadido con exito.");
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByID(id) {
    const products = await this.getProducts();
    const productFind = products.find((product) => product.id == id);
    if (!productFind) {
      return -1;
    } else {
      return productFind;
    }
  }

  async deleteProduct(id) {
    const productos = await this.getProducts();
    let j = 0;
    for (let index = 0; index < productos.length; index++) {
      const element = productos[index];
      if (element.id == id) {
        productos.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productos));
        return console.log("Eliminado.");
      } else {
        j++;
      }
    }
    if (j > 0) {
      return console.log("ID no encontrado");
    }
    if (productos.length == 0) {
      return console.log("Lista productos vacia.");
    }
  }

  async updateProduct(id, newInfo) {
    const products = await this.getProducts();
    const productToUpdate = products.findIndex((e) => e.id == id);
    if (productToUpdate >= 0) {
      if (products.some((e) => e.code == newInfo.code)) {
        console.log("Codigo ya en uso.");
        return -1;
      }
      products[productToUpdate] = {
        id: products[productToUpdate].id,
        title: newInfo.title || products[productToUpdate].title,
        description:
          newInfo.description || products[productToUpdate].description,
        price: newInfo.price || products[productToUpdate].price,
        thumbnail: newInfo.thumbnail || products[productToUpdate].thumbnail,
        code: newInfo.code || products[productToUpdate].code,
        stock: newInfo.stock || products[productToUpdate].stock,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return console.log("Informacion actualizada.");
    }
  }
}
