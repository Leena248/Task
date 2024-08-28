const images = [
  "https://th.bing.com/th/id/OIP.TzP2op3lkhlTh6oOHamacAHaHa?rs=1&pid=ImgDetMain",
  "https://swall.teahub.io/photos/small/216-2168073_and-white-small-cat-hd-wallpaper-cat-drawing.jpg",
  "https://youthinkyoucanblog.files.wordpress.com/2014/06/dsc_2070cvrtcopy-copywm.jpg?w=640",
  "https://th.bing.com/th/id/OIP.jb81xPJHfHGHYFfuZdDjzgHaHa?w=960&h=960&rs=1&pid=ImgDetMain",
  "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/Funny-Cat-Hidden.jpg",
  "https://bestfriends.org/sites/default/files/styles/tile/public/tile/BKNB-A-39353-1.png?h=9b4b9cac&itok=Jfv6-Kzl",
  "https://th.bing.com/th/id/R.ba527af4e454191c358a5e67d8c16d8a?rik=vqGGjs%2bJHNS%2bMg&riu=http%3a%2f%2f30.media.tumblr.com%2ftumblr_li6gs5suHN1qejbiro1_500.jpg&ehk=CyWVqpJHtZE0BHTk5ATIO4epmROctFusqVdtee%2b8nuU%3d&risl=&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/OIP.zgysSnKX-UZrknYanCiNKQHaIF?w=550&h=601&rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.TzP2op3lkhlTh6oOHamacAHaHa?rs=1&pid=ImgDetMain",
  "https://swall.teahub.io/photos/small/216-2168073_and-white-small-cat-hd-wallpaper-cat-drawing.jpg",
  "https://youthinkyoucanblog.files.wordpress.com/2014/06/dsc_2070cvrtcopy-copywm.jpg?w=640",
  "https://th.bing.com/th/id/OIP.jb81xPJHfHGHYFfuZdDjzgHaHa?w=960&h=960&rs=1&pid=ImgDetMain",
  "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/Funny-Cat-Hidden.jpg",
  "https://bestfriends.org/sites/default/files/styles/tile/public/tile/BKNB-A-39353-1.png?h=9b4b9cac&itok=Jfv6-Kzl",
  "https://th.bing.com/th/id/R.ba527af4e454191c358a5e67d8c16d8a?rik=vqGGjs%2bJHNS%2bMg&riu=http%3a%2f%2f30.media.tumblr.com%2ftumblr_li6gs5suHN1qejbiro1_500.jpg&ehk=CyWVqpJHtZE0BHTk5ATIO4epmROctFusqVdtee%2b8nuU%3d&risl=&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/OIP.zgysSnKX-UZrknYanCiNKQHaIF?w=550&h=601&rs=1&pid=ImgDetMain",
];

let flippedCards = [];
let matchedPairs = 0;
let flipTimeout;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  const shuffledImages = shuffle(images);
  shuffledImages.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          <div class="front"></div>
          <div class="back" style="background-image: url('${image}')"></div>
      `;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains("flip")) return;

  card.classList.add("flip");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  } else {
    flipTimeout = setTimeout(() => {
      card.classList.remove("flip");
      flippedCards = [];
    }, 5000);
  }
}

function checkMatch() {
  clearTimeout(flipTimeout);

  const [firstCard, secondCard] = flippedCards;
  const isMatch =
    firstCard.querySelector(".back").style.backgroundImage ===
    secondCard.querySelector(".back").style.backgroundImage;

  if (isMatch) {
    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");
    matchedPairs++;
    if (matchedPairs === images.length / 2) {
      document.getElementById("message").textContent = "You won!";
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 1000);
  }

  flippedCards = [];
}

function resetGame() {
  matchedPairs = 0;
  document.getElementById("message").textContent = "";
  createBoard();
}

document.getElementById("reset-btn").addEventListener("click", resetGame);

createBoard();
