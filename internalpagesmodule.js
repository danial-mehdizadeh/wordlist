function fff(...properties){
    this.properties = properties
    let objectMaker = function(properties = this.properties) {
        objectMaker.permittedElements = ['input']
        return objectMaker
    }
    objectMaker.properties = this.properties
    objectMaker.build = function(){
        properties = this.properties
        let myObject = new Object()
        myObject.prototype.display = () => {console.log(myObject)}

        properties.forEach(builder => {
            builder.forEach(block => {
                try{
                    console.log(block)
                    if(this.permittedElements.includes(block[0]) && block[1].length < 150){
                        myObject[block[2]] = document.createElement(block[0])
                        let createdProperty = myObject[block[2]]
                        createdProperty.innerText = block[1]
                        try{
                            block[4]()
                        } catch(error) {}
                    }
                } catch(error){
                    throw error
                } 
            })
        })
        return myObject

    }
    return objectMaker(properties)
}
fff.prototype = {
    display(){
        console.log(hi)
    }
}
let fff1 = fff([['input','salam','hey'],['input','salam','salam']])
let [e1, e2, e3, e4] = [fff1.build(),fff1.build(),fff1.build(),fff1.build()]
console.log(fff,e1,e2,e3,e4)
e1.display().display()