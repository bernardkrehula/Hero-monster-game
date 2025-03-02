let createMonsterBtn = document.querySelector('.createMonsterButton');
let boostBtn = document.querySelector('.boost');
let createMonsters = document.querySelectorAll('.createMonsters');
let manageMonsters = document.querySelector('.manageMonsters');
let attackBtn = document.querySelectorAll('.createMonsters button');
let heroArmor = document.querySelector('.heroArmor');
let heroHealth = document.querySelector('.heroHealth');

function manageFight() {
    let monsterHealth = 1;
    let monsterAttack = 10;
    let heroArmor = 9;
    let heroHealth = 10;

    let monsterArray = [];

    const pushMonsterInArray = () => monsterArray.push(monsterValuesCreator());

    const monsterValuesCreator = () => {
        let id = crypto.randomUUID();
        const getId = () => {return id}
        return { getId, monsterHealth, monsterAttack };
    };

    const monsterDefeated = (id) => {
        monsterArray.filter((monster) => monster.getId() != id);
        return monsterArray;
    }


    const monsterAttackOnHero = () => {
        if(monsterAttack > heroArmor){
            heroHealth -= 1;
            heroHealth = Math.max(0, heroHealth);
        }
        else {

        }
        console.log(heroHealth)
    }
    const setMonsterArrayLenght = () => {
        return monsterArray.length;
    }
    const boostHeroArmor = () => {
        if(heroArmor < 10){
            heroArmor += 10;
        }
        else {
           heroArmor -= 10;
        }
        return heroArmor;
    }
    const getHeroHealth = () => { return heroHealth; }
   
    return { pushMonsterInArray, monsterValuesCreator, setMonsterArrayLenght, boostHeroArmor, monsterAttackOnHero, monsterDefeated, getHeroHealth }
}
const fightManager = manageFight();

boostBtn.addEventListener('click', () => {
    heroArmor.innerHTML = `Armor: ${fightManager.boostHeroArmor()}`;
    setTimeout(() => { heroArmor.innerHTML = `Armor: ${fightManager.boostHeroArmor()}` }, 10000);
})

function createMonster() {
    let html = 
    `
    <div class="createMonsters">
        <button>Attack</button>
        <img src="monster.png">
        <div class="monsterValues">
            <h2>Health: 1</h2>
            <h2>Attack: 10</h2>
        </div>
    </div>
    `;
    manageMonsters.insertAdjacentHTML('beforeend', html);
}
function disableCreateMonsterBtn() {

    if(fightManager.setMonsterArrayLenght() > 3){
        createMonsterBtn.style.pointerEvents = 'none';
    }
    else {
        createMonsterBtn.style.pointerEvents = 'auto';
    }
}

createMonsterBtn.addEventListener('click', (e) => {
    fightManager.monsterValuesCreator();
    fightManager.pushMonsterInArray();
    createMonster();
    disableCreateMonsterBtn();
})

manageMonsters.addEventListener('click', (e) => {
    let getMonster = e.target.closest('button');
    if(getMonster == null) { return }
    if(getMonster.classList == ''){
        getMonster.id = fightManager.monsterValuesCreator().getId();
        fightManager.monsterAttackOnHero();
        // fightManager.monsterDefeated(getMonster.id);
        console.log(getMonster)
    }
    heroHealth.innerHTML = `Health: ${fightManager.getHeroHealth()}`;
})