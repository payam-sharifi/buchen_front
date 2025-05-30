const prepareHeaders = (headers: any) => {
  const lang = window.location.pathname.split('/')[1];

  window.localStorage.getItem('x-token') &&
    headers.set('X-tokenPmlm', window.localStorage.getItem('x-token'));
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
