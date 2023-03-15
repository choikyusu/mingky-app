import axios from 'axios';

function useFetch() {
  const callApi = async function (params: {
    url: string;
    method: string;
    data?: { [key: string]: string | boolean };
    option?: string;
    cookie?: string;
  }) {
    try {
      const { url, method, data, option, cookie } = params;

      const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
      };

      if (cookie) headers.Cookie = cookie;

      const response = await axios({
        method,
        url,
        data,
        headers,
      });
      return response.data;
    } catch (err) {
      console.log('error >>', err);
    }
    return null;
  };

  return { callApi };
}

export default useFetch;
