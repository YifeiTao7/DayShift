import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.103:5145/api';

const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await axios({
      url,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.response) {
      console.error('Server responded with status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else {
      console.error('Network error or no response received:', error.message);
    }
    throw error;
  }
};

export default apiFetch;
