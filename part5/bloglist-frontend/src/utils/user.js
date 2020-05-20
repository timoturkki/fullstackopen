
export const USER_LOCAL_STORAGE_KEY = 'loggedBlogAppUser';

export const setLoggedInUser = (user) => window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));

export const getLoggedInUser = () => window.localStorage.getItem(USER_LOCAL_STORAGE_KEY);

export const removeLoggedInUser = () => window.localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
