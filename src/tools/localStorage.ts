const setItem = (key: string, item: any) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};

const getItem = (key: string) => {
  const item = window.localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

// eslint-disable-next-line consistent-return
export const getItemFromLS = <T>(path: string): T | null => {
  const [root, ...keys] = path.split('.');

  const data = getItem(root);

  if (keys.length === 0) {
    return data;
  }

  let currentLevel = data || {};

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (!currentLevel[key]) {
      currentLevel = null;

      return null;
    }

    if (i === keys.length - 1) {
      return currentLevel[key];
    }

    currentLevel = currentLevel[key];
  }

  return null;
};

export const setItemToLS = (path: string, item: any) => {
  const [root, ...keys] = path.split('.');

  if (keys.length === 0) {
    setItem(root, item);

    return;
  }

  const data = getItem(root) || {};
  let currentLevel = data;

  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      currentLevel[key] = item;

      return;
    }

    if (!currentLevel[key]) {
      currentLevel[key] = {};
    }

    currentLevel = currentLevel[key];
  });

  setItem(root, data);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (i === keys.length - 1) {
      currentLevel[key] = item;

      setItem(root, data);

      return;
    }

    if (!currentLevel[key]) {
      currentLevel[key] = {};
    }

    currentLevel = currentLevel[key];
  }
};

export const removeItemFromLS = (path: string) => {
  const [root, ...keys] = path.split('.');

  if (keys.length === 0) {
    removeItem(root);

    return;
  }

  const data = getItem(root);

  if (!data) {
    return;
  }

  let currentLevel = data;

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (!currentLevel[key]) {
      return;
    }

    if (i === keys.length - 1) {
      delete data[key];

      setItem(root, data);

      return;
    }

    currentLevel = currentLevel[key];
  }
};

export const setFileToLS = async (path: string, file: File | null) => {
  if (!file) {
    return;
  }

  const arrayBuffer = await file.arrayBuffer();
  const bites = Array.from(new Uint8Array(arrayBuffer));

  setItemToLS(path, {
    name: file.name,
    type: file.type,
    bites,
  });
};

export const getFileFromLS = (path: string): File | null => {
  const data = getItemFromLS<any>(path);

  if (!data) {
    return null;
  }

  const uint8Array = new Uint8Array(data.bites);

  return new File([uint8Array], data.name, {
    type: data.type,
  });
};
