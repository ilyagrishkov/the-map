# The Map 💛

A private, phone-first scavenger-hunt website for one very specific person. She opens a
link, the map shows one glowing place, she physically goes there, and GPS unlocks the next
clue — starting today with a bottle buried at **Stroomi rand** and ending tomorrow with a
sunset on **Saaremaa**.

Built as a plain static site: **Leaflet + OpenStreetMap** (no map key), the browser's GPS,
and **GitHub Pages** (free, HTTPS — which her iPhone requires to share location). No paid
anything. Tuned for **iPhone 13** (390×844), works in light & dark, passes WCAG 2.2 AA, and
keeps working offline once it's loaded.

---

## ✏️ How to personalize (edit one file)

Open **`js/journey.js`** — it's all plain text. The lines marked `// <-- EDIT` are the ones
to change:

- **`herName` / `fromName`** — her name and how you sign the letter.
- **`bottleCodeword`** — the secret word you write on the note inside the buried bottle
  (currently **`SAIL`**). She types it to unlock the journey. *Don't* write the destination
  on the note — let the app reveal it.
- **Each station's `clue`, `arrive`, and `quiz`** — make the quizzes inside-jokes only she'd
  know; that's where the magic is. `answers` can list several acceptable spellings.
- **`letter`** — the heartfelt letter shown at the very end.
- **Move a pin:** long-press the exact spot in Google Maps, copy the two numbers into
  `lat:` and `lon:`. (Double-check the **bog tower** pin and your exact **bottle** spot.)

**Photos for the mosaic (recommended):** the 5 tiles become a photo collage of *you two*
that builds through the day. Put 5 photos in `assets/photos/` with these exact names, then
delete the `//` in front of the matching `photo:` line in `js/journey.js` (or just ask me):

| File | Stop | A memory that fits the vibe |
|---|---|---|
| `uugu.jpg`   | Üügu cliff    | a scenic view / lookout / your best travel shot |
| `zoo.jpg`    | Saaremaa Zoo  | something silly & laughing, or with an animal/pet |
| `bog.jpg`    | Bog tower     | a tender, quiet close-up of the two of you |
| `ride.jpg`   | Harilaid ride | an adventure together — bikes, a hike, a road trip |
| `finale.jpg` | Kiipsaare     | THE one — your most "us" photo (wedding / anniversary) |

Use **JPG or PNG** (not iPhone HEIC). A missing or mistyped photo simply falls back to the
emoji tile, so nothing breaks.

---

## 🗺️ The journey

**Today (Tallinn):** Stroomi rand → she digs up the bottle → types the codeword → the app
reveals that tomorrow you sail to the islands.

**Tomorrow (5 stops, car + bikes, ferry for the water):**

1. **Üügu cliff** (Muhu) — a quiet golden-hour sea-cliff most people miss.
2. **Saaremaa Zoo** — the pet zoo you promised; feed & pet the animals. *Lunch right after*
   (the on-site PART café, or carry on toward Kuressaare).
3. **Mullutu-Loode bog tower** — a boardwalk over the wetlands and a climb up the tower.
4. **Harilaid (the ride)** — drive to the Harilaid car park at the edge of Vilsandi national
   park, leave the car, and cycle the ~5 km trail across the wild cape (no cars past the barrier).
5. **Kiipsaare leaning lighthouse** — the finale: a white lighthouse standing *in* the sea.
   Picnic on the dunes, read the letter, then cycle back and drive to the ferry.

### Logistics (verified June 2026 — re-check before you go)
- **Ferry** Virtsu⇄Kuivastu (praamid.ee): ~hourly, ~30 min crossing, first ~05:35, last just
  after midnight. **Book online**, arrive ~30 min early in summer. Car + bikes go on board.
- **Saaremaa Zoo** (Mäeküla, ~30 min NE of Kuressaare): May→ open daily 10:00–18:00. saaremaazoo.ee
- **Picnic, not a restaurant**: Harilaid/Kiipsaare is uninhabited — no shops or cafés out
  there. Buy everything in **Kuressaare** (the last proper shops) before heading north-west.
  Pack water, warm layers (the cape is windy and exposed), and the picnic.
- **The ride**: Harilaid car park → Kiipsaare lighthouse is ~4.5–5 km each way (~9–10 km round
  trip) on sandy/grassy trail; cycling is allowed (no cars past the barrier). Soft sand near the
  lighthouse may mean walking the bikes the final bit.
- **⚠️ Last ferry / timing**: Kiipsaare is the far NW corner — ~110–120 km / ~2 h by road back
  to the Kuivastu ferry, whose last crossing is just after midnight (confirm on praamid.ee). An
  **early-evening picnic** makes a same-day return doable but long; if you want the ~22:40
  **sunset** at the lighthouse, plan an **overnight in Kuressaare** rather than racing the ferry.
- Tallinn→Kuressaare is ~3.5–4 h each way; mid-June daylight runs ~04:30–22:45. Leave early.

---

## 📱 Get it onto her phone
1. Send her the live link (below) — ideally the night before / morning of.
2. She taps **Allow** when it asks for location, and can **Add to Home Screen** (Share →
   Add to Home Screen) for a full-screen, app-like experience.
3. Tell her to keep the phone charged; bring a power bank for the islands.

**How unlocking works (and why it never blocks the day):** each stop unlocks automatically by
GPS when she arrives. If GPS is being slow, there's an **“I'm here”** button, and if it still
won't cooperate a quiet **“reveal anyway”** appears — so a weak signal or a tricky quiz can
never strand you. You'll be together, so you can always nudge it along.

---

## 🔧 Testing (for you, before the day)
Open the site with these URL tricks:
- `?reset=1` — wipe progress and start fresh.
- `?jump=<id>` — preview from a stop without travelling. IDs: `stroomi`, `uugu`, `zoo`,
  `vaatetorn`, `harilaid`, `kiipsaare`. (e.g. `…/?jump=zoo`)

To answer the default quizzes while testing: **Muhu**, **moon**, **bog**, **bikes**.

---

## 🚀 Deploy / update
It's hosted on GitHub Pages. To publish changes after editing `journey.js`:
```bash
git add -A && git commit -m "tweak content" && git push
```
Give it a minute, then refresh (Pages redeploys automatically).

## 🔒 A note on privacy
The repository is **public** (that's what makes GitHub Pages free). The default content is
generic — no real names or photos — so nothing personal is exposed until you add it. If you'd
rather keep your letter and photos off the public web, keep the most personal bits on the
physical notes/bottle, or ask for a simple passphrase gate to be added.
