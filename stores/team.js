import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class TeamStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable entities = {};
  @observable authorData = {};
  @observable authorMoreData = [];

  @computed get listEntries() {
    return Object.values(toJS(this.entities));
  }
  @computed get authorArticleData() {
    return toJS(this.authorData);
  }
  @computed get authorArticleMoreData() {
    return this.authorMoreData;
  }

  @action
  async author(id) {
    const data = toJS(this.entities)[id];
    const articles = data.articles.reduce((prev, { href, job }) => {
      const index = prev.find(({ job: prevJob }) => job === prevJob);
      if (index) {
        return prev.map(({ job, articles }) => {
          const arrArticles = [...articles, href].filter(
            (item, pos) => [...articles, href].indexOf(item) == pos
          );
          return {
            job,
            articles: arrArticles
          };
        });
      }
      return [...prev, { job, articles: [href] }];
    }, []);

    this.set("authorData", { ...data, articles });
    const more = await this.getMoreArticlesData();
    this.set("authorMoreData", more);
    return data;
  }

  @action
  async getMoreArticlesData() {
    this.set("loading", true);

    const { lang, articles } = this.authorArticleData;
    const data = await api.fetchAllByEntityName(`/catalog/${lang}`);
    const dataArticles = articles.map(({ articles, job }) => ({
      title: job,
      data: articles.map(el =>
        Object.values(data).find(({ href }) => el === href)
      )
    }));
    this.set("loading", false);
    return dataArticles;
  }

  @action set(name, data) {
    this[name] = data;
  }

  @action
  async getRoles(refName) {
    this.set("loading", true);
    const data = await api.fetchAllByEntityName(refName);
    this.set("entities", data);
    this.set("loading", false);
    return data;
  }
}

export default TeamStore;
