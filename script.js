let createMonsterBtn = document.querySelector('.createMonsterButton');
let boostBtn = document.querySelector('.boost');
let createMonsters = document.querySelectorAll('.createMonsters');
let manageMonsters = document.querySelector('.manageMonsters');
let heroArmor = document.querySelector('.heroArmor');
let heroHealth = document.querySelector('.heroHealth');
let main = document.querySelector('.main');
let fightOutcome = document.querySelector('.fightOutcome');

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

    let monsterArray = [];

    const pushMonsterInArray = (monster) => monsterArray.push(monster);

    const monsterDefeated = (id) => {
        monsterArray = monsterArray.filter(monster => monster.getId() != id);
        return monsterArray;

    }
    const removeMonster = (id) => {
        let div = document.getElementById(`${id}`);
        manageMonsters.removeChild(div);
    }
    const monsterAttackOnHero = (id) => {
        const activeMonster = monsterArray.find((el) => el.getId() == id);
        
        if(heroHealth == 0){
            return heroHealth;
        }
        if(activeMonster.getMonsterAttack() > heroArmor){
            heroHealth -= 1;
            return heroHealth;
        }
      
        else {
            monsterDefeated(activeMonster.getId());
            removeMonster(activeMonster.getId());
            return heroHealth;
        }
    }
    const getMonsterArrayLength = () => {
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

    const getMonsterHealth = () => { return heroHealth };
    
    const getHeroArmor = () => { return heroArmor }
   
    return { pushMonsterInArray, getMonsterArrayLength, boostHeroArmor, monsterAttackOnHero, getHeroArmor,  getMonsterHealth }
}
const fightManager = manageFight();

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

    if(fightManager.getMonsterArrayLength() > 3){
        createMonsterBtn.style.pointerEvents = 'none';
    }
    else {
        createMonsterBtn.style.pointerEvents = 'auto';
    }
}

function createFightOutcome() {
    fightOutcome = document.querySelector('.fightOutcome');
    
    if(fightManager.getMonsterArrayLength() == 0){
        fightOutcome.textContent = 'You won!';
    }
    if(fightManager.getMonsterHealth() == 0){
    
        fightOutcome.textContent = 'You died!';
    }
}

boostBtn.addEventListener('click', () => {
    heroArmor.innerHTML = `Armor: ${fightManager.boostHeroArmor()}`;
    setTimeout(() => { heroArmor.innerHTML = `Armor: ${fightManager.boostHeroArmor()}` }, 10000);
})

createMonsterBtn.addEventListener('click', (e) => {
    const newMonster = monsterCreator();
    fightManager.pushMonsterInArray(newMonster);
    createMonster(newMonster.getId());
    disableCreateMonsterBtn();
}) 



manageMonsters.addEventListener('click', (e) => {
    let currentId = e.target.closest('div').id;

    if(currentId){ 
        heroHealth.innerHTML = `Health: ${fightManager.monsterAttackOnHero(currentId)}`;
        createFightOutcome();
    };
    disableCreateMonsterBtn();
})