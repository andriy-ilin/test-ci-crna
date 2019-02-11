import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class VideoStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;

  @observable entities = {};
  @observable regions = {};
  @observable filterArticles = "";
  @observable selectedRegions = [];
  @observable findArticles = "";

  @computed get list() {
    return Object.values(toJS(this.entities));
  }

  @computed get selectedRegionsList() {
    return toJS(this.selectedRegions);
  }
  @computed get findArticlesList() {
    return toJS(this.findArticles);
  }

  @action set(name, data) {
    this[name] = data;
  }

  @computed get listRegions() {
    return Object.entries(this.regions).map(([name, mainBg]) => ({
      name,
      mainBg
    }));
  }

  @computed get listWithFilterAndFind() {
    return Object.values(toJS(this.entities))
      .sort(
        ({ dateArticleAdd: first }, { dateArticleAdd: second }) =>
          second > first
      )
      .filter(({ region, mainTitle }) => {
        return this.selectedRegionsList.length > 0
          ? this.findArticlesList
            ? this.selectedRegionsList.includes(region) &&
              mainTitle.includes(this.findArticlesList)
            : this.selectedRegionsList.includes(region)
          : !!this.findArticlesList
          ? mainTitle.includes(this.findArticlesList)
          : true;
      });
  }

  @action
  async getVideo(refName, name = "entities") {
    this.set("loading", true);
    const data = await api.fetchAllByEntityName(refName);
    this.set(name, data);
    this.set("loading", false);
  }

  @action
  addToSelectedRegions(value) {
    if (this.selectedRegionsList.includes(value)) {
      return this.set(
        "selectedRegions",
        this.selectedRegionsList.filter(item => item !== value)
      );
    }
    return this.set("selectedRegions", [...this.selectedRegionsList, value]);
  }

  @action
  addFindArticles(value) {
    return this.set("findArticles", value);
  }

  @action clearSelectedRegionsList() {
    return this.set("selectedRegions", []);
  }
  @action clearFindArticlesList() {
    return this.set("findArticles", "");
  }

  @action regionArticles(filterArticles) {
    return Object.values(toJS(this.entities)).filter(
      ({ region }) => region === filterArticles
    );
  }

  @action
  async getVideoRegions(value) {
    await this.getVideo(value);
    const listRegions = this.list;
    let data = listRegions.reduce(
      (prev, { region, mainBg }) => ({ ...prev, [region]: mainBg }),
      {}
    );
    return this.set("regions", data);
  }
}

export default VideoStore;
