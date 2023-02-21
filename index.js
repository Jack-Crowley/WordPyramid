const pyramid = document.querySelector(".pyramid")
const btns = document.querySelector(".btns")
const template = document.querySelector(".template")
let skipNum = 0;

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

function createBoard() {
    for (let i = 1; i < 6; i++) {
        let row = document.createElement("div")
        row.classList.add("row")
        for (let x = 0; x < i; x++) {
            let box = document.createElement("div")
            box.classList.add("box")
            box.classList.add("standingBox")
            box.addEventListener("click", moveBox)
            row.appendChild(box)
        }
        pyramid.insertBefore(row,btns)
    }
}

createBoard()

function moveBox(e) {
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
    if (skipNum++ < 9) {
        document.querySelector(".letter").remove()
        genNewLetter()
    }
})

document.querySelector(".retry").addEventListener("click", (elm) => {
    document.querySelectorAll(".archived").forEach((let) => {
        let.remove()
    })
    document.querySelector(".letter").remove()
    genNewLetter()
})