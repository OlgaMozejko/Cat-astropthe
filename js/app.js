"use strict";

let _categories = [];

async function getCategories() {
  let response = await fetch("http://headless.omozejko.com/wp-json/wp/v2/categories");
  let data = await response.json();
  console.log(data);
  appendCategories(data);
}

getCategories();

function appendCategories(categories) {
  let htmlTemplate = "";
  for (let category of categories) {
    htmlTemplate +=
    `<option value="${category.id}">${category.name}</option>`;

  }

  document.querySelector('#select-category').innerHTML += htmlTemplate;

}


async function categorySelected(categoryId) {
if (categoryId) {
  let response = await fetch(`http://headless.omozejko.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}`);
  let data = await response.json();
  appendPhotosByCategory(data);
} 
}

function appendPhotosByCategory(photosByCategory) {
  let htmlTemplate = "";
  for (let photo of photosByCategory) {
    htmlTemplate += `
    <div class="frame">
      <h2>${photo.title.rendered}</h2>
      <img src="${photo.acf.img}">
      <p>${photo.acf.description}</p>
      </div>
      <br><br><br><br>
    `;
  }
  if (photosByCategory.length === 0) {
    htmlTemplate = `
    <p>no photos</p>`;
  }
  document.querySelector('#photos-by-category-container').innerHTML = htmlTemplate;
}




let _photos = [];

async function getPhotos() {
  let response = await fetch("http://headless.omozejko.com/wp-json/wp/v2/posts");
  let data = await response.json();
  console.log(data);
  _photos = data;
  randomCat(data);
}


getPhotos();


function randomCat(photos) {
let mystery = Math.floor(Math.random()* photos.length);
let htmlTemplate = "";
let photo = photos[mystery];
    htmlTemplate += `
    <div class="mainframe">
      <h2>${photo.title.rendered}</h2>
      <img class="mainphoto" src="${photo.acf.img}">
      <p>${photo.acf.description}</p>
      </div>
    `;
    document.querySelector('#photos-container').innerHTML = htmlTemplate;
}

randomCat();

