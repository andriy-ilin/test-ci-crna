import { observable, computed, action } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class ArticleStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable entities = {};

  @computed get list() {
    return Object.values(this.entities);
  }

  @action set(name, data) {
    this[name] = data;
  }

  @action
  async getArticle(refName) {
    const data = await api.fetchAllByEntityName(refName);
    this.set("entities", data);
  }
}

export default ArticleStore;
