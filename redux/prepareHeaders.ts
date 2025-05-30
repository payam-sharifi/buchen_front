const prepareHeaders = (headers: any) => {
  const lang = window.location.pathname.split('/')[1];

  window.localStorage.getItem('x-token') &&
    headers.set('X-tokenPmlm', window.localStorage.getItem('x-token'));
  headers.set('Content-Type', 'application/json');
  headers.set('Server-Ip', process.env.NEXT_PUBLIC_API_HOST);

  switch (lang) {
    case 'fa':
      headers.set('X-Language', '1');
      break;
    case 'en':
      headers.set('X-Language', '2');
      break;
    case 'ar':
      headers.set('X-Language', '3');
      break;
  }

  return headers;
};

export default prepareHeaders;
