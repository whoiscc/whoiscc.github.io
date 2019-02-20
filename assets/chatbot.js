//

const patternList = [
  [/hello/i, (p) => p.send('hi')],
  [/i think ([\w ]+)/i, (p, m) => p.send('well, i also think ' + m[0])],
  [/do you like ([\w ]+)/i, (p, m) => p.send('i don\'t know a lot about ' + m[0] + '...')],
  [/what is ([\w ]+)/i, (p, m) => p.send('it is a little hard to explain...')],
  [/there (is|are) ([\w ]+)/i, (p, m) => p.send('i really hope i can get ' + m[1])],
  [/do you mean/i, (p) => p.send('sorry it was a mistake to send it to you')],
  [/what do you think (of|about) ([\w ]+)/i, (p, m) => p.send('i think ' + m[1] + ' is just so-so')],
  [/(can|could|would) you ([\w ]+)/i, (p, m) => p.send('to ' + m[1] + ' may be a little hard for me...')],
  [/is there any/i, (p, m) => p.send('i cannot imagine that...')],
  [/i don't know about ([\w ]+)/i, (p, m) => p.send('there is something good kid shouldn\'t know, like ' + m[0])],
  [/i (don't|couldn't|cannot) ([\w ]+)/i, (p, m) => p.send('i thought you could ' + m[1])],
  [/do you want to ([\w ]+)/i, (p, m) => p.send('is there any way to ' + m[0])],
  [/how ([\w ]+) you ([\w ]+)/i, (p, m) => p.send('i think is more surprising that you ' + m[1])],
];

function randomRange(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}

function makeResponse(sentence, p) {
  const matchedList = [];
  for ([pat, action] of patternList) {
    if (pat.test(sentence)) {
      matchedList.push([pat, action]);
    }
  }
  console.log(matchedList);
  if (matchedList.length == 0) {
    p.send('also pretty good');
  } else {
    const choice = randomRange(0, matchedList.length);
    const [pat, action] = matchedList[choice];
    action(p, sentence.match(pat).slice(1));
  }
}

function Context(historyView) {
  this.historyView = historyView;
}

Context.prototype.send = function(reply) {
  const replyView = document.createElement('p');
  replyView.textContent = 'ハル子: ' + reply;
  replyView.classList.add('chatbot-message-reply');
  replyView.style =
    'color: rgb(' + randomRange(224, 256) + ', ' +
    randomRange(0, 128) + ', ' + randomRange(0, 80) + ')';
  this.historyView.appendChild(replyView);
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#chatbot-container');
  const historyView = document.createElement('div');
  historyView.id = 'chatbot-history';
  const inputView = document.createElement('input');
  inputView.addEventListener('keypress', (event) => {
    if (!event) {
      event = window.event;
    }
    const keyCode = event.keyCode || e.which;
    // ENTER pressed
    if (keyCode == '13') {
      const inputText = inputView.value;
      inputView.value = '';
      console.log(inputText);
      const messageView = document.createElement('p');
      messageView.textContent = 'You: ' + inputText;
      historyView.appendChild(messageView);
      makeResponse(inputText, new Context(historyView));
    }
  })
  inputView.type = 'text';
  inputView.placeholder = 'Say something... press ENTER to send';
  inputView.id = 'chatbot-input';
  container.appendChild(historyView);
  const inputViewContainer = document.createElement('div');
  inputViewContainer.id = 'chatbot-input-container';
  inputViewContainer.appendChild(inputView);
  container.appendChild(inputViewContainer);
});
