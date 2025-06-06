let gameCounter = null
let RandomColorIntervals = null
let gameDifficulty = null
let newGameDifficulty = null
const timerSpan = document.getElementById('timer').getElementsByTagName('span')[1]
const pointSpan = document.getElementById('points').getElementsByTagName('span')[1]
const getTimeAndDifficulty = () => {
    document.getElementById('gameInfo').style.top = '100px'
    document.getElementById('gameInfo').getElementsByTagName('div')[2].style.display = 'none'
}
const setGameTime = (num) => {
    document.getElementById('timer').getElementsByTagName('span')[1].innerText = num
    document.getElementById('gameInfo').getElementsByTagName('div')[0].style.display = 'none';
    document.getElementById('gameInfo').getElementsByTagName('div')[2].style.display = 'block';
}
const submitGameDifficulty = (level) => {
    if (level === 'easy') {
        gameDifficulty = 1500
    } else if (level === 'medium') {
        gameDifficulty = 1000
    } else {
        gameDifficulty = 500
    }
    newGameDifficulty = gameDifficulty
    document.getElementById('gameInfo').style.top = '-300px'
    startGame()
}
const submitGameInfo = (e) => {
    e.preventDefault()
    console.log('here')
}
const startGame = () => {
    document.getElementById('ready').style.display = 'flex'
    document.getElementById('ready').style.flexDirection = 'column'
    document.getElementById('startGameButton').style.display = 'none'
    let counter321 = setInterval(()=>{
        document.getElementById('ready').getElementsByTagName('span')[1].innerText = parseInt(document.getElementById('ready').getElementsByTagName('span')[1].innerText)-1
    },1000)
    setTimeout(() => {
        clearInterval(counter321)
        document.getElementById('ready').style.display = 'none'
        document.getElementById('game').style.display = 'block'
        randomColors()
        gameCounter = setInterval(() =>{
            timerSpan.innerText = parseInt(timerSpan.innerText-1)
            checkTimeUp()
            difficultyModifier()
        },1000)
    },3000)

}
const randomColors = () => {
        let num = Math.floor(Math.random()*12)
        for (let i=0; i<12; i++) {
            document.getElementById('boxes').getElementsByTagName('li')[i].style.backgroundColor = "beige"    
        }
        document.getElementById('boxes').getElementsByTagName('li')[num].style.backgroundColor = "blue"
    RandomColorIntervals = setInterval(() => {
        num = Math.floor(Math.random()*12)
        // document.getElementById('boxes').getElementsByTagName('li').forEach((item) => {
        //     item.style.backgroundColor = "beige"
        // })
        for (let i=0; i<12; i++) {
            document.getElementById('boxes').getElementsByTagName('li')[i].style.backgroundColor = "beige"    
        }
        document.getElementById('boxes').getElementsByTagName('li')[num].style.backgroundColor = "blue"
    },newGameDifficulty)
}
const checkTimeUp = () => {
    if (!parseInt(timerSpan.innerText)) {
        clearInterval(gameCounter)
        clearInterval(RandomColorIntervals)
        document.getElementById('timer').style.color = 'red'
        document.getElementById('timer').style.fontWeight = '600'
        for (let i=0; i<12; i++) {
            document.getElementById('boxes').getElementsByTagName('li')[i].style.backgroundColor = "cadetblue"    
        }
        document.getElementById('boxes').getElementsByTagName('li')[4].innerText = "FI"
        document.getElementById('boxes').getElementsByTagName('li')[5].innerText = "NI"
        document.getElementById('boxes').getElementsByTagName('li')[6].innerText = "SH"
        document.getElementById('boxes').getElementsByTagName('li')[7].innerText = "ED"
    }
}
const checkClick = (answer) => {
    if (document.getElementById('boxes').getElementsByTagName('li')[answer].style.backgroundColor === "blue") {
        document.getElementById('boxes').getElementsByTagName('li')[answer].style.backgroundColor = "green"
        pointSpan.innerText = parseInt(pointSpan.innerText) + 1
        clearInterval(RandomColorIntervals)
        randomColors()
    } else if (document.getElementById('boxes').getElementsByTagName('li')[answer].style.backgroundColor === "beige") {
        document.getElementById('boxes').getElementsByTagName('li')[answer].style.backgroundColor = 'red'
        pointSpan.innerText = parseInt(pointSpan.innerText) - 1
    }
}
const difficultyModifier = () => {
    let pointNow = parseInt(document.getElementById('points').getElementsByTagName('span')[1].innerText)
    if (pointNow<0) {
        newGameDifficulty = gameDifficulty * 2
    } else if (pointNow>=0 && pointNow<10) {
        newGameDifficulty = gameDifficulty
    } else if(pointNow>=10 && pointNow<20) {
        newGameDifficulty = gameDifficulty * 0.9
    } else if(pointNow>=20 && pointNow<30) {
        newGameDifficulty = gameDifficulty * 0.8
    } else {
        newGameDifficulty = gameDifficulty * 0.7
    }
    console.log(newGameDifficulty)
    //man ehsas mikonam in ghesmat kaar nemikone
}
const resetGame = () => {
    window.location.reload(true)
}