<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>🏆 كأس العالم 2026 – متتبع المباريات والتوقعات | مدرسة سعيد بن العاص</title>
  <style>
    /* جميع التصميمات السابقة كما هي (بدون تغيير) */
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body { background: linear-gradient(135deg, #0b2b2f 0%, #05181c 100%); font-family: 'Segoe UI', 'Cairo', system-ui, sans-serif; padding: 12px; min-height: 100vh; color: #f0f9ff; font-size: 14px; }
    .app-container { max-width: 800px; margin: 0 auto; width: 100%; }
    .hero { background: rgba(0,15,20,0.65); backdrop-filter: blur(14px); border-radius: 28px; padding: 16px; margin-bottom: 20px; text-align: center; border: 1px solid rgba(255,180,70,0.5); }
    .hero h1 { font-size: 1.6rem; background: linear-gradient(120deg,#FFE6B0,#FFB347); background-clip: text; -webkit-background-clip: text; color: transparent; margin-bottom: 6px; }
    .school-badge { background: #1e4a5f; display: inline-block; padding: 6px 16px; border-radius: 40px; font-size: 0.75rem; margin-top: 6px; }
    .control-panel { background: rgba(0,22,30,0.7); backdrop-filter: blur(12px); border-radius: 50px; padding: 10px 15px; display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
    .search-group { flex: 2; min-width: 140px; }
    .search-group input { width: 100%; padding: 12px 18px; border-radius: 40px; border: none; background: #fef7e0; text-align: right; outline: none; font-size: 0.9rem; }
    .round-group { flex: 1; min-width: 120px; }
    .round-group select { width: 100%; padding: 12px 12px; border-radius: 40px; background: #fef7e0; font-weight: bold; cursor: pointer; font-size: 0.85rem; }
    .stats-card { background: #00000055; border-radius: 40px; padding: 6px 16px; display: flex; align-items: center; font-weight: bold; font-size: 0.8rem; white-space: nowrap; }
    .quick-search-results { background: rgba(0,22,30,0.85); backdrop-filter: blur(12px); border-radius: 28px; padding: 12px; margin-bottom: 20px; border: 1px solid #ffb34780; display: none; }
    .quick-search-results.visible { display: block; }
    .quick-search-title { font-size: 1.1rem; font-weight: bold; margin-bottom: 12px; border-right: 4px solid #ffb347; padding-right: 12px; }
    .quick-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
    .quick-match-card { background: #0a2e38cc; border-radius: 24px; padding: 10px; border: 1px solid #ffc97a50; }
    .quick-match-teams { display: flex; justify-content: space-between; align-items: center; gap: 6px; font-weight: bold; font-size: 0.85rem; flex-wrap: wrap; }
    .quick-result { background: #1e4a5f; padding: 4px 10px; border-radius: 30px; font-size: 0.75rem; text-align: center; margin-top: 8px; }
    .tabs { display: flex; flex-wrap: wrap; gap: 8px; margin: 15px 0; border-bottom: 1px solid #ffb34760; padding-bottom: 8px; }
    .tab-btn { background: rgba(0,0,0,0.4); border: none; padding: 8px 16px; border-radius: 40px; font-size: 0.85rem; font-weight: bold; cursor: pointer; color: #ffdfa5; transition: 0.2s; }
    .tab-btn.active { background: #ffb347; color: #1e2a2f; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .matches-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
    .match-card { background: linear-gradient(145deg,#0e3843,#06232b); border-radius: 28px; padding: 14px; border: 1px solid #ffc97a30; display: flex; flex-direction: column; gap: 12px; }
    .match-card.live-card { border: 2px solid #ff3a2f; background: linear-gradient(145deg,#1c4a55,#0a2e36); }
    .teams { display: flex; justify-content: space-between; align-items: center; gap: 8px; background: #021d24a0; padding: 10px; border-radius: 60px; }
    .team { background: #00000055; padding: 6px 10px; border-radius: 40px; flex: 1; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: bold; font-size: 0.85rem; white-space: normal; word-break: keep-all; }
    .team span:first-child { font-size: 1.2rem; }
    .vs { background: #FFB347; padding: 3px 10px; border-radius: 40px; font-weight: bold; font-size: 0.75rem; }
    .datetime-row { display: flex; justify-content: space-between; gap: 10px; background: #0a2e38; padding: 6px 12px; border-radius: 50px; }
    .match-day, .match-full-date { padding: 4px 10px; border-radius: 40px; font-size: 0.7rem; text-align: center; }
    .match-day { background: #1e4a5f; color: #FFE0A3; flex:1; }
    .match-full-date { background: #00000055; flex:2; }
    .info-row { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
    .round-tag { background: #263b44; padding: 4px 12px; border-radius: 60px; font-size: 0.7rem; }
    .countdown-timer { background: #00000070; font-family: monospace; font-size: 1rem; font-weight: bold; padding: 6px 12px; border-radius: 60px; text-align: center; }
    .live-status { background: #d32f2f; animation: pulse 1.2s infinite; border-radius: 40px; padding: 4px 12px; }
    @keyframes pulse { 0% { opacity: 0.7; background: #b71c1c; } 50% { opacity: 1; background: #f44336; box-shadow: 0 0 8px red; } 100% { opacity: 0.7; background: #b71c1c; } }
    .empty-state { grid-column: 1/-1; text-align: center; background: #102e36b3; padding: 30px; border-radius: 50px; font-size: 1rem; }
    .filter-bar { display: flex; gap: 10px; margin-bottom: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 50px; flex-wrap: wrap; }
    .filter-bar input { background: #fef7e0; border: none; padding: 8px 16px; border-radius: 40px; outline: none; flex: 1; font-size: 0.85rem; }
    .groups-container { display: grid; grid-template-columns: 1fr; gap: 20px; }
    .group-card { background: #2c4f5e; backdrop-filter: blur(4px); border-radius: 28px; padding: 12px; border: 1px solid #ffb34780; overflow-x: auto; }
    .group-title { font-size: 1.3rem; font-weight: bold; text-align: center; margin-bottom: 10px; color: #FFE0A3; }
    .standings-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; min-width: 500px; }
    .standings-table th, .standings-table td { padding: 6px 2px; text-align: center; border-bottom: 1px solid #ffb34760; }
    .standings-table th { background: #1a3a48; color: #FFE6B0; font-weight: bold; }
    .standings-table td { background-color: #eef4f5; color: #1a2c34; font-weight: 600; }
    .team-name-td { text-align: right; display: flex; align-items: center; gap: 4px; justify-content: flex-start; font-size: 0.7rem; }
    .prediction-form { background: rgba(0,22,30,0.7); border-radius: 28px; padding: 16px; margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end; }
    .prediction-form select, .prediction-form input, .prediction-form button { background: #fef7e0; border: none; padding: 10px 15px; border-radius: 40px; font-size: 0.85rem; outline: none; color: #1e2a2f; font-weight: bold; }
    .prediction-form select { flex: 2; }
    .prediction-form input { flex: 1; }
    .prediction-form button { background: #ffb347; cursor: pointer; transition: 0.2s; }
    .prediction-form button:hover { background: #ffa01e; }
    .prediction-list { list-style: none; padding: 0; }
    .prediction-list li { background: #0a2e38cc; margin-bottom: 8px; padding: 10px 15px; border-radius: 60px; font-size: 0.85rem; border-right: 4px solid #ffb347; }
    footer { margin-top: 30px; text-align: center; font-size: 0.65rem; color: #90b8c2; border-top: 1px dashed #ffb34760; padding-top: 16px; }
    @media (min-width: 550px) { body { padding: 16px; } .matches-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); } .quick-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); } .groups-container { grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); } .team { font-size: 0.9rem; } }
    @media (max-width: 480px) { .hero h1 { font-size: 1.3rem; } .control-panel { border-radius: 40px; padding: 8px 12px; gap: 8px; } .search-group input { padding: 10px 14px; font-size: 0.8rem; } .round-group select { padding: 10px 10px; font-size: 0.75rem; } .stats-card { padding: 4px 12px; font-size: 0.7rem; } .team { font-size: 0.75rem; } .team span:first-child { font-size: 1rem; } .countdown-timer { font-size: 0.85rem; } .prediction-form select, .prediction-form input, .prediction-form button { width: 100%; } }
  </style>
</head>
<body>
<div class="app-container">
  <div class="hero">
    <h1>🏆 كأس العالم 2026 ⚽</h1>
    <div class="school-badge">📢 تابع كأس العالم في غرفة معلمي مدرسة سعيد بن العاص</div>
  </div>

  <div class="control-panel">
    <div class="search-group">
      <input type="text" id="globalSearchInput" placeholder="🔍 ابحث عن منتخب (مباريات قادمة وسابقة)" autocomplete="off">
    </div>
    <div class="round-group">
      <select id="roundFilter">
        <option value="all">🌍 جميع الجولات</option>
        <option value="first">🟢 الجولة الأولى</option>
        <option value="second">🟩 الجولة الثانية</option>
        <option value="third">🟥 الجولة الثالثة</option>
      </select>
    </div>
    <div class="stats-card" id="matchesCounter">🕒 جار التحميل</div>
  </div>

  <div id="quickSearchResults" class="quick-search-results">
    <div class="quick-search-title">🔍 نتائج البحث عن "<span id="searchKeyword"></span>"</div>
    <div id="quickResultsContainer" class="quick-grid"></div>
  </div>

  <div class="tabs">
    <button class="tab-btn active" data-tab="upcoming">⚡ القادمة والجارية</button>
    <button class="tab-btn" data-tab="previous">📋 المباريات السابقة</button>
    <button class="tab-btn" data-tab="standings">📊 ترتيب المجموعات</button>
    <button class="tab-btn" data-tab="predictions">📝 التوقعات</button>
  </div>

  <div id="upcomingTab" class="tab-content active">
    <div id="matchesContainer" class="matches-grid"><div class="empty-state">✨ جاري التحميل ✨</div></div>
  </div>

  <div id="previousTab" class="tab-content">
    <div class="filter-bar">
      <input type="text" id="prevSearchInput" placeholder="🔍 بحث في المباريات السابقة...">
    </div>
    <div id="previousMatchesContainer" class="matches-grid"><div class="empty-state">📋 جاري تحميل المباريات السابقة...</div></div>
  </div>

  <div id="standingsTab" class="tab-content">
    <div id="standingsContainer" class="groups-container"><div class="empty-state">📊 جاري حساب ترتيب المجموعات...</div></div>
  </div>

  <div id="predictionsTab" class="tab-content">
    <div class="prediction-form">
      <input type="text" id="predUserName" placeholder="👤 اسم المستخدم" style="flex:1">
      <select id="predMatchSelect" style="flex:2">
        <option value="">-- اختر المباراة --</option>
      </select>
      <select id="predTeamSelect" style="flex:1">
        <option value="">-- الفريق --</option>
      </select>
      <button id="submitPrediction">➕ أضف توقع</button>
    </div>
    <div id="predictionsListContainer">
      <ul id="predictionsList" class="prediction-list"></ul>
    </div>
  </div>

  <footer>🔄 تحديث تلقائي للمباريات القادمة | البحث الشامل يشمل النتائج | التوقعات مرتبطة بـ match_id فريد</footer>
</div>

<script type="module">
  // =========================
  // 1. Supabase client (بدون تغيير)
  // =========================
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
  const SUPABASE_URL = 'https://szjxwhsmefqpfcebtvei.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_0um28lgPMHcjDOThT0UgDA_K-Y7Wmx3';
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase connected 🔥");

  // =========================
  // 2. بيانات المباريات القادمة (مع match_id فريد)
  // =========================
  const rawMatches = [
    { team1:"المكسيك", team2:"جنوب أفريقيا", time:"2026-06-11T22:00:00", round:"first" },
    { team1:"الأرجنتين", team2:"الجزائر", time:"2026-06-11T04:00:00", round:"first" },
    { team1:"النمسا", team2:"الأردن", time:"2026-06-11T07:00:00", round:"first" },
    { team1:"البرتغال", team2:"الكونغو الديمقراطية", time:"2026-06-11T20:00:00", round:"first" },
    { team1:"كوريا الجنوبية", team2:"التشيك", time:"2026-06-12T05:00:00", round:"first" },
    { team1:"كندا", team2:"البوسنة والهرسك", time:"2026-06-12T22:00:00", round:"first" },
    { team1:"أمريكا", team2:"العراق", time:"2026-06-13T04:00:00", round:"first" },
    { team1:"سويسرا", team2:"قطر", time:"2026-06-13T22:00:00", round:"first" },
    { team1:"البرازيل", team2:"المغرب", time:"2026-06-14T01:00:00", round:"first" },
    { team1:"هايتي", team2:"إسكتلندا", time:"2026-06-14T04:00:00", round:"first" },
    { team1:"أستراليا", team2:"تركيا", time:"2026-06-14T07:00:00", round:"first" },
    { team1:"ألمانيا", team2:"كوسوفو", time:"2026-06-14T20:00:00", round:"first" },
    { team1:"اليابان", team2:"هولندا", time:"2026-06-14T23:00:00", round:"first" },
    { team1:"الإكوادور", team2:"ساحل العاج", time:"2026-06-15T02:00:00", round:"first" },
    { team1:"السويد", team2:"تونس", time:"2026-06-15T05:00:00", round:"first" },
    { team1:"إسبانيا", team2:"الرأس الأخضر", time:"2026-06-15T19:00:00", round:"first" },
    { team1:"مصر", team2:"بلجيكا", time:"2026-06-15T22:00:00", round:"first" },
    { team1:"السعودية", team2:"أوروغواي", time:"2026-06-16T01:00:00", round:"first" },
    { team1:"إيران", team2:"نيوزيلندا", time:"2026-06-16T04:00:00", round:"first" },
    { team1:"السنغال", team2:"فرنسا", time:"2026-06-16T22:00:00", round:"first" },
    { team1:"النرويج", team2:"العراق", time:"2026-06-17T01:00:00", round:"first" },
    { team1:"الجزائر", team2:"الأرجنتين", time:"2026-06-17T04:00:00", round:"first" },
    { team1:"الأردن", team2:"النمسا", time:"2026-06-17T07:00:00", round:"first" },
    { team1:"البرتغال", team2:"كرواتيا", time:"2026-06-17T20:00:00", round:"first" },
    { team1:"إنجلترا", team2:"كرواتيا", time:"2026-06-17T23:00:00", round:"first" },
    { team1:"جنوب أفريقيا", team2:"التشيك", time:"2026-06-18T19:00:00", round:"second" },
    { team1:"سويسرا", team2:"البوسنة والهرسك", time:"2026-06-18T22:00:00", round:"second" },
    { team1:"قطر", team2:"كندا", time:"2026-06-19T01:00:00", round:"second" },
    { team1:"المكسيك", team2:"كوريا الجنوبية", time:"2026-06-19T04:00:00", round:"second" },
    { team1:"أستراليا", team2:"أمريكا", time:"2026-06-19T22:00:00", round:"second" },
    { team1:"المغرب", team2:"إسكتلندا", time:"2026-06-20T01:00:00", round:"second" },
    { team1:"البرازيل", team2:"هايتي", time:"2026-06-20T03:30:00", round:"second" },
    { team1:"تركيا", team2:"باراغواي", time:"2026-06-20T06:00:00", round:"second" },
    { team1:"السويد", team2:"هولندا", time:"2026-06-20T20:00:00", round:"second" },
    { team1:"ساحل العاج", team2:"ألمانيا", time:"2026-06-20T23:00:00", round:"second" },
    { team1:"الإكوادور", team2:"كوسوفو", time:"2026-06-21T03:00:00", round:"second" },
    { team1:"اليابان", team2:"تونس", time:"2026-06-21T07:00:00", round:"second" },
    { team1:"إسبانيا", team2:"السعودية", time:"2026-06-21T19:00:00", round:"second" },
    { team1:"بلجيكا", team2:"إيران", time:"2026-06-21T22:00:00", round:"second" },
    { team1:"أوروجواي", team2:"الرأس الأخضر", time:"2026-06-22T01:00:00", round:"second" },
    { team1:"مصر", team2:"نيوزيلندا", time:"2026-06-22T04:00:00", round:"second" },
    { team1:"الأرجنتين", team2:"النمسا", time:"2026-06-22T20:00:00", round:"second" },
    { team1:"العراق", team2:"فرنسا", time:"2026-06-23T00:00:00", round:"second" },
    { team1:"النرويج", team2:"السنغال", time:"2026-06-23T03:00:00", round:"second" },
    { team1:"الأردن", team2:"الجزائر", time:"2026-06-23T06:00:00", round:"second" },
    { team1:"البرتغال", team2:"أوزبكستان", time:"2026-06-23T20:00:00", round:"second" },
    { team1:"إنجلترا", team2:"غانا", time:"2026-06-23T23:00:00", round:"second" },
    { team1:"بنما", team2:"كرواتيا", time:"2026-06-24T02:00:00", round:"second" },
    { team1:"كولومبيا", team2:"الكونغو الديمقراطية", time:"2026-06-24T05:00:00", round:"second" },
    { team1:"كندا", team2:"سويسرا", time:"2026-06-24T22:00:00", round:"third" },
    { team1:"قطر", team2:"البوسنة والهرسك", time:"2026-06-24T22:00:00", round:"third" },
    { team1:"المغرب", team2:"هايتي", time:"2026-06-25T01:00:00", round:"third" },
    { team1:"اسكتلندا", team2:"البرازيل", time:"2026-06-25T01:00:00", round:"third" },
    { team1:"جنوب أفريقيا", team2:"كوريا الجنوبية", time:"2026-06-25T04:00:00", round:"third" },
    { team1:"المكسيك", team2:"التشيك", time:"2026-06-25T04:00:00", round:"third" },
    { team1:"كوسوفو", team2:"ساحل العاج", time:"2026-06-25T23:00:00", round:"third" },
    { team1:"ألمانيا", team2:"الإكوادور", time:"2026-06-25T23:00:00", round:"third" },
    { team1:"هولندا", team2:"تونس", time:"2026-06-26T02:00:00", round:"third" },
    { team1:"اليابان", team2:"السويد", time:"2026-06-26T02:00:00", round:"third" },
    { team1:"أمريكا", team2:"تركيا", time:"2026-06-26T05:00:00", round:"third" },
    { team1:"أستراليا", team2:"باراغواي", time:"2026-06-26T05:00:00", round:"third" },
    { team1:"فرنسا", team2:"النرويج", time:"2026-06-26T22:00:00", round:"third" },
    { team1:"السنغال", team2:"العراق", time:"2026-06-26T22:00:00", round:"third" },
    { team1:"السعودية", team2:"الرأس الأخضر", time:"2026-06-27T03:00:00", round:"third" },
    { team1:"إسبانيا", team2:"أوروغواي", time:"2026-06-27T03:00:00", round:"third" },
    { team1:"إيران", team2:"مصر", time:"2026-06-27T06:00:00", round:"third" },
    { team1:"نيوزيلندا", team2:"بلجيكا", time:"2026-06-27T06:00:00", round:"third" },
    { team1:"إنجلترا", team2:"بنما", time:"2026-06-28T00:00:00", round:"third" },
    { team1:"كرواتيا", team2:"غانا", time:"2026-06-28T00:00:00", round:"third" },
    { team1:"البرتغال", team2:"كولومبيا", time:"2026-06-28T02:30:00", round:"third" },
    { team1:"الكونغو الديمقراطية", team2:"أوزبكستان", time:"2026-06-28T02:30:00", round:"third" },
    { team1:"الجزائر", team2:"النمسا", time:"2026-06-28T05:00:00", round:"third" },
    { team1:"الأردن", team2:"الأرجنتين", time:"2026-06-28T05:00:00", round:"third" }
  ];

  // إضافة match_id فريد لكل مباراة (رقم تسلسلي من 1 كنص String لضمان التوافق)
  const matches = rawMatches.map((m, index) => ({
    id: String(index + 1),   // تحويل إلى نص (String)
    team1: m.team1,
    team2: m.team2,
    time: m.time,
    timeISO: m.time + "+03:00",
    round: m.round,
    roundLabel: m.round === 'first' ? 'الجولة الأولى' : (m.round === 'second' ? 'الجولة الثانية' : 'الجولة الثالثة')
  }));

  // =========================
  // 3. دوال Supabase للتوقعات (باستخدام match_id و team)
  // =========================
  async function addPrediction(user_name, match_id, team) {
    const { data, error } = await supabase
      .from('predictions')
      .insert([{ user_name, match_id, team }]);   // ✅ العميل صحيح: team
    if (error) console.error("خطأ في الإضافة:", error);
    return { data, error };
  }

  async function getPredictions() {
    const { data, error } = await supabase.from('predictions').select('*');
    if (error) console.error("خطأ في الجلب:", error);
    return data || [];
  }

  // عرض التوقعات مع ربط match_id بأسماء الفرق من مصفوفة matches
  async function renderPredictions() {
    const predictions = await getPredictions();
    const listContainer = document.getElementById('predictionsList');
    if (!predictions.length) {
      listContainer.innerHTML = '<li class="empty-state" style="background:transparent; text-align:center;">📭 لا توجد توقعات حتى الآن. أضف توقعك!</li>';
      return;
    }
    // إنشاء خريطة للمباريات باستخدام id كنص (String)
    const matchesMap = new Map();
    matches.forEach(m => matchesMap.set(m.id, { team1: m.team1, team2: m.team2 }));

    listContainer.innerHTML = predictions.map(p => {
      // p.match_id قد يكون رقمًا أو نصًا، نحوله إلى نص للمقارنة
      const matchIdStr = String(p.match_id);
      const match = matchesMap.get(matchIdStr);
      const matchDisplay = match ? `${match.team1} vs ${match.team2}` : `مباراة غير معروفة (ID: ${matchIdStr})`;
      return `
        <li>
          👤 <strong>${escapeHtml(p.user_name)}</strong> | 
          🏆 ${escapeHtml(matchDisplay)} | 
          ⚽ يتوقع فوز: <span style="color:#FFB347;">${escapeHtml(p.team)}</span>
        </li>
      `;
    }).join('');
  }

  // تحديث قائمة المباريات في الـ dropdown
  function populateMatchesDropdown() {
    const select = document.getElementById('predMatchSelect');
    select.innerHTML = '<option value="">-- اختر المباراة --</option>';
    matches.forEach(match => {
      const option = document.createElement('option');
      option.value = match.id;   // قيمة نصية
      option.textContent = `${match.team1} vs ${match.team2}`;
      select.appendChild(option);
    });
  }

  // تحديث قائمة الفرق في الـ dropdown تبعًا للمباراة المختارة
  function updateTeamsDropdown() {
    const matchSelect = document.getElementById('predMatchSelect');
    const teamSelect = document.getElementById('predTeamSelect');
    const selectedMatchId = matchSelect.value;   // نص (String)
    if (!selectedMatchId) {
      teamSelect.innerHTML = '<option value="">-- الفريق --</option>';
      return;
    }
    const match = matches.find(m => m.id === selectedMatchId);
    if (match) {
      teamSelect.innerHTML = `
        <option value="">-- الفريق --</option>
        <option value="${escapeHtml(match.team1)}">${escapeHtml(match.team1)}</option>
        <option value="${escapeHtml(match.team2)}">${escapeHtml(match.team2)}</option>
      `;
    } else {
      teamSelect.innerHTML = '<option value="">-- الفريق --</option>';
    }
  }

  // دالة مساعدة لمنع injection
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // =========================
  // 4. باقي دوال المتتبع (مباريات قادمة، سابقة، ترتيب) - لم يتم تغييرها
  // =========================
  function now() { return new Date().getTime(); }
  function matchTime(t) { return new Date(t).getTime(); }
  const MATCH_DURATION = 105 * 60 * 1000;
  function getMatchStatus(m) {
    const start = matchTime(m.timeISO);
    const end = start + MATCH_DURATION;
    const cur = now();
    if (cur < start) {
      const diff = start - cur;
      const h = Math.floor(diff/3600000);
      const min = Math.floor((diff%3600000)/60000);
      const s = Math.floor((diff%60000)/1000);
      return { live: false, text: `⏱️ ${h}h ${min}m ${s}s` };
    } else if (cur <= end) return { live: true, text: "🔴 تُلعب الآن 🔴" };
    else return { live: false, text: "✅ انتهت" };
  }
  function upcomingMatches(arr) { return arr.filter(m => (matchTime(m.timeISO)+MATCH_DURATION) > now()); }
  function filterRound(arr, r) { if (r==="all") return arr; return arr.filter(m => m.round === r); }
  function autoUpdate(fn) { setInterval(fn, 1000); }

  function getFlag(name) {
    const map = {
      "المكسيك":"🇲🇽","جنوب أفريقيا":"🇿🇦","الأرجنتين":"🇦🇷","الجزائر":"🇩🇿","النمسا":"🇦🇹","الأردن":"🇯🇴","البرتغال":"🇵🇹","الكونغو الديمقراطية":"🇨🇩","كوريا الجنوبية":"🇰🇷","التشيك":"🇨🇿","كندا":"🇨🇦","البوسنة والهرسك":"🇧🇦","أمريكا":"🇺🇸","العراق":"🇮🇶","سويسرا":"🇨🇭","قطر":"🇶🇦","البرازيل":"🇧🇷","المغرب":"🇲🇦","هايتي":"🇭🇹","إسكتلندا":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","أستراليا":"🇦🇺","تركيا":"🇹🇷","ألمانيا":"🇩🇪","كوسوفو":"🇽🇰","اليابان":"🇯🇵","هولندا":"🇳🇱","الإكوادور":"🇪🇨","ساحل العاج":"🇨🇮","السويد":"🇸🇪","تونس":"🇹🇳","إسبانيا":"🇪🇸","الرأس الأخضر":"🇨🇻","مصر":"🇪🇬","بلجيكا":"🇧🇪","السعودية":"🇸🇦","أوروغواي":"🇺🇾","إيران":"🇮🇷","نيوزيلندا":"🇳🇿","السنغال":"🇸🇳","فرنسا":"🇫🇷","النرويج":"🇳🇴","إنجلترا":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","كرواتيا":"🇭🇷","بنما":"🇵🇦","كولومبيا":"🇨🇴","أوزبكستان":"🇺🇿","غانا":"🇬🇭","باراغواي":"🇵🇾"
    };
    return map[name] || "🏁";
  }
  function getDay(t) { return ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][new Date(t).getDay()]; }
  function getDateFmt(t) {
    const d = new Date(t);
    const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function renderUpcoming() {
    let active = upcomingMatches(matches);
    const round = document.getElementById('roundFilter').value;
    active = filterRound(active, round);
    active.sort((a,b) => matchTime(a.timeISO) - matchTime(b.timeISO));
    const container = document.getElementById('matchesContainer');
    const counter = document.getElementById('matchesCounter');
    counter.innerHTML = `🏟️ ${active.length} مباراة`;
    if (!active.length) { container.innerHTML = `<div class="empty-state">📭 لا توجد مباريات قادمة</div>`; return; }
    container.innerHTML = active.map(m => { const st = getMatchStatus(m); return `<div class="match-card ${st.live ? 'live-card' : ''}"><div class="teams"><div class="team"><span>${getFlag(m.team1)}</span> ${m.team1}</div><span class="vs">🆚</span><div class="team"><span>${getFlag(m.team2)}</span> ${m.team2}</div></div><div class="datetime-row"><div class="match-day">${getDay(m.timeISO)}</div><div class="match-full-date">${getDateFmt(m.timeISO)}</div></div><div class="info-row"><span class="round-tag">🏅 ${m.roundLabel}</span><div class="countdown-timer ${st.live ? 'live-status' : ''}" style="${st.live ? 'background:none;padding:0;' : ''}">${st.live ? '<span style="background:#d32f2f; padding:6px 14px; border-radius:40px; animation:pulse 1.2s infinite;">🔴 تُلعب الآن 🔴</span>' : st.text}</div></div></div>`; }).join('');
  }

  // الترجمة و API للمباريات السابقة (كما هي)
  const translationMap = new Map([["مکزیک","المكسيك"],["Mexico","المكسيك"],["آفریقای جنوبی","جنوب أفريقيا"],["South Africa","جنوب أفريقيا"],["آرژانتین","الأرجنتين"],["Argentina","الأرجنتين"],["الجزایر","الجزائر"],["Algeria","الجزائر"],["اتریش","النمسا"],["Austria","النمسا"],["اردن","الأردن"],["Jordan","الأردن"],["پرتغال","البرتغال"],["Portugal","البرتغال"],["کنگو دمکراتیک","الكونغو الديمقراطية"],["DR Congo","الكونغو الديمقراطية"],["کره جنوبی","كوريا الجنوبية"],["South Korea","كوريا الجنوبية"],["جمهوری چک","التشيك"],["Czech Republic","التشيك"],["کانادا","كندا"],["Canada","كندا"],["بوسنی و هرزگوین","البوسنة والهرسك"],["Bosnia and Herzegovina","البوسنة والهرسك"],["آمریکا","أمريكا"],["United States","أمريكا"],["عراق","العراق"],["Iraq","العراق"],["سوئیس","سويسرا"],["Switzerland","سويسرا"],["قطر","قطر"],["Qatar","قطر"],["برزیل","البرازيل"],["Brazil","البرازيل"],["مراکش","المغرب"],["Morocco","المغرب"],["هائیتی","هايتي"],["Haiti","هايتي"],["اسکاتلند","إسكتلندا"],["Scotland","إسكتلندا"],["استرالیا","أستراليا"],["Australia","أستراليا"],["ترکیه","تركيا"],["Turkey","تركيا"],["آلمان","ألمانيا"],["Germany","ألمانيا"],["کوزوو","كوسوفو"],["Kosovo","كوسوفو"],["ژاپن","اليابان"],["Japan","اليابان"],["هلند","هولندا"],["Netherlands","هولندا"],["اکوادور","الإكوادور"],["Ecuador","الإكوادور"],["ساحل عاج","ساحل العاج"],["Ivory Coast","ساحل العاج"],["سوئد","السويد"],["Sweden","السويد"],["تونس","تونس"],["Tunisia","تونس"],["اسپانیا","إسبانيا"],["Spain","إسبانيا"],["کیپ ورد","الرأس الأخضر"],["Cape Verde","الرأس الأخضر"],["مصر","مصر"],["Egypt","مصر"],["بلژیک","بلجيكا"],["Belgium","بلجيكا"],["عربستان سعودی","السعودية"],["Saudi Arabia","السعودية"],["اروگوئه","أوروغواي"],["Uruguay","أوروگوئه"],["ایران","إيران"],["Iran","إيران"],["نیوزیلند","نيوزيلندا"],["New Zealand","نيوزيلندا"],["سنگال","السنغال"],["Senegal","السنغال"],["فرانسه","فرنسا"],["France","فرنسا"],["نروژ","النرويج"],["Norway","النرويج"],["انگلستان","إنجلترا"],["England","إنجلترا"],["کرواسی","كرواتيا"],["Croatia","كرواتيا"],["پاناما","بنما"],["Panama","بنما"],["کلمبیا","كولومبيا"],["Colombia","كولومبيا"],["ازبکستان","أوزبكستان"],["Uzbekistan","أوزبكستان"],["غنا","غانا"],["Ghana","غانا"],["پاراگوئه","باراغواي"],["Paraguay","باراغواي"],["بوسني و هرزكوين","البوسنة والهرسك"],["كوريا الجنوبية (كوريا الشمالية)","كوريا الجنوبية"],["تشيك","التشيك"],["امریکا","أمريكا"]]);
  function translateToArabic(rawName) { if (!rawName) return ""; let trimmed = rawName.trim(); if (translationMap.has(trimmed)) return translationMap.get(trimmed); let normalized = trimmed.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); for (let [key, value] of translationMap) { if (key.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalized) return value; } return trimmed; }
  let previousGamesData = [];
  async function loadPreviousGames() { const container = document.getElementById('previousMatchesContainer'); try { const response = await fetch('https://worldcup26.ir/get/games'); const data = await response.json(); if (!data || !data.games) throw new Error("Invalid API"); let finished = data.games.filter(g => g.finished === "TRUE"); previousGamesData = finished.map(game => { let homeRaw = game.home_team_name_fa || game.home_team_name_en || ""; let awayRaw = game.away_team_name_fa || game.away_team_name_en || ""; let homeAr = translateToArabic(homeRaw); let awayAr = translateToArabic(awayRaw); let homeScore = parseInt(game.home_score, 10); let awayScore = parseInt(game.away_score, 10); let dateStr = game.local_date; let dayName = "", formattedDate = ""; if (dateStr) { let parts = dateStr.split(' '); let dateParts = parts[0].split('/'); if (dateParts.length === 3) { let d = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}T12:00:00`); dayName = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][d.getDay()]; formattedDate = `${d.getDate()} ${['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][d.getMonth()]} ${d.getFullYear()}`; } else { dayName = "تاريخ"; formattedDate = dateStr; } } return { homeAr, awayAr, homeScore, awayScore, dayName, formattedDate }; }); renderPreviousGamesFiltered(); calculateStandings(); } catch (err) { console.error(err); container.innerHTML = `<div class="empty-state">⚠️ فشل تحميل المباريات السابقة.</div>`; } }
  function renderPreviousGamesFiltered() { let games = previousGamesData; const searchText = document.getElementById('prevSearchInput').value.trim().toLowerCase(); let filtered = games; if (searchText) filtered = filtered.filter(g => g.homeAr.includes(searchText) || g.awayAr.includes(searchText)); const container = document.getElementById('previousMatchesContainer'); if (!filtered.length) { container.innerHTML = `<div class="empty-state">📋 لا توجد مباريات سابقة مطابقة.</div>`; return; } container.innerHTML = filtered.map(g => `<div class="match-card"><div class="teams"><div class="team"><span>${getFlag(g.homeAr)}</span> ${g.homeAr}</div><span class="vs">🆚</span><div class="team"><span>${getFlag(g.awayAr)}</span> ${g.awayAr}</div></div><div class="datetime-row"><div class="match-day">${g.dayName}</div><div class="match-full-date">${g.formattedDate}</div></div><div class="info-row"><span class="round-tag">🏅 النتيجة النهائية</span><div class="countdown-timer" style="background:#2c4b55;">${g.homeScore} - ${g.awayScore}</div></div></div>`).join(''); }
  function performGlobalSearch() { const keyword = document.getElementById('globalSearchInput').value.trim(); const searchContainer = document.getElementById('quickSearchResults'); const keywordSpan = document.getElementById('searchKeyword'); const resultsContainer = document.getElementById('quickResultsContainer'); if (keyword === "") { searchContainer.classList.remove('visible'); return; } searchContainer.classList.add('visible'); keywordSpan.innerText = keyword; let upcomingFiltered = upcomingMatches(matches).filter(m => m.team1.includes(keyword) || m.team2.includes(keyword)); let previousFiltered = previousGamesData.filter(g => g.homeAr.includes(keyword) || g.awayAr.includes(keyword)); let html = ''; if (upcomingFiltered.length === 0 && previousFiltered.length === 0) { html = `<div class="empty-state" style="grid-column:1/-1; padding:20px;">❌ لا توجد مباريات قادمة أو سابقة تحمل اسم "${keyword}"</div>`; } else { if (upcomingFiltered.length) { html += `<div style="grid-column:1/-1; margin:5px 0 8px 0; font-weight:bold; color:#FFE0A3;">⚡ المباريات القادمة والجارية (${upcomingFiltered.length})</div>`; upcomingFiltered.forEach(m => { const st = getMatchStatus(m); html += `<div class="quick-match-card"><div class="quick-match-teams"><span>${getFlag(m.team1)}</span> ${m.team1} 🆚 ${m.team2} <span>${getFlag(m.team2)}</span></div><div class="quick-result">${st.live ? '🔴 تُلعب الآن' : (st.text.includes('h') ? '⏳ ' + st.text : '✅ انتهت')}</div><div style="font-size:0.7rem; text-align:center;">${getDay(m.timeISO)} ${getDateFmt(m.timeISO)}</div></div>`; }); } if (previousFiltered.length) { html += `<div style="grid-column:1/-1; margin:15px 0 8px 0; font-weight:bold; color:#FFE0A3;">📋 المباريات السابقة (${previousFiltered.length})</div>`; previousFiltered.forEach(g => { html += `<div class="quick-match-card"><div class="quick-match-teams"><span>${getFlag(g.homeAr)}</span> ${g.homeAr} 🆚 ${g.awayAr} <span>${getFlag(g.awayAr)}</span></div><div class="quick-result">النتيجة: ${g.homeScore} - ${g.awayScore}</div><div style="font-size:0.7rem; text-align:center;">${g.dayName} ${g.formattedDate}</div></div>`; }); } } resultsContainer.innerHTML = html; }
  const finalGroups = { "A": ["المكسيك","جنوب أفريقيا","كوريا الجنوبية","التشيك"], "B": ["الأرجنتين","الجزائر","النمسا","الأردن"], "C": ["البرتغال","الكونغو الديمقراطية","كرواتيا","أوزبكستان"], "D": ["كندا","البوسنة والهرسك","سويسرا","قطر"], "E": ["أمريكا","العراق","تركيا","باراغواي"], "F": ["البرازيل","المغرب","هايتي","إسكتلندا"], "G": ["أستراليا","هولندا","السويد","تونس"], "H": ["ألمانيا","كوسوفو","الإكوادور","ساحل العاج"], "I": ["إسبانيا","الرأس الأخضر","السعودية","أوروغواي"], "J": ["مصر","بلجيكا","إيران","نيوزيلندا"], "K": ["السنغال","فرنسا","النرويج","إنجلترا"], "L": ["غانا","بنما","كولومبيا","الكونغو الديمقراطية"] };
  function calculateStandings() { let standings = {}; for (let [group, teams] of Object.entries(finalGroups)) { standings[group] = {}; teams.forEach(team => { standings[group][team] = { played:0, wins:0, draws:0, losses:0, goalsFor:0, goalsAgainst:0, points:0 }; }); } previousGamesData.forEach(game => { const { homeAr, awayAr, homeScore, awayScore } = game; let groupName = null; for (let [g, teams] of Object.entries(finalGroups)) { if (teams.includes(homeAr) && teams.includes(awayAr)) { groupName = g; break; } } if (!groupName) return; const stats = standings[groupName]; if (!stats[homeAr] || !stats[awayAr]) return; stats[homeAr].played++; stats[awayAr].played++; stats[homeAr].goalsFor += homeScore; stats[homeAr].goalsAgainst += awayScore; stats[awayAr].goalsFor += awayScore; stats[awayAr].goalsAgainst += homeScore; if (homeScore > awayScore) { stats[homeAr].wins++; stats[homeAr].points += 3; stats[awayAr].losses++; } else if (awayScore > homeScore) { stats[awayAr].wins++; stats[awayAr].points += 3; stats[homeAr].losses++; } else { stats[homeAr].draws++; stats[awayAr].draws++; stats[homeAr].points += 1; stats[awayAr].points += 1; } }); const container = document.getElementById('standingsContainer'); let html = ''; for (let [group, teamsStats] of Object.entries(standings)) { let tableRows = []; for (let [team, stat] of Object.entries(teamsStats)) { tableRows.push({ team, ...stat, goalDiff: stat.goalsFor - stat.goalsAgainst }); } tableRows.sort((a,b) => { if (a.points !== b.points) return b.points - a.points; if (a.goalDiff !== b.goalDiff) return b.goalDiff - a.goalDiff; return b.goalsFor - a.goalsFor; }); html += `<div class="group-card"><div class="group-title">المجموعة ${group}</div><table class="standings-table"><thead><tr><th>#</th><th>الفريق</th><th>لعب</th><th>ف</th><th>ت</th><th>خ</th><th>له</th><th>عليه</th><th>فارق</th><th>نقاط</th></tr></thead><tbody>`; tableRows.forEach((row, idx) => { html += `<tr><td>${idx+1}</td><td style="text-align:right;"><div class="team-name-td"><span>${getFlag(row.team)}</span> ${row.team}</div></td><td>${row.played}</td><td>${row.wins}</td><td>${row.draws}</td><td>${row.losses}</td><td>${row.goalsFor}</td><td>${row.goalsAgainst}</td><td>${row.goalDiff}</td><td>${row.points}</td></tr>`; }); html += `</tbody></table></div>`; } container.innerHTML = html || `<div class="empty-state">📊 لا توجد نتائج كافية لحساب الترتيب بعد.</div>`; }

  // =========================
  // 5. تهيئة التبويبات والأحداث
  // =========================
  function initTabs() {
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.getElementById(`${id}Tab`).classList.add('active');
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (id === 'previous' && previousGamesData.length === 0) loadPreviousGames();
        if (id === 'standings' && previousGamesData.length === 0) loadPreviousGames();
        if (id === 'predictions') renderPredictions();
      });
    });
  }

  function bindEvents() {
    document.getElementById('roundFilter').addEventListener('change', renderUpcoming);
    document.getElementById('prevSearchInput').addEventListener('input', renderPreviousGamesFiltered);
    document.getElementById('globalSearchInput').addEventListener('input', performGlobalSearch);
    document.getElementById('predMatchSelect').addEventListener('change', updateTeamsDropdown);
    document.getElementById('submitPrediction').addEventListener('click', async () => {
      const userName = document.getElementById('predUserName').value.trim();
      const matchId = document.getElementById('predMatchSelect').value;   // ✅ نص (String) بدون parseInt
      const team = document.getElementById('predTeamSelect').value;
      if (!userName || !matchId || !team) {
        alert("يرجى ملء جميع الحقول: اسم المستخدم، المباراة، الفريق");
        return;
      }
      await addPrediction(userName, matchId, team);   // ✅ باستخدام team
      document.getElementById('predUserName').value = '';
      document.getElementById('predMatchSelect').value = '';
      document.getElementById('predTeamSelect').innerHTML = '<option value="">-- الفريق --</option>';
      await renderPredictions();
    });
  }

  function startAutoUpdate() {
    setInterval(renderUpcoming, 1000);
    setInterval(() => {
      if (document.querySelector('.tab-btn[data-tab="previous"]').classList.contains('active')) loadPreviousGames();
      if (document.querySelector('.tab-btn[data-tab="standings"]').classList.contains('active')) calculateStandings();
      performGlobalSearch();
    }, 60000);
  }

  async function init() {
    bindEvents();
    renderUpcoming();
    startAutoUpdate();
    initTabs();
    loadPreviousGames();
    populateMatchesDropdown();
    await renderPredictions();
  }
  init();
</script>
</body>
</html>
