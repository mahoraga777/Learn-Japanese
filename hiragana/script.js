// 1. The Data
const hiraganaData = [
    // Basic Vowels
    { char: 'あ', answers: ['a', 'あ'] },
    { char: 'い', answers: ['i', 'い'] },
    { char: 'う', answers: ['u', 'う'] },
    { char: 'え', answers: ['e', 'え'] },
    { char: 'お', answers: ['o', 'お'] },

    // K-column
    { char: 'か', answers: ['ka', 'か'] },
    { char: 'き', answers: ['ki', 'き'] },
    { char: 'く', answers: ['ku', 'く'] },
    { char: 'け', answers: ['ke', 'け'] },
    { char: 'こ', answers: ['ko', 'こ'] },

    // S-column
    { char: 'さ', answers: ['sa', 'さ'] },
    { char: 'し', answers: ['shi', 'si', 'し'] }, // 'si' often accepted in typing
    { char: 'す', answers: ['su', 'す'] },
    { char: 'せ', answers: ['se', 'せ'] },
    { char: 'そ', answers: ['so', 'そ'] },

    // T-column
    { char: 'た', answers: ['ta', 'た'] },
    { char: 'ち', answers: ['chi', 'ti', 'ち'] },
    { char: 'つ', answers: ['tsu', 'tu', 'つ'] },
    { char: 'て', answers: ['te', 'て'] },
    { char: 'と', answers: ['to', 'と'] },

    // N-column
    { char: 'な', answers: ['na', 'な'] },
    { char: 'に', answers: ['ni', 'に'] },
    { char: 'ぬ', answers: ['nu', 'ぬ'] },
    { char: 'ね', answers: ['ne', 'ね'] },
    { char: 'の', answers: ['no', 'の'] },

    // H-column
    { char: 'は', answers: ['ha', 'は'] },
    { char: 'ひ', answers: ['hi', 'ひ'] },
    { char: 'ふ', answers: ['fu', 'hu', 'ふ'] },
    { char: 'へ', answers: ['he', 'へ'] },
    { char: 'ほ', answers: ['ho', 'ほ'] },

    // M-column
    { char: 'ま', answers: ['ma', 'ま'] },
    { char: 'み', answers: ['mi', 'み'] },
    { char: 'む', answers: ['mu', 'む'] },
    { char: 'め', answers: ['me', 'め'] },
    { char: 'も', answers: ['mo', 'も'] },

    // Y-column
    { char: 'や', answers: ['ya', 'や'] },
    { char: 'ゆ', answers: ['yu', 'ゆ'] },
    { char: 'よ', answers: ['yo', 'よ'] },

    // R-column
    { char: 'ら', answers: ['ra', 'ら'] },
    { char: 'り', answers: ['ri', 'り'] },
    { char: 'る', answers: ['ru', 'る'] },
    { char: 'れ', answers: ['re', 'れ'] },
    { char: 'ろ', answers: ['ro', 'ろ'] },

    // W-column & N
    { char: 'わ', answers: ['wa', 'わ'] },
    { char: 'を', answers: ['wo', 'o', 'を'] }, // 'o' is often the sound, but 'wo' is the keystroke
    { char: 'ん', answers: ['n', 'nn', 'ん'] },

    // --- Dakuten (Voiced - " Tenten") ---

    // G-column
    { char: 'が', answers: ['ga', 'が'] },
    { char: 'ぎ', answers: ['gi', 'ぎ'] },
    { char: 'ぐ', answers: ['gu', 'ぐ'] },
    { char: 'げ', answers: ['ge', 'げ'] },
    { char: 'ご', answers: ['go', 'ご'] },

    // Z-column
    { char: 'ざ', answers: ['za', 'ざ'] },
    { char: 'じ', answers: ['ji', 'zi', 'じ'] },
    { char: 'ず', answers: ['zu', 'ず'] },
    { char: 'ぜ', answers: ['ze', 'ぜ'] },
    { char: 'ぞ', answers: ['zo', 'ぞ'] },

    // D-column
    { char: 'だ', answers: ['da', 'だ'] },
    { char: 'ぢ', answers: ['ji', 'di', 'dji', 'ぢ'] }, // Rarely used
    { char: 'づ', answers: ['zu', 'du', 'dzu', 'づ'] }, // Rarely used
    { char: 'で', answers: ['de', 'で'] },
    { char: 'ど', answers: ['do', 'ど'] },

    // B-column
    { char: 'ば', answers: ['ba', 'ば'] },
    { char: 'び', answers: ['bi', 'び'] },
    { char: 'ぶ', answers: ['bu', 'ぶ'] },
    { char: 'べ', answers: ['be', 'べ'] },
    { char: 'ぼ', answers: ['bo', 'ぼ'] },

    // --- Handakuten (Semi-voiced - "Maru") ---

    // P-column
    { char: 'ぱ', answers: ['pa', 'ぱ'] },
    { char: 'ぴ', answers: ['pi', 'ぴ'] },
    { char: 'ぷ', answers: ['pu', 'ぷ'] },
    { char: 'ぺ', answers: ['pe', 'ぺ'] },
    { char: 'ぽ', answers: ['po', 'ぽ'] }
];

// 2. Variables & Elements
let currentQuestion = null;
const charDisplay = document.getElementById('character-display');
const inputField = document.getElementById('user-input');
const feedbackMsg = document.getElementById('feedback-msg');
const nextBtn = document.getElementById('next-btn');

// 3. Function to load a question
function loadQuestion() {
    const randomIndex = Math.floor(Math.random() * hiraganaData.length);
    currentQuestion = hiraganaData[randomIndex];

    // Reset UI
    charDisplay.innerText = currentQuestion.char;
    charDisplay.classList.remove('correct-anim');
    
    inputField.value = '';
    inputField.disabled = false;
    inputField.classList.remove('wrong-anim');
    inputField.focus();

    feedbackMsg.innerText = '';
    nextBtn.style.display = 'none';
}

// 4. Function to check answer
function checkAnswer() {
    const userVal = inputField.value.trim().toLowerCase();
    if (!userVal) return; // Do nothing if empty

    inputField.disabled = true; // Lock input

    if (currentQuestion.answers.includes(userVal)) {
        // Correct
        charDisplay.classList.add('correct-anim');
        feedbackMsg.innerHTML = "Correct! 🎉";
        feedbackMsg.style.color = "#28a745";
    } else {
        // Wrong
        inputField.classList.add('wrong-anim');
        feedbackMsg.innerHTML = `Wrong! Answer: <b>${currentQuestion.answers[0]}</b>`;
        feedbackMsg.style.color = "#000000ff";
    }

    nextBtn.style.display = 'inline-block';
}

// 5. Event Listeners

// Check answer on Enter key
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Load next question on Tab key (if button is visible)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && nextBtn.style.display !== 'none') {
        e.preventDefault(); // Stop normal tab behavior
        loadQuestion();
    }
});

// Load next question on Button Click
nextBtn.addEventListener('click', loadQuestion);

// Start the game immediately
loadQuestion();

