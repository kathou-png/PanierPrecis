type Params = {
  name: string;
  value: string | number;
};

export async function fetchData<T>({
  url,
  params,
}: {
  url: string;
  params?: Params[];
}): Promise<T> {
  try {
    let queryString = "";
    if (params) {
      queryString =
        "?" +
        params
          .map(
            (param) =>
              `${param.name}=${encodeURIComponent(param.value.toString())}`
          )
          .join("&");
    }

    // Append query string to the URL
    const fullUrl = url + queryString;

    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const jsonRes = await response.json();
    return jsonRes.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error to the caller if needed
  }
}
