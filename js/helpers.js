// ===== MODULE: helpers.js =====
import { translateToArabic } from './translations.js';

export function now() { return Date.now(); }

export function matchTime(t) { return new Date(t).getTime(); }
export const MATCH_DURATION = 105 * 60 * 1000;

export function isMatchLive(timeISO) {
    const cur = now();
    const start = matchTime(timeISO);
    return cur >= start && cur <= start + MATCH_DURATION;
}

export function isMatchFinished(timeISO) {
    return now() > matchTime(timeISO) + MATCH_DURATION;
}

export function canPredict(timeISO) {
    const start = matchTime(timeISO);
    const nowTime = now();
    const fiveMinutes = 5 * 60 * 1000;
    return (start - nowTime) > fiveMinutes;
}

export function getMatchStatus(m) {
    const start = matchTime(m.timeISO);
    const end = start + MATCH_DURATION;
    const cur = now();
    if (cur < start) {
        const diff = start - cur;
        const h = Math.floor(diff / 3600000);
        const min = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        const fiveMin = 5 * 60 * 1000;
        const remainingText = diff < fiveMin ? '⏳ تنطلق خلال أقل من 5 دقائق' : `⏱️ ${h}h ${min}m ${s}s`;
        return { live: false, finished: false, text: remainingText };
    } else if (cur <= end) {
        return { live: true, finished: false, text: "🔴 تُلعب الآن" };
    }
    return { live: false, finished: true, text: "✅ انتهت" };
}

export function upcomingMatches(arr) {
    return arr.filter(m => (matchTime(m.timeISO) + MATCH_DURATION) > now());
}

export function isMatchTodayOrTomorrow(timeISO) {
    const matchDate = new Date(timeISO);
    matchDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return matchDate.getTime() === today.getTime() || matchDate.getTime() === tomorrow.getTime();
}

export function isMatchToday(timeISO) {
    const matchDate = new Date(timeISO);
    matchDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return matchDate.getTime() === today.getTime();
}

export function getDay(t) {
    return ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][new Date(t).getDay()];
}

export function getDateFmt(t) {
    const d = new Date(t);
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function getTimeFromISO(t) {
    const d = new Date(t);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export function getDateTimeDisplay(t) {
    return `${getDateFmt(t)} - ${getTimeFromISO(t)}`;
}

export function formatDate(isoString) {
    if (!isoString) return 'تاريخ غير معروف';
    const d = new Date(isoString);
    return `${d.getDate()} ${['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][d.getMonth()]} ${d.getFullYear()}، ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export function normalizeName(str) {
    if (!str) return "";
    str = str.normalize("NFD").replace(/[\u064B-\u065F]/g, "");
    str = str.replace(/[ى]/g, "ا").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/[ک]/g, "ك").replace(/[ی]/g, "ي").replace(/[ي]/g, "ي").replace(/[ئ]/g, "ي").replace(/[ؤ]/g, "و").replace(/[إ]/g, "ا").replace(/[آ]/g, "ا");
    return str.trim().replace(/\s+/g, ' ');
}

export function findMatchResult(team1, team2, gamesData) {
    if (!gamesData || !gamesData.length) return null;
    let match = gamesData.find(m => (m.homeAr === team1 && m.awayAr === team2) || (m.homeAr === team2 && m.awayAr === team1));
    if (match) return { homeScore: match.homeScore, awayScore: match.awayScore, homeAr: match.homeAr, awayAr: match.awayAr };
    return null;
}

export function getGroundForMatch(team1, team2, timeISO, openfootballMatches) {
    if (!openfootballMatches || !openfootballMatches.length) return null;
    const t1 = translateToArabic(team1);
    const t2 = translateToArabic(team2);
    let match = openfootballMatches.find(m => {
        const h = translateToArabic(m.team1 || '');
        const a = translateToArabic(m.team2 || '');
        return (h === t1 && a === t2) || (h === t2 && a === t1);
    });
    if (match && match.ground) return match.ground;
    if (timeISO) {
        const dateStr = getDateFmt(timeISO);
        match = openfootballMatches.find(m => {
            if (!m.date) return false;
            return m.date.includes(dateStr) || dateStr.includes(m.date);
        });
        if (match && match.ground) return match.ground;
    }
    return null;
}