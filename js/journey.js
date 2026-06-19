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
    "By now you've sailed to the islands, stood on a hidden cliff, fed a whole park of animals, climbed a tower above the bog, and ridden the coast all the way to this last stretch of sand — just to get here, to the final pin.",
    "I built this whole silly, wonderful map for one reason: I love taking you places, but more than that, I love watching you light up when we get there. That's still my favourite view. Not the cliffs, not the sea. You.",
    "Thank you for saying yes to the adventures, big and small. Here's to a hundred more maps — and to always being the one riding beside you.",
  ],
  letterSignoff: "All my love,",   // <-- EDIT
  finaleNote: "P.S. The bikes are already in the car. All you have to do is come with me.",
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
      text: "Pack a bag and your bike, my love — tomorrow we sail to the islands. Saaremaa and Muhu are waiting: hidden cliffs, a whole park of animals to pet, a tower over the bog, and a coast made for two bikes and a sunset. This little map will guide us, one secret at a time. Sleep well. Tomorrow, the real adventure begins. — me 💛",
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
    tile: { emoji: "🌊", gradient: "linear-gradient(135deg,#2a9d8f,#7fd8c8)" },
    clue: {
      title: "Across the water, up to a cliff",
      text: "First we sail across to Muhu. Then we make for Üügu — a low limestone cliff most people drive straight past, where the sea turns to glass in the afternoon light. Meet me at the edge.",
    },
    arrive: {
      title: "The edge of Muhu 🌊",
      text: "Careful by the edge. Sit with me a minute and just watch the water — this is one of those quiet places the island keeps for people who bother to look.",
    },
    quiz: {
      question: "Which little island are we standing on right now?",
      answers: ["Muhu"],
      hint: "It's the island the ferry brings you to, just before the causeway.",
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
    tile: { emoji: "🐪", gradient: "linear-gradient(135deg,#e9a23b,#ffd58a)" },
    clue: {
      title: "A promise kept",
      text: "Over the causeway to Saaremaa and straight to the place I promised you: a whole park of animals — camels, alpacas, lemurs, the softest rabbits — that you actually get to feed and pet. Let's go be kids for a while. (Lunch right after — I'm already starving.)",
    },
    arrive: {
      title: "Say hello 🐪",
      text: "Find the friendliest face in the park and feed them for me. No rush — the rest of the day can wait outside the gate.",
    },
    quiz: {
      question: "Fill in the blank: “I love you to the ____ and back.”",
      answers: ["moon"],
      hint: "It comes out at night and the cow jumped over it. 🌙",
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
    tile: { emoji: "🌾", gradient: "linear-gradient(135deg,#52a447,#a8d672)" },
    clue: {
      title: "Above the bog",
      text: "Now something quieter: a wooden tower over the Mullutu-Loode wetlands. We follow the boardwalk out across the bog and climb up — reeds, water, birds, and almost no one else. Bring your eyes and your quiet voice.",
    },
    arrive: {
      title: "Up top 🌾",
      text: "From up here you can see for miles. Spot a bird, take a breath — and when you're ready, one little question stands between you and the next clue.",
    },
    quiz: {
      question: "What's the English word for soft, wet, spongy land like this? (3 letters)",
      answers: ["bog"],
      hint: "It rhymes with dog.",
    },
    letterLine: "Even from the highest tower, you're still the best thing in sight.",
  },
  {
    id: "ride",
    phase: "tomorrow",
    name: "Kuressaare → the coast",
    lat: 58.2449633, lon: 22.4714290,   // Kuressaare yacht harbour — start of the coastal bike path
    radius: 350,
    pin: "pin",
    tile: { emoji: "🚲", gradient: "linear-gradient(135deg,#2e8b9e,#86d0c4)" },
    clue: {
      title: "Now — the bikes",
      text: "Back in Kuressaare we park the car for good and have dinner by the marina. Then we lift the bikes down: from right here a smooth seaside path — the Kuressaare–Mändjala kergliiklustee — runs along the coast, and we follow it west toward the sunset.",
    },
    arrive: {
      title: "Dinner, then two wheels 🚲",
      text: "Dinner first — we earned it. Then helmets on. Find the coastal bike path by the water and point the wheels west, sea on your right. About an hour of easy pedalling, and one last pin waiting down the shore.",
    },
    quiz: {
      question: "We brought two of these in the car for today — what are they?",
      answers: ["bikes", "bicycles", "bike", "bicycle"],
      hint: "You're sitting on one right now.",
    },
    letterLine: "Side by side, at our own pace — that's my favourite way to go anywhere.",
  },
  {
    id: "mandjala",
    phase: "tomorrow",
    name: "Mändjala beach",
    lat: 58.2115652, lon: 22.3225275,
    radius: 450,
    pin: "pin",
    finale: true,
    tile: { emoji: "🌅", gradient: "linear-gradient(135deg,#e7677e,#ffc187)" },
    clue: {
      title: "Follow the coast to the last pin",
      text: "Keep to the seaside path — past Nasva, past Järve — until the pines open onto a long, soft beach. That's Mändjala, where the sun melts into the sea. Drop the bikes in the sand. Our very last pin is here.",
    },
    arrive: {
      title: "For you 💌",
      text: "You made it — all the way to the end of the map.",
    },
    letterLine: "And when the day finally ends, there's no one I'd rather watch the sun set with.",
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
