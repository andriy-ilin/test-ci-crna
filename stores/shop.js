import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class ShopStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;
  @observable error = false;

  @observable entities = {};
  @observable product = {};

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
  @computed get getProduct() {
    return toJS(this.product);
  }
  @computed get getTotal() {
    return this.total;
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

  @computed get getItems() {
    return toJS(this.items);
  }

  @computed get cartQuantity() {
    return this.items.length;
  }

  @computed get cartProduct() {
    return toJS(
      this.items.map(({ id, quantity, ...rest }) => ({
        ...this.entities[id],
        quantity,
        rest
      }))
    );
  }

  @action changePaymentType(type) {
    this.set("paymentType", type);
  }

  @action changePropsQuantity(sign) {
    sign === "-"
      ? this.quantity > 1
        ? this.set("quantity", this.quantity - 1)
        : this.set("quantity", this.quantity)
      : this.set("quantity", this.quantity + 1);
  }

  @action addItem({ id, ...props }) {
    const listCartId = this.items.map(({ id }) => id);
    if (!listCartId.includes(id)) {
      return this.set("items", [...this.items, { id, ...props }]);
    }
    return this.set(
      "items",
      this.items.map(el => {
        if (el.id === id) {
          return {
            ...el,
            ...props
          };
        }
        return el;
      })
    );
  }

  @action changeQuantity(id, sign) {
    this.set(
      "items",
      this.items.map(el => {
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
      })
    );

    this.calcTotal();
  }

  @action delItem(id) {
    this.set("items", this.items.filter(el => el.id !== id));
    this.calcTotal();
  }

  @action clear() {
    this.set("items", []);
    this.calcTotal();
  }

  @action calcTotal() {
    const total = this.cartProduct.reduce(
      (prev, { quantity, priceArr: { newPrice = "" } = {} }) => {
        return prev + quantity * +newPrice.replace(" ₴", "").replace(",", "");
      },
      0
    );

    return this.set("total", total);
  }
}

export default ShopStore;
