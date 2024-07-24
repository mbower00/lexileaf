const maxSearchHistorySize = 15
const maxWordHistorySize = 25

export function getQueryParams() {
  // using code from:
  // - https://www.w3schools.com/howto/howto_js_get_url.asp
  // - https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  // - https://www.geeksforgeeks.org/how-to-get-url-parameters-using-javascript/
  // - https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
  // - https://developer.mozilla.org/en-US/docs/Web/API/URL

  const params = new URL(window.location.href).searchParams
  let paramsReturn = {}
  for (let nameAndParam of params.entries()) {
    paramsReturn[nameAndParam[0]] = nameAndParam[1]
  }
  return paramsReturn
}

// using code from: 
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// - https://www.w3schools.com/jsref/prop_win_localstorage.asp

// LOCAL STORAGE

export function getFromLocalStorage(id) {
  return JSON.parse(window.localStorage.getItem(id))
}
export function setToLocalStorage(id, store) {
  window.localStorage.setItem(id, JSON.stringify(store))
}

export function addToLimitedArray(a, add, limit) {
  // bring array down to one below the limit
  while (a.length >= limit) {
    a.pop()
  }
  a.unshift(add)
}

// WORD HISTORY

export function getWordHistory() {
  // using code from
  // - the sleepoutside site
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  let history = getFromLocalStorage("word-history")
  if (!Array.isArray(history)) {
    history = []
    setToLocalStorage("word-history", history)
  }

  return history
}

export function setToWordHistory(word) {
  let history = getWordHistory()

  if (word !== history[0]) {
    addToLimitedArray(history, word, maxWordHistorySize)
    setToLocalStorage("word-history", history)
  }
}

// CURRENT WORD LOCATION

export function getCurrentWordLocation() {
  let history = getWordHistory()
  let currentWordLocation = getFromLocalStorage("current-word-location")
  // using code from a Javascript course
  currentWordLocation = currentWordLocation*1
  if ((!currentWordLocation 
        && currentWordLocation !== 0
      ) 
      || (currentWordLocation > history.length - 1)
      || (currentWordLocation < 0)) {
    currentWordLocation = 0
    setToLocalStorage("current-word-location", currentWordLocation)
  }
  return currentWordLocation
}
export function setToCurrentWordLocation(num) {
  setToLocalStorage("current-word-location", num)
}

// SEARCH HISTORY

export function getSearchHistory() {
  // using code from
  // - the sleepoutside site
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  let history = getFromLocalStorage("search-history")
  if (!Array.isArray(history)) {
    history = []
    setToLocalStorage("search-history", history)
  }
  
  return history
}

export function setToSearchHistory(word) {
  let history = getSearchHistory()
  
  // remove all word from history, so that it is brought to the front
  history = history.filter((historyElement)=>{
    return historyElement !== word
  })

  addToLimitedArray(history, word, maxSearchHistorySize)
  setToLocalStorage("search-history", history)
}

export function clearSearchHistory() {
  setToLocalStorage("search-history", [])
}

// SAVED WORDS

export function getSavedWords() {
  // using code from
  // - the sleepoutside site
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  let savedWords = getFromLocalStorage("saved-words")
  if (!Array.isArray(savedWords)) {
    savedWords = []
    setToLocalStorage("saved-words", savedWords)
  }

  return savedWords
}

export function setToSavedWords(wordData) {
  let savedWords = getSavedWords()
  
  // remove all wordData that matches the word from savedWords, so that it is brought to the front
  savedWords = savedWords.filter((savedWordsElement)=>{
    return savedWordsElement.word !== wordData.word
  })

  // max size? addToLimitedArray(savedWords, wordData, maxSavedWordsSize)
  savedWords.unshift(wordData)

  setToLocalStorage("saved-words", savedWords)
}

export function deleteSavedWord(word) {
  let savedWords = getSavedWords()
  
  // remove all wordData that matches the word from savedWords
  savedWords = savedWords.filter((savedWordsElement)=>{
    return savedWordsElement.word !== word
  })

  setToLocalStorage("saved-words", savedWords)
}

export function deleteAllSavedWord() {
  setToLocalStorage("saved-words", [])
}

export function checkForSavedWord(word) {
  const words = getSavedWords()
  const filterCheck = words.filter((wordEntry) => {
    return wordEntry.word === word
  })

  return filterCheck.length > 0
}