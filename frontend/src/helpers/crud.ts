import { BASE_URL } from './constant.ts';
import Recase from 'better-recase';

type Params = {
  name: string;
  value: string | number;
};

export async function fetchData<T>({
                                     request,
                                     params
                                   }: {
  request: string;
  params?: Params[];
}): Promise<T> {
  try {
    let queryString = '';
    if (params) {
      queryString =
        '?' +
        params
          .map(
            (param) =>
              `${Recase.snakify(param.name)}=${encodeURIComponent(param.value.toString())}`
          )
          .join('&');
    }

    const fullUrl = BASE_URL + request + queryString;

    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const jsonRes = await response.json();
    return jsonRes;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate the error to the caller if needed
  }
}

export async function postData<T>({
                                    request,
                                    payload,
                                    contentType = 'application/json'
                                  }: {
  request: string;
  payload?: T;
  contentType?: string;
}): Promise<T> {
  try {
    const response = await fetch(BASE_URL + request, {
      method: 'POST',
      headers: {
        'Content-Type': `${contentType}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const jsonRes: T = await response.json();
    return jsonRes;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate the error to the caller if needed
  }
}


export async function postDataBis<T>({ request,
                                       payload,
                                     }: {
  request: string;
  payload: FormData;
}): Promise<T> {
  try {
    const response = await fetch(BASE_URL + request, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data`
      },
      body: payload
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const jsonRes: T = await response.json();
    return jsonRes;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate the error to the caller if needed
  }
}

export async function deleteData<T>({
                                      request,
                                      payload
                                    }: {
  request: string;
  payload?: Params[];
}): Promise<T> {
  let queryString = '';
  if (payload) {
    queryString =
      '?' +
      payload
        .map(
          (param) =>
            `${param.name}=${encodeURIComponent(param.value.toString())}`
        )
        .join('&');
  }
  const fullUrl = BASE_URL + request + queryString;
  try {
    const response = await fetch(fullUrl, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const jsonRes: T = await response.json();
    return jsonRes;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate the error to the caller if needed
  }
}
