const pyramid = document.querySelector(".pyramid")
const btns = document.querySelector(".btns")
const template = document.querySelector(".template")
const startMenu = document.querySelector(".startPopUp")
const endMenu = document.querySelector(".endGamePopup")
const skipMenu = document.querySelector(".skipPopup")
const skipText = document.querySelector(".skipPopup h3")
const wordMenu = document.querySelector(".words")

let words = []
let wordList = []

let skipNum = 0;
let maxSkips = -1;

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

function createBoard() {
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div")
        row.classList.add("row")
        for (let x = 0; x <= i; x++) {
            let box = document.createElement("div")
            box.classList.add("box")
            box.classList.add("standingBox")
            box.dataset.row = i
            box.dataset.pos = x
            box.addEventListener("click", moveBox)
            row.appendChild(box)
        }
        pyramid.insertBefore(row,btns)
    }
}

function checkEnd() {
    console.log("CHECKED WIN")

    for (let i = 0; i < words.length; i++) {
        if (words[i].indexOf('') != -1) return false
    }
    
    for (let i = 0; i < words.length; i++) {
        let extension = (wordList.includes(words[i].join("").toLowerCase())) ? "Valid" : "Not Valid"
        wordMenu.children[i].textContent += words[i].join("") + " " + extension
    }

    endMenu.style.display="flex"
    pyramid.style.display="none"


}

function moveBox(e) {
    let elm = e.target
    let r = elm.dataset.row
    let c = elm.dataset.pos

    let text = document.querySelector(".letter h3").textContent
    words[r][c] = text

    let x = e.clientX
    let y = e.clientY

    let offX = x-e.offsetX
    let offY = y-e.offsetY

    let letter = $(".letter")

    let pos = letter.position()

    let letX = offX-pos.left
    let letY = offY-pos.top

    let lett = document.querySelector(".letter")
    lett.style.transform = "translate3d("+letX+"px, "+letY+"px, 0)"
    lett.classList.add("archived")
    lett.classList.remove("letter")

    checkEnd()
    genNewLetter()
}

function genNewLetter() {
    let newLet = document.createElement("div")
    newLet.classList.add("letter")
    newLet.classList.add("box")

    let newH3 = document.createElement("h3")
    newH3.textContent=String.fromCharCode(65 + Math.floor(Math.random()*26))
    newLet.appendChild(newH3)

    template.appendChild(newLet)
}

document.querySelector(".skip").addEventListener("click", (e) => {
    if (skipNum < maxSkips) {
        document.querySelector(".letter").remove()
        genNewLetter()
        skipNum++
    }
    skipMenu.id = "turnedOn"
    let x = e.clientX
    let y = e.clientY

    let offX = x-e.offsetX
    let offY = y-e.offsetY-90

    skipText.textContent = `${skipNum}/${maxSkips}`

    skipMenu.style.left = offX+"px"
    skipMenu.style.top = offY+"px"
    setTimeout(() => {
        skipMenu.id = ""
    }, 1000)
})

document.querySelector(".retry").addEventListener("click", (e) => {
    document.querySelectorAll(".archived").forEach((let) => {
        let.remove()
    })
    document.querySelector(".letter").remove()
    genWordArray()
    genNewLetter()
    skipNum=0
})

document.querySelector(".play").addEventListener("click", (e)=> {
    if (maxSkips != -1) {
        startMenu.style.display = "none"
        pyramid.style.display = "block"
    }  
})

document.querySelectorAll(".difficultyOptions h3").forEach((elm) => {
    elm.addEventListener("click", (e) => {
        let prev = document.querySelector(".selected")
        if (prev) {prev.classList.remove("selected")}
        elm.classList.add("selected")

        maxSkips=elm.dataset.num
    })  
})

function genWords()
{
    const url = "https://jack-crowley.github.io/WordPyramid/Words/words.txt"
    fetch(url)
    .then( r => r.text() )
    .then( t => wordList = t.split("\n"))

}

function genWordArray() {
    for (let i = 0; i < 5; i++) {
        words.push([])
        for (let x = 0; x <= i; x++) {
            words[i].push("")
        }
    }
}

genWordArray();
createBoard()
genNewLetter()
genWords()