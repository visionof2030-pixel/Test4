// ===== js/ui/render.js =====
import { getFlag, translateToArabic } from '../translations.js';
import { getMatchStatus, getDay, getDateFmt, getTimeFromISO, formatDate, getLeaderboard, getTodayLeaderboard, isMatchToday, isMatchThisWeek } from '../core/helpers.js';
import { getMatchResult, getMatchById, FINAL_GROUPS } from '../core/data.js';
import { isMatchSubmitted } from '../data/storage.js';

// متغيرات عامة للـ UI (لا تحتوي على منطق)
let currentGroupFilter = 'all';
let currentDayFilter = 'all';

// ===== عرض بطاقة مباراة =====
export function renderMatchCard(match, gamesData, predictions) {
    const status = getMatchStatus(match);
    const result = getMatchResult(match.id, gamesData);
    const matchId = match.id;
    const submitted = isMatchSubmitted(matchId);
    const canPredictNow = !status.finished && !status.live && canPredict(match.timeISO);

    let scoreDisplay = '🆚', scoreClass = 'upcoming', matchClass = '';
    if (status.live) { scoreDisplay = '🔴 LIVE'; scoreClass = 'live'; matchClass = 'live'; }
    else if (status.finished && result) {
        scoreDisplay = `${result.home} - ${result.away}`;
        scoreClass = 'finished';
        matchClass = 'finished-match';
    } else if (status.finished) {
        scoreDisplay = '✅';
        scoreClass = 'finished';
        matchClass = 'finished-match';
    }

    // أزرار التوقع والتعديل
    const savedUserName = getLastUserName();
    let predictBtnHtml = 'توقع الآن';
    let predictDisabled = false;
    let predictBtnClass = 'predict-btn';
    let predictBtnExtra = '';
    let editBtnHtml = 'تعديل';
    let editDisabled = true;
    let editBtnExtra = '';

    if (submitted) {
        predictDisabled = true;
        predictBtnHtml = 'تم التوقع ✅';
        predictBtnClass += ' submitted';
        predictBtnExtra = 'disabled';
        if (canPredictNow) {
            editDisabled = false;
            editBtnExtra = `onclick="window.openEditPredictionModal(${matchId})"`;
        } else {
            editDisabled = true;
            editBtnExtra = 'disabled';
            editBtnHtml = status.finished ? '⏳ انتهت' : status.live ? '⛔ جارية' : '⏳ انتهت المهلة';
        }
    } else if (!canPredictNow) {
        predictDisabled = true;
        if (status.finished) {
            predictBtnHtml = '📋 عرض التوقعات';
            predictBtnClass += ' view-btn';
            predictBtnExtra = `onclick="window.openMatchPredictions(${matchId})"`;
        } else if (status.live) {
            predictBtnHtml = '⛔ جارية';
            predictBtnClass += ' view-btn';
            predictBtnExtra = 'disabled';
        } else {
            predictBtnHtml = '⏳ قريباً';
            predictBtnClass += ' view-btn';
            predictBtnExtra = 'disabled';
        }
    } else {
        predictBtnExtra = `onclick="window.openPredictionModal(${matchId})"`;
    }

    const groupName = Object.keys(FINAL_GROUPS).find(g => FINAL_GROUPS[g].includes(match.home)) || '';
    const todayLabel = isMatchToday(match.timeISO) ? '📌 اليوم' : '';
    const timeStr = `${getDay(match.timeISO)} - ${getDateFmt(match.timeISO)} - ${getTimeFromISO(match.timeISO)}`;

    return `
    <div class="match-card ${matchClass}" onclick="${status.finished ? `window.openMatchPredictions(${matchId})` : ''}">
      <div class="match-teams">
        <div class="match-team"><span class="flag">${getFlag(match.home)}</span> ${match.home}</div>
        <div class="match-score ${scoreClass}">${scoreDisplay}</div>
        <div class="match-team"><span class="flag">${getFlag(match.away)}</span> ${match.away}</div>
      </div>
      <div class="match-meta">
        <span class="tag">🏅 ${match.round || 'مباراة'}</span>
        <span class="tag">${groupName ? `المجموعة ${groupName}` : ''}</span>
        ${!status.finished ? `<span class="timer ${status.live ? 'live' : ''}">${status.text}</span>` : `<span class="tag finished-tag">✅ انتهت</span>`}
      </div>
      <div class="match-meta" style="margin-top:4px;">
        <span class="tag">${timeStr}</span>
        ${todayLabel ? `<span class="tag" style="color:var(--gold-light);">${todayLabel}</span>` : ''}
        ${match.stadium ? `<span class="tag stadium-tag">🏟️ ${match.stadium}</span>` : ''}
      </div>
      ${!status.finished ? `
        <div class="predict-btn-wrap">
          <div class="btn-group">
            <button class="${predictBtnClass}" ${predictBtnExtra} data-matchid="${matchId}">
              ${predictBtnHtml}
            </button>
            ${submitted && canPredictNow ? `<button class="edit-btn" ${editBtnExtra}>✏️ ${editBtnHtml}</button>` : ''}
          </div>
          <button class="view-btn" onclick="window.openViewPredictionsModal(${matchId})">📋 استعراض التوقعات</button>
          <button class="share-link-btn" onclick="window.copyMatchLink(${matchId})">🔗 مشاركة</button>
        </div>
      ` : ''}
    </div>
  `;
}

// ===== عرض المباريات القادمة =====
export function renderUpcoming(matches, gamesData, predictions, groupFilter = 'all', dayFilter = 'all') {
    let filtered = matches;
    if (groupFilter !== 'all') {
        const teams = FINAL_GROUPS[groupFilter] || [];
        filtered = filtered.filter(m => teams.includes(m.home) || teams.includes(m.away));
    }
    if (dayFilter === 'today') {
        filtered = filtered.filter(m => isMatchToday(m.timeISO));
    } else if (dayFilter === 'thisweek') {
        filtered = filtered.filter(m => isMatchThisWeek(m.timeISO));
    }
    // ترتيب حسب الوقت
    filtered.sort((a,b) => new Date(a.timeISO) - new Date(b.timeISO));
    
    const container = document.getElementById('matchesContainer');
    if (!filtered.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد مباريات مطابقة</div>`;
        return;
    }
    container.innerHTML = filtered.map(m => renderMatchCard(m, gamesData, predictions)).join('');
    document.getElementById('upcomingCount').textContent = filtered.length;
}

// ===== عرض المباريات السابقة =====
export function renderPreviousMatches(gamesData, predictions, searchText = '') {
    let filtered = gamesData.filter(m => m.finished);
    if (searchText) {
        const s = searchText.toLowerCase();
        filtered = filtered.filter(m => m.home.includes(s) || m.away.includes(s));
    }
    const container = document.getElementById('previousMatchesContainer');
    if (!filtered.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد مباريات سابقة</div>`;
        return;
    }
    container.innerHTML = filtered.map(m => {
        const result = getMatchResult(m.id, gamesData);
        return `
      <div class="match-card finished-match" onclick="window.openMatchPredictions(${m.id})">
        <div class="match-teams">
          <div class="match-team"><span class="flag">${getFlag(m.home)}</span> ${m.home}</div>
          <div class="match-score finished">${result ? `${result.home} - ${result.away}` : '?'}</div>
          <div class="match-team"><span class="flag">${getFlag(m.away)}</span> ${m.away}</div>
        </div>
        <div class="match-meta">
          <span class="tag">${getDay(m.timeISO)}</span>
          <span class="tag">${getDateFmt(m.timeISO)}</span>
          <span class="tag finished-tag">✅ انتهت - اضغط لعرض التوقعات</span>
        </div>
      </div>
    `;
    }).join('');
}

// ===== عرض لوحة المتصدرين =====
export function renderLeaderboard(predictions, gamesData) {
    const container = document.getElementById('leaderboardContainer');
    const board = getLeaderboard(predictions, gamesData);
    if (!board.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات بعد</div>`;
        return;
    }
    document.getElementById('lbTotalPlayers').textContent = board.length;
    document.getElementById('lbTotalPredictions').textContent = predictions.length;

    const topThree = board.slice(0, 3);
    const rest = board.slice(3, 10);
    let html = '';
    
    if (topThree.length) {
        const champ = topThree[0];
        const accuracy = champ.total > 0 ? Math.round((champ.correct / champ.total) * 100) : 0;
        const isCurrentUser = champ.name === getLastUserName();
        html += `
      <div class="champion-card" onclick="window.openPlayerPredictions('${champ.name}')">
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
            <div class="progress-bar"><div class="fill" style="width:${Math.min(accuracy, 100)}%;"></div></div>
          </div>
        </div>
      </div>
    `;
    }

    if (rest.length || topThree.length > 1) {
        const allPlayers = [...topThree.slice(1), ...rest];
        const medals = ['🥈', '🥉', ...Array(rest.length).fill('')];
        html += `<div class="players-list">`;
        allPlayers.forEach((player, idx) => {
            const rank = idx + 2;
            const accuracy = player.total > 0 ? Math.round((player.correct / player.total) * 100) : 0;
            const isCurrentUser = player.name === getLastUserName();
            const medal = medals[idx] || `#${rank}`;
            let rankClass = rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
            let borderClass = rank === 2 ? 'silver-border' : rank === 3 ? 'bronze-border' : '';
            html += `
        <div class="player-card" onclick="window.openPlayerPredictions('${player.name}')">
          <div class="rank ${rankClass}">${medal}</div>
          <div class="avatar-sm ${borderClass}">${player.name.charAt(0).toUpperCase()}</div>
          <div class="info-sm">
            <div class="name-sm">${player.name} ${isCurrentUser ? '👤' : ''}</div>
            <div class="sub-sm">
              <span>✅ <span class="highlight">${player.correct}</span>/${player.total}</span>
              <span>📊 ${accuracy}%</span>
            </div>
            <div class="progress-mini"><div class="fill-mini" style="width:${Math.min(accuracy, 100)}%;"></div></div>
          </div>
          <div class="points-sm">${player.points}</div>
        </div>
      `;
        });
        html += `</div>`;
    }
    container.innerHTML = html;
}

// ===== عرض ترتيب اليوم =====
export function renderTodayLeaderboard(predictions, gamesData) {
    const container = document.getElementById('todayLeaderboardList');
    const dateLabel = document.getElementById('todayDateLabel');
    const today = new Date();
    dateLabel.textContent = `📅 ${today.getDate()} ${['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][today.getMonth()]} ${today.getFullYear()}`;

    const board = getTodayLeaderboard(predictions, gamesData);
    if (!board.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات لمباريات اليوم</div>`;
        return;
    }

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

    if (board.length > 1) {
        html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;">`;
        board.slice(1).forEach((player, idx) => {
            const rank = idx + 2;
            const accuracy = player.total > 0 ? Math.round((player.correct / player.total) * 100) : 0;
            const isCurrentUser = player.name === getLastUserName();
            const medal = rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
            html += `
        <div class="player-card" onclick="window.openPlayerPredictions('${player.name}')">
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

// ===== عرض جميع التوقعات =====
export function renderAllPredictions(predictions, gamesData) {
    const container = document.getElementById('allPredictions');
    const countSpan = document.getElementById('predictionsCount');
    countSpan.textContent = predictions.length;
    if (!predictions.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات بعد</div>`;
        return;
    }
    const sorted = [...predictions].sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    container.innerHTML = sorted.slice(0, 20).map(p => {
        const match = getMatchById(p.match_id, gamesData);
        const team1 = match ? match.home : '?';
        const team2 = match ? match.away : '?';
        let predText = p.prediction === 'DRAW' ? '🤝 تعادل' : `🏆 فوز ${getFlag(p.prediction)} ${p.prediction}`;
        const status = getPredictionStatus(p, gamesData);
        let cardClass = '', badgeClass = '';
        if (status === 'correct') { cardClass = 'correct'; badgeClass = 'correct'; }
        else if (status === 'wrong') { cardClass = 'wrong'; badgeClass = 'wrong'; }
        else { cardClass = 'pending'; badgeClass = 'pending'; }
        return `
      <div class="prediction-card ${cardClass}" onclick="window.openPlayerPredictions('${p.user_name || ''}')">
        <div class="user"><div class="avatar-p">${p.user_name ? p.user_name.charAt(0).toUpperCase() : '👤'}</div><span class="name-p">${p.user_name || 'مجهول'}</span></div>
        <div class="prediction-text">${getFlag(team1)} ${team1} 🆚 ${getFlag(team2)} ${team2}</div>
        <div class="prediction-text" style="color:var(--gold-light);">🔮 ${predText}</div>
        <span class="status-badge ${badgeClass}">${status === 'correct' ? '✅ صحيح' : status === 'wrong' ? '❌ خاطئ' : '⏳ قيد الانتظار'}</span>
        <div style="font-size:0.6rem;color:var(--text-secondary);margin-top:4px;">🕒 ${p.created_at ? formatDate(p.created_at) : 'تاريخ غير معروف'}</div>
      </div>
    `;
    }).join('');
}

// ===== دوال مساعدة للـ UI =====
function getPredictionStatus(prediction, gamesData) {
    const match = getMatchById(prediction.match_id, gamesData);
    if (!match || !match.finished) return 'pending';
    const result = getMatchResult(prediction.match_id, gamesData);
    if (!result) return 'pending';
    const correctResult = result.home > result.away ? match.home :
                          result.away > result.home ? match.away : 'DRAW';
    return prediction.prediction === correctResult ? 'correct' : 'wrong';
}

// ===== تحديث شريط الأخبار =====
export function updateNewsTicker(matches, predictions, gamesData) {
    const tickerEl = document.getElementById('todayHighlights');
    if (!tickerEl) return;
    const todayMatches = matches.filter(m => isMatchToday(m.timeISO));
    if (!todayMatches.length) {
        tickerEl.textContent = '📅 لا توجد مباريات اليوم';
        return;
    }
    let text = '📅 مباريات اليوم: ';
    const matchTexts = todayMatches.map(m => `${getFlag(m.home)} ${m.home} 🆚 ${getFlag(m.away)} ${m.away} (${getTimeFromISO(m.timeISO)})`);
    text += matchTexts.join(' | ');
    
    // أبرز المتوقعين اليوم
    const todayIds = todayMatches.map(m => m.id);
    const todayPreds = predictions.filter(p => todayIds.includes(p.match_id));
    if (todayPreds.length) {
        const userCount = {};
        for (let p of todayPreds) {
            if (!userCount[p.user_name]) userCount[p.user_name] = 0;
            userCount[p.user_name]++;
        }
        const topUser = Object.entries(userCount).sort((a,b) => b[1] - a[1])[0];
        if (topUser) {
            text += ` | 🔥 أكثر متوقع اليوم: ${topUser[0]} (${topUser[1]} توقع)`;
        }
    }
    tickerEl.textContent = text;
}

// ===== دوال إضافية (مخطط البطولة، ترتيب المجموعات، إلخ) =====
// ... سيتم إكمالها بنفس الأسلوب