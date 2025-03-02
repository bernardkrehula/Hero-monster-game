let createMonsterBtn = document.querySelector('.createMonsterButton');
let boostBtn = document.querySelector('.boost');
let createMonsters = document.querySelectorAll('.createMonsters');
let manageMonsters = document.querySelector('.manageMonsters');

function manageFight() {
    let monsterHealth;
    let monsterAttack;
    let heroArmor;
    let heroHealth;

    let monsterArray = [];

    
}
boostBtn.addEventListener('click', () => {
    
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
createMonsterBtn.addEventListener('click', () => {
    createMonster();
})