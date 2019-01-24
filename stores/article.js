import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class ArticleStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable topData = {};
  @observable entities = {};
  @observable articleData = {};
  @observable regionArticleIdData = {};
  // @observable authorData = {};

  @computed get list() {
    return Object.values(this.entities);
  }

  @computed get top() {
    return toJS(this.topData);
    // .sort(
    //   ({ mainTitle: a }, { mainTitle: b }) => b > a
    // );
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
    this.set("loading", true);
    const data = await api.fetchAllByEntityName(refName);
    this.set(name, data);
    this.set("loading", false);
  }

  @action
  async getTop(refName, name = "topData") {
    this.set("loading", true);

    const data = await api.fetchAllByEntityName(refName);
    const sort = Object.values(data).sort(
      ({ mainTitle: a }, { mainTitle: b }) => a.length - b.length
    );
    this.set(name, sort);
    this.set("loading", false);
  }
}

export default ArticleStore;
