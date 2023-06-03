const chatBody = document.querySelector('.chat-body');
const userInput = document.querySelector('#user-input');
const sendBtn = document.querySelector('#send-btn');

const FIRST_ANSWER = ""
const SECOND_ANSWER = "Кажется тебе немного грустно, гуляй больше на свежем воздухе и держи выше нос!"
const THIRD_ANSWER = "Кажется дела у тебя идут неплохо и я этому очень рад :)"


const badCondition = [
    "Я всего лишь простой помощник, но, дорогой мой друг, кажется, что ты находишься не в самом лучшем распроложении духа. Предлагаю тебе воспользоваться услугой кампусного психолога.",
    "Конечно, я всего лишь бот, но я бы порекомендовал тебе обратиться к нашим специалистам, они точно тебе помогут",
]

const medCondition = [
    "Кажется тебе немного грустно, гуляй больше на свежем воздухе и держи выше нос!",
    "Всем нам иногда становится грустно и это нормально, но помни - если тебе станет хуже, наши специалисты готовы тебе помочь."
]

const goodCondition = [
    "Кажется дела у тебя идут неплохо и я этому очень рад :)",
    "Я очень за тебя рад!"
]

sendBtn.addEventListener('click', () => {
  const question = userInput.value;
  score = messageClassification(question);
  const answer = getAnswer(score);
  addMessage(question, 'user');
  addMessage(answer, 'bot');
  userInput.value = '';
  
});

function getAnswer(score) {
  let answer = 'Кажется я тебя не совсем понял, прости';
  console.log(score);
    var ind = Math.random()
    console.log(ind)
    if (ind <= 0.5) ind = 0
    else ind = 1
  if (score == 0) {
    answer = medCondition[ind];
  }

  else if (score < 0) {
    answer = badCondition[ind];
  }

  else {
    answer = goodCondition[ind];
  }

  return answer;
}

function addMessage(message, sender) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('chat-message');
  const messageText = document.createElement('p');
  messageText.textContent = message;
  messageContainer.appendChild(messageText);
  if (sender === 'bot') {
    messageContainer.classList.add('bot');
  }
  const answerContainer = document.createElement('div');
  answerContainer.classList.add('space');
  //answerContainer.classList.add('answer');
  messageContainer.appendChild(answerContainer);
  chatBody.appendChild(messageContainer);
}



function messageClassification(question) {
    
    const NEGATIVE = [
        "грустно",
        "печально",
        "вены",
        "депрессия",
        "суицид",
        "гуль"
    ]
    
    const POSITIVE = [
        "друзья",
        "весело",
        "счастлив",
        "солнце"
    ]

    question = question.toLowerCase();
    const req = question.split(' ');
    let score = 0;

    req.forEach(word => {
        console.log(word)
        if (NEGATIVE.includes(word)) {
            score -= 1;
        }

        if (POSITIVE.includes(word)) {
            score += 1;
        }
    });

    return score;
}

class Card {
    constructor({
      imageUrl,
      eventDescr,
      onDismiss,
      onLike,
      onDislike
    }) {
      this.imageUrl = imageUrl;
      this.eventDescr = eventDescr;
      this.onDismiss = onDismiss;
      this.onLike = onLike;
      this.onDislike = onDislike;
      this.#init();
    }
  
    #startPoint;
    #offsetX;
    #offsetY;
  
    #isTouchDevice = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    }
  
    #init = () => {
      const card = document.createElement('div');
      card.classList.add('card');
      const img = document.createElement('img');
      img.src = this.imageUrl;
      card.append(img);
      const description = document.createElement('div');
      // descr.className('desc');
      description.textContent = this.eventDescr;
      description.classList.add('desc');
      card.appendChild(description);
      this.element = card;
      if (this.#isTouchDevice()) {
        this.#listenToTouchEvents();
      } else {
        this.#listenToMouseEvents();
      }
    }
  
    #listenToTouchEvents = () => {
      this.element.addEventListener('touchstart', (e) => {
        const touch = e.changedTouches[0];
        if (!touch) return;
        const { clientX, clientY } = touch;
        this.#startPoint = { x: clientX, y: clientY }
        document.addEventListener('touchmove', this.#handleTouchMove);
        this.element.style.transition = 'transform 0s';
      });
  
      document.addEventListener('touchend', this.#handleTouchEnd);
      document.addEventListener('cancel', this.#handleTouchEnd);
    }
  
    #listenToMouseEvents = () => {
      this.element.addEventListener('mousedown', (e) => {
        const { clientX, clientY } = e;
        this.#startPoint = { x: clientX, y: clientY }
        document.addEventListener('mousemove', this.#handleMouseMove);
        this.element.style.transition = 'transform 0s';
      });
  
      document.addEventListener('mouseup', this.#handleMoveUp);
  
      this.element.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
    }
  
    #handleMove = (x, y) => {
      this.#offsetX = x - this.#startPoint.x;
      this.#offsetY = y - this.#startPoint.y;
      const rotate = this.#offsetX * 0.1;
      this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
      if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
        this.#dismiss(this.#offsetX > 0 ? 1 : -1);
      }
    }
  
    #handleMouseMove = (e) => {
      e.preventDefault();
      if (!this.#startPoint) return;
      const { clientX, clientY } = e;
      this.#handleMove(clientX, clientY);
    }
  
    #handleMoveUp = () => {
      this.#startPoint = null;
      document.removeEventListener('mousemove', this.#handleMouseMove);
      this.element.style.transform = '';
    }
  
    #handleTouchMove = (e) => {
      if (!this.#startPoint) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#handleMove(clientX, clientY);
    }
  
    #handleTouchEnd = () => {
      this.#startPoint = null;
      document.removeEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transform = '';
    }
  
    #dismiss = (direction) => {
      this.#startPoint = null;
      document.removeEventListener('mouseup', this.#handleMoveUp);
      document.removeEventListener('mousemove', this.#handleMouseMove);
      document.removeEventListener('touchend', this.#handleTouchEnd);
      document.removeEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transition = 'transform 1s';
      this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
      this.element.classList.add('dismissing');
      setTimeout(() => {
        this.element.remove();
      }, 1000);
      if (typeof this.onDismiss === 'function') {
        this.onDismiss();
      }
      if (typeof this.onLike === 'function' && direction === 1) {
        this.onLike();
      }
      if (typeof this.onDislike === 'function' && direction === -1) {
        this.onDislike();
      }
    }
  }

  const swiper = document.querySelector('#swiper');
  const like = document.querySelector('#like');
  const dislike = document.querySelector('#dislike');
  
  const urls = [
    'assets\img\pics\pic1.jpeg',
    'assets\img\pics\pic1.jpeg',
    'assets\img\pics\pic1.jpeg',
    'assets\img\pics\pic1.jpeg'
  ];
  
  const descr = [
    'Региональный уровень: Студенческий форум "Молодежь вдохновения" - это мероприятие, которое проводится в каждом регионе и собирает студентов из разных университетов и колледжей. Форум охватывает различные темы, включая лидерство, карьерное развитие, инновации и социальную ответственность.',
    'Региональный уровень: Студенческий фестиваль "ТалантЪ" - это мероприятие, которое предоставляет студентам платформу для демонстрации своих творческих способностей. Фестиваль включает конкурсы по музыке, танцам, театру, изобразительному искусству и другим областям творчества.',
    'Всероссийский уровень: Всероссийская олимпиада по научным исследованиям студентов - это престижное соревнование, где студенты со всей страны представляют свои научные исследования. Олимпиада охватывает широкий спектр научных областей и позволяет студентам продемонстрировать свои знания и умения.',
    'Международный уровень: Международная студенческая конференция по глобальным проблемам - это мероприятие, которое привлекает студентов из разных стран для обсуждения и поиска решений глобальных проблем, таких как изменение климата, бедность, здравоохранение и другие важные вопросы.'
  ]
  
  let cardCount = 0;
  
  function appendNewCard() {
    const card = new Card({
      imageUrl: urls[cardCount % 4],
      eventDescr: descr[cardCount % 4],
      onDismiss: appendNewCard,
      onLike: () => {
        like.style.animationPlayState = 'running';
        like.classList.toggle('trigger');
      },
      onDislike: () => {
        dislike.style.animationPlayState = 'running';
        dislike.classList.toggle('trigger');
      }
    });
    swiper.append(card.element);
    cardCount++;
  
    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
      card.style.setProperty('--i', index);
    });
  }
  
  for (let i = 0; i < 5; i++) {
    appendNewCard();
  }
  
  