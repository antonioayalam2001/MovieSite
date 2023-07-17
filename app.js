class MovieCard {
    constructor(sposter, imdb, date, name, genre, bposter, description) {
        this.sposter = sposter;
        this.imdb = imdb;
        this.date = date;
        this.name = name;
        this.genre = genre;
        this.bposter = bposter;
        this.description = description;
    }
    getCard() {
        return `
        <a href="" class="card">
        <img class="poster" src=${this.sposter} alt="">
        <div class="rest__card">
            <img src=${this.bposter} alt="">
            <div class="card__content">
                <div>
                    <h4>${this.name}
                        <span>${this.genre},${this.date}</span>
                    </h4>
                    <h3>
                        <span class="card__imdb">IMDB</span>
                        <span class="material-symbols-outlined star"
                            >star</span
                        >
                        ${this.imdb}
                    </h3>
                </div>
            </div>
        </div>
        </a>        
        `
    }
    getSearchCard() {
        return `
        <a class="card">
        <img src=${this.sposter} alt="" />
        <div class="cont">
            <h3>${this.name}</h3>
            <p>
                ${this.genre} , ${this.date},
                <span class="card__imdb">IMDB</span> ${this.imdb}
                <span class="material-symbols-outlined star"
                    >star</span'
                >
            </p>
        </div>
    </a>`
    }
}

const sectionCards = document.querySelector('.section__cards');
const videoPreview = document.getElementById('videoPreview');
const arrowLeft = document.getElementById('arrow__left');
const arrowRight = document.getElementById('arrow__right');
const mainBg = document.getElementById('movie_bg');
// DETAILS SECTION
const details_gen = document.querySelector("#details_gen");
const details_year = document.querySelector("#details_year");
const details_rate = document.querySelector("#details_rate");
const content_title = document.querySelector("#content_title");
const content_description = document.querySelector("#content_description");
//Search Section
const searchInput = document.querySelector('#searchInput');
const searchBoxResults = document.querySelector('.search');
fetch('movie.json').then(response => {
    return response.json()
}).then(data => {
    let movie = data.map(item => {
        return new MovieCard(item.sposter, item.imdb, item.date, item.name, item.genre, item.bposter, item.description)
    })

    movie.forEach(item => {
        sectionCards.innerHTML += item.getCard()
    })

    const cards = document.querySelectorAll('.card');
    arrowLeft.addEventListener('click', () => {
        // e.preventDefault();
        sectionCards.scrollLeft -= 150;
    })
    arrowRight.addEventListener('click', () => {
        // e.preventDefault();
        sectionCards.scrollLeft += 150;
    })

    let card = movie[0];
    cards.forEach(item => {
        //Pasar mouse sobre la tarjeta
        item.addEventListener('mouseover', () => {
            const imgLink = item.children[1].children[0].getAttribute('src');
            card = movie.find(movie => movie.bposter === imgLink);

            mainBg.style.backgroundImage = `url(${item.children[1].children[0].getAttribute('src')})`;
            mainBg.style.transition = 'all 0.5s ease';
            mainBg.style.backgroundSize = 'cover';
            mainBg.style.backgroundPosition = 'center';
            mainBg.style.backgroundRepeat = 'no-repeat';
            //Modificar el contenido de la tarjeta
            content_title.style.animation = 'bounce-out-bck .5s alternate both';
            setTimeout(() => {
                content_title.innerHTML = card.name;
                content_title.style.animation = 'puff-in-center .5s alternate both';
            }, 500);


            content_description.innerHTML = card.description;
            details_gen.innerHTML = card.genre;
            details_year.innerHTML = card.date;
            details_rate.innerHTML = card.imdb;
        })
        item.addEventListener('mouseout', () => {
            // content_title.classList.remove('bounce-out-bck');
            // mainBg.style.backgroundImage = "none"
            // content_title.classList.remove('puff-in-center');
        })
    })

    //Search
    searchInput.addEventListener('keyup', () => {
        searchBoxResults.innerHTML = '';
        const searchValue = searchInput.value;
        const searchRegex = new RegExp(searchValue, 'i');
        const searchResults = movie.filter(movie => movie.name.match(searchRegex));
        if (searchValue === '') {
            searchBoxResults.innerHTML = '';
            return;
        }
        searchBoxResults.style.display = 'block';
        searchResults.forEach(item => {
            searchBoxResults.innerHTML += item.getSearchCard();
        })
    });

})