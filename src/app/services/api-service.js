export const fetchData = async (endpoint) => {
  // Mocked response
  const responses = {
    '/about': {
      data: 'Jestem doświadczonym programistą z pasją do technologii...'
    },
    '/experience': { data: 'Doświadczenie zawodowe: Programista w XYZ...' },
    '/education': { data: 'Edukacja: Uniwersytet Technologiczny...' },
    '/publications': { data: 'Publikacje: Artykuł w XYZ...' },
    '/services': { data: 'Usługi: Tworzenie stron internetowych...' }
  };
  return new Promise((resolve) => {
    setTimeout(() => resolve(responses[endpoint]), 500);
  });
};
