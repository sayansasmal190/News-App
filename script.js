const API_KEY = "3f3dd8a5db4b4d86bd197d8644006a51";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load' , ()=> fetchNews("India"));    //India's news is the homepage topic      //when window is in load or loading  or load event is called,  we got to fetch the news on ,suppose, India


function reload() {           //reload function is called when we click on logo

        window.location.reload();  //when logo is being clicked then whole page reloads and comes back to initial homepage , i.e , India news




}




//lets create function to fetch news ,  we gave it name , fetchNews
async function fetchNews (query) {                              //whatever query we give this function will bring back ,that query ,related news

                
                const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);                //we have fetch library to show news   //this fetch is actually an asynchronous operation which takes time to showcase news coz news is kept under a news API server which takes time to come  ,therefore,  promise will be returned at first , for which we need to await or wait till we get data

               const data = await res.json();     //After that , data got which we convert it into json(javascript object notation) format ,  which  also come into form of promise thats why again we have to await or wait
                  
              console.log(data);  // --->        //o/p at console screen----> {status: 'ok', totalResults: 44948, articles: Array(100)}    // this data comes in the form of articles, which has array inside it

              
                bindData(data.articles);    //have to bind so many data together with the help of bind data function


            }





            //WE ARE GOING TO TAKE THE DATA INSIDE template tag AND THEN CLONE THE DATAS AND PUT THEM INSIDE cards-container OF <main>
            function bindData(articles) {    //bind data function         
 
                   const cardsContainer =  document.getElementById("cards-container");

                   const newsCardTemplate = document.getElementById("template-news-card");

                   cardsContainer.innerHTML = "";      //it is set as empty to avoid congestion of cards coz of multiple API calling (suppose API IS CALLED at first after opening this website , then news cards or news will be seen depending on ur API calling. Then again for the 2nd time API CALLING is done then if not innerHTML is set as empty then under the previously called news cards the currently called news cards of 2nd API call will be inputed , which will look bad)

                   articles.forEach((article) => {    //for loop is initiated ------- for each article cloneing will be initiated inside template tag and then cloned datas or articles will be transfered to cards-container OF <main>

                        if(!article.urlToImage) return;                    //suppose any news url,which doesn't contain image,will be rejected


                        const cardClone = newsCardTemplate.content.cloneNode(true);     //deep cloning is done by using cloneNode function in the template tag region
                        

                        fillDataInCard(cardClone,article); // before clone are putted inside cards- container of <main> ,  the clones are filled with relevant data(article)




                        cardsContainer.appendChild(cardClone);                    //cloned card are then putted into cards-container of <main>
                    
                   });
            }







            //CLONE CARDS WERE EMPTY SO WE NEED TO FILL IT WITH RELEVANT NEWS DATA:-

            function fillDataInCard(cardClone,article){
                
                       //all cloned CARD will be filled with data like:-
                    const newsImg = cardClone.querySelector('#news-img');
                    const newsTitle = cardClone.querySelector('#news-title');
                    const newsSource = cardClone.querySelector('#news-source');
                    const newsDesc = cardClone.querySelector('#news-desc');

                    const date = new Date(article.publishedAt).toLocaleString("en-US" , {                      //to show the date of publishing.
                        timeZone: "Asia/Jakarta"                         //en-US means we convert the date to normal english date which was     in like --> publishedAt: "2023-07-14T09:12:45Z" format on the API response on Console screen

                           });



                    //VISIT THE CONSOLE SCREEN ONCE TO SEE ALL THE urlToImage , title ,  description ,publishedAt , etc PRESENT

                    newsImg.src= article.urlToImage;     //we need to put source inside newsImg and the source is the article which has urlToImage inside it
                    newsTitle.innerHTML = article.title;            // urlToImage , title ,  description all have been taken from the articles from console screen.There are 100 articles on the console screen and each article's urlToImage , title and description is being filled inside each cloned card 
                    newsSource.innerHTML = `${article.source.name} · ${date} `;        // ${article.source.name}---> under article we have source and under source we have the name of company who is publishing the news
                    //press "windowkey + ." to open emojis to give · , which u can give inside code

                    newsDesc.innerHTML = article.description;   
                    
                          
                
                    //VISIT THE CONSOLE SCREEN ONCE TO SEE ALL THE urlToImage , title ,  description ,publishedAt , etc PRESENT



             //       const date = new Date(article.publishedAt).toLocaleString("en-US" , {                      //to show the date of publishing.
        //                timeZone: "Asia/Jakarta"                         //en-US means we convert the date to normal english date which was     in like --> publishedAt: "2023-07-14T09:12:45Z" format on the API response on Console screen

     //                      });

                                                           
                                                                              
            //        newsSource.innerHTML = `${article.source.name} · ${date} `;       





            //CLICKING CARDS AND REDIRECTING TO MAIN WEBSITE:-

            cardClone.firstElementChild.addEventListener('click' , () => {                          //whenever we click on any news card then a new tab is opened where we are redirected to the source url website , from where the news was taken & shown on the card
                window.open(article.url, "_blank");              //window will open to a new tab to the main website whose url is present inside article      //blank means taking to a new tab
            });
                
     }







       //CLICKING ON ITEM OF NAVIGATION BAR AND SHOWING IT IS BEING SELECTED & IT IS 'active' :-


    let curSelectedNav =  null;
     function onNavItemClick(id) {                         //here id is behaving like an id and search query too


          fetchNews(id);           //fetchNews function is called which is present at top of the code //on calling fetchNews function not only it fetches data(news) but also binds them together  //here id is behaving like an id and search query too
          const navItem = document.getElementById(id);   ///here id is ipl , finance , politics whatever we use 
          curSelectedNav?.classList.remove('active');   // if u click on new nav item then remove active class from old nav item    ...OR....// if current Selected Nav is not null then remove active class from classlist or previous nav
          curSelectedNav = navItem; //current selected item becomes current nav item
          curSelectedNav.classList.add('active');  //the new nav item becomes active

     }

     const searchButton  = document.getElementById('search-button');
     const searchText = document.getElementById('search-text'); 

     searchButton.addEventListener('click' , () =>{    
         // when we click on search button then these will happen:-   
            const query = searchText.value;             //we will extract query from inputted text(search text) which we have given
            if(!query) return;                            // if user havn't written anything in the search box then also hiting the search button then nothing will be return
            fetchNews(query);                //else if user really hits the search button after writing something(query)in the search box then fetchNews function will be called and desired news will be shown

            





            //suppose u have already selected IPL nav & u are in the IPL news page... and then u search something in the search box for which u get the related news but inspite of that the IPL nav still shows it is being selected(being in that --accent-color) .....THUS TO AVOID THIS PROBLEM WE WRITE THIS CODE:-

            curSelectedNav?.classList.remove('active');  //IF CURRENT SELECTED NAV IS NOT NULL or IS OPEN  , THEN REMOVE IT'S ACTIVENESS COZ WE HAVE SEARCHED SOMETHING FROM THE SEARCH BOX
            curSelectedNav = null;   //AFTER REMOVING ACTIVENESS MAKE THE CURRENT NAV AS NULL
     });




            

