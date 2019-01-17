import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class ArticleStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable entities = {};
  @observable articleData = {};
  @observable regionArticleIdData = {};

  @computed get list() {
    return Object.values(this.entities);
  }

  @computed get article() {
    return toJS(this.articleData);
  }
  @computed get regionArticleId() {
    return toJS(this.regionArticleIdData);
  }

  @action set(name, data) {
    this[name] = data;
  }

  @action
  async getArticle(refName, name = "entities") {
    const data = await api.fetchAllByEntityName(refName);
    this.set(name, data);
  }
}

export default ArticleStore;
