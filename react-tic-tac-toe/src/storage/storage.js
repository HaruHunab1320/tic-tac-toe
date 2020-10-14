export class Storage {
  constructor(storageName = 'gameScoreBoard', initialValue = '[]') {
    this.storageName = storageName;

    /* Check if local storage contains any previous game data */
    if(!localStorage.getItem(storageName)) {
      /* If not, create new item */
      localStorage.setItem(storageName, initialValue)
    }
  }

  /* Load previous game data */
  getData(){
    return JSON.parse(localStorage.getItem(this.storageName))
  }

  update(data) {
  /* Update data in local storage */
  localStorage.setItem(this.storageName, JSON.stringify(data));
  }
}