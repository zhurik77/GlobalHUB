const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

const urls = [
  'https://i.imgur.com/uUJ5BMH.jpg',
  'https://i.imgur.com/dXldm1G.jpg',
  'https://i.imgur.com/CtmSul1.jpg',
  'https://i.imgur.com/RZrLxU5.jpg'
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

