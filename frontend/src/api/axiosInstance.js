// base URL, timeout, iinterceptors

import axios from 'axios';

const response = await axios.get(
  'https://traffic-sms-notifier.onrender.com/health',
);
console.log(response.data);
