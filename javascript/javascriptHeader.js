"use strict";

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

// L2/L3 nav code

var headerPromise = new _Promise(function (resolve, reject) {
    var xhrHeader = new XMLHttpRequest();
    xhrHeader.open("GET", "./json/meganav.json");
    xhrHeader.responseType = "json";
    xhrHeader.onload = function () {
        resolve(xhrHeader.response);
    };
    xhrHeader.send();
});

var shopButton = document.getElementById("shop-arrow-container");
var navContainer = document.getElementById("left-cta-bottom-header-box");
var redUnderline = document.getElementsByClassName("red-underline-on-hover")[0];
var megaNav = document.getElementById("gridIdentifier");

headerPromise.then(function (message) {
    shopButton.addEventListener("mouseenter", function () {

        var megaNavColumn1 = megaNav.children[0].children[0];
        document.children[0].children[1].style.overflowX = "hidden";

        if (window.innerWidth >= 992) {

            document.children[0].children[1].style.overflowY = "hidden";

            if (megaNavColumn1.childElementCount === 0) {

                message.body.data.forEach(function (element) {

                    var listObject = document.createElement("li");
                    listObject.id = "" + element.title;
                    listObject.classList.add("list-object");
                    listObject.innerHTML = "\n                    <a href=\"" + element.link + "\"\n                            <span>" + element.title + "</span>\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"#333\" width=\"1em\" height=\"1em\" \"><path d=\"M14.69 12l-6.97 6.97a.75.75 0 0 0 1.06 1.06l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 1.06L14.69 12z\"></path></svg>\n                    </a>";
                    megaNavColumn1.appendChild(listObject);

                    listObject.addEventListener("mouseenter", function () {
                        if (megaNav.childElementCount > 0) {
                            while (megaNav.firstChild) {
                                megaNav.removeChild(megaNav.lastChild);
                            }
                        }

                        message.body.data.forEach(function (element) {

                            if (element.title == listObject.id) {

                                // set grid to 6 * 16% and width 100%/96%

                                megaNav.appendChild(document.createElement("div"));

                                // add title and column2 grid div
                                var titleObject = document.createElement("h1");
                                titleObject.classList.add("red-on-hover");
                                titleObject.innerHTML = "<a href=" + element.link + "> Shop all " + element.title + " <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"#333\" width=\"1em\" height=\"1em\" style=\"vertical-align:bottom\"><path d=\"M14.69 12l-6.97 6.97a.75.75 0 0 0 1.06 1.06l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 1.06L14.69 12z\"></path></svg></a>";
                                megaNav.children[1].appendChild(titleObject);

                                var column2Object = document.createElement("div");
                                column2Object.setAttribute("id", "column2");
                                megaNav.children[1].appendChild(column2Object);

                                element.columns.forEach(function (element) {

                                    //add otherColumn outer list
                                    var otherColumnObject = document.createElement("ul");
                                    otherColumnObject.classList.add("otherColumn");
                                    megaNav.children[1].children[1].appendChild(otherColumnObject);

                                    element.forEach(function (element) {

                                        //add header title
                                        var headerObject = document.createElement("h3");
                                        headerObject.innerHTML = element.title;
                                        megaNav.children[1].children[1].lastChild.appendChild(headerObject);

                                        //add inner list
                                        var innerListObject = document.createElement("ul");
                                        megaNav.children[1].children[1].lastChild.appendChild(innerListObject);

                                        element.links.forEach(function (element) {

                                            //add inner list list elements
                                            var innerListItemObject = document.createElement("li");
                                            innerListItemObject.innerHTML = "<a href=\"" + element.link + "\" class=\"underline-on-hover\" >" + element.title + "</a>";
                                            megaNav.children[1].children[1].lastChild.lastChild.appendChild(innerListItemObject);
                                        });
                                    });
                                });
                            }
                        });
                    });
                });
                console.log(megaNav);
            }
        }
        if (window.innerWidth >= 768 && window.innerWidth < 992) {

            document.children[0].children[1].style.overflowY = "visible";

            message.body.data.forEach(function (element) {

                var listObject = document.createElement("li");
                listObject.id = "" + element.title;
                listObject.classList.add("smaller-device-list-object");
                listObject.innerHTML = "\n                <a href=\"#\">\n                        <span>" + element.title + "</span>\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"#333\" width=\"1em\" height=\"1em\" \"><path d=\"M14.69 12l-6.97 6.97a.75.75 0 0 0 1.06 1.06l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 1.06L14.69 12z\"></path></svg>\n                </a>";
                megaNavColumn1.appendChild(listObject);
                console.log(megaNavColumn1);
                listObject.addEventListener("click", function () {
                    var unorderedListObject = document.createElement("ul");
                    megaNav.appendChild(unorderedListObject);
                });
            });
        }

        navContainer.addEventListener("mouseleave", function () {

            //removing column1
            while (megaNavColumn1.firstChild) {
                megaNavColumn1.removeChild(megaNavColumn1.lastChild);
            }

            //removing column2
            if (megaNav.children[1].childElementCount > 0) {
                while (megaNav.children[1].firstChild) {
                    megaNav.children[1].removeChild(megaNav.children[1].lastChild);
                }
            }

            document.children[0].children[1].style.overflowY = "visible";
        });
    });
});

// Search bar code
var search_bar_form = document.getElementsByName("top search bar")[0];
var svg_b = document.getElementById("cancel-search-button");

search_bar_form.addEventListener("keydown", function (event) {
    if (event.which >= 48 && event.which <= 57 || event.which >= 65 && event.which <= 90 || event.which == 32) {
        svg_b.style.visibility = "visible";
        svg_b.children[0].style.display = "block";
        search_bar_form.style.color = "#333";
        search_bar_form.style.fontStyle = "normal";
    } else if (event.key == "Backspace" && search_bar_form.value.length == 0 || search_bar_form.value.length == 1 && event.key == "Backspace") {
        svg_b.style.visibility = "hidden";
        svg_b.children[0].style.display = "none";
        search_bar_form.style.color = "initial";
        search_bar_form.style.fontStyle = "italic";
    }
});

search_bar_form.addEventListener("mouseover", function () {
    svg_b.style.backgroundColor = "#F5F5F5";

    search_bar_form.addEventListener("mouseout", function () {
        svg_b.style.backgroundColor = "initial";
    });

    svg_b.addEventListener("mouseover", function () {

        svg_b.children[0].children[0].setAttribute('d', "M10.94 12l-3.22 3.22a.75.75 0 0 0 1.06 1.06L12 13.06l3.22 3.22a.75.75 0 0 0 1.06-1.06L13.06 12l3.22-3.22a.75.75 0 0 0-1.06-1.06L12 10.94 8.78 7.72a.75.75 0 0 0-1.06 1.06L10.94 12zM12 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z");

        svg_b.addEventListener("mouseout", function () {
            svg_b.children[0].children[0].setAttribute('d', "M10.94 12L7.72 8.78a.75.75 0 0 1 1.06-1.06L12 10.94l3.22-3.22a.75.75 0 0 1 1.06 1.06L13.06 12l3.22 3.22a.75.75 0 0 1-1.06 1.06L12 13.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L10.94 12zM12 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm0-1.5a9 9 0 1 0 0-18 9 9 0 0 0 0 18z");
        });

        svg_b.addEventListener("click", function () {
            search_bar_form.value = "";
            svg_b.style.visibility = "hidden";
            svg_b.children[0].style.display = "none";
            search_bar_form.style.color = "initial";
            search_bar_form.style.fontStyle = "italic";
        });
    });
});