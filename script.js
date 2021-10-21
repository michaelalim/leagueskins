// API site
// https://developer.riotgames.com/docs/lol?fbclid=IwAR3D22UnmVfDdZVB-3HrZrl-ty3NlLFU6b_Q_lm3j8TrZz1X2XDR-T-k2xE#data-dragon_champion-splash-art

//champion list --- generally only used for the names and the number of champions present in game 
// if i were to find a way to know the length of the API of have an API as an array instead of just pure objects, then this wouldn't be needed.
const champList = [
    `Aatrox`,
    `Ahri`,
    `Akali`,
    `Akshan`,
    `Alistar`,
    `Amumu`,
    `Anivia`,
    `Annie`,
    `Aphelios`,
    `Ashe`,
    `AurelionSol`,
    `Azir`,
    `Bard`,
    `Blitzcrank`,
    `Brand`,
    `Braum`,
    `Caitlyn`,
    `Camille`,
    `Cassiopeia`,
    `Chogath`,
    `Corki`,
    `Darius`,
    `Diana`,
    `Draven`,
    `DrMundo`,
    `Ekko`,
    `Elise`,
    `Evelynn`,
    `Ezreal`,
    `Fiddlesticks`,
    `Fiora`,
    `Fizz`,
    `Galio`,
    `Gangplank`,
    `Garen`,
    `Gnar`,
    `Gragas`,
    `Graves`,
    `Gwen`,
    `Hecarim`,
    `Heimerdinger`,
    `Illaoi`,
    `Irelia`,
    `Ivern`,
    `Janna`,
    `JarvanIV`,
    `Jax`,
    `Jayce`,
    `Jhin`,
    `Jinx`,
    `Kaisa`,
    `Kalista`,
    `Karma`,
    `Karthus`,
    `Kassadin`,
    `Katarina`,
    `Kayle`,
    `Kayn`,
    `Kennen`,
    `Khazix`,
    `Kindred`,
    `Kled`,
    `KogMaw`,
    `Leblanc`,
    `LeeSin`,
    `Leona`,
    `Lillia`,
    `Lissandra`,
    `Lucian`,
    `Lulu`,
    `Lux`,
    `Malphite`,
    `Malzahar`,
    `Maokai`,
    `MasterYi`,
    `MissFortune`,
    `MonkeyKing`,
    `Mordekaiser`,
    `Morgana`,
    `Nami`,
    `Nasus`,
    `Nautilus`,
    `Neeko`,
    `Nidalee`,
    `Nocturne`,
    `Nunu`,
    `Olaf`,
    `Orianna`,
    `Ornn`,
    `Pantheon`,
    `Poppy`,
    `Pyke`,
    `Qiyana`,
    `Quinn`,
    `Rakan`,
    `Rammus`,
    `RekSai`,
    `Rell`,
    `Renekton`,
    `Rengar`,
    `Riven`,
    `Rumble`,
    `Ryze`,
    `Samira`,
    `Sejuani`,
    `Senna`,
    `Seraphine`,
    `Sett`,
    `Shaco`,
    `Shen`,
    `Shyvana`,
    `Singed`,
    `Sion`,
    `Sivir`,
    `Skarner`,
    `Sona`,
    `Soraka`,
    `Swain`,
    `Sylas`,
    `Syndra`,
    `TahmKench`,
    `Taliyah`,
    `Talon`,
    `Taric`,
    `Teemo`,
    `Thresh`,
    `Tristana`,
    `Trundle`,
    `Tryndamere`,
    `TwistedFate`,
    `Twitch`,
    `Udyr`,
    `Urgot`,
    `Varus`,
    `Vayne`,
    `Veigar`,
    `Velkoz`,
    `Vex`,
    `Vi`,
    `Viego`,
    `Viktor`,
    `Vladimir`,
    `Volibear`,
    `Warwick`,
    `Xayah`,
    `Xerath`,
    `XinZhao`,
    `Yasuo`,
    `Yone`,
    `Yorick`,
    `Yuumi`,
    `Zac`,
    `Zed`,
    `Ziggs`,
    `Zilean`,
    `Zoe`,
    `Zyra`
]

// ------------------------ MAIN PAGE --------------------------------

// container div --- used for the 75x75 champion images on the main page
const container = document.getElementById("container");

// search bar
const searchBar = document.getElementById("search-bar");

// body tag used for the modal
const screen = document.getElementsByTagName("body")[0];


// the 75x75 images in the body of main page
champList.forEach(champ => {

    // card holder of images
    const card = document.createElement("div");
    card.classList.add("champions-card");
    card.setAttribute("id", champ);
    container.appendChild(card);

    // images
    const img = document.createElement("img");
    img.src = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${champ}.png`;
    img.classList.add("champ-img");
    card.appendChild(img);
    
})

// ------------------------ SEARCH BAR --------------------------------
// the divs --- also the cards from above --- used for the search queries
const championList = document.getElementsByClassName("champions-card");

// search-bar function
searchBar.addEventListener("keyup", (event) => {
    // getting the string from the search-bar
    let searchQueue = event.target.value.toLowerCase();

    // filter --- always remember to use toLowerCase() so the string would match when filtering
    for (let i = 0; i < champList.length; i++){
        if (!champList[i].toLowerCase().includes(searchQueue)){
            championList[i].style.display = "none";
        } else {
            championList[i].style.display = "block";
        }
    }
})

// ------------------------ MODAL AREA --------------------------------
// container for modal
const champInfoContainer = document.createElement("div");
champInfoContainer.classList.add("champ-info");
screen.appendChild(champInfoContainer);

// ~~~~~~~~~~~~~~~~~~~~~~~ CHAMPION INFO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// modal displays --- gathering and displaying info
for (let i = 0; i < champList.length; i++){
    // event when a certain champion is clicked on the main page
    championList[i].addEventListener("click", () => {
        // clearing the previous display assuming there's a display beforehand, so new items will display
        champInfoContainer.textContent = "";

        // main "display" of the container is none, means it is hidden at first, this will show the container
        champInfoContainer.style.display = "block";

        // img of champion
        const champImg = document.createElement("img");
        champImg.classList.add("champ-info-img");
        champImg.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champList[i]}_0.jpg`;
        champInfoContainer.appendChild(champImg);

        // using fetch to display the lore from the page (LINK AT LINE 2)
        (async function (){
            // fetching data from the link
            const req = await fetch("http://ddragon.leagueoflegends.com/cdn/11.21.1/data/en_US/champion.json");
            const json = await req.json();
            // .blurb is the lore
            const champ = json.data[champList[i]].blurb;

            // lore display using p
           const lore = document.createElement("p");
           lore.textContent = champ;
           lore.style.color = "white";
           lore.style.fontSize = "24px";
           lore.style.fontWeight = "900";
           champInfoContainer.appendChild(lore);
        })()
    })
}