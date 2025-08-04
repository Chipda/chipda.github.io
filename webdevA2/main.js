// Function to initialize the game
function setupGameArea() {
  // Initialize the game variables inside this function to ensure they are reloaded each time
  let score = 0;
  const scoreDisplay = document.getElementById('score');
  const gameContainer = document.getElementById('gameContainer');
  const startGameBtn = document.getElementById('startGameBtn');
  const items = ['food1', 'food2', 'food3', 'bomb'];

  // Difficulty variables
  let itemInterval = 1000; // ms
  let fallSpeed = 3; // seconds
  let gameInterval;

  const leaderboardForm = document.getElementById('leaderboardForm');
  const leaderboardList = document.getElementById('leaderboardList');
  const playerNameInput = document.getElementById('playerName');

  // Store scores in memory (optional: save in localStorage)
  const leaderboard = [];

  // Handle form submission
  leaderboardForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop the form from refreshing the page

    const name = playerNameInput.value.trim();
    if (name === "") {
      playerNameInput.focus();
      return;
    }

    leaderboard.push({ name, score });

    // Sort leaderboard highest to lowest
    leaderboard.sort(function(a, b) { return b.score - a.score; });

    // Update leaderboard list display
    var leaderboardHtml = "";
    for (var i = 0; i < leaderboard.length; i++) {
      leaderboardHtml += '<li><strong>' + leaderboard[i].name + '</strong>: ' + leaderboard[i].score + '</li>';
    }
    leaderboardList.innerHTML = leaderboardHtml;

    // Clear the input field
    playerNameInput.value = "";

    // Show leaderboard

    leaderboardForm.style.display = 'none';
    const leaderboardDiv = document.getElementById('leaderboard');
    if (leaderboardDiv) leaderboardDiv.style.display = 'block';
  });


  // Function to generate a random item
  function createItem() {
    var itemType = items[Math.floor(Math.random() * items.length)];
    var item = document.createElement('div');
    item.classList.add('game-item', 'icon-' + itemType);
    item.setAttribute('data-type', itemType);

    // Randomize position
    var leftPosition = Math.floor(Math.random() * (gameContainer.offsetWidth - 60)); // 60px is the width of the item
    item.style.left = leftPosition + 'px';

    // Add item to the game container
    gameContainer.appendChild(item);

    // Set the fall animation with dynamic speed
    item.style.animation = 'fall ' + fallSpeed + 's linear forwards';

    // Event listener to handle clicks
    item.addEventListener('click', handleClick);

    // Remove item after animation ends
    item.addEventListener('animationend', function() {
      item.remove();
    });
  }

  // Function to spawn items and gradually increase speed
  function spawnItemsFaster() {
    createItem();
    if (itemInterval > 300) { // Minimum speed cap
      clearInterval(gameInterval);
      itemInterval -= 50;
      fallSpeed = Math.max(1, fallSpeed - 0.1); // Cap at 1s fall speed
      gameInterval = setInterval(spawnItemsFaster, itemInterval);
    }
  }


  // Handle clicking an item (gain or lose points)
  function handleClick(event) {
    const item = event.target;
    const itemType = item.getAttribute('data-type');

    if (itemType === 'bomb') {
      score -= 3;
      new Audio("audio/bombsound.mp3").play();
    } else {
      score += 1;
      new Audio("audio/foodsound.mp3").play();
    }
    // Update score display
    scoreDisplay.textContent = 'Score: ' + score;

    // Remove the item immediately after click
    item.remove();
  }

  function stopGame() {
    clearInterval(gameInterval);
    startGameBtn.disabled = false;
    scoreDisplay.textContent += ' | Game Over!';

    // Show leaderboard form after game ends
    leaderboardForm.style.display = 'block';
    playerNameInput.focus();
  }

  // Function to start the game
  function startGame() {
    startGameBtn.disabled = true; // Disable the start button once the game starts
    // Reset difficulty and score
    itemInterval = 1000;
    fallSpeed = 3;
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    // Start spawning items
    gameInterval = setInterval(spawnItemsFaster, itemInterval);
    // Stop the game after 1 minute (60000 ms)
    setTimeout(stopGame, 60000);
  }

  // Add event listener to start the game when the button is clicked
  startGameBtn.addEventListener('click', startGame);
}


const mainContent = document.getElementById("mainContent");
const topicButtons = document.querySelectorAll("[data-topic]");
const btnFS = document.getElementById("btnFS");
const btnWS = document.getElementById("btnWS");

const topics = {
  home: `
      <div class="welcomeBox">
      <h2>Welcome</h2>
      <p>Explore famous aspects of Japan and test your knowledge!</p>
      <img src="images/welcome.png" alt="welcome">
      <p>To begin, click on one of the buttons under the title!</p>
      </div>
  `,
  learn: `
  <div class="welcomeBox">
    <h2>Learn About Japan</h2>
    <p>Japan is home to many famous things. Examples include Mount Fuji, Tokyo Tower, and Fushimi Inari Shrine.</p>
    <p>Can you remember all of them?</p>
    <p>Click the buttons "History", "Culture" or "Cuisine" to explore the  different aspects of Japan!</p>
    </div>
  `,
  game: `<!-- Game Area -->
<section id="gameArea" class="game-area">
  <p>FOOD Ninja Game</h2>
  <br>
  <p id="score">Score: 0</p>
  <button id="startGameBtn">Start Game</button> <!-- Start Game Button -->
  <div id="gameContainer" class="game-container"></div>
  <!-- Leaderboard Form -->
  <form id="leaderboardForm" class="leaderboard-form">
    <label for="playerName">Enter your name:</label>
    <input type="text" id="playerName" required>
    <button type="submit">Submit Score</button>
  </form>

  <!-- Leaderboard Display -->
  <div id="leaderboard" class="leaderboard">
    <h3>Leaderboard</h3>
    <ul id="leaderboardList"></ul>
  </div>
</section>


`,
  history: `
  <h2>Historical Landmarks</h2>
  <div class="flexRows">
    <div class="flexRow">
      <img src="images/himeji.jpg" alt="Himeji Castle">
      <br>
      <strong>Himeji Castle</strong>
      <br>
      <p>
        Himeji Castle, often called the “White Heron Castle” for its brilliant white plastered walls, is widely regarded as Japan’s most spectacular and well‑preserved feudal structure, comprising over 80 buildings connected by a network of winding paths and three interconnected towers. It was built between 1581 and 1609 through large-scale renovations by Toyotomi Hideyoshi’s heir, Ikeda Terumasa, on the foundations of earlier fortifications dating to the 14th century. Its ingenious defensive systems, maze-like layout, and ability to withstand disasters, including surviving a bomb during World War II that failed to detonate have earned it both National Treasure and UNESCO World Heritage status. 
      </p>
    </div>
    <div class="flexRow">
      <img src="images/inari.jpg" alt="Fushimi Inari Shrine">
       <br>
      <strong>The Inari Shrines' many gates</strong>
      <br>
      <p>
        Fushimi Inari Taisha is one of Japan’s oldest and most iconic shrines, originally founded in 711 AD. It is renowned for its thousands of vibrant vermilion torii gates that form scenic tunnels stretching for about 4 kilometers up Mount Inari. Visitors walk through these winding paths past small shrines and stone fox statues, often considered messengers of Inari, creating a deeply spiritual experience embedded in centuries of history.
      </p>
    </div>
    <div class="flexRow">
      <img src="images/toshogu.jpg" alt="Nikkō Tōshō-gū Shrine">
      <br>
      <strong>Nikkō Tōshō-gū Shrine</strong>
      <br>
      <p>
        Nikkō Tōshō‑gū was established in 1617 to enshrine Tokugawa Ieyasu, the founder of the Tokugawa Shogunate, and is famous for its lavish architectural ornamentation—including gilded elements and intricate wood carvings. Located in the forested hills of Nikkō, it became a symbol of power and spiritual reverence, and along with its associated structures, is designated both a UNESCO World Heritage Site and a National Treasure of Japan due to its historical and cultural significance.
      </p>
    </div>
  </div>
  `,
  culture: `
  <h2>Culture</h2>
  <div class="flexRows">
    <div class="flexRow">
      <img src="images/tea.jpg" alt="Japanese Tea Ceremony">
      <strong>Tea</strong>
      <p>
        The Japanese tea ceremony known as chanoyu, chadō, or sadō, elevates the simple act of preparing and serving matcha into a refined art form rooted in Zen Buddhist aesthetics and the concepts of harmony, respect, purity, and tranquility. It features a choreographed ritual performed in a traditional chashitsu (tea room), where utensils are meticulously handled, guests purify themselves, and seasonal scrolls or flower arrangements are appreciated. It became a cultural pinnacle during the 16th century under Sen no Rikyu, who cemented its spiritual and philosophical foundations while developing rituals like sliding through the modest nijiriguchi entrance as a gesture of humility.
      </p>
    </div>
    <div class="flexRow">
      <img src="images/kimono.png" alt="Kimono">
      <strong>Kimonos worn by people</strong>
      <p>
        The kimono, Japan’s signature garment, literally means “thing to wear” and reflects centuries of aesthetic evolution. Worn left over right, except at funerals, and secured with an obi sash, its styles vary by occasion, season, and wearer’s status. Paired traditionally with sandals like zōri or geta, kimono ensembles are artful statements, often including layers, patterns, and accessories that convey respect, social messaging, and a connection to Japanese identity.
      </p>
    </div>
    <div class="flexRow">
      <img src="images/gion.jpg" alt="Gion Matsuri">
      <strong>Nikkō Matsuri</strong>
      <p>
        Gion Matsuri, held annually in July in Kyoto, dates back to 869 CE when it was first organized as a purification ritual during an epidemic. Today, it’s celebrated with elaborate yamahoko floats, some weighing over 12 tons paraded through the city by teams of locals. With bustling street stalls, shrine processions, and traditional performances, the festival remains one of Japan’s most iconic cultural events, merging religious devotion with communal celebration.
      </p>
    </div>
  </div>
  `,
  cuisine: `
<h2>Cuisine</h2>
<div class="flexRows">
  <div class="flexRow">
    <div class="spriteWrapper">
      <div class="sprite icon-sushi" role="img" aria-label="Sushi"></div>
    </div>
    <p>
      Sushi traces its origins to a form of fermented fish stored with rice, but evolved over centuries into the refined dish we know today: fresh seafood atop vinegared rice, often seasoned with wasabi and seaweed. While modern sushi took shape in the Edo period, its roots extend deeper into Japanese preservation techniques, and now it’s celebrated worldwide as both everyday food and haute cuisine.
    </p>
  </div>

  <div class="flexRow">
    <div class="spriteWrapper">
      <div class="sprite icon-ramen" role="img" aria-label="Ramen"></div>
    </div>
    <p>
      Originally imported from China, ramen was popularized in Japan during the Meiji era and has since become a national culinary icon. With thousands of ramen shops in Tokyo alone—and more than 24,000 across Japan—it features broths ranging from rich tonkotsu to light shoyu, noodles of varied texture, and toppings like chashu pork, green onions, and soft-boiled eggs.
    </p>
  </div>

  <div class="flexRow">
    <div class="spriteWrapper">
      <div class="sprite icon-tempura" role="img" aria-label="Tempura"></div>
    </div>
    <p>
      Tempura was introduced to Japan by Portuguese traders in the 16th century and quickly became a refined Japanese delicacy. It’s made by lightly battering and frying seafood or vegetables at high temperature to create a crisp, delicate coating that highlights the natural flavor of seasonal ingredients—and today it's prized for its balance of texture, flavor, and aroma.
    </p>
  </div>
</div>



  `
};

const learnRelatedTopics = new Set(["learn", "history", "culture", "cuisine"]);
const sideTopics = document.getElementById("learnSubTopics");

topicButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var topic = btn.dataset.topic;
    mainContent.innerHTML = topics[topic] || "<p>Topic not found.</p>";

    if (learnRelatedTopics.has(topic)) {
      sideTopics.style.display = "flex";
    } else {
      sideTopics.style.display = "none";
    }

    // Setup the game logic when "game" topic is clicked
    if (topic === "game") {
      setupGameArea(); // Correct function to call for initializing the game
    }
  });
});

// Fullscreen
btnFS.addEventListener("click", function () {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
});
btnWS.addEventListener("click", function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});

// === HAMBURGER MENU TOGGLE ===
const hamBtn = document.getElementById("hamIcon");
const menuList = document.querySelector(".topnav ul");

hamBtn.addEventListener("click", function () {
  if (menuList.classList.contains("menuShow")) {
    menuList.classList.remove("menuShow");
    hamBtn.textContent = "☰ Open Menu";
  } else {
    menuList.classList.add("menuShow");
    hamBtn.textContent = "Close Menu";
  }
});
