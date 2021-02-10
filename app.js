const previewShape = document.querySelector("#preview-shape"),
  previewContainer = document.querySelector(".preview-container"),
  controllers = Array.from(document.querySelectorAll(".controllers input[type=range]")),
  widthController = document.querySelector("#width"),
  heightController = document.querySelector("#height"),
  linkController = document.querySelector("#link-dimension-controller"),
  linkElem = document.querySelector("#link-dimension"),
  resultPreview = document.querySelector("#result")

let widthShape = getComputedStyle(previewShape).width.replace("px", ""),
  heightShape = getComputedStyle(previewShape).height.replace("px", ""),
  topRadius, rightRadius, bottomRadius, leftRadius,
  linkContraints = true


// Function helpers
function getRandomNumber(min, max) {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

function setValueOf(inputElem, value) {
  inputElem.value = value
}

function setDimensionOf(elem, width, height) {
  elem.style.width = `${width}px`
  elem.style.height = `${height}px`
}

function setControllers() {
  controllers.forEach(controller => {
    setValueOf(controller, getRandomNumber(0, 100))
  })
}

function updateResult(style) {
  resultPreview.innerText = `border-radius: ${style};`
}

function updateUI() {
  let style = "top top bottom bottom / left right right left"

  controllers.forEach(controller => {
    let b = 100 - controller.value
    let a = 100 - b

    a = a == 0 ? "0%" : a + "%"
    b = b == 0 ? "0%" : b + "%"

    if (controller.classList.contains("top")) {
      style = style.replace("top", a)
      style = style.replace("top", b)
    } else if (controller.classList.contains("right")) {
      style = style.replace("right", a)
      style = style.replace("right", b)
    } else if (controller.classList.contains("bottom")) {
      style = style.replace("bottom", a)
      style = style.replace("bottom", b)
    } else if (controller.classList.contains("left")) {
      style = style.replace("left", a)
      style = style.replace("left", b)
    }
  })

  previewShape.style.borderRadius = style
  updateResult(style)
}


let animationID = 0,
  IsTheFirstTime = true

function animate() {
  if (IsTheFirstTime) {
    setControllers()
    setValueOf(widthController, widthShape)
    setValueOf(heightController, heightShape)
    setValueOf(linkController, "on")
    linkElem.classList.add("active")
  }

  setDimensionOf(previewContainer, widthShape, heightShape)
  updateUI()
  IsTheFirstTime = false
  animationID = requestAnimationFrame(animate)
}


// Handlers
widthController.addEventListener("change", e => {
  widthShape = widthController.value

  if (linkContraints) {
    heightShape = widthShape
    heightController.value = heightShape
  }
})

heightController.addEventListener("change", e => {
  heightShape = heightController.value

  if (linkContraints) {
    widthShape = heightShape
    widthController.value = widthShape
  }
})

linkElem.addEventListener("click", e => {
  linkController.click()
})

linkController.addEventListener("change", e => {
  linkContraints = linkController.checked
  linkElem.classList.toggle("active")
})

animate()