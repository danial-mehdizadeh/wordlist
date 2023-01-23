let search = document.createElement('input')
let select = document.createElement('select')

// let info = document.createElement('p')
// info.id = "info"
// info.style.display = "none"
// info.innerText = "Please wait till search is completed"
document.body.append(search,select)

function movieDisplay(){
    makeEpisode(document.body)
}
`• All episodes must be shown 
• For each episode, AT LEAST following must be displayed: 
• the episode's name 
• the season number 
• the episode number 
• the episode's medium-sized image 
• the episode's summary text 
• You should combine season number and episode number into an episode code: 
• Each part should be zero-padded to two digits.
• Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be  
incorrect. 
Your page should state somewhere that the data has (originally) come from TVMaze.com, and link back  
to that site (or the specific episode on that site). See tvmaze.com/api#licensing.
`

function makeEpisode(parentElement,datas){
    let myOption = document.createElement('option')
    myOption.innerText = "all"

    myOption.selected === true
    select.append(myOption)

    function selectSearchFunc(datas){
        datas.forEach(
            data => {
                let myOption = document.createElement('option')
                myOption.innerText = data.name
                select.append(myOption)
            }
        )
        select.addEventListener("change",(event)=>{
            let article = document.getElementsByTagName('article');
            if(select.value === "all"){
                for (i = 0; i < article.length; i++) {
                    article[i].style.display = "block";
                }
            }else{
                for (i = 0; i < article.length; i++) {
                    // if(article[i].innerText.includes("name: Lügen"))
                    // {
                    //     article[i].parentElement.style.display = "none";
                    // } else{
                    //     article[i].parentElement.style.display = "none";
                    // }
                    // let reg = new RegExp(`${"name: " + select.value!==article[i][0].innerText}`,'i')
                    if(article[i].innerText.includes("name: " + select.value)){
                        article[i].style.display = "block"
                    } else{
                        article[i].style.display = "none"
                    }
                }

            }
                    // let elements = document.getElementsByTagName('article');

                    // for (i = 0; i < elements.length; i++) {
                    //     if("name: " + select.value!==article[0].innerText)
                    //     {article[i].parentElement.style.display = "none";}
                    // }

        
                
                // if(article.childElements()[0].innerText != ){
                //     article.style.display = 'none'
                // } else{
                //     article.style.display = 'block'
                // }
            
})

    }
    function liveSearchInput(){
        search.addEventListener('keydown',(event) =>  {
            if(true){
                let div = document.getElementsByTagName('article')

                for(article of div){
                    let reg = new RegExp(`${search.value.toLowerCase()}`,'i')
                    if(reg.test(article.innerText)){
                        article.style.display = "block"
                    } else{
                        article.style.display = "none"
                    }
                }

                    }
            
        }
)
    
    }
    for(let i = 0; i < datas.length;i++)
        {
            let [div,name,season,number,image,summary,code] = [
                document.createElement('article'),
                document.createElement('h3'),
                document.createElement('strong'),
                document.createElement('strong'),
                document.createElement('img'),
                document.createElement('p'),
                document.createElement('p'),
                document.createElement('p'),
            ]
            let items = [["div",div],["name",name],["number",number],["season",season],["image",image,[true,"src"]],["summary",summary],["code",code,[true,"code"]]]
            let itemsFieldName = {
                keys : [2,3,6],
                values : ["episode number","season","code number"]

            }
            for(let j = 1; j < items.length; j++){
                try{
                    if(items[j][2][1] === "src"){
                        items[j][1].src = datas[i][items[j][0]]["medium"]
                        items[0][1].append(items[j][1])
                    } else if(items[j][2][1] === "code"){
                        let text = {
                            e : datas[i]['number'],
                            s: datas[i]['season']
                        }
                        if(text.e.toString.length===1){
                            text.e = '0' + text.e
                        }
                        if(text.s.toString.length===1){
                            text.s = '0' + text.s
                        }
                        let tag = null
                        if(itemsFieldName.keys.includes(j)){
                            tag = itemsFieldName.values[itemsFieldName.keys.indexOf(j)]
                        } else{
                            tag = items[j][0]
                        }

                        items[j][1].innerHTML = tag + ": E" + text.e + "S" + text.s
                        items[0][1].append(items[j][1])

                    }
                } catch(error){
                    let text = datas[i][items[j][0]]
                    if(text!== undefined){
                        let tag = null
                        if(itemsFieldName.keys.includes(j)){
                            tag = itemsFieldName.values[itemsFieldName.keys.indexOf(j)]
                        } else{
                            tag = items[j][0]
                        }
                        items[j][1].innerHTML = tag + ": " + text + '\n'
                        items[0][1].append(items[j][1])

                    }
                }
                    // item[1].innerText = text
                    // div.append(items[1])
                // }
            }
            parentElement.append(items[0][1])
        }    
    // div.append(name,number,image,summary,code)
    liveSearchInput(document.body)
    selectSearchFunc(datas)
}
const episodeReq = async () => {
        //   const res = await fetch("https://api.tvmaze.com/shows/22036/episodes");
          const res = await fetch("/api.js");

          const data = await res.json();
        //   console.log(res,data)
        // console.log(document.body)
            makeEpisode(document.body,data)
          // console.log(data);
}
episodeReq()