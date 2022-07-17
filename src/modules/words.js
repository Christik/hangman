const URL = 'https://raw.githubusercontent.com/Christik/hangman/main/src/data.json';

const getWords = async () => {
  try {
    const response = await fetch(URL)
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }

    return [];
  } catch(err) {
    return [];
  }
};

export { getWords };