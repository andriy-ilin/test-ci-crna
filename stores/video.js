import { observable, computed, action, toJS } from "mobx";
import api from "../services/api";
import { entitiesFromFB } from "./utils";

import BasicStore from "./BasicStore";

class VideoStore extends BasicStore {
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
  async getVideo(name = "entities") {
    this.set("loading", true);
    const data = await api.fetchAllByEntityName("/video");

    this.set(name, data);
    this.set("loading", false);
  }
}

export default VideoStore;
