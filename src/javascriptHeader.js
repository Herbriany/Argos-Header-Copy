// L2/L3 nav code

const headerPromise = new Promise((resolve, reject) => {
    const xhrHeader = new XMLHttpRequest();
    xhrHeader.open("GET", "./json/meganav.json");
    xhrHeader.responseType = "json";
    xhrHeader.onload = () => {
        resolve(xhrHeader.response);
    };
    xhrHeader.send();
})

const shop_button = document.getElementById("shop-arrow-container");
const nav_container = document.getElementById("left-cta-bottom-header-box")
const red_underline = document.getElementsByClassName("red-underline-on-hover")[0]
const mega_nav = document.getElementById("gridIdentifier");

headerPromise.then((message) => {
    shop_button.addEventListener("mouseenter", () => {

        const mega_nav_column_1 = mega_nav.children[0].children[0]
        document.children[0].children[1].style.overflowX = "hidden";

        if (window.innerWidth >= 992) {

            document.children[0].children[1].style.overflowY = "hidden";

            if (mega_nav_column_1.childElementCount === 0) {

                message.body.data.forEach(element => {

                    let list_object = document.createElement("li");
                    list_object.id = `${element.title}`;
                    list_object.classList.add("list-object");
                    list_object.innerHTML = `
                    <a href="${element.link}"
                            <span>${element.title}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="1em" height="1em" "><path d="M14.69 12l-6.97 6.97a.75.75 0 0 0 1.06 1.06l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 1.06L14.69 12z"></path></svg>
                    </a>`;
                    mega_nav_column_1.appendChild(list_object);

                    list_object.addEventListener("mouseenter", () => {

                        if (mega_nav.childElementCount > 1){
                            while(mega_nav.childElementCount > 1) {
                                mega_nav.removeChild(mega_nav.lastChild)
                            }
                        }

                        message.body.data.forEach(element => {

                            if (element.title == list_object.id) {

                                // set grid to 6 * 16% and width 100%/96%
                                
                                let div_object = document.createElement("div");
                                mega_nav.appendChild(div_object);

                                // add title and column2 grid div
                                let title_object = document.createElement("h1");
                                title_object.classList.add("red-on-hover")
                                title_object.innerHTML = `<a href=${element.link}> Shop all ${element.title} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="1em" height="1em" style="vertical-align:bottom"><path d="M14.69 12l-6.97 6.97a.75.75 0 0 0 1.06 1.06l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 1.06L14.69 12z"></path></svg></a>`;
                                mega_nav.children[1].appendChild(title_object);

                                let column_2_object = document.createElement("div");
                                column_2_object.setAttribute("id", "column-2");
                                mega_nav.children[1].appendChild(column_2_object);

                                element.columns.forEach(element => {

                                    //add otherColumn outer list
                                    let other_column_object = document.createElement("ul");
                                    other_column_object.classList.add("other-column");
                                    mega_nav.children[1].children[1].appendChild(other_column_object);

                                    element.forEach(element => {

                                        //add header title
                                        let header_object = document.createElement("h3");
                                        header_object.innerHTML = element.title;
                                        mega_nav.children[1].children[1].lastChild.appendChild(header_object);
                                        
                                        //add inner list
                                        let inner_list_object = document.createElement("ul");
                                        mega_nav.children[1].children[1].lastChild.appendChild(inner_list_object);

                                        element.links.forEach(element => {
                                            
                                            //add inner list list elements
                                            let inner_list_item_object = document.createElement("li");
                                            inner_list_item_object.innerHTML = `<a href="${element.link}" class="underline-on-hover" >${element.title}</a>`
                                            mega_nav.children[1].children[1].lastChild.lastChild.appendChild(inner_list_item_object);

                                        })
                                    })
                                })
                            }
                        })
                    });
                    
                });
            }
        }

        if (window.innerWidth >= 768 && window.innerWidth < 992) {
            
            document.children[0].children[1].style.overflowY = "visible";

            mega_nav.children[0].style.transition = "transform 0.4s ease-in-out";

            message.body.data.forEach(element => {
                
                // list one sections
                let list_object = document.createElement("li");
                list_object.id = `${element.title}`;
                list_object.classList.add("smaller-device-list-object");
                list_object.innerHTML = `
                <a href="#">
                        <span>${element.title}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="1em" height="1em" "><path d="M14.69 12l-6.97 6.97a.75.75 0 0 0 1.06 1.06l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 1.06L14.69 12z"></path></svg>
                </a>`;
                mega_nav_column_1.appendChild(list_object);

                list_object.addEventListener("click", event => {

                    // list two ul
                    let unordered_list_object = document.createElement("ul");
                    unordered_list_object.setAttribute( "id", "second_list");
                    mega_nav.children[0].appendChild(unordered_list_object);

                    // list two return button
                    let list_return_object = document.createElement("li");
                    list_return_object.classList.add("list-return-button");
                    list_return_object.innerHTML = `<a href=#> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="1em" height="1em" class="_27BT6"><path d="M9.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 0 0 1.06-1.06L9.31 12z"></path></svg>
                        <strong>${element.title}</strong> </a>`;
                    list_return_object.addEventListener("click", () => {

                        // slide to list one
                        mega_nav.children[0].style.transform = "translateX(0)";

                        // delete list two
                        setTimeout(() => {mega_nav.children[0].removeChild(mega_nav.children[0].children[1]);}, 300)
                        

                    })
                    mega_nav.children[0].children[1].appendChild(list_return_object);
                    
                    // list two shop all
                    let list_shop_all_object = document.createElement("li");
                    list_shop_all_object.classList.add("smaller-device-list-object");
                    list_shop_all_object.innerHTML = `<a href=${element.link}> Shop all ${element.title} </a>`;
                    mega_nav.children[0].children[1].appendChild(list_shop_all_object);
                    
                    // navigating to list two sections in data
                    message.body.data.forEach(element => {

                        if (element.title == list_object.id) {

                            element.columns.forEach(element => {

                                element.forEach(element =>{
                                

                                // list two sections 
                                let list_object = document.createElement("li");
                                list_object.id = `${element.title}`;
                                list_object.classList.add("smaller-device-list-object");
                                list_object.innerHTML = `
                                <a href="#">
                                        <span>${element.title}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="1em" height="1em" "><path d="M14.69 12l-6.97 6.97a.75.75 0 0 0 1.06 1.06l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 1.06L14.69 12z"></path></svg>
                                </a>`;
                                mega_nav.children[0].children[1].appendChild(list_object)
                                
                                
                                mega_nav.children[0].style.transform = "translateX(-101vw)";

                                list_object.addEventListener("click", () => {
                                    
                                    // list three ul
                                    let unordered_list_object = document.createElement("ul");
                                    unordered_list_object.setAttribute( "id", "third_list")
                                    mega_nav.children[0].appendChild(unordered_list_object);
                                    
                                    // list three return button
                                    let list_return_object = document.createElement("li");
                                    list_return_object.classList.add("list-return-button");
                                    list_return_object.innerHTML = `<a href=#> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="1em" height="1em" class="_27BT6"><path d="M9.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 0 0 1.06-1.06L9.31 12z"></path></svg>
                                        <strong>${element.title}</strong> </a>`;
                                    list_return_object.addEventListener("click", () => {

                                        //slide to list two
                                        mega_nav.children[0].style.transform = "translateX(-101vw)";

                                        //delete list three
                                        setTimeout( () => {
                                            mega_nav.children[0].removeChild(mega_nav.children[0].children[2]);
                                        }, 300);
                                        

                                    })
                                    mega_nav.children[0].children[2].appendChild(list_return_object);

                                    // list three sections
                                    element.links.forEach(element => {
                                        let list_object = document.createElement("li");
                                        list_object.id = `${element.title}`;
                                        list_object.classList.add("smaller-device-list-object");
                                        list_object.innerHTML = `
                                        <a href="${element.link}">
                                                <span>${element.title}</span>
                                        </a>`;
                                        mega_nav.children[0].children[2].appendChild(list_object)
                                        })

                                        // slide to list three
                                        mega_nav.children[0].style.transform = "translateX(-200vw)";
                                    })                                    
                                })
                            })
                        }
                    })

                })
            })
        }

        nav_container.addEventListener("mouseleave", () => {

            console.log(mega_nav_column_1)
            console.log(mega_nav)
            //removing column1
            while(mega_nav_column_1.firstChild) {
                mega_nav_column_1.removeChild(mega_nav_column_1.lastChild)
            }
            
            // //removing column2
            if (mega_nav.childElementCount > 1){
                while(mega_nav.childElementCount > 1) {
                    mega_nav.removeChild(mega_nav.lastChild)
                }
                
            }

            if (mega_nav.children[0].childElementCount > 1){
                while(mega_nav.children[0].childElementCount > 1) {
                    mega_nav.children[0].removeChild(mega_nav.children[0].lastChild)
                }
                
            }

            document.children[0].children[1].style.overflowY = "visible";

            mega_nav.children[0].style.transition = "transform 0s ease-in-out"
            mega_nav.children[0].style.transform = "translateX(0)";
            
        })
    })
})






// Search bar code
const search_bar_form = document.getElementsByName("top search bar")[0]
const svg_b = document.getElementById("cancel-search-button")

search_bar_form.addEventListener("keydown", (event) =>  {
    if ((event.which >= 48 && event.which <= 57) || (event.which >= 65 && event.which <= 90) || (event.which == 32)) {
        svg_b.style.visibility = "visible"
        svg_b.children[0].style.display = "block"
        search_bar_form.style.color = "#333"
        search_bar_form.style.fontStyle = "normal"
    }
    else if (((event.key == "Backspace") && (search_bar_form.value.length == 0)) || ((search_bar_form.value.length == 1) && (event.key == "Backspace"))){
        svg_b.style.visibility = "hidden"
        svg_b.children[0].style.display = "none"
        search_bar_form.style.color = "initial"
        search_bar_form.style.fontStyle = "italic"
    }
})

search_bar_form.addEventListener("mouseover", () => {
    svg_b.style.backgroundColor = "#F5F5F5"

    search_bar_form.addEventListener("mouseout", () => {
        svg_b.style.backgroundColor = "initial"
    })

    svg_b.addEventListener("mouseover", () =>  {

        svg_b.children[0].children[0].setAttribute('d', "M10.94 12l-3.22 3.22a.75.75 0 0 0 1.06 1.06L12 13.06l3.22 3.22a.75.75 0 0 0 1.06-1.06L13.06 12l3.22-3.22a.75.75 0 0 0-1.06-1.06L12 10.94 8.78 7.72a.75.75 0 0 0-1.06 1.06L10.94 12zM12 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z")

        svg_b.addEventListener("mouseout", () =>  {
            svg_b.children[0].children[0].setAttribute('d', "M10.94 12L7.72 8.78a.75.75 0 0 1 1.06-1.06L12 10.94l3.22-3.22a.75.75 0 0 1 1.06 1.06L13.06 12l3.22 3.22a.75.75 0 0 1-1.06 1.06L12 13.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L10.94 12zM12 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm0-1.5a9 9 0 1 0 0-18 9 9 0 0 0 0 18z")
        })

        svg_b.addEventListener("click", () => {
            search_bar_form.value = ""
            svg_b.style.visibility = "hidden"
            svg_b.children[0].style.display = "none"
            search_bar_form.style.color = "initial"
            search_bar_form.style.fontStyle = "italic"
        })  
    })
})  

