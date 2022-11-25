import axios from 'axios';

function useFetch() {
  const callApi = async function (params: {
    url: string;
    method: string;
    data?: { [key: string]: string | boolean };
    option?: string;
  }) {
    try {
      const { url, method, data, option } = params;
      const response = await axios({ method, url, data });
      return response.data;
    } catch (err) {
      console.log('error >>', err);
    }
    return null;
  };

  return { callApi };
}

export default useFetch;
