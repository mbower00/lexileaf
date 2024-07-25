// I used code from multiple sources to get the environment variable stuff working, but
// here is a source:
// https://www.digitalocean.com/community/tutorials/vuejs-working-with-environment-variables
// (NOTE: the above comments apply to my .env)
const API_KEY = process.env.VUE_APP_API_KEY


export async function getWord(word, traversal = false) {
  // using code copied from https://rapidapi.com/dpventures/api/wordsapi/playground/54b6af68e4b02f9493f90b22
  const url = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.message === "word not found") {
      return word
    }
    // console.log(result)

    if( traversal) {
      return {...result, lexileafTraversal: traversal}
    }else{
      return result
    }
    
  } catch (error) {
    // console.log('here')
    console.error(error);
  }
}

export async function getRandomWord() {
  const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result)
    return result
  } catch (error) {
    console.error(error);
  }
}

export async function getSynonyms(word) {
  // using code copied from https://rapidapi.com/dpventures/api/wordsapi/playground/54b863d2e4b0417be3482942
  const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.message === "word not found") {
      return word
    }
    return result
  } catch (error) {
    console.error(error);
  }
}