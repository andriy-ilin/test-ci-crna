import { observable, computed, action, toJS } from "mobx";
import { AsyncStorage } from "react-native";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class FavoriteStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable entities = {};
  @observable favoritesEntities = [];

  @computed get list() {
    return Object.values(this.entities);
  }
  @computed get listFavorites() {
    return Object.values(this.favoritesEntities);
  }

  @action
  async getFavoritesArticles() {
    this.set("loading", true);
    await this.getArticles(`/catalog/en`);
    const favorites = await this.getStorage("@ukrainer:favorites");
    this.set("loading", false);

    return this.set(
      "favoritesEntities",
      this.list.filter(({ id }) => favorites && favorites.includes(id))
    );
  }

  @action set(name, data) {
    this[name] = data;
  }

  @action
  async saveToStorage(id) {
    try {
      const favorites = await this.getStorage("@ukrainer:favorites");
      const list = favorites
        ? JSON.parse(favorites).includes(id)
          ? JSON.parse(favorites)
          : [...JSON.parse(favorites), id]
        : [id];
      await AsyncStorage.setItem("@ukrainer:favorites", JSON.stringify(list));
      this.getFavoritesArticles();
    } catch (error) {
      console.log(">>>----error save storage", error);
    }
  }

  @action
  async getStorage(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log(">>>----error read from storage", error);
    }
  }

  @action
  async deleteFromStorage(id) {
    try {
      const favorites = await this.getStorage("@ukrainer:favorites");
      const listFilter = JSON.parse(favorites).filter(el => el !== id);
      await AsyncStorage.setItem(
        "@ukrainer:favorites",
        JSON.stringify(listFilter)
      );

      this.set(
        "favoritesEntities",
        this.list.filter(({ id }) => listFilter && listFilter.includes(id))
      );
    } catch (error) {
      console.log(">>>----error read from storage", error);
    }
  }
  @action
  async clearStorage(key, id) {
    try {
      await AsyncStorage.removeItem("@ukrainer:favorites");
      const favorites = await this.getStorage("@ukrainer:favorites");
      this.set("favoritesEntities", []);
    } catch (error) {
      console.log(">>>----error read from storage", error);
    }
  }

  @action
  async getArticles(refName, name = "entities") {
    this.set("loading", true);
    const data = await api.fetchAllByEntityName(refName);
    this.set(name, data);
    this.set("loading", false);
  }
}

export default FavoriteStore;
