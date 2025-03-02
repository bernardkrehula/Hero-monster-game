let createMonsterBtn = document.querySelector('.createMonsterButton');
let boostBtn = document.querySelector('.boost');
let createMonsters = document.querySelectorAll('.createMonsters');
let manageMonsters = document.querySelector('.manageMonsters');
let attackBtn = document.querySelectorAll('.createMonsters button');

function manageFight() {
    let monsterHealth = 1;
    let monsterAttack = 10;
    let heroArmor = 9;
    let heroHealth = 10;

    let monsterArray = [];

    const pushMonsterInArray = () => monsterArray.push(monsterValuesCreator());

    const monsterValuesCreator = () => {
        return { monsterHealth, monsterAttack };
    };
    const fixMonsterArrayLenght = () => {
        return monsterArray.length;
    }

    return { pushMonsterInArray, monsterValuesCreator, fixMonsterArrayLenght }
}
const fightManager = manageFight();


boostBtn.addEventListener('click', () => {
   
})
function callMonsterAttack() {
    attackBtn = document.querySelectorAll('.createMonsters button');
    attackBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            console.log(e.target)
        })
   })
}
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
createMonsterBtn.addEventListener('click', () => {
    fightManager.monsterValuesCreator();
    fightManager.pushMonsterInArray();
    createMonster();
    if(fightManager.fixMonsterArrayLenght() > 3){
        createMonsterBtn.style.pointerEvents = 'none';
    }
    else {
        createMonsterBtn.style.pointerEvents = 'auto';
    }
    callMonsterAttack();
})