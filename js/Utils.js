class Utils {
  static saveLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  }
}

export default Utils;
