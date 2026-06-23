// ===== MODULE: app.js =====
import { supabase, fetchPredictions, fetchArchive } from './supabase.js';
import { getSubmittedMatches, addSubmittedMatch, isMatchSubmitted, getCache, setCache, clearCache } from './storage.js';
import { fetchOpenfootballData, fetchGamesFromAPI } from './api.js';
import { translateToArabic, getFlag } from './translations.js';
import { matchesData, finalGroups, rawMatches } from './matchUtils.js';
import { renderUpcoming, updateNewsTicker, shareAllTodayTomorrow, copyMatchLink, showCopyToast, toggleTheme, shareResults, toggleCompactMode, resetCompactMode, toggleModalCompact } from './ui.js';
import { openPredictionModal, openEditPredictionModal, openMatchPredictions, openViewPredictionsModal, openPlayerPredictions, closePredictionModal, closeViewPredictionsModal, closePlayerPredictionsModal, closeMatchPredictionsModal } from './modal.js';
import { loadDuplicates, runTests, savePrediction, getUserPrediction } from './admin.js';
import { openAnalytics, closeAnalytics } from './charts.js';
import { archiveAllPredictions, renderArchive } from './archive.js';
import { renderLeaderboard, renderTodayLeaderboard } from './leaderboard.js';
import { calculateStandings, renderTeamStats, renderScorers, renderBracket } from './ui.js'; // هذه الدوال موجودة في ui.js أو يمكن نقلها

// ===== متغيرات عامة =====
window.gamesData = [];
window.openfootballData = [];
window.predictions = [];
window.isAuthorized = false;
window.isCompactMode = false;
window.isModalCompact = false;
window.isEditing = false;
window.currentMatchId = null;
window.currentTeam1 = '';
window.currentTeam2 = '';
window.currentTimeISO = '';
window.currentDayFilter = 'all';
window.SECRET_CODE = '1406';

// ===== تحميل البيانات =====
async function loadData() {
    try {
        const [games, openfootball, preds] = await Promise.all([
            fetchGamesFromAPI(),
            fetchOpenfootballData(),
            fetchPredictions(500)
        ]);
        window.gamesData = games;
        window.openfootballData = openfootball;
        window.predictions = preds;
        return { games, openfootball, preds };
    } catch (e) {
        console.error('❌ فشل تحميل البيانات:', e);
        return null;
    }
}

// ===== تهيئة التطبيق =====
async function init() {
    console.log('🚀 تهيئة التطبيق...');
    const data = await loadData();
    if (!data) {
        document.querySelectorAll('.empty-state .icon').forEach(el => el.textContent = '⚠️');
        document.querySelectorAll('.empty-state').forEach(el => el.textContent = '⚠️ فشل التحميل، حاول تحديث الصفحة');
        return;
    }
    window.gamesData = data.games;
    window.openfootballData = data.openfootball;
    window.predictions = data.preds;

    // تحديث الواجهات
    renderLeaderboard(window.predictions, window.gamesData);
    renderTodayLeaderboard(window.predictions, window.gamesData);
    renderUpcoming(window.gamesData, window.openfootballData, 'all', 'all');
    calculateStandings(window.gamesData);
    renderTeamStats(window.gamesData);
    renderScorers(window.openfootballData, window.gamesData);
    renderBracket(window.openfootballData, window.gamesData);
    renderAllPredictions(window.predictions);
    renderArchive();

    updateNewsTicker(window.predictions);
    updateShareAllCount();

    // تفعيل التبويبات
    initTabs();

    // التحقق من رابط المباراة
    checkUrlForMatch();

    // التحديث التلقائي
    startAutoUpdate();

    console.log('✅ تم التهيئة بنجاح');
}

// ===== دوال أخرى =====
function updateShareAllCount() {
    if (!window.isAuthorized) { document.getElementById('shareAllCount').textContent = '🔒'; return; }
    const today = new Date(); today.setHours(0,0,0,0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
    const activeMatches = matchesData.filter(m => (matchTime(m.timeISO) + MATCH_DURATION) > now());
    const count = activeMatches.filter(m => {
        const d = new Date(m.timeISO); d.setHours(0,0,0,0);
        return d.getTime() === today.getTime() || d.getTime() === tomorrow.getTime();
    }).length;
    document.getElementById('shareAllCount').textContent = count;
}

function checkUrlForMatch() {
    const params = new URLSearchParams(window.location.search);
    const matchId = params.get('m');
    if (matchId && !isNaN(matchId)) {
        const match = matchesData.find(m => m.id === parseInt(matchId));
        if (match && !isMatchFinished(match.timeISO)) {
            setTimeout(() => {
                openPredictionModal(`${match.timeISO}_${match.team1}_${match.team2}`, match.team1, match.team2, match.timeISO);
            }, 800);
        }
    }
}

function startAutoUpdate() {
    setInterval(() => {
        renderUpcoming(window.gamesData, window.openfootballData, document.getElementById('groupFilter')?.value || 'all', window.currentDayFilter);
        updateNewsTicker(window.predictions);
        updateShareAllCount();
    }, 10000);
    setInterval(async () => {
        const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
        if (activeTab === 'standings') calculateStandings(window.gamesData);
        if (activeTab === 'scorers') renderScorers(window.openfootballData, window.gamesData);
        if (activeTab === 'stats') renderTeamStats(window.gamesData);
        if (activeTab === 'bracket') renderBracket(window.openfootballData, window.gamesData);
        if (activeTab === 'predictions') renderAllPredictions(window.predictions);
        if (activeTab === 'archive') renderArchive();
        renderLeaderboard(window.predictions, window.gamesData);
        renderTodayLeaderboard(window.predictions, window.gamesData);
    }, 30000);
}

// ===== دوال التبويبات =====
function initTabs() {
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById(`${id}Tab`).classList.add('active');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const dayFilter = document.getElementById('dayFilterTabs');
            if (id === 'upcoming') dayFilter.classList.add('visible');
            else dayFilter.classList.remove('visible');
            if (id === 'standings') calculateStandings(window.gamesData);
            if (id === 'scorers') renderScorers(window.openfootballData, window.gamesData);
            if (id === 'stats') renderTeamStats(window.gamesData);
            if (id === 'bracket') renderBracket(window.openfootballData, window.gamesData);
            if (id === 'predictions') renderAllPredictions(window.predictions);
            if (id === 'archive') renderArchive();
        });
    });
    // تفعيل التبويب النشط
    const active = document.querySelector('.tab-btn.active');
    if (active) {
        const id = active.dataset.tab;
        document.getElementById(`${id}Tab`).classList.add('active');
        if (id === 'upcoming') document.getElementById('dayFilterTabs').classList.add('visible');
    }
    // مستمع للفلتر
    document.getElementById('groupFilter')?.addEventListener('change', function() {
        renderUpcoming(window.gamesData, window.openfootballData, this.value, window.currentDayFilter);
    });
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            window.currentDayFilter = this.dataset.day;
            renderUpcoming(window.gamesData, window.openfootballData, document.getElementById('groupFilter')?.value || 'all', window.currentDayFilter);
        });
    });
    // مستمع البحث في المباريات السابقة
    document.getElementById('prevSearchInput')?.addEventListener('input', function() {
        renderPreviousGamesFiltered(this.value);
    });
}

// ===== دوال عرض إضافية =====
function renderAllPredictions(predictions) {
    const container = document.getElementById('allPredictions');
    const countSpan = document.getElementById('predictionsCount');
    countSpan.textContent = predictions.length;
    if (!predictions || predictions.length === 0) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات بعد</div>`;
        return;
    }
    const sorted = [...predictions].sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    container.innerHTML = sorted.slice(0, 20).map(p => {
        const parts = p.match_id.split('_');
        const team1 = parts[1] || '?', team2 = parts[2] || '?';
        let predText = p.prediction === 'DRAW' ? '🤝 تعادل' : `🏆 فوز ${getFlag(p.prediction)} ${p.prediction}`;
        const status = getPredictionStatus(p);
        let cardClass = '', badgeClass = '';
        if (status.status === 'correct') { cardClass = 'correct'; badgeClass = 'correct'; }
        else if (status.status === 'wrong') { cardClass = 'wrong'; badgeClass = 'wrong'; }
        else { cardClass = 'pending'; badgeClass = 'pending'; }
        return `<div class="prediction-card ${cardClass}" onclick="window.openPlayerPredictions('${p.user_name || ''}')" style="cursor:pointer;">
        <div class="user"><div class="avatar-p">${p.user_name ? p.user_name.charAt(0).toUpperCase() : '👤'}</div><span class="name-p">${p.user_name || 'مجهول'}</span></div>
        <div class="prediction-text">${team1} 🆚 ${team2}</div>
        <div class="prediction-text" style="color:var(--gold-light);">🔮 ${predText}</div>
        <span class="status-badge ${badgeClass}">${status.text}</span>
        <div style="font-size:0.6rem;color:var(--text-secondary);margin-top:4px;">🕒 ${p.created_at ? formatDate(p.created_at) : 'تاريخ غير معروف'}</div>
      </div>`;
    }).join('');
}

function renderPreviousGamesFiltered(searchText) {
    const container = document.getElementById('previousMatchesContainer');
    let filtered = window.gamesData;
    if (searchText) filtered = filtered.filter(g => g.homeAr.includes(searchText) || g.awayAr.includes(searchText));
    if (!filtered.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد مباريات مطابقة</div>`;
        return;
    }
    container.innerHTML = filtered.map(g => {
        let ground = getGroundForMatch(g.homeAr, g.awayAr, null, window.openfootballData);
        return `
      <div class="match-card finished-match" onclick="window.openPreviousMatchPredictions('${g.homeAr}','${g.awayAr}',${g.homeScore},${g.awayScore})">
        <div class="match-teams">
          <div class="match-team"><span class="flag">${getFlag(g.homeAr)}</span> ${g.homeAr}</div>
          <div class="match-score finished">${g.homeScore} - ${g.awayScore}</div>
          <div class="match-team"><span class="flag">${getFlag(g.awayAr)}</span> ${g.awayAr}</div>
        </div>
        <div class="match-meta">
          <span class="tag">${g.dayName || 'تاريخ'}</span>
          <span class="tag">${g.formattedDate || ''} ${g.timeMatch || ''}</span>
          <span class="tag finished-tag">✅ انتهت - اضغط لعرض التوقعات</span>
          ${ground ? `<span class="tag stadium-tag">🏟️ ${ground}</span>` : ''}
        </div>
      </div>
    `;
    }).join('');
}

// ===== دوال كلمة السر =====
function showPasswordOverlay() {
    document.getElementById('passwordOverlay').classList.add('active');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('modalCompactBtn').classList.remove('visible');
    setTimeout(() => document.getElementById('passwordInput').focus(), 300);
    document.body.style.overflow = 'hidden';
}
function hidePasswordOverlay() {
    document.getElementById('passwordOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function checkPassword() {
    const input = document.getElementById('passwordInput').value.trim();
    const errorEl = document.getElementById('passwordError');
    if (input === window.SECRET_CODE) {
        window.isAuthorized = true;
        errorEl.textContent = '';
        hidePasswordOverlay();
        document.getElementById('shareAllContainer').classList.add('visible');
        document.getElementById('adminControls').classList.add('visible');
        if (document.getElementById('matchPredictionsModal').classList.contains('active')) {
            document.getElementById('modalCompactBtn').classList.add('visible');
        }
        updateShareAllCount();
        showCopyToast('✅ تم تفعيل لوحة الإدارة');
    } else {
        errorEl.textContent = '❌ رمز غير صحيح';
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
    }
}

// ===== ربط الدوال العالمية =====
window.openPredictionModal = openPredictionModal;
window.openEditPredictionModal = openEditPredictionModal;
window.openMatchPredictions = openMatchPredictions;
window.openViewPredictionsModal = openViewPredictionsModal;
window.openPlayerPredictions = openPlayerPredictions;
window.closePredictionModal = closePredictionModal;
window.closeViewPredictionsModal = closeViewPredictionsModal;
window.closePlayerPredictionsModal = closePlayerPredictionsModal;
window.closeMatchPredictionsModal = closeMatchPredictionsModal;
window.shareAllTodayTomorrow = shareAllTodayTomorrow;
window.copyMatchLink = copyMatchLink;
window.showCopyToast = showCopyToast;
window.toggleTheme = toggleTheme;
window.shareResults = shareResults;
window.toggleCompactMode = toggleCompactMode;
window.resetCompactMode = resetCompactMode;
window.toggleModalCompact = toggleModalCompact;
window.loadDuplicates = loadDuplicates;
window.runTests = runTests;
window.openAnalytics = openAnalytics;
window.closeAnalytics = closeAnalytics;
window.archiveAllPredictions = archiveAllPredictions;
window.showPasswordOverlay = showPasswordOverlay;
window.checkPassword = checkPassword;
window.hidePasswordOverlay = hidePasswordOverlay;

// ===== مستمعات الأحداث =====
document.addEventListener('DOMContentLoaded', init);
document.getElementById('passwordSubmitBtn').addEventListener('click', checkPassword);
document.getElementById('passwordInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkPassword();
    if (e.key === 'Escape') hidePasswordOverlay();
});
document.getElementById('passwordCloseBtn').addEventListener('click', hidePasswordOverlay);
document.getElementById('passwordOverlay').addEventListener('click', function(e) {
    if (e.target === this) hidePasswordOverlay();
});
document.getElementById('footerTrigger').addEventListener('click', function(e) {
    e.preventDefault();
    if (window.isAuthorized) {
        document.getElementById('shareAllContainer').classList.toggle('visible');
        document.getElementById('adminControls').classList.toggle('visible');
        if (document.getElementById('shareAllContainer').classList.contains('visible')) {
            updateShareAllCount();
            showCopyToast('🔓 تم إظهار لوحة الإدارة');
        } else {
            showCopyToast('🔒 تم إخفاء لوحة الإدارة');
        }
    } else {
        showPasswordOverlay();
    }
});

// تحميل الثيم
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('themeToggleBtn').textContent = '☀️ الوضع الفاتح';
}

// ===== دوال إضافية مفقودة =====
function getPredictionStatus(prediction) {
    // (تم تعريفها في modal.js)
}
function formatDate(isoString) {
    // (تم تعريفها في helpers.js)
}
function getGroundForMatch(team1, team2, timeISO, openfootballMatches) {
    // (تم تعريفها في helpers.js)
}
function matchTime(t) { return new Date(t).getTime(); }
function now() { return Date.now(); }
const MATCH_DURATION = 105 * 60 * 1000;
function isMatchFinished(timeISO) { return now() > matchTime(timeISO) + MATCH_DURATION; }
function canPredict(timeISO) { return (matchTime(timeISO) - now()) > 5 * 60 * 1000; }

console.log('✅ جميع الوحدات تم تحميلها');