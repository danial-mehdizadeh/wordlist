// async in action
// console.log('baba')
// console.log('baba harmanem')
// setTimeout(()=>{
//     console.log('الا ای آهوی وحشی کجایی')
// },2000)
// console.log('baba narmanem baba ')

/////////////////////////// http request
// let getToDos = (resource, callback) =>{
//     const request = new XMLHttpRequest();
//     request.addEventListener('readystatechange',()=>{
//         if(request.readyState=== 4 && request.status === 200){
//             const todos = JSON.parse(request.responseText)
//             callback(undefined,todos)
//         }else if(request.readyState=== 4){
//             callback('Something Went Wrong',undefined)
//         }

//         // console.log(request.readyState)
//     })
//     request.open('GET',resource)
//     request.send()
// }
// let callback = (err,todos) => {

//     if(err){
//         const post = document.createElement('div')
//         const title = document.createElement('h1')
//         title.innerText = 'Something Went Wrong'
//         const description = document.createElement('p')
//         description.innerText = 'Refresh this page or try to contact with system administrator'
//         post.append(title, description)
//         document.body.appendChild(post)

//     } else{
//         console.log(todos)
//         for(const todo of todos){
//             const post = document.createElement('article')
//             const title = document.createElement('h3')
//             title.innerText = todo.title
//             const id = document.createElement('h4')
//             id.innerText = todo.id
//             post.append(id, title)
//             document.body.appendChild(post)
//         }

//     } 

// }
// // getToDos('https://jsonplaceholder.typicode.com/todoss/',callback)
// getToDos('https://jsonplaceholder.typicode.com/todos/',callback)
// getToDos('json/hollymolly.json',callback)
// getToDos('https://jsonplaceholder.typicode.com/todoss/',callback)
// getToDos('https://jsonplaceholder.typicode.com/todoss/',callback)
// for some reasons, error will appear only when all requests are failed and multiple error divisions will be injected, otherwise, the sucsessful requests will be shown.
// it will be work after being nested callback functions forming a callback hell

// https://jsonplaceholder.typicode.com/todos/
// 
// request.readyState=== 4

/////////////////////////// promise example
// let x = '12';
// const someDummyFunction = () => {
//     return new Promise((resolve,reject)=>{
//         if(x==='12'){
//             resolve('some data')
//         } else{
//             reject('failure happened')
//         }
//     }
//     )
// }
// // someDummyFunction().then((data)=>{
// //     console.log(data)
// // }), (err) => {
// //     console.log(err)
// // }
// someDummyFunction().then((data)=>{
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })





///////////////////////////rebuilt in promise

let getToDos = (resource, callback) =>{
    return new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange',()=>{
            if(request.readyState=== 4 && request.status === 200){
                const todos = JSON.parse(request.responseText)
                resolve(todos)
            }else if(request.readyState=== 4){
                reject('Something Went Wrong')
            }
    
            // console.log(request.readyState)
        })
        request.open('GET',resource)
        request.send()
    
    })
}
let callback = (err,todos) => {

    if(err){
        const post = document.createElement('div')
        const title = document.createElement('h1')
        title.innerText = 'Something Went Wrong'
        const description = document.createElement('p')
        description.innerText = 'Refresh this page or try to contact with system administrator'
        post.append(title, description)
        document.body.appendChild(post)

    } else{
        console.log(todos)
        for(const todo of todos){
            const post = document.createElement('article')
            const title = document.createElement('h3')
            title.innerText = todo.title
            const id = document.createElement('h4')
            id.innerText = todo.id
            post.append(id, title)
            document.body.appendChild(post)
        }

    } 

}
// getToDos('https://jsonplaceholder.typicode.com/todoss/',callback)
getToDos("https://jsonplaceholder.typicode.com/todos").then((data)=>{
    callback(undefined,data)
    return getToDos("json/hollymolly.json")
}).then((data)=>{
    callback(undefined,data)
    return getToDos("json/digikala.json")
}).then((data)=>{
    callback(undefined,data)
    return getToDos("json/dansite.json")
}).then((data)=>{
    callback(undefined,data)}).catch((err)=> {
    callback(err,undefined)
})