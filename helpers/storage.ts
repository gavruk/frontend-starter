function storageAvailable(type: "localStorage" | "sessionStorage"): boolean {
  let storage: Storage | undefined;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      !!storage &&
      storage.length !== 0
    );
  }
}

export function setItem(key: string, value: string) {
  if (storageAvailable("localStorage")) {
    window.localStorage.setItem(key, value);
  }
}

export function getItem(key: string) {
  if (storageAvailable("localStorage")) {
    return window.localStorage.getItem(key) || "";
  }
  return "";
}

export function removeItem(key: string) {
  if (storageAvailable("localStorage")) {
    window.localStorage.removeItem(key);
  }
}

export function getToken(): string | undefined {
  return getItem("AUTH_TOKEN");
}

export function setToken(token: string | undefined): void {
  if (!token) {
    removeItem("AUTH_TOKEN");
  } else {
    setItem("AUTH_TOKEN", token);
  }
}
