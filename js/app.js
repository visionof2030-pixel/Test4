// ===== js/app.js =====
import { fetchPredictions, fetchArchive, insertPrediction, updatePrediction, getUserPrediction } from './data/supabase.js';
import { getSubmittedMatches, addSubmittedMatch, isMatchSubmitted, getCache, setCache, getLastUserName, setLastUserName } from './data/storage.js';
import { loadMatchesFromAPI, getMatchById, getMatchResult, STATIC_MATCHES, FINAL_GROUPS } from './core/data.js';
import { canPredict, isMatchFinished, isMatchToday } from './core/helpers.js';
import { renderUpcoming, renderPreviousMatches, renderLeaderboard, renderTodayLeaderboard, renderAllPredictions, updateNewsTicker } from './ui/render.js';
import { openPredictionModal, openEditPredictionModal, openMatchPredictions, openViewPredictionsModal, openPlayerPredictions } from './ui/modals.js'; // سيتم إنشاؤه
import { renderArchive } from './ui/archive.js';
import { openAnalytics } from './ui/analytics.js';
import { showCopyToast } from './ui/toast.js';
import { loadDuplicates, runTests } from './ui/admin.js';

// متغيرات عامة (للربط فقط)
window.gamesData = [];
window.predictions = [];
window.isAuthorized = false;

// ===== تحميل البيانات =====
async function loadData() {
    try {
        // تحميل المباريات من openfootball + caching
        let games = getCache('gamesData');
        if (!games) {
            games = await loadMatchesFromAPI();
            setCache('gamesData', games);
        }
        window.gamesData = games;

        // تحميل التوقعات من Supabase + caching
        let preds = getCache('predictionsData');
        if (!preds) {
            preds = await fetchPredictions();
            setCache('predictionsData', preds);
        }
        window.predictions = preds;
        return { games, preds };
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
        document.querySelectorAll('.empty-state').forEach(el => {
            el.innerHTML = '<span class="icon">⚠️</span> فشل التحميل، حاول تحديث الصفحة';
        });
        return;
    }
    const { games, preds } = data;

    // عرض المكونات
    renderLeaderboard(preds, games);
    renderTodayLeaderboard(preds, games);
    renderUpcoming(games, games, preds, 'all', 'all');
    renderPreviousMatches(games, preds);
    renderAllPredictions(preds, games);
    updateNewsTicker(games, preds, games);
    renderArchive();

    // تفعيل التبويبات
    initTabs(games, preds);
    
    // التحقق من رابط المباراة
    checkUrlForMatch(games, preds);
    
    // التحديث التلقائي
    startAutoUpdate(games, preds);
    
    // ربط الأحداث
    bindEvents(games, preds);
    
    console.log('✅ تم التهيئة بنجاح');
}

// ===== التبويبات =====
function initTabs(games, preds) {
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
            
            if (id === 'previous') renderPreviousMatches(games, preds);
            if (id === 'standings') renderStandings(games);
            if (id === 'scorers') renderScorers(games);
            if (id === 'stats') renderTeamStats(games);
            if (id === 'bracket') renderBracket(games);
            if (id === 'predictions') renderAllPredictions(preds, games);
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
}

// ===== ربط الأحداث =====
function bindEvents(games, preds) {
    // فلتر المجموعة
    document.getElementById('groupFilter')?.addEventListener('change', function() {
        const group = this.value;
        const day = document.querySelector('.day-btn.active')?.dataset.day || 'all';
        renderUpcoming(games, games, preds, group, day);
    });
    // أزرار اليوم
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const day = this.dataset.day;
            const group = document.getElementById('groupFilter')?.value || 'all';
            renderUpcoming(games, games, preds, group, day);
        });
    });
    // بحث المباريات السابقة
    document.getElementById('prevSearchInput')?.addEventListener('input', function() {
        renderPreviousMatches(games, preds, this.value);
    });
    // الفوتر (تفعيل الإدارة)
    document.getElementById('footerTrigger')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.isAuthorized) {
            document.getElementById('shareAllContainer').classList.toggle('visible');
            document.getElementById('adminControls').classList.toggle('visible');
        } else {
            showPasswordOverlay();
        }
    });
}

// ===== التحقق من رابط المباراة =====
function checkUrlForMatch(games, preds) {
    const params = new URLSearchParams(window.location.search);
    const matchId = params.get('m');
    if (matchId && !isNaN(matchId)) {
        const match = getMatchById(parseInt(matchId), games);
        if (match && !isMatchFinished(match.timeISO)) {
            setTimeout(() => openPredictionModal(parseInt(matchId)), 800);
        }
    }
}

// ===== التحديث التلقائي =====
function startAutoUpdate(games, preds) {
    setInterval(() => {
        const group = document.getElementById('groupFilter')?.value || 'all';
        const day = document.querySelector('.day-btn.active')?.dataset.day || 'all';
        renderUpcoming(games, games, preds, group, day);
        updateNewsTicker(games, preds, games);
    }, 10000);
    setInterval(async () => {
        // تحديث التوقعات من Supabase
        const newPreds = await fetchPredictions();
        if (newPreds) {
            window.predictions = newPreds;
            setCache('predictionsData', newPreds);
            renderLeaderboard(newPreds, games);
            renderTodayLeaderboard(newPreds, games);
            renderAllPredictions(newPreds, games);
            renderArchive();
        }
    }, 30000);
}

// ===== دوال الإدارة (كلمة السر) =====
function showPasswordOverlay() {
    document.getElementById('passwordOverlay').classList.add('active');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordError').textContent = '';
    setTimeout(() => document.getElementById('passwordInput').focus(), 300);
    document.body.style.overflow = 'hidden';
}
function hidePasswordOverlay() {
    document.getElementById('passwordOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function checkPassword() {
    const input = document.getElementById('passwordInput').value.trim();
    if (input === '1406') {
        window.isAuthorized = true;
        hidePasswordOverlay();
        document.getElementById('shareAllContainer').classList.add('visible');
        document.getElementById('adminControls').classList.add('visible');
        showCopyToast('✅ تم تفعيل لوحة الإدارة');
    } else {
        document.getElementById('passwordError').textContent = '❌ رمز غير صحيح';
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
    }
}
document.getElementById('passwordSubmitBtn')?.addEventListener('click', checkPassword);
document.getElementById('passwordInput')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkPassword();
    if (e.key === 'Escape') hidePasswordOverlay();
});
document.getElementById('passwordCloseBtn')?.addEventListener('click', hidePasswordOverlay);
document.getElementById('passwordOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) hidePasswordOverlay();
});

// ===== ربط الدوال للاستخدام في HTML =====
window.openPredictionModal = openPredictionModal;
window.openEditPredictionModal = openEditPredictionModal;
window.openMatchPredictions = openMatchPredictions;
window.openViewPredictionsModal = openViewPredictionsModal;
window.openPlayerPredictions = openPlayerPredictions;
window.copyMatchLink = copyMatchLink;
window.shareResults = shareResults;
window.toggleTheme = toggleTheme;
window.toggleCompactMode = toggleCompactMode;
window.resetCompactMode = resetCompactMode;
window.loadDuplicates = loadDuplicates;
window.runTests = runTests;
window.openAnalytics = openAnalytics;
window.archiveAllPredictions = archiveAllPredictions;
window.showCopyToast = showCopyToast;

// ===== بدء التطبيق =====
document.addEventListener('DOMContentLoaded', init);