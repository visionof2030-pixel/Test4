// ===== MODULE: api.js =====
import { getCache, setCache } from './storage.js';
import { translateToArabic } from './translations.js';

// جلب البيانات من openfootball (تستخدم داخلياً)
export async function fetchOpenfootballData() {
    const cached = getCache("openfootball");
    if (cached) return cached;
    try {
        const res = await fetch("https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json");
        const data = await res.json();
        const matches = data.matches || [];
        setCache("openfootball", matches);
        return matches;
    } catch (e) {
        console.warn("⚠️ فشل تحميل بيانات openfootball:", e);
        return [];
    }
}

// الدالة الرئيسية لجلب المباريات وتحويلها إلى تنسيق gamesData
export async function fetchGamesFromAPI() {
    const cached = getCache("games");
    if (cached) return cached;
    try {
        const rawMatches = await fetchOpenfootballData();
        if (!rawMatches || rawMatches.length === 0) return [];

        // تحويل كل مباراة إلى التنسيق المطلوب
        const games = rawMatches.map(m => {
            // استخراج النتيجة (إذا كانت المباراة منتهية)
            let homeScore = 0, awayScore = 0;
            let finished = false;

            // محاولة الحصول على النتيجة من الحقول المختلفة
            if (m.goals1 && m.goals2) {
                homeScore = m.goals1.length;
                awayScore = m.goals2.length;
                finished = true; // وجود أهداف يعني انتهاء المباراة غالباً
            } else if (m.home_score !== undefined && m.away_score !== undefined) {
                homeScore = parseInt(m.home_score) || 0;
                awayScore = parseInt(m.away_score) || 0;
                finished = true;
            } else {
                // إذا لم تكن هناك أهداف، نعتبر المباراة لم تنته بعد
                finished = false;
            }

            // معالجة التاريخ
            let dateStr = m.date || m.local_date || '';
            let dayName = '', formattedDate = '', timeMatch = '';
            if (dateStr) {
                try {
                    const d = new Date(dateStr);
                    if (!isNaN(d)) {
                        dayName = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][d.getDay()];
                        formattedDate = `${d.getDate()} ${['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][d.getMonth()]} ${d.getFullYear()}`;
                        timeMatch = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
                    }
                } catch(e) {}
            }

            // ترجمة أسماء الفرق
            const homeAr = translateToArabic(m.team1 || m.home_team_name || '');
            const awayAr = translateToArabic(m.team2 || m.away_team_name || '');

            return {
                homeAr,
                awayAr,
                homeScore,
                awayScore,
                finished,
                local_date: dateStr,
                dayName,
                formattedDate,
                timeMatch,
                stadium_id: m.stadium_id || null,
                scorers: m.scorers || '',
                home_team_name_en: m.team1 || m.home_team_name || '',
                away_team_name_en: m.team2 || m.away_team_name || '',
                home_team_name_fa: homeAr,
                away_team_name_fa: awayAr,
                round: m.round || m.stage || '',
                stage: m.stage || '',
                raw: m // الاحتفاظ بالبيانات الأصلية للمخطط
            };
        });

        setCache("games", games);
        return games;
    } catch (e) {
        console.error("❌ تحميل API:", e);
        return [];
    }
}