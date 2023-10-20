
const API_URL="https://newsapi.org/v2/everything?q=";
const API_KEY="c86dd01eb1264764a0b7b25a139f54e9";


const btn=document.getElementById("search-button");
const inputSearch=document.getElementById("search-text");
btn.addEventListener("click",()=>searchTopic(inputSearch.value));
 window.addEventListener("load",()=>newsFetch("cricket"));
async function newsFetch(subject){
    // try {
    //     const pr= await fetch(`${API_URL}${subject}&apiKey=${API_KEY}`);
    //     const obj= await pr.json();
    //    console.log(obj);
    // } catch (error) {
    //     console.log(error);
    // }
    const obj= await fetch(`${API_URL}${subject}&apiKey=${API_KEY}`).then(res=>res.json()).then((data)=>{return data}).catch(error=>console.log(error));
    console.log(obj);
    bind(obj.articles);
    
}
function bind(articles){
    const container=document.getElementById("cards-container");
    const template=document.getElementById("template-news-card");
    container.innerHTML=""
    articles.map((article) => {
    if(!article.urlToImage) return;
    else{
     const newTemplateClone=template.content.cloneNode(true);
     putData(newTemplateClone,article);
     container.appendChild(newTemplateClone);
    }


   });

}


function putData(newTemplateClone,article){
    const newsImg = newTemplateClone.querySelector("#news-img");
    const newsTitle = newTemplateClone.querySelector("#news-title");
    const newsSource = newTemplateClone.querySelector("#news-source");
    const newsDesc = newTemplateClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name}  ${date}`;
    newTemplateClone.firstElementChild.addEventListener("click",()=>{
          window.open(article.url,"_self");
    })
    
    }
     
    function searchTopic(topic){
    // try {
    //   newsFetch(topic);
    // } catch (error) {
    //     const container=document.getElementById("cards-container");
    //     const heading = document.createElement("h2");
    //     heading.innerHTML='no data found!';
    //     container.appendChild(heading);
    //     console.log(error);
    // }
       
    newsFetch(topic).catch((error)=>{
        const container=document.getElementById("cards-container");
        const heading = document.createElement("h2");
        heading.innerHTML='no data found!';
        container.appendChild(heading);
        container.style.textAlign='center';
        console.log(error);
    })
      
    }


    function onNavItemClick(navlink){newsFetch(navlink);}
        
    