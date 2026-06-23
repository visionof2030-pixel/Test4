// ===== MODULE: leaderboard.js =====
import { getFlag } from './translations.js';
import { findMatchResult, isMatchToday } from './helpers.js';
import { matchesData } from './matchUtils.js';

export async function renderLeaderboard(predictions, gamesData) {
    const container = document.getElementById('leaderboardContainer');
    if (!predictions || !gamesData || gamesData.length === 0) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد بيانات</div>`;
        return;
    }
    const scores = {};
    for (let p of predictions) {
        if (!scores[p.user_name]) scores[p.user_name] = { name: p.user_name, points: 0, correct: 0, total: 0 };
        scores[p.user_name].total++;
        const parts = (p.match_id || "").split("_");
        if (parts.length < 3) continue;
        const team1 = parts[1], team2 = parts[2];
        const match = gamesData.find(g => (g.homeAr === team1 && g.awayAr === team2) || (g.homeAr === team2 && g.awayAr === team1));
        if (!match) continue;
        const result = match.homeScore > match.awayScore ? match.homeAr : match.awayScore > match.homeScore ? match.awayAr : "DRAW";
        if (p.prediction === result) {
            scores[p.user_name].points++;
            scores[p.user_name].correct++;
        }
    }
    const board = Object.values(scores).sort((a,b) => b.points - a.points);
    if (!board.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات صحيحة بعد</div>`;
        return;
    }
    document.getElementById('lbTotalPlayers').textContent = board.length;
    document.getElementById('lbTotalPredictions').textContent = predictions.length;

    // عرض المتصدرين (نفس الكود السابق)
    const topThree = board.slice(0,3);
    const rest = board.slice(3,10);
    let html = '';
    if (topThree.length) {
        const champ = topThree[0];
        const accuracy = champ.total > 0 ? Math.round((champ.correct / champ.total) * 100) : 0;
        const isCurrentUser = champ.name === localStorage.getItem('lastUserName') || '';
        html += `
        <div class="champion-card" style="${isCurrentUser ? 'border-color:#f0b429;box-shadow:0 0 40px rgba(240,180,41,0.12);' : ''}" onclick="window.openPlayerPredictions('${champ.name}')">
          <div class="rank-badge">🥇</div>
          <div class="avatar">${champ.name.charAt(0).toUpperCase()}</div>
          <div class="info">
            <div class="name">${champ.name} ${isCurrentUser ? '👤' : ''}</div>
            <div class="stats-row">
              <span class="item">🏆 <strong>${champ.points}</strong> نقطة</span>
              <span class="item">✅ <strong class="highlight">${champ.correct}</strong> / ${champ.total}</span>
              <span class="item">📊 <strong>${accuracy}%</strong> نجاح</span>
            </div>
            <div class="progress-wrapper">
              <div class="progress-label"><span>نسبة النجاح</span><span>${accuracy}%</span></div>
              <div class="progress-bar"><div class="fill" style="width:${Math.min(accuracy,100)}%;"></div></div>
            </div>
          </div>
        </div>
      `;
    }
    if (rest.length || topThree.length > 1) {
        const allPlayers = [...topThree.slice(1), ...rest];
        const medals = ['🥈','🥉', ...Array(rest.length).fill('')];
        html += `<div class="players-list">`;
        allPlayers.forEach((player, idx) => {
            const rank = idx + 2;
            const accuracy = player.total > 0 ? Math.round((player.correct / player.total) * 100) : 0;
            const isCurrentUser = player.name === localStorage.getItem('lastUserName') || '';
            const medal = medals[idx] || `#${rank}`;
            let rankClass = '';
            if (rank === 2) rankClass = 'silver';
            else if (rank === 3) rankClass = 'bronze';
            let borderClass = '';
            if (rank === 2) borderClass = 'silver-border';
            else if (rank === 3) borderClass = 'bronze-border';
            html += `
          <div class="player-card" style="${isCurrentUser ? 'border-color:rgba(240,180,41,0.3);' : ''}" onclick="window.openPlayerPredictions('${player.name}')">
            <div class="rank ${rankClass}">${medal}</div>
            <div class="avatar-sm ${borderClass}">${player.name.charAt(0).toUpperCase()}</div>
            <div class="info-sm">
              <div class="name-sm">${player.name} ${isCurrentUser ? '👤' : ''}</div>
              <div class="sub-sm">
                <span>✅ <span class="highlight">${player.correct}</span>/${player.total}</span>
                <span>📊 ${accuracy}%</span>
              </div>
              <div class="progress-mini"><div class="fill-mini" style="width:${Math.min(accuracy,100)}%;"></div></div>
            </div>
            <div class="points-sm">${player.points}</div>
            ${isCurrentUser ? `<div class="current-user-indicator active"></div><div class="pulse-dot"></div>` : ''}
          </div>
        `;
        });
        html += `</div>`;
    }
    container.innerHTML = html;
}

// ===== ترتيب اليوم =====
export function renderTodayLeaderboard(predictions, gamesData) {
    const container = document.getElementById('todayLeaderboardList');
    const dateLabel = document.getElementById('todayDateLabel');
    const today = new Date();
    dateLabel.textContent = `📅 ${today.getDate()} ${['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][today.getMonth()]} ${today.getFullYear()}`;

    if (!predictions || !gamesData) {
        container.innerHTML = `<div class="empty-state"><span class="icon">⏳</span> جاري التحميل...</div>`;
        return;
    }

    // تصفية مباريات اليوم
    const todayMatches = matchesData.filter(m => isMatchToday(m.timeISO));
    if (todayMatches.length === 0) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد مباريات اليوم</div>`;
        return;
    }
    const todayMatchIds = todayMatches.map(m => `${m.timeISO}_${m.team1}_${m.team2}`);

    // تصفية التوقعات لمباريات اليوم
    const todayPredictions = predictions.filter(p => todayMatchIds.includes(p.match_id));
    if (todayPredictions.length === 0) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات لمباريات اليوم</div>`;
        return;
    }

    // حساب نقاط اليوم لكل مستخدم
    const scores = {};
    for (let p of todayPredictions) {
        if (!scores[p.user_name]) scores[p.user_name] = { name: p.user_name, points: 0, correct: 0, total: 0 };
        scores[p.user_name].total++;
        const parts = (p.match_id || "").split("_");
        if (parts.length < 3) continue;
        const team1 = parts[1], team2 = parts[2];
        const match = gamesData.find(g => (g.homeAr === team1 && g.awayAr === team2) || (g.homeAr === team2 && g.awayAr === team1));
        if (!match) continue;
        const result = match.homeScore > match.awayScore ? match.homeAr : match.awayScore > match.homeScore ? match.awayAr : "DRAW";
        if (p.prediction === result) {
            scores[p.user_name].points++;
            scores[p.user_name].correct++;
        }
    }
    const board = Object.values(scores).sort((a,b) => b.points - a.points);
    if (board.length === 0) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات صحيحة اليوم</div>`;
        return;
    }

    // عرض بطل اليوم
    const champ = board[0];
    let html = `
    <div style="background:linear-gradient(135deg,rgba(240,180,41,0.15),rgba(240,180,41,0.03));border:2px solid var(--gold);border-radius:var(--radius-lg);padding:16px;margin-bottom:12px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <div style="font-size:2.5rem;">👑</div>
      <div style="flex:1;">
        <div style="font-weight:800;font-size:1.1rem;color:var(--gold-light);">بطل اليوم</div>
        <div style="font-weight:700;font-size:1.2rem;">${champ.name}</div>
        <div style="font-size:0.8rem;color:var(--text-secondary);">🏆 ${champ.points} نقطة (${champ.correct}/${champ.total} صحيحة)</div>
      </div>
    </div>
  `;

    // باقي اللاعبين
    if (board.length > 1) {
        html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;">`;
        board.slice(1).forEach((player, idx) => {
            const rank = idx + 2;
            const accuracy = player.total > 0 ? Math.round((player.correct / player.total) * 100) : 0;
            const isCurrentUser = player.name === localStorage.getItem('lastUserName') || '';
            const medal = rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
            html += `
          <div class="player-card" style="${isCurrentUser ? 'border-color:rgba(240,180,41,0.3);' : ''}" onclick="window.openPlayerPredictions('${player.name}')">
            <div class="rank">${medal}</div>
            <div class="info-sm">
              <div class="name-sm">${player.name} ${isCurrentUser ? '👤' : ''}</div>
              <div class="sub-sm">
                <span>🏆 ${player.points}</span>
                <span>✅ ${player.correct}/${player.total}</span>
                <span>📊 ${accuracy}%</span>
              </div>
            </div>
          </div>
        `;
        });
        html += `</div>`;
    }
    container.innerHTML = html;
}