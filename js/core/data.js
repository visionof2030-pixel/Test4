// ===== js/core/data.js =====
import { fetchOpenfootballData } from '../data/supabase.js';
import { translateToArabic } from '../translations.js';

// بيانات المباريات الثابتة (المعرفات الرقمية)
export const STATIC_MATCHES = [
    { id: 1, home: "المكسيك", away: "جنوب أفريقيا", timeISO: "2026-06-11T22:00:00+03:00" },
    { id: 2, home: "الأرجنتين", away: "الجزائر", timeISO: "2026-06-11T04:00:00+03:00" },
    { id: 3, home: "النمسا", away: "الأردن", timeISO: "2026-06-11T07:00:00+03:00" },
    { id: 4, home: "البرتغال", away: "الكونغو الديمقراطية", timeISO: "2026-06-11T20:00:00+03:00" },
    // ... (جميع المباريات الـ 73 بنفس المعرفات)
];

export const FINAL_GROUPS = {
    "A": ["المكسيك", "جنوب أفريقيا", "كوريا الجنوبية", "التشيك"],
    "B": ["كندا", "البوسنة والهرسك", "قطر", "سويسرا"],
    // ... (جميع المجموعات)
};

// تحويل بيانات openfootball إلى match objects
export function convertOpenfootballToMatches(rawMatches) {
    return rawMatches.map((m, index) => {
        // محاولة استخراج النتيجة
        let homeScore = 0, awayScore = 0;
        let finished = false;
        if (m.goals1 && m.goals2) {
            homeScore = m.goals1.length;
            awayScore = m.goals2.length;
            finished = true;
        } else if (m.home_score !== undefined && m.away_score !== undefined) {
            homeScore = parseInt(m.home_score) || 0;
            awayScore = parseInt(m.away_score) || 0;
            finished = true;
        }
        return {
            id: m.id || index + 1,
            home: translateToArabic(m.team1 || m.home_team_name || ''),
            away: translateToArabic(m.team2 || m.away_team_name || ''),
            timeISO: m.date || '',
            score: { home: homeScore, away: awayScore },
            finished,
            stadium: m.ground || m.stadium || '',
            round: m.round || m.stage || '',
            raw: m // للاستخدام في المخطط
        };
    });
}

// تحميل المباريات من openfootball وتطابقها مع المعرفات الثابتة
export async function loadMatchesFromAPI() {
    const raw = await fetchOpenfootballData();
    if (!raw || raw.length === 0) return STATIC_MATCHES;
    
    // تحويل البيانات الخام إلى match objects
    const converted = convertOpenfootballToMatches(raw);
    
    // دمج مع المعرفات الثابتة (الحفاظ على نفس المعرفات)
    const merged = STATIC_MATCHES.map(staticMatch => {
        const found = converted.find(c => 
            c.home === staticMatch.home && c.away === staticMatch.away
        );
        if (found) {
            return { ...staticMatch, score: found.score, finished: found.finished, stadium: found.stadium, raw: found.raw };
        }
        return staticMatch;
    });
    return merged;
}

// الحصول على نتيجة مباراة باستخدام المعرف
export function getMatchResult(matchId, gamesData) {
    if (!gamesData) return null;
    const match = gamesData.find(g => g.id === matchId);
    if (!match || !match.score) return null;
    return match.score;
}

// الحصول على مباراة كاملة باستخدام المعرف
export function getMatchById(matchId, gamesData) {
    if (!gamesData) return null;
    return gamesData.find(g => g.id === matchId) || null;
}

// معرفة ما إذا كانت المباراة منتهية
export function isMatchFinishedById(matchId, gamesData) {
    const match = getMatchById(matchId, gamesData);
    if (!match) return false;
    return match.finished || (match.score && (match.score.home !== undefined || match.score.away !== undefined));
}