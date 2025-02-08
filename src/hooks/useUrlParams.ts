export const useUrlParams = () => {
  const getParam = (param: string) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(param) || "";
  };

  const setParam = (param: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.pushState({}, "", url);
  };

  return { getParam, setParam };
};
