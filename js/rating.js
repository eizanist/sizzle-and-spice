const ratingEls = document.querySelectorAll(".card-rating");

for (i = 0; i < ratingEls.length; i++) {
    const bgDiv = document.createElement("div");
    const fillDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    
    bgDiv.classList.add("stars-background");
    fillDiv.classList.add("stars-fill");
    fillDiv.style.width = (parseFloat(ratingEls[i].dataset.average) / 5 * 100) + "%";
    textDiv.classList.add("stars-text");
    textDiv.innerHTML = ratingEls[i].dataset.average;

    bgDiv.appendChild(fillDiv);
    ratingEls[i].appendChild(bgDiv);
    ratingEls[i].appendChild(textDiv);
}