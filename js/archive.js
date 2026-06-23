// ===== MODULE: archive.js =====
import { supabase, fetchPredictions, archivePredictions, deleteAllPredictions, fetchArchive } from './supabase.js';
import { getFlag } from './translations.js';
import { formatDate } from './helpers.js';
import { showCopyToast } from './ui.js';

export async function archiveAllPredictions() {
    const modal = document.getElementById('archiveResultModal');
    const content = document.getElementById('archiveResultContent');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    content.innerHTML = `<div class="empty-state"><span class="icon">⏳</span> جاري الأرشفة...</div>`;

    try {
        const predictions = await fetchPredictions(500);
        if (!predictions || predictions.length === 0) {
            content.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات للأرشفة</div>`;
            return;
        }
        await archivePredictions(predictions);
        await deleteAllPredictions();
        // تحديث التخزين المحلي
        localStorage.removeItem("wc_cache_v2_predictions");
        await fetchPredictions(); // إعادة تحميل فارغ
        content.innerHTML = `<div class="empty-state" style="color:var(--success);"><span class="icon">✅</span> تمت أرشفة ${predictions.length} توقع بنجاح!</div>`;
        showCopyToast(`📦 تمت أرشفة ${predictions.length} توقع`);
        // تحديث واجهة الأرشيف
        renderArchive();
    } catch (e) {
        console.error("❌ فشل الأرشفة:", e);
        content.innerHTML = `<div class="empty-state"><span class="icon">❌</span> فشل الأرشفة: ${e.message}</div>`;
    }
}

export async function renderArchive() {
    const container = document.getElementById('archiveContainer');
    const countSpan = document.getElementById('archiveCount');
    container.innerHTML = `<div class="empty-state"><span class="icon">⏳</span> جاري تحميل الأرشيف...</div>`;
    try {
        const data = await fetchArchive();
        countSpan.textContent = data.length;
        if (!data || data.length === 0) {
            container.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات مؤرشفة</div>`;
            return;
        }
        // عرض التوقعات المؤرشفة (مشابهة لعرض التوقعات العادية)
        let html = '';
        data.slice(0, 30).forEach(p => {
            const parts = p.match_id.split('_');
            const team1 = parts[1] || '?', team2 = parts[2] || '?';
            const predText = p.prediction === 'DRAW' ? 'تعادل' : `فوز ${p.prediction}`;
            html += `
          <div class="prediction-card" style="border-color:rgba(100,100,200,0.2);">
            <div class="user"><div class="avatar-p">${p.user_name ? p.user_name.charAt(0).toUpperCase() : '👤'}</div><span class="name-p">${p.user_name || 'مجهول'}</span></div>
            <div class="prediction-text">${getFlag(team1)} ${team1} 🆚 ${getFlag(team2)} ${team2}</div>
            <div class="prediction-text" style="color:var(--gold-light);">🔮 ${predText}</div>
            <div style="font-size:0.6rem;color:var(--text-secondary);margin-top:4px;">📅 ${p.created_at ? formatDate(p.created_at) : 'تاريخ غير معروف'}</div>
            <div style="font-size:0.6rem;color:var(--text-secondary);">📦 أرشفت: ${p.archived_at ? formatDate(p.archived_at) : 'غير معروف'}</div>
          </div>
        `;
        });
        container.innerHTML = html;
    } catch (e) {
        console.error("❌ تحميل الأرشيف:", e);
        container.innerHTML = `<div class="empty-state"><span class="icon">❌</span> فشل تحميل الأرشيف</div>`;
    }
}