//interval
const min_interval = 2000;
const max_interval = 12000;
const sad_interval = 500;
const hungry_interval = 3000;

const moles = [
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-0')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-1')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-2')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-3')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-4')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-5')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-6')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-7')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-8')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-9')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-10')
    },{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-11')
    },
]

const holeCtn = document.querySelector('#hole-container')
const winCtn = document.querySelector('#win')
const worm = document.querySelector('#worm')

let runAgain = Date.now() + 1000
let score = 0

function nextFrame(){
    const now = Date.now()
    // once date.now passed the runAgain, add another 100ms
    if(runAgain <= now){

        moles.forEach((mole) => {
            if(mole.next <= now){
                getNextStatus(mole)
            }

        })
        runAgain = now + 1000
    }
    requestAnimationFrame(nextFrame)
}
requestAnimationFrame(nextFrame)

holeCtn.addEventListener('click', feed)

function getSadInterval(){
    return Date.now() + sad_interval
}

function getGoneInterval(){
    return Date.now() + Math.floor(Math.random() * max_interval) + min_interval 
}

function getHungryInterval(){
    return Date.now() + Math.floor(Math.random * hungry_interval + min_interval)
}

function getKingStatus(){
    return Math.random() > 0.9;
}

const getNextStatus = (mole) => {
    switch (mole.status){
        case "sad":
        case "fed":
            mole.next = getSadInterval()
            
            if(mole.king){
                mole.node.children[1].src = './assets/king-mole-leaving.png'
            }else {
                mole.node.children[1].src = './assets/mole-leaving.png'
            }
            mole.status = "leaving"

            break;

        case "leaving":
            mole.next = getGoneInterval()
            mole.king = false
            
            mole.node.children[1].classList.add('hidden')
            mole.node.children[0].classList.remove('hidden')
            
            mole.status = "gone"

            break;

        case "hungry":
            mole.node.children[1].classList.remove('hidden')
            mole.node.children[0].classList.add('hidden')
            mole.status = "sad";
            mole.next = getSadInterval()
  
            if(mole.king){
                mole.node.children[1].src = './assets/king-mole-sad.png'
            }else {
                mole.node.children[1].src = './assets/mole-sad.png'
            }

            break;

        case "gone":
            mole.status = "hungry"
            mole.next - getHungryInterval()
            mole.king = getKingStatus()
            mole.node.children[1].classList.remove('hidden')
            mole.node.children[0].classList.add('hidden')
            mole.node.children[1].classList.toggle('pointer-feed')
            
            if(mole.king){
                mole.node.children[1].src = './assets/king-mole-hungry.png'
            }else {
                mole.node.children[1].src = './assets/mole-hungry.png'
            }

            break;
    }
}

function feed (e){
    if(e.target.tagName !== 'IMG' || e.target.classList.contains('hungry')){
        return
    }

    const mole = moles[parseInt(e.target.dataset.index)]

    mole.status = 'fed'
    mole.next = getSadInterval()
    if(mole.king){
        mole.node.children[1].src = './assets/king-mole-fed.png'
        score = score + 20
    }else{
        mole.node.children[1].src = './assets/mole-fed.png'
        score = score + 10
    }

    mole.node.children[1].classList.add('hidden')
    mole.node.children[0].classList.remove('hidden')

    if(score >= 100){
        win()
        return
    }

    worm.style.width =`${score}%`
}

function win(){
    holeCtn.classList.add('hidden')
    winCtn.classList.remove('hidden')
    worm.classList.add('hidden')
}


