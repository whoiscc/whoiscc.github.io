//

const patternList = [
  [/hello/i, (p) => p.waitSend('hi')],
  [/i think ([\w ]+)/i, (p, m) => p.waitSend('well, i also think ' + m[0])],
  [/do you like ([\w ]+)/i, (p, m) => p.waitSend('i don\'t know a lot about ' + m[0] + '...')],
  [/what (is|are) ([\w ]+)/i, (p, m) => p.waitSend(m[1] + ' ' + m[0] + ' not suitable for you to know')],
  [/there (is|are) ([\w ]+)/i, (p, m) => p.waitSend('i really hope i can get ' + m[1])],
  [/do you mean/i, (p) => p.waitSend('sorry it was a mistake to waitSend it to you')],
  [/what do you think (of|about) ([\w ]+)/i, (p, m) => p.waitSend('i think ' + m[1] + ' is just so-so')],
  [/(what do you think (of|about)|how do you like) ([\w ]+)/i, (p, m) =>
    p.waitSend('i think ' + m[2] + ' is pretty good')],
  [/^(can|could|would) you ([\w ]+)/i, (p, m) => p.waitSend('to ' + m[1] + ' may be a little hard for me...')],
  [/is there any/i, (p, m) => p.waitSend('i cannot imagine that...')],
  [/i don't know about ([\w ]+)/i, (p, m) => p.waitSend('there is something good kid shouldn\'t know, like ' + m[0])],
  [/([\w ]+) (don't|couldn't|cannot) ([\w ]+)/i, (p, m) => p.waitSend('i thought ' + m[0] + ' would ' + m[2])],
  [/do you want to ([\w ]+)/i, (p, m) => p.waitSend('is there any way to ' + m[0])],
  [/how (do|could|would) you (?!feel)([\w ]+)/i, (p, m) => p.waitSend('i think is more surprising that you ' + m[1])],
  [/are you ([\w ]+)/i, (p, m) => p.waitSend('would it be nice if i am ' + m[0])],
  [/^yes/i, (p) => p.waitSend('that\'s pretty good for you')],
  [/^no/i, (p) => p.waitSend('well...that\'s also pretty good for you')],
  [/i don't have ([\w ]+)/i, (p, m) => p.waitSend('well, ' + m[0] + ' is not essential after all')],
  [/i don't want to ([\w ]+)/i, (p, m) => p.waitSend('well, to ' + m[0] + ' is not necessary after all')],
  [/i ((?!\w+n't)[\w ]*) want ([\w ]+) to ([\w ]+)/i, (p, m) =>
    p.waitSend('indeed, you ' + m[0] + ' hope ' + m[1] + ' to ' + m[2])],
  [/how (is|are) ([\w ]+)/i, (p, m) => p.waitSend('there are many things more important than ' + m[1])],
  [/who (is|are) ([\w ]+)/i, (p, m) => p.waitSend('i know few people, not including ' + m[1])],
  [/you are ([\w ]+)/i, (p, m) => p.waitSend('is it good to be considered as ' + m[0])],
  [/thank/i, (p) => p.waitSend('don\'t thank me, only you can save yourself')],
  [/((it( is|'s))|(i( am|'m))) ([\w ]+) to ([\w ]+)/i, (p, m) =>
    p.waitSend('i\'m happy if you feel ' + m[5] + ' to ' + m[6])],
  [/how do you feel about ([\w ]+)/i, (p, m) => p.waitSend('i feel nothing strange about ' + m[0])],
  [/why$/i, (p) => p.waitSend('there is a lot of things that i don\'t know the reason')],
  [/why do you think ([\w ]+) (is|are) ([\w ]+)/i, (p, m) =>
    p.waitSend('is it wrong to think ' + m[0] + ' ' + m[1] + ' ' + m[2])],
  [/why do you think ([\w ]+)/i, (p, m) => p.waitSend('nevermind')],
  [/good (morning|afternoon|evening|night)( to you)?/, (p, m) => p.waitSend('good ' + m[0] + ' to you too')],
  [/that('s| is)( not)? ([\w ]+)/i, (p, m) =>
    p.waitSend('if you think that\'s ' + m[1] + ' ' + m[2] + ' then i have no idea')],
  [/(^(?!(what|who|where|when|why|how) )[\w ]*) (is|are) ([\w ]+)/i, (p, m) =>
    p.waitSend(m[0] + ' ' + m[2] + ' ' + m[3])],
  [/(^(?!(what|who|where|when|why|how) )[\w ]+) like(s)? ([\w ]+)/i, (p, m) =>
    p.waitSend('it\'s good for ' + m[0] + ' to like ' + m[3])],
  [/do you know ([\w ]+)/i, (p, m) => p.waitSend('could you tell me about ' + m[0])],
  [/i am ([\w ]+)/i, (p, m) => p.waitSend('it\'s good to know that you are ' + m[0])],
  [/i feel ([\w ]+)/i, (p, m) => p.waitSend('well, maybe it is not bad to feel ' + m[0])],
  [/how (could|can) ((the )?\w+) ([\w ]+)/i, (p, m) =>
    p.waitSend('maybe it not a bad thing that ' + m[1] + ' cannot ' + m[3])],
  [/([\w ]+) (can|could) ([\w ]+)/i, (p, m) =>
    p.waitSend('i don\'t even know that ' + m[0] + ' can ' + m[2])],
  [/what would you like to ([\w ]+)/i, (p, m) => p.waitSend('i think anything is ok')],
  [/what ([\w ]+) do you like/i, (p, m) => p.waitSend('i don\'t have specific taste in any ' + m[0])]
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
  // console.log(matchedList);
  if (matchedList.length == 0) {
    fallback = [
      'also pretty good',
      'same to me'
    ];
    p.waitSend(fallback[randomRange(0, fallback.length)])
  } else {
    const choice = randomRange(0, matchedList.length);
    const [pat, action] = matchedList[choice];
    matchedParts = sentence.match(pat).slice(1).map(
      (part) => part == undefined ? '' : part.toLowerCase().replace(/\b(you|me|i|my|your)\b/g, (match) => {
        switch (match) {
          case 'you': return 'me';
          case 'i': case 'me': return 'you';
          case 'my': return 'your';
          case 'your': return 'my';
        }
      })
    );
    console.log(matchedParts);
    action(p, matchedParts);
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

Context.prototype.waitSend = function(reply) {
  setTimeout(() => {
    this.send(reply);
  }, randomRange(500, 1000));
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
