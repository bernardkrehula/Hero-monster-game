let createMonsterBtn = document.querySelector('.createMonsterButton');
let boostBtn = document.querySelector('.boost');
let createMonsters = document.querySelectorAll('.createMonsters');
let manageMonsters = document.querySelector('.manageMonsters');
let heroArmor = document.querySelector('.heroArmor');
let heroHealth = document.querySelector('.heroHealth');

function monsterCreator() {
    let monsterHealth = 1;
    let monsterAttack = 10;
    let id = crypto.randomUUID();
    const getId = () => {return id};
    const getMonsterHealth = () => { return monsterHealth };
    const getMonsterAttack = () => { return monsterAttack }; 
    return { getId, getMonsterHealth, getMonsterAttack };
}

function manageFight() {
    
    let heroArmor = 9;
    let heroHealth = 10;

    const monsterObjectCreator = monsterCreator();

    let monsterArray = [];

    const pushMonsterInArray = (monster) => monsterArray.push(monster);

    const monsterDefeated = (id) => {
        if(heroArmor > monsterObjectCreator.getMonsterAttack()){
            monsterArray = monsterArray.filter(monster => monster.getId() != id);
            return monsterArray;
        }    
    }

    const monsterAttackOnHero = () => {
        heroHealth -= 1;
        return heroHealth;
    }
    const setMonsterArrayLength = () => {
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
   
    return { pushMonsterInArray, setMonsterArrayLength, boostHeroArmor, monsterAttackOnHero, monsterDefeated, getHeroHealth }
}
const fightManager = manageFight();


//CreateMonster neka primi argument id
//Taj id zakaci na createMonsters
//Kad se klikne na attack button procitaj taj id
//Iskoristi ga da handlam napad cudovista
function createMonster(monsterId) {
    let html = 
    `
    <div class="createMonsters" id='${monsterId}'>
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

    if(fightManager.setMonsterArrayLength() > 3){
        createMonsterBtn.style.pointerEvents = 'none';
    }
    else {
        createMonsterBtn.style.pointerEvents = 'auto';
    }
}
boostBtn.addEventListener('click', () => {
    heroArmor.innerHTML = `Armor: ${fightManager.boostHeroArmor()}`;
    setTimeout(() => { heroArmor.innerHTML = `Armor: ${fightManager.boostHeroArmor()}` }, 10000);
})

createMonsterBtn.addEventListener('click', (e) => {
    const newMonster = monsterCreator();
    fightManager.pushMonsterInArray(newMonster);
    createMonster(newMonster.getId())
    disableCreateMonsterBtn();
})

manageMonsters.addEventListener('click', (e) => {
    let currentId = e.target.closest('div').id;
    let div = e.target.closest('div');
    if(currentId){ 
        heroHealth.innerHTML = `Health: ${fightManager.monsterAttackOnHero()}`;
        manageMonsters.removeChild(div);
    };
    fightManager.monsterDefeated(currentId);
    
   //Procitat id sa trenutnog cudovista
   //Nac to cudoviste u arrrayu cudovista
   //Provjerit je li tom cudovistu napad veci od armora heroja ako jeste skini heroju 1 health
   //Ako nije ubi cudoviste
})