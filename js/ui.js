// ===== MODULE: ui.js =====
import { getFlag, translateToArabic } from './translations.js';
import { getMatchStatus, isMatchToday, isMatchTodayOrTomorrow, getDay, getDateTimeDisplay, formatDate, upcomingMatches, isMatchFinished, canPredict, matchTime, now, MATCH_DURATION, findMatchResult, getGroundForMatch } from './helpers.js';
import { isMatchSubmitted, getSubmittedMatches, getLocalPredictions } from './storage.js';
import { matchesData, finalGroups } from './matchUtils.js';
import { openPredictionModal, openEditPredictionModal, openMatchPredictions, openViewPredictionsModal } from './modal.js';

// ===== عرض المباريات =====
export function renderMatchCard(m, isUpcoming, gamesData, openfootballMatches) {
    const st = getMatchStatus(m);
    const isLive = st.live;
    const isFinished = st.finished;
    const matchId = `${m.timeISO}_${m.team1}_${m.team2}`;
    const savedUserName = localStorage.getItem('lastUserName') || '';
    const submitted = isMatchSubmitted(matchId);
    const canPredictNow = isUpcoming && !isLive && !isFinished && canPredict(m.timeISO);

    let scoreDisplay = '🆚', scoreClass = 'upcoming', matchClass = '';
    let homeScore = 0, awayScore = 0, matchResult = null;
    if (isLive) { scoreDisplay = '🔴 LIVE'; scoreClass = 'live'; matchClass = 'live'; }
    else if (isFinished) {
        const result = findMatchResult(m.team1, m.team2, gamesData);
        if (result) {
            homeScore = result.homeScore;
            awayScore = result.awayScore;
            scoreDisplay = `${homeScore} - ${awayScore}`;
            scoreClass = 'finished';
            matchClass = 'finished-match';
            matchResult = { homeScore, awayScore };
        } else { scoreDisplay = '✅'; scoreClass = 'finished'; matchClass = 'finished-match'; }
    }

    // أزرار التوقع والتعديل
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
            editBtnExtra = `onclick="window.openEditPredictionModal('${matchId}','${m.team1}','${m.team2}','${m.timeISO}')"`;
        } else {
            editDisabled = true;
            editBtnExtra = 'disabled';
            if (isFinished) editBtnHtml = '⏳ انتهت';
            else if (isLive) editBtnHtml = '⛔ جارية';
            else if (!canPredict(m.timeISO) && !isFinished && !isLive) editBtnHtml = '⏳ انتهت المهلة';
            else editBtnHtml = '⏳ غير متاح';
        }
    } else if (!canPredictNow) {
        predictDisabled = true;
        if (isFinished) {
            predictBtnHtml = '📋 عرض التوقعات';
            predictBtnClass += ' view-btn';
            predictBtnExtra = `onclick="window.openMatchPredictions('${matchId}','${m.team1}','${m.team2}',${homeScore},${awayScore})"`;
        } else if (isLive) {
            predictBtnHtml = '⛔ جارية';
            predictBtnClass += ' view-btn';
            predictBtnExtra = 'disabled';
        } else if (!canPredict(m.timeISO) && !isFinished && !isLive) {
            predictBtnHtml = '⏳ قريباً (أقل من 5 دقائق)';
            predictBtnClass += ' view-btn';
            predictBtnExtra = 'disabled';
        } else {
            predictBtnHtml = '⏳ قريباً';
            predictBtnClass += ' view-btn';
            predictBtnExtra = 'disabled';
        }
    } else {
        predictBtnExtra = `onclick="window.openPredictionModal('${matchId}','${m.team1}','${m.team2}','${m.timeISO}')"`;
    }

    const groupName = Object.keys(finalGroups).find(g => finalGroups[g].includes(m.team1)) || '';
    const isToday = isMatchToday(m.timeISO);
    const dayLabel = isToday ? '📌 اليوم' : (isMatchTodayOrTomorrow(m.timeISO) ? '📌 غداً' : '');
    let ground = getGroundForMatch(m.team1, m.team2, m.timeISO, openfootballMatches);
    if (!ground) {
        const matchFromAPI = gamesData.find(g => {
            const home = translateToArabic(g.home_team_name_fa || g.home_team_name_en || '');
            const away = translateToArabic(g.away_team_name_fa || g.away_team_name_en || '');
            return (home === m.team1 && away === m.team2) || (home === m.team2 && away === m.team1);
        });
        if (matchFromAPI && matchFromAPI.stadium_id) {
            ground = getStadiumName(matchFromAPI.stadium_id);
        }
    }
    const onclickAttr = (isFinished && matchResult) ?
        `onclick="window.openMatchPredictions('${matchId}','${m.team1}','${m.team2}',${homeScore},${awayScore})"` : '';

    const showEdit = submitted && canPredictNow;

    return `
    <div class="match-card ${matchClass}" ${onclickAttr}>
      <div class="match-teams">
        <div class="match-team"><span class="flag">${getFlag(m.team1)}</span> ${m.team1}</div>
        <div class="match-score ${scoreClass}">${scoreDisplay}</div>
        <div class="match-team"><span class="flag">${getFlag(m.team2)}</span> ${m.team2}</div>
      </div>
      <div class="match-meta">
        <span class="tag">🏅 ${m.roundLabel}</span>
        <span class="tag">${groupName ? `المجموعة ${groupName}` : ''}</span>
        ${isUpcoming ? `<span class="timer ${isLive ? 'live' : ''}">${isLive ? '🔴 تُلعب الآن' : st.text}</span>` : `<span class="tag finished-tag">✅ انتهت - اضغط لعرض التوقعات</span>`}
      </div>
      <div class="match-meta" style="margin-top:4px;">
        <span class="tag">${getDay(m.timeISO)}</span>
        <span class="tag">${getDateTimeDisplay(m.timeISO)}</span>
        ${dayLabel ? `<span class="tag" style="color:var(--gold-light);">${dayLabel}</span>` : ''}
        ${ground ? `<span class="tag stadium-tag">🏟️ ${ground}</span>` : ''}
      </div>
      ${isUpcoming ? `
        <div class="predict-btn-wrap">
          <div class="btn-group">
            <button class="${predictBtnClass}" ${predictBtnExtra} data-matchid="${matchId}">
              ${predictBtnHtml}
            </button>
            ${showEdit ? `<button class="edit-btn" ${editBtnExtra} data-matchid="${matchId}">✏️ ${editBtnHtml}</button>` : ''}
          </div>
          <button class="view-btn" onclick="window.openViewPredictionsModal('${matchId}','${m.team1}','${m.team2}')">
            📋 استعراض التوقعات
          </button>
          <button class="share-link-btn" onclick="window.copyMatchLink('${m.id}','${m.team1}','${m.team2}')">
            🔗 مشاركة
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// ===== عرض المباريات القادمة =====
export function renderUpcoming(gamesData, openfootballMatches, groupFilter, currentDayFilter) {
    try {
        let active = [];
        if (groupFilter === 'all') {
            active = upcomingMatches(matchesData);
        } else {
            const teams = finalGroups[groupFilter] || [];
            const allMatchesForGroup = matchesData.filter(m => teams.includes(m.team1) || teams.includes(m.team2));
            active = allMatchesForGroup;
            active.sort((a, b) => matchTime(a.timeISO) - matchTime(b.timeISO));
        }
        if (groupFilter === 'all') {
            if (currentDayFilter === 'today') {
                const today = new Date(); today.setHours(0,0,0,0);
                active = active.filter(m => { const d = new Date(m.timeISO); d.setHours(0,0,0,0); return d.getTime() === today.getTime(); });
            } else if (currentDayFilter === 'tomorrow') {
                const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1); tomorrow.setHours(0,0,0,0);
                active = active.filter(m => { const d = new Date(m.timeISO); d.setHours(0,0,0,0); return d.getTime() === tomorrow.getTime(); });
            } else if (currentDayFilter === 'week') {
                const today = new Date(); today.setHours(0,0,0,0);
                const weekLater = new Date(today); weekLater.setDate(weekLater.getDate()+7);
                active = active.filter(m => { const d = new Date(m.timeISO); d.setHours(0,0,0,0); return d >= today && d <= weekLater; });
            }
        }
        const container = document.getElementById('matchesContainer');
        document.getElementById('upcomingCount').textContent = active.length;
        if (!active.length) {
            container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد مباريات تطابق الفلاتر</div>`;
            return;
        }
        container.innerHTML = active.map(m => {
            const isUpcoming = (matchTime(m.timeISO) + MATCH_DURATION) > now();
            return renderMatchCard(m, isUpcoming, gamesData, openfootballMatches);
        }).join('');
    } catch (e) {
        console.error("renderUpcoming:", e);
        document.getElementById('matchesContainer').innerHTML = `<div class="empty-state"><span class="icon">⚠️</span> حدث خطأ</div>`;
    }
}

// ===== شريط الأخبار =====
export function updateNewsTicker(predictions) {
    const tickerEl = document.getElementById('todayHighlights');
    if (!tickerEl) return;
    const today = new Date(); today.setHours(0,0,0,0);
    const todayMatches = matchesData.filter(m => {
        const d = new Date(m.timeISO); d.setHours(0,0,0,0);
        return d.getTime() === today.getTime() && (matchTime(m.timeISO) + MATCH_DURATION) > now();
    });
    if (todayMatches.length === 0) {
        tickerEl.textContent = '📅 لا توجد مباريات اليوم';
        return;
    }
    let text = '📅 مباريات اليوم: ';
    const matchTexts = todayMatches.map(m => {
        const flag1 = getFlag(m.team1);
        const flag2 = getFlag(m.team2);
        const timeStr = getTimeFromISO(m.timeISO);
        return `${flag1} ${m.team1} 🆚 ${flag2} ${m.team2} (${timeStr})`;
    });
    text += matchTexts.join(' | ');
    if (predictions && predictions.length > 0) {
        const todayMatchIds = todayMatches.map(m => `${m.timeISO}_${m.team1}_${m.team2}`);
        const todayPredictions = predictions.filter(p => todayMatchIds.includes(p.match_id));
        if (todayPredictions.length > 0) {
            const userPreds = {};
            for (let p of todayPredictions) {
                if (!userPreds[p.user_name]) userPreds[p.user_name] = [];
                userPreds[p.user_name].push(p);
            }
            const sortedUsers = Object.entries(userPreds).sort((a,b) => b[1].length - a[1].length);
            if (sortedUsers.length > 0) {
                const topUser = sortedUsers[0];
                const predCount = topUser[1].length;
                text += ` | 🔥 أكثر متوقع اليوم: ${topUser[0]} (${predCount} توقع${predCount > 1 ? 'ات' : ''})`;
            }
        }
    }
    tickerEl.textContent = text;
}

// ===== دوال مشاركة =====
export function shareAllTodayTomorrow() {
    if (!window.isAuthorized) { window.showPasswordOverlay(); return; }
    const today = new Date(); today.setHours(0,0,0,0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
    const activeMatches = matchesData.filter(m => (matchTime(m.timeISO) + MATCH_DURATION) > now());
    const todayTomorrowMatches = activeMatches.filter(m => {
        const d = new Date(m.timeISO); d.setHours(0,0,0,0);
        return d.getTime() === today.getTime() || d.getTime() === tomorrow.getTime();
    });
    if (!todayTomorrowMatches.length) { window.showCopyToast('⚠️ لا توجد مباريات اليوم أو غداً'); return; }
    todayTomorrowMatches.sort((a,b) => matchTime(a.timeISO) - matchTime(b.timeISO));
    const baseUrl = window.location.origin + window.location.pathname;
    let shareText = '🏆 كأس العالم 2026 - روابط توقع مباريات اليوم والغد\n\n';
    shareText += `📅 اليوم: ${getDateFmt(new Date().toISOString())}\n📅 غداً: ${getDateFmt(tomorrow.toISOString())}\n━\n\n`;
    todayTomorrowMatches.forEach((m, index) => {
        const dayLabel = isMatchToday(m.timeISO) ? '📌 اليوم' : '📌 غداً';
        const timeStr = getTimeFromISO(m.timeISO);
        const link = `${baseUrl}?m=${m.id}`;
        shareText += `${index+1}. ${getFlag(m.team1)} ${m.team1} 🆚 ${getFlag(m.team2)} ${m.team2}\n🕒 ${dayLabel} - ${timeStr}\n🔗 <${link}>\n\n`;
    });
    shareText += '━\n✨ توقع · تنافس · اربح ✨\n#كأس_العالم_2026 #توقعات';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => window.showCopyToast(`✅ تم نسخ روابط ${todayTomorrowMatches.length} مباراة!`)).catch(() => fallbackCopy(shareText));
    } else { fallbackCopy(shareText); }
}
function fallbackCopy(text) { const textArea = document.createElement('textarea'); textArea.value = text; textArea.style.position = 'fixed'; textArea.style.top = '-9999px'; textArea.style.left = '-9999px'; document.body.appendChild(textArea); textArea.select(); try { document.execCommand('copy'); window.showCopyToast('✅ تم نسخ جميع الروابط!'); } catch(e) { prompt('انسخ النص التالي للمشاركة:', text); } document.body.removeChild(textArea); }

export function copyMatchLink(matchId, team1, team2) {
    const shareUrl = `${window.location.origin}${window.location.pathname}?m=${matchId}`;
    if (navigator.share) {
        navigator.share({ title: `🏆 توقع مباراة ${team1} 🆚 ${team2}`, text: `🔮 توقع نتيجة مباراة ${team1} 🆚 ${team2} في كأس العالم 2026\n\n🔗 ${shareUrl}`, url: shareUrl }).catch(()=>{});
    } else {
        navigator.clipboard.writeText(shareUrl).then(() => window.showCopyToast('✅ تم نسخ رابط المباراة!')).catch(() => {
            const textArea = document.createElement('textarea'); textArea.value = shareUrl; document.body.appendChild(textArea); textArea.select(); document.execCommand('copy'); document.body.removeChild(textArea); window.showCopyToast('✅ تم نسخ رابط المباراة!');
        });
    }
}

export function showCopyToast(msg) {
    const t = document.getElementById('copyToast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

export function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme === 'light' ? 'light' : '');
    localStorage.setItem('theme', newTheme);
    document.getElementById('themeToggleBtn').textContent = newTheme === 'light' ? '☀️ الوضع الفاتح' : '🌙 الوضع المظلم';
}

export function shareResults() {
    const currentUser = localStorage.getItem('lastUserName') || 'لاعب';
    const userScore = document.querySelector('.champion-card .info .stats-row .item:first-child strong')?.textContent || '0';
    const userRank = document.querySelector('.champion-card .rank-badge')?.textContent || '🥇';
    const totalPlayers = document.getElementById('lbTotalPlayers')?.textContent || '0';
    const shareText = `🏆 كأس العالم 2026\n\n👤 ${currentUser}\n📊 النقاط: ${userScore}\n🏅 الترتيب: ${userRank}\n👥 عدد اللاعبين: ${totalPlayers}\n\n✨ توقع · تنافس · اربح ✨\n#كأس_العالم_2026 #توقعات`;
    if (navigator.share) { navigator.share({ title: 'نتائجي في كأس العالم 2026', text: shareText }).catch(()=>{}); }
    else { navigator.clipboard.writeText(shareText).then(() => showCopyToast('✅ تم نسخ النتائج!')).catch(() => prompt('انسخ النص التالي للمشاركة:', shareText)); }
}

export function toggleCompactMode() {
    const container = document.getElementById('leaderboardContainer');
    const playersList = container.querySelector('.players-list');
    const championCard = container.querySelector('.champion-card');
    if (playersList) {
        window.isCompactMode = !window.isCompactMode;
        playersList.classList.toggle('compact-mode');
        if (championCard) { championCard.style.transform = window.isCompactMode ? 'scale(0.85)' : 'scale(1)'; championCard.style.transformOrigin = 'center center'; championCard.style.margin = window.isCompactMode ? '-10px 0' : '0'; }
        const btn = document.getElementById('toggleCompactBtn');
        if (window.isCompactMode) { btn.innerHTML = '📐 وضع التصوير (مفعل)'; btn.style.background = 'linear-gradient(135deg, var(--success), #27ae60)'; showCopyToast('📐 تم تفعيل وضع التصغير للقطة الشاشة'); }
        else { btn.innerHTML = '📐 تصغير للتصوير'; btn.style.background = 'linear-gradient(135deg, var(--gold), #d49a1a)'; showCopyToast('📐 تم إلغاء وضع التصغير'); }
    } else { showCopyToast('⚠️ انتظر حتى تحميل البيانات'); }
}

export function resetCompactMode() {
    const container = document.getElementById('leaderboardContainer');
    const playersList = container.querySelector('.players-list');
    const championCard = container.querySelector('.champion-card');
    if (playersList) {
        window.isCompactMode = false;
        playersList.classList.remove('compact-mode');
        if (championCard) { championCard.style.transform = 'scale(1)'; championCard.style.margin = '0'; }
        const btn = document.getElementById('toggleCompactBtn');
        btn.innerHTML = '📐 تصغير للتصوير';
        btn.style.background = 'linear-gradient(135deg, var(--gold), #d49a1a)';
        showCopyToast('🔄 تم إعادة الحجم الطبيعي');
    }
}

export function toggleModalCompact() {
    const modalContent = document.getElementById('matchPredictionsContent');
    const btn = document.getElementById('modalCompactBtn');
    window.isModalCompact = !window.isModalCompact;
    modalContent.classList.toggle('compact-mode');
    if (window.isModalCompact) { btn.textContent = '📐 تكبير'; showCopyToast('📐 تم تصغير جدول التوقعات للتصوير'); }
    else { btn.textContent = '📐 تصغير'; showCopyToast('📐 تم تكبير جدول التوقعات'); }
}