const wordGenerator = document.querySelector(".wordGenerator")
const randomWord = document.querySelector(".randomWordPara")
const definitionDiv = document.querySelector(".definitionDiv")
const exampleGenerator = document.querySelector(".exampleGenerator")
const exampleDiv = document.querySelector(".exampleDiv")
const partOfSpeech = document.querySelector(".partOfSpeech")
const wordURL = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=noun-plural&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
let definitionURL = ""
let exampleURL = ""

wordGenerator.addEventListener("click", () => {
    fetch(wordURL)
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            randomWord.textContent = data.word.toLowerCase()
            changeWord(data.word)
            clearScreen()
        })
})

function changeWord(word) {
    definitionURL = "http://api.wordnik.com:80/v4/word.json/" + word + "/definitions?limit=200&includeRelated=false&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
    exampleURL = "http://api.wordnik.com:80/v4/word.json/" + word + "/examples?includeDuplicates=false&useCanonical=true&skip=0&limit=2&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
}

function clearScreen() {
    while (definitionDiv.hasChildNodes()) {   
        definitionDiv.removeChild(definitionDiv.firstChild)
    }
    while (exampleDiv.hasChildNodes()) {   
        exampleDiv.removeChild(exampleDiv.firstChild)
    }
    exampleGenerator.style.display = "none"
    partOfSpeech.textContent = ""
}

randomWord.addEventListener("click", () => {
    clearScreen()
    fetch(definitionURL)
        .then(function(response) {
            return response.json()
        }).then(function(data){
            partOfSpeech.textContent = "Part of speech: " + data[0].partOfSpeech
            for (let i = 0; i <= 2; i++) {
                if (data[i] === undefined) {
                    let newP = document.createElement("p")
                    newP.textContent = "Sorry, we couldn't find this definition!"
                    definitionDiv.appendChild(newP)
                } else {
                    let newHeader5 = document.createElement("h5")
                    let newP = document.createElement("p")
                    newHeader5.textContent = data[i].text
                    newP.textContent = data[i].attributionText
                    definitionDiv.appendChild(newHeader5)
                    definitionDiv.appendChild(newP)
                }
            }
        })
        exampleGenerator.style.display = ""
})


exampleGenerator.addEventListener("click", () => {
    while (exampleDiv.hasChildNodes()) {   
        exampleDiv.removeChild(exampleDiv.firstChild)
    }
    exampleGenerator.style.display = "none"
    fetch(exampleURL)
        .then(function(response) {
            return response.json()
        }).then(function(data){
            if (data.examples === undefined) {
                let newP = document.createElement("p")
                newP.classList.add("exampleP")
                newP.textContent = "Sorry, we couldn't find this example!"
                exampleDiv.appendChild(newP)
            } else {
                for (let i = 0; i < data.examples.length; i++) {
                    let newP = document.createElement("p")
                    newP.classList.add("exampleP")
                    newP.textContent = data.examples[i].text
                    exampleDiv.appendChild(newP)
                }
            }
        })
})