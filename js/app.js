/* =====================================================================
 *  THE MAP — engine
 *  A geolocation love-quest. Vanilla JS + Leaflet. No build step.
 *  You should not need to edit this file — all content lives in
 *  js/journey.js. Logic only below.
 * ===================================================================== */
(function () {
  "use strict";

  var CONFIG = window.CONFIG || {};
  var STATIONS = window.STATIONS || [];
  var STORE_KEY = "themap.v2";

  /* ---------- tiny helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function fmtDist(m) {
    if (m == null) return "";
    if (m < 1000) return Math.round(m / 5) * 5 + " m";
    return (m / 1000).toFixed(m < 10000 ? 1 : 0) + " km";
  }
  function normalize(s) {
    return String(s || "").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
  }
  function haversine(a, b, c, d) {
    var R = 6371000, toR = Math.PI / 180;
    var p1 = a * toR, p2 = c * toR, dp = (c - a) * toR, dl = (d - b) * toR;
    var x = Math.sin(dp / 2) * Math.sin(dp / 2) +
            Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(x)));
  }

  /* ---------- state (localStorage + cookie backup) ---------- */
  function setCookie(n, v, days) { try { var d = new Date(); d.setTime(d.getTime() + days * 864e5); document.cookie = n + "=" + encodeURIComponent(v) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax"; } catch (e) {} }
  function getCookie(n) { try { var m = document.cookie.match("(?:^|; )" + n + "=([^;]*)"); return m ? decodeURIComponent(m[1]) : null; } catch (e) { return null; } }
  function freshState() { return { v: 2, done: {}, arrived: {}, times: {} }; }
  var state = loadState();
  function loadState() {
    var raw = null;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (!raw) raw = getCookie(STORE_KEY);
    try { var s = JSON.parse(raw); if (s && s.done) { s.arrived = s.arrived || {}; s.times = s.times || {}; return s; } } catch (e) {}
    return freshState();
  }
  function save() {
    var s = JSON.stringify(state);
    try { localStorage.setItem(STORE_KEY, s); } catch (e) {}
    setCookie(STORE_KEY, s, 21);
  }

  // dev shortcuts: ?reset=1 clears progress; ?jump=<id> marks prior stations done
  (function devParams() {
    var q = new URLSearchParams(location.search);
    if (q.get("reset")) { state = freshState(); save(); }
    var jump = q.get("jump");
    if (jump) {
      for (var i = 0; i < STATIONS.length; i++) {
        if (STATIONS[i].id === jump) break;
        state.done[STATIONS[i].id] = true; state.arrived[STATIONS[i].id] = true;
      }
      save();
    }
  })();

  function activeStation() {
    for (var i = 0; i < STATIONS.length; i++) if (!state.done[STATIONS[i].id]) return STATIONS[i];
    return null;
  }
  function stationIndex(id) { for (var i = 0; i < STATIONS.length; i++) if (STATIONS[i].id === id) return i; return -1; }

  /* ---------- map ---------- */
  var TILES = {
    voyager: { url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      sub: "abcd", max: 20, attr: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/">CARTO</a>' },
    positron: { url: "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png",
      sub: "abcd", max: 20, attr: '&copy; OpenStreetMap, &copy; CARTO' },
    osm: { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      sub: "abc", max: 19, attr: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>' }
  };
  var map, markerGroup, pathLine, meMarker, lastFitKey = "";
  function initMap() {
    var a = activeStation() || STATIONS[STATIONS.length - 1];
    map = L.map("map", { zoomControl: false, attributionControl: true, keyboard: false }).setView([a.lat, a.lon], 12);
    L.control.zoom({ position: "topright" }).addTo(map);
    var t = TILES[CONFIG.mapStyle] || TILES.voyager;
    L.tileLayer(t.url, { subdomains: t.sub, maxZoom: t.max, attribution: t.attr, detectRetina: false }).addTo(map);
    markerGroup = L.layerGroup().addTo(map);
  }
  function pinIcon(emoji, cls) {
    return L.divIcon({ className: "", html: '<div class="pin ' + cls + '"><span>' + emoji + "</span></div>",
      iconSize: [38, 38], iconAnchor: [19, 19] });
  }
  function renderMap() {
    if (!map) return;
    markerGroup.clearLayers();
    var active = activeStation();
    var pts = [];
    STATIONS.forEach(function (s) {
      var isDone = !!state.done[s.id];
      var isActive = active && s.id === active.id;
      if (!isDone && !isActive) return; // keep future stops secret
      pts.push([s.lat, s.lon]);
      if (isActive && s.pin !== "zone") {
        L.circle([s.lat, s.lon], { radius: s.radius, color: "#d6577a", weight: 1.5, opacity: .6, fillColor: "#d6577a", fillOpacity: .1 }).addTo(markerGroup);
        L.marker([s.lat, s.lon], { icon: pinIcon(s.tile.emoji, "active"), keyboard: false }).addTo(markerGroup);
      } else if (isActive && s.pin === "zone") {
        L.circle([s.lat, s.lon], { radius: s.radius, color: "#d6577a", weight: 1.5, opacity: .6, fillColor: "#d6577a", fillOpacity: .12 }).addTo(markerGroup);
      } else {
        L.marker([s.lat, s.lon], { icon: pinIcon(s.tile ? s.tile.emoji : "✓", "done") })
          .on("click", function () { showMemory(s); }).addTo(markerGroup);
      }
    });
    if (pts.length > 1) {
      if (pathLine) markerGroup.removeLayer(pathLine);
      pathLine = L.polyline(pts, { color: "#d6577a", weight: 2, opacity: .5, dashArray: "2 8" }).addTo(markerGroup);
    }
    var key = pts.map(function (p) { return p.join(","); }).join("|");
    if (key !== lastFitKey && pts.length) {
      lastFitKey = key;
      if (pts.length === 1) map.setView(pts[0], 13);
      else map.fitBounds(L.latLngBounds(pts).pad(0.35), { animate: true });
    }
  }

  /* ---------- progress hearts ---------- */
  function renderProgress() {
    var wrap = $("#progress"); wrap.innerHTML = "";
    wrap.setAttribute("aria-label", STATIONS.filter(function (s) { return state.done[s.id]; }).length + " of " + STATIONS.length + " stops reached");
    var active = activeStation();
    STATIONS.forEach(function (s) {
      var cls = "heart";
      if (state.done[s.id]) cls += " filled";
      if (active && s.id === active.id) cls += " current";
      wrap.appendChild(el('<svg class="' + cls + '" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 21s-7.5-4.6-10-9.2C.3 8.4 1.9 5 5.2 5c2 0 3.3 1.1 3.8 2 .5-.9 1.8-2 3.8-2 3.3 0 4.9 3.4 3.2 6.8C19.5 16.4 12 21 12 21z"/></svg>'));
    });
  }

  /* ---------- sheet rendering ---------- */
  var lastFix = null, geoReady = false, quizTries = 0;

  function sheetClue(s) {
    var future = s.phase === "today" ? "Today" : "Next stop";
    var html =
      '<p class="eyebrow">' + esc(future) + '</p>' +
      '<h1>' + esc(s.clue.title) + "</h1>" +
      "<p>" + esc(s.clue.text) + "</p>" +
      '<div id="distrow"></div>' +
      '<div class="btn-row">' +
        '<button class="btn btn-primary" id="here">I\'m here</button>' +
        '<button class="btn btn-ghost" id="far" hidden></button>' +
      "</div>";
    setSheet(html);
    renderDistance(s);
    $("#here").addEventListener("click", function () { onImHere(s); });
  }

  function renderDistance(s) {
    var row = $("#distrow"); if (!row) return;
    if (!geoReady) {
      row.innerHTML = '<div class="banner">📍 Turn on location and tap “I\'m here” when you arrive — nothing here will get in the way of our day.</div>';
      return;
    }
    if (!lastFix) { row.innerHTML = ""; return; }
    var d = haversine(lastFix.lat, lastFix.lon, s.lat, s.lon);
    var near = d <= s.radius;
    row.innerHTML = '<span class="dist ' + (near ? "near" : "") + '"><span class="dot"></span>' +
      (near ? "You're here 💛" : fmtDist(d) + " away") + "</span>";
  }

  function onImHere(s) {
    if (lastFix) {
      var d = haversine(lastFix.lat, lastFix.lon, s.lat, s.lon);
      if (d <= s.radius) { arrive(s); return; }
      var far = $("#far");
      far.hidden = false;
      far.textContent = "GPS says you're about " + fmtDist(d) + " away — reveal this stop anyway ›";
      far.onclick = function () { arrive(s); };
      $("#here").textContent = "Check again";
      return;
    }
    // no GPS fix available — never block
    arrive(s);
  }

  function arrive(s) {
    if (state.done[s.id]) return;
    state.arrived[s.id] = true; save();
    if (s.code) return sheetCode(s);          // Stroomi bottle
    if (s.finale) return complete(s);          // finale: straight to the letter
    sheetArrivedQuiz(s);
  }

  function sheetArrivedQuiz(s) {
    quizTries = 0;
    var q = s.quiz;
    var html =
      '<p class="eyebrow">You made it</p>' +
      "<h1>" + esc(s.arrive.title) + "</h1>" +
      "<p>" + esc(s.arrive.text) + "</p>";
    if (q) {
      html +=
        '<p class="sub">When you\'re ready, answer this to unlock the next clue:</p>' +
        '<p style="font-weight:700;margin-bottom:10px">' + esc(q.question) + "</p>";
      if (q.choices && q.choices.length) {
        html += '<div class="choices" id="qchoices">' +
          q.choices.map(function (c, i) { return '<button class="choice" data-i="' + i + '">' + esc(c) + "</button>"; }).join("") +
          "</div>";
      } else {
        html += '<div class="code-field"><input id="qin" inputmode="text" autocomplete="off" placeholder="your answer" aria-label="answer" /></div>';
      }
      html +=
        '<div id="qhint"></div>' +
        '<div class="btn-row">' +
          (q.choices && q.choices.length ? "" : '<button class="btn btn-primary" id="qok">Unlock the next clue</button>') +
          '<button class="btn btn-ghost" id="qskip" hidden>Skip this one ›</button>' +
        "</div>";
    } else {
      html += '<div class="btn-row"><button class="btn btn-primary" id="qok">Continue ›</button></div>';
    }
    setSheet(html);
    if (!q) { $("#qok").onclick = function () { complete(s); }; return; }
    if (q.choices && q.choices.length) {
      $$("#qchoices .choice").forEach(function (b) {
        b.addEventListener("click", function () { tryQuizChoice(s, q.choices[+b.getAttribute("data-i")], b); });
      });
    } else {
      var input = $("#qin");
      $("#qok").onclick = function () { tryQuizText(s, input.value); };
      input.addEventListener("keydown", function (e) { if (e.key === "Enter") tryQuizText(s, input.value); });
      input.focus();
    }
  }

  function answerOK(s, val) { return (s.quiz.answers || []).map(normalize).indexOf(normalize(val)) !== -1; }
  function quizMiss(s) {
    quizTries++;
    var hint = $("#qhint");
    if (quizTries >= 2 && s.quiz.hint) hint.innerHTML = '<p class="sub">Hint: ' + esc(s.quiz.hint) + "</p>";
    if (quizTries >= 3) { var sk = $("#qskip"); if (sk) { sk.hidden = false; sk.onclick = function () { complete(s); }; } }
  }
  function tryQuizText(s, val) {
    if (answerOK(s, val)) { complete(s); return; }
    var input = $("#qin"); input.classList.remove("wrong"); void input.offsetWidth; input.classList.add("wrong");
    quizMiss(s);
  }
  function tryQuizChoice(s, val, btn) {
    if (answerOK(s, val)) { btn.classList.add("correct"); setTimeout(function () { complete(s); }, 220); return; }
    btn.classList.remove("wrong"); void btn.offsetWidth; btn.classList.add("wrong");
    quizMiss(s);
  }

  function sheetCode(s) {
    var html =
      '<p class="eyebrow">You\'re here</p>' +
      "<h1>" + esc(s.arrive.title) + "</h1>" +
      "<p>" + esc(s.arrive.text) + "</p>" +
      '<p style="font-weight:700;margin-bottom:8px">' + esc(s.codePrompt) + "</p>" +
      '<div class="code-field"><input id="cin" inputmode="text" autocomplete="off" placeholder="the secret word" aria-label="secret word" /></div>' +
      '<div id="chint"></div>' +
      '<div class="btn-row"><button class="btn btn-primary" id="cok">Open it</button>' +
      '<button class="btn btn-ghost" id="cnope">Can\'t find it?</button></div>';
    setSheet(html);
    var input = $("#cin");
    $("#cok").onclick = function () { tryCode(s, input.value); };
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") tryCode(s, input.value); });
    $("#cnope").onclick = function () {
      $("#chint").innerHTML = '<p class="sub">It\'s buried in the sand by the landmark in the note above. Still stuck? Call me 💛</p>';
    };
    input.focus();
  }
  function tryCode(s, val) {
    if (normalize(val) === normalize(CONFIG.bottleCodeword)) { complete(s); return; }
    var input = $("#cin"); input.classList.remove("wrong"); void input.offsetWidth; input.classList.add("wrong");
    $("#chint").innerHTML = '<p class="sub">Not quite — check the note again.</p>';
  }

  /* ---------- completion + reveals ---------- */
  function complete(s) {
    state.done[s.id] = true; state.arrived[s.id] = true; save();
    renderProgress(); renderMap();
    if (s.id === "stroomi" && s.reveal) return showStroomiReveal(s);
    if (s.finale) return showFinale(s);
    showReveal(s);
  }

  function tileBg(s) { return "background:" + (s.tile && s.tile.gradient ? s.tile.gradient : "#ccc"); }
  function tileInner(s) {
    var emoji = s.tile ? s.tile.emoji : "💛";
    var img = s.tile && s.tile.photo ? '<img class="tile-img" src="' + esc(s.tile.photo) + '" alt="" onerror="this.remove()">' : "";
    return '<span class="tile-emoji">' + emoji + "</span>" + img;
  }

  function showMemory(s) {
    var html =
      '<div class="card" role="dialog" aria-modal="true">' +
        '<p class="eyebrow">A memory</p>' +
        '<div class="tile" style="' + tileBg(s) + '">' + tileInner(s) + "</div>" +
        "<h1>" + esc(s.name) + "</h1>" +
        (s.arrive ? "<p>" + esc(s.arrive.text) + "</p>" : "") +
        (s.letterLine ? '<p class="fragment">“' + esc(s.letterLine) + '”</p>' : "") +
        '<button class="btn btn-primary" id="memclose">Close</button>' +
      "</div>";
    showOverlay(html);
    $("#memclose").onclick = hideOverlay;
  }

  function showReveal(s) {
    var html =
      '<div class="card" role="dialog" aria-modal="true">' +
        '<p class="eyebrow">A memory unlocked</p>' +
        '<div class="tile" style="' + tileBg(s) + '">' + tileInner(s) + "</div>" +
        "<h1>" + esc(s.name) + "</h1>" +
        (s.letterLine ? '<p class="fragment">“' + esc(s.letterLine) + '”</p>' : "") +
        '<p class="sub">Added to your letter & the mosaic.</p>' +
        '<button class="btn btn-primary" id="cont">Reveal the next stop ›</button>' +
      "</div>";
    showOverlay(html);
    $("#cont").onclick = function () { hideOverlay(); var a = activeStation(); if (a) sheetClue(a); };
  }

  function showStroomiReveal(s) {
    var html =
      '<div class="card" role="dialog" aria-modal="true">' +
        '<p class="eyebrow">A secret, just for you</p>' +
        "<h1>" + esc(s.reveal.title) + "</h1>" +
        "<p>" + esc(s.reveal.text) + "</p>" +
        '<button class="btn btn-primary" id="cont">See where we\'re going ›</button>' +
      "</div>";
    showOverlay(html);
    $("#cont").onclick = function () { hideOverlay(); lastFitKey = ""; renderMap(); var a = activeStation(); if (a) sheetClue(a); };
  }

  function showFinale(s) {
    var tiles = STATIONS.filter(function (x) { return x.phase === "tomorrow" && x.tile; });
    var cells = tiles.map(function (x) {
      return '<div class="cell" style="' + tileBg(x) + '">' + tileInner(x) + "</div>";
    }).join("");
    var letter = (CONFIG.letter || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var lines = tiles.filter(function (x) { return x.letterLine; })
      .map(function (x) { return "<p>" + esc(x.letterLine) + "</p>"; }).join("");
    var html =
      '<div class="card" role="dialog" aria-modal="true">' +
        '<p class="eyebrow">For ' + esc(CONFIG.herName || "you") + " 💌</p>" +
        '<div class="mosaic">' + cells + "</div>" +
        '<div class="letter">' +
          lines +
          '<hr style="border:none;border-top:1px solid var(--line);margin:14px 0">' +
          letter +
          '<p class="signoff">' + esc(CONFIG.letterSignoff || "With all my love,") + "<br>" + esc(CONFIG.fromName || "") + "</p>" +
          (CONFIG.finaleNote ? '<p class="ps">' + esc(CONFIG.finaleNote) + "</p>" : "") +
        "</div>" +
      "</div>";
    showOverlay(html);
  }

  /* ---------- overlay/sheet plumbing ---------- */
  function setSheet(html) { $("#sheet").innerHTML = html; }
  function showOverlay(html) { var o = $("#overlay"); o.innerHTML = html; o.hidden = false; }
  function hideOverlay() { var o = $("#overlay"); o.hidden = true; o.innerHTML = ""; }

  /* ---------- geolocation ---------- */
  function startGeo() {
    if (!navigator.geolocation) { geoReady = false; refreshDistance(); return; }
    navigator.geolocation.watchPosition(function (pos) {
      geoReady = true;
      lastFix = { lat: pos.coords.latitude, lon: pos.coords.longitude, acc: pos.coords.accuracy };
      if (meMarker) meMarker.setLatLng([lastFix.lat, lastFix.lon]);
      else meMarker = L.marker([lastFix.lat, lastFix.lon], { icon: L.divIcon({ className: "", html: '<div class="me-dot"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }), keyboard: false, interactive: false }).addTo(map);
      refreshDistance();
      autoUnlock();
    }, function () { geoReady = false; refreshDistance(); },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 });
  }
  function refreshDistance() {
    var a = activeStation();
    if (a && !state.arrived[a.id]) renderDistance(a);
  }
  function autoUnlock() {
    var a = activeStation();
    if (!a || state.arrived[a.id] || !lastFix) return;
    if (haversine(lastFix.lat, lastFix.lon, a.lat, a.lon) <= a.radius) arrive(a);
  }

  /* ---------- boot ---------- */
  function boot() {
    if (!STATIONS.length) { setSheet("<p>No journey configured.</p>"); return; }
    initMap();
    renderProgress();
    renderMap();
    var a = activeStation();
    if (!a) { showFinale(STATIONS[STATIONS.length - 1]); return; }
    if (state.arrived[a.id]) { // resumed mid-stop
      if (a.code) sheetCode(a); else if (!a.finale) sheetArrivedQuiz(a); else sheetClue(a);
    } else {
      sheetClue(a);
    }
    startGeo();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
