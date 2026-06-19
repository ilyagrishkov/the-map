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
  herName: "my love",            // <-- EDIT  her name / a pet name
  fromName: "me",                // <-- EDIT  how you sign off

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
    "Thank you for saying yes to the adventures, big and small. Here's to a hundred more maps — and to always being the one riding beside you.",
  ],
  letterSignoff: "All my love,",   // <-- EDIT
  finaleNote: "P.S. The bikes and the picnic are already packed. All you have to do is come with me.",
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
    tile: { emoji: "🍾", gradient: "linear-gradient(135deg,#7b8cff,#c8a2ff)" },
    clue: {
      title: "Our story starts by the sea",
      text: "Good morning, my love. Today there is only one place on this whole map. Go to where the city meets the water — our Stroomi beach — and walk down onto the sand. When you're close, I'll show you exactly where to look. 💛",
    },
    arrive: {
      title: "You're here — now dig 🏖️",
      text: "Find the big grey rock near the water, take ten steps toward the sea, and dig a little in the sand. Something is waiting for you in a bottle.",   // <-- EDIT to match where you bury it
    },
    code: true,
    codePrompt: "Type the word written on the note inside the bottle:",
    reveal: {
      title: "We're going on an adventure ✨",
      text: "Pack a bag and your bike, my love — tomorrow we sail to the islands. Saaremaa and Muhu are waiting: hidden cliffs, a whole park of animals to pet, a tower over the bog, and a wild cape we ride out to on two bikes. This little map will guide us, one secret at a time. Sleep well. Tomorrow, the real adventure begins. — me 💛",
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
      // photo: "assets/photos/uugu.jpg",   // <-- add a JPG named uugu.jpg in assets/photos/, then delete the //
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
      // PERSONAL inside-joke ① — keep the question or change it, but PUT HER ANSWER below.
      question: "Where did we go on our very first trip together?",
      answers: ["CHANGE-ME"],   // <-- EDIT: the place; add a few spellings e.g. "Lapland","Lapimaa"
      hint: "Think all the way back — our first proper getaway.",   // <-- EDIT (optional)
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
      // photo: "assets/photos/zoo.jpg",   // <-- add a JPG named zoo.jpg in assets/photos/, then delete the //
    },
    clue: {
      title: "A promise kept",
      text: "Over the causeway to Saaremaa and straight to the place I promised you: a whole park of animals — camels, alpacas, lemurs, the softest rabbits — that you actually get to feed and pet. Let's go be kids for a while. (Lunch right after — I'm already starving.)",
    },
    arrive: {
      title: "Say hello 🐪",
      text: "Find the friendliest face in the park and feed them for me. No rush — the rest of the day can wait outside the gate.",
    },
    quiz: {
      question: "Finish it: “I love you to the ____ and back.”",
      choices: ["The moon 🌙", "Saaremaa 🐑", "The ferry and back ⛴️"],
      answers: ["the moon", "the moon 🌙", "moon"],
      hint: "A certain cow once jumped over it.",
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
      // photo: "assets/photos/bog.jpg",   // <-- add a JPG named bog.jpg in assets/photos/, then delete the //
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
      // photo: "assets/photos/ride.jpg",   // <-- add a JPG named ride.jpg in assets/photos/, then delete the //
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
      // PERSONAL inside-joke ② — keep the question or change it, but PUT THE ANSWER below.
      question: "How many countries have we explored together so far?",
      answers: ["CHANGE-ME"],   // <-- EDIT: the number, e.g. "7" and "seven"
      hint: "Count the magnets on our fridge.",   // <-- EDIT (optional)
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
      // photo: "assets/photos/finale.jpg",   // <-- add a JPG named finale.jpg in assets/photos/, then delete the //
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
