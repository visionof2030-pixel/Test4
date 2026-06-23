// ===== js/core/helpers.js =====

// دوال الزمن
export function now() { return Date.now(); }
export function matchTime(t) { return new Date(t).getTime(); }
export const MATCH_DURATION = 105 * 60 * 1000;

export function isMatchFinished(timeISO) {
    return now() > matchTime(timeISO) + MATCH_DURATION;
}

export function canPredict(timeISO) {
    return (matchTime(timeISO) - now()) > 5 * 60 * 1000;
}

export function getMatchStatus(match) {
    const start = matchTime(match.timeISO);
    const end = start + MATCH_DURATION;
    const cur = now();
    if (cur < start) {
        const diff = start - cur;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        const remaining = diff < 5*60*1000 ? '⏳ تنطلق خلال أقل من 5 دقائق' : `⏱️ ${h}h ${m}m ${s}s`;
        return { live: false, finished: false, text: remaining };
    }
    if (cur <= end) return { live: true, finished: false, text: '🔴 تُلعب الآن' };
    return { live: false, finished: true, text: '✅ انتهت' };
}

export function isMatchToday(timeISO) {
    const d = new Date(timeISO);
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
}

export function isMatchThisWeek(timeISO) {
    const d = new Date(timeISO);
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekLater = new Date(today);
    weekLater.setDate(weekLater.getDate() + 7);
    return d >= today && d <= weekLater;
}

export function getDay(t) {
    return ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][new Date(t).getDay()];
}

export function getDateFmt(t) {
    const d = new Date(t);
    const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function getTimeFromISO(t) {
    const d = new Date(t);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export function formatDate(isoString) {
    if (!isoString) return 'تاريخ غير معروف';
    const d = new Date(isoString);
    return `${d.getDate()} ${['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][d.getMonth()]} ${d.getFullYear()}، ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

// ===== حساب نقاط المستخدمين (لا يعتمد على الترجمة) =====
export function calculateUserPoints(predictions, gamesData) {
    const scores = {};
    for (const p of predictions) {
        if (!scores[p.user_name]) {
            scores[p.user_name] = { name: p.user_name, points: 0, correct: 0, total: 0 };
        }
        scores[p.user_name].total++;
        const match = gamesData.find(g => g.id === p.match_id);
        if (!match) continue;
        const result = match.score.home > match.score.away ? match.home :
                       match.score.away > match.score.home ? match.away : 'DRAW';
        if (p.prediction === result) {
            scores[p.user_name].points++;
            scores[p.user_name].correct++;
        }
    }
    return scores;
}

// ===== حساب نقاط اليوم (لمباريات اليوم فقط) =====
export function calculateTodayPoints(predictions, gamesData) {
    const todayMatches = gamesData.filter(m => isMatchToday(m.timeISO));
    const todayIds = todayMatches.map(m => m.id);
    const todayPreds = predictions.filter(p => todayIds.includes(p.match_id));
    return calculateUserPoints(todayPreds, gamesData);
}

// ===== ترتيب المتصدرين =====
export function getLeaderboard(predictions, gamesData) {
    const scores = calculateUserPoints(predictions, gamesData);
    return Object.values(scores).sort((a,b) => b.points - a.points);
}

// ===== ترتيب اليوم =====
export function getTodayLeaderboard(predictions, gamesData) {
    const scores = calculateTodayPoints(predictions, gamesData);
    return Object.values(scores).sort((a,b) => b.points - a.points);
}