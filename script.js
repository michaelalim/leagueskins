// API link
// https://developer.riotgames.com/docs/lol?fbclid=IwAR3D22UnmVfDdZVB-3HrZrl-ty3NlLFU6b_Q_lm3j8TrZz1X2XDR-T-k2xE#data-dragon_champion-splash-art

//champion list --- generally only used for the names and the number of champions present in game 
// if i were to find a way to know the length of the API of have an API as an array instead of just pure objects, then this wouldn't be needed.
// since I've done "WRAPPING" on my vscode, I took the opportunity to put this all in one line although this might not be very good.
const champList = [
     `Aatrox`,`Ahri`,`Akali`,`Akshan`,`Alistar`,`Amumu`,`Anivia`,`Annie`,`Aphelios`,`Ashe`,`AurelionSol`,`Azir`,`Bard`,`Blitzcrank`,`Brand`,`Braum`,`Caitlyn`,`Camille`,`Cassiopeia`,`Chogath`,`Corki`,`Darius`,`Diana`,`Draven`,`DrMundo`,`Ekko`,`Elise`,`Evelynn`,`Ezreal`,`Fiddlesticks`,`Fiora`,`Fizz`,`Galio`,`Gangplank`,`Garen`,`Gnar`,`Gragas`,`Graves`,`Gwen`,`Hecarim`,`Heimerdinger`,`Illaoi`,`Irelia`,`Ivern`,`Janna`,`JarvanIV`,`Jax`,`Jayce`,`Jhin`,`Jinx`,`Kaisa`,`Kalista`,`Karma`,`Karthus`,`Kassadin`,`Katarina`,`Kayle`,`Kayn`,`Kennen`,`Khazix`,`Kindred`,`Kled`,`KogMaw`,`Leblanc`,`LeeSin`,`Leona`,`Lillia`,`Lissandra`,`Lucian`,`Lulu`,`Lux`,`Malphite`,`Malzahar`,`Maokai`,`MasterYi`,`MissFortune`,`MonkeyKing`,`Mordekaiser`,`Morgana`,`Nami`,`Nasus`,`Nautilus`,`Neeko`,`Nidalee`,`Nocturne`,`Nunu`,`Olaf`,`Orianna`,`Ornn`,`Pantheon`,`Poppy`,`Pyke`,`Qiyana`,`Quinn`,`Rakan`,`Rammus`,`RekSai`,`Rell`,`Renekton`,`Rengar`,`Riven`,`Rumble`,`Ryze`,`Samira`,`Sejuani`,`Senna`,`Seraphine`,`Sett`,`Shaco`,`Shen`,`Shyvana`,`Singed`,`Sion`,`Sivir`,`Skarner`,`Sona`,`Soraka`,`Swain`,`Sylas`,`Syndra`,`TahmKench`,`Taliyah`,`Talon`,`Taric`,`Teemo`,`Thresh`,`Tristana`,`Trundle`,`Tryndamere`,`TwistedFate`,`Twitch`,`Udyr`,`Urgot`,`Varus`,`Vayne`,`Veigar`,`Velkoz`,`Vex`,`Vi`,`Viego`,`Viktor`,`Vladimir`,`Volibear`,`Warwick`,`Xayah`,`Xerath`,`XinZhao`,`Yasuo`,`Yone`,`Yorick`,`Yuumi`,`Zac`,`Zed`,`Ziggs`,`Zilean`,`Zoe`,`Zyra`
    ]

// ------------------------ MAIN PAGE --------------------------------

// container div --- used for the 75x75 champion images on the main page
const container = document.getElementById("container");

// search bar
const searchBar = document.getElementById("search-bar");

// body tag used for the modal
const screen = document.getElementsByTagName("body")[0];

// this is just to be used when opening a modal, i will have to hide this a little bit more because it stands out a little
const searchLabel = document.getElementById("search-label");


// the 75x75 images in the body of main page
champList.forEach(champ => {

    // card holder of images
    const card = document.createElement("div");
    card.classList.add("champions-card");
    container.appendChild(card);

    // images
    const img = document.createElement("img");
    img.src = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${champ}.png`;
    img.alt = `${champ} image`
    img.classList.add("champ-img");
    card.appendChild(img);

    // added name when hovering champions
    const champHovered = document.createElement("h5");
    champHovered.textContent = champ;
    champHovered.classList.add("champ-hover-display");
    card.appendChild(champHovered);

    // hover adds this attributes, some of these doesn't really work on css cause hovering on the name would brighten the div/img instead. there could be a better way of doing this.
    card.addEventListener("mouseover", () => {
        champHovered.style.display = "inline-block";
        img.style.opacity = "0.35";
        img.style.transform = "scale(92.5%)";

        card.addEventListener("mouseleave", () => {
            champHovered.style.display = "none";
            img.style.opacity = "1";
            img.style.transform = "scale(100%)";
        })
    })
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
// added another modal because #00000099 just isn't dark enough I think
const darkerModal = document.createElement("div");
darkerModal.classList.add("darker-modal");
screen.appendChild(darkerModal);

// container for modal
const champInfoContainer = document.createElement("div");
champInfoContainer.classList.add("champ-info");
darkerModal.appendChild(champInfoContainer);

// ~~~~~~~~~~~~~~~~~~~~~~~ CHAMPION INFO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// modal displays --- gathering and displaying info
for (let i = 0; i < champList.length; i++){
    // event when a certain champion is clicked on the main page
    championList[i].addEventListener("click", () => {
        // clearing the previous display assuming there's a display beforehand, so new items will display
        champInfoContainer.textContent = "";
        searchBar.style.opacity = "0.3";
        searchLabel.style.opacity = "0.3";

        //code for not allowing scroll outside the modal
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
            // if any scroll is attempted, set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            }

        // default translation is 100% Y which means it's not displayed inside of the user's screen. By clicking a particular champion on main page, the modal will then show
        darkerModal.style.transform = "translateY(0)";

        // The modal view should be something like
        // PICTURE ON THE LEFT will consume almost 50% of the screen
        // NAVIGATION on top most of the other half (INFO - SKILLS - SKINS)
        // below NAVIGATION would be lore
        // and then stats
        // and then skills
        // also a close button on the top right corner of the screen

        // img of champion
        const champImg = document.createElement("img");
        champImg.classList.add("champ-info-img");
        champImg.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champList[i]}_0.jpg`;
        champImg.alt = champList[i];
        champInfoContainer.appendChild(champImg);

        // hidden img of champion @ modal. this image should show up when the viewport is below 600px
        const champImgSmall = document.createElement("img");
        champImgSmall.classList.add("champ-info-img-small");
        champImgSmall.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champList[i]}_0.jpg`;
        champImgSmall.alt = champList[i];
        champInfoContainer.appendChild(champImgSmall);

        // close modal button
        const closeModalBtn = document.createElement("button");
        closeModalBtn.classList.add("close-modal-btn", "material-icons-outlined");
        closeModalBtn.textContent = "close";
        champInfoContainer.appendChild(closeModalBtn);

        // close modal button function
        closeModalBtn.addEventListener("click", () => {
            // hide modal, bring back searchbar's opacity
            darkerModal.style.transform = "translateY(100%)";
            searchBar.style.opacity = "1";
            searchLabel.style.opacity = "1";

            // cancelling out the function to allow scrolling again
            window.onscroll = function(){};
        });

        // container for the right side of info-modal
        // DOWNWARD DIRECTION
        const mainInfoContainer = document.createElement("div");
        mainInfoContainer.classList.add("main-info-container");
        champInfoContainer.appendChild(mainInfoContainer);

        function showPreface(){
            mainInfoContainer.textContent = "";
            // container for navigation 
            // RIGHT DIRECTION
            const navContainer = document.createElement("div");
            navContainer.classList.add("nav-container");
            mainInfoContainer.appendChild(navContainer);

            // navigations
            // info navigation
            const infoNav = document.createElement("h6");
            infoNav.textContent = "INFO";
            infoNav.classList.add("moda-nav", "current-nav");
            navContainer.appendChild(infoNav); 

            // skills navigation
            const skillsNav = document.createElement("h6");
            skillsNav.textContent = "SKILLS";
            skillsNav.classList.add("moda-nav");
            navContainer.appendChild(skillsNav);

            // skins navigation
            const skinsNav = document.createElement("h6");
            skinsNav.textContent = "SKINS";
            skinsNav.classList.add("moda-nav");
            navContainer.appendChild(skinsNav);

            // CAN'T TRANSFER CURRENT-NAV CLASS FOR SOME REASON :))))))))))))
            // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

            infoNav.addEventListener("click", infoBtn);
            skillsNav.addEventListener("click", skillBtn);
            skinsNav.addEventListener("click", skinsBtn);

            function infoBtn(){
                showPreface();
                infoNav.classList.add("current-nav");
                skillsNav.classList.remove("current-nav");
                skinsNav.classList.remove("current-nav");
                showInfo();
                
            };
            
            function skillBtn(){
                showPreface();
                infoNav.classList.remove("current-nav");
                skillsNav.classList.add("current-nav");
                skinsNav.classList.remove("current-nav");
                showSkills();
                
            };

            function skinsBtn(){
                showPreface();
                showSkins();
                infoNav.classList.remove("current-nav");
                skillsNav.classList.remove("current-nav");
                skinsNav.classList.add("current-nav");
            };
        };

        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
        
        showPreface();
        showInfo();

        function showInfo(){
            // using fetch to display the lore from the page (LINK AT LINE 2)
            ;(async function (){            

            // fetching data from the link
            const req = await fetch(`http://ddragon.leagueoflegends.com/cdn/11.21.1/data/en_US/champion/${champList[i]}.json`);
            const json = await req.json();
            const champ = json.data[champList[i]];

            // champ name
            const champName = document.createElement("h2");
            champName.textContent = champ.name;
            champName.classList.add("champ-info-name");
            mainInfoContainer.appendChild(champName);

            // champ title
            const champTitle = document.createElement("span");
            champTitle.textContent = champ.title;
            champTitle.classList.add("champ-info-title");
            mainInfoContainer.appendChild(champTitle);

            // lore display using p --- blurb being the default of the lore text content
            const lore = document.createElement("p");   
            lore.classList.add("lore-text");
            lore.textContent = champ.blurb;
            mainInfoContainer.appendChild(lore);

            // see more see less function
            lore.addEventListener("click", () => {
                lore.textContent == champ.blurb ? lore.textContent = champ.lore : lore.textContent = champ.blurb;
            });

            // container for champion-tags (e.g. Fighter, Mage) and their skills
            const champTagSkillsContainer = document.createElement("div");
            champTagSkillsContainer.classList.add("tag-skill-container");
            mainInfoContainer.appendChild(champTagSkillsContainer);

            // tag container 
            const tagContainer = document.createElement("div");
            tagContainer.classList.add("tag-container");
            champTagSkillsContainer.appendChild(tagContainer);

            // tag-contents
            const tagHeader = document.createElement("h4");
            tagHeader.textContent = "Tags:";
            tagHeader.classList.add("tag-header");
            tagContainer.appendChild(tagHeader);

                // fetching champ tags
                const tagArray = champ.tags;

            // DOM for champ tags looped
            for (let i = 0; i < tagArray.length; i++){
                    const champTag = document.createElement("span");
                    champTag.textContent += tagArray[i];
                    champTag.classList.add("champ-tags");

                    // adding unique classes for color setting
                    if (champTag.textContent === "Support"){champTag.classList.add("tag-support")};
                    if (champTag.textContent === "Fighter"){champTag.classList.add("tag-fighter")};
                    if (champTag.textContent === "Mage"){champTag.classList.add("tag-mage")};
                    if (champTag.textContent === "Assassin"){champTag.classList.add("tag-assassin")};
                    if (champTag.textContent === "Tank"){champTag.classList.add("tag-tank")};
                    if (champTag.textContent === "Marksman"){champTag.classList.add("tag-marksman")};

                    tagContainer.appendChild(champTag);
            }           

            // container for skills image
            const skillsContainer = document.createElement("div");
            skillsContainer.classList.add("champ-info-skills-container");
            champTagSkillsContainer.appendChild(skillsContainer);

            // fetching passive
            const passive = champ.passive.image.full;
            
            // display passive
            const skillP = document.createElement("img");
            skillP.src = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/passive/${passive}`;
            skillP.classList.add("champ-info-skill-img");
            skillsContainer.appendChild(skillP);

                // fetching and then displaying Q
            const fetchQ = champ.spells[0].image.full;

            const skillQ = document.createElement("img");
            skillQ.src = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${fetchQ}`;
            skillQ.classList.add("champ-info-skill-img");
            skillsContainer.appendChild(skillQ);

                // fetching and then displaying W
            const fetchW = champ.spells[1].image.full;

            const skillW = document.createElement("img");
            skillW.src = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${fetchW}`;
            skillW.classList.add("champ-info-skill-img");
            skillsContainer.appendChild(skillW);

                // fetching and then displaying E
            const fetchE = champ.spells[2].image.full;

            const skillE = document.createElement("img");
            skillE.src = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${fetchE}`;
            skillE.classList.add("champ-info-skill-img");
            skillsContainer.appendChild(skillE);

                // fetching and then displaying R
            const fetchR = champ.spells[3].image.full;

            const skillR = document.createElement("img");
            skillR.src = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${fetchR}`;
            skillR.classList.add("champ-info-skill-img");
            skillsContainer.appendChild(skillR);
            })();
        }
    });
};