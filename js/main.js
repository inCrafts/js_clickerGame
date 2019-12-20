const $start = document.querySelector('#start'),
      $game = document.querySelector('#game'),
      $time = document.querySelector('#time'),
      $result = document.querySelector('#result'),
      $timeHeader = document.querySelector('#time-header'),
      $resultHeader = document.querySelector('#result-header'),
    $gameTime = document.querySelector('#game-time');


$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setTime);

const colors = ['red', 'blue', 'green', 'yellow', 'salmon', 'teal', 'plum', 'peru'];

let score = 0,
    isGame = false;

function startGame() {
    score = 0;
    setTime();
    $gameTime.setAttribute('disabled', 'true');
    isGame = true;
    hide($start);
    $game.style.backgroundColor = '#ffffff';

    const interval = setInterval(function () {
        let time = parseFloat($time.textContent);

        if (time <= 0) {
            clearInterval(interval);
            EndGame();
        } else {
            $time. textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox()
}

function renderBox() {
    $game.innerHTML = '';
    const box =document.createElement('div'),
          boxSize = getRandom(30, 100),
          gameSize = $game.getBoundingClientRect(),
          maxTop = gameSize.height - boxSize,
          maxLeft = gameSize.width - boxSize;
    let randomColor = getRandom(0, colors.length);

    box.style.position = 'absolute';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.width = box.style.height = boxSize + 'px';
    box.style.backgroundColor = colors[randomColor];
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box)
}

function handleBoxClick(event) {
    if (!isGame) {
        return;
    }

    if (event.target.dataset.box) {
        score++;
        renderBox()
    }
}

function setScore() {
    $result.textContent = score.toString();
}

function setTime() {
    const time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function EndGame() {
    isGame = false;
    setScore();
    $gameTime.removeAttribute('disabled');

    show($start);
    $game.innerHTML = '';
    $game.style. backgroundColor = '#cccccc';
    hide($timeHeader);
    show($resultHeader);
}

// Service Funcs

function  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function show($el) {
    $el.classList.remove('hide');

}

function hide($el) {
    $el.classList.add('hide');
}