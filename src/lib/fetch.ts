import axios from "axios";

const fetch = async <T>(
  url: string,
  params?: Record<string, string | null | number | undefined>
): Promise<T> => {
  const res = await axios.get<T>(url, {
    params: { ...params },
  });
  return res.data;
};

export { fetch };
