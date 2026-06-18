<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>🏆 كأس العالم 2026 – متتبع المباريات + توقعات + ترتيب</title>
  <style>
    /* ========== الأنماط الأساسية ========== */
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body { background: radial-gradient(circle at 10% 20%, #0a1f24, #030c10); font-family: 'Segoe UI', 'Cairo', 'Inter', system-ui, -apple-system, 'Roboto', sans-serif; padding: 20px 12px; min-height: 100vh; color: #f0f9ff; font-size: 14px; }
    .app-container { max-width: 1200px; margin: 0 auto; width: 100%; }
    
    /* ===== شريط الأخبار المتحرك ===== */
    .upper-bar {
      background: linear-gradient(90deg, #1a2f2f, #2a414b, #1a2f2f);
      border: 1px solid rgba(255, 180, 70, 0.3);
      border-radius: 60px;
      padding: 8px 16px;
      margin-bottom: 16px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 0 20px rgba(255, 180, 70, 0.1);
    }
    .news-ticker {
      display: inline-block;
      white-space: nowrap;
      animation: tickerScroll 42s linear infinite;
      font-size: 0.85rem;
      color: #FFE6B0;
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    .news-ticker span {
      display: inline-block;
      padding: 0 20px;
    }
    .news-ticker .highlight {
      color: #ffb347;
      font-weight: 700;
    }
    .news-ticker .emoji {
      font-size: 1rem;
    }
    .news-ticker .separator {
      color: #ffb34780;
    }
    @keyframes tickerScroll {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    /* إيقاف الحركة عند التمرير */
    .upper-bar:hover .news-ticker {
      animation-play-state: paused;
    }
    
    .hero {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border-radius: 48px;
      padding: 20px;
      margin-bottom: 28px;
      text-align: center;
      border: 1px solid rgba(255, 200, 100, 0.3);
      box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }
    .hero h1 { font-size: 1.8rem; background: linear-gradient(135deg, #FFE6B0, #FFA559, #FF6A3D); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 8px; letter-spacing: -0.5px; }
    .school-badge { background: rgba(30, 74, 95, 0.7); backdrop-filter: blur(4px); display: inline-block; padding: 6px 20px; border-radius: 60px; font-size: 0.75rem; font-weight: 500; border: 1px solid #ffb34760; }
    .control-panel { background: rgba(10, 25, 30, 0.6); backdrop-filter: blur(16px); border-radius: 80px; padding: 8px 20px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 28px; border: 1px solid rgba(255, 200, 100, 0.25); }
    .search-group { flex: 2; min-width: 160px; }
    .search-group input { width: 100%; padding: 12px 20px; border-radius: 60px; border: none; background: #fef9e6; text-align: right; outline: none; font-size: 0.85rem; font-weight: 500; transition: 0.2s; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
    .search-group input:focus { transform: scale(0.98); box-shadow: 0 0 0 2px #ffb347; }
    .round-group { flex: 1; min-width: 130px; }
    .round-group select { width: 100%; padding: 12px 12px; border-radius: 60px; background: #fef9e6; font-weight: bold; cursor: pointer; font-size: 0.8rem; border: none; outline: none; font-family: inherit; }
    .tabs { display: flex; flex-wrap: wrap; gap: 12px; margin: 20px 0 24px; justify-content: center; }
    .tab-btn { background: rgba(20, 40, 48, 0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255, 180, 70, 0.4); padding: 10px 20px; border-radius: 60px; font-size: 0.85rem; font-weight: 600; cursor: pointer; color: #ffefa6; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 8px; letter-spacing: 0.3px; }
    .tab-btn i { font-style: normal; font-size: 1.1rem; }
    .tab-btn.active { background: linear-gradient(105deg, #ffb347, #ff8c1a); color: #1a2f2f; border-color: #ffdd99; box-shadow: 0 8px 18px rgba(255, 140, 26, 0.25); }
    .tab-btn:hover:not(.active) { background: rgba(255, 180, 70, 0.2); border-color: #ffb347; transform: translateY(-2px); }
    .tab-content { display: none; animation: fadeSlide 0.25s ease; }
    .tab-content.active { display: block; }
    @keyframes fadeSlide { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .matches-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 22px; }
    .match-card { background: rgba(18, 38, 44, 0.75); backdrop-filter: blur(12px); border-radius: 32px; padding: 16px; border: 1px solid rgba(255, 180, 70, 0.3); transition: all 0.25s; box-shadow: 0 12px 24px -12px rgba(0,0,0,0.4); }
    .match-card:hover { transform: translateY(-3px); border-color: #ffb347aa; box-shadow: 0 20px 30px -12px black; }
    .match-card.live-card { border: 2px solid #ff4d4d; background: linear-gradient(135deg, #2a414b, #0f2e36); box-shadow: 0 0 12px rgba(255, 60, 30, 0.4); }
    
    /* ===== تنسيق الفرق والنتيجة ===== */
    .teams-score {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      background: rgba(0, 0, 0, 0.3);
      padding: 10px 12px;
      border-radius: 80px;
    }
    .team {
      background: rgba(0, 0, 0, 0.4);
      padding: 6px 12px;
      border-radius: 60px;
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.85rem;
      white-space: nowrap;
      overflow-x: auto;
    }
    .team span:first-child { font-size: 1.2rem; }
    
    .score-display {
      background: linear-gradient(135deg, #ffb347, #ff8c1a);
      padding: 4px 16px;
      border-radius: 40px;
      font-weight: 800;
      font-size: 1rem;
      color: #1a2f2f;
      min-width: 50px;
      text-align: center;
      box-shadow: 0 0 15px rgba(255, 180, 70, 0.3);
      letter-spacing: 1px;
      border: 1px solid rgba(255, 200, 100, 0.5);
    }
    .score-display.finished {
      background: linear-gradient(135deg, #4CAF50, #45a049);
      box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
      border-color: rgba(76, 175, 80, 0.5);
    }
    .score-display.live-score {
      background: linear-gradient(135deg, #ff4444, #cc0000);
      animation: scorePulse 1s infinite;
      box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
      border-color: rgba(255, 68, 68, 0.7);
    }
    @keyframes scorePulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .vs-badge {
      background: rgba(255, 180, 70, 0.2);
      padding: 2px 8px;
      border-radius: 20px;
      font-size: 0.6rem;
      color: #ffb347;
      font-weight: 600;
    }
    
    .datetime-row {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      background: rgba(0, 0, 0, 0.35);
      padding: 8px 14px;
      border-radius: 50px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .match-day { background: #1e4a5f; padding: 4px 12px; border-radius: 40px; font-size: 0.7rem; font-weight: 600; }
    .match-full-date { background: rgba(0, 0, 0, 0.5); padding: 4px 12px; border-radius: 40px; font-size: 0.7rem; display: flex; gap: 6px; align-items: baseline; }
    .info-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
    .round-tag { background: #2f5663; padding: 4px 14px; border-radius: 60px; font-size: 0.7rem; font-weight: 500; }
    .countdown-timer { background: #00000070; font-family: monospace; font-size: 0.9rem; font-weight: bold; padding: 4px 14px; border-radius: 60px; text-align: center; letter-spacing: 0.5px; }
    .live-status { animation: pulse 1.2s infinite; background: #d32f2f; }
    @keyframes pulse { 0% { opacity: 0.75; background: #b71c1c; box-shadow: 0 0 0 0 #ff5e5e; } 50% { opacity: 1; background: #f44336; box-shadow: 0 0 0 3px rgba(255, 68, 34, 0.4); } 100% { opacity: 0.75; background: #b71c1c; } }
    
    .empty-state { grid-column: 1/-1; text-align: center; background: rgba(12, 34, 40, 0.7); backdrop-filter: blur(8px); padding: 40px 20px; border-radius: 60px; font-size: 1rem; border: 1px dashed #ffb34780; }
    .filter-bar { margin-bottom: 24px; background: rgba(0, 0, 0, 0.25); padding: 8px 16px; border-radius: 80px; display: flex; }
    .filter-bar input { background: #fef7e0; border: none; padding: 12px 20px; border-radius: 60px; width: 100%; font-size: 0.85rem; outline: none; }
    .groups-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; }
    .group-card { background: rgba(30, 60, 72, 0.65); backdrop-filter: blur(12px); border-radius: 32px; padding: 16px; border: 1px solid #ffb34760; transition: 0.2s; }
    .group-title { font-size: 1.4rem; font-weight: 800; text-align: center; margin-bottom: 16px; color: #FFE6B0; letter-spacing: -0.5px; }
    .standings-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; min-width: 320px; }
    .standings-table th, .standings-table td { padding: 8px 4px; text-align: center; }
    .standings-table th { background: #1e4655; color: #FFE0A3; font-weight: 700; border-radius: 16px 16px 0 0; }
    .standings-table td { background-color: #f3f7f9; color: #11242a; font-weight: 600; border-bottom: 1px solid #cddce0; }
    .team-name-td { text-align: right; display: flex; align-items: center; gap: 6px; justify-content: flex-start; }
    .quick-search-results { background: rgba(0, 25, 30, 0.92); backdrop-filter: blur(24px); border-radius: 36px; padding: 20px; margin-bottom: 24px; border: 1px solid #ffb347cc; }
    .quick-search-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 16px; border-right: 4px solid #ffb347; padding-right: 16px; }
    .quick-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .quick-match-card { background: #0f3e4a; border-radius: 28px; padding: 12px; transition: 0.1s; }
    .quick-match-teams { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-weight: bold; font-size: 0.85rem; }

    /* ========== تنسيقات التوقعات ========== */
    #predictionForm {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px);
      padding: 20px;
      border-radius: 32px;
      margin-bottom: 24px;
      border: 1px solid rgba(255, 180, 70, 0.3);
    }
    #predictionForm input, #predictionForm select {
      background: #fef9e6;
      border: none;
      padding: 10px 16px;
      border-radius: 60px;
      font-size: 0.9rem;
      outline: none;
      color: #1a2f2f;
      min-width: 120px;
    }
    #predictionForm input::placeholder { color: #555; }
    #predictionForm select option { color: #1a2f2f; }
    #predictionForm button {
      background: #ffb347;
      border: none;
      padding: 10px 24px;
      border-radius: 60px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
      color: #1a2f2f;
    }
    #predictionForm button:hover { background: #ff9f1a; transform: scale(0.97); }
    #predictionForm button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    #predictionMessage {
      margin-top: 12px;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 40px;
      background: rgba(0,0,0,0.3);
    }
    
    /* ===== تنسيق بطاقات التوقعات ===== */
    .prediction-card {
      background: rgba(18, 38, 44, 0.75);
      backdrop-filter: blur(12px);
      border-radius: 32px;
      padding: 16px;
      border: 1px solid rgba(255, 180, 70, 0.3);
      transition: 0.2s;
    }
    .prediction-card:hover {
      transform: translateY(-2px);
      border-color: #ffb347aa;
    }
    .prediction-card .user-name {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 180, 70, 0.2);
      font-size: 0.95rem;
    }
    .prediction-card .user-name .avatar {
      background: linear-gradient(135deg, #ffb347, #ff8c1a);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #1a2f2f;
      font-size: 0.9rem;
    }
    .prediction-card .pred-detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
      font-size: 0.85rem;
    }
    .prediction-card .match-info {
      font-size: 0.75rem;
      color: #98bdc9;
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .prediction-badge {
      background: linear-gradient(135deg, #ffb347, #ff8c1a);
      padding: 6px 20px;
      border-radius: 40px;
      font-weight: 800;
      color: #1a2f2f;
      display: inline-block;
      font-size: 0.85rem;
      box-shadow: 0 0 15px rgba(255, 180, 70, 0.2);
      border: 1px solid rgba(255, 200, 100, 0.3);
      letter-spacing: 0.5px;
    }
    .prediction-badge.home {
      background: linear-gradient(135deg, #4CAF50, #45a049);
      border-color: rgba(76, 175, 80, 0.5);
      color: white;
    }
    .prediction-badge.away {
      background: linear-gradient(135deg, #f44336, #d32f2f);
      border-color: rgba(244, 67, 54, 0.5);
      color: white;
    }
    .prediction-badge.draw {
      background: linear-gradient(135deg, #FF9800, #F57C00);
      border-color: rgba(255, 152, 0, 0.5);
      color: white;
    }
    
    /* ===== تنسيق Leaderboard ===== */
    .leaderboard-item {
      background: rgba(18, 38, 44, 0.75);
      backdrop-filter: blur(12px);
      border-radius: 32px;
      padding: 16px 20px;
      border: 1px solid rgba(255, 180, 70, 0.3);
      transition: 0.2s;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .leaderboard-item:hover {
      transform: translateX(-4px);
      border-color: #ffb347aa;
    }
    .leaderboard-item .rank {
      font-size: 1.2rem;
      font-weight: 800;
      color: #ffb347;
      min-width: 50px;
    }
    .leaderboard-item .rank.gold { color: #FFD700; }
    .leaderboard-item .rank.silver { color: #C0C0C0; }
    .leaderboard-item .rank.bronze { color: #CD7F32; }
    .leaderboard-item .player-name {
      font-size: 1rem;
      font-weight: 600;
      flex: 1;
      margin: 0 12px;
    }
    .leaderboard-item .player-name .avatar-small {
      display: inline-block;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ffb347, #ff8c1a);
      text-align: center;
      line-height: 28px;
      font-weight: 800;
      color: #1a2f2f;
      margin-left: 8px;
      font-size: 0.8rem;
    }
    .leaderboard-item .points {
      background: linear-gradient(135deg, #ffb347, #ff8c1a);
      padding: 4px 18px;
      border-radius: 40px;
      font-weight: 800;
      color: #1a2f2f;
      font-size: 0.9rem;
      min-width: 60px;
      text-align: center;
    }
    .leaderboard-item .medal {
      font-size: 1.5rem;
      margin-left: 8px;
    }
    .leaderboard-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: #ffb347;
      animation: spin 1s ease-in-out infinite;
      margin-left: 8px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    footer { margin-top: 45px; text-align: center; font-size: 0.7rem; color: #98bdc9; border-top: 1px solid #ffb34760; padding-top: 20px; }

    /* ===== رسالة منع التوقع ===== */
    .prediction-blocked {
      background: rgba(255, 68, 68, 0.15);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 40px;
      padding: 8px 16px;
      color: #ff6b6b;
      font-size: 0.8rem;
      display: inline-block;
    }

    @media (max-width: 550px) {
      body { padding: 12px; }
      .hero h1 { font-size: 1.3rem; }
      .tab-btn { padding: 6px 14px; font-size: 0.75rem; gap: 4px; }
      .team { font-size: 0.7rem; white-space: normal; }
      .team span:first-child { font-size: 1rem; }
      .countdown-timer { font-size: 0.75rem; }
      .matches-grid { gap: 14px; }
      #predictionForm > div { flex-direction: column; align-items: stretch; }
      #predictionForm input, #predictionForm select { min-width: unset; }
      .teams-score { flex-wrap: wrap; justify-content: center; }
      .team { min-width: 80px; }
      .prediction-card .pred-detail { flex-direction: column; gap: 8px; align-items: flex-start; }
      .leaderboard-item { flex-wrap: wrap; gap: 8px; }
      .leaderboard-item .player-name { margin: 0; width: 100%; }
      .news-ticker { font-size: 0.7rem; }
      .upper-bar { padding: 6px 12px; }
    }
  </style>
</head>
<body>
<div class="app-container">
  
  <!-- ===== شريط الأخبار المتحرك ===== -->
  <div class="upper-bar">
    <div class="news-ticker">
      <span>🗳️ طريقة التوقع: اختر المباراة → اختر (فوز الفريق الأول / فوز الفريق الثاني / تعادل) → اكتب اسمك → اضغط حفظ التوقع ✨</span>
      <span class="separator">|</span>
      <span>التوقعات تظهر للجميع مباشرة ويتم احتساب النقاط تلقائياً 🏆</span>
      <span class="separator">|</span>
      <span>⛔ لا يمكن التوقع على المباريات الجارية</span>
      <span class="separator">|</span>
      <span>🗳️ طريقة التوقع: اختر المباراة → اختر (فوز الفريق الأول / فوز الفريق الثاني / تعادل) → اكتب اسمك → اضغط حفظ التوقع ✨</span>
      <span class="separator">|</span>
      <span>التوقعات تظهر للجميع مباشرة ويتم احتساب النقاط تلقائياً 🏆</span>
    </div>
  </div>

  <div class="hero">
    <h1>🏆 كأس العالم 2026 ⚡</h1>
    <div class="school-badge">📢 غرفة معلمي سعيد بن العاص</div>
  </div>

  <div class="control-panel">
    <div class="search-group">
      <input type="text" id="globalSearchInput" placeholder="🔍 ابحث عن منتخب (مباريات قادمة أو سابقة)" autocomplete="off">
    </div>
    <div class="round-group">
      <select id="roundFilter">
        <option value="all">🌍 جميع الجولات</option>
        <option value="first">🟢 الجولة الأولى</option>
        <option value="second">🟩 الجولة الثانية</option>
        <option value="third">🟥 الجولة الثالثة</option>
      </select>
    </div>
  </div>

  <div id="quickSearchResults" class="quick-search-results">
    <div class="quick-search-title">🔍 نتائج البحث عن "<span id="searchKeyword"></span>"</div>
    <div id="quickResultsContainer" class="quick-grid"></div>
  </div>

  <div class="tabs">
    <button class="tab-btn active" data-tab="upcoming"><i>⚡</i> القادمة والجارية</button>
    <button class="tab-btn" data-tab="previous"><i>📋</i> المباريات السابقة</button>
    <button class="tab-btn" data-tab="standings"><i>📊</i> ترتيب المجموعات</button>
    <button class="tab-btn" data-tab="predictions"><i>🗳️</i> التوقعات</button>
    <button class="tab-btn" data-tab="leaderboard"><i>🏆</i> الترتيب</button>
  </div>

  <div id="upcomingTab" class="tab-content active">
    <div id="matchesContainer" class="matches-grid"><div class="empty-state">✨ جاري تحميل المباريات ✨</div></div>
  </div>

  <div id="previousTab" class="tab-content">
    <div class="filter-bar">
      <input type="text" id="prevSearchInput" placeholder="🔍 بحث في المباريات السابقة...">
    </div>
    <div id="previousMatchesContainer" class="matches-grid"><div class="empty-state">📋 جاري تحميل المباريات السابقة...</div></div>
  </div>

  <div id="standingsTab" class="tab-content">
    <div id="standingsContainer" class="groups-container"><div class="empty-state">📊 جاري حساب الترتيب من نتائج API...</div></div>
  </div>

  <div id="predictionsTab" class="tab-content">
    <div id="predictionForm">
      <h3>📝 توقع نتيجة مباراة</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <input type="text" id="userNameInput" placeholder="👤 اسمك" style="flex:1; min-width:120px;">
        <select id="matchSelect" style="flex:2; min-width:180px;"></select>
        <select id="predictionInput" style="flex:1.5; min-width:150px;">
          <option value="">🔮 اختر توقعك</option>
        </select>
        <button id="savePredictionBtn">💾 حفظ التوقع</button>
      </div>
      <div id="predictionMessage"></div>
      <div id="matchStatusWarning" style="margin-top:8px; display:none;" class="prediction-blocked">
        ⚠️ هذه المباراة تُلعب الآن، لا يمكنك التوقع عليها
      </div>
    </div>
    <h3 style="margin: 20px 0 12px 0; color: #FFE6B0;">🗳️ جميع التوقعات</h3>
    <div id="allPredictions" class="matches-grid"><div class="empty-state">📭 جاري تحميل التوقعات...</div></div>
  </div>

  <div id="leaderboardTab" class="tab-content">
    <h3 style="margin: 0 0 16px 0; color: #FFE6B0;">🏆 ترتيب اللاعبين</h3>
    <div id="leaderboardContainer" class="leaderboard-grid"><div class="empty-state">⏳ جاري تحميل الترتيب...</div></div>
  </div>

  <footer>🔄 التحديث التلقائي | التوقعات محفوظة في Supabase</footer>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  // ============================================================
  //  بيانات اتصال Supabase
  // ============================================================
  const SUPABASE_URL = "https://szjxwhsmefqpfcebtvei.supabase.co";
  const SUPABASE_KEY = "sb_publishable_0um28lgPMHcjDOThT0UgDA_K-Y7Wmx3";

  let supabaseClient;

  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("✅ Supabase متصل بنجاح");
  } catch (err) {
    console.error("❌ فشل الاتصال بـ Supabase:", err.message);
    supabaseClient = null;
  }

  // ============================================================
  //  1) حفظ التوقع
  // ============================================================
  async function savePrediction(userName, matchId, prediction) {
    if (!supabaseClient) {
      return { success: false, message: "Supabase غير متصل." };
    }

    if (!prediction || prediction === "") {
      return { success: false, message: "الرجاء اختيار فريق." };
    }

    try {
      const { data, error } = await supabaseClient
        .from("predictions")
        .insert([{
          user_name: userName,
          match_id: matchId,
          prediction: prediction
        }]);

      if (error) {
        console.error("❌ خطأ Supabase:", error.message);
        return { success: false, message: error.message };
      }

      console.log("✅ تم حفظ التوقع:", data);
      return { success: true, data };
    } catch (err) {
      console.error("❌ استثناء:", err);
      return { success: false, message: err.message };
    }
  }

  // ============================================================
  //  2) جلب كل التوقعات
  // ============================================================
  async function getAllPredictions() {
    if (!supabaseClient) {
      console.warn("⚠️ Supabase غير متاح.");
      return [];
    }

    try {
      const { data, error } = await supabaseClient
        .from("predictions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ خطأ جلب التوقعات:", error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error("❌ استثناء في getAllPredictions:", err);
      return [];
    }
  }

  // ============================================================
  //  3) عرض كل التوقعات
  // ============================================================
  async function renderAllPredictions() {
    const container = document.getElementById('allPredictions');

    const predictions = await getAllPredictions();

    if (!predictions || predictions.length === 0) {
      container.innerHTML = `<div class="empty-state">📭 لا توجد توقعات بعد</div>`;
      return;
    }

    container.innerHTML = predictions.map(p => {
      let text = "";
      let className = "";

      if (p.prediction === "DRAW") {
        text = "🤝 تعادل الفريقين";
        className = "draw";
      } else {
        const flag = getFlag(p.prediction) || "🏁";
        text = `🏆 فوز ${flag} ${p.prediction}`;
        className = "home";
      }

      let matchInfo = "";
      if (p.match_id) {
        const parts = p.match_id.split('_');
        if (parts.length >= 3) {
          const team1 = parts[1] || '';
          const team2 = parts[2] || '';
          if (team1 && team2) {
            matchInfo = `${team1} 🆚 ${team2}`;
          }
        }
      }

      return `
        <div class="prediction-card">
          <div class="user-name">
            <div class="avatar">${p.user_name ? p.user_name.charAt(0).toUpperCase() : '👤'}</div>
            <b>${p.user_name || 'مجهول'}</b>
            ${matchInfo ? `<span style="font-size:0.7rem; color:#98bdc9; margin-right:auto;">📅 ${matchInfo}</span>` : ''}
          </div>

          <div class="pred-detail">
            <span>🔮 التوقع</span>
            <span class="prediction-badge ${className}">
              ${text}
            </span>
          </div>

          <div class="match-info">
            🕒 ${p.created_at ? new Date(p.created_at).toLocaleString('ar') : 'تاريخ غير معروف'}
          </div>
        </div>
      `;
    }).join('');
  }

  // ============================================================
  //  4) Leaderboard System
  // ============================================================
  function calculateLeaderboard(predictions, matches) {
    const scores = {};

    predictions.forEach(p => {
      if (!scores[p.user_name]) {
        scores[p.user_name] = { name: p.user_name, points: 0, correct: 0, total: 0 };
      }
      scores[p.user_name].total += 1;
    });

    predictions.forEach(p => {
      const parts = p.match_id.split('_');
      const team1 = parts[1];
      const team2 = parts[2];

      const match = matches.find(m =>
        (m.homeAr === team1 && m.awayAr === team2) ||
        (m.homeAr === team2 && m.awayAr === team1)
      );

      if (!match) return;

      let result = "";
      if (match.homeScore > match.awayScore) {
        result = match.homeAr;
      } else if (match.homeScore < match.awayScore) {
        result = match.awayAr;
      } else {
        result = "DRAW";
      }

      if (p.prediction === result) {
        scores[p.user_name].points += 1;
        scores[p.user_name].correct += 1;
      }
    });

    return Object.values(scores)
      .sort((a, b) => b.points - a.points)
      .map((player, index) => ({ ...player, rank: index + 1 }));
  }

  // ============================================================
  //  5) عرض Leaderboard
  // ============================================================
  async function renderLeaderboard() {
    const container = document.getElementById("leaderboardContainer");

    const predictions = await getAllPredictions();

    if (!previousGamesData || previousGamesData.length === 0) {
      container.innerHTML = `<div class="empty-state">⏳ جاري تحميل النتائج...</div>`;
      return;
    }

    if (!predictions || predictions.length === 0) {
      container.innerHTML = `<div class="empty-state">📭 لا توجد توقعات لحساب الترتيب</div>`;
      return;
    }

    const board = calculateLeaderboard(predictions, previousGamesData);

    if (board.length === 0) {
      container.innerHTML = `<div class="empty-state">📭 لا توجد بيانات كافية للترتيب</div>`;
      return;
    }

    container.innerHTML = board.map((p, i) => {
      let rankClass = "";
      let medal = "";
      if (i === 0) { rankClass = "gold"; medal = "🥇"; }
      else if (i === 1) { rankClass = "silver"; medal = "🥈"; }
      else if (i === 2) { rankClass = "bronze"; medal = "🥉"; }

      const accuracy = p.total > 0 ? Math.round((p.correct / p.total) * 100) : 0;

      return `
        <div class="leaderboard-item">
          <div class="rank ${rankClass}">
            ${medal || `#${p.rank}`}
          </div>
          <div class="player-name">
            <span class="avatar-small">${p.name.charAt(0).toUpperCase()}</span>
            ${p.name}
            <span style="font-size:0.7rem; color:#98bdc9; margin-right:8px;">
              (${p.correct}/${p.total} • ${accuracy}%)
            </span>
          </div>
          <div class="points">${p.points} نقطة</div>
        </div>
      `;
    }).join('');
  }

  // ============================================================
  //  6) رسالة النجاح
  // ============================================================
  function showPredictionMessage(msg, type = "success") {
    const el = document.getElementById("predictionMessage");
    el.innerHTML = msg;
    el.style.color = type === "success" ? "#8bc34a" : type === "error" ? "#ff5252" : "#ffb347";
    el.style.background = type === "success" ? "rgba(139,195,74,0.15)" : type === "error" ? "rgba(255,82,82,0.15)" : "rgba(255,179,71,0.15)";
  }

  // ============================================================
  //  دوال الوقت والمباريات
  // ============================================================
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
  
  function isMatchLive(timeISO) {
    const start = matchTime(timeISO);
    const end = start + MATCH_DURATION;
    const cur = now();
    return cur >= start && cur <= end;
  }
  
  function upcomingMatches(arr) { return arr.filter(m => (matchTime(m.timeISO)+MATCH_DURATION) > now()); }
  function filterRound(arr, r) { if (r==="all") return arr; return arr.filter(m => m.round === r); }

  // ============================================================
  //  ترجمة الأسماء
  // ============================================================
  const nameMapping = new Map([
    ["مکزیک", "المكسيك"], ["Mexico", "المكسيك"], ["مكسيك", "المكسيك"],
    ["آفریقای جنوبی", "جنوب أفريقيا"], ["South Africa", "جنوب أفريقيا"], ["افریقای جنوبی", "جنوب أفريقيا"],
    ["أفريقيا الشمالية", "جنوب أفريقيا"],
    ["آرژانتین", "الأرجنتين"], ["Argentina", "الأرجنتين"], ["ارژانتین", "الأرجنتين"],
    ["الجزایر", "الجزائر"], ["Algeria", "الجزائر"], ["الجزائر", "الجزائر"],
    ["اتریش", "النمسا"], ["Austria", "النمسا"], ["اتریش", "النمسا"],
    ["اردن", "الأردن"], ["Jordan", "الأردن"], ["اردن", "الأردن"],
    ["پرتغال", "البرتغال"], ["پرتقال", "البرتغال"], ["Portugal", "البرتغال"], ["پرتغال", "البرتغال"],
    ["کنگو دمکراتیک", "الكونغو الديمقراطية"], ["جمهوری کنگو", "الكونغو الديمقراطية"], ["DR Congo", "الكونغو الديمقراطية"],
    ["کنگو", "الكونغو الديمقراطية"], ["کانگو", "الكونغو الديمقراطية"], ["دمکراتیک کنگو", "الكونغو الديمقراطية"],
    ["کره جنوبی", "كوريا الجنوبية"], ["South Korea", "كوريا الجنوبية"], ["کره جنوبي", "كوريا الجنوبية"],
    ["جمهوری چک", "التشيك"], ["Czech Republic", "التشيك"], ["چک", "التشيك"],
    ["کانادا", "كندا"], ["Canada", "كندا"],
    ["بوسنی و هرزگوین", "البوسنة والهرسك"], ["Bosnia and Herzegovina", "البوسنة والهرسك"], ["بوسنی", "البوسنة والهرسك"],
    ["آمریکا", "أمريكا"], ["United States", "أمريكا"], ["امریکا", "أمريكا"], ["US", "أمريكا"],
    ["عراق", "العراق"], ["Iraq", "العراق"], ["العراق", "العراق"],
    ["سوئیس", "سويسرا"], ["Switzerland", "سويسرا"], ["سویس", "سويسرا"],
    ["قطر", "قطر"], ["Qatar", "قطر"],
    ["برزیل", "البرازيل"], ["Brazil", "البرازيل"], ["برزیل", "البرازيل"],
    ["مراکش", "المغرب"], ["Morocco", "المغرب"], ["مراكش", "المغرب"],
    ["هائیتی", "هايتي"], ["Haiti", "هايتي"], ["هائیتی", "هايتي"],
    ["اسکاتلند", "إسكتلندا"], ["Scotland", "إسكتلندا"], ["اسكاتلند", "إسكتلندا"],
    ["استرالیا", "أستراليا"], ["Australia", "أستراليا"], ["استراليا", "أستراليا"],
    ["ترکیه", "تركيا"], ["Turkey", "تركيا"], ["ترکیه", "تركيا"],
    ["آلمان", "ألمانيا"], ["Germany", "ألمانيا"], ["المان", "ألمانيا"],
    ["کوراساو", "كوراساو"], ["Curaçao", "كوراساو"], ["کوراسائو", "كوراساو"], ["کوراساو", "كوراساو"],
    ["ژاپن", "اليابان"], ["Japan", "اليابان"], ["ژاپن", "اليابان"],
    ["هلند", "هولندا"], ["Netherlands", "هولندا"], ["هولندا", "هولندا"],
    ["اکوادور", "الإكوادور"], ["Ecuador", "الإكوادور"], ["اكوادور", "الإكوادور"],
    ["ساحل عاج", "ساحل العاج"], ["Ivory Coast", "ساحل العاج"], ["ساحل عاج", "ساحل العاج"],
    ["سوئد", "السويد"], ["Sweden", "السويد"], ["سويد", "السويد"],
    ["تونس", "تونس"], ["Tunisia", "تونس"],
    ["اسپانیا", "إسبانيا"], ["Spain", "إسبانيا"], ["اسبانيا", "إسبانيا"],
    ["کیپ ورد", "الرأس الأخضر"], ["Cape Verde", "الرأس الأخضر"], ["کیپ ورد", "الرأس الأخضر"],
    ["مصر", "مصر"], ["Egypt", "مصر"],
    ["بلژیک", "بلجيكا"], ["Belgium", "بلجيكا"], ["بلژیک", "بلجيكا"],
    ["عربستان سعودی", "السعودية"], ["سعودی", "السعودية"], ["Saudi Arabia", "السعودية"], ["السعودية", "السعودية"],
    ["اروگوئه", "أوروغواي"], ["اروگویه", "أوروغواي"], ["Uruguay", "أوروغواي"], ["اروگوئه", "أوروغواي"],
    ["ایران", "إيران"], ["Iran", "إيران"],
    ["نیوزیلند", "نيوزيلندا"], ["New Zealand", "نيوزيلندا"], ["نیوزیلند", "نيوزيلندا"],
    ["سنگال", "السنغال"], ["Senegal", "السنغال"], ["سنگال", "السنغال"],
    ["فرانسه", "فرنسا"], ["France", "فرنسا"], ["فرانسه", "فرنسا"],
    ["نروژ", "النرويج"], ["Norway", "النرويج"], ["نروژ", "النرويج"],
    ["انگلستان", "إنجلترا"], ["England", "إنجلترا"], ["انگلستان", "إنجلترا"],
    ["کرواسی", "كرواتيا"], ["Croatia", "كرواتيا"], ["کرواسی", "كرواتيا"],
    ["پاناما", "بنما"], ["Panama", "بنما"], ["پاناما", "بنما"],
    ["کلمبیا", "كولومبيا"], ["Colombia", "كولومبيا"], ["کلمبیا", "كولومبيا"],
    ["ازبکستان", "أوزبكستان"], ["Uzbekistan", "أوزبكستان"], ["ازبکستان", "أوزبكستان"],
    ["غنا", "غانا"], ["Ghana", "غانا"],
    ["پاراگوئه", "باراغواي"], ["Paraguay", "باراغواي"], ["پاراگوئه", "باراغواي"],
  ]);

  function normalizeName(str) {
    if (!str) return "";
    str = str.normalize("NFD").replace(/[\u064B-\u065F]/g, "");
    str = str.replace(/[ى]/g, "ا");
    str = str.replace(/[أإآ]/g, "ا");
    str = str.replace(/ة/g, "ه");
    str = str.replace(/[ک]/g, "ك");
    str = str.replace(/[ی]/g, "ي");
    str = str.trim().replace(/\s+/g, ' ');
    return str;
  }

  function partialMatch(raw, normalized) {
    for (let [key, value] of nameMapping) {
      let keyNorm = normalizeName(key);
      if (normalized.includes(keyNorm) || keyNorm.includes(normalized)) {
        console.log(`🔍 تطابق جزئي: "${raw}" -> "${value}" (بواسطة "${key}")`);
        return value;
      }
    }
    return null;
  }

  function translateToArabic(raw) {
    if (!raw) return "";
    let trimmed = raw.trim();
    if (nameMapping.has(trimmed)) {
      const result = nameMapping.get(trimmed);
      console.log(`✅ ترجمة مباشرة: "${trimmed}" -> "${result}"`);
      return result;
    }
    let normalized = normalizeName(trimmed);
    for (let [key, value] of nameMapping) {
      if (normalizeName(key) === normalized) {
        console.log(`✅ ترجمة بعد التطبيع: "${trimmed}" (مطبع: "${normalized}") -> "${value}"`);
        return value;
      }
    }
    let lower = trimmed.toLowerCase();
    for (let [key, value] of nameMapping) {
      if (key.toLowerCase() === lower) {
        console.log(`✅ ترجمة غير حساسة: "${trimmed}" -> "${value}"`);
        return value;
      }
    }
    let partial = partialMatch(trimmed, normalized);
    if (partial) return partial;
    console.warn(`⚠️ لم يتم العثور على ترجمة لـ "${trimmed}"`);
    return trimmed;
  }

  // ============================================================
  //  بيانات المباريات القادمة (بتوقيت +3 GMT)
  // ============================================================
  const rawMatches = [
    { team1:"المكسيك", team2:"جنوب أفريقيا", time:"2026-06-11T22:00:00", round:"first" },{ team1:"الأرجنتين", team2:"الجزائر", time:"2026-06-11T04:00:00", round:"first" },
    { team1:"النمسا", team2:"الأردن", time:"2026-06-11T07:00:00", round:"first" },{ team1:"البرتغال", team2:"الكونغو الديمقراطية", time:"2026-06-11T20:00:00", round:"first" },
    { team1:"كوريا الجنوبية", team2:"التشيك", time:"2026-06-12T05:00:00", round:"first" },{ team1:"كندا", team2:"البوسنة والهرسك", time:"2026-06-12T22:00:00", round:"first" },
    { team1:"أمريكا", team2:"العراق", time:"2026-06-13T04:00:00", round:"first" },{ team1:"سويسرا", team2:"قطر", time:"2026-06-13T22:00:00", round:"first" },
    { team1:"البرازيل", team2:"المغرب", time:"2026-06-14T01:00:00", round:"first" },{ team1:"هايتي", team2:"إسكتلندا", time:"2026-06-14T04:00:00", round:"first" },
    { team1:"أستراليا", team2:"تركيا", time:"2026-06-14T07:00:00", round:"first" },{ team1:"ألمانيا", team2:"كوراساو", time:"2026-06-14T20:00:00", round:"first" },
    { team1:"اليابان", team2:"هولندا", time:"2026-06-14T23:00:00", round:"first" },{ team1:"الإكوادور", team2:"ساحل العاج", time:"2026-06-15T02:00:00", round:"first" },
    { team1:"السويد", team2:"تونس", time:"2026-06-15T05:00:00", round:"first" },{ team1:"إسبانيا", team2:"الرأس الأخضر", time:"2026-06-15T19:00:00", round:"first" },
    { team1:"مصر", team2:"بلجيكا", time:"2026-06-15T22:00:00", round:"first" },{ team1:"السعودية", team2:"أوروغواي", time:"2026-06-16T01:00:00", round:"first" },
    { team1:"إيران", team2:"نيوزيلندا", time:"2026-06-16T04:00:00", round:"first" },{ team1:"السنغال", team2:"فرنسا", time:"2026-06-16T22:00:00", round:"first" },
    { team1:"النرويج", team2:"العراق", time:"2026-06-17T01:00:00", round:"first" },{ team1:"الجزائر", team2:"الأرجنتين", time:"2026-06-17T04:00:00", round:"first" },
    { team1:"الأردن", team2:"النمسا", time:"2026-06-17T07:00:00", round:"first" },{ team1:"البرتغال", team2:"كرواتيا", time:"2026-06-17T20:00:00", round:"first" },
    { team1:"إنجلترا", team2:"كرواتيا", time:"2026-06-17T23:00:00", round:"first" },{ team1:"جنوب أفريقيا", team2:"التشيك", time:"2026-06-18T19:00:00", round:"second" },
    { team1:"سويسرا", team2:"البوسنة والهرسك", time:"2026-06-18T22:00:00", round:"second" },{ team1:"قطر", team2:"كندا", time:"2026-06-19T01:00:00", round:"second" },
    { team1:"المكسيك", team2:"كوريا الجنوبية", time:"2026-06-19T04:00:00", round:"second" },{ team1:"أستراليا", team2:"أمريكا", time:"2026-06-19T22:00:00", round:"second" },
    { team1:"المغرب", team2:"إسكتلندا", time:"2026-06-20T01:00:00", round:"second" },{ team1:"البرازيل", team2:"هايتي", time:"2026-06-20T03:30:00", round:"second" },
    { team1:"تركيا", team2:"باراغواي", time:"2026-06-20T06:00:00", round:"second" },{ team1:"السويد", team2:"هولندا", time:"2026-06-20T20:00:00", round:"second" },
    { team1:"ساحل العاج", team2:"ألمانيا", time:"2026-06-20T23:00:00", round:"second" },{ team1:"الإكوادور", team2:"كوراساو", time:"2026-06-21T03:00:00", round:"second" },
    { team1:"اليابان", team2:"تونس", time:"2026-06-21T07:00:00", round:"second" },{ team1:"إسبانيا", team2:"السعودية", time:"2026-06-21T19:00:00", round:"second" },
    { team1:"بلجيكا", team2:"إيران", time:"2026-06-21T22:00:00", round:"second" },{ team1:"أوروغواي", team2:"الرأس الأخضر", time:"2026-06-22T01:00:00", round:"second" },
    { team1:"مصر", team2:"نيوزيلندا", time:"2026-06-22T04:00:00", round:"second" },{ team1:"الأرجنتين", team2:"النمسا", time:"2026-06-22T20:00:00", round:"second" },
    { team1:"العراق", team2:"فرنسا", time:"2026-06-23T00:00:00", round:"second" },{ team1:"النرويج", team2:"السنغال", time:"2026-06-23T03:00:00", round:"second" },
    { team1:"الأردن", team2:"الجزائر", time:"2026-06-23T06:00:00", round:"second" },{ team1:"البرتغال", team2:"أوزبكستان", time:"2026-06-23T20:00:00", round:"second" },
    { team1:"إنجلترا", team2:"غانا", time:"2026-06-23T23:00:00", round:"second" },{ team1:"بنما", team2:"كرواتيا", time:"2026-06-24T02:00:00", round:"second" },
    { team1:"كولومبيا", team2:"الكونغو الديمقراطية", time:"2026-06-24T05:00:00", round:"second" },{ team1:"كندا", team2:"سويسرا", time:"2026-06-24T22:00:00", round:"third" },
    { team1:"قطر", team2:"البوسنة والهرسك", time:"2026-06-24T22:00:00", round:"third" },{ team1:"المغرب", team2:"هايتي", time:"2026-06-25T01:00:00", round:"third" },
    { team1:"إسكتلندا", team2:"البرازيل", time:"2026-06-25T01:00:00", round:"third" },{ team1:"جنوب أفريقيا", team2:"كوريا الجنوبية", time:"2026-06-25T04:00:00", round:"third" },
    { team1:"المكسيك", team2:"التشيك", time:"2026-06-25T04:00:00", round:"third" },{ team1:"كوراساو", team2:"ساحل العاج", time:"2026-06-25T23:00:00", round:"third" },
    { team1:"ألمانيا", team2:"الإكوادور", time:"2026-06-25T23:00:00", round:"third" },{ team1:"هولندا", team2:"تونس", time:"2026-06-26T02:00:00", round:"third" },
    { team1:"اليابان", team2:"السويد", time:"2026-06-26T02:00:00", round:"third" },{ team1:"أمريكا", team2:"تركيا", time:"2026-06-26T05:00:00", round:"third" },
    { team1:"أستراليا", team2:"باراغواي", time:"2026-06-26T05:00:00", round:"third" },{ team1:"فرنسا", team2:"النرويج", time:"2026-06-26T22:00:00", round:"third" },
    { team1:"السنغال", team2:"العراق", time:"2026-06-26T22:00:00", round:"third" },{ team1:"السعودية", team2:"الرأس الأخضر", time:"2026-06-27T03:00:00", round:"third" },
    { team1:"إسبانيا", team2:"أوروغواي", time:"2026-06-27T03:00:00", round:"third" },{ team1:"إيران", team2:"مصر", time:"2026-06-27T06:00:00", round:"third" },
    { team1:"نيوزيلندا", team2:"بلجيكا", time:"2026-06-27T06:00:00", round:"third" },{ team1:"إنجلترا", team2:"بنما", time:"2026-06-28T00:00:00", round:"third" },
    { team1:"كرواتيا", team2:"غانا", time:"2026-06-28T00:00:00", round:"third" },{ team1:"البرتغال", team2:"كولومبيا", time:"2026-06-28T02:30:00", round:"third" },
    { team1:"الكونغو الديمقراطية", team2:"أوزبكستان", time:"2026-06-28T02:30:00", round:"third" },{ team1:"الجزائر", team2:"النمسا", time:"2026-06-28T05:00:00", round:"third" },
    { team1:"الأردن", team2:"الأرجنتين", time:"2026-06-28T05:00:00", round:"third" }
  ];
  
  const matchesData = rawMatches.map(m => ({ 
    ...m, 
    timeISO: m.time + "+03:00", 
    roundLabel: m.round === 'first' ? 'الجولة الأولى' : (m.round === 'second' ? 'الجولة الثانية' : 'الجولة الثالثة') 
  }));

  // ============================================================
  //  عرض المباريات القادمة
  // ============================================================
  function renderUpcoming() {
    try {
      let active = upcomingMatches(matchesData);
      const round = document.getElementById('roundFilter').value;
      active = filterRound(active, round);
      active.sort((a,b) => matchTime(a.timeISO) - matchTime(b.timeISO));
      const container = document.getElementById('matchesContainer');
      if (!active.length) { container.innerHTML = `<div class="empty-state">📭 لا توجد مباريات قادمة</div>`; return; }
      container.innerHTML = active.map(m => {
        const st = getMatchStatus(m);
        const dateTimeDisplay = getDateTimeDisplay(m.timeISO);
        const isLive = st.live;
        const scoreClass = isLive ? 'live-score' : '';
        return `<div class="match-card ${isLive ? 'live-card' : ''}">
          <div class="teams-score">
            <div class="team"><span>${getFlag(m.team1)}</span> ${m.team1}</div>
            <div class="score-display ${scoreClass}">${isLive ? '🔴 LIVE' : '🆚'}</div>
            <div class="team"><span>${getFlag(m.team2)}</span> ${m.team2}</div>
          </div>
          <div class="datetime-row"><div class="match-day">${getDay(m.timeISO)}</div><div class="match-full-date"><span>${dateTimeDisplay}</span></div></div>
          <div class="info-row"><span class="round-tag">🏅 ${m.roundLabel}</span><div class="countdown-timer ${isLive ? 'live-status' : ''}">${isLive ? '🔴 تُلعب الآن 🔴' : st.text}</div></div>
        </div>`;
      }).join('');
    } catch (err) {
      console.error("❌ renderUpcoming:", err);
      document.getElementById('matchesContainer').innerHTML = `<div class="empty-state">⚠️ حدث خطأ في عرض المباريات القادمة.</div>`;
    }
  }

  // ============================================================
  //  المباريات السابقة (جلب من API مع إعادة محاولة)
  // ============================================================
  let previousGamesData = [];
  let isLoadingPrevious = false;
  let retryCount = 0;
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000;

  function loadFromCache() {
    try {
      const cached = localStorage.getItem('previousGamesData');
      if (cached) {
        const data = JSON.parse(cached);
        if (Array.isArray(data) && data.length > 0) {
          previousGamesData = data;
          console.log(`📦 تم تحميل ${data.length} مباراة من الكاش.`);
          return true;
        }
      }
    } catch (e) {
      console.warn("⚠️ فشل تحميل الكاش:", e);
    }
    return false;
  }

  function saveToCache(data) {
    try {
      localStorage.setItem('previousGamesData', JSON.stringify(data));
      console.log("💾 تم حفظ البيانات في الكاش.");
    } catch (e) {
      console.warn("⚠️ فشل حفظ الكاش:", e);
    }
  }

  async function loadPreviousGames() {
    if (isLoadingPrevious) {
      console.log("⏳ تحميل جارٍ بالفعل...");
      return;
    }

    const containerPrev = document.getElementById('previousMatchesContainer');
    isLoadingPrevious = true;

    if (previousGamesData.length > 0) {
      renderPreviousGamesFiltered();
    } else {
      if (loadFromCache()) {
        renderPreviousGamesFiltered();
      } else {
        containerPrev.innerHTML = `<div class="empty-state">⏳ جاري تحميل المباريات السابقة... <span class="loading-spinner"></span></div>`;
      }
    }

    try {
      console.log(`🔄 محاولة تحميل المباريات السابقة (${retryCount + 1}/${MAX_RETRIES})...`);
      const response = await fetch('https://worldcup26.ir/get/games');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log("📦 بيانات API:", data);

      if (!data || !data.games || !Array.isArray(data.games)) {
        throw new Error("تنسيق البيانات غير صحيح");
      }

      const finished = data.games.filter(g => g.finished === "TRUE");
      console.log(`✅ ${finished.length} مباراة منتهية.`);

      const newData = finished.map(game => {
        let homeRaw = game.home_team_name_fa || game.home_team_name_en || "";
        let awayRaw = game.away_team_name_fa || game.away_team_name_en || "";
        let homeAr = translateToArabic(homeRaw);
        let awayAr = translateToArabic(awayRaw);
        let homeScore = parseInt(game.home_score, 10);
        let awayScore = parseInt(game.away_score, 10);
        let dateStr = game.local_date || "";
        let dayName = "", formattedDate = "", timeMatch = "";
        if (dateStr) {
          let parts = dateStr.split(' ');
          let dateParts = parts[0]?.split('/');
          if (dateParts && dateParts.length === 3) {
            let d = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}T12:00:00`);
            if (!isNaN(d)) {
              dayName = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][d.getDay()];
              formattedDate = `${d.getDate()} ${['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][d.getMonth()]} ${d.getFullYear()}`;
            } else { dayName = "تاريخ"; formattedDate = dateStr; }
          } else { dayName = "تاريخ"; formattedDate = dateStr; }
          if (parts.length > 1 && parts[1]?.match(/\d{2}:\d{2}/)) timeMatch = parts[1];
        }
        return { homeAr, awayAr, homeScore, awayScore, dayName, formattedDate, timeMatch };
      });

      previousGamesData = newData;
      saveToCache(newData);
      retryCount = 0;
      console.log(`📊 تم تحميل ${newData.length} مباراة.`);
      renderPreviousGamesFiltered();
      calculateStandings();

      const activeTab = document.querySelector('.tab-btn.active')?.getAttribute('data-tab');
      if (activeTab === 'leaderboard') {
        renderLeaderboard();
      }

    } catch (err) {
      console.error("❌ فشل تحميل المباريات السابقة:", err);

      if (previousGamesData.length > 0) {
        containerPrev.innerHTML = previousGamesData.length > 0 ? 
          renderPreviousGamesFiltered() : 
          `<div class="empty-state">⚠️ فشل التحديث: ${err.message}<br><small>يتم عرض البيانات المخزنة مؤقتاً</small></div>`;
      } else {
        containerPrev.innerHTML = `
          <div class="empty-state">
            ⚠️ فشل تحميل المباريات السابقة: ${err.message}
            <br>
            <button onclick="loadPreviousGames()" style="
              margin-top:12px;
              background:#ffb347;
              border:none;
              padding:8px 24px;
              border-radius:30px;
              font-weight:bold;
              cursor:pointer;
              color:#1a2f2f;
            ">
              🔄 إعادة المحاولة
            </button>
            ${retryCount < MAX_RETRIES ? `<br><small>سيتم المحاولة تلقائياً بعد ${RETRY_DELAY/1000} ثوانٍ</small>` : ''}
          </div>
        `;
      }

      if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(`⏳ إعادة المحاولة بعد ${RETRY_DELAY/1000} ثوانٍ (${retryCount}/${MAX_RETRIES})...`);
        setTimeout(() => {
          isLoadingPrevious = false;
          loadPreviousGames();
        }, RETRY_DELAY);
      } else {
        console.warn("⚠️ تم الوصول للحد الأقصى من المحاولات.");
        retryCount = 0;
        isLoadingPrevious = false;
      }
    } finally {
      if (retryCount === 0 || retryCount >= MAX_RETRIES) {
        isLoadingPrevious = false;
      }
    }
  }

  function renderPreviousGamesFiltered() {
    try {
      let games = previousGamesData;
      const searchText = document.getElementById('prevSearchInput')?.value.trim().toLowerCase() || "";
      let filtered = games;
      if (searchText) filtered = games.filter(g => g.homeAr.includes(searchText) || g.awayAr.includes(searchText));
      const container = document.getElementById('previousMatchesContainer');
      if (!filtered.length) {
        if (games.length === 0) {
          container.innerHTML = `<div class="empty-state">📋 جاري تحميل المباريات السابقة... <span class="loading-spinner"></span></div>`;
        } else {
          container.innerHTML = `<div class="empty-state">📋 لا توجد مباريات سابقة مطابقة للبحث.</div>`;
        }
        return;
      }
      container.innerHTML = filtered.map(g => {
        const dateTimeDisplay = g.timeMatch ? `${g.formattedDate} - ${g.timeMatch}` : g.formattedDate;
        return `<div class="match-card">
          <div class="teams-score">
            <div class="team"><span>${getFlag(g.homeAr)}</span> ${g.homeAr}</div>
            <div class="score-display finished">${g.homeScore} - ${g.awayScore}</div>
            <div class="team"><span>${getFlag(g.awayAr)}</span> ${g.awayAr}</div>
          </div>
          <div class="datetime-row"><div class="match-day">${g.dayName}</div><div class="match-full-date"><span>${dateTimeDisplay}</span></div></div>
          <div class="info-row"><span class="round-tag">🏅 النتيجة النهائية</span><div class="countdown-timer" style="background:#2c4b55;">✅ انتهت</div></div>
        </div>`;
      }).join('');
      return container.innerHTML;
    } catch (err) {
      console.error("❌ renderPreviousGamesFiltered:", err);
      document.getElementById('previousMatchesContainer').innerHTML = `<div class="empty-state">⚠️ حدث خطأ في عرض المباريات السابقة.</div>`;
      return "";
    }
  }

  // ============================================================
  //  المجموعات والترتيب
  // ============================================================
  const finalGroups = {
    "A": ["المكسيك","جنوب أفريقيا","كوريا الجنوبية","التشيك"],
    "B": ["كندا","البوسنة والهرسك","قطر","سويسرا"],
    "C": ["البرازيل","المغرب","هايتي","إسكتلندا"],
    "D": ["أمريكا","باراغواي","أستراليا","تركيا"],
    "E": ["ألمانيا","كوراساو","ساحل العاج","الإكوادور"],
    "F": ["هولندا","اليابان","السويد","تونس"],
    "G": ["بلجيكا","مصر","إيران","نيوزيلندا"],
    "H": ["إسبانيا","الرأس الأخضر","السعودية","أوروغواي"],
    "I": ["فرنسا","السنغال","النرويج","العراق"],
    "J": ["الأرجنتين","الجزائر","النمسا","الأردن"],
    "K": ["البرتغال","الكونغو الديمقراطية","أوزبكستان","كولومبيا"],
    "L": ["إنجلترا","كرواتيا","غانا","بنما"]
  };

  function calculateStandings() {
    try {
      let standings = {};
      for (let [group, teams] of Object.entries(finalGroups)) {
        standings[group] = {};
        teams.forEach(team => { standings[group][team] = { played:0, wins:0, draws:0, losses:0, goalsFor:0, goalsAgainst:0, points:0 }; });
      }
      previousGamesData.forEach(game => {
        const { homeAr, awayAr, homeScore, awayScore } = game;
        let groupName = null;
        for (let [g, teams] of Object.entries(finalGroups)) {
          if (teams.includes(homeAr) && teams.includes(awayAr)) {
            groupName = g;
            break;
          }
        }
        if (!groupName) {
          console.warn(`⚠️ المباراة بين ${homeAr} و ${awayAr} لا تنتمي لأي مجموعة.`);
          return;
        }
        const stats = standings[groupName];
        if (!stats[homeAr] || !stats[awayAr]) {
          console.warn(`⚠️ أحد الفريقين غير موجود في المجموعة: ${homeAr} أو ${awayAr}`);
          return;
        }
        stats[homeAr].played++; stats[awayAr].played++;
        stats[homeAr].goalsFor += homeScore; stats[homeAr].goalsAgainst += awayScore;
        stats[awayAr].goalsFor += awayScore; stats[awayAr].goalsAgainst += homeScore;
        if (homeScore > awayScore) {
          stats[homeAr].wins++; stats[homeAr].points += 3;
          stats[awayAr].losses++;
        } else if (awayScore > homeScore) {
          stats[awayAr].wins++; stats[awayAr].points += 3;
          stats[homeAr].losses++;
        } else {
          stats[homeAr].draws++; stats[awayAr].draws++;
          stats[homeAr].points += 1; stats[awayAr].points += 1;
        }
      });
      const container = document.getElementById('standingsContainer');
      let html = '';
      for (let [group, teamsStats] of Object.entries(standings)) {
        let tableRows = [];
        for (let [team, stat] of Object.entries(teamsStats)) {
          tableRows.push({ team, ...stat, goalDiff: stat.goalsFor - stat.goalsAgainst });
        }
        tableRows.sort((a,b) => {
          if (a.points !== b.points) return b.points - a.points;
          if (a.goalDiff !== b.goalDiff) return b.goalDiff - a.goalDiff;
          return b.goalsFor - a.goalsFor;
        });
        html += `<div class="group-card"><div class="group-title">المجموعة ${group}</div><table class="standings-table"><thead><tr><th>#</th><th>الفريق</th><th>لعب</th><th>ف</th><th>ت</th><th>خ</th><th>له</th><th>عليه</th><th>فارق</th><th>نقاط</th></tr></thead><tbody>`;
        tableRows.forEach((row, idx) => {
          html += `<tr><td>${idx+1}</td><td style="text-align:right;"><div class="team-name-td"><span>${getFlag(row.team)}</span> ${row.team}</div></td><td>${row.played}</td><td>${row.wins}</td><td>${row.draws}</td><td>${row.losses}</td><td>${row.goalsFor}</td><td>${row.goalsAgainst}</td><td>${row.goalDiff}</td><td>${row.points}</td></tr>`;
        });
        html += `</tbody></table></div>`;
      }
      container.innerHTML = html || `<div class="empty-state">📊 لا توجد نتائج كافية لحساب الترتيب.</div>`;
    } catch (err) {
      console.error("❌ calculateStandings:", err);
      document.getElementById('standingsContainer').innerHTML = `<div class="empty-state">⚠️ حدث خطأ في حساب الترتيب.</div>`;
    }
  }

  // ============================================================
  //  البحث الشامل
  // ============================================================
  function performGlobalSearch() {
    try {
      const keyword = document.getElementById('globalSearchInput').value.trim();
      const searchContainer = document.getElementById('quickSearchResults');
      const keywordSpan = document.getElementById('searchKeyword');
      const resultsContainer = document.getElementById('quickResultsContainer');
      if (keyword === "") { searchContainer.classList.remove('visible'); return; }
      searchContainer.classList.add('visible');
      keywordSpan.innerText = keyword;
      let upcomingFiltered = upcomingMatches(matchesData).filter(m => m.team1.includes(keyword) || m.team2.includes(keyword));
      let previousFiltered = previousGamesData.filter(g => g.homeAr.includes(keyword) || g.awayAr.includes(keyword));
      let html = '';
      if (upcomingFiltered.length === 0 && previousFiltered.length === 0) {
        html = `<div class="empty-state" style="grid-column:1/-1; padding:20px;">❌ لا توجد مباريات قادمة أو سابقة تحمل اسم "${keyword}"</div>`;
      } else {
        if (upcomingFiltered.length) {
          html += `<div style="grid-column:1/-1; margin:5px 0 8px 0; font-weight:bold; color:#FFE0A3;">⚡ المباريات القادمة والجارية (${upcomingFiltered.length})</div>`;
          upcomingFiltered.forEach(m => {
            const st = getMatchStatus(m);
            const dateTimeDisplay = getDateTimeDisplay(m.timeISO);
            const isLive = st.live;
            const scoreDisplay = isLive ? '🔴 LIVE' : '🆚';
            html += `<div class="quick-match-card">
              <div class="quick-match-teams"><span>${getFlag(m.team1)}</span> ${m.team1} <span style="background:#ffb347;padding:0 8px;border-radius:12px;font-weight:bold;color:#1a2f2f;">${scoreDisplay}</span> ${m.team2} <span>${getFlag(m.team2)}</span></div>
              <div class="quick-result">${isLive ? '🔴 تُلعب الآن' : (st.text.includes('h') ? '⏳ ' + st.text : '✅ انتهت')}</div>
              <div style="font-size:0.7rem; text-align:center;">${getDay(m.timeISO)} ${dateTimeDisplay}</div>
            </div>`;
          });
        }
        if (previousFiltered.length) {
          html += `<div style="grid-column:1/-1; margin:15px 0 8px 0; font-weight:bold; color:#FFE0A3;">📋 المباريات السابقة (${previousFiltered.length})</div>`;
          previousFiltered.forEach(g => {
            const dateTimeDisplay = g.timeMatch ? `${g.formattedDate} - ${g.timeMatch}` : g.formattedDate;
            html += `<div class="quick-match-card">
              <div class="quick-match-teams"><span>${getFlag(g.homeAr)}</span> ${g.homeAr} <span style="background:#4CAF50;padding:0 8px;border-radius:12px;font-weight:bold;color:white;">${g.homeScore}-${g.awayScore}</span> ${g.awayAr} <span>${getFlag(g.awayAr)}</span></div>
              <div class="quick-result">النتيجة النهائية</div>
              <div style="font-size:0.7rem; text-align:center;">${g.dayName} ${dateTimeDisplay}</div>
            </div>`;
          });
        }
      }
      resultsContainer.innerHTML = html;
    } catch (err) {
      console.error("❌ performGlobalSearch:", err);
      document.getElementById('quickResultsContainer').innerHTML = `<div class="empty-state" style="grid-column:1/-1; padding:20px;">⚠️ حدث خطأ في البحث.</div>`;
    }
  }

  // ============================================================
  //  دوال مساعدة (العلم، التاريخ)
  // ============================================================
  function getFlag(name) {
    const map = {
      "المكسيك":"🇲🇽","جنوب أفريقيا":"🇿🇦","الأرجنتين":"🇦🇷","الجزائر":"🇩🇿","النمسا":"🇦🇹","الأردن":"🇯🇴","البرتغال":"🇵🇹","الكونغو الديمقراطية":"🇨🇩","كوريا الجنوبية":"🇰🇷","التشيك":"🇨🇿","كندا":"🇨🇦","البوسنة والهرسك":"🇧🇦","أمريكا":"🇺🇸","العراق":"🇮🇶","سويسرا":"🇨🇭","قطر":"🇶🇦","البرازيل":"🇧🇷","المغرب":"🇲🇦","هايتي":"🇭🇹","إسكتلندا":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","أستراليا":"🇦🇺","تركيا":"🇹🇷","ألمانيا":"🇩🇪","كوراساو":"🇨🇼","اليابان":"🇯🇵","هولندا":"🇳🇱","الإكوادور":"🇪🇨","ساحل العاج":"🇨🇮","السويد":"🇸🇪","تونس":"🇹🇳","إسبانيا":"🇪🇸","الرأس الأخضر":"🇨🇻","مصر":"🇪🇬","بلجيكا":"🇧🇪","السعودية":"🇸🇦","أوروغواي":"🇺🇾","إيران":"🇮🇷","نيوزيلندا":"🇳🇿","السنغال":"🇸🇳","فرنسا":"🇫🇷","النرويج":"🇳🇴","إنجلترا":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","كرواتيا":"🇭🇷","بنما":"🇵🇦","كولومبيا":"🇨🇴","أوزبكستان":"🇺🇿","غانا":"🇬🇭","باراغواي":"🇵🇾"
    };
    return map[name] || "🏁";
  }

  function getDay(t) { return ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][new Date(t).getDay()]; }
  function getDateFmt(t) {
    const d = new Date(t);
    const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  function getTimeFromISO(t) {
    const d = new Date(t);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return `${hours}:${minutes}`;
  }
  function getDateTimeDisplay(t) { return `${getDateFmt(t)} - ${getTimeFromISO(t)}`; }

  // ============================================================
  //  دوال التوقعات (التحميل والعرض مع منع المباريات الجارية)
  // ============================================================
  function loadMatchesForSelect() {
    try {
      const select = document.getElementById('matchSelect');
      const upcoming = upcomingMatches(matchesData);
      if (upcoming.length === 0) {
        select.innerHTML = '<option value="">لا توجد مباريات قادمة</option>';
        return;
      }
      select.innerHTML = upcoming.map(m => {
        const isLive = isMatchLive(m.timeISO);
        const label = `${m.team1} 🆚 ${m.team2} (${getDateTimeDisplay(m.timeISO)})${isLive ? ' 🔴 جارية' : ''}`;
        const matchId = `${m.timeISO}_${m.team1}_${m.team2}`;
        return `<option value="${matchId}" ${isLive ? 'disabled style="color:#ff6b6b;"' : ''}>${label}</option>`;
      }).join('');

      updatePredictionOptions();
      checkMatchStatus();
    } catch (err) {
      console.error("❌ loadMatchesForSelect:", err);
    }
  }

  function checkMatchStatus() {
    const matchSelect = document.getElementById('matchSelect');
    const warningEl = document.getElementById('matchStatusWarning');
    const saveBtn = document.getElementById('savePredictionBtn');
    
    if (!matchSelect || !matchSelect.value) {
      warningEl.style.display = 'none';
      saveBtn.disabled = false;
      return;
    }
    
    const parts = matchSelect.value.split('_');
    const timeISO = parts[0];
    
    if (timeISO && isMatchLive(timeISO)) {
      warningEl.style.display = 'inline-block';
      saveBtn.disabled = true;
    } else {
      warningEl.style.display = 'none';
      saveBtn.disabled = false;
    }
  }

  function updatePredictionOptions() {
    const matchSelect = document.getElementById('matchSelect');
    const predictionSelect = document.getElementById('predictionInput');
    const selectedMatch = matchSelect.value;

    if (!selectedMatch) {
      predictionSelect.innerHTML = `
        <option value="">🔮 اختر توقعك</option>
        <option value="DRAW">🤝 تعادل الفريقين</option>
      `;
      return;
    }

    const parts = selectedMatch.split('_');
    const team1 = parts[1] || 'الفريق الأول';
    const team2 = parts[2] || 'الفريق الثاني';

    predictionSelect.innerHTML = `
      <option value="">🔮 اختر الفريق الفائز</option>
      <option value="${team1}">🏆 ${team1}</option>
      <option value="${team2}">🏆 ${team2}</option>
      <option value="DRAW">🤝 تعادل الفريقين</option>
    `;
  }

  document.getElementById('matchSelect').addEventListener('change', function() {
    updatePredictionOptions();
    checkMatchStatus();
  });

  // ============================================================
  //  أحداث النموذج
  // ============================================================
  document.getElementById('savePredictionBtn').addEventListener('click', async function() {
    const userName = document.getElementById('userNameInput').value.trim();
    const matchSelect = document.getElementById('matchSelect');
    const matchId = matchSelect.value;
    const predictionSelect = document.getElementById('predictionInput');
    const prediction = predictionSelect.value;
    const msg = document.getElementById('predictionMessage');

    if (!userName) {
      showPredictionMessage('⚠️ الرجاء إدخال اسمك.', 'warning');
      return;
    }
    if (!matchId) {
      showPredictionMessage('⚠️ الرجاء اختيار مباراة.', 'warning');
      return;
    }
    if (!prediction) {
      showPredictionMessage('⚠️ الرجاء اختيار توقعك من القائمة.', 'warning');
      return;
    }

    // التحقق من أن المباراة ليست جارية
    const parts = matchId.split('_');
    const timeISO = parts[0];
    if (timeISO && isMatchLive(timeISO)) {
      showPredictionMessage('⛔ لا يمكن التوقع على مباراة جارية!', 'error');
      return;
    }

    const result = await savePrediction(userName, matchId, prediction);
    if (result.success) {
      showPredictionMessage('✅ تم حفظ توقعك بنجاح!', 'success');
      predictionSelect.value = '';
      await renderAllPredictions();
      const activeTab = document.querySelector('.tab-btn.active')?.getAttribute('data-tab');
      if (activeTab === 'leaderboard') {
        renderLeaderboard();
      }
    } else {
      showPredictionMessage(`❌ فشل الحفظ: ${result.message}`, 'error');
    }
  });

  // ============================================================
  //  إدارة التبويبات
  // ============================================================
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
        if (id === 'standings') {
          if (previousGamesData.length === 0) loadPreviousGames();
          else calculateStandings();
        }
        if (id === 'predictions') {
          loadMatchesForSelect();
          renderAllPredictions();
        }
        if (id === 'leaderboard') {
          renderLeaderboard();
        }
      });
    });
  }

  // ============================================================
  //  ربط الأحداث العامة
  // ============================================================
  function bindEvents() {
    document.getElementById('roundFilter').addEventListener('change', renderUpcoming);
    document.getElementById('prevSearchInput').addEventListener('input', renderPreviousGamesFiltered);
    document.getElementById('globalSearchInput').addEventListener('input', performGlobalSearch);
  }

  function startAutoUpdate() {
    setInterval(renderUpcoming, 1000);
    setInterval(() => {
      try {
        const activeTab = document.querySelector('.tab-btn.active')?.getAttribute('data-tab');
        if (activeTab === 'previous') loadPreviousGames();
        if (activeTab === 'standings') { if (previousGamesData.length) calculateStandings(); else loadPreviousGames(); }
        performGlobalSearch();
        if (activeTab === 'predictions') {
          loadMatchesForSelect();
          renderAllPredictions();
        }
        if (activeTab === 'leaderboard') {
          renderLeaderboard();
        }
      } catch (err) {
        console.error("❌ تحديث تلقائي:", err);
      }
    }, 60000);
  }

  // ============================================================
  //  التهيئة
  // ============================================================
  function init() {
    try {
      console.log("🚀 تهيئة التطبيق...");
      bindEvents();
      renderUpcoming();
      startAutoUpdate();
      initTabs();
      
      if (!loadFromCache()) {
        console.log("📭 لا توجد بيانات في الكاش، جاري التحميل من API...");
      }
      
      setTimeout(() => {
        loadPreviousGames();
      }, 500);
      
      loadMatchesForSelect();
      renderAllPredictions();
      console.log("✅ التطبيق جاهز.");
    } catch (err) {
      console.error("❌ فشل التهيئة:", err);
    }
  }
  init();
</script>
</body>
</html>
