/* =====================================================================
 *  THE MAP — content & configuration
 *  ---------------------------------------------------------------------
 *  THIS is the only file you need to edit to personalize everything:
 *  names, the secret bottle word, every clue, every quiz, and the
 *  final letter. No programming needed — just change the text in quotes.
 *  Lines marked  // <-- EDIT  are the ones you most likely want to change.
 *
 *  TIP — moving a pin: open Google Maps, long-press the exact spot, and
 *  copy the two numbers it shows into  lat:  and  lon:  below.
 * ===================================================================== */

window.CONFIG = {
  herName: "Diana ❤️",            // <-- EDIT  her name / a pet name
  fromName: "Ilya",                // <-- EDIT  how you sign off

  /* The secret word you write on the note INSIDE the buried bottle.
     She types it to unlock the journey. Keep it personal, and DO NOT
     write the destination on the note — let the app reveal it. */
  bottleCodeword: "SAIL",        // <-- EDIT  (case-insensitive)

  /* Map look: "voyager" (soft colour) | "positron" (light & minimal) | "osm" */
  mapStyle: "voyager",

  /* The heartfelt letter shown at the very end, once every station is done.
     Each string is one paragraph. Write from the heart. */
  letter: [
    "By now you've sailed to the islands, stood on a hidden cliff, fed a whole park of animals, climbed a tower above the bog, and pedalled across a wild cape to a lighthouse standing in the sea — just to get here, to the final pin.",
    "I built this whole silly, wonderful map for one reason: I love taking you places, but more than that, I love watching you light up when we get there. That's still my favourite view. Not the cliffs, not the sea. You.",
    "Thank you for saying yes to the adventures, big and small.",
  ],
  letterSignoff: "All my love,",   // <-- EDIT
  finaleNote: "P.S. The picnic is already packed. All you have to do is to enjoy it with me.",

  // Shown the evening she finds the box (after the secret word) — keeps tomorrow a mystery.
  standby: {
    title: "That's all for tonight 🌙",
    text: "The map isn't finished with you — but the rest sleeps until morning. Keep the letter safe, pack a small bag and your bike, and rest. When you wake up, open this again and the next secret will be waiting. 💛",
  },
};

/* =====================================================================
 *  THE STATIONS — each one reveals the next.
 *  ---------------------------------------------------------------------
 *  Order:  Stroomi (today)  →  Üügu → Zoo → Bog tower → Bike ride → Sunset
 *
 *  radius:  how close (metres) she must be for GPS to unlock it.
 *           Bigger = more forgiving. She can ALWAYS continue manually if
 *           GPS is being difficult, so nothing ever blocks the day.
 *  pin:     "zone" = show only a fuzzy circle (she explores to find it)
 *           "pin"  = show an exact marker
 *  quiz:    a little question she answers on-site to reveal the next clue.
 *           Defaults work out of the box — but swapping in your own
 *           inside-jokes is where the magic is. "answers" can list several
 *           acceptable spellings; matching ignores case & punctuation.
 *           Add  choices: ["A","B","C"]  for tappable multiple-choice (the
 *           correct option must also appear in "answers").
 *  tile:    the emoji + colour that becomes her "memory tile" in the final
 *           mosaic. Add  photo: "assets/photos/yourfile.jpg"  for a real photo.
 * ===================================================================== */

window.STATIONS = [

  /* ---- TODAY, in Tallinn ------------------------------------------- */
  {
    id: "stroomi",
    phase: "today",
    name: "Stroomi rand",
    lat: 59.4430894, lon: 24.6840831,
    radius: 150,
    pin: "zone",
    tile: { emoji: "📦", gradient: "linear-gradient(135deg,#7b8cff,#c8a2ff)" },
    clue: {
      title: "Our story starts by the sea",
      text: "Good morning, my love. Today there is only one place on this whole map. Go to where the city meets the water — Stroomi beach — and walk down onto the sand. When you're close, I'll show you exactly where to look. 💛",
    },
    arrive: {
      title: "You're here — now find the box 📦",
      text: "Somewhere right around where you're standing, a little box is buried in the sand. This is exactly what to look for — match the photo, then dig. Inside is a letter, and a poem with a secret folded into it. 💛",   // <-- EDIT to match where you hide it
      photo: "assets/photos/box.jpg",   // <-- a close-up of the hiding spot (drop a JPG named box.jpg into assets/photos/)
    },
    code: true,
    codePrompt: "The poem in the letter hides one word. Read it, then type the word it spells:",
    codeHint: "Take the first letter of each of the first four lines, top to bottom — they spell it. 💛",   // <-- shown if she taps “Need a hint?”
    reveal: {
      title: "This is only the beginning… ✨",
      text: "But the map isn't done with you yet. Keep that letter close, pack a small bag and your bike, and get a good night's sleep — because tomorrow it wakes up again, and the real adventure begins. I'll be guiding you the whole way, one secret at a time. — me 💛",
    },
  },

  /* ---- TOMORROW, the island quest (5 stops) ------------------------ */
  {
    id: "uugu",
    phase: "tomorrow",
    name: "Üügu cliff",
    lat: 58.6711133, lon: 23.2404088,
    radius: 250,
    pin: "pin",
    tile: {
      emoji: "🌊",
      gradient: "linear-gradient(135deg,#2a9d8f,#7fd8c8)",
      photo: "assets/photos/climb_anywhere.jpg",
    },
    clue: {
      title: "Across the water, up to a cliff",
      text: "First we sail across to Muhu. Then we make for Üügu — a low limestone cliff most people drive straight past, where the sea turns to glass in the afternoon light. Meet me at the edge.",
    },
    arrive: {
      title: "The edge of Muhu 🌊",
      text: "Careful by the edge. Sit with me a minute and just watch the water — this is one of those quiet places the island keeps for people who bother to look.",
    },
    quiz: {
      // PERSONAL — multiple choice. "choices" are shown as buttons; the correct one must be in "answers".
      question: "Where did we go on our very first trip together?",
      choices: ["Helsinki", "Rimini", "Grindelwald", "Pärnu"],
      answers: ["Grindelwald"],
      hint: "Think all the way back — our first proper getaway.",
    },
    letterLine: "I'd climb to the edge of anywhere for a view like you.",
  },
  {
    id: "zoo",
    phase: "tomorrow",
    name: "Saaremaa Zoo",
    lat: 58.5626266, lon: 23.0285236,
    radius: 300,
    pin: "pin",
    tile: {
      emoji: "🐪",
      gradient: "linear-gradient(135deg,#e9a23b,#ffd58a)",
      photo: "assets/photos/zoo.jpg",
    },    clue: {
      title: "A promise kept",
      text: "Over the causeway to Saaremaa and straight to the place I promised you: a whole park of animals — camels, alpacas, lemurs, the softest rabbits — that you actually get to feed and pet. Let's go be kids for a while. (Lunch right after — I'm already starving.)",
    },
    arrive: {
      title: "Say hello 🐪",
      text: "Find the friendliest face in the park and feed them for me. No rush — the rest of the day can wait outside the gate.",
    },
    quiz: {
      question: "What's the most kid-at-heart thing we love doing together?",
      open: true,
      placeholder: "write anything…",
      response: "Yes — and honestly, it doesn't matter what you wrote. I love doing every one of those things with you. 💛",
    },
    letterLine: "You make me feel like a kid again.",
  },
  {
    id: "vaatetorn",
    phase: "tomorrow",
    name: "Mullutu-Loode bog tower",
    lat: 58.2425752, lon: 22.4250126,   // <-- EDIT if the tower pin is off; long-press it in Google Maps
    radius: 250,
    pin: "pin",
    tile: {
      emoji: "🌾",
      gradient: "linear-gradient(135deg,#52a447,#a8d672)",
      photo: "assets/photos/watchtower.jpg",
    },
    clue: {
      title: "Above the bog",
      text: "Now something quieter: a wooden tower over the Mullutu-Loode wetlands. We follow the boardwalk out across the bog and climb up — reeds, water, birds, and almost no one else. Bring your eyes and your quiet voice.",
    },
    arrive: {
      title: "Up top 🌾",
      text: "From up here you can see for miles. Spot a bird, take a breath — and when you're ready, one little question stands between you and the next clue.",
    },
    quiz: {
      question: "From the top of the tower, what's the best thing in sight?",
      choices: ["The birds 🐦", "The endless reeds 🌾", "You, obviously 💛"],
      answers: ["you obviously", "you, obviously 💛", "you"],
      hint: "Look at who's next to you, not out at the bog.",
    },
    letterLine: "Even from the highest tower, you're still the best thing in sight.",
  },
  {
    id: "harilaid",
    phase: "tomorrow",
    name: "Harilaid — the ride",
    lat: 58.4737700, lon: 21.9022600,   // Harilaid trailhead car park — no cars beyond the barrier
    radius: 300,
    pin: "pin",
    tile: {
      emoji: "🚲",
      gradient: "linear-gradient(135deg,#2e8b9e,#86d0c4)",
      photo: "assets/photos/bike.jpg",
    },
    clue: {
      title: "Now — the bikes",
      text: "For the last stretch we drive out to the wild north-west, to the edge of Vilsandi park, and leave the car at the Harilaid barrier. No cars go past here — only us and the bikes. Grab the picnic: we're riding out to the sea.",
    },
    arrive: {
      title: "Off the road, onto the trail 🚲",
      text: "Helmets on, picnic packed. From here a sandy trail runs about five kilometres across the cape — woods, dunes, and not another soul. Follow it north toward the water. (Soft sand near the end? We walk the bikes and laugh about it.)",
    },
    quiz: {
      // PERSONAL — multiple choice. "choices" are shown as buttons; the correct one must be in "answers".
      question: "How many countries have we explored together so far (incl. Estonia)?",
      choices: ["9", "15", "18", "21"],
      answers: ["15"],
      hint: "Let's go one by one together with Google Maps",
    },
    letterLine: "Side by side, at our own pace — that's my favourite way to go anywhere.",
  },
  {
    id: "kiipsaare",
    phase: "tomorrow",
    name: "Kiipsaare lighthouse",
    lat: 58.4957607, lon: 21.8410796,
    radius: 500,
    pin: "pin",
    finale: true,
    tile: {
      emoji: "🗼",
      gradient: "linear-gradient(135deg,#e7677e,#ffc187)",
      photo: "assets/photos/finale.jpg",
    },
    clue: {
      title: "Ride to the leaning lighthouse",
      text: "Keep going until the trees give way to open dunes and you see it: a white lighthouse standing right out in the sea, leaning as if it's tired from all the waiting. That's Kiipsaare — the end of the map. Lay out the picnic. We made it.",
    },
    arrive: {
      title: "For you 💌",
      text: "You rode all the way to the edge of the country, to a lighthouse standing in the sea. There's nowhere further to go — and nowhere I'd rather be.",
    },
    letterLine: "And at the very edge of everything, it's still just you and me.",
  },
];

/* ---------------------------------------------------------------------
 * OPTIONAL — the ferry crossing as a tiny bonus moment (no quiz). If you
 * want it, paste this object into the list above, right after "stroomi":
 *
 *   {
 *     id: "ferry", phase: "tomorrow", name: "The crossing",
 *     lat: 58.5732, lon: 23.4507, radius: 2200, pin: "pin",
 *     tile: { emoji: "🚢", gradient: "linear-gradient(135deg,#3a7bd5,#9fd4ff)" },
 *     clue:   { title: "To the islands", text: "We drive west to Virtsu and roll the car onto the ferry. Watch the sea — something opens out on the water." },
 *     arrive: { title: "Between two shores 🚢", text: "Mainland behind us, islands ahead. Quick — a selfie on the deck before we dock." },
 *     letterLine: "I'd cross any water to be beside you.",
 *   },
 * ------------------------------------------------------------------- */
