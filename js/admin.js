// ===== MODULE: admin.js =====
import { supabase, fetchPredictions, archivePredictions, deleteAllPredictions } from './supabase.js';
import { getFlag } from './translations.js';
import { showCopyToast } from './ui.js';

// ===== دوال التكرار =====
export async function loadDuplicates() {
    const section = document.getElementById('duplicatesSection');
    const container = document.getElementById('duplicatesContainer');
    const badge = document.getElementById('dupCountBadge');
    if (section.style.display === 'block') { section.style.display = 'none'; return; }
    section.style.display = 'block';
    container.innerHTML = `<div class="duplicates-empty">⏳ جاري البحث عن التكرارات...</div>`;
    if (!supabase) { container.innerHTML = `<div class="duplicates-empty">❌ Supabase غير متصل</div>`; return; }
    try {
        const data = await fetchPredictions(500);
        if (!data || data.length === 0) {
            container.innerHTML = `<div class="duplicates-empty">📭 لا توجد توقعات مسجلة</div>`;
            badge.textContent = '0'; return;
        }
        const groups = {};
        for (let p of data) {
            const key = `${p.user_name}|${p.match_id}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(p);
        }
        const duplicates = {};
        for (let [key, items] of Object.entries(groups)) {
            if (items.length > 1) {
                const [userName, matchId] = key.split('|');
                duplicates[key] = { user_name: userName, match_id: matchId, count: items.length, predictions: items.map(p => p.prediction) };
            }
        }
        const dupKeys = Object.keys(duplicates);
        badge.textContent = dupKeys.length;
        if (dupKeys.length === 0) {
            container.innerHTML = `<div class="duplicates-empty">✅ لا توجد توقعات مكررة</div>`;
            return;
        }
        let html = `<table class="duplicates-table"><thead><tr><th>المستخدم</th><th>المباراة</th><th>التكرار</th><th>التوقعات</th></tr></thead><tbody>`;
        for (let key of dupKeys) {
            const d = duplicates[key];
            const parts = d.match_id.split('_');
            const team1 = parts[1] || '?', team2 = parts[2] || '?';
            const preds = d.predictions.map(p => p === 'DRAW' ? 'تعادل' : p).join(' / ');
            html += `<tr><td class="dup-user">${d.user_name}</td><td class="dup-match">${getFlag(team1)} ${team1} 🆚 ${getFlag(team2)} ${team2}</td><td class="dup-count">${d.count}</td><td class="dup-preds">${preds}</td></tr>`;
        }
        html += `</tbody></table>`;
        container.innerHTML = html;
    } catch (e) {
        console.error("❌ جلب التكرارات:", e);
        container.innerHTML = `<div class="duplicates-empty">❌ حدث خطأ: ${e.message}</div>`;
    }
}

// ===== اختبارات (الفكرة 19) =====
export function runTests() {
    const modal = document.getElementById('testResultsModal');
    const content = document.getElementById('testResultsContent');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    content.innerHTML = `<div class="empty-state"><span class="icon">⏳</span> جاري تشغيل الاختبارات...</div>`;
    setTimeout(() => {
        const results = []; let pass = 0, fail = 0;
        // اختبار canPredict
        try {
            const future = new Date(Date.now() + 10*60*1000).toISOString();
            const near = new Date(Date.now() + 2*60*1000).toISOString();
            const past = new Date(Date.now() - 10*60*1000).toISOString();
            const r1 = canPredict(future) === true;
            const r2 = canPredict(near) === false;
            const r3 = canPredict(past) === false;
            if (r1 && r2 && r3) { pass++; results.push('✅ canPredict - صحيح'); } else { fail++; results.push('❌ canPredict - فشل'); }
        } catch(e) { fail++; results.push('❌ canPredict - استثناء: ' + e.message); }
        // اختبار translateToArabic
        try {
            const t1 = translateToArabic('Argentina') === 'الأرجنتين';
            const t2 = translateToArabic('Germany') === 'ألمانيا';
            if (t1 && t2) { pass++; results.push('✅ translateToArabic - صحيح'); } else { fail++; results.push('❌ translateToArabic - فشل'); }
        } catch(e) { fail++; results.push('❌ translateToArabic - استثناء: ' + e.message); }
        // اختبار getFlag
        try {
            const f1 = getFlag('البرازيل') === '🇧🇷';
            const f2 = getFlag('فرنسا') === '🇫🇷';
            if (f1 && f2) { pass++; results.push('✅ getFlag - صحيح'); } else { fail++; results.push('❌ getFlag - فشل'); }
        } catch(e) { fail++; results.push('❌ getFlag - استثناء: ' + e.message); }
        // اختبار getSubmittedMatches
        try {
            const key = 'submitted_matches';
            const old = localStorage.getItem(key);
            localStorage.setItem(key, JSON.stringify(['test1','test2']));
            const list = getSubmittedMatches();
            localStorage.setItem(key, old || '[]');
            if (Array.isArray(list) && list.length === 2 && list.includes('test1')) { pass++; results.push('✅ getSubmittedMatches - صحيح'); } else { fail++; results.push('❌ getSubmittedMatches - فشل'); }
        } catch(e) { fail++; results.push('❌ getSubmittedMatches - استثناء: ' + e.message); }
        // اختبار findMatchResult (محاكاة)
        try {
            const fakeGames = [{ homeAr: 'البرازيل', awayAr: 'الأرجنتين', homeScore: 2, awayScore: 1 }];
            const original = window.gamesData;
            window.gamesData = fakeGames;
            const res = findMatchResult('البرازيل', 'الأرجنتين', window.gamesData);
            window.gamesData = original;
            if (res && res.homeScore === 2 && res.awayScore === 1) { pass++; results.push('✅ findMatchResult - صحيح'); } else { fail++; results.push('❌ findMatchResult - فشل'); }
        } catch(e) { fail++; results.push('❌ findMatchResult - استثناء: ' + e.message); }
        const total = results.length;
        content.innerHTML = `
        <div style="text-align:center;margin-bottom:16px;">
          <div style="font-size:1.2rem;font-weight:800;color:var(--gold-light);">${pass} ✅ نجاح / ${fail} ❌ فشل</div>
          <div style="font-size:0.8rem;color:var(--text-secondary);">من أصل ${total} اختبار</div>
        </div>
        <div style="max-height:300px;overflow-y:auto;text-align:right;">${results.map(r => `<div style="padding:4px 8px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.8rem;">${r}</div>`).join('')}</div>
        <div style="text-align:center;margin-top:16px;"><button class="tab-btn" onclick="document.getElementById('testResultsModal').classList.remove('active');document.body.style.overflow='';" style="background:rgba(240,180,41,0.08);border-color:rgba(240,180,41,0.2);color:var(--gold-light);">إغلاق</button></div>
      `;
    }, 500);
}

// ===== حفظ التوقع (مع التعديل) =====
export async function savePrediction(userName, matchId, prediction) {
    if (!supabase) return { success: false, message: "Supabase غير متصل" };
    const match = matchesData.find(m => `${m.timeISO}_${m.team1}_${m.team2}` === matchId);
    if (match) {
        if (!canPredict(match.timeISO)) {
            return { success: false, message: "⛔ لا يمكن التوقع الآن، المباراة على وشك البدء أو بدأت بالفعل (يُسمح حتى 5 دقائق قبل البداية)." };
        }
    } else {
        return { success: false, message: "⛔ مباراة غير معروفة" };
    }

    async function isUserNameExists(userName) {
        if (!supabase || !userName) return false;
        try {
            const { data, error } = await supabase.from("predictions").select("user_name").eq("user_name", userName).limit(1);
            if (error) throw error;
            return data && data.length > 0;
        } catch(e) { console.error("❌ التحقق من الاسم:", e); return false; }
    }

    const existing = await getUserPrediction(userName, matchId);
    if (existing) {
        try {
            const { error } = await supabase.from("predictions").update({ prediction, updated_at: new Date().toISOString() }).eq("id", existing.id);
            if (error) throw error;
            saveLocalPrediction(userName, matchId, prediction);
            addSubmittedMatch(matchId);
            localStorage.removeItem("wc_cache_v2_predictions");
            await fetchPredictions();
            return { success: true, updated: true };
        } catch(e) { return { success: false, message: e.message }; }
    } else {
        if (isMatchSubmitted(matchId)) {
            return { success: false, message: `⚠️ توقعت مسبقاً هذه المباراة`, duplicate: true };
        }
        const exists = await isUserNameExists(userName);
        if (exists) {
            const storedUserName = localStorage.getItem('lastUserName') || '';
            if (storedUserName !== userName) {
                return { success: false, message: `⚠️ هذا الاسم "${userName}" مسجل لمستخدم آخر. الرجاء استخدام اسم مختلف أو تأكيد أنك أنت صاحب الاسم.` };
            }
        }
        try {
            const { error } = await supabase.from("predictions").insert([{ user_name: userName, match_id: matchId, prediction }]);
            if (error) throw error;
            saveLocalPrediction(userName, matchId, prediction);
            addSubmittedMatch(matchId);
            localStorage.removeItem("wc_cache_v2_predictions");
            await fetchPredictions();
            return { success: true, updated: false };
        } catch(e) { return { success: false, message: e.message }; }
    }
}

export async function getUserPrediction(userName, matchId) {
    if (!supabase || !userName || !matchId) return null;
    try {
        const { data, error } = await supabase.from("predictions").select("*").eq("user_name", userName).eq("match_id", matchId).order("created_at", { ascending: false }).limit(1);
        if (error) throw error;
        return data && data.length > 0 ? data[0] : null;
    } catch(e) { console.error("❌ جلب توقع المستخدم:", e); return null; }
}