class cache {
  setCache(key: string, value: any, type?: string) {
    type === "session"
      ? window.sessionStorage.setItem(key, JSON.stringify(value))
      : window.localStorage.setItem(key, JSON.stringify(value));
  }

  // 获取
  getCache(key: string, type?: string) {
    let value =
      type === "session"
        ? window.sessionStorage.getItem(key)
        : window.localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        this.clear("localStorage");
        this.clear("session");
      }
    }
  }

  // 删除
  remove(key: string, type?: string) {
    type === "session"
      ? window.sessionStorage.removeItem(key)
      : window.localStorage.removeItem(key);
  }

  // 清空
  clear(type?: string) {
    type === "session"
      ? window.sessionStorage.clear()
      : window.localStorage.clear();
  }
}

export default new cache();
