import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class ShopStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;
  @observable error = false;

  @observable entities = {};

  @observable quantity = 1;
  @observable total;
  @observable paymentType = "card";

  @observable items = [
    // {
    // 	id: 11,
    // 	quantity: 3
    // },
  ];

  @computed get list() {
    return Object.values(toJS(this.entities));
  }

  @action
  async getProducts(refName, name = "entities") {
    this.set("loading", true);
    const data = await api.fetchAllByEntityName(refName);
    this.set(name, data);
    this.set("loading", false);
  }

  @action set(name, data) {
    this[name] = data;
  }

  @computed get cartQuantity() {
    return this.items.length;
  }

  @computed get cartProduct() {
    const products = [...toJS(this.entities)];
    const listCartId = this.items.reduce((prev, el) => [...prev, el.id], []);
    const listCartQuantity = this.items.reduce(
      (prev, el) => [...prev, el.quantity],
      []
    );

    return products.reduce((prev, el) => {
      if (listCartId.indexOf(el.id) !== -1) {
        const cartEl = {
          ...el,
          quantity_cart: listCartQuantity[listCartId.indexOf(el.id)]
        };
        return [...prev, cartEl];
      }
      return prev;
    }, []);
  }

  @action changePaymentType(type) {
    this.paymentType = type;
  }

  @action changePropsQuantity(sign) {
    sign === "-"
      ? this.quantity > 1
        ? --this.quantity
        : this.quantity
      : ++this.quantity;
  }

  @action addItem(id, quantity) {
    const listCartId = this.items.reduce((prev, el) => [...prev, el.id], []);
    if (listCartId.indexOf(id)) {
      return (this.items = [...this.items, { id, quantity }]);
    }
    return (this.items = this.items.map(el => {
      if (el.id === id) {
        return {
          ...el,
          quantity: quantity
        };
      }
      return el;
    }));
  }

  @action changeQuantity(id, sign) {
    // console.log('--------------------',this.items)
    this.items = this.items.map(el => {
      if (id === el.id) {
        return {
          ...el,
          quantity:
            sign === "-"
              ? el.quantity > 1
                ? --el.quantity
                : el.quantity
              : ++el.quantity
        };
      }
      return el;
    });
    this.calcTotal();
  }

  @action delItem(id) {
    this.items = this.items.filter(el => el.id !== id);
    this.calcTotal();
  }

  @action clear() {
    this.items = [];
    this.calcTotal();
  }

  @action calcTotal() {
    const total = this.cartProduct.reduce((prev, el) => {
      return prev + el.quantity_cart * el.price;
    }, 0);
    return (this.total = total);
  }
}

export default ShopStore;
