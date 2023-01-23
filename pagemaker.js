
let controllerElementsForm = document.createElement('form')
let controllerElements = {}
let pagemaker = function(...pageNameArr){
    pageNameArr.forEach(
        name => {
            let element = document.createElement('input')
            element.type = 'checkbox'
            element.value = name
            controllerElements[name] = element
        }
    )
    for (element in controllerElements){
        controllerElementsForm.element(element)
    }
}
pagemaker('about','contact','home')
console.log(controllerElements)