import axios from 'axios';
import { Cookies } from 'react-cookie';

function useFetch() {
  const cookies = new Cookies();
  const callApi = async function (params: {
    url: string;
    method: string;
    data?: { [key: string]: string | boolean };
    option?: string;
  }) {
    try {
      const { url, method, data, option } = params;
      const response = await axios({
        method,
        url,
        data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('token')}`,
        },
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
