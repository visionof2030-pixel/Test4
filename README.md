<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>أداة إصدار التقارير والشواهد</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
html,body{font-family:'Cairo',sans-serif;background: linear-gradient(135deg, #f0f9f6 0%, #e8f4f0 50%, #d4ebe2 100%);direction:rtl;overflow-x:hidden;min-height:100vh;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
.wrapper{max-width:850px;margin:auto;padding:15px;width:100%;}

/* شريط الأخبار العلوي - محسن للأجهزة المحمولة */
.top-marquee{
position:fixed;top:0;left:0;right:0;width:100%;background:linear-gradient(135deg, #022e22 0%, #044a35 100%);color:#fff;
padding:10px 5px;font-size:12px;z-index:300;overflow:hidden;height:45px;
white-space:nowrap;border-bottom:3px solid #ffd166;box-shadow:0 4px 12px rgba(2, 46, 34, 0.25);
display:flex;align-items:center;
}
.marquee-inner{
display:inline-block;
padding-left:2%;
animation:newsScroll 30s linear infinite;
color:#e8f4f0;font-weight:500;
}
@keyframes newsScroll{
0%{transform:translateX(-100%);}
100%{transform:translateX(100%);}
}
.top-marquee:hover .marquee-inner{animation-play-state:paused;}

/* شريط التحكم العلوي - متجاوب تماماً */
.control-bar{
position:fixed;top:45px;left:0;right:0;width:100%;z-index:250;
background:linear-gradient(135deg, #ffffff 0%, #f5fcf9 100%);
padding:10px 10px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;
box-shadow:0 4px 15px rgba(4, 74, 53, 0.12);border-bottom:2px solid #d0e6de;
backdrop-filter:blur(5px);
gap:8px;
}

.execution-text{
color:#044a35;font-size:13px;font-weight:800;
padding:6px 12px;background:linear-gradient(135deg, #e8f4f0 0%, #d4ebe2 100%);
border-radius:8px;border-right:4px solid #ffd166;
display:flex;align-items:center;gap:8px;
box-shadow:0 3px 8px rgba(6, 109, 77, 0.15);
position:relative;overflow:hidden;
flex-shrink:0;
}
.execution-text::before{
content:'';position:absolute;top:0;right:0;width:100%;height:100%;
background:linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
transform:translateX(-100%);animation:shine 3s infinite;
}
@keyframes shine{100%{transform:translateX(100%);}}
.execution-text i{color:#066d4d;font-size:14px;}

.btn-group{
display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;
}

button.main-btn{
background:linear-gradient(135deg, #066d4d 0%, #05553d 100%);color:#fff;border:none;
padding:10px 12px;font-size:12px;border-radius:10px;cursor:pointer;min-width:auto;
transition:all 0.3s ease;font-weight:600;position:relative;overflow:hidden;
box-shadow:0 4px 10px rgba(6, 109, 77, 0.25);display:flex;flex-direction:column;align-items:center;gap:4px;
border:1px solid rgba(255,255,255,0.1);flex:1 1 auto;max-width:130px;
}
button.main-btn::after{
content:'';position:absolute;top:0;left:0;width:100%;height:100%;
background:linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
transform:translateX(-100%);
}
button.main-btn:hover::after{animation:buttonShine 0.6s;}
@keyframes buttonShine{100%{transform:translateX(100%);}}
button.main-btn:hover{
background:linear-gradient(135deg, #05553d 0%, #044a35 100%);transform:translateY(-3px);
box-shadow:0 6px 15px rgba(6, 109, 77, 0.35);
}
button.main-btn:active{transform:translateY(-1px);}

.btn-icon{font-size:16px;}
.btn-text{font-size:11px;font-weight:700;}

/* زر حفظ بيانات المعلم خاص */
#saveTeacherBtn{background:linear-gradient(135deg, #2a7b5e 0%, #1e6b4f 100%);}
#saveTeacherBtn:hover{background:linear-gradient(135deg, #1e6b4f 0%, #15563f 100%);}

/* زر الدعم الفني */
#supportBtn{background:linear-gradient(135deg, #5a67d8 0%, #4c51bf 100%);}
#supportBtn:hover{background:linear-gradient(135deg, #4c51bf 0%, #434190 100%);}

/* تحسين واجهة الإدخال */
.input-section{
background:#ffffff;padding:20px;border-radius:18px;margin-top:160px;
border:2px solid #e0f0ea;box-shadow:0 8px 25px rgba(4, 74, 53, 0.1);
position:relative;overflow:hidden;
}
.input-section::before{
content:'';position:absolute;top:0;right:0;width:100%;height:4px;
background:linear-gradient(to left, #066d4d, #ffd166);
}

.input-section h2{
color:#044a35;font-size:20px;margin-bottom:25px;padding-bottom:15px;
border-bottom:3px solid #e0f0ea;text-align:center;font-weight:800;
position:relative;
}
.input-section h2::after{
content:'';position:absolute;bottom:-3px;right:0;width:100px;height:3px;
background:linear-gradient(to left, #066d4d, #ffd166);border-radius:2px;
}

.form-group{margin-bottom:20px;}
.form-group label{
font-size:14px;font-weight:700;margin-bottom:8px;display:block;color:#083024;
display:flex;align-items:center;gap:10px;padding-right:8px;
position:relative;
}
.form-group label i{
color:#066d4d;font-size:15px;background:#f0f9f6;padding:6px;border-radius:8px;
border:1px solid #d4ebe2;
}

.form-group label::before{
content:'';width:8px;height:8px;background:#ffd166;border-radius:50%;
display:inline-block;margin-left:6px;box-shadow:0 0 6px #ffd166;
}

input,select,textarea{
width:100%;padding:12px;margin-top:6px;border:2px solid #d4ebe2;border-radius:10px;
font-size:14px;background:#f9fcfb;transition:all 0.3s;font-family:'Cairo', sans-serif;
color:#083024;box-shadow:inset 0 2px 5px rgba(0,0,0,0.05);-webkit-appearance:none;
}
input:focus,select:focus,textarea:focus{
outline:none;border-color:#066d4d;box-shadow:0 0 0 3px rgba(6,109,77,0.15), inset 0 2px 5px rgba(0,0,0,0.05);
background:#ffffff;transform:translateY(-2px);
}
textarea{height:100px;resize:none;overflow:hidden;line-height:1.6;}

.auto-buttons{display:flex;gap:10px;margin-top:10px;}
.auto-btn{
flex:1;padding:10px;background:linear-gradient(135deg, #f0f9f6 0%, #e0f0ea 100%);
border:2px solid #b8d9cd;color:#066d4d;border-radius:10px;font-size:13px;cursor:pointer;
font-weight:700;transition:all 0.3s;display:flex;align-items:center;justify-content:center;gap:8px;
position:relative;overflow:hidden;
}
.auto-btn:hover{
background:linear-gradient(135deg, #e0f0ea 0%, #d0e6de 100%);border-color:#066d4d;
transform:translateY(-2px);box-shadow:0 4px 10px rgba(6, 109, 77, 0.2);
}
.auto-btn:active{transform:translateY(0);}
.auto-btn i{font-size:13px;}

.form-row{
display:grid;grid-template-columns:1fr 1fr;gap:15px;
}

/* تلميحات للأزرار */
button[title] {
position: relative;
}
button[title]:hover::after {
content: attr(title);
position: absolute;
bottom: calc(100% + 10px);
right: 50%;
transform: translateX(50%);
background: rgba(4, 58, 42, 0.95);
color: white;
padding: 8px 12px;
border-radius: 8px;
font-size: 11px;
white-space: nowrap;
z-index: 1000;
border: 1px solid #044a35;
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
max-width:200px;
}
button[title]:hover::before {
content: '';
position: absolute;
bottom: calc(100% + 2px);
right: 50%;
transform: translateX(50%);
border: 6px solid transparent;
border-top-color: rgba(4, 58, 42, 0.95);
z-index: 1000;
}

/* تصميم خاص لأزرار PDF وواتساب */
#pdfBtn{background:linear-gradient(135deg, #d9534f 0%, #c9302c 100%);}
#pdfBtn:hover{background:linear-gradient(135deg, #c9302c 0%, #ac2925 100%);}

#whatsappBtn{background:linear-gradient(135deg, #25D366 0%, #128C7E 100%);}
#whatsappBtn:hover{background:linear-gradient(135deg, #128C7E 0%, #075E54 100%);}

#clearBtn{background:linear-gradient(135deg, #f0ad4e 0%, #ec971f 100%);}
#clearBtn:hover{background:linear-gradient(135deg, #ec971f 0%, #d58512 100%);}

/* إشعارات */
.notification {
position: fixed;
top: 110px;
right: 10px;
left: 10px;
background: linear-gradient(135deg, #066d4d 0%, #044a35 100%);
color: white;
padding: 12px 18px;
border-radius: 10px;
box-shadow: 0 6px 20px rgba(4, 74, 53, 0.3);
z-index: 1000;
display: flex;
align-items: center;
gap: 10px;
font-weight: 600;
transform: translateX(150%);
transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
border-right: 5px solid #ffd166;
text-align:center;
justify-content:center;
}
.notification.show {
transform: translateX(0);
}
.notification i {
font-size: 18px;
}

/* نافذة الدعم الفني */
.support-modal {
display: none;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.7);
z-index: 1001;
justify-content: center;
align-items: center;
padding: 15px;
}

.support-content {
background: white;
border-radius: 15px;
padding: 25px;
width: 100%;
max-width: 500px;
box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
position: relative;
max-height: 90vh;
overflow-y: auto;
}

.support-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
padding-bottom: 15px;
border-bottom: 2px solid #e0f0ea;
}

.support-header h3 {
color: #044a35;
font-size: 20px;
font-weight: 800;
}

.close-support {
background: none;
border: none;
font-size: 24px;
color: #066d4d;
cursor: pointer;
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
transition: all 0.3s;
}

.close-support:hover {
background-color: #e8f4f0;
}

.support-form .form-group {
margin-bottom: 20px;
}

.support-actions {
display: flex;
gap: 15px;
margin-top: 25px;
}

.support-action-btn {
flex: 1;
padding: 14px;
border-radius: 10px;
border: none;
color: white;
font-weight: 700;
font-size: 14px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
transition: all 0.3s;
box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.email-btn {
background: linear-gradient(135deg, #d44646 0%, #b52a2a 100%);
}

.email-btn:hover {
background: linear-gradient(135deg, #b52a2a 0%, #9c1f1f 100%);
transform: translateY(-3px);
}

.whatsapp-support-btn {
background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
}

.whatsapp-support-btn:hover {
background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
transform: translateY(-3px);
}

.support-info {
background: #f8fdfa;
border-radius: 10px;
padding: 15px;
margin-top: 20px;
border-right: 4px solid #ffd166;
}

.support-info p {
margin-bottom: 8px;
font-size: 14px;
color: #044a35;
}

.support-info i {
color: #066d4d;
margin-left: 8px;
}

/* تحسينات للأجهزة المحمولة */
@media (max-width: 768px) {
.control-bar {
top: 45px;
padding: 8px;
flex-direction: column;
gap: 10px;
height: auto;
}

.execution-text {
font-size: 12px;
padding: 5px 10px;
width: 100%;
justify-content: center;
}

.btn-group {
width: 100%;
justify-content: space-between;
gap: 6px;
}

button.main-btn {
padding: 8px 10px;
font-size: 11px;
min-width: 0;
max-width: 100%;
flex: 1 1 calc(50% - 6px);
}

.btn-icon {
font-size: 14px;
}

.btn-text {
font-size: 10px;
}

.input-section {
margin-top: 130px;
padding: 15px;
border-radius: 15px;
}

.input-section h2 {
font-size: 18px;
margin-bottom: 20px;
}

.form-row {
grid-template-columns: 1fr;
gap: 15px;
}

.notification {
top: 100px;
padding: 10px 15px;
font-size: 14px;
}

.support-content {
padding: 20px;
max-height: 85vh;
}

.support-actions {
flex-direction: column;
}

.support-action-btn {
width: 100%;
}
}

@media (max-width: 480px) {
.top-marquee {
font-size: 11px;
padding: 8px 5px;
height: 40px;
}

.marquee-inner {
animation-duration: 35s;
}

button.main-btn {
padding: 7px 8px;
font-size: 10px;
flex: 1 1 calc(50% - 4px);
}

.btn-icon {
font-size: 12px;
}

.btn-text {
font-size: 9px;
}

.input-section {
margin-top: 120px;
padding: 12px;
}

input, select, textarea {
padding: 10px;
font-size: 13px;
}

.form-group label {
font-size: 13px;
}

.form-group label i {
font-size: 13px;
padding: 5px;
}

.auto-btn {
padding: 8px;
font-size: 12px;
}

.support-header h3 {
font-size: 18px;
}

.support-action-btn {
padding: 12px;
font-size: 13px;
}
}

@media (max-width: 320px) {
button.main-btn {
flex: 1 1 100%;
margin-bottom: 4px;
}

.btn-group {
gap: 4px;
}

.input-section {
margin-top: 110px;
}
}

/* iPhone X/XS/11 Pro/12 mini/13 mini - ارتفاع الشاشة */
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
.top-marquee {
padding-top: env(safe-area-inset-top);
height: calc(45px + env(safe-area-inset-top));
}

.control-bar {
top: calc(45px + env(safe-area-inset-top));
}
}

/* iPhone 12/13/14 - ارتفاع الشاشة */
@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
.top-marquee {
padding-top: env(safe-area-inset-top);
height: calc(45px + env(safe-area-inset-top));
}

.control-bar {
top: calc(45px + env(safe-area-inset-top));
}
}

/* iPhone 12/13/14 Pro Max - شاشات كبيرة */
@media only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) {
.top-marquee {
padding-top: env(safe-area-inset-top);
height: calc(45px + env(safe-area-inset-top));
}

.control-bar {
top: calc(45px + env(safe-area-inset-top));
}
}

/* قسم PDF - تم التعديل لضمان ظهوره بشكل صحيح */
#report-content{
width:100%;margin:20px auto;background:#ffffff !important;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}

.header{
background:#083024 !important;padding:8px;min-height:140px;position:relative;color:#fff !important;text-align:center;overflow:hidden;
display:flex;align-items:center;justify-content:center;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}
.header img{width:155px;}

.header-school-title{
position:absolute;bottom:36px;right:8px;font-size:12px;font-weight:600;
color:#ffffff !important;
}
.header-school{
position:absolute;bottom:20px;right:8px;font-size:12px;font-weight:700;
color:#ffffff !important;
}
.header-education{
position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:700;
color:#d7f2ea !important;
}
.header-date-box{
position:absolute;top:6px;left:10px;font-size:11px;text-align:right;line-height:1.3;
color:#ffffff !important;
}

.info-grid{
display:grid;grid-template-columns:repeat(4,1fr);
gap:4px;margin-top:10px;
}
.info-grid2{
display:grid;grid-template-columns:repeat(3,1fr);
gap:4px;margin-bottom:8px;margin-top:10px;
}

.info-box{
background:#e8f2ee !important;border-radius:6px;height:34px;
display:flex;flex-direction:column;justify-content:center;align-items:center;
border:1px solid rgba(6,109,77,0.3) !important;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}
.info-title{
font-size:9px;font-weight:700;color:#083024 !important;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}
.info-value{
font-size:10px;font-weight:700;color:#000000 !important;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}

.objective-box{
background:#f3f9f6 !important;border:1px solid rgba(6,109,77,0.35) !important;
padding:6px 10px;border-radius:8px;margin-bottom:10px;
min-height:120px;max-height:120px;overflow:hidden;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}
.objective-title{
text-align:center;font-size:14px;font-weight:700;
color:#083024 !important;
}
.objective-content{
font-size:13px;line-height:1.6;
color:#000000 !important;
}

.report-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;}
.report-box{
background:#ffffff !important;border-radius:8px;padding:6px;
border:1px solid rgba(6,109,77,0.35) !important;min-height:130px;max-height:130px;overflow:hidden;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}
.report-box-title{
text-align:center;font-size:13px;font-weight:700;
color:#083024 !important;
}
.report-box-content{
font-size:13px;line-height:1.6;
color:#000000 !important;
}

.image-evidence-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.image-box{
min-height:140px;max-height:140px;border:1px dashed #066d4d !important;border-radius:8px;
display:flex;align-items:center;justify-content:center;background:#ffffff !important;
font-size:12px;color:#666 !important;overflow:hidden;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}
.image-box img{max-width:100%;max-height:100%;object-fit:contain;}

.signature-section{margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.signature-box{
text-align:center;font-size:12px;
color:#083024 !important;font-weight:700;
}
.signature-line{
margin-top:6px;border-top:1px solid #083024 !important;width:80%;margin:auto;
}
.footer{
text-align:center;font-size:10px;padding:6px;margin-top:20px;
background:#083024 !important;color:#fff !important;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}

/* لضمان ظهور الألوان في PDF */
.pdf-export * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
}

/* منع التكبير التلقائي على iOS */
input, select, textarea {
font-size: 16px !important;
}
@media screen and (-webkit-min-device-pixel-ratio:0) {
  select,
  textarea,
  input {
    font-size: 16px !important;
  }
}
</style>
</head>

<body>

<div class="top-marquee">
<div class="marquee-inner">
<i class="fas fa-bullhorn" style="margin-left:10px;"></i>
اختر نوع التقرير المطلوب، ثم اضغط زر التعبئة لكل بند ليظهر النص الجاهز، وواصل الضغط لتبديل الصياغة حتى تجد الأنسب. عدّل النصوص عند الحاجة، وأدخل أي تقرير جديد يدوياً إذا لم يكن ضمن القائمة
</div>
</div>

<div class="control-bar">
<div class="execution-text">
<i class="fas fa-user-tie"></i>
تنفيذ : المعلم فهد الخالدي
</div>
<div class="btn-group">
<button class="main-btn" id="saveTeacherBtn" onclick="saveTeacherData()" title="حفظ بيانات إدارة التعليم، اسم المدرسة، الصف، المادة، المستهدفون، المكان">
<i class="fas fa-chalkboard-teacher btn-icon"></i>
<span class="btn-text">حفظ بيانات المعلم</span>
</button>
<button class="main-btn" id="supportBtn" onclick="openSupportModal()" title="الدعم الفني والتواصل مع المطور">
<i class="fas fa-headset btn-icon"></i>
<span class="btn-text">الدعم الفني</span>
</button>
<button class="main-btn" id="clearBtn" onclick="clearData()" title="مسح جميع البيانات المدخلة">
<i class="fas fa-trash-alt btn-icon"></i>
<span class="btn-text">مسح</span>
</button>
<button class="main-btn" id="pdfBtn" onclick="downloadPDF()" title="تحويل التقرير إلى PDF وتنزيله">
<i class="fas fa-file-pdf btn-icon"></i>
<span class="btn-text">تنزيل PDF</span>
</button>
<button class="main-btn" id="whatsappBtn" onclick="sharePDFWhatsApp()" title="مشاركة التقرير عبر واتساب">
<i class="fab fa-whatsapp btn-icon"></i>
<span class="btn-text">مشاركة واتساب</span>
</button>
</div>
</div>

<!-- إشعارات -->
<div class="notification" id="saveNotification">
<i class="fas fa-check-circle"></i>
<span>تم حفظ بيانات المعلم بنجاح!</span>
</div>

<!-- نافذة الدعم الفني -->
<div class="support-modal" id="supportModal">
<div class="support-content">
<div class="support-header">
<h3><i class="fas fa-headset" style="margin-left:10px;"></i>الدعم الفني</h3>
<button class="close-support" onclick="closeSupportModal()">×</button>
</div>

<div class="support-form">
<div class="form-group">
<label for="supportName"><i class="fas fa-user"></i>الاسم الكامل</label>
<input type="text" id="supportName" placeholder="أدخل اسمك الكامل">
</div>

<div class="form-group">
<label for="supportPhone"><i class="fas fa-phone"></i>رقم التواصل</label>
<input type="tel" id="supportPhone" placeholder="أدخل رقم الجوال أو الهاتف">
</div>

<div class="form-group">
<label for="supportIssue"><i class="fas fa-exclamation-circle"></i>تفاصيل المشكلة</label>
<textarea id="supportIssue" rows="4" placeholder="صف مشكلتك بالتفصيل..."></textarea>
</div>

<div class="support-info">
<p><i class="fas fa-envelope"></i>البريد الإلكتروني: iFahadenglish@gmail.com</p>
<p><i class="fab fa-whatsapp"></i>واتساب: +966597077245</p>
</div>

<div class="support-actions">
<button class="support-action-btn email-btn" onclick="sendEmailSupport()">
<i class="fas fa-envelope"></i>مراسلة عبر البريد
</button>
<button class="support-action-btn whatsapp-support-btn" onclick="sendWhatsAppSupport()">
<i class="fab fa-whatsapp"></i>مراسلة عبر واتساب
</button>
</div>
</div>
</div>
</div>

<div class="wrapper">
<div class="input-section">
  
  <h2><i class="fas fa-tools" style="margin-left:10px;"></i>أداة إصدار التقارير التربوية</h2>
  
  <div class="form-group">
    <label><i class="fas fa-university"></i>إدارة التعليم</label>
    <select id="education" oninput="updateReport()">
      <option>الإدارة العامة للتعليم بمنطقة مكة المكرمة</option>
      <option>الإدارة العامة للتعليم بمنطقة الرياض</option>
      <option>الإدارة العامة للتعليم بمنطقة المدينة المنورة</option>
      <option>الإدارة العامة للتعليم بالمنطقة الشرقية</option>
      <option>الإدارة العامة للتعليم بمنطقة القصيم</option>
      <option>الإدارة العامة للتعليم بمنطقة عسير</option>
      <option>الإدارة العامة للتعليم بمنطقة تبوك</option>
      <option>الإدارة العامة للتعليم بمنطقة حائل</option>
      <option>الإدارة العامة للتعليم بمنطقة الحدود الشمالية</option>
      <option>الإدارة العامة للتعليم بمنطقة جازان</option>
      <option>الإدارة العامة للتعليم بمنطقة نجران</option>
      <option>الإدارة العامة للتعليم بمنطقة الباحة</option>
      <option>الإدارة العامة للتعليم بمنطقة الجوف</option>
      <option>الإدارة العامة للتعليم بمحافظة الأحساء</option>
      <option>الإدارة العامة للتعليم بمحافظة الطائف</option>
      <option>الإدارة العامة للتعليم بمحافظة جدة</option>
    </select>
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-school"></i>اسم المدرسة</label>
    <input id="school" value="سعيد بن العاص" placeholder="أدخل اسم المدرسة" oninput="updateReport()">
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-file-alt"></i>اسم التقرير</label>
    <select id="reportType" oninput="handleReportType()">
      <option>تقرير نشاط إثرائي</option>
      <option>تقرير خطة علاجية</option>
      <option>تقرير تكريم المتميزين</option>
      <option>تقرير أنشطة صفية</option>
      <option>تقرير خطة أسبوعية</option>
      <option>تقرير توزيع المنهج</option>
      <option>تقرير حصة النشاط</option>
      <option>تقرير تنفيذ إذاعة مدرسية</option>
      <option>تقرير تبادل الزيارات</option>
      <option>تقرير مجتمعات التعلم</option>
      <option>تقرير تنفيذ درس تطبيقي</option>
      <option>تقرير حضور دورات وورش تدريبية</option>
      <option>تقرير التواصل مع ولي الأمر</option>
      <option>تقرير إشعار ولي الأمر عن مستوى ابنه</option>
      <option>تقرير حضور اجتماع أولياء الأمور</option>
      <option>تقرير تفعيل الخطة الأسبوعية</option>
      <option>تقرير درس تم تنفيذه</option>
      <option>تقرير تعليم تعاوني بين الطلاب</option>
      <option>تقرير تصنيف الطلاب</option>
      <option>تقرير تحفيز الطلاب</option>
      <option>تقرير كشف المتابعة</option>
      <option>تقرير توزيع وقت الحصة</option>
      <option>تقرير تنفيذ اختبار تحسن</option>
      <option>تقرير المشاركات بين الطلاب</option>
      <option>تقرير سجل الخطط العلاجية</option>
      <option>تقرير سجل رعاية الموهوبين</option>
      <option>تقرير تفعيل المنصات التعليمية</option>
      <option>تقرير المجتمعات المهنية</option>
      <option>تقرير الورش التدريبية التي قدمتها</option>
      <option>تقرير الإشراف اليومي</option>
      <option>تقرير الاحتفال باليوم الوطني</option>
      <option>تقرير المبادرات والابتكار</option>
      <option>تقرير حل مشكلة تربوية</option>
      <option>تقرير توظيف الذكاء الاصطناعي</option>
      <option>تقرير الفصول المقلوبة</option>
      <option>تقرير تطوير البيئة الصفية</option>
      <option>تقرير الوسائل التعليمية المبتكرة</option>
      <option>تقرير المناوبة والفسحة</option>
      <option>تقرير سجل التواصل مع أولياء الأمور</option>
      <option>تقرير جرد المختبرات وغرف المصادر</option>
      <option>تقرير إدارة الأزمات</option>
      <option>تقرير نقل أثر التدريب</option>
      <option>تقرير المعلم الصغير</option>
      <option>تقرير إدارة الاجتماعات</option>
      <option>تقرير الاختبارات الذكية</option>
      <option>تقرير المحتوى الرقمي المنتج</option>
      <option>تقرير تعزيز السلوك الإيجابي</option>
      <option>تقرير سجل الدرجات الإلكتروني</option>
      <option>تقرير مقارنة السلاسل الزمنية</option>
      <option>تقرير سجل التغذية الراجعة من الطلاب</option>
      <option>تقرير البحث الإجرائي</option>
      <option>تقرير معرفة الميول والاتجاهات</option>
      <option>تقرير عضوية لجنة التميز والجودة</option>
      <option>تقرير عضوية لجنة التدقيق</option>
      <option>تقرير رعاية الطلاب المتأخرين دراسيًا</option>
      <option>تقرير دراسة حالة</option>
      <option>تقرير تحليل النتائج</option>
      <option>تقرير تفعيل حصص النشاط</option>
      <option>تقرير التدريب على الاختبارات المعيارية</option>
      <option>تقرير مبادرة تطوعية</option>
      <option>تقرير التحليل الاحتياجات التدريبية</option>
      <option>تقرير تصميم الوحدات التعليمية</option>
      <option>تقرير إعداد المواد التعليمية</option>
      <option>تقرير تخطيط المشاريع التعليمية</option>
      <option>تقرير تطوير المناهج الإثرائية</option>
      <option>تقرير إعداد بنك الأسئلة</option>
      <option>تقرير تصميم الأنشطة اللاصفية</option>
      <option>تقرير تخطيط الرحلات التعليمية</option>
      <option>تقرير تحليل نتائج الاختبارات التشخيصية</option>
      <option>تقرير مؤشرات الأداء التعليمي</option>
      <option>تقرير تقييم المخرجات التعليمية</option>
      <option>تقرير قياس الأثر التعليمي</option>
      <option>تقرير تحليل الاختبارات التحصيلية</option>
      <option>تقرير تقييم المشاريع الطلابية</option>
      <option>تقرير تقييم الأداء العملي</option>
      <option>تقرير تقييم المحافظ الإلكترونية</option>
      <option>تقرير المشاركة في المؤتمرات التعليمية</option>
      <option>تقرير حضور الندوات العلمية</option>
      <option>تقرير متابعة الدورات العالمية</option>
      <option>تقرير المشاركة في البحث التربوي</option>
      <option>تقرير التدريب على المناهج الحديثة</option>
      <option>تقرير التطوير المهني المستمر</option>
      <option>تقرير الشراكات المهنية</option>
      <option>تقرير تفعيل الفصول الافتراضية</option>
      <option>تقرير إنتاج المحتوى الرقمي</option>
      <option>تقرير استخدام أنظمة إدارة التعلم</option>
      <option>تقرير التقييم الإلكتروني</option>
      <option>تقرير التعليم المدمج</option>
      <option>تقرير الواقع المعزز في التعليم</option>
      <option>تقرير التعليم عن بعد</option>
      <option>تقرير الألعاب التعليمية الرقمية</option>
      <option>تقرير إدارة الوقت في الصف</option>
      <option>تقرير تنظيم البيئة الصفية</option>
      <option>تقرير إجراءات السلامة في الصف</option>
      <option>تقرير إدارة الموارد التعليمية</option>
      <option>تقرير نظام الحوافز والمكافآت</option>
      <option>تقرير إدارة السلوك الصفي</option>
      <option>تقرير التنويع في التقييم</option>
      <option>تقرير تطبيق التعلم القائم على المشاريع</option>
      <option>تقرير التعلم القائم على حل المشكلات</option>
      <option>تقرير التعلم التعاوني</option>
      <option>تقرير التعلم الذاتي الموجه</option>
      <option>تقرير العروض العملية</option>
      <option>تقرير الزيارات الميدانية</option>
      <option>تقرير الأنشطة التفاعلية</option>
      <option>تقرير برنامج الدعم النفسي</option>
      <option>تقرير الرعاية الصحية في المدرسة</option>
      <option>تقرير دعم الطلاب ذوي الإعاقة</option>
      <option>أخرى</option>
    </select>
    <input id="reportTypeInput" placeholder="أدخل اسم التقرير" oninput="updateReport()" style="display:none;margin-top:8px;">
  </div>
  
  <div class="form-row">
    <div class="form-group">
      <label><i class="fas fa-chalkboard-teacher"></i>صفة المعلّم</label>
      <select id="teacherType" oninput="updateReport()">
        <option selected>المعلم</option>
        <option>المعلمة</option>
      </select>
    </div>
    
    <div class="form-group">
      <label><i class="fas fa-user"></i>اسم المعلّم</label>
      <input id="teacher" value="فهد الخالدي" placeholder="اسم المعلم" oninput="updateReport()">
    </div>
  </div>
  
  <div class="form-row">
    <div class="form-group">
      <label><i class="fas fa-user-tie"></i>صفة المدير</label>
      <select id="principalType" oninput="updateReport()">
        <option selected>المدير</option>
        <option>المديرة</option>
      </select>
    </div>
    
    <div class="form-group">
      <label><i class="fas fa-user-cog"></i>اسم المدير</label>
      <input id="principal" value="نايف اللحياني" placeholder="اسم مدير المدرسة" oninput="updateReport()">
    </div>
  </div>
  
  <div class="form-row">
    <div class="form-group">
      <label><i class="fas fa-users-class"></i>الصف</label>
      <input id="grade" placeholder="مثال: ٥/٣" oninput="updateReport()">
    </div>
    
    <div class="form-group">
      <label><i class="fas fa-calendar-alt"></i>الفصل الدراسي</label>
      <select id="term" oninput="updateReport()">
        <option></option><option>الأول</option><option>الثاني</option>
      </select>
    </div>
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-book"></i>المادة</label>
    <input id="subject" placeholder="مثال: لغتي – علوم – رياضيات" oninput="updateReport()">
  </div>
  
  <div class="form-row">
    <div class="form-group">
      <label><i class="fas fa-bullseye"></i>المستهدفون</label>
      <input id="target" placeholder="مثال: جميع طلاب الصف" oninput="updateReport()">
    </div>
    
    <div class="form-group">
      <label><i class="fas fa-user-check"></i>عدد الحضور</label>
      <input id="count" placeholder="مثال: ٢٥ طالب" oninput="updateReport()">
    </div>
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-map-marker-alt"></i>مكان التنفيذ</label>
    <input id="place" placeholder="مثال: داخل الصف – المختبر" oninput="updateReport()">
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-flag"></i>الهدف التربوي</label>
    <textarea id="goal" placeholder="أدخل الهدف التربوي" oninput="updateReport()"></textarea>
    <div class="auto-buttons"><button class="auto-btn" onclick="autoFill('goal')"><i class="fas fa-magic"></i>تعبئة ذكية</button></div>
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-file-signature"></i>نبذة مختصرة</label>
    <textarea id="summary" placeholder="أدخل نبذة مختصرة" oninput="updateReport()"></textarea>
    <div class="auto-buttons"><button class="auto-btn" onclick="autoFill('summary')"><i class="fas fa-magic"></i>تعبئة ذكية</button></div>
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-tasks"></i>إجراءات التنفيذ</label>
    <textarea id="steps" placeholder="كيف تم تنفيذ النشاط؟" oninput="updateReport()"></textarea>
    <div class="auto-buttons"><button class="auto-btn" onclick="autoFill('steps')"><i class="fas fa-magic"></i>تعبئة ذكية</button></div>
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-chess-board"></i>الاستراتيجيات</label>
    <textarea id="strategies" placeholder="ما هي الاستراتيجيات" oninput="updateReport()"></textarea>
    <div class="auto-buttons"><button class="auto-btn" onclick="autoFill('strategies')"><i class="fas fa-magic"></i>تعبئة ذكية</button></div>
  </div>
  
  <div class="form-row">
    <div class="form-group">
      <label><i class="fas fa-thumbs-up"></i>نقاط القوة</label>
      <textarea id="strengths" placeholder="نقاط القوة" oninput="updateReport()"></textarea>
      <div class="auto-buttons"><button class="auto-btn" onclick="autoFill('strengths')"><i class="fas fa-magic"></i>تعبئة ذكية</button></div>
    </div>
    
    <div class="form-group">
      <label><i class="fas fa-tools"></i>نقاط التحسين</label>
      <textarea id="improve" placeholder="نقاط تحتاج تطوير" oninput="updateReport()"></textarea>
      <div class="auto-buttons"><button class="auto-btn" onclick="autoFill('improve')"><i class="fas fa-magic"></i>تعبئة ذكية</button></div>
    </div>
  </div>
  
  <div class="form-group">
    <label><i class="fas fa-lightbulb"></i>التوصيات</label>
    <textarea id="recomm" placeholder="توصيات مستقبلية" oninput="updateReport()"></textarea>
    <div class="auto-buttons"><button class="auto-btn" onclick="autoFill('recomm')"><i class="fas fa-magic"></i>تعبئة ذكية</button></div>
  </div>
  
  <div class="form-row">
    <div class="form-group">
      <label><i class="fas fa-camera"></i>الصورة 1</label>
      <input type="file" accept="image/*" placeholder="ارفع صورة" onchange="loadImage(this,'imgBox1')">
    </div>
    
    <div class="form-group">
      <label><i class="fas fa-camera"></i>الصورة 2</label>
      <input type="file" accept="image/*" placeholder="ارفع صورة" onchange="loadImage(this,'imgBox2')">
    </div>
  </div>

</div>
</div>

<!-- قسم PDF المعدل -->
<div id="report-content" class="wrapper pdf-export" style="display:none;">

<div class="header">
<img src="https://i.ibb.co/1fc5gB6v/9-C92-E57-B-23-FA-479-D-A024-1-D5-F871-B4-F8-D.png">
<div class="header-school-title">اسم المدرسة</div>
<div class="header-school" id="schoolBox"></div>
<div class="header-education" id="educationBox"></div>
<div class="header-date-box">
<span id="hDate"></span><br>
<span id="gDate"></span>
</div>
</div>

<div class="info-grid">
<div class="info-box"><div class="info-title">الفصل</div><div class="info-value" id="termBox"></div></div>
<div class="info-box"><div class="info-title">الصف</div><div class="info-value" id="gradeBox"></div></div>
<div class="info-box"><div class="info-title">المادة</div><div class="info-value" id="subjectBox"></div></div>
<div class="info-box"><div class="info-title">التقرير</div><div class="info-value" id="reportTypeBox"></div></div>
</div>

<div class="info-grid2">
<div class="info-box"><div class="info-title">المستهدفون</div><div class="info-value" id="targetBox"></div></div>
<div class="info-box"><div class="info-title">العدد</div><div class="info-value" id="countBox"></div></div>
<div class="info-box"><div class="info-title">المكان</div><div class="info-value" id="placeBox"></div></div>
</div>

<div class="objective-box"><div class="objective-title">الهدف التربوي</div><div class="objective-content" id="goalBox"></div></div>

<div class="report-row">
<div class="report-box"><div class="report-box-title">النبذة</div><div class="report-box-content" id="summaryBox"></div></div>
<div class="report-box"><div class="report-box-title">إجراءات التنفيذ</div><div class="report-box-content" id="stepsBox"></div></div>
</div>

<div class="report-row">
<div class="report-box"><div class="report-box-title">الاستراتيجيات</div><div class="report-box-content" id="strategiesBox"></div></div>
<div class="report-box"><div class="report-box-title">نقاط القوة</div><div class="report-box-content" id="strengthsBox"></div></div>
</div>

<div class="report-row">
<div class="report-box"><div class="report-box-title">نقاط التحسين</div><div class="report-box-content" id="improveBox"></div></div>
<div class="report-box"><div class="report-box-title">التوصيات</div><div class="report-box-content" id="recommBox"></div></div>
</div>

<div class="image-evidence-grid">
<div class="image-box" id="imgBox1">صورة توثيقية ١</div>
<div class="image-box" id="imgBox2">صورة توثيقية ٢</div>
</div>

<div class="signature-section">
<div class="signature-box"><div id="teacherTypeBox"></div><span id="teacherBox"></span><div class="signature-line"></div></div>
<div class="signature-box"><div id="principalTypeBox"></div><span id="principalBox"></span><div class="signature-line"></div></div>
</div>

<div class="footer">وزارة التعليم – المملكة العربية السعودية</div>
</div>

<script>
// كائن يحتوي على النصوص الذكية لكل نوع تقرير
const autoTextsByReportType = {
    'تقرير نشاط إثرائي': {
        goal: [
            "تنمية مهارات التفكير وتنشيط الإبداع وتحقيق مشاركة فعالة ودعم التعاون بين الطلاب وتنمية مهارات حل المشكلات وصقل شخصية الطالب.",
            "تحسين قدرات الطلاب في المتابعة الفاعلة أثناء الدروس وتطوير قدرتهم على التعبير وصياغة الأفكار وتعزيز روح العمل التعاوني داخل الصف.",
            "تعزيز مهارات التواصل وبناء الثقة بالقدرات الذاتية لدى الطلاب من خلال أنشطة تعليمية محفزة تمكّنهم من تطبيق ما تعلموه بصورة فعّالة.",
            "تنمية التفكير التحليلي والابتكار لدى الطلاب وتحقيق مستويات عالية من المشاركة عبر استراتيجيات فعّالة تحقق نواتج تعلم قوية.",
            "تطوير مهارات البحث والاستقصاء لدى الطلاب وتهيئتهم لاستخدام مصادر تعلم متنوعة بصورة إيجابية ومستقلّة."
        ],
        summary: [
            "تم تنفيذ النشاط داخل الصف بطريقة تفاعلية بمشاركة جميع الطلاب مما عزز من التعلم التعاوني وساهم في اكتساب مهارات جديدة.",
            "شارك الطلاب بفعالية كبيرة وظهر لديهم اهتمام واضح في تقديم أفكارهم وتطبيق الأنشطة المطلوبة خلال الدرس.",
            "كان النشاط محفزًا للطلاب وساعد في رفع مستوى الفهم لديهم وربط المحتوى التعليمي بالواقع العملي.",
            "أظهر الطلاب تفاعلًا ممتازًا مع خطوات النشاط مما ساعد على تحقيق الأهداف المخطط لها بصورة واضحة.",
            "ساهم النشاط في زيادة الدافعية لدى الطلاب وتعزيز روح المنافسة الإيجابية بينهم داخل الصف."
        ],
        steps: [
            "بدأت الحصة بشرح أهداف النشاط ثم تقسيم الطلاب إلى مجموعات والعمل على تنفيذ المهام مع تقديم الإرشادات اللازمة.",
            "توجيه الطلاب أثناء تنفيذ النشاط وتقديم التغذية الراجعة الفورية لضمان وضوح المهام وتعزيز التعلم الفاعل.",
            "استخدام أساليب متنوعة لإشراك الطلاب ومتابعة تقدمهم داخل المجموعات مع تشجيعهم على تبادل الأفكار.",
            "تقديم الدعم للطلاب أثناء النشاط مع الحرص على مشاركة الجميع في إنجاز المهمة المطلوبة.",
            "اختتام النشاط بنقاش مفتوح حول النتائج ومراجعة أهم ما تم التوصل إليه خلال الدرس."
        ],
        strategies: [
            "استراتيجية التعلم التعاوني لتنمية روح التعاون بين الطلاب وتعزيز العمل الجماعي.",
            "استراتيجية العصف الذهني لتحفيز الإبداع وتدريب الطلاب على تطوير حلول جديدة.",
            "استراتيجية التعلم النشط لجذب انتباه الطلاب وتفعيل مشاركتهم داخل الصف.",
            "المناقشة الصفية لزيادة التفاعل وتحسين مهارات التواصل بين الطلاب.",
            "استخدام الوسائط التعليمية المتنوعة لدعم التعلم وتحقيق فهم أعمق للدرس."
        ],
        strengths: [
            "تفاعل ممتاز من الطلاب أثناء تنفيذ النشاط وظهور مهارات التعاون بوضوح.",
            "مستوى جيد من التنظيم داخل الصف وإدارة فعّالة للوقت خلال النشاط.",
            "اهتمام واضح من الطلاب بتنفيذ التعليمات وتحقيق الهدف التعليمي.",
            "وجود رغبة قوية لدى الطلاب في المشاركة وتبادل الأفكار داخل المجموعات.",
            "تحسن واضح في الفهم لدى أغلب الطلاب وتطبيق فعّال للمحتوى."
        ],
        improve: [
            "زيادة وقت النشاط لضمان مشاركة أكبر لكل الطلاب وتحقيق أفضل النتائج.",
            "الحرص على دعم الطلاب المتعثرين ومنحهم فرصًا إضافية للمشاركة وتحسين مستوياتهم.",
            "التوسع في استخدام الأنشطة التطبيقية لرفع قدرة الطلاب على توظيف المعرفة.",
            "التدرج في تقديم المهام لتناسب مستويات الطلاب المختلفة بصورة أفضل.",
            "التركيز على تحفيز الطلاب الأقل تفاعلًا ودعمهم بالتوجيه المناسب."
        ],
        recomm: [
            "الاستمرار في تطبيق الأنشطة التفاعلية التي تعزز التعلم النشط داخل الصف.",
            "توظيف الوسائل التقنية بفاعلية أكبر لجذب انتباه الطلاب وتعزيز مشاركتهم.",
            "العمل على تطوير استراتيجيات جديدة ومتنوعة تلائم قدرات جميع الطلاب.",
            "تحفيز الطلاب على البحث والاستكشاف في محتوى الدروس المستقبلية.",
            "التركيز على تعزيز الثقة لدى الطلاب وتشجيع المبادرات التعليمية."
        ]
    },
    'تقرير خطة علاجية': {
        goal: [
            "معالجة الضعف الدراسي لدى الطلاب المتأخرين ورفع مستواهم التحصيلي من خلال برامج علاجية مكثفة ومتخصصة تتناسب مع احتياجاتهم.",
            "تحسين مهارات الطلاب الأساسية في القراءة والكتابة والحساب عبر أنشطة علاجية فردية وجماعية تستهدف نقاط الضعف المحددة.",
            "بناء الثقة النفسية لدى الطلاب المتأخرين دراسياً وتشجيعهم على المشاركة الفاعلة في العملية التعليمية وتحسين دافعيتهم للتعلم.",
            "تحديد الفجوات التعليمية لدى الطلاب وتصميم خطط علاجية فردية تعالج نقاط الضعف وتطور نقاط القوة لدى كل طالب على حدة.",
            "تعزيز المهارات الأساسية للطلاب المتأخرين وتمكينهم من اللحاق بزملائهم من خلال برامج دعم وعلاج ممنهجة ومتابعة مستمرة."
        ],
        summary: [
            "تم تطبيق خطة علاجية لعدد من الطلاب المتأخرين دراسياً باستخدام أنشطة متنوعة تركز على المهارات الأساسية.",
            "شارك الطلاب في جلسات علاجية فردية وجماعية ساعدت في تحسين مستواهم الدراسي بشكل ملحوظ.",
            "شهدت الخطة العلاجية تفاعلاً جيداً من الطلاب مع تحسن في أدائهم الدراسي وزيادة في ثقتهم بأنفسهم.",
            "تم تنفيذ أنشطة علاجية مكثفة ساهمت في سد الفجوات التعليمية لدى الطلاب المتأخرين دراسياً.",
            "أظهر الطلاب تحسناً كبيراً في المهارات الأساسية بعد تطبيق الخطة العلاجية المخصصة لهم."
        ],
        steps: [
            "تحديد الطلاب المتأخرين دراسياً وتحليل نقاط ضعفهم من خلال الاختبارات التشخيصية والملاحظة الصفية.",
            "تصميم أنشطة علاجية فردية وجماعية تناسب مستوى كل طالب واحتياجاته التعليمية الخاصة.",
            "تنفيذ جلسات علاجية منتظمة مع متابعة تقدم الطلاب وتقييم أدائهم بشكل دوري.",
            "استخدام وسائل تعليمية مساعدة وألعاب تعليمية لجعل الجلسات العلاجية أكثر جاذبية وفعالية.",
            "تسجيل ملاحظات عن تقدم كل طالب وتعديل الخطة العلاجية حسب الحاجة لضمان تحقيق الأهداف."
        ],
        strategies: [
            "التعليم التفريقي لتلبية احتياجات الطلاب المختلفة وفق قدراتهم ومستوياتهم.",
            "التعلم التعاوني بين الطلاب لتعزيز الثقة وتبادل الخبرات بينهم.",
            "استخدام الوسائل البصرية والسمعية لتسهيل فهم المفاهيم الصعبة.",
            "التكرار والتدرج في تقديم المهارات لضمان استيعابها بشكل كامل.",
            "التغذية الراجعة الفورية لتصحيح الأخطاء وتعزيز الإجابات الصحيحة."
        ],
        strengths: [
            "التزام الطلاب بالحضور والمشاركة في الجلسات العلاجية بنشاط واهتمام.",
            "تحسن ملحوظ في مهارات القراءة والكتابة لدى معظم الطلاب المستهدفين.",
            "تفاعل إيجابي من أولياء الأمور مع الخطة العلاجية ومتابعتهم لأبنائهم.",
            "تنوع الأنشطة العلاجية مما ساهم في استمرار دافعية الطلاب للتعلم.",
            "ملاحظة زيادة الثقة بالنفس لدى الطلاب وتحسن اتجاهاتهم نحو المادة."
        ],
        improve: [
            "زيادة وقت الجلسات العلاجية لضمان تحقيق نتائج أفضل للطلاب.",
            "توفير المزيد من الوسائل التعليمية المساعدة لتطوير الخطة العلاجية.",
            "زيادة التنسيق مع أولياء الأمور لمتابعة الطلاب خارج المدرسة.",
            "تنويع أساليب التقويم لقياس التقدم بدقة أكبر.",
            "تخصيص وقت أكبر للطلاب الذين يعانون من صعوبات تعلم شديدة."
        ],
        recomm: [
            "الاستمرار في تطبيق الخطط العلاجية للطلاب المتأخرين دراسياً.",
            "تطوير بنك أنشطة علاجية متنوعة لمواجهة الصعوبات المختلفة.",
            "تدريب المعلمين على استراتيجيات التعامل مع الطلاب المتأخرين.",
            "تعزيز الشراكة مع أولياء الأمور لتحقيق نتائج مستدامة.",
            "تخصيص ميزانية للمواد التعليمية الداعمة للخطط العلاجية."
        ]
    },
    'تقرير تكريم المتميزين': {
        goal: [
            "تحفيز الطلاب المتميزين وتكريمهم لجهودهم وتفوقهم الدراسي مما يعزز روح التنافس الإيجابي ويشجع الآخرين على التحسين.",
            "تعزيز الثقة بالنفس لدى الطلاب المتفوقين وتقدير جهودهم المتميزة لتحفيزهم على الاستمرار في التفوق والإبداع.",
            "تشجيع ثقافة التميز والإنجاز بين الطلاب من خلال تكريم المتفوقين وتقديمهم كنماذج يحتذى بها في المدرسة.",
            "تعزيز الانتماء للمدرسة وتحفيز جميع الطلاب على بذل الجهد للتفوق من خلال تكريم زملائهم المتميزين.",
            "بناء بيئة مدرسية محفزة ترعى المواهب وتشجع التفوق الدراسي والسلوكي من خلال برامج التكريم والتشجيع."
        ],
        summary: [
            "تم تكريم مجموعة من الطلاب المتميزين في الحفل المدرسي تقديراً لتفوقهم الدراسي وسلوكهم المثالي.",
            "شهد الحفل تكريم الطلاب المتفوقين بحضور أولياء الأمور والهيئة التعليمية مما كان له أثر إيجابي كبير.",
            "تم تنظيم حفل تكريم للطلاب المتميزين الذين حققوا نتائج متميزة في الاختبارات والفعاليات المدرسية.",
            "شارك في الحفل طلاب متميزون في مختلف المجالات الدراسية والأنشطة اللاصفية.",
            "شكل حفل التكريم دفعة معنوية قوية للطلاب المتفوقين وحافزاً لزملائهم للوصول إلى التميز."
        ],
        steps: [
            "تحديد معايير التميز والتفوق الدراسي والسلوكي لاختيار الطلاب المكرمين.",
            "اختيار الطلاب المتفوقين بناءً على نتائجهم الدراسية وسلوكهم وإنجازاتهم المختلفة.",
            "تحضير الحفل وتجهيز الشهادات والهدايا التكريمية للطلاب المتميزين.",
            "دعوة أولياء أمور الطلاب المكرمين للمشاركة في حفل التكريم.",
            "تنظيم الحفل وتقديم الكلمات التكريمية وتسليم الشهادات والهدايا للطلاب."
        ],
        strategies: [
            "التكريم العلني للطلاب المتفوقين لتعزيز ثقتهم بنفسهم وتحفيز الآخرين.",
            "التنويع في أساليب التكريم ليشمل المجالات الدراسية والأنشطة المختلفة.",
            "إشراك أولياء الأمور في حفل التكريم لتعزيز الشراكة مع الأسرة.",
            "توثيق حفل التكريم بالصور والفيديوهات لنشر ثقافة التميز.",
            "ربط التكريم بمعايير واضحة ومعلنة للطلاب لتحقيق العدالة والشفافية."
        ],
        strengths: [
            "تفاعل كبير من الطلاب المكرمين وأولياء أمورهم مع حفل التكريم.",
            "تنظيم ممتاز للحفل وحضور لافت من جميع أطراف المجتمع المدرسي.",
            "تنوع معايير التكريم ليشمل الجوانب الدراسية والسلوكية والإبداعية.",
            "أثر إيجابي واضح على دافعية الطلاب للتفوق والتميز في المستقبل.",
            "نجاح الحفل في تحقيق أهدافه التربوية والتشجيعية للطلاب."
        ],
        improve: [
            "توسيع دائرة التكريم ليشمل المزيد من الطلاب في المرات القادمة.",
            "زيادة الميزانية المخصصة للهدايا التكريمية لتكون أكثر جاذبية.",
            "تضمين فعاليات وأنشطة ترفيهية أكثر تنوعاً خلال حفل التكريم.",
            "تطوير معايير التكريم لتشمل مجالات إبداعية جديدة ومتنوعة.",
            "تحسين عملية التواصل مع أولياء الأمور ودعوتهم للمشاركة."
        ],
        recomm: [
            "الاستمرار في تنظيم حفلات التكريم بشكل دوري كل فصل دراسي.",
            "تطوير نظام حوافز ومكافآت متنوعة للطلاب المتميزين.",
            "إنشاء لوحة شرف دائمة لأسماء الطلاب المتفوقين في المدرسة.",
            "تعميم فكرة التكريم على المستوى الصفي ليشمل جميع الطلاب.",
            "توثيق أفضل الممارسات في التكريم ونشرها بين المدارس الأخرى."
        ]
    },
    'تقرير أنشطة صفية': {
        goal: [
            "تنمية المهارات العلمية والعملية لدى الطلاب من خلال أنشطة صفية تفاعلية تربط بين النظرية والتطبيق في بيئة تعليمية جاذبة.",
            "تعزيز الفهم العميق للمفاهيم الدراسية عبر أنشطة تطبيقية صفية تشجع الاكتشاف والتجربة والمشاركة الفاعلة للطلاب.",
            "تحسين مهارات التواصل والتعاون بين الطلاب من خلال أنشطة صفية جماعية تعزز العمل المشترك وتبادل الأفكار والخبرات.",
            "تنمية التفكير الناقد والإبداعي لدى الطلاب عبر أنشطة صفية تحفز التساؤل والاستقصاء وحل المشكلات بطرق مبتكرة.",
            "ربط المنهج الدراسي بالحياة العملية من خلال أنشطة صفية تطبيقية تجعل التعلم أكثر واقعية ومرتبطاً بتجارب الطلاب اليومية."
        ],
        summary: [
            "تم تنفيذ أنشطة صفية متنوعة في حصص المادة ساهمت في زيادة تفاعل الطلاب مع المحتوى الدراسي.",
            "شهدت الحصص تطبيق أنشطة عملية جماعية وفردية عززت فهم الطلاب للمفاهيم العلمية.",
            "تفاعل الطلاب بشكل إيجابي مع الأنشطة الصفية مما ساهم في تحقيق الأهداف التعليمية المخطط لها.",
            "تم تنفيذ أنشطة تعليمية مبتكرة داخل الصف ساعدت على تكوين بيئة تعليمية نشطة ومحفزة.",
            "أظهر الطلاب حماساً كبيراً للمشاركة في الأنشطة الصفية التي ربطت بين الجانب النظري والعملي."
        ],
        steps: [
            "تخطيط الأنشطة الصفية المناسبة لأهداف الدرس ومستوى الطلاب.",
            "تجهيز الأدوات والمواد اللازمة لتنفيذ الأنشطة داخل الصف.",
            "تقسيم الطلاب إلى مجموعات وتوضيح التعليمات والأدوار لكل مجموعة.",
            "متابعة تنفيذ الطلاب للأنشطة وتقديم التوجيه والدعم عند الحاجة.",
            "مناقشة نتائج الأنشطة مع الطلاب وتلخيص أهم النقاط المستفادة."
        ],
        strategies: [
            "التعلم النشط القائم على المشاركة الفاعلة للطالب في العملية التعليمية.",
            "التعلم التعاوني من خلال العمل في مجموعات صغيرة لتحقيق هدف مشترك.",
            "استراتيجية الاكتشاف الموجه لتنمية مهارات الاستقصاء والبحث.",
            "التعلم بالمشاريع الصغيرة لربط المعرفة بالتطبيق العملي.",
            "استخدام الوسائل التعليمية المتنوعة لدعم الأنشطة الصفية."
        ],
        strengths: [
            "تفاعل الطلاب الكبير مع الأنشطة الصفية ومشاركتهم الفاعلة فيها.",
            "تنوع الأنشطة مما ساهم في استمرار انتباه واهتمام الطلاب.",
            "تحسن ملحوظ في فهم المفاهيم الصعبة بعد تطبيق الأنشطة العملية.",
            "تنظيم جيد للوقت خلال الحصة مما سمح بتنفيذ جميع الأنشطة المخطط لها.",
            "ملاحظة زيادة دافعية الطلاب للتعلم وتحسن أدائهم الدراسي."
        ],
        improve: [
            "زيادة الوقت المخصص للأنشطة الصفية لتحقيق نتائج أفضل.",
            "توفير المزيد من الوسائل والأدوات التعليمية الداعمة للأنشطة.",
            "تدريب الطلاب على العمل الجماعي ومهارات التواصل بشكل أفضل.",
            "تطوير أنشطة تتناسب مع الفروق الفردية بين الطلاب.",
            "تحسين التخطيط المسبق للأنشطة لضمان تنفيذها بسلاسة."
        ],
        recomm: [
            "الاستمرار في تطبيق الأنشطة الصفية التفاعلية في جميع الدروس.",
            "تطوير بنك أنشطة صفية متنوعة لجميع وحدات المنهج الدراسي.",
            "تدريب المعلمين على تصميم وتنفيذ الأنشطة الصفية الفعالة.",
            "تخصيص جزء من الميزانية لدعم الأنشطة الصفية بالمستلزمات.",
            "توثيق التجارب الناجحة في الأنشطة الصفية ونشرها بين المعلمين."
        ]
    },
    
  "تقرير خطة أسبوعية": {
    "goal": [
      "تنظيم خطة أسبوعية فعالة تعزز تقدم الطلاب الأكاديمي وتحقق أهداف تعلم متدرجة تدعم تنمية المهارات المختلفة وتحسن الاستيعاب.",
      "تحقيق تكامل بين الدروس خلال الأسبوع مع ربط خبرات الطلاب التعليمية وتقديم تعلم منظم يجمع بين التطبيق والمراجعة والتحسين المستمر.",
      "رفع جودة العملية التعليمية عبر تخطيط أسبوعي يضمن وضوح الأهداف وتحقيق مشاركة فعالة وتقدم حقيقي في مهارات الطلاب التحصيلية.",
      "دعم استيعاب الطلاب للمحتوى بتوزيع متوازن للدروس أسبوعياً يمنع تراكم المهام ويحسن قدرة الطلاب على التعلم دون ضغط كبير.",
      "تطبيق خطة أسبوعية مرنة تراعي الفروق الفردية وتقدم فرصاً متنوعة للتعلم مما يعزز الفهم ويزيد فاعلية المشاركة داخل الصف."
    ],
    "summary": [
      "تنفيذ خطة أسبوعية متوازنة تلبي احتياج الطلاب. تعزيز الفاعلية وتحسين الأداء خلال جميع الدروس.",
      "خطة أسبوعية منظمة تسهم في رفع الفهم. متابعة مستمرة لتحقيق أهداف تعلم دقيقة.",
      "تنفيذ الدروس وفق جدول مخطط مسبقاً. وتحقيق مشاركة فاعلة داخل بيئة صف محفزة.",
      "تنظيم المحتوى الدراسي بما يناسب قدرات الطلاب. متابعة النتائج وتحفيز التقدم التعليمي.",
      "إدارة زمنية ممتازة للدروس والمهمات. تحسين التعلم وزيادة استيعاب المفاهيم."
    ],
    "steps": [
      "تحديد أهداف الأسبوع وتوزيع الدروس. متابعة الدافعية وتقديم التغذية الراجعة.",
      "تنظيم المهام ومراقبة مشاركات الطلاب. تحسين الأداء عبر دعم مستمر يومياً.",
      "إعداد خطة تفصيلية تناسب جميع المستويات. وتحديثها عند الحاجة باستمرار.",
      "تطبيق أنشطة مناسبة تعزز الفهم والتفكير. مراجعة مستمرة لقياس تحقيق الأهداف.",
      "تنسيق الدروس بما يتماشى مع الوقت المتاح. معالجة نقاط الضعف فور ظهورها."
    ],
    "strategies": [
      "تنويع أساليب التعلم مع تفاعل نشط. تعزيز التعاون بين الطلاب داخل المجموعات.",
      "استراتيجيات مشاركة تحفز الطلاب دائماً. أنشطة تطبيقية ترفع مستوى التركيز.",
      "دمج التقنية في تنفيذ المهام اليومية. وتحفيز المناقشة بين جميع الطلاب.",
      "تطبيق أسئلة تفكير عليا داخل الدروس. وتمكين الطلاب من البحث والاستنتاج.",
      "توظيف تعلم تشاركي يعزز مهارات تواصل. واستخدام أمثلة واقعية لربط المحتوى."
    ],
    "strengths": [
      "تنفيذ منظم يشجع الطلاب على التعلم. وارتفاع ملحوظ في مستويات المشاركة دائماً.",
      "تحسن فهم المفاهيم لدى الطلاب جميعاً. إدارة صفية فعالة تحقق الأهداف المخططة.",
      "وضوح التوجيهات يساعد بتحسين النتائج. واستجابة سريعة من الطلاب للمهام.",
      "تفاعل جماعي متميز أثناء تنفيذ الدروس. ثقة متزايدة بتنفيذ الأنشطة التعليمية.",
      "تقليل الفاقد بتطبيق خطة أسبوعية. تعزيز الاستيعاب ومحافظة على تركيز الطلاب."
    ],
    "improve": [
      "زيادة الوسائل المتنوعة لتحفيز الطلاب. وتقديم دعم أكبر للمتعثرين مباشرة.",
      "تنظيم أنشطة إضافية ترفع دافعية الطلاب. وتخصيص وقت أطول لتطبيق المحتوى.",
      "تنويع الممارسات الصفية التي تعالج الفروق. والتركيز على مهارات التفكير العليا.",
      "تطوير المتابعة الفردية للطلاب باستمرار. ورفع مستوى المراجعين الأقل تقدماً.",
      "تعزيز التدريب الذاتي خارج وقت الدراسة. وزيادة متابعة تنفيذ الخطة أسبوعياً."
    ],
    "recomm": [
      "الاستمرار بتطبيق خطة تعليم أسبوعية. توظيف التقنية لدعم تعلم أكثر فعالية.",
      "زيادة التعاون بين الطلاب باستخدام أنشطة. ونشر ثقافة التعلم الذاتي دائماً.",
      "تحديث الخطة بناء على التغذية الراجعة. وتطوير طرق التطبيق باستمرار دائم.",
      "تخصيص وقت إضافي للمراجعة الدورية. ودعم التعلم في البيئات غير الصفية.",
      "تطوير بنك أنشطة متنوعة أسبوعياً. وتحسين التواصل مع الأسرة للمتابعة."
    ]
  },

  "تقرير توزيع المنهج": {
    "goal": [
      "تنظيم تقديم المنهج خلال الفصل بشكل يضمن تسلسل المحتوى، وتحسين فهم الطلاب، وتحقيق نواتج تعلم واضحة تدعم التقدم الدراسي.",
      "تحقيق توزيع زمني عادل لوحدات المنهج بما يناسب قدرات الطلاب، ويضمن الوصول إلى الإتقان مع مراعاة الفروق الفردية باستمرار.",
      "رفع جودة التعليم عبر جدول تدريسي متوازن ينسق بين الشرح والتطبيق والمراجعة ويضمن تقدماً تعلمياً ثابتاً للطلاب.",
      "تعزيز استيعاب الطلاب للمفاهيم من خلال توزيع منطقي يقلل ضغط الدروس ويزيد ثبات المعرفة وتحسن الأداء الدراسي.",
      "إدارة الوقت الدراسي بكفاءة عالية من خلال توزيع وحدات المنهج بترتيب يسهم في الفهم التدريجي المرتبط بنتائج تقييم واضحة."
    ],
    "summary": [
      "تنظيم توزيع المنهج وفق خطة دقيقة. متابعة التحصيل وتدارك أي ضعف سريعاً.",
      "توزيع المحتوى بأيام متوازنة ومستهدفة. رفع الاستيعاب وتحسين مستوى الطلاب.",
      "تحسين سير الدروس داخل الأسابيع المحددة. تحقيق فهم عميق ومتابعة فعّالة دائماً.",
      "إدارة المحتوى لإتاحة فرص تطبيق مستمرة. ضمان سير المنهج دون تأخير ملحوظ.",
      "ترتيب وحدات المنهج يرفع مستوى الفهم. تعزيز ثبات التعلم بصورة متواصلة."
    ],
    "steps": [
      "تحليل وحدات المنهج وتحديد الأولويات. وتقسيم الدروس على الأسابيع بدقة.",
      "متابعة التطبيق وتقييم تقدم الطلاب. وتعديل الجدول عند الحاجة فوراً.",
      "موازنة المهام اليومية بما يناسب قدرات. وتطبيق استراتيجيات تعلم مستمر.",
      "تنسيق المراجعات وفق الخطة الزمنية. وتوفير الوقت لتعزيز المفاهيم الصعبة.",
      "توظيف نشاطات تطبيقية داعمة للمحتوى. ومتابعة أثرها على تحسن الأداء."
    ],
    "strategies": [
      "تنويع طرق الشرح وتحسين التواصل. استخدام مراجعات دورية داعمة للتعلم.",
      "تعلم نشط يعزز مشاركة الطلاب جميعاً. وتوظيف التقنية لرفع التفاعل داخل الصف.",
      "ربط الدروس بخبرات حياتية قريبة. وتحفيز التفكير بالأسئلة المفتوحة والأنشطة.",
      "إدارة فعّالة للوقت داخل الدروس دائماً. وتحقيق إنجاز حقيقي للمحتوى التعليمي.",
      "استراتيجيات تضمن وصول المعلومات للجميع. ومتابعة المخرجات بقياس واضح وصحيح."
    ],
    "strengths": [
      "تسلسل رائع في تقديم موضوعات المنهج. توافق جيد مع قدرات الطلاب الدراسية.",
      "إدارة عملية للدروس تمنع التشتت. ودافعية أفضل لدى الطلاب للتعلم.",
      "زيادة فهم المفاهيم الأساسية للطلاب. وتحسن تدريجي في التحصيل الأكاديمي.",
      "تحقيق تغطية شاملة للمحتوى المطلوب. ومتابعة تقدم مستمرة تحقق الأهداف.",
      "وضوح التوقعات أمام الطلاب دائماً. مما يعزز المشاركة والثقة بالتعلم."
    ],
    "improve": [
      "زيادة الأنشطة التطبيقية ضمن الدروس. وتوفير وقت إضافي للمراجعات الدورية.",
      "تطوير طرق لمعالجة صعوبات التعلم. وإعادة ضبط الخطة عند الحاجة دوماً.",
      "تحفيز الطلاب الأقل أداء عبر دعم. فردي إضافي وبرامج متابعة دقيقة.",
      "زيادة التنسيق بين جميع المعلمين. وتعزيز الشراكة لتحسين النتائج العامة.",
      "رفع مستوى التفاعل داخل الدروس. وتخفيف العبء في بعض الأسابيع المزدحمة."
    ],
    "recomm": [
      "تحديث خطة التوزيع باستمرار دقيق. والاستفادة من التغذية الراجعة المهنية.",
      "تعزيز المراجعة في نهاية كل وحدة. وتحسين آليات قياس مستوى الفهم.",
      "زيادة الأنشطة العملية الداعمة للمحتوى. وتوظيف موارد تعلم إضافية ممتازة.",
      "إشراك الطلاب في تقييم التخطيط. وتنمية مسؤوليتهم عن تعلم مستمر.",
      "التأكيد على تعاون الأسرة بالمتابعة. للمساعدة في تثبيت واستيعاب المحتوى."
    ]
  },

  "تقرير حصة النشاط": {
    "goal": [
      "تعزيز مهارات الإبداع والتعاون من خلال تنفيذ أنشطة تفاعلية داخل الصف تشجع الطلاب على الحوار والعمل الجماعي وتحسين الذات.",
      "تنمية قدرات الطلاب على التفكير الحر والاستقصاء عبر أنشطة تعليمية ممتعة تدعم شخصياتهم وتزيد من قدرتهم على التفاعل.",
      "رفع مستوى المشاركة الفعالة بين الطلاب من خلال أنشطة جماعية تتيح تبادل الآراء وتحقيق أهداف تعلم عملية تطبيقية.",
      "تحسين مهارات الطلاب الاجتماعية عبر تشجيعهم على المشاركة في أنشطة محفزة ترفع الثقة وتدعم التواصل الإيجابي بينهم.",
      "تطوير شخصية الطلاب من خلال مواقف تعليمية تعزز المنافسة الإيجابية وتحسن تعاونهم داخل البيئة الصفية بفاعلية عالية."
    ],
    "summary": [
      "تنفيذ نشاط تعليمي ممتع يعزز التواصل. ويدعم التفاعل الفعّال بين الطلاب دائماً.",
      "نشاط تفاعلي داخل الصف يزيد المشاركة. وينمي مهارات الطلاب بشكل رائع.",
      "أنشطة تعاونية جذابة ترفع الحماس. وتحسن التواصل بين الطلاب بصورة أفضل.",
      "استخدام أنشطة محفزة تدعم التفكير. وزيادة الإبداع داخل البيئة الصفية.",
      "ربط نشاطات ممتعة بالمحتوى الدراسي. وتحسين فهم الطلاب بطرق جديدة."
    ],
    "steps": [
      "تحديد الهدف من النشاط بدقة مناسبة. تقسيم الطلاب لمجموعات بمهمات واضحة.",
      "شرح خطوات النشاط للطلاب بوضوح جيد. متابعة الأداء وتقديم دعم فوري.",
      "إتاحة فرص مشاركة لجميع الأفراد دوماً. وتبادل منظم للأفكار بداخل الصف.",
      "مراقبة تقدم كل مجموعة باستمرار دائم. تحفيز الطلاب لتحقيق أهداف النشاط.",
      "ختام النشاط بنقاش لتبادل الخبرات. تقييم الإنجاز وتحسين الأداء لاحقاً."
    ],
    "strategies": [
      "التعلم النشط لتحسين مشاركة الطلاب. عصف ذهني يدعم توليد أفكار مبتكرة.",
      "استخدام التعلم التعاوني باستمرار داخل الصف. وتحسين العمل الجماعي بفاعلية.",
      "أنشطة بحث واستكشاف تنمي التفكير. تطوير المهارات بطرق تطبيقية ممتعة.",
      "تعلم قائم على المشاريع الصغيرة دائماً. تحفيز الطلاب لإيجاد حلول للمشكلات.",
      "استراتيجيات تواصل فعالة تدعم الحوار. استخدام تقنيات تعليم تزيد التفاعل."
    ],
    "strengths": [
      "مشاركة عالية من أغلب الطلاب دائماً. تعاون مشجع داخل مجموعات التعلم.",
      "تحسن واضح في مهارات التفكير لديهم. تفاعل ممتاز مع محتوى النشاط.",
      "جو تعليمي محفز يدعم الإبداع. تنظيم رائع لإدارة وقت النشاط.",
      "أداء جماعي مميز يظهر قدرات جديدة. مساهمة واضحة في تطوير المهارات.",
      "زيادة دافعية الطلاب لتجربة المزيد. وانسجام كبير أثناء العمل المشترك."
    ],
    "improve": [
      "زيادة الوقت المخصص للنشاط دائماً. دعم أكبر للطلاب الأقل مشاركة.",
      "تعزيز توظيف الوسائل التعليمية الحديثة. وتدريب الطلاب على التعاون.",
      "تنويع المهام لتناسب جميع القدرات. وتوجيه إضافي للمجموعات المتعثرة.",
      "توسيع الأنشطة التطبيقية داخل الصف. تحسين متابعة تقدم كل طالب.",
      "التدرج بشكل أفضل في صعوبة النشاط. ضمان مشاركة فعّالة من الجميع."
    ],
    "recomm": [
      "الاستمرار باستخدام الأنشطة التفاعلية المميزة. وتوظيف التقنية في التعلم دائماً.",
      "زيادة الأنشطة التطبيقية في الدروس المقبلة. وتحفيز الطلاب على الإبداع أكثر.",
      "مشاركة الطلاب في تصميم الأنشطة المقبلة. وبناء ثقة أكبر بقدراتهم التعليمية.",
      "تطوير فعاليات متنوعة تعزز التعاون المستمر. وتدعم المهارات الاجتماعية للطلاب.",
      "تحسين التنسيق بين المعلم والمجموعات دائماً. وضمان تعلم ممتع داخل الصف."
    ]
  },

  "تقرير تنفيذ إذاعة مدرسية": {
    "goal": [
      "تنمية مهارات الإلقاء وتعزيز الثقة بالنفس من خلال مشاركة الطلاب في الإذاعة المدرسية وتقديم محتوى هادف يرسخ القيم الإيجابية.",
      "تحسين التواصل اللغوي لدى الطلاب عبر فقرات إذاعية متنوعة تعزز الجرأة في الحديث وتنمّي قدراتهم الأدائية والإبداعية داخل المدرسة.",
      "دعم بناء الشخصية الطلابية عبر مشاركات إذاعية محفزة تقوي العلاقات الاجتماعية وتزيد الوعي بالقضايا التربوية والثقافية المهمة.",
      "تفعيل دور الطلاب الإعلامي بتمكينهم من إعداد وتقديم برامج إذاعية تساهم في نشر المعرفة وغرس السلوك الإيجابي بالمدرسة.",
      "تطوير روح القيادة لدى الطلاب من خلال تحمّل مسؤولية تنفيذ البرنامج الإذاعي ورفع مستوى المشاركة التربوية الهادفة."
    ],
    "summary": [
      "تنفيذ إذاعة مدرسية مميزة تزيد التفاعل. مشاركة طلابية رائعة في تقديم فقرات مفيدة.",
      "برنامج إذاعي متكامل يرفع الحماس. محتوى هادف يساهم بنشر قيم إيجابية.",
      "إلقاء متميز من الطلاب المشاركين. حضور جيد وتفاعل ملحوظ منذ البداية.",
      "تنظيم رائع لفقرات البرنامج بالكامل. وانضباط واضح أثناء تقديم الإذاعة.",
      "تنوع الفقرات يمنح الطلاب فرصة. لإظهار مواهبهم التعليمية والإبداعية."
    ],
    "steps": [
      "اختيار موضوع إذاعي يناسب الطلاب. إعداد فقرات تقدم محتوى تربوياً هادفاً.",
      "تدريب الطلاب على أساليب الإلقاء. متابعة وضبط الأداء قبل التنفيذ.",
      "تنظيم البرنامج وفق تسلسل مناسب. توزيع الأدوار ودعم المشاركين دائماً.",
      "تنفيذ الإذاعة أمام الجمهور الصباحي. تعزيز الثقة وتشجيع الجرأة بالكلام.",
      "تقديم تغذية راجعة لتحسين الأداء. وتطوير مهارات المشاركين مستقبلاً."
    ],
    "strategies": [
      "توظيف مهارات الإلقاء والتقديم الشفهي. فقرات مؤثرة تجذب انتباه الحضور.",
      "التعاون بين الطلاب أثناء التدريب. دعم القدرات وتبادل الخبرات الإذاعية.",
      "استخدام مؤثرات صوتية ملائمة للعرض. تعزيز القوة التعبيرية داخل الفقرات.",
      "تعلم قائم على الأداء العملي دائماً. تعزيز الثقة من خلال الممارسة الفعلية.",
      "تنويع الفقرات لزيادة الحماس الطلابي. إشراك أكبر عدد من المشاركين الجدد."
    ],
    "strengths": [
      "تحسن كبير بمهارات الإلقاء الشفهي. وجرأة واضحة لدى الطلاب المشاركين.",
      "التزام الحضور بمتابعة الفقرات كاملة. تفاعل ممتاز مع محتوى الإذاعة.",
      "تنظيم رائع للوقت أثناء التنفيذ. وتجانس مستمر بين جميع الفقرات.",
      "قدرة الطلاب على الإبداع والتأثير. تقديم متميز للرسالة التربوية المقررة.",
      "تحقيق أهداف البرنامج الإذاعي بالكامل. وزيادة الوعي بالقيم المدرسية."
    ],
    "improve": [
      "زيادة عدد المتحدثين بالفقرات المقبلة. وتدريبهم على تحسين الأداء المستمر.",
      "تنويع الموضوعات المطروحة يومياً. مع متابعة مردودها على الطلاب.",
      "استثمار التقنية لإنشاء فقرات مرئية. وتحفيز الطلاب على الإبداع دائماً.",
      "توفير مساحة مشاركة أكبر للجمهور. وتعزيز النقاش بعد البرنامج مباشرة.",
      "إضافة تقييم رقمي لأداء المشاركين. وقياس الأثر التربوي بوضوح."
    ],
    "recomm": [
      "استمرار تنفيذ إذاعات يومية هادفة. لتوسيع مشاركة الطلاب في المدرسة.",
      "تنمية مهارات التقديم لجميع الطلاب. وتشجيعهم عبر تحفيزات مناسبة دائماً.",
      "تطوير محتوى يركز على السلوكيات. ويسهم في نشر القيم الإيجابية داخل المدرسة.",
      "تنظيم مسابقات خاصة بالإلقاء الإذاعي. واكتشاف مواهب جديدة متميزة.",
      "توثيق أفضل الفقرات وعرضها لاحقاً. لتحفيز الطلاب على إنتاج محتوى هادف."
    ]
  },

  "تقرير تبادل الزيارات": {
    "goal": [
      "تحسين جودة التعليم من خلال تبادل الخبرات الصفية بين المعلمين مما يعزز تطوير الممارسات التدريسية ورفع مستوى أداء الطلاب التعليمي.",
      "دعم النمو المهني للمعلمين بزيارات منظمة تهدف لتحليل الدروس وملاحظة الاستراتيجيات وتبادل الخبرات الميدانية الناجحة.",
      "تحقيق شراكة تربوية مستمرة عبر زيارات مهنية تعزز التعاون بين المعلمين وتسهم بتحسين الأداء داخل البيئة التعليمية.",
      "رفع مستوى الوعي بأساليب التدريس الحديثة من خلال حضور دروس متنوعة وتطبيق أفضل الممارسات داخل الفصول.",
      "توظيف التغذية الراجعة البنّاءة لتطوير الأداء التدريسي مما يضمن جودة أعلى في التعلم ومخرجات أفضل للطلاب."
    ],
    "summary": [
      "زيارة صفية مهنية تهدف لتبادل خبرات. استفادة واضحة للمعلمين المشاركين.",
      "تحليل لممارسات التدريس المطبقة فعلاً. وتطوير نقاط التحسين بشكل مباشر.",
      "تنفيذ زيارة مفيدة تزيد التواصل. وتحقق فائدة أكاديمية للجميع دائماً.",
      "مشاركة معرفية جيدة بين الزملاء. تعزيز التعاون ورفع الأداء تدريجياً.",
      "زيارات تربوية منهجية مستمرة. تضمن تحسناً في طرق التدريس."
    ],
    "steps": [
      "تحديد أهداف الزيارة ومجالات الملاحظة. حضور الدرس وتوثيق الملاحظات.",
      "تحليل الأداء التدريسي بعناية مستمرة. تقديم تغذية راجعة بناءة للمعلم.",
      "متابعة تطبيق التوصيات داخل الصف. تقييم النتائج بعد فترة محددة.",
      "تعزيز تبادل الخبرات والممارسات. وتشجيع التعاون بين الزملاء دائماً.",
      "بناء خطة تطويرية تفصيلية لاحقاً. وضمان تحقيق أثر إيجابي مستمر."
    ],
    "strategies": [
      "إدارة نقاش مفتوح بعد الزيارة مباشرة. تحليل أداء المعلم وتحسينه.",
      "مقارنة الاستراتيجيات وفق معايير واضحة. اختيار المناسب للفصل المدرسي.",
      "تبادل أفضل الممارسات التربوية دائماً. تعزيز مهارات المعلم التعليمية.",
      "جلسات تدريب مشتركة بعد الزيارة. دعم التطوير داخل البيئة المدرسية.",
      "توظيف نتائج التحليل لتطوير الدروس. ومتابعة الأداء بشكل مستمر."
    ],
    "strengths": [
      "تعاون كبير بين أعضاء الهيئة التدريسية. مشاركة فعالة داخل الزيارة.",
      "وعي متزايد بأهمية تبادل الخبرات. وتطبيق ممارسات جديدة مباشرة.",
      "تطوير مستمر لاستراتيجيات التدريس. تحسين ملحوظ بمهارات المعلمين.",
      "نتائج إيجابية أبرزها تحسين الطلاب. استجابة ملحوظة داخل الفصل.",
      "زيادة الثقة بين المعلمين دائماً. تنمية مهنية مستدامة وشاملة."
    ],
    "improve": [
      "رفع عدد الزيارات المهنية لاحقاً. وتحسين تنظيم التوقيت دائماً.",
      "توفير متابعة أوضح بعد الزيارة. لتحقق أثر تربوي مستدام مستقبلاً.",
      "إتاحة مشاركة أكبر للمعلمين الجدد. دعم مهني مبكر ومكثف للجميع.",
      "زيادة التنوع بالاستراتيجيات الملاحظة. لضمان رفع الاستفادة بشكل رائع.",
      "توثيق خطط التحسين بفاعلية أعلى. ومشاركة مخرجاتها مع الجميع."
    ],
    "recomm": [
      "الاستمرار بزيارات مهنية منظمة فعالة. ودعم نشر الخبرات داخل المدرسة.",
      "تشجيع الزيارات المتبادلة بين مدارس. لرفع جودة التعليم في المنطقة.",
      "إعداد برامج تطوير مستمرة للمعلمين. تواكب أحدث استراتيجيات التدريس.",
      "تخصيص وقت كافٍ للمتابعة الفعلية. وتحقيق نتائج ملموسة للطلاب.",
      "تنظيم ورش تفاعلية بعد الزيارات. لتسريع تطوير المهارات التدريسية."
    ]
  },

  "تقرير مجتمعات التعلم": {
    "goal": [
      "تعزيز التعاون المهني بين المعلمين من خلال مجتمعات تعلم تسهم في تطوير الخطط التعليمية وتحسين جودة التدريس ورفع مستوى الطلاب بشكل مستمر.",
      "بناء ثقافة مهنية قائمة على تبادل الخبرات ومناقشة التحديات وتطوير أساليب التعليم وتحسين المخرجات الصفية.",
      "تفعيل مجتمعات تعلم مستدامة تركز على تحسين الأداء التدريسي وتطوير الخطط بما يتناسب مع احتياجات الطلاب التعليمية.",
      "توفير بيئة مهنية داعمة تسمح للمعلمين بتحسين الأداء ومشاركة التجارب الناجحة ورفع مستوى الكفاءة التعليمية.",
      "تعزيز التعلم المستمر بين المعلمين من خلال اجتماعات تربوية تعزز التعاون وتدعم تقدم الطلاب في جميع الجوانب."
    ],
    "summary": [
      "اجتماع مهني لتبادل خبرات تطويرية. تحسين الأداء داخل العملية التعليمية.",
      "تعلم تعاوني مهني مستمر وفعّال. دعم خطط التدريس ومتابعة الطلاب.",
      "جلسات نقاش تربوية ذات أثر إيجابي. تعزيز العمل الجماعي داخل المدرسة.",
      "تواصل تربوي يحسن خطط تعليمية. مشاركة أفكار لممارسات متميزة.",
      "تنظيم اجتماعات مهنية منتظمة جداً. تحقيق تطوير دائم للمعلمين."
    ],
    "steps": [
      "تحديد أهداف الاجتماع بوضوح جيد. مناقشة خطط تعليم تعزز التفاعل.",
      "عرض تجارب ناجحة من الميدان. تحليل أثرها على تعلم الطلاب.",
      "تبادل حلول لمشكلات موجودة سابقاً. وتوثيق النقاط المهمة بالكامل.",
      "متابعة تطبيق التوصيات عملياً دوماً. تقييم أثرها أثناء تنفيذ الدروس.",
      "إعداد تقارير مهنية بعد اللقاء. وتحديث الخطط وفق مجريات العمل."
    ],
    "strategies": [
      "مجموعات نقاش ترفع جودة التعليم. مشاركة أفكار وتحليل تجارب ناجحة.",
      "استراتيجيات تطوير عبر تعاون مستمر. تحسين الأداء بشكل تدريجي دائماً.",
      "تطبيق ممارسات فعالة داخل الصف. نقل الخبرات بين الزملاء باستمرار.",
      "تدريب مهني يعتمد على المشاركة. رفع كفاءة المعلمين بشكل ممتاز.",
      "توظيف تغذية راجعة دقيقة مباشرة. وتحسين نتائج الطلاب باستمرار."
    ],
    "strengths": [
      "تفاعل إيجابي بين المعلمين دائماً. دعم كبير لتطوير الاستراتيجيات.",
      "أفكار تربوية جديدة متبادلة. وحرص واضح على تحسين التعلم.",
      "تنظيم ممتاز للاجتماعات المهنية. مشاركة نشطة من الجميع.",
      "تحقيق نتائج إيجابية سريعة. تحسن ملحوظ لدى الطلاب.",
      "زيادة الثقة داخل الفريق التربوي. تعاون كبير يعزز التطوير."
    ],
    "improve": [
      "إضافة ممارسات تطبيقية مستمرة دائماً. متابعة النتائج في كل فصل.",
      "تنويع موضوعات اللقاءات المهنية. لتلبية احتياجات متنوعة فعلياً.",
      "توفير وقت أطول للنقاش التحليلي. لتحقيق أكبر قدر من الفائدة.",
      "جمع بيانات حول أثر الاجتماعات. تقييم تقدم أداء التدريس مستمر.",
      "التوسع بمشاركة مدرسين جدد دائماً. دعم المبتدئين مهنياً بقوة."
    ],
    "recomm": [
      "الاستمرار في تفعيل مجتمعات تعلم. ودعم تبادل الخبرات الناجحة دائماً.",
      "تنظيم ورش عمل تطويرية بانتظام. تعزيز الإنتاجية داخل المدرسة.",
      "توظيف التقنية لإدارة الاجتماعات. وتوثيق مخرجاتها فورياً.",
      "تطوير نماذج تقييم لكل لقاء. لضمان تحقيق أفضل النتائج.",
      "تعزيز روح الفريق بين الأعضاء. وتقدير المساهمات الفعالة للجميع."
    ]
  },
  
  "تقرير تنفيذ درس تطبيقي": {
    "goal": [
      "تطبيق استراتيجيات تدريس حديثة أمام الزملاء لدعم الخبرات المهنية وتحسين جودة التعليم ورفع مستوى التفاعل داخل الصف لتحقيق تعلم فعّال.",
      "تحسين قدرة المعلمين على تبادل الممارسات الناجحة من خلال عرض دروس تطبيقية تعزز الاحترافية وتحسن مخرجات الطلاب التعليمية.",
      "توسيع المعرفة المهنية لدى المعلمين عبر دروس تجريبية تبرز أساليب التدريس الحديثة وتزيد المشاركة الفعلية للطلاب بالصف.",
      "تحفيز المعلمين على الابتكار في التدريس من خلال دروس تطبيقية تركز على التعلم النشط وتطوير مهارات التفكير لدى الطلبة.",
      "توثيق ممارسات تدريسية فعالة عبر تنفيذ دروس تطبيقية منظمة ترفع من جودة الفهم ودافعية الطلاب نحو التعلم المستمر."
    ],
    "summary": [
      "درس تطبيقي يعزز فهم الطلاب دائماً. مشاركة فاعلة تمنحهم الثقة داخل الصف.",
      "تنفيذ درس تجريبي بطرائق متعددة. استراتيجيات فعالة ترفع التفاعل جيداً.",
      "تجربة تطبيقية متميزة تزيد الدافعية. وتحقق نتائج إيجابية داخل القاعة.",
      "عرض درس يركز على نشاط الطلاب. إدارة صفية مميزة طوال التنفيذ.",
      "تنظيم رائع للدرس التطبيقي اليوم. واستجابة متقدمة من الطلاب."
    ],
    "steps": [
      "تخطيط للدرس باستراتيجيات متقدمة. إعداد وسائل تحقق أهداف التطبيق.",
      "توضيح الأهداف أمام الطلاب جيداً. تقديم محتوى بطرق تعليم تفاعلية.",
      "توزيع أنشطة تعزز مهارات التفكير. تطوير خبرات التعلم عبر النقاش.",
      "مراقبة الأداء أثناء تنفيذ الدرس. وتقديم دعم مستمر متواصل للجميع.",
      "تقييم نتائج التعلم بعد النشاط. تعديل أساليب مقترحة للتحسين."
    ],
    "strategies": [
      "تعلم نشط يدعم فاعلية المشاركة. توظيف أنشطة تطبيقية متنوعة دائماً.",
      "مجموعات عمل تنمي مهارات الطلاب. تواصل مستمر داخل بيئة صفية.",
      "استقصاء وأسئلة تحفز العقل. تعزيز قدرات التفكير العليا فوراً.",
      "التعلم عبر المشاريع الصغيرة الهادفة. ربط محتوى الدرس بالواقع عملياً.",
      "استخدام التقنية داخل الحصة لديها. رفع استيعاب الطلاب بشكل أكبر."
    ],
    "strengths": [
      "ارتفاع مستوى الحماس لدى الطلاب. تفاعل ممتاز أثناء النشاطات كلياً.",
      "إدارة وقت متوازنة تماماً للدرس. تحقيق أهداف تطبيقية واضحة جيداً.",
      "إبداع كبير لدى الطلاب الجادين. أفكار مبتكرة تعرض باستمرار رائع.",
      "تجاوب سريع مع الأسئلة المتقدمة. ثقة ممتازة بالقدرات التعليمية.",
      "تنظيم رائع لأدوار الطلاب دائماً. مشاركة عادلة وجهود قوية."
    ],
    "improve": [
      "زيادة أنشطة تساعد المتأخرين. تقديم دعم إضافي أثناء الحصة.",
      "تنويع أكبر في الوسائل المعينة. رفع جودة العروض التعليمية جداً.",
      "وقت أكثر لمناقشة التحديات. تطوير فهم أعمق للموضوع.",
      "زيادة فرص العمل التعاوني أكثر. تشجيع المشاركة دون تردد.",
      "تحسين متابعة مستويات الطلاب. وتقويم مستمر داخل الدرس."
    ],
    "recomm": [
      "تطبيق دروس تنفيذية متكررة جيداً. تعميم الممارسات التي تنجح كثيراً.",
      "تشجيع الزملاء على الحضور دوماً. مشاركة خبرات ميدانية قيّمة جداً.",
      "إضافة تقييم يحدد نقاط القوة. تطوير خطة تخص تحسين بعض الجوانب.",
      "تحسين استخدام التقنية بالتدريس. دعم تطور تطبيق أدوات التعلم.",
      "تشجيع إبداع الطلاب باستمرار. تحفيز قدراتهم على التفكير دوماً."
    ]
  },

  "تقرير حضور دورات وورش تدريبية": {
    "goal": [
      "تطوير مهارات المعلم المهنية من خلال دورات تدريبية تعزز قدرته على توظيف أساليب تعليم حديثة وتحسين أدائه بما يرفع جودة التعلم.",
      "دعم التطوير الذاتي المستمر لدى المعلمين عبر برامج تدريبية تساعد في تحسين الاستراتيجيات وتحقيق نتائج إيجابية بالصف.",
      "رفع كفاءة عملية التدريس من خلال حضور ورش متنوعة تزيد المعرفة وتوسع خبرات المعلم الميدانية والتقنية.",
      "تعزيز النمو المهني للمعلمين بتطبيق مكتسبات التدريب داخل الصف وتحسين ممارساتهم التعليمية بصورة مستمرة.",
      "تمكين المعلمين من استخدام طرق مبتكرة عبر ورش تدريبية تعالج تحديات التدريس وترفع مستوى التحفيز لدى الطلاب."
    ],
    "summary": [
      "تدريب مهني تطويري يزيد جودة التعليم. اكتساب خبرات تدعم التدريس فعلياً.",
      "ورشة تدريبية ترفع المهارات التدريسية. تحفيز أكبر للتعلم المستمر واقعياً.",
      "برامج تدريبية تطور قدرات المعلم. تحسين واضح في العمليات التعليمية.",
      "تدريب مفيد يعزز الإبداع التدريسي دائماً. دعم قوي للممارسات الصفية.",
      "ورشة متقدمة تقوي الأداء داخل الصف. استراتيجيات حديثة قابلة للتطبيق."
    ],
    "steps": [
      "التسجيل المسبق وحضور التدريب. توثيق الأهداف لتطبيقها جيداً لاحقاً.",
      "مناقشة مفاهيم مهمة أثناء التدريب. وتحويلها لأساليب تعليم فاعلة فعلاً.",
      "تطبيق أفكار جديدة داخل الصف. تحليل أثرها وتحسينها مستقبلاً.",
      "المشاركة بنشاط في جميع الفقرات. تبادل تجارب عملية مع الزملاء.",
      "متابعة توصيات التدريب بالتطبيق. والبحث عن فرص تطوير إضافية."
    ],
    "strategies": [
      "توظيف التعلم التعاوني ضمن التدريب. رفع مهارات التواصل بين الحضور.",
      "ورش تطبيقية تعزز مهارات التدريس. مشاركة أفكار وتجارب حقيقية.",
      "تعلم يعتمد على حل المشكلات دوماً. توجيه ميداني يعزز الفائدة.",
      "استخدام تقنيات حديثة بالتدريب. دعم التحول الرقمي في التدريس.",
      "تنفيذ أنشطة متقدمة مستمرة. رفع جودة الخبرات المهنية فعلاً."
    ],
    "strengths": [
      "زيادة وعي المعلم بطرق التدريس. تحسن فعلي بالأداء داخل الصف.",
      "تحفيز العمل الجماعي للتطوير. مشاركة نشطة بكثير من الجلسات.",
      "استفادة واضحة من محتوى التدريب. انتقال فعلي للممارسات الناجحة.",
      "إبداع أكبر في تقديم الدروس. واستخدام أساليب تدريس حديثة.",
      "ارتفاع الثقة بقدرات المعلم دائماً. تقدم ملحوظ على نتائج الطلاب."
    ],
    "improve": [
      "تكثيف التدريب التخصصي المتقدم. ومتابعة أثره بالميدان فعلياً.",
      "إضافة ورش تطبيقية أكثر تفصيلاً. تعميق فهم التقنيات التعليمية.",
      "تقوية الربط بين التدريب والصف. دعم مستمر لقياس الأثر الحاصل.",
      "تنويع محتوى الورش التدريبية. لتغطية جميع المهارات التعليمية.",
      "تسريع تطبيق التقنيات الحديثة. متابعة مستويات الأداء دائماً."
    ],
    "recomm": [
      "المشاركة المستمرة في دورات تدريبية. دعم التحسين الوظيفي للمعلمين.",
      "نشر الخبرات المكتسبة لزملاء دائمين. مشاركة تطبيقات أثناء الدروس.",
      "تعزيز مهارات التفكير ببرامج تدريبية. رفع مستوى التخطيط الممتاز.",
      "تنظيم ورش تخصصية داخل المدرسة. تحسين الممارسات التعليمية جداً.",
      "استخدام تقييم أثر التدريب بدقة. تطوير مستمر للتنفيذ المباشر."
    ]
  },

  "تقرير التواصل مع ولي الأمر": {
    "goal": [
      "تعزيز التعاون بين المدرسة والأسرة عبر تواصل فعال يساعد في تحسين أداء الطالب الأكاديمي والسلوكي ويضمن دعماً تربوياً مستداماً.",
      "مشاركة ولي الأمر في معرفة مستوى ابنه التعليمي والسلوكي وتحفيزه على تقديم الدعم اللازم لتحسين النتائج.",
      "ضمان متابعة مستمرة للطالب وتعزيز دوره في العملية التعليمية من خلال تواصل منظم يحقق نتائج ملموسة في المستوى.",
      "تمكين ولي الأمر من فهم احتياجات ابنه الدراسية والسلوكية لاتخاذ خطوات مساندة تعزز تحسين مستواه وتطوير مهاراته.",
      "تحقيق شراكة تعليمية إيجابية بين المدرسة والأسرة تعزز دافعية الطالب وتدعم التقدم والتحصيل بشكل مستمر."
    ],
    "summary": [
      "تواصل هادف لشرح مستوى الطالب. دعم الأسرة يعزز التحسن الدراسي.",
      "اجتماع تربوي يوضح قدرات الطالب. حلول مشتركة لتحسين الأداء.",
      "جهود تواصل تدعم الطالب أكاديمياً. تعزيز الاهتمام داخل المنزل.",
      "محادثة بناءة مع ولي الأمر. رفع الوعي التعليمي بشكل مناسب.",
      "تبادل معلومات تساعد الطالب بالنجاح. متابعة أسرية تحقق نتائج."
    ],
    "steps": [
      "تحديد موعد للقاء ولي الأمر. مناقشة أداء الطالب بشكل مهني.",
      "عرض تقارير تبين مستوى الطالب. وتقديم نصائح تحسين مباشرة.",
      "شرح نقاط القوة في شخصية الطالب. وتحديد احتياجات تطوير فورية.",
      "وضع خطة متفق عليها مع الأسرة. متابعة تنفيذها أسبوعياً جيداً.",
      "الاتصال بانتظام لتقديم تحديثات. تعزيز التعاون لاستمرار التقدم."
    ],
    "strategies": [
      "استماع جيد لملاحظات ولي الأمر. تبادل آراء تدعم الطالب فعلياً.",
      "تواصل شفهي ورسمي منظم دائماً. تقارير متابعة تبين مستوى الطالب.",
      "تشجيع مشاركة الطالب بالمنزل. وترسيخ عادات علمية منتظمة.",
      "توعية الأسرة بطرق دعم مناسبة. تقوية التعاون التربوي للجميع.",
      "تقديم حلول تعليمية فعالة فعلاً. وقياس نتائجها كل أسبوع."
    ],
    "strengths": [
      "استجابة ممتازة من ولي الأمر. اهتمام واضح بمتابعة الابن.",
      "تحسن تدريجي بمستوى الطالب. تعاون كبير بين الأسرة والمدرسة.",
      "اندماج الطالب في أنشطته أكثر. ثقة أكبر أثناء التعلم دائماً.",
      "تعاون جيد يعزز المسؤولية. ويقوي السلوك الإيجابي يومياً.",
      "نتائج متابعة أدت لتحسن أكاديمي. دعم واضح لاستمرار الإنجاز."
    ],
    "improve": [
      "زيادة التواصل مع الأسرة مستقبلاً. وتكثيف المتابعة لكل طالب.",
      "تحسين التوجيه المنزلي المستمر. توفير وسائل دعم تربوية جديدة.",
      "زيادة المعلومات حول الضعف بالطالب. متابعة تقدم الأداء أسبوعياً.",
      "تخصيص وقت أطول للنقاش مفيد. وتحفيز الأسرة للمشاركة أكثر.",
      "تشجيع ولي الأمر للمراجعة أكثر. دعم الطالب بتدريبات مساندة."
    ],
    "recomm": [
      "تنشيط التواصل باستمرار ضروري. وتوحيد الجهود لتحسين المستوى.",
      "دعوة الأسرة لحضور اجتماعات مهمة. وتحسين الدعم التربوي دائماً.",
      "حماية التقدم بتحفيز متواصل جداً. والمتابعة الجادة لكل المهام.",
      "تشجيع الطالب على الالتزام دوماً. ودعم التعلم المستمر بالمنزل.",
      "اتباع خطط تطوير مشتركة تماماً. وقياس أثرها لتحقيق إنجاز."
    ]
  },

  "تقرير إشعار ولي الأمر عن مستوى ابنه": {
    "goal": [
      "إبلاغ ولي الأمر بمستوى ابنه التحصيلي والسلوكي لاتخاذ إجراءات داعمة تساعد في تحسين الأداء وتعزيز نقاط القوة التعليمية.",
      "رفع وعي الأسرة بمتطلبات نجاح الطالب وتقديم معلومات دقيقة تسهم في تحسين مشاركته داخل المدرسة.",
      "تعزيز التواصل بين المدرسة والمنزل لتحديد الجوانب التي تحتاج إلى تحسين وبناء خطة مشتركة لدعم الطالب مستقبلاً.",
      "تمكين الأسرة من تتبع تطور الطالب أكاديمياً وسلوكياً بشكل مستمر لتحقيق نتائج مرضية في التحصيل الدراسي.",
      "توفير إشعار رسمي يوضح مستوى الطالب الحالي ويدعم اتخاذ خطوات عملية لتحسين الأداء ورفع الدافعية التعليمية."
    ],
    "summary": [
      "إشعار رسمي يوضح مستوى الطالب. يساعد الأسرة على دعم التحسين.",
      "تواصل مكتوب يعزز التعاون الأسري. متابعة دقيقة لمستوى الابن.",
      "تنبيه مبكر عن الضعف الموجود. دعم الطالب بشكل فعال لاحقاً.",
      "تقرير يوضح نقاط القوة لديه. وتوصيات مناسبة لتحسين الأداء.",
      "معلومات أكاديمية مهمة للأسرة. تحفيز للطالب لمستوى أفضل."
    ],
    "steps": [
      "إصدار إشعار يبين مستوى الطالب. تسليم نسخة لولي الأمر مباشرة.",
      "شرح تفاصيل الأداء للطالب والأسرة. تحديد احتياجات تحسين واقعية.",
      "اقتراح طرق دعم تعليم مستهدف. متابعة المستجدات أسبوعياً أكيداً.",
      "توفير تغذية راجعة بعد الاختبارات. تطوير الأداء عبر خطوات عملية.",
      "جلسة متابعة عند الحاجة لاحقاً. تحديد تقدم الطالب بشكل دوري."
    ],
    "strategies": [
      "إشراك الأسرة بدعم الطالب. مراقبة دورية للأداء المدرسي دائماً.",
      "تقديم خطة علاجية بسيطة واضحة. متابعة التطبيق على مدار أسبوع.",
      "تشجيع مراجعة الدروس بلا توقف. رفع الدافعية بالمكافآت المناسبة.",
      "تعاون بين المدرسة والأسرة فعلياً. بناء ثقة أكبر بالتحسن دائماً.",
      "تحليل نتائج الاختبارات أولاً. تحسين نقاط الضعف بما يناسب."
    ],
    "strengths": [
      "زيادة اهتمام الأسرة بتحسن الابن. متابعة منتظمة لأداء الطالب.",
      "تحسن تدريجي في واجباته الصفية. اندماجه مع زملائه أكثر دائماً.",
      "وضوح دور الأسرة في التطوير. تحسن إيجابي بمستوى الحضور.",
      "تحمل الطالب مسؤولية أكبر فعلاً. وارتفاع جودة التكليفات الدراسية.",
      "استجابة الأبناء للمتابعة واضحة. نتائج إيجابية بالتحصيل مميزاً."
    ],
    "improve": [
      "زيادة التدريب المنزلي للطالب جيداً. وتعزيز القراءة والكتابة فعلاً.",
      "مراجعة الدروس بشكل مستمر جداً. متابعة الأسرة أسبوعياً بانتظام.",
      "زيادة النصائح للطالب دائماً. توفير وقت أطول للمراجعة.",
      "تكثيف الجلسات المساندة لاحقاً. متابعة التحسن سريعاً تفيد الطالب.",
      "تحسين وقت الطالب بالمنزل. والحد من الملهيات نهائياً."
    ],
    "recomm": [
      "الاستمرار بمتابعة تقدم الابن. وتحفيزه عند كل إنجاز جيد.",
      "زيادة التعاون بين الأسرة والمدرسة. دعم الطالب في جميع مهامه.",
      "تنمية مهارات الطالب الأساسية دوماً. تقديم خطط دعم بسيطة ومباشرة.",
      "تبني عادات دراسية مفيدة جداً. تحسين مستوى المتابعة الأكاديمية.",
      "رفع وعي الطالب بقدراته فعلاً. تعزيز الدافعية بشكل أكبر."
]
},
  "تقرير حضور اجتماع أولياء الأمور": {
    "goal": [
      "تعزيز التواصل والتعاون بين المدرسة والأسر لتحسين الدعم التربوي والدراسي للطالب وضمان تكامل الأدوار.",
      "توعية أولياء الأمور بالمنهج الدراسي وآليات المتابعة لتحقيق انسجام كامل بين بيئة المنزل والمدرسة.",
      "فتح قنوات حوار بناء حول سلوكيات الطلاب وطرق تعزيز الإيجابية منها ومعالجة التحديات التي قد تواجههم.",
      "تبادل الخبرات التربوية بين المعلمين وأولياء الأمور لصياغة استراتيجيات فعالة تدعم نمو الطالب الشامل.",
      "بناء جسور الثقة والشفافية بين المدرسة والمجتمع المحلي لخلق شراكة حقيقية تدعم العملية التعليمية."
    ],
    "summary": [
      "تم عقد اجتماع دوري ناجح جمع أولياء الأمور مع كادر المدرسة لمناقشة سبل التعاون وتطوير الأداء.",
      "لقاء تواصلي حضره غالبية أولياء الأمور في جو من التفاهم والاتفاق على آليات محددة للمتابعة المشتركة.",
      "جلسة حوارية مفتوحة أتاحت للآباء التعبير عن ملاحظاتهم واستفساراتهم مع تقديم شرح وافٍ عن البرامج الأكاديمية.",
      "اجتماع هادف ركز على مناقشة نتائج الطلاب وسبل رفع تحصيلهم العلمي وخرج بتوصيات عملية قابلة للتطبيق.",
      "فعالية تواصلية مميزة عززت الثقة المتبادلة وكرست مفهوم الشراكة الفعلية في مسيرة تعلم الأبناء وتطورهم."
    ],
    "steps": [
      "إعداد جدول أعمال مفصل وإرسال الدعوات الرسمية قبل موعد الاجتماع مع التأكيد على أهمية الحضور والمشاركة الفعالة.",
      "استقبال أولياء الأمور وتسجيل الحضور وتوزيع حزم تحتوي على أوراق عمل ونماذج تقييم وأبرز نقاط النقاش المخطط لها.",
      "عرض تقديمي مرئي يلخص أداء الفصل والإنجازات والتحديات ثم فتح باب النقاش للاستماع لملاحظات وآراء الحضور.",
      "تقسيم الحضور لمجموعات نقاش مصغرة حسب الصفوف لمناقشة قضايا محددة ثم تجميع التوصيات في جلسة عامة ختامية.",
      "ختام اللقاء بتلخيص النقاط المتفق عليها وتوزيع استبيان تقييم للاجتماع وتحديد موعد المتابعة القادمة بشكل واضح."
    ],
    "strategies": [
      "استخدام العروض التقديمية والإنفوجرافيك لتوضيح البيانات الإحصائية لأداء الطلاب بشكل مرئي وجذاب وسهل الفهم للجميع.",
      "تفعيل جلسات العصف الذهني الجماعي لتوليد أفكار مبتكرة من أولياء الأمور حول حل المشكلات السلوكية أو التعليمية.",
      "تبني أسلوب الحوار المفتوح والاستماع الفعال لاستقبال كافة الملاحظات دون مقاطعة مع توثيقها بدقة وأمانة تامة.",
      "تطبيق استراتيجية دراسة الحالة لعرض نماذج ناجحة لطلاب تحسنت مستوياتهم عبر التعاون بين البيت والمدرسة.",
      "استخدام لغة واضحة وبعيدة عن المصطلحات المعقدة لضمان وصول الرسالة لكافة الحضور باختلاف مستوياتهم التعليمية."
    ],
    "strengths": [
      "معدل حضور مرتفع جداً تجاوز 85% مما يعكس وعي الأهالي الكبير واهتمامهم البالغ بمتابعة شؤون أبنائهم التعليمية.",
      "نقاش هادف وبناء طغت عليه روح المسؤولية والرغبة الصادقة في التعاون من كافة الأطراف دون مواجهات أو لوم.",
      "تنوع وثراء المقترحات المقدمة من أولياء الأمور والتي أظهرت فهماً عميقاً لاحتياجات أبنائهم ورغبة حقيقية في المساعدة.",
      "التزام تام بجدول الأعمال وإدارة وقت فعالة للجلسة مما أتاح تغطية جميع النقاط المخطط لها دون استعجال أو تقصير.",
      "خروج الأهالي بشعور إيجابي واضح وثقة متجددة في إدارة المدرسة ومعلميها مما يعزز البيئة الداعمة للطالب بشكل كبير."
    ],
    "improve": [
      "ضرورة تخصيص وقت أطول للجلسات الفردية السريعة مع معلم الفصل لمناقشة حالة أبناء كل ولي أمر على حدة.",
      "تحسين وسائل الإعلان عن موعد الاجتماع لتشمل منصات التواصل الاجتماعي والتطبيقات الذكية بجانب الخطاب الورقي.",
      "توفير خدمة ترجمة فورية أو نشر مكتوب للمحتوى إذا كان بين الحضور من لا يجيدون اللغة العربية بطلاقة.",
      "إعداد تقرير مختصر ومكتوب عن أداء كل طالب يتم تسليمه لولي أمره شخصياً خلال الاجتماع لمناقشته بشكل مفصل.",
      "تنظيم لقاءات مصغرة متخصصة لأولياء أمور الطلاب الذين يواجهون تحديات متشابهة لبحث حلول جماعية أكثر تركيزاً."
    ],
    "recomm": [
      "الاستمرار في عقد هذه الاجتماعات بشكل دوري كل فصل دراسي مع تنويع أوقاتها لتناسب أكبر عدد من أولياء الأمور.",
      "إنشاء قناة تواصل رسمية دائمة كمجموعة واتساب أو منصة إلكترونية للمتابعة اليومية والرد على الاستفسارات العاجلة.",
      "تفعيل برنامج ولي الأمر الصافي حيث يحضر ولي الأمر حصة دراسية بشكل دوري ليرى أداء ابنه عن كثب.",
      "تنظيم ورش عمل تثقيفية مصاحبة للاجتماعات حول مواضيع تربوية محددة ككيفية مساعدة الأبناء في المذاكرة في المنزل.",
      "إشراك أولياء الأمور المتميزين في لجان استشارية مدرسية لتكون لهم مشاركة فعلية في صنع بعض القرارات التربوية."
    ]
  },

  "تقرير تفعيل الخطة الأسبوعية": {
    "goal": [
      "ضمان سير العملية التعليمية بسلاسة وانتظام من خلال تنفيذ خطة أسبوعية مفصلة تغطي جميع المهارات والأهداف المقررة.",
      "تحقيق التكامل بين الدروس اليومية والأنشطة المصاحبة لضمان وصول الطالب إلى نواتج التعلم المستهدفة بشكل متدرج.",
      "تمكين المعلم من إدارة وقته ومصادره التعليمية بكفاءة عالية من خلال خريطة واضحة المعالم تقلل الارتجالية.",
      "توفير أساس موضوعي لتقييم التقدم اليومي والأسبوعي للطلاب ومطابقته مع المعايير الموضوعة مسبقاً لضمان الجودة.",
      "خلق بيئة تعليمية منظمة ومطمئنة للطالب حيث يتوقع ما سيدرسه ويستعد له مسبقاً مما يزيد دافعيته وتركيزه."
    ],
    "summary": [
      "تم تفعيل الخطة الأسبوعية بنجاح كبير حيث غطيت جميع الحصص المقررة وتم إنجاز الأنشطة التعزيزية والتقويمية المخطط لها.",
      "سارت الأسبوع الدراسي في منتهى الانتظام بفضل الخطة الواضحة التي حددت مسار كل يوم بدقة مما منع أي عشوائية.",
      "حققت الخطة الأسبوعية أهدافها الأساسية في إتمام المنهج المقرر مع مراعاة الفروق الفردية عبر أنشطة علاجية وتوسيعية.",
      "كانت الخطة مرنة بما يكفي لاستيعاب بعض الطوارئ دون الإخلال بالجوهر مما يعكس جودة في التصميم والتنفيذ الكامل.",
      "ساهمت الخطة في خلق انسجام بين معلمي المواد المختلفة مما أدى إلى تجارب تعليمية مترابطة ومثمرة للطلاب جميعاً."
    ],
    "steps": [
      "المراجعة التحليلية للخطة الأسبوعية يوم الأحد صباحاً مع ضبط التوازن بين أجزاء الدرس الواحد من تهيئة وشرح وتطبيق.",
      "تجهيز جميع الوسائل التعليمية والمواد الخام والتقنية اللازمة لتنفيذ كل نشاط مذكور في الخطة قبل موعده بيوم على الأقل.",
      "تنفيذ الحصص اليومية مع المرونة في تعديل وتيرة الشرح حسب استجابة الطلاب مع الالتزام بالأهداف الأساسية للخطة.",
      "التقييم الختامي اليومي السريع لمدى تحقيق أهداف كل حصة وتسجيل الملاحظات حول الصعوبات أو النجاحات غير المتوقعة.",
      "مراجعة نهاية الأسبوع الشاملة للخطة وتحليل نقاط القوة والضعف في التنفيذ كمدخلات لتطوير خطط الأسابيع القادمة."
    ],
    "strategies": [
      "استخدام استراتيجية التخطيط بالمعكوس حيث يتم البدء من نواتج التعلم المستهدفة نهاية الأسبوع ثم تصميم الأنشطة المؤدية لها.",
      "دمج تقنية الجدول الزمني المرن الذي يحتوي على أنشطة أساسية ملزمة وأنشطة احتياطية يمكن استخدامها حسب تقدم الفصل.",
      "تفعيل أسلوب محطات التعلم داخل الفصل حيث تتنقل المجموعات بين أنشطة مختلفة كل منها يمثل جزءاً من الخطة الأسبوعية.",
      "اعتماد التخطيط التعاوني بين معلمي المادة الواحدة حيث يتم تنسيق الخطة الأسبوعية لتبادل الموارد والأفكار المتميزة.",
      "استخدام أدوات رقمية للتخطيط مثل تطبيقات تريلو أو تقويم جوجل لمشاركة الخطة مع الطلاب وأولياء الأمور ومتابعة التنفيذ."
    ],
    "strengths": [
      "التزام تام من قبل المعلم والطلاب بمسار الخطة مما خلق شعوراً بالانضباط والإنجاز اليومي المحسوس والمرضي للجميع.",
      "تنوع الأنشطة المضمنة في الخطة بين نظرية وتطبيقية وفردية وجماعية مما حافظ على حماس الطلاب وقطع طريق الملل.",
      "المرونة الذكية في الخطة التي سمحت بإدراج نشاط تثقيفي عاجل عن مناسبة وطنية دون التأثير على تقدم المنهج الأصلي.",
      "وضوح الخطة وسهولة الوصول إليها من قبل المعلم والطلاب عن طريق عرضها على الحائط مما سهل عملية التوجيه والمتابعة.",
      "تحقيق كافة المؤشرات الكمية كإنجاز عدد الدروس والنوعية كتحسن في نتائج التقييمات القصيرة المطلوبة في الخطة."
    ],
    "improve": [
      "ضرورة تخصيص وقت مكتوب في الخطة لأنشطة المراجعة والتدريب التراكمي للمهارات السابقة وليس فقط التركيز على الجديد.",
      "تحسين التوازن في توزيع الواجبات المنزلية على أيام الأسبوع لتجنب تراكمها على الطالب في يوم واحد أو يوم العطلة.",
      "إدراج مؤشرات أداء قابلة للقياس بشكل أسبوعي لكل طالب لتتبع تقدمه الفردي بشكل ملموس وموضوعي بجانب الأهداف العامة.",
      "تضمين الخطة أنشطة بديلة مسبقة التصميم للطلاب سريعي الإنجاز لضمان استمرار تحديقهم وفعاليتهم طوال الوقت المخصص.",
      "تعميق التكامل الرأسي لربط الخطة الأسبوعية بما سبقها وما يليها لضمان تسلسل منطقي في بناء المعرفة لدى الطالب."
    ],
    "recomm": [
      "الاستمرار في إعداد الخطة الأسبوعية كعمل مؤسسي جماعي يشرف عليه رئيس القسم لضمان التوحيد والجودة بين الفصول.",
      "عقد جلسة قصيرة كل صباح يوم أحد مع الطلاب لعرض خلاصة بصرية للخطة الأسبوعية وأهدافها لزيادة التملك والمسؤولية.",
      "ربط الخطة الأسبوعية بنظام المكافآت الصفية حيث يحصل الفصل على مكافأة جماعية إذا تم تحقيق جميع أهداف الأسبوع بنجاح.",
      "توثيق نماذج من الخطط الأسبوعية الناجحة في أرشيف المدرسة لتكون مرجعاً يستفيد منه المعلمون الجدد أو عند الحاجة.",
      "تطوير قالب رقمي موحد للخطة الأسبوعية يسهل تعبئته ويتضمن أقساماً للتقييم الذاتي للمعلم وملاحظات الطلاب عليها."
    ]
  },

  "تقرير درس تم تنفيذه": {
    "goal": [
      "إكساب الطلاب مفهوماً علمياً أو مهارة عملية جديدة محددة من خلال سلسلة من الأنشطة المنظمة التي تحفز التفكير والاكتشاف.",
      "تنمية قدرة الطلاب على ربط المعرفة الجديدة بمعارفهم السابقة وتطبيقها في مواقف حياتية أو أكاديمية قريبة من واقعهم.",
      "تعزيز الاتجاهات الإيجابية والقيم المتعلقة بمحتوى الدرس مثل دقة الملاحظة في العلوم أو احترام الرأي الآخر في الأدب.",
      "تطوير المهارات العليا للتفكير كالتحليل والتركيب والتقويم لدى الطلاب من خلال التحديات والمشكلات المطروحة خلال الدرس.",
      "بناء ثقة الطالب بنفسه كمتعلـم قادر على الفهم والتطبيق من خلال توفير تجربة تعليمية ناجحة ومشبعة للإنجاز داخل الحصة."
    ],
    "summary": [
      "تم تنفيذ درس التمثيل الضوئي للصف السادس باستخدام تجارب حية وعروض محاكاة رقمية مما جعله تجربة شيقة لا تنسى.",
      "حقق درس القيم الأدبية في شعر المتنبي أهدافه في تحليل النص واستخلاص القيم مع تفاعل أدبي مميز من الطلاب.",
      "نفذ درس العمليات الحسابية على الكسور بشكل عملي تطبيقي باستخدام أدوات ملموسة مما سهل استيعاب المفهوم المجرد.",
      "كان درس عن حقوق المستهلك ناجحاً في ربط المنهج بالحياة حيث قام الطلاب بتحليل فواتير حقيقية ونقاش قضايا شرائية.",
      "تم تقديم درس في التربية الفنية حول المنظور بطرق مبتكرة خلقت إبداعات فنية مدهشة وأظهرت مواهب كامنة لدى الطلاب."
    ],
    "steps": [
      "البدء بفقرـة تهيئية سؤال مثير أو صورة غامضة أو مشكلة يومية لاستثارة فضول الطلاب وربط الدرس بحياتهم الشخصية.",
      "تقديم المحتوى الجديد عبر وسائل متعددة كشرح مختصر وفيديو توضيحي وعرض عملي لتلبية أنماط التعلم المختلفة.",
      "تطبيق المعرفة من خلال أنشطة تدريبية تدرجية تبدأ بمباشرة وتنتهي بتحديات تتطلب تفكيراً أعلى وتطبيقاً في سياقات جديدة.",
      "تخصيص وقت للمناقشة الجماعية والتغذية الراجعة حيث يشارك الطلاب ما تعلموه ويصحح المعلم أي مفاهيم خاطئة فوراً.",
      "اختتام الدرس بتلخيص الطلاب للمفاهيم الأساسية بأنفسهم وتوضيح الواجب المنزلي أو المشروع المرتبط بتعميق التعلم المستمر."
    ],
    "strategies": [
      "استخدام استراتيجية التعلم القائم على المشكلة حيث يبدأ الدرس بتقديم مشكلة حقيقية والبحث عن حلها خلال الحصة.",
      "تفعيل أسلوب التعلم التعاوني داخل مجموعات غير متجانسة حيث يشرك الطلاب المتفوقون زملاءهم في فهم الخطوات الصعبة.",
      "توظيف تقنيات المحاكاة والواقع المعزز إن وجدت لتقديم تجارب يصعب مشاهدتها في الواقع كتفكيك آلة أو رحلة داخل الجسم.",
      "اعتماد استراتيجية الأسئلة السابرة التي تدفع تفكير الطالب خطوة إلى الأمام بدلاً من الاكتفاء بالإجابة الصحيحة السطحية.",
      "دمج الفن والدراما في شرح الدروس النظرية مثل تمثيل مشهد تاريخي أو رسم خريطة مفاهيم فنية للمادة العلمية."
    ],
    "strengths": [
      "استحواذ أسلوب العرض والإدارة على انتباه غالبية الطلاب طوال مدة الحصة مع انخفاض ملحوظ في حالات التشتت أو الملل.",
      "مشاركة فاعلة وعالية الجودة من طلاب كانوا يُعتبرون هادئين أو غير مشاركين مما يشير إلى نجاح استراتيجيات الجذب.",
      "قدرة الطلاب على إعادة صياغة المفهوم التعليمي بأسلوبهم الخاص وإعطاء أمثلة جديدة عليه مما يدل على فهم عميق وليس حفظاً.",
      "إدارة وقت الحصة بمهارة عالية حيث تم توزيع الوقت بين الشرح والتطبيق والمناقشة بشكل متوازن دون إحساس بالاستعجال.",
      "ظهور مؤشرات نجاح فورية كتحسن في نتائج التمرين التطبيقي داخل الحصة أو طرح أسئلة ذكية تعمق في جوهر الموضوع."
    ],
    "improve": [
      "تحسين عملية تقييم الفهم الأولي لضمان أن جميع الطلاب يمتلكون المعرفة الأساسية المطلوبة لمتابعة الجزء الجديد من الدرس.",
      "توفير المزيد من الأدوات والمواد المساعدة للطلاب ذوي الصعوبات التعلمية لتمكينهم من المشاركة الفعالة في الأنشطة التطبيقية.",
      "تسجيل الدرس صوتياً أو مرئياً بعد أخذ الإذن ليتسنى للطالب الغائب أو الذي يحتاج مراجعة الاستفادة منه في وقت لاحق.",
      "تصميم أنشطة ختامية تقويمية أكثر إبداعاً وتنوعاً كويز تفاعلي أو ملصق أو شرح لزملاء آخرين بدلاً من الأسئلة التقليدية.",
      "الحرص على ربط نهاية الدرس بشكل أوضح بالدرس التالي لخلق شعور بالتسلسل المنطقي والتطلع لاستكمال التعلم في الحصة القادمة."
    ],
    "recomm": [
      "الاستمرار في توثيق الدروس الناجحة من خطة ومواد وصور للأنشطة في بنك موارد المدرسة لتعميم الفائدة على جميع المعلمين.",
      "تشجيع زملاء المادة على حضور دروس بعضهم البعض لتبادل الزيارات ومناقشة أساليب التنفيذ وتبادل الخبرات الناجحة.",
      "إشراك الطلاب في تقييم الدرس بشكل بسيط مثل تعبيرات وجه أو ملصقات ملونة لجمع تغذية راجعة سريعة لتحسين الأداء.",
      "ربط محتوى الدرس بمواقع إلكترونية أو قنوات تعليمية موثوقة يزورها الطالب في المنزل لتعميق الفائدة وتوسيع الآفاق.",
      "منح الطلاب فرصة اختيار موضوع أو نشاط من ضمن الدرس في بعض الأحيان لزيادة شعورهم بالملكية والمسؤولية تجاه تعلمهم."
    ]
  },

  "تقرير تعليم تعاوني بين الطلاب": {
    "goal": [
      "تنمية مهارات العمل الجماعي الفعال والقيادة والتواصل بين الأقران من خلال مهام مشتركة تتطلب التنسيق وتبادل الأدوار.",
      "تعميق فهم المحتوى التعليمي عبر مناقشته وشرحه بين الطلاب أنفسهم مما يعزز الاستيعاب والاحتفاظ بالمعلومات بشكل أفضل.",
      "بناء بيئة صفية داعمة وغير تنافسية بشكل سلبي حيث يشعر كل طالب بأنه جزء من فريق ومسؤول عن نجاح المجموعة.",
      "تطوير مهارات حل المشكلات المعقدة بشكل تعاوني حيث يجمع الطلاب وجهات نظر متعددة ويبتكرون حلولاً قد لا يصل لها الفرد وحده.",
      "ترسيخ قيم الاحترام المتبادل والتسامح مع الاختلاف في الرأي وتقبل النقد البناء من خلال التفاعلات اليومية داخل المجموعات."
    ],
    "summary": [
      "نشاط بحثي جماعي مميز حيث قامت مجموعات الطلاب بإعداد عروض تقديمية عن كواكب المجموعة الشمسية وقدمت نتائج رائعة.",
      "تم تنفيذ مشروع صحيفة الفصل بشكل تعاوني ناجح حيث تولى كل فريق قسمًا كالأخبار والرياضة والفن وأنتجوا مجلة رقمية.",
      "نجحت استراتيجية المجموعات في حل مسائل الرياضيات المعقدة حيث ساعد المتقدمون من يتأخرون مما رفع مستوى الجميع.",
      "نشاط تعاوني في مادة اللغة الإنجليزية لكتابة قصة قصيرة على المراحل حيث كتب كل فريق فصلاً من القصة بسلاسة مدهشة.",
      "في حصة العلوم عمل الطلاب في مجموعات لبناء نماذج بسيطة لطواحين الهواء وبرز التعاون في التصميم والتنفيذ والعرض."
    ],
    "steps": [
      "تقسيم الطلاب إلى مجموعات صغيرة من 3 إلى 5 أفراد مدروسة التركيب لضمان تنوع المهارات والخلفيات داخل كل مجموعة.",
      "توضيح المهمة التعاونية بوضوح شديد مع تحديد الناتج النهائي المطلوب ومعايير التقييم والوقت المحدد للإنجاز الكامل.",
      "توزيع الأدوار داخل كل مجموعة بشكل واضح كقائد ومقرر ومقدم للعرض وباحث مع إمكانية التناوب في الأدوار لاحقاً.",
      "إتاحة الوقت والموارد للمجموعات للعمل معاً تحت إشراف المعلم الذي ينتقل بينهم كموجه ومسهل وليس كمصدر للمعلومات.",
      "تخصيص وقت لعرض إنجازات كل مجموعة ومناقشتها جماعياً مع تقييم يغطي جودة المحتوى وفعالية العمل الجماعي نفسه."
    ],
    "strategies": [
      "استخدام استراتيجية الرأس المرقم معاً حيث يدرس الأعضاء سوياً ثم يسأل المعلم فرداً عشوائياً لتمثيل إجابة المجموعة.",
      "تفعيل نموذج فكر – زاوج – شارك حيث يفكر الطالب فردياً ثم يناقش مع زميل ثم يشارك مع المجموعة أو الفصل ككل.",
      "تبني أسلوب تحقيق المجموعة حيث تعطى كل مجموعة مهمة فرعية مختلفة ثم تجمع النتائج لتحقق الصورة الكبيرة للمشروع.",
      "استخدام تقنية المختبر الدوار حيث تتنقل المجموعات بين مراكز أو محطات عمل مختلفة كل منها يركز على جانب من المهمة.",
      "تطبيق استراتيجية الشركاء التعلميين حيث يرتبط كل طالب بزميل للمراجعة المتبادلة والمساعدة خارج أوقات العمل الجماعي الرسمي."
    ],
    "strengths": [
      "ارتفاع ملحوظ في مستوى التفاعل الكلامي والإنتاجي للطلاب الخجولين أو ضعيفي التحصيل عندما يعملون ضمن إطار المجموعة الداعم.",
      "تطور مهارات القيادة والتنظيم لدى عدد من الطلاب لم تكن هذه الصفات بارزة لديهم في ظل التعليم الفردي التقليدي.",
      "جودة الناتج النهائي للمهام التعاونية فاقت التوقعات من حيث الإبداع والعمق والدقة مقارنة بأعمال فردية سابقة.",
      "خلق جو من المتعة والحماس داخل الفصل حيث تحول التعلم إلى نشاط اجتماعي إيجابي قلل من التوتر والرهبة من الأخطاء.",
      "تحسن ملحوظ في مهارات التواصل والإنصات لدى الطلاب حيث أصبحوا أكثر قدرة على شرح أفكارهم والدفاع عنها بمنطق."
    ],
    "improve": [
      "ضرورة مراقبة أكثر دقة لتوزيع العمل داخل المجموعات لمنع حدوث ظاهرة الركاب حيث يقوم طالب واحد بمعظم العمل.",
      "تحسين آلية تشكيل المجموعات باستمرار لمنع الجمود وتكوين تحالفات ثابتة ولتعريف الطلاب على العمل مع شركاء جدد.",
      "تخصيص وقت في نهاية كل نشاط تعاوني للتقييم الذاتي للمجموعة لأدائها ولتعامل أفرادها مع بعضهم البعض بشكل بنّاء.",
      "توفير تدريب مسبق للطلاب على مهارات العمل الجماعي الأساسية ككيف تختلف وكيف تتفق وكيف توزع المهام قبل الشروع في مهام معقدة.",
      "الحرص على أن تكون المهام التعاونية حقيقية وتتطلب تعاوناً فعلياً وليست مجرد واجبات فردية يجلس الطلاب لتنفيذها بجوار بعضهم."
    ],
    "recomm": [
      "جعل التعلم التعاوني جزءاً أساسياً وليس استثنائياً من خطة التدريس الأسبوعية لجميع المواد لتحقيق أقصى استفادة منه.",
      "إنشاء سجل إنجاز المجموعة لتوثيق أفضل الممارسات والعروض التعاونية وعرضها في مكان بارز لتحفيز الآخرين على المشاركة.",
      "ربط تقييم الأنشطة التعاونية بنظام العلامات أو المكافآت الجماعية لتعزيز قيمة العمل الفريقي والنتيجة المشتركة للجميع.",
      "إشراك الطلاب في تصميم بعض المهام التعاونية أو اختيار موضوعاتها لزيادة استثمارهم الشخصي واهتمامهم بنجاحها المستمر.",
      "تنظيم مسابقات أو معارض بين مجموعات الفصول المختلفة لعرض نتاجهم التعاوني مما يوسع نطاق التقدير ويخلق منافسة صحية."
    ]
  },

  "تقرير تصنيف الطلاب": {
    "goal": [
      "تحليل المستويات التحصيلية والمهارية للطلاب بشكل منهجي لتحديد الفروق الفردية ووضع كل طالب في المسار التعليمي المناسب له.",
      "توفير بيانات دقيقة للمعلم حول احتياجات الدعم والتدخل المبكر للطلاب المتعثرين واحتياجات الإثراء والتوسيع للمتفوقين.",
      "تمكين إدارة المدرسة من توزيع الموارد كالمعلمين المساعدين والبرامج العلاجية بشكل عادل وفعال بناءً على الاحتياجات الحقيقية.",
      "تأسيس أساس موضوعي للحوار مع أولياء الأمور حول مستوى أبنائهم بعيداً عن الانطباعات العامة وتقديم صورة واقعية قابلة للقياس.",
      "مراقبة اتجاهات التحسن أو التراجع في مستوى الفصل أو المدرسة ككل عبر الزمن من خلال مقارنة التصنيفات الدورية المنتظمة."
    ],
    "summary": [
      "أظهر التصنيف الدوري للطلاب توزيعاً طبيعياً مع وجود مجموعة مميزة تحتاج إثراءً وأخرى متوسطة ومجموعة صغيرة تحتاج دعماً مركزاً.",
      "تم تصنيف طلاب الصف الخامس في مادة الرياضيات بناءً على اختبار تشخيصي ومهام أدائية وتم وضع خطط فردية وفق النتائج.",
      "كشف التصنيف عن تحسن ملحوظ في مستوى مجموعة الدعم مقارنة بالفترة السابقة مما يدل على فعالية البرامج العلاجية المطبقة.",
      "تم استخدام منحنيات التوزيع والمخططات البيانية لتوضيح نتائج التصنيف للهيئة التدريسية مما سهل فهم الصورة العامة والتحديات.",
      "التصنيف لم يركز فقط على الجانب الأكاديمي بل شمل المهارات الحياتية والسلوكية ليقدم نظرة شاملة عن نمو كل طالب."
    ],
    "steps": [
      "جمع البيانات من مصادر متعددة كنـتائج الاختبارات الرسمية والتقييمات التكوينية اليومية وملاحظات المعلم وأعمال الطالب المحفظة.",
      "تحليل البيانات باستخدام أدوات بسيطة كجداول ورسوم بيانية لتحديد نقاط القوة والضعف العامة لكل طالب وفي كل مجال تعليمي.",
      "تطبيق معايير تصنيف واضحة ومتفق عليها مسبقاً كل مستوى إتقان المهارة الأساسية لوضع الطلاب في فئات كالمتميز والمتقدم والأساسي.",
      "عقد اجتماع مع فريق الدعم كالمرشد ومعلم المادة وولي الأمر عند الحاجة لمناقشة حالة كل طالب في الفئة تحت الأساسي ووضع خطة عمل.",
      "توثيق نتائج التصنيف في سجل خاص لكل طالب وإبلاغ النتائج والتوصيات لذوي الشأن مع الحفاظ على السرية التامة للبيانات."
    ],
    "strategies": [
      "استخدام التقييم القائم على المعايير حيث يقاس أداء كل طالب مقابل معيار ثابت للإتقان وليس مقارنة بأداء زملائه.",
      "تفعيل محفظة الطالب الإلكترونية التي تجمع عينات من أعماله على مدار الفصل لتعطي صورة ديناميكية عن تطوره بدلاً من لمحة لحظية.",
      "اعتماد التقييم التشخيصي في بداية كل وحدة جديدة لتحديد المعرفة السابقة للطلاب وتصنيفهم مبدئياً لتوجيه عملية التدريس.",
      "استخدام استبيانات التقييم الذاتي للطالب ليصنف نفسه في بعض المهارات الناعمة كالثقة والتعاون لمقارنة تصوره مع تصنيف المعلم.",
      "التصنيف الديناميكي الذي يتغير مع الوقت بحيث يعاد تصنيف الطالب كل 6-8 أسابيع بناءً على تقدمه وليس تصنيفاً ثابتاً للعام."
    ],
    "strengths": [
      "وضوح الصورة أمام المعلم مما مكنه من تصميم أنشطة داخل الصف تناسب المجموعات المختلفة بشكل فعال وحقيقي ومتميز.",
      "استجابة إيجابية من الطلاب أنفسهم عندما فهموا مستواهم الحقيقي مما خلق لديهم دافعية للتحسن والانتقال لفئة أعلى باستمرار.",
      "استخدام البيانات في توجيه المعلمين المساعدين أو متطوعي الدعم نحو الطلاب الذين يحتاجون مساعدة بشكل موضوعي وعادل للجميع.",
      "كشف التصنيف عن مواهب وطاقات لطلاب في مجالات غير أكاديمية كالفنية والقيادية تم تجاهلها سابقاً في التقييم التقليدي.",
      "ساهم التصنيف في خلق بيئة واقعية بين إدارة المدرسة وأولياء الأمور حيث أصبح الحوار حول تحسين ملموس وليس انطباعات عامة."
    ],
    "improve": [
      "الحرص على أن لا يؤدي التصنيف إلى وصم الطالب بتصنيف سلبي أو خلق شعور بالدونية داخل الفصل بل يجب أن يكون أداة دعم سرية.",
      "تحسين أدوات جمع البيانات لتشمل تقييمات أكثر موضوعية للمهارات العملية والأدائية وعدم الاعتماد الكلي على الاختبارات الورقية.",
      "تدريب المعلمين على تحليل البيانات البسيط واتخاذ القرارات التربوية بناءً عليها بدلاً من الاكتفاء بتسليم النتائج للإدارة فقط.",
      "تضمين مؤشرات عن دافعية الطالب واجتهاده في التصنيف لأن التركيز على القدرة فقط قد يكون مجحفاً بحق المجتهدين المثابرين.",
      "إشراك الطالب بشكل مناسب لعمره في مناقشة تصنيفه وأسبابه ليكون شريكاً في وضع أهداف التحسين وخطة العمل الشخصية."
    ],
    "recomm": [
      "اعتماد التصنيف كعملية مؤسسية دورية ومنظمة في المدرسة مع وجود فريق تنسيق لضمان الاتساق في المعايير بين الفصول المختلفة.",
      "استخدام برامج حاسوبية أو جداول إلكترونية بسيطة لتسجيل ومراقبة بيانات التصنيف وتحديثها بسهولة وإنتاج تقارير تلقائية.",
      "ربط نتائج التصنيف ببرامج المدرسة اللامنهجية كنادي الموهوبين وبرامج التقوية لضمان وصول الخدمات المناسبة للفئة المستهدفة.",
      "عقد ورش عمل لأولياء الأمور لشرح فلسفة وآلية التصنيف وكيف يمكنهم استخدام هذه المعلومات لدعم أبنائهم في المنزل.",
      "التقليل من عدد الفئات في التصنيف إلى 3-4 فئات كحد أقصى لتبسيط الصورة وتجنب التشتت والتفصيل الزائد الذي قد لا يكون مفيداً."
    ]
  },

  "تقرير تحفيز الطلاب": {
    "goal": [
      "إثارة الدافعية الداخلية والخارجية للطلاب نحو التعلم والمشاركة الإيجابية من خلال بيئة غنية بالتشجيع والتقدير والاحتفاء.",
      "بناء ثقة الطالب بنفسه وقدراته من خلال الاعتراف بإنجازاته ومساهماته مهما كانت صغيرة وتعزيز صورة الذات الإيجابية لديه.",
      "توجيه سلوك الطلاب نحو العادات الإيجابية كالمثابرة والتعاون والإبداع من خلال ربطها بنتائج محسوسة ومجزية تكرر السلوك المرغوب.",
      "تعديل البيئة الصفية لتكون جذابة وتقدمية وتخلق لدى الطالب فضولاً وتطلعاً دائمين لمعرفة ما هو قادم من تحديات ومكافآت.",
      "تعزيز الانتماء للفصل والمدرسة من خلال أنشطة تحفيزية جماعية تخلق ذكريات إيجابية وروحاً معنوية عالية بين أفراد المجتمع المدرسي."
    ],
    "summary": [
      "برنامج نجوم الأسبوع نجح في تحفيز الطلاب على المشاركة وتحسين السلوك حيث تم تتويج 3 طلاب أسبوعياً في طقس احتفالي مميز.",
      "ساهمت لوحة الإنجاز الرقمية التفاعلية في رفع الحماس حيث يستطيع الطلاب رفع إنجازاتهم ويرون نقاطهم تتراكم علناً وبشفافية.",
      "نظام المكافآت المرحلي جمع طوابع لاستبدالها بهدية شجع الطلاب على إكمال المهام الصعبة والمثابرة على المدى الطويل.",
      "الاحتفال بنجاحات غير أكاديمية كمساعدة زميل أو تحسن في الخط أو ابتسامة دائمة ساهم في تعزيز القيم والمهارات الشخصية.",
      "استضافة شخصيات ناجحة من المجتمع المحلي للتحدث عن تجربتهم كان بمثابة حافز قوي للطلاب لرؤية نموذج عملي للنجاح والاجتهاد."
    ],
    "steps": [
      "تحديد السلوكيات والأداءات المستهدفة بالتحفيز كمشاركة في النقاش أو تحسن في الدرجة أو سلوك لطيف أو إبداع في حل مشكلة.",
      "تصميم نظام تحفيز متنوع يجمع بين المكافآت المعنوية الفورية كالثناء والطابع والمكافآت المادية أو الرمزية المؤجلة كالشهادة.",
      "الإعلان الواضح والمستمر عن معايير التحفيز أمام الطلاب وتوضيح كيفية الفوز بها لضمان العدالة ووضوح القواعد للجميع.",
      "التنفيذ اليومي الدقيق للمدح والتقدير الفوري مع التوثيق كطابع في كراس الطالب أو ملصق على لوحته للحفاظ على زخم الحماس.",
      "تنظيم احتفالية دورية أسبوعية أو شهرية لتوزيع الجوائز الكبرى أو الشهادات في وجود قيادة المدرسة أو أولياء الأمور."
    ],
    "strategies": [
      "استخدام الاقتصاد الصفي حيث يكسب الطلاب عملة وهمية مقابل الإنجازات ويصرفونها في متجر الفصل لشراء امتيازات أو هدايا صغيرة.",
      "تفعيل استراتيجية المعلم السري حيث يراقب المعلم سلوكاً إيجابياً غير معلن ويختار طالباً قام به فجأة ويكافئه بمفاجأة سارة.",
      "توظيف التكنولوجيا عبر تطبيقات تحفيزية مثل كلاس دوجو التي تمنح نقاطاً مسموعة وترسل تقارير فورية لأولياء الأمور.",
      "اعتماد نظام التحفيز الجماعي حيث يفوز الفصل ككل بمكافأة كحفلة شاي أو رحلة قصيرة إذا حققوا هدفاً جماعياً كمعدل حضور.",
      "ربط التحفيز بالتعلم الذاتي عبر منح رخصة الإعفاء من واجب معين للطالب الذي يثبت إتقانه للمهارة قبل زملائه كحافز للتميز."
    ],
    "strengths": [
      "تحسن ملحوظ وجلي في المناخ العام للفصل حيث أصبح الجو أكثر إيجابية وتقبل للأخطاء وانخفاض في السلوكيات المعيقة للتعلم.",
      "تسابق واضح وصحي بين الطلاب على نيل المكافآت والاعتراف مما خلق ديناميكية إيجابية وحماساً دائماً داخل الحصص الدراسية.",
      "بروز مواهب ومبادرات غير متوقعة من طلاب كانوا سلبيين لأن نظام التحفيز فتح لهم باباً لإثبات أنفسهم بطرق جديدة تناسبهم.",
      "تقوية العلاقة الإيجابية بين المعلم والطالب حيث تحولت من علاقة تقييم وحكم إلى علاقة دعم وتشجيع وشراكة في النجاح.",
      "انتقال أثر التحفيز خارج جدران الفصل حيث لوحظ أن الطلاب المحفزين أصبحوا أكثر تنظيماً وإيجابية في الأنشطة المدرسية الأخرى."
    ],
    "improve": [
      "الحرص على استمرارية نظام التحفيز وعدم تركه بعد فترة لأن الانقطاع قد يسبب إحباطاً أكبر مما كان عليه الحال قبل التحفيز.",
      "تجنب تحول التحفيز إلى رشوة بأن لا يربط الطالب بين السلوك الجيد وبين المكافأة المادية فقط بل بمدى رضاه الشخصي عن إنجازه.",
      "مراعاة الفروق الفردية في التحفيز فما يحفز طالباً قد لا يحفز آخر لذا يجب توفير خيارات متنوعة من المكافآت والامتيازات.",
      "ضمان وصول فرص التحفيز للطلاب ذوي التحصيل المتدني أو بطيئي التعلم من خلال وضع أهداف تناسبهم ويمكنهم تحقيقها بنجاح.",
      "تخفيف حدة المنافسة الفردية في بعض الأحيان عبر تعزيز تحفيز المجموعات أو الفصل ككل لحماية الطلاب الأقل ثقة من الإحباط."
    ],
    "recomm": [
      "دمج التحفيز في ثقافة المدرسة وجعله جزءاً من خطتها الاستراتيجية مع تخصيص ميزانية رمزية لدعم أنشطة التحفيز والمكافآت.",
      "إشراك الطلاب في تصميم أنظمة التحفيز واختيار المكافآت لضمان أن تكون ذات قيمة حقيقية وجاذبية بالنسبة لهم شخصياً.",
      "تدريب المعلمين على فنون التحفيز الفعال وكيفية استخدام اللغة الإيجابية البناءة التي تركز على الجهد والتحسن وليس فقط النتيجة.",
      "توثيق قصص النجاح الفردية للطلاب بصور أو فيديوهات قصيرة بإذن ولي الأمر وعرضها في حفل نهاية العام كمصدر إلهام للجميع.",
      "ربط تحفيز الطالب الأكاديمي بتحفيزه على القيم والسلوكيات الحسنة لخلق شخصية متوازنة تدرك أن النجاح الحقيقي يشمل جميع الجوانب."
    ]
  },

  "تقرير كشف المتابعة": {
    "goal": [
      "رصد وتوثيق مستمر ومفصل لمستوى تقدم كل طالب تحصيلياً وسلوكياً واجتماعياً لضمان عدم تخلف أي طالب عن الركب.",
      "تحديد أنماط وأسباب الصعوبات التي يواجهها الطلاب مبكراً للتدخل السريع والفعال قبل أن تتراكم وتتحول إلى مشكلات معقدة.",
      "توفير سجل تاريخي دقيق لتطور أداء الطالب يستخدم كأساس موضوعي في الحوار مع ولي الأمر أو في اتخاذ القرارات التربوية.",
      "ضمان عدالة وموضوعية المتابعة عبر استخدام أدوات قياس متنوعة وملاحظات من أكثر من مصدر كمعلم المادة والمرشد وولي الأمر.",
      "تمكين المعلم من تقييم فاعلية استراتيجياته التدريسية ومدى ملاءمتها للطلاب من خلال رصد استجاباتهم وتقدمهم اليومي."
    ],
    "summary": [
      "كشف المتابعة الأسبوعي كشف عن تحسن مطرد في مستوى طالبين من مجموعة الدعم بعد تطبيق خطة علاجية فردية مكثفة.",
      "من خلال كشف المتابعة السلوكي تم رصد تحول إيجابي ملحوظ في سلوك طالب كان يعاني من فرط الحركة بعد تفعيل نظام المكافآت.",
      "أظهرت جداول متابعة الواجبات المنزلية ارتفاعاً في نسبة التسليم المنتظم بعد ربطها بنظام النقاط والحوافز الصفية.",
      "كشف متابعة المهارات الاجتماعية في الفسح رفع وعي المعلمين بوجود مشكلات علاقات بين بعض الطلاب وتمت معالجتها بسرعة.",
      "تم استخدام كشف المتابعة الإلكتروني لمشاركة ملاحظات سريعة مع أولياء الأمور مما قلل من الفجوة المعلوماتية بين البيت والمدرسة."
    ],
    "steps": [
      "تصميم نماذج متابعة بسيطة وواضحة لكل جانب كالتحصيلي والسلوكي والحضور والانصراف يسهل على المعلم تعبئتها يومياً أو أسبوعياً.",
      "تحديد وقت ثابت أسبوعياً كنهاية يوم الخميس لمراجعة وملء كشوف المتابعة وتحليل البيانات المجمعة بشكل منتظم ودوري.",
      "عقد اجتماعات قصيرة دورية كل أسبوعين مع المرشد الطلابي أو منسق الصف لمناقشة الحالات الحرجة الواردة في كشوف المتابعة.",
      "مشاركة ملخص دوري كل شهر من نتائج المتابعة مع أولياء الأمور عبر وسائل مناسبة كالرسالة النصية أو التطبيق مع الحفاظ على السرية.",
      "أرشفة كشوف المتابعة بشكل منظم ورقي أو إلكتروني في ملف الطالب ليتم الرجوع إليها عند الحاجة في أي وقت لاحق."
    ],
    "strategies": [
      "استخدام مكعبات المتابعة حيث يمثل كل مكعب طالباً ويلون بلون حسب مستواه كالأخضر للمستقر والأصفر للمراقبة والأحمر للتدخل.",
      "تفعيل مذكرة المتابعة السريعة وهي دفتر صغير يدون فيه المعلم الملاحظات العابرة أثناء الحصة ثم ينقلها لاحقاً للنموذج الرسمي.",
      "اعتماد أسلوب المتابعة عبر العينات حيث يركز المعلم على متابعة مجموعة صغيرة من الطلاب كل أسبوع بتفصيل أكبر ثم يدور على الآخرين.",
      "استخدام التقنية عبر تطبيقات مثل نماذج جوجل لإنشاء استبيانات متابعة سريعة يملأها المعلم من هاتفه ويتولد منها تقرير آلي.",
      "المتابعة الثلاثية حيث يسجل المعلم ملاحظته ويسجل الطالب تقييمه الذاتي البسيط ويسجل ولي الأمر ملاحظته من المنزل على نفس النموذج."
    ],
    "strengths": [
      "أصبحت عملية اكتشاف الطلاب المتعثرين أسرع وأكثر دقة مما مكّن من تقديم المساعدة في وقت مناسب قبل تفاقم الفجوة التعليمية.",
      "تحولت المتابعة من عمل روتيني إضافي على المعلم إلى أداة تخطيط فعالة يستخدمها فعلاً في تعديل خططه وطرق تدريسه.",
      "شعر الطلاب باهتمام أكبر من معلمهم لأن الملاحظات الدقيقة أتاحت للمعلم مدح مجهودات صغيرة لم تكن لتلاحظ في السابق.",
      "ساهمت المتابعة المنظمة في خلق لغة مشتركة وبيانات موثوقة بين المعلم والمرشد والإدارة مما حسن جودة القرارات المتخذة.",
      "انخفضت شكاوى أولياء الأمور من المفاجآت في نتائج الترم لأنهم كانوا مطلعين على سير أبنائهم عبر تقارير المتابعة الدورية."
    ],
    "improve": [
      "تبسيط نماذج المتابعة أكثر لتقليل الأعباء الكتابية على المعلم والتركيز على المؤشرات الأكثر دلالة على التقدم أو التراجع.",
      "توفير تدريب عملي للمعلمين على كيفية تحويل بيانات المتابعة إلى خطط عمل ملموسة وليس فقط جمع البيانات من أجل الجمع.",
      "ربط كشوف المتابعة بشكل أوثق بنظام التسجيلات الإلكترونية للمدرسة لتجنب الازدواجية في إدخال البيانات وتحديثها آلياً.",
      "تضمين مؤشرات إيجابية للمتابعة تركز على نقاط القوة والمواهب وليس فقط على نقاط الضعف والمشكلات لخلق توازن في الصورة.",
      "ضمان سرية كشوف المتابعة وعدم وضعها في مكان يطلع عليها الطلاب أو زملاؤهم حتى لا يشعر أي طالب بالحرج أو التصنيف السلبي."
    ],
    "recomm": [
      "اعتماد كشف المتابعة كجزء أساسي من أعباء المعلم الوظيفية وتخصيص وقت أسبوعي ضمن جدوله الرسمي لإنجازها ومناقشتها.",
      "تطوير نموذج موحد لكشف المتابعة على مستوى المدرسة مع وجود هامش لتخصيصه حسب احتياجات كل مادة أو كل صف دراسي.",
      "إنشاء غرفة عمليات تربوية صغيرة حيث تعرض بيانات المتابعة الرئيسية على لوحة بيانية يتم تحديثها أسبوعياً لجميع المعنيين.",
      "ربط نظام المتابعة ببرامج التطوير المهني للمعلم حيث تناقش حالات من كشوف المتابعة في لقاءات المعلمين لاستخلاص الدروس.",
      "تشجيع ثقافة المتابعة الإيجابية بين الطلاب أنفسهم عبر تدريبهم على متابعة تقدمهم الشخصي في تحقيق الأهداف الصغيرة التي يضعونها."
    ]
  },

  "تقرير توزيع وقت الحصة": {
    "goal": [
      "تحقيق أقصى استفادة ممكنة من الزمن المحدد للحصة الدراسية عبر توزيع حكيم ومتوازن لأنشطة التعليم والتعلم المختلفة.",
      "ضمان تغطية جميع عناصر الدرس الأساسية كالتهيئة والعرض والتطبيق والتقويم دون إهمال أي جزء على حساب الآخر.",
      "توفير وتيرة تعليمية مناسبة تحافظ على انتباه وتركيز الطلاب طوال الحصة وتتجنب الرتابة أو الاستعجال المفرط.",
      "تمكين المعلم من إدارة الحصة بسلاسة وثقة حيث يعرف مسبقاً ما سيفعله في كل دقيقة مما يقلل من الارتباك والوقت الضائع.",
      "خلق نمط متوقع ومنظم داخل الفصل يساعد الطلاب على الاستعداد الذهني والنفسي للانتقال بين أنواع الأنشطة المختلفة."
    ],
    "summary": [
      "تم توزيع وقت حصة الرياضيات 45 دقيقة بنجاح: 5 دقائق تهيئة و15 دقيقة شرح و20 دقيقة تطبيق جماعي وفردي و5 دقائق ختام.",
      "في حصة النشاط نجح التوزيع الزمني المرن الذي خصص وقتاً أطول للممارسة العملية وأقل للتعليمات مما زاد من إنتاجية الطلاب.",
      "استخدم مؤقت مرئي كبير لضبط أوقات الأنشطة في حصة اللغة العربية مما ساعد الطلاب على إدارة وقتهم والشعور بالمسؤولية.",
      "التوزيع المتوازن بين الأنشطة الصامتة كالقراءة الفردية والأنشطة النشطة كالمناقشة الجماعية ضمن حصة واحدة ساهم في تجدد نشاط الطلاب.",
      "في الحصة المزدوجة 90 دقيقة تم تقسيم الوقت إلى ثلاث كتل تعليمية منفصلة مع فترات راحة قصيرة بينها مما حافظ على التركيز."
    ],
    "steps": [
      "التخطيط المسبق الدقيق لتوزيع وقت الحصة كتابياً في خطة الدرس مع تحديد الحد الأدنى والأقصى لكل نشاط مرن قليلاً حسب السياق.",
      "بداية الحصة بالإعلان للطلاب عن جدول أعمال الحصة الزمني المكتوب على السبورة لخلق توقع وإشراكهم في الالتزام بالوقت.",
      "استخدام مؤقت ساعة أو تطبيق توقيت على الشاشة بشكل مرئي ومسموع للجميع لضبط انتقالات الأنشطة بشكل موضوعي ومحايد.",
      "مراقبة وتيرة الفصل وردود فعل الطلاب أثناء التنفيذ والاستعداد لتقصير أو تمديد نشاط ما بشكل طفيف إذا اقتضت الحاجة التعليمية.",
      "اختتام الحصة بتلخيص سريع لما تم إنجازه ومقارنته مع الخطة الزمنية المعلنة في البداية والتفكير مع الطلاب في تحسين الاستفادة من الوقت."
    ],
    "strategies": [
      "استراتيجية الحصة المقلوبة المصغرة حيث يخصص الجزء الأول من الوقت لتطبيق سريع على ما تعلموه في المنزل والجزء الثاني لشرح الجديد.",
      "تقنية البومودورو التربوي حيث تقسم الحصة إلى فترات تركيز مكثف مثلاً 20 دقيقة تليها دقيقتان من النشاط الحركي أو التحفيزي البسيط.",
      "تفعيل التناوب بين المعلم والمتعلم حيث يشرح المعلم لفترة ثم يعطي الوقت للطلاب ليعلموا بعضهم البعض أو يقدموا شرحاً ثم يعود للتلخيص.",
      "استخدام الوقت المستقطع التربوي حيث يخصص دقيقة صمت أو تفكير فردي في منتصف الحصة لتنظيم الأفكار قبل الانتقال للنشاط التطبيقي الأصعب.",
      "ربط توزيع الوقت باستراتيجيات التعلم النشط مثل تخصيص وقت أكبر لأنشطة المجموعات والمناقشات مقارنة بالوقت المخصص للشرح الإلقائي التقليدي."
    ],
    "strengths": [
      "انخفاض كبير في الشكاوى من قصر الوقت أو عدم إنهاء الدرس حيث أصبح الإنجاز متوقعاً ومخططاً له مسبقاً وبشكل واقعي.",
      "تحسن ملحوظ في إدارة الطلاب لذواتهم داخل الحصة حيث أصبحوا يعرفون متى يتحدثون ومتى ينصتون بناءً على طبيعة النشاط الزمني.",
      "قدرة المعلم على تغطية محتوى أكاديمي أكبر مع تخفيف الضغط النفسي عليه لأنه لم يعد في سباق محموم مع عقارب الساعة.",
      "توزيع عادل للفرص حيث ضمن التوقيت المحدد للمناقشة مشاركة عدد أكبر من الطلاب وعدم هيمنة عدد قليل على وقت الحوار.",
      "خلق إحساس عام بالانضباط والجدية داخل الفصل مما انعكس إيجاباً على البيئة التعليمية ككل وسمعة الحصة بين الطلاب."
    ],
    "improve": [
      "تخصيص وقت محدد وواضح داخل الحصة للرد على أسئلة الطلاب غير المتوقعة دون أن يؤدي ذلك لتعطيل الخطة الزمنية الرئيسية.",
      "مراعاة الفروق الفردية في سرعة الإنجاز عند تخطيط وقت الأنشطة التطبيقية وتوفير مهام إضافية للطلاب سريعي الإنجاز.",
      "تدريب الطلاب على مفهوم إدارة الوقت الشخصي خلال الأنشطة الفردية وعدم الاعتماد كلياً على توقيت المعلم الخارجي.",
      "التقليل من الوقت الضائع في الإجراءات الروتينية كتوزيع الأوراق وفتح الكتاب عبر تحضير مسبق أو تفويض طلاب للمساعدة.",
      "توثيق أكثر دقة للوقت الفعلي الذي تستغرقه كل مرحلة في الحصة مقارنة بالوقت المخطط لتحسين دقة التخطيط في المرات القادمة."
    ],
    "recomm": [
      "جعل توزيع الوقت جزءاً ثابتاً من تخطيط كل حصة وعرض نماذج ناجحة منه في اجتماعات المادة لتطوير الممارسات المشتركة.",
      "استخدام أدوات مساعدة بصرية لجعل الوقت ملموساً للطلاب الصغار كساعة رملية أو مؤشر يتحرك على مخطط زمني مرسوم.",
      "منح المعلمين المرونة الكافية لتجاوز التوزيع الزمني في حالات استثنائية إذا رأوا أن استغراق الطلاب في نشاط ما يعود بفائدة تعليمية كبيرة.",
      "إشراك الطلاب في تقييم توزيع وقت الحصة كأن يسألون هل كان الوقت كافياً للفهم وهل كان هناك ملل لجمع ملاحظاتهم كشركاء.",
      "ربط مهارة إدارة وقت الحصة بمهارات القرن الواحد والعشرين التي تروج لها المدرسة وتعريف الطلاب بأهمية هذه المهارة في حياتهم المستقبلية."
    ]
  },

  "تقرير تنفيذ اختبار تحسن": {
    "goal": [
      "قياس الأثر الفعلي للبرامج العلاجية أو التعزيزية المطبقة على الطلاب من خلال تقييم موضوعي يرصد مدى تحسنهم في المهارات المستهدفة.",
      "توفير دليل ملموس ومشجع للطالب نفسه على أن جهوده وتلقي الدعم قد آتت ثمارها مما يعزز ثقته ويقوي دافعيته للاستمرار.",
      "تقييم فاعلية الاستراتيجيات والموارد المستخدمة في عملية الدعم واتخاذ قرارات مستنيرة بشأن الاستمرار بها أو تطويرها أو تغييرها.",
      "تلبية متطلبات المساءلة تجاه أولياء الأمور والإدارة بتقديم تقرير واضح ومبني على أدلة عن التقدم المحرز في معالجة صعوبات التعلم.",
      "رصد الاتجاهات العامة لمستوى التحسن على مستوى المجموعة أو الفصل لتحديد ما إذا كانت الجهود المبذولة تؤدي إلى تحسن منهجي شامل."
    ],
    "summary": [
      "اختبار تحسن في مهارات القراءة الجهرية أظهر تقدماً كبيراً لدى 80% من طلاب مجموعة الدعم حيث قلّت الأخطاء وازدادت الطلاقة.",
      "تم تطبيق اختبار تحسين قبلي-بعدي في العمليات الحسابية الأساسية وأظهرت النتائج قفزة في متوسط درجات المجموعة من 55% إلى 82%.",
      "اختبار تحسن كتابي في التعبير الإبداعي كشف عن تنوع أكبر في الأفكار واستخدام أفضل للمفردات لدى الطلاب بعد دورة الكتابة الإبداعية.",
      "التقييم العملي للأداء في مختبر العلوم بعد برنامج تدريبي مكثف أظهر تحسناً ملحوظاً في دقة اتباع خطوات التجربة وأمانة التسجيل.",
      "مقارنة نتائج اختباري تحسن متتاليين أظهرت أن التحسن مستمر ولكن بمعدل أبطأ مما يشير إلى الحاجة لرفع مستوى التحدي في البرنامج العلاجي."
    ],
    "steps": [
      "تحديد المهارات أو المعارف المحددة التي تم التركيز عليها خلال فترة الدعم وبناء اختبار يركز عليها بشكل رئيسي وواضح.",
      "تصميم اختبار يكون مشابهاً في الصعوبة والهيكل لاختبار التشخيص الأولي لضمان عدالة المقارنة وقياس التحسن الحقيقي.",
      "تطبيق الاختبار في جو يدعم الطالب ويقلل قلقه مع التأكيد على أن الهدف هو قياس التحسن وليس العقاب أو الإحراج.",
      "تصحيح الاختبارات بسرعة وفق مفتاح تصحيح موضوعي وتحليل النتائج فردياً وجماعياً باستخدام مقاييس كمية ونوعية.",
      "مشاركة النتائج مع الطالب بطريقة إيجابية وولي أمره ومناقشة الخطوة التالية كالاستمرار أو التعديل أو التخرج من برنامج الدعم."
    ],
    "strategies": [
      "استخدام اختبارات الأداء الحقيقي أو المهام التطبيقية بدلاً من الاختيار من متعدد لقياس التحسن في المهارات العملية بشكل أمثل.",
      "تفعيل التقييم الذاتي للطالب قبل وبعد الاختبار حيث يقيم نفسه في المهارة المستهدفة ثم يقارن تقديره مع نتيجة الاختبار الموضوعي.",
      "اعتماد نموذج محفظة التحسن حيث يجمع الطالب عينات من أعماله قبل وبعد الدعم ويعرضها كمؤشر مرئي وقوي على تطوره.",
      "استخدام اختبارات قصيرة متكررة كويكلي كويزز كبديل أو مكمل لاختبار تحسن نهائي واحد لرصد منحنى التحسن عبر الزمن.",
      "تصميم اختبارات تحسن على مستويين: مستوى أساسي يقيس تحقيق الحد الأدنى من الإتقان ومستوى متقدم يقيس انتقال الطالب لمرحلة الإبداع."
    ],
    "strengths": [
      "شعور الطلاب الذين حصلوا على تحسن ملحوظ بالإنجاز والفخر مما حول نظرتهم لأنفسهم من طلاب متعثرين إلى طلاب قادرين على التغلب على الصعوبات.",
      "حصول المعلم على بيانات صلبة تدعم جهوده وتظهر نجاح أساليبه مما يعزز معنوياته ويبرر الوقت والجهد الكبيرين المبذولين في الدعم.",
      "زيادة مصداقية برامج الدعم في نظر أولياء الأمور وتحول تعاونهم من شكلي إلى فاعل بعد أن رأوا نتائج ملموسة على أبنائهم.",
      "القدرة على توجيه الموارد كجلسات الدعم بشكل أكثر كفاءة من خلال تخرج الطلاب المتحسنين وإعادة توجيه الجهود نحو من يحتاجون دعمًا إضافياً.",
      "خلق ثقافة تقبل التقويم لدى الطلاب حيث أصبحوا ينظرون للاختبار كفرصة لإظهار ما تعلموه وليس كتهديد أو عقاب مما خفض من رهبة الاختبارات."
    ],
    "improve": [
      "الحرص على أن لا يركز اختبار التحسن فقط على الجانب المعرفي الضيق بل يشمل أيضاً قياس التحسن في الثقة والدافعية والمواقف نحو المادة.",
      "تجنب المقارنة المباشرة والعلنية بين الطلاب بناءً على نتائج اختبار التحسن بل يجب أن تكون المقارنة ذاتية لكل طالب مع أدائه السابق.",
      "تحسين تصميم الاختبار ليتجنب أثر التعلم من أجل الاختبار بحيث يقيس تحسناً حقيقياً في المهارة القابلة للانتقال وليس حفظاً لأسئلة محددة.",
      "تضمين مهام تتطلب تطبيق المهارة في سياقات جديدة أو مشكلات غير مألوفة لاختبار عمق الفهم وليس مجرد استرجاع الممارسات المدربة.",
      "توفير تغذية راجعة تفصيلية لكل طالب مع نتائج اختبار التحسن تشرح بالضبط ما تحسن فيه وما يحتاج لمواصلة العمل عليه."
    ],
    "recomm": [
      "جعل اختبارات التحسن ممارسة روتينية ومتكاملة مع أي برنامج دعم أو علاجي وليس نشاطاً اختيارياً أو عشوائياً.",
      "توحيد معايير التحسن المقبول على مستوى المدرسة كمثلاً تحسن بنسبة 20% أو أكثر ليكون هناك إطار واضح للحكم على النجاح.",
      "تكريم الطلاب الذين أظهروا تحسناً استثنائياً ولو كانت درجاتهم النهائية ليست ممتازة في حفل خاص لتكريس قيمة الجهد والتحسن المستمر.",
      "استخدام نتائج اختبارات التحسن الجماعية كبيانات في تقرير المدرسة السنوي لعرض أثر البرامج التربوية على جودة مخرجات التعلم.",
      "تدريب المعلمين على تحليل نتائج اختبارات التحسن بشكل إحصائي بسيط واستخلاص الدروس التي تفيد في تطوير الممارسة التدريسية العامة."
    ]
  },

  "تقرير المشاركات بين الطلاب": {
    "goal": [
      "تكريس ثقافة الحوار والمشاركة الفعالة داخل الصف بحيث يشعر كل طالب بأن صوته مسموع وقيمته معترف بها في بناء المعرفة الجماعية.",
      "تنمية مهارات التعبير الشفهي والجرأة الأدبية والمنطقية لدى الطلاب من خلال توفير فرص آمنة ومتكررة للتحدث أمام الآخرين.",
      "تحويل الفصل من مساحة للإلقاء أحادي الاتجاه من المعلم إلى مساحة تفاعلية ديناميكية تبنى فيها الأفكار بشكل تعاوني بين الطلاب.",
      "استثمار طاقات ومواهب الطلاب المختلفة الفكرية والفنية والتنظيمية في إثراء العملية التعليمية وتقديم المحتوى بطرق مبتكرة.",
      "بناء مجتمع تعلم مصغر داخل الفصل تقوى فيه أواصر الصداقة والتعاون الأكاديمي مما ينعكس إيجاباً على المناخ النفسي العام."
    ],
    "summary": [
      "شهد الفصل مشاركات طلابية مكثفة في مناقشة قضية أدبية حيث تبادل الطلاب الآراء بأدب وطرحوا حججاً منطقية داعمة لمواقفهم.",
      "في مشروع العرض التقديمي شارك جميع الطلاب إما كمقدمين أو كمساعدين في الإعداد أو كمنظمين للوقت وكانت روح الفريق عالية.",
      "مبادرة طالب اليوم حيث يقدم طالب في بداية كل حصة معلومة مفيدة نجحت في اكتشاف مواهب تقديمية ورفعت نسبة المشاركة الطوعية.",
      "أنتج الطلاب مجلة حائط تفاعلية تشاركية حيث يكتبون مقالات ويرسمون كاريكاتيرات وكانت محطة جذب ونقاش دائم خلال الفسح.",
      "في حصص الرياضيات أصبح حل المسائل على السبورة فرصة مشاركة جماعية حيث يبدأ طالب ويكمل آخرون في جو تحفيزي وداعم."
    ],
    "steps": [
      "خلق بيئة آمنة خالية من السخرية أو الانتقاص والتأكيد المتكرر على أن قيمة المشاركة تكمن في المحاولة والشجاعة وليس فقط في صحة الإجابة.",
      "استخدام تقنيات لضمان مشاركة واسعة كأعواد الأسماء العشوائية أو تمرير كرة المتحدث أو إعطاء وقت تفكير قبل طلب الإجابة.",
      "تنويع أشكال المشاركة لتشمل التحدث والكتابة على السبورة واستخدام الإشارات كبطاقات الألوان للتفضيل أو المشاركة الرقمية عبر التطبيقات.",
      "تقديم تغذية راجعة فورية وإيجابية على المشاركات مع التركيز على تطوير الفكرة أو أسلوب العرض وليس فقط تصحيح الخطأ.",
      "تفويض أدوار قيادية للطلاب في إدارة بعض فقرات النقاش كمسير للجلسة أو مقرر للنتائج لتعميق شعورهم بالملكية والمسؤولية."
    ],
    "strategies": [
      "استراتيجية الدقيقة الواحدة حيث يعطى كل طالب دقيقة فقط للتعبير عن فكرته في موضوع ما مما يجبر التركيز ويوفر وقتاً للمشاركة الجميع.",
      "تقنية المقابلة الثنائية حيث يجهز طالبان أسئلة ويقابلان بعضهما ثم يقدمان خلاصة الحوار للفصل مما يخفف رهبة التحدث للمجموعة الكبيرة.",
      "تفعيل لوحة الأسئلة الصامتة حيث يكتب الطلاب أسئلتهم أو تعليقاتهم على ملصقات ويلصقونها على لوحة ويتم الرد عليها كتابياً أو شفهياً لاحقاً.",
      "استخدام مسرح المناقشة حيث يقف الطلاب في دائرة وينتقل الحديث بشكل منظم أو يقفون في مكان معين يعبر عن موقفهم موافق أو معارض أو محايد.",
      "دمج التكنولوجيا عبر منصات مثل مينتيمتر للتصويت الفوري أو بادلت لوح الأفكار التشاركي مما يشجع المشاركين الخجولين على التعبير كتابياً أولاً."
    ],
    "strengths": [
      "تحول واضح في شخصيات طلاب كانوا انطوائيين إلى مشاركين فاعلين بعد أن وجدوا المجال الآمن والطريقة التي تناسبهم للتعبير كتابة أو رسم.",
      "تحسن ملموس في جودة الحوار والمناقشة حيث أصبح الطلاب يستمعون لبعضهم ويردون على أفكار بعض وليس فقط على سؤال المعلم.",
      "ازدياد نسبة الطلاب الذين يستعدون مسبقاً للحصة لأنهم يتوقعون أن يكونوا مشاركين فعالين وليس مجرد مستقبلين سلبيين للمعلومات.",
      "اكتشاف مواهب واهتمامات خفية للطلاب من خلال مشاركاتهم الحرة مما وفر للمعلم أفكاراً لأنشطة وإثراءات تلائم هذه الاهتمامات.",
      "تقليل العبء على المعلم في توليد كل الأفكار والإجابات حيث أصبح الفصل غنياً بأفكار الطلاب التي تثري المحتوى وتقدم زوايا نظر جديدة."
    ],
    "improve": [
      "الحرص على تدوير فرص المشاركة على جميع الطلاب وعدم تركها مسيطراً عليها من قبل مجموعة صغيرة من الطلاب النجوم المتحدثين دوماً.",
      "تطوير مهارات الطلاب في فنيات المشاركة البناءة مثل كيف تبدأ مداخلة وكيف تختلف بأدب وكيف تلخص فكرة زميلك قبل التعليق عليها.",
      "تخصيص وقت للمشاركات التطوعية والعفوية وليس فقط المشاركات الموجهة بأسئلة المعلم لقياس مدى استثمار الطلاب الحقيقي في الموضوع.",
      "معالجة مشكلة المشاركة السريعة وغير المدروسة لمجرد لفت الانتباه عبر تشجيع وقت التفكير الصامت قبل قبول أي إجابة.",
      "ربط المشاركة الشفهية بالمشاركة الإنتاجية ككتابة تقرير أو تصميم نموذج لضمان أن النقاش يؤدي إلى نتائج ملموسة وليس مجرد كلام."
    ],
    "recomm": [
      "جعل المشاركة الطلابية معياراً أساسياً في تقييم أداء الفصل وليس مجرد نشاط ترفيهي من خلال تضمينها في مؤشرات الأداء للطالب والمعلم.",
      "إنشاء سجل المشاركات البصري كمخطط يضاف إليه نجمة لكل مشاركة مفيدة لعرض تقدم المشاركة الجماعية وتحفيز الطلاب على المنافسة الإيجابية.",
      "تنظيم أسبوع المشاركة حيث يكون التركيز في جميع الحصص على إبداعات وآراء الطلاب وتكريم أكثر الفصول تفاعلاً والمشاركين تميزاً.",
      "إشراك الطلاب في تقييم جودة مشاركات بعضهم البعض بتوجيه من المعلم لتنمية الحس النقدي البناء لديهم وتعليمهم تقبل التقييم من الأقران.",
      "توثيق أفضل المشاركات الطلابية كمقاطع فيديو قصيرة أو نص مكتوب في أرشيف المدرسة أو على موقعها الإلكتروني بنماذج إلهام بإذن ولي الأمر."
     ]
   },
  "تقرير سجل الخطط العلاجية": {
    "goal": [
      "تصميم وتنفيذ خطط علاجية ممنهجة لمعالجة الفجوات التعليمية لدى الطلاب المتعثرين وتحسين مستوى إتقانهم للمهارات الأساسية.",
      "توفير تدخلات تعليمية مبكرة ومكثفة تراعي الفروق الفردية لضمان عدم تراكم الصعوبات وتعثر الطلاب في المراحل التعليمية اللاحقة.",
      "توثيق جهود العلاج ومتابعة تقدم الطلاب بشكل منهجي لتقييم فاعلية الاستراتيجيات المستخدمة وتعديلها بناءً على النتائج المتحققة.",
      "تمكين المعلم من تقديم دعم فردي أو جماعي موجّه بناءً على تشخيص دقيق لنقاط الضعف الخاصة بكل طالب أو مجموعة.",
      "إشراك أولياء الأمور في عملية العلاج من خلال إطلاعهم على الخطط ومستجدات تقدم أبنائهم وتعزيز التعاون لتحقيق النتائج المنشودة."
    ],
    "summary": [
      "تم إعداد وتنفيذ خطط علاجية لـ 15 طالباً في مادة الرياضيات تركزت على مهارات العمليات الحسابية الأساسية مع متابعة أسبوعية منتظمة.",
      "سجل الخطط العلاجية وثق بالتفصيل الأنشطة والاستراتيجيات المطبقة والتقدم المحرز لكل طالب مما سهل عملية التقييم والتطوير المستمر.",
      "أظهرت النتائج تحسناً ملحوظاً لدى 70% من الطلاب المستهدفين بعد تطبيق الخطة لمدة 8 أسابيع بمعدل جلستين أسبوعياً مكثفتين.",
      "تم تصميم خطط متنوعة تشمل علاجاً فردياً وجماعياً وأنشطة رقمية وتقليدية لتناسب أنماط التعلم المختلفة للطلاب المتعثرين بشكل فعال.",
      "ساهم السجل في خلق مسار واضح للعلاج وسهولة انتقال المعلومات بين المعلمين في حال تغيير الصف أو المدرسة أو المعلم."
    ],
    "steps": [
      "تشخيص دقيق لنقاط الضعف عبر اختبارات قبولية وتحليل أخطاء الطلاب في الاختبارات اليومية والتقويمات التشخيصية الشاملة والمتنوعة.",
      "تصميم خطة علاجية فردية لكل طالب تحدد المهارات المستهدفة والأنشطة والزمن والاستراتيجيات وأدوات القياس المناسبة للتقدم المرحلي.",
      "تنفيذ الجلسات العلاجية المخطط لها بانتظام مع تسجيل الملاحظات حول استجابة الطالب والصعوبات الطارئة أثناء التنفيذ الفعلي.",
      "تقييم دوري أسبوعي أو نصف شهري لقياس مدى التقدم باستخدام أدوات تقييم قصيرة ومتنوعة تركز على المهارات المستهدفة بدقة.",
      "تعديل الخطة بناءً على نتائج التقييمات الدورية وتوثيق التعديلات وإبلاغ ولي الأمر بالنتائج والتطورات الجديدة بانتظام."
    ],
    "strategies": [
      "التدريس المباشر والموجه للمهارات الأساسية مع تكرار الممارسة والتطبيق عبر أنشطة تدريجية تبدأ من السهل إلى الصعب بشكل متناسب.",
      "استخدام التعلم التعاوني بين الأقران حيث يشرك الطالب المتعثر مع زميل متقدم في أنشطة علاجية مصممة بدقة وتهدف للدعم المتبادل.",
      "توظيف الألعاب التعليمية والبرمجيات التفاعلية لجعل جلسات العلاج أكثر جاذبية وتخفيف القلق المرتبط بالصعوبات التعليمية المزمنة.",
      "تطبيق استراتيجية النمذجة حيث يقوم المعلم بعرض المهارة خطوة بخطوة ثم يمارسها الطالب تحت إشرافه المباشر والتوجيه المستمر.",
      "استخدام خرائط المفاهيم والمنظمات البيانية لمساعدة الطالب على ربط المعلومات الجديدة بمعارفه السابقة وتنظيمها بشكل منهجي."
    ],
    "strengths": [
      "وضوح وانتظام عملية المتابعة والتقييم مما أتاح رصد أدق لمسار تحسن كل طالب وتحديد اللحظة المناسبة لتعديل الخطة العلاجية.",
      "تنوع الأنشطة والمواد المستخدمة في العلاج مما ساهم في الحفاظ على دافعية الطلاب والتقليل من ملل الجلسات المتكررة بشكل كبير.",
      "فاعلية التواصل مع أولياء الأمور وإشراكهم الذي أدى إلى تعزيز الممارسة خارج المدرسة وتسريع وتيرة التحسن الملحوظ والملموس.",
      "مرونة الخطط وقابليتها للتعديل السريع بناءً على التغذية الراجعة اليومية مما جعلها تستجيب للاحتياجات الفعلية للطلاب بفعالية.",
      "توثيق شامل ودقيق سهل عملية نقل المعلومات بين المعلمين وساهم في استمرارية الدعم حتى مع تغير القائم على العلاج الأساسي."
    ],
    "improve": [
      "زيادة الموارد المخصصة للعلاج مثل المواد التعليمية الإضافية والألعاب التربوية وأجهزة الحاسوب اللوحية لدعم التنويع والجاذبية.",
      "تخصيص وقت أطول للتدريب المبدئي للمعلمين على تصميم وتنفيذ الخطط العلاجية وآليات التقويم الفعالة لها بشكل احترافي.",
      "تحسين آلية انتقاء وتصميم الأنشطة الرقمية العلاجية لضمان تركيزها على المهارة المستهدفة وليس الجانب الترفيهي فقط في التطبيق.",
      "تطوير نظام إلكتروني موحد لتسجيل ومتابعة الخطط العلاجية يسهل الوصول والمشاركة بين جميع المعنيين بالإشراف والتقييم.",
      "إجراء مقابلات دورية أكثر مع الطلاب المستهدفين لفهم تصورهم الذاتي للصعوبة وتقييمهم للفعالية العلاجية المقدمة لهم شخصياً."
    ],
    "recomm": [
      "الاستمرار في توحيد منهجية إعداد الخطط العلاجية على مستوى المدرسة مع ترك هامش للتخصيص حسب حالة كل طالب الفردية.",
      "تخصيص ساعة أسبوعية ثابتة في جدول المعلم لمتابعة وتقييم الخطط العلاجية لمنع تعارضها مع المهام الأخرى والأولويات.",
      "إنشاء بنك أنشطة وموارد علاجية مشترك بين معلمي المادة يمكن الاستفادة منه وتطويره بشكل تعاوني مستمر وممنهج.",
      "عقد ورش عمل دورية لأولياء الأمور لتدريبهم على كيفية دعم أبنائهم في المنزل باستخدام استراتيجيات بسيطة وفعالة ومناسبة.",
      "ربط نتائج الخطط العلاجية بمؤشرات أداء المدرسة وتقييم فاعليتها بشكل دوري كجزء من تقرير الجودة الشامل والمستمر."
    ]
  },

  "تقرير سجل رعاية الموهوبين": {
    "goal": [
      "تعريف الطلاب الموهوبين وتشخيص مواهبهم بدقة في مجالات متنوعة وتوفير بيئة داعمة تستثمر إمكاناتهم وتطورها باستمرار.",
      "تصميم برامج إثراء وتوسيع تلبي الاحتياجات التعليمية المتقدمة للطلاب الموهوبين وتتحدى قدراتهم العقلية والإبداعية بشكل مستمر.",
      "توفير فرص للطلاب الموهوبين للمشاركة في أنشطة ومشاريع تتجاوز المنهج العادي وتنمي مهارات القيادة والتفكير العليا المتقدمة.",
      "بناء شراكات مع مؤسسات المجتمع المحلي والمراكز المتخصصة لتوفير خبرات أعمق وموارد إضافية للطلاب الموهوبين المتميزين.",
      "تعزيز الوعي بخصائص واحتياجات الطلاب الموهوبين بين الهيئة التعليمية وأولياء الأمور لخلق نظام دعم متكامل حولهم."
    ],
    "summary": [
      "تم تعريف 12 طالباً موهوباً في مجالات مختلفة كالرياضيات والعلوم والخطابة وتم وضعهم تحت برنامج رعاية خاص طوال الفصل.",
      "نفذت مجموعة من حصص الإثراء الأسبوعية والأنشطة اللاصفية التي ركزت على المشاريع البحثية وحل المشكلات المعقدة والمتقدمة.",
      "شارك الطلاب الموهوبون في مسابقات علمية على مستوى المنطقة وحققوا مراكز متقدمة مما عزز ثقتهم وسمعة المدرسة التعليمية.",
      "سجل الرعاية وثق جميع الأنشطة والإنجازات وملاحظات التطور للطلاب مما شكل سيرة ذاتية مبكرة لإمكاناتهم المتميزة.",
      "أظهر التقييم النهائي تطوراً كبيراً في مهارات التفكير النقدي والإبداعي لدى الطلاب المستهدفين وزيادة في دافعيتهم للتعلم."
    ],
    "steps": [
      "التعرف على الطلاب الموهوبين عبر تطبيق مقاييس واختبارات مقننة وكذلك ملاحظات المعلمين وأولياء الأمور والإنجازات السابقة.",
      "تشكيل لجنة رعاية الموهوبين في المدرسة لوضع الرؤية والخطط السنوية ومتابعة التنفيذ وتقويم البرامج المقدمة بانتظام.",
      "تصميم برنامج إثراء فردي أو جماعي لكل طالب أو مجموعة حسب مجال الموهبة يتضمن أهدافاً واضحة وأنشطة محددة.",
      "تنفيذ أنشطة الإثراء داخل وخارج الصف الدراسي عبر حصص مخصصة ونوادي وأنشطة لاصفية وزيارات ومشاركات في مسابقات.",
      "التقييم المستمر لبرامج الرعاية عبر مقاييس التقدم الأكاديمي وتقارير المتابعة الشخصية وتقييمات الرضا من الطلاب وأولياء الأمور."
    ],
    "strategies": [
      "تسريع المنهج أو تعميقه عبر تقديم مفاهيم ومهارات من صفوف أعلى أو مناهج متقدمة تناسب سرعة تعلم الطالب الموهوب.",
      "التعلم القائم على المشاريع البحثية حيث يختار الطالب قضية يبحث عنها بعمق وينتج تقريراً أو نموذجاً أو عرضاً عنها.",
      "المناقشات السقراطية والحوارات الجدلية حول قضايا معقدة لتنمية مهارات التفكير النقدي والتحليلي والحجاج المنطقي المتقدم.",
      "برنامج المرشد والموجه حيث يربط الطالب الموهوب بمعلم مرشد أو خبير في المجتمع لتقديم الإرشاد والتوجيه المتخصص.",
      "التعلم الخدمي حيث يطبق الطالب موهبته في خدمة المجتمع المدرسي أو المحلي عبر مبادرات ومشاريع تطوعية هادفة."
    ],
    "strengths": [
      "تنوع أساليب الكشف عن الموهبة مما ساهم في التعرف على طلاب موهوبين في مجالات غير تقليدية كالفنون والقيادة.",
      "مرونة برامج الإثراء وقابليتها للتكيف مع اهتمامات الطلاب المتغيرة مما حافظ على استمرارية شغفهم وحماسهم للمشاركة.",
      "نجاح شراكات مع جامعات محلية ومراكز بحثية في تنظيم ورش عمل متخصصة للطلاب وفتح مختبراتها لهم خلال العطل.",
      "تطور ملحوظ في الثقة بالنفس والمهارات الاجتماعية للطلاب الموهوبين الذين كان بعضهم انطوائياً بسبب نقص الند المناسب.",
      "تحسين صورة المدرسة في المجتمع كمؤسسة تهتم بجميع فئات الطلاب وتستثمر في رأس المال البشري المتميز لديها."
    ],
    "improve": [
      "توسيع قاعدة الكشف عن الموهوبين ليشمل جميع الصفوف بشكل دوري وليس الاعتماد فقط على ترشيحات المعلمين التقليدية.",
      "توفير ميزانية مخصصة ومستقرة لبرامج رعاية الموهوبين لتغطية تكاليف المواد والمسابقات والرحلات والورش الخارجية.",
      "تدريب متخصص لجميع معلمي الصفوف على خصائص الموهوبين واستراتيجيات تدريسهم داخل الفصل العادي لضمان دعمهم اليومي.",
      "إنشاء مساحة مادية مناسبة (غرفة مصادر للموهوبين) مجهزة بأدوات وتقنيات متقدمة تدعم أنشطة الإبداع والبحث.",
      "تحسين آلية التواصل مع أولياء أمور الموهوبين لتقديم إرشاد تربوي متخصص يساعدهم على التعامل السليم مع موهبة ابنهم."
    ],
    "recomm": [
      "إدراج رعاية الموهوبين كأحد المحاور الأساسية في الخطة الإستراتيجية للمدرسة مع مؤشرات أداء قابلة للقياس.",
      "تطوير نظام حوافز وتكريم للمعلمين الذين يقدمون دعماً استثنائياً للطلاب الموهوبين أو يكتشفون مواهب جديدة.",
      "إنشاء شبكة تواصل بين الطلاب الموهوبين في المدرسة وخريجيها المتميزين ليكونوا نماذج يُحتذى بها ومصدر إلهام.",
      "توثيق ونشر قصص نجاح الطلاب الموهوبين إعلامياً (بموافقة أولياء الأمور) لتحفيز الآخرين والتعريف بجهود المدرسة.",
      "ربط برامج رعاية الموهوبين ببرامج التمكين ورأس المال البشري في رؤية المملكة 2030 لتعظيم أثرها الوطني."
    ]
  },

  "تقرير تفعيل المنصات التعليمية": {
    "goal": [
      "دمج المنصات التعليمية الرقمية في العملية التعليمية لتعزيز التفاعل وتنويع مصادر التعلم وتطوير المهارات الرقمية للطلاب.",
      "توسيع نطاق التعلم خارج جدران الفصل الدراسي وزمن الحصة من خلال توفير موارد رقمية يمكن الوصول إليها في أي وقت.",
      "تمكين المعلم من إنشاء فصول افتراضية وإدارة المحتوى التفاعلي ومتابعة أداء الطلاب فردياً وجماعياً بسهولة ومرونة.",
      "تطوير بيئة تعليمية تتسم بالتحديث والابتكار وجذب انتباه الجيل الرقمي عبر استخدام أدوات تعليمية تفاعلية حديثة.",
      "تسهيل التواصل المستمر بين المعلم والطلاب وأولياء الأمور وتوفير قنوات واضحة للمناقشة وتقديم الواجبات والتغذية الراجعة."
    ],
    "summary": [
      "تم تفعيل منصة مدرستي بشكل مكثف لجميع الصفوف حيث تم تحميل الدروس التفاعلية وإنشاء الواجبات والاختبارات الإلكترونية.",
      "استخدمت منصة نون للتواصل مع أولياء الأمور بشكل يومي ونشر الإعلانات والجدول الزمني ومتابعة الحضور والانصراف.",
      "أظهرت الإحصائيات نسبة دخول 95% من الطلاب على المنصة التعليمية وتفاعلاً مع 80% من الأنشطة المنشورة خلال الشهر.",
      "ساهم استخدام المنصة في تنظيم عملية التعلم عن بعد بشكل كامل خلال فترة التعليق الاضطراري للحضور المدرسي.",
      "تم تدريب جميع المعلمين والطلاب على استخدام المنصة الأساسية مما سهل عملية الانتقال للتعلم المدمج بسلاسة."
    ],
    "steps": [
      "اختيار المنصات التعليمية المناسبة للمرحلة الدراسية والمادة وتوافقها مع المنهج المحلي وحصولها على موافقة الجهات المختصة.",
      "توفير حسابات رسمية لجميع المستفيدين (معلمين، طلاب، أولياء أمور) وتدريبهم على أساسيات استخدام المنصة عبر ورش تدريبية.",
      "تحميل المحتوى التعليمي المناسب (دروس، عروض، فيديوهات، روابط) وتنظيمه في مسارات تعلم واضحة وسهلة التصفح.",
      "إنشاء الأنشطة التفاعلية والواجبات والاختبارات الإلكترونية عبر أدوات المنصة ومتابعة إنجاز الطلاب وتقديم التغذية الراجعة الفورية.",
      "تحليل التقارير الإحصائية التي تقدمها المنصة حول أداء الطلاب ومستوى التفاعل واستخدام البيانات في تحسين الممارسات التعليمية."
    ],
    "strategies": [
      "استخدام الفصول الافتراضية المباشرة (لايف) لعقد حصص تفاعلية ومناقشات حية مع الطلاب ومشاركة الشاشة والتطبيقات.",
      "تفعيل نظام المسارات التعليمية حيث ينتقل الطالب في رحلة تعلم ذاتية تحتوي على محتوى وأنشطة وتقييمات مرتبة تسلسلياً.",
      "استخدام أدوات التقييم المتنوعة في المنصة كالاختبارات ذاتية التصحيح والواجبات القصيرة والمشاريع الجماعية عبر مجموعات المناقشة.",
      "توظيف أدوات التعلم النشط الموجودة في المنصات مثل جدار المناقشة (Padlet) والاستبيانات التفاعلية والعصف الذهني الرقمي.",
      "دمج عناصر التحفيز والتشجيع عبر نظام النقاط والشارات واللوائح التقديرية (Leaderboards) لتحفيز التنافس الإيجابي بين الطلاب."
    ],
    "strengths": [
      "زيادة كبيرة في تفاعل ودافعية الطلاب للتعلم بسبب عنصر الجدة والتشويق والتقنية التي تلامس اهتماماتهم اليومية.",
      "تحسن في مهارات الطلاب الرقمية والبحثية والإدارة الذاتية للتعلم نتيجة الاعتماد الجزئي على التعلم الذاتي عبر المنصة.",
      "مرونة الوصول للمحتوى التعليمي مما ساعد الطلاب الغائبين أو ذوي الظروف الخاصة على اللحاق بزملائهم بسهولة.",
      "تطوير أداء المعلمين التقني وتحسين مهاراتهم في إدارة المحتوى الرقمي وتصميم الأنشطة التفاعلية والإلكترونية.",
      "توفير كم هائل من البيانات والتحليلات عن أداء كل طالب سهل عملية التقييم التشخيصي والتكويني واتخاذ القرارات التعليمية."
    ],
    "improve": [
      "تحسين البنية التحتية التقنية للمدرسة وتمكين جميع الطلاب من الوصول لأجهزة واتصال إنترنت مناسب في منازلهم.",
      "توفير محتوى عربي تفاعلي أكثر جودة وتنوعاً على المنصات يتوافق مع المناهج المحلية ويلبي احتياجات الطلاب المختلفة.",
      "تدريب متقدم للمعلمين على استراتيجيات التدريس الفعالة في البيئة الرقمية وليس فقط على الجانب التقني لتشغيل المنصة.",
      "تطوير سياسات واضحة لحماية خصوصية بيانات الطلاب على المنصات الرقمية وضمان الاستخدام الآمن والإيجابي للتقنية.",
      "إشراك أولياء الأمور بشكل أكبر في عملية متابعة أبنائهم عبر المنصة وتدريبهم على فهم التقارير والمؤشرات المتوفرة."
    ],
    "recomm": [
      "الاستمرار في نموذج التعلم المدمج الذي يجمع بين التعليم الحضوري والتعليم عبر المنصات كنهج مستدام وليس مؤقتاً.",
      "إنشاء فريق دعم فني وتعليمي داخل المدرسة لمساعدة المعلمين والطلاب في حل المشكلات الفنية التي تواجههم على المنصة.",
      "تشجيع المعلمين المبدعين في استخدام المنصات على مشاركة تجاربهم وأفضل ممارساتهم مع زملائهم عبر ورش داخلية.",
      "ربط تفعيل المنصات التعليمية بمشروع التحول الرقمي الشامل للمدرسة وجعله جزءاً من تقييم الأداء المؤسسي السنوي.",
      "استكشاف وتجربة منصات وتطبيقات تعليمية جديدة وواعدة بشكل دوري لتطوير الأدوات المستخدمة ومواكبة التطور التقني."
    ]
  },

  "تقرير المجتمعات المهنية": {
    "goal": [
      "تنمية الممارسة المهنية للمعلمين عبر تبادل الخبرات والبحث التربوي المشترك داخل مجتمعات تعلم مهنية منتظمة وفعالة.",
      "تحسين نواتج تعلم الطلاب من خلال تحليل الممارسات الصفية وتطوير استراتيجيات تدريسية مبتكرة بناءً على البيانات والأدلة.",
      "بناء ثقافة التعاون المهني بين أعضاء الهيئة التعليمية وتقوية الشعور بالانتماء للمؤسسة والمسؤولية الجماعية تجاه جودة التعليم.",
      "تطوير الكفايات المهنية للمعلمين بشكل مستمر عبر مناقشة التحديات التعليمية وإيجاد حلول عملية قابلة للتطبيق في الفصول الدراسية.",
      "تحقيق التطوير المدرسي المستدام من خلال تمكين المعلمين من القيادة والتأثير في بيئة العمل وتحسين المناخ التنظيمي الإيجابي."
    ],
    "summary": [
      "عقد 8 لقاءات مهنية شهرية ناقشت تحليل نتائج الطلاب وتبادلت أفضل الممارسات التعليمية بين معلمي المواد المختلفة.",
      "تم تشكيل 4 مجتمعات مهنية حسب التخصصات الدراسية وركزت كل منها على تطوير جانب محدد من العملية التعليمية.",
      "نجحت المجتمعات في إنتاج 12 أداة تقييمية مشتركة و6 خطط علاجية موحدة لمعالجة الصعوبات الأكاديمية الشائعة.",
      "ساهم العمل الجماعي في رفع الكفاءة المهنية وتقليل الوقت المهدور في إعداد المواد التعليمية والأنشطة الصفية.",
      "انعكست نتائج المجتمعات المهنية إيجابياً على أداء الطلاب حيث سجلت نسبة النجاح تحسناً ملحوظاً في المواد المستهدفة."
    ],
    "steps": [
      "تشكيل المجتمعات المهنية وفق معايير محددة كالتخصص أو الاهتمام المشترك أو التحدي التعليمي المشترك وتحديد القائد والمقرر.",
      "وضع جدول أعمال سنوي وأجندة لكل لقاء مع تحديد الموضوعات والمخرجات المتوقعة ومؤشرات النجاح مسبقاً.",
      "تنفيذ اللقاءات وفق نماذج عمل منظمة تبدأ بعرض المشكلة أو التحدي ثم مناقشة جماعية وتنتهي بخطة عمل محددة.",
      "توثيق أعمال المجتمعات المهنية في سجلات خاصة وتسجيل الحضور والقرارات والتوصيات والمهام الموكلة لكل عضو.",
      "متابعة تنفيذ مخرجات اللقاءات وتقييم أثرها على الممارسة الصفية ونواتج التعلم بشكل دوري ومنظم."
    ],
    "strategies": [
      "استخدام استراتيجية دراسة الدروس اليابانية (Lesson Study) حيث يخطط المعلمون درساً مشتركاً ويشاهدون تنفيذه ويناقشونه.",
      "تحليل نماذج من أعمال الطلاب (Student Work Analysis) بشكل جماعي للكشف عن الأنماط والمفاهيم الخاطئة وتطوير استجابات علاجية.",
      "تبادل الزيارات الصفية بين أعضاء المجتمع المهني وتقديم تغذية راجعة بناءة تركز على التحسين وليس التقييم فقط.",
      "عقد جلسات العصف الذهني لابتكار حلول إبداعية للتحديات التعليمية واستخدام أدوات التفكير التصميمي في حل المشكلات.",
      "القراءة المهنية المشتركة ومناقشة المقالات والكتب التربوية الحديثة وتطبيق ما يتناسب منها مع السياق المحلي."
    ],
    "strengths": [
      "تحول ثقافة العمل من الفردية إلى الجماعية وزيادة التماسك والروح المعنوية بين أعضاء الهيئة التعليمية.",
      "تطوير قدرات البحث الإجرائي لدى المعلمين ومهارات التحليل النقدي للممارسات التعليمية بناءً على الأدلة والبيانات.",
      "خفض الشعور بالعزلة المهنية خاصة لدى المعلمين الجدد وتوفير بيئة داعمة للإرشاد والتطوير المستمر.",
      "إنتاج موارد وممارسات تعليمية عالية الجودة نتيجة الجهد الجماعي والتنقيح المتكرر والخبرات المتنوعة.",
      "زيادة فاعلية البرامج التدريبية من خلال مناقشة تطبيقها على أرض الواقع واستخلاص الدروس المستفادة بشكل جماعي."
    ],
    "improve": [
      "تخصيص وقت كافٍ ومحمي ضمن جدول المعلمين للقاءات المجتمعات المهنية لضمان الانتظام وعدم التأثر بالأعباء الأخرى.",
      "توفير موارد ومصادر بحثية حديثة باللغة العربية لدعم عملية القراءة المهنية والاطلاع على التجارب العالمية.",
      "تدريب قادة المجتمعات المهنية على مهارات إدارة المجموعات وتيسير الحوار البناء وتوجيه النقاش نحو نتائج ملموسة.",
      "ربط مخرجات المجتمعات المهنية بشكل أكثر فاعلية بعملية التطوير المدرسي الشامل وخطة التحسين المستمر.",
      "تفعيل استخدام التقنية في عقد بعض اللقاءات افتراضياً لزيادة المرونة وتسهيل المشاركة لجميع الأعضاء."
    ],
    "recomm": [
      "إدراج المشاركة الفعالة في المجتمعات المهنية كمعيار في تقييم الأداء الوظيفي للمعلمين وتقديم حوافز معنوية للمتميزين.",
      "توسيع مفهوم المجتمعات المهنية ليشمل شراكات بين المدارس لتبادل الخبرات والتعلم من الممارسات الناجحة في مدارس أخرى.",
      "إنشاء منصة رقمية أو مجتمع افتراضي للمعلمين لمشاركة الموارد والأفكار والاستمرار في النقاش بين اللقاءات الرسمية.",
      "عقد ملتقى نصف سنوي لعرض أفضل ممارسات المجتمعات المهنية ونشر النتائج الإيجابية على مستوى الإدارة التعليمية.",
      "ربط أعمال المجتمعات المهنية بأهداف رؤية المملكة 2030 في تطوير رأس المال البشري ورفع كفاءة المؤسسات التعليمية."
    ]
  },

  "تقرير الورش التدريبية التي قدمتها": {
    "goal": [
      "تنمية الكفايات المهنية والمهارات العملية للمعلمين والطلاب من خلال تقديم برامج تدريبية مكثفة وهادفة تلبي الاحتياجات الحقيقية.",
      "تحديث المعرفة التربوية ومواكبة أحدث الاتجاهات في الاستراتيجيات التدريسية والتقنيات التعليمية والتطبيقات العملية المبتكرة.",
      "تعزيز قدرة المتدربين على تطبيق المهارات المكتسبة مباشرة في سياقاتهم العملية لتحسين الأداء ورفع مستوى الإنتاجية.",
      "بناء ثقافة التعلم المستمر داخل المؤسسة التعليمية وتحفيز الأفراد على التطوير الذاتي وتبادل المعرفة بين الزملاء.",
      "توفير فرص للتأهيل والتمكين المهني تساهم في تحقيق التطور الوظيفي للأفراد وتحسين جودة المخرجات التعليمية بشكل عام."
    ],
    "summary": [
      "قدمت 5 ورش تدريبية خلال الفصل الدراسي استهدفت 75 معلماً و30 طالباً في مجالات التقنية والقيادة والتعلم النشط.",
      "حظيت ورشة التعليم المدمج بتفاعل كبير حيث طبق المشاركون استراتيجيات مباشرة في فصولهم وشهدوا تحسناً في تفاعل الطلاب.",
      "تم تقييم الورش بتغذية راجعة إيجابية جداً حيث بلغ متوسط رضا المشاركين 4.7 من 5 في استبيانات التقييم الشاملة.",
      "ساهمت الورش في اكتشاف مواهب تدريبية جديدة من بين المعلمين الذين شاركوا كمدربين مساعدين في برامج لاحقة.",
      "نتج عن الورش تطوير 15 خطة درس جديدة وتصميم 8 أنشطة تفاعلية تم تطبيقها بنجاح في الفصول الدراسية."
    ],
    "steps": [
      "تحليل الاحتياجات التدريبية عبر استبيانات وملاحظات ومقابلات مع المعلمين والطلاب لتحديد الفجوات والمجالات الأكثر أهمية.",
      "تصميم محتوى الورشة التدريبية بما يتناسب مع الاحتياجات مع مراعاة التنوع في أساليب العرض والتطبيق العملي.",
      "التحضير اللوجستي الكامل للورشة من حيث القاعة والتجهيزات التقنية والمواد التدريبية وشهادات الحضور.",
      "تنفيذ الورشة باستخدام استراتيجيات تفاعلية تجمع بين العرض النظري والتطبيق العملي والعمل الجماعي والمناقشات.",
      "تقييم أثر الورشة عبر استبيانات رضا مباشرة ومتابعة تطبيق المهارات بعد فترة زمنية مناسبة لقياس التحسن الفعلي."
    ],
    "strategies": [
      "التدريب العملي القائم على المهام حيث ينخرط المتدربون في حل مشكلات حقيقية من سياق عملهم اليومي.",
      "استخدام نموذج التعلم من الأقران حيث يقوم المتدربون بتدريب بعضهم البعض تحت إشراف المدرب الرئيسي.",
      "تمثيل الأدوار والمحاكاة لممارسة المهارات في بيئة آمنة تشبه الواقع الفعلي ولكن بدون مخاطرة حقيقية.",
      "التدريب التبادلي حيث يقدم المدرب توجيهاً فردياً ومتابعة مستمرة للمتدربين أثناء وبعد الورشة.",
      "التعلم القائم على المشاريع حيث ينتج المتدربون مشروعاً عملياً قابل للتطبيق كشرط لإكمال البرنامج التدريبي."
    ],
    "strengths": [
      "ارتباط محتوى التدريب المباشر بالاحتياجات العملية للمشاركين مما زاد من فاعليته واهتمامهم بالتطبيق الفوري.",
      "تنوع أساليب التدريب وعناصر التشويق التي أبقت على انتباه المشاركين وحماسهم طوال مدة الورشة.",
      "كفاءة المدربين وقدرتهم على التكيف مع مستويات المشاركين المختلفة وتقديم أمثلة من البيئة التعليمية المحلية.",
      "جودة المواد التدريبية المقدمة سواء المطبوعة أو الرقمية والتي أصبحت مرجعاً للمشاركين بعد انتهاء الورشة.",
      "نجاح الورش في خلق شبكات تواصل بين المشاركين استمرت في تبادل الخبرات والدعم بعد انتهاء الفعالية."
    ],
    "improve": [
      "تخصيص وقت أطول للتطبيق العملي والتمارين داخل الورشة وتقليل وقت المحاضرة النظرية إلى الحد الأدنى.",
      "توفير فرص تدريبية أكثر تخصصاً وفردية للمعلمين ذوي الاحتياجات الخاصة أو الذين يعملون في مجالات نادرة.",
      "تحسين آلية المتابعة بعد الورشة لضمان تطبيق المهارات ودعم المتدربين عند مواجهة التحديات في التطبيق.",
      "توسيع نطاق المشاركة ليشمل فئات أخرى من كادر المدرسة كالإداريين والفنيين لتعزيز العمل الجماعي.",
      "تطوير نظام إلكتروني لإدارة التدريب وتتبع حضور المتدربين وتقييمهم وتوثيق الشهادات بشكل مركزي."
    ],
    "recomm": [
      "الاستمرار في عقد ورش تدريبية دورية مع تحديث محتواها باستمرار لمواكبة المستجدات التربوية والتقنية.",
      "إنشاء بنك للتدريب داخل المدرسة يحتوي على تسجيلات للورش السابقة وعروضها التقديمية لتعميم الفائدة.",
      "تفعيل نظام المدرب الداخلي حيث يتم تأهيل معلمين متميزين لتدريب زملائهم وتقليل الاعتماد على المدربين الخارجيين.",
      "ربط البرامج التدريبية بخطط التطوير الوظيفي للمعلمين وجعلها شرطاً للترقية أو المشاركة في برامج التميز.",
      "توسيع نطاق الورش لتشمل أولياء الأمور في مواضيع تتعلق بتربية الأبناء ودعمهم تعليمياً لتعزيز الشراكة."
    ]
  },

  "تقرير الإشراف اليومي": {
    "goal": [
      "ضمان سير العملية التعليمية اليومية بانتظام وفاعلية وفق المعايير المحددة وتحقيق الأهداف التعليمية المخطط لها.",
      "مراقبة وتقويم الأداء اليومي للطلاب والمعلمين وتقديم الدعم والتوجيه اللازم لتحسين الممارسات التعليمية والتعلمية.",
      "المحافظة على الانضباط المدرسي والالتزام باللوائح والأنظمة لخلق بيئة تعليمية آمنة ومنظمة ومحفزة للتعلم.",
      "رصد الاحتياجات الفورية للمدرسة والمعلمين والطلاب والعمل على تلبيتها أو رفعها للإدارة العليا لاتخاذ الإجراءات.",
      "توثيق الملاحظات اليومية والأحداث المهمة لتكوين قاعدة بيانات تساعد في التخطيط المستقبلي واتخاذ القرارات."
    ],
    "summary": [
      "تم تنفيذ جولات إشرافية يومية شاملة لجميع الفصول والمرافق المدرسية مع تسجيل الملاحظات في سجل خاص.",
      "ركز الإشراف على مراقبة تفاعل الطلاب وجودة شرح المعلمين والالتزام بالخطة الدراسية والأنظمة المدرسية.",
      "تم رصد 15 حالة إيجابية لمعلمين متميزين و10 حالات تحتاج تحسيناً وتم مناقشتها مع المعنيين بشكل بنّاء.",
      "ساهم الإشراف المنتظم في خفض نسبة الغياب والتأخر لدى الطلاب وتحسين مستوى النظافة والنظام العام.",
      "تم التعامل مع 8 حالات طارئة أثناء الفسح بسرعة وحرفية مما ضمن سلامة الطلاب واستمرارية اليوم الدراسي."
    ],
    "steps": [
      "التخطيط المسبق للجولات الإشرافية اليومية وتحديد الأماكن والجوانب المراد التركيز عليها في كل يوم.",
      "التنفيذ الفعلي للجولات في أوقات مختلفة من اليوم الدراسي (بداية، أثناء الحصص، الفسح، نهاية اليوم).",
      "التواصل المباشر مع المعلمين والطلاب أثناء الجولات لتقديم التغذية الراجعة الفورية والدعم الميداني.",
      "تسجيل الملاحظات الإيجابية والسلبية بدقة في السجل الإشرافي مع تحديد مواعيد المتابعة والتقييم.",
      "رفع تقرير يومي موجز لإدارة المدرسة يتضمن أبرز الملاحظات والتوصيات والإجراءات المتخذة."
    ],
    "strategies": [
      "الإشراف التطويري الذي يركز على الدعم والتدريب بدلاً من النقد والمساءلة فقط لتحسين الأداء المستمر.",
      "الإشراف بالمشاركة حيث يدخل المشرف الفصل ليس كمراقب فقط بل كمشارك في النشاط التعليمي لدعم المعلم.",
      "استخدام قوائم المراقبة المعدة مسبقاً لضمان شمولية التقييم وموضوعية التسجيل والملاحظات الدقيقة.",
      "عقد لقاءات قصيرة (خلال 5 دقائق) مع المعلمين بعد الحصة لمناقشة أبرز النقاط الإيجابية ونقطة تحسين واحدة.",
      "تفعيل الإشراف الزمري حيث يقوم مجموعة من المشرفين بزيارة فصل واحد ثم مناقشة ملاحظاتهم بشكل جماعي."
    ],
    "strengths": [
      "الانتظام والاستمرارية في الإشراف اليومي مما خلق جوّاً من الانضباط والجدية لدى جميع أطراف العملية التعليمية.",
      "الموضوعية في التسجيل والتركيز على الأدلة والوقائع الملموسة بدلاً من الانطباعات الشخصية في التقييم.",
      "سرعة الاستجابة للمشكلات والتدخل الفوري لحلها مما منع تفاقمها وأثر إيجابياً على سير اليوم الدراسي.",
      "بناء علاقات إيجابية بين المشرفين والمعلمين والطلاب قائمة على الاحترام المتبادل والرغبة في التحسين.",
      "توفير بيانات غنية ودقيقة ساهمت في اتخاذ قرارات إدارية وتعليمية مستنيرة لصالح تطوير المدرسة."
    ],
    "improve": [
      "توزيع المهام الإشرافية بشكل أكثر عدالة بين المشرفين لتغطية جميع الجوانب دون تركيز على جوانب محددة.",
      "تدريب المشرفين على مهارات التواصل الفعال والتغذية الراجعة البناءة لضمان تحقيق الفائدة القصوى من الزيارة.",
      "تطوير أدوات إلكترونية لتسجيل الملاحظات الإشرافية تسهل عملية التخزين والاسترجاع والتحليل الإحصائي.",
      "زيادة التركيز على الإشراف في أوقات الفسح والنشاط والأنشطة اللاصفية التي غالباً ما تكون أقل تغطية.",
      "إشراك المعلمين في عملية التقييم الذاتي لأدائهم قبل الزيارة الإشرافية لتعزيز مفهوم المسؤولية المشتركة."
    ],
    "recomm": [
      "الاستمرار في النهج التطويري للإشراف مع التركيز على تمكين المعلمين ودعمهم ليكونوا قادة للتغيير في فصولهم.",
      "تنويع أساليب الإشراف لتشمل الزيارات الصديقة وتبادل الزيارات بين المعلمين تحت مظلة الإشراف التربوي.",
      "ربط نتائج الإشراف اليومي ببرامج التطوير المهني الفردية والجماعية للمعلمين لتحقيق أقصى استفادة.",
      "عقد اجتماع أسبوعي لفريق الإشراف لمناقشة الملاحظات المتكررة ووضع خطط التحسين المشتركة والمبادرات التطويرية.",
      "توثيق ونشر الممارسات الإيجابية التي يتم رصدها خلال الإشراف لتعميم الفائدة وتحفيز التنافس الإيجابي."
    ]
  },

  "تقرير الاحتفال باليوم الوطني": {
    "goal": [
      "تعزيز قيم الانتماء والمواطنة والاعتزاز بالهوية الوطنية لدى الطلاب من خلال فعاليات احتفالية تثقيفية وترفيهية هادفة.",
      "إبراز منجزات الوطن ومسيرته التنموية وتاريخه العريق لتعميق الشعور بالفخر الوطني والولاء للقيادة الرشيدة.",
      "تنمية المهارات الاجتماعية والقيادية لدى الطلاب عبر إشراكهم في التخطيط والتنفيذ للفعاليات والأنشطة الاحتفالية.",
      "توثيق الروابط بين المدرسة والمجتمع المحلي من خلال دعوة الأهالي والمؤسسات للمشاركة في احتفالات اليوم الوطني.",
      "خلق ذكريات إيجابية وجو احتفالي مميز يعزز الشعور بالسعادة والانتماء لدى جميع منسوبي المدرسة."
    ],
    "summary": [
      "نظمت المدرسة احتفالاً كبيراً بمناسبة اليوم الوطني 92 شارك فيه جميع الطلاب والمعلمين وأولياء الأمور.",
      "تضمن الاحتفال معرضاً للتراث وعروضاً فنية ولوحات استعراضية ومسابقات ثقافية عن تاريخ المملكة وإنجازاتها.",
      "نجح الطلاب في تقديم عروض متميزة تجسد الوحدة الوطنية وقصة التأسيس ورؤية 2030 بشكل إبداعي مؤثر.",
      "حظي الاحتفال بتغطية إعلامية محلية وتفاعل كبير على منصات التواصل الاجتماعي الخاصة بالمدرسة.",
      "غرس الاحتفال قيماً وطنية عميقة وخلق جوّاً من البهجة والفخر الوطني بين جميع المشاركين والحضور."
    ],
    "steps": [
      "تشكيل لجنة تنظيمية للاحتفال من المعلمين والطلاب لوضع الرؤية العامة وتوزيع المهام والمسؤوليات.",
      "وضع خطة زمنية مفصلة للتحضيرات تشمل التدريبات وإعداد الديكورات والاستعدادات اللوجستية والأمنية.",
      "تنفيذ سلسلة من الفعاليات التمهيدية في الأسبوع الوطني مثل المسابقات والإذاعات الصباحية واللوحات الفنية.",
      "إقامة الحفل الرئيسي في اليوم الوطني بحضور جميع الطلاب والهيئة التعليمية وضيوف من أولياء الأمور.",
      "توثيق الفعاليات عبر الصور والفيديوهات وإعداد تقرير شامل عن الاحتفال ونشره عبر قنوات المدرسة المختلفة."
    ],
    "strategies": [
      "إشراك الطلاب في جميع مراحل التخطيط والتنفيذ بما يتناسب مع أعمارهم وقدراتهم لتعزيز الشعور بالملكية.",
      "دمج التعلم بالاحتفال عبر تصميم أنشطة تعليمية مرتبطة بالمنهج الدراسي وتركز على القيم والهوية الوطنية.",
      "استخدام الفنون المختلفة (المسرح، الرسم، الإنشاد، الرقص الشعبي) كوسائل للتعبير عن المشاعر الوطنية.",
      "تنظيم مسابقات تنافسية بين الفصول في مجالات البحث والتعبير الفني عن موضوعات وطنية لتحفيز الإبداع.",
      "تعزيز الشراكة المجتمعية عبر دعوة مؤسسات حكومية وأهلية للمشاركة في الفعاليات أو رعاية بعض أنشطتها."
    ],
    "strengths": [
      "مشاركة شاملة ومميزة من جميع فئات المدرسة تعكس روح العمل الجماعي والانسجام في تحقيق هدف مشترك.",
      "تنوع الفعاليات وثراؤها مما لامس اهتمامات وقدرات جميع الطلاب وأتاح لكل طالب فرصة للمشاركة والإبداع.",
      "الاستفادة من الاحتفال كفرصة تعليمية حقيقية حيث تعلم الطالب عن تاريخ بلاده بطريقة مشوقة غير مباشرة.",
      "نجاح التنظيم والإدارة مما أدى لسير الفعاليات بسلاسة وانتظام في ظل حضور كبير وتنوع في الأنشطة.",
      "الأثر الإيجابي الكبير على المشاعر الوطنية والروح المعنوية لمنسوبي المدرسة والذي استمر لأيام بعد الاحتفال."
    ],
    "improve": [
      "زيادة الميزانية المخصصة للاحتفال لتوفير احتياجات أكثر إبداعاً وتنوعاً في الديكور والملابس التراثية.",
      "بدء التحضيرات في وقت أبكر لضمان تدريب أفضل للطلاب وإتقان أكبر في العروض المقدمة.",
      "توسيع دائرة المشاركة المجتمعية بدعوة شخصيات وطنية مؤثرة أو رموز من المجتمع للمشاركة في الفعالية.",
      "تحسين عملية التوثيق الاحترافي للفعاليات بإشراك مصورين محترفين لتوثيق أفضل اللحظات بجودة عالية.",
      "إعداد برنامج خاص لأولياء الأمور خلال الاحتفال يشمل أنشطة تفاعلية تزيد من ارتباطهم بالمدرسة."
    ],
    "recomm": [
      "الاستمرار في الاحتفال باليوم الوطني كتقليد سنوي ثابت مع تطويره وإضافة عناصر إبداعية جديدة كل عام.",
      "إنشاء أرشيف رقمي لاحتفالات المدرسة باليوم الوطني على موقع المدرسة الإلكتروني لعرض إبداعات الطلاب.",
      "ربط احتفالات اليوم الوطني بمناهج التربية الاجتماعية والوطنية لتعميق الفهم وربط المعرفة بالمشاعر.",
      "تكريم الطلاب والمعلمين الأكثر تميزاً في الاحتفال وتوثيق مشاركاتهم في سجلات الأنشطة الطلابية.",
      "توظيف الطاقة الإيجابية للاحتفال في تعزيز السلوكيات الإيجابية والقيم الوطنية في الحياة المدرسية اليومية."
    ]
  },

  "تقرير المبادرات والابتكار": {
    "goal": [
      "تحفيز التفكير الإبداعي والابتكاري لدى منسوبي المدرسة وتشجيع تقديم أفكار وحلول جديدة لتطوير العمل التعليمي.",
      "معالجة تحديات وتطوير فرص في البيئة المدرسية عبر مبادرات مبتكرة قابلة للتطبيق وذات أثر ملموس ومستدام.",
      "بناء ثقافة الابتكار المؤسسي داخل المدرسة وجعلها سمة دائمة في ممارساتها التعليمية والإدارية على جميع المستويات.",
      "توفير بيئة داعمة ومحفزة لتجريب الأفكار الجديدة وتقديم الدعم اللازم لتحويلها إلى مشاريع واقعية ناجحة.",
      "الارتقاء بجودة الخدمات التعليمية والمخرجات عبر تبني أفضل الممارسات الابتكارية المحلية والعلمية المناسبة للسياق."
    ],
    "summary": [
      "تم إطلاق 7 مبادرات ابتكارية خلال العام الدراسي تراوحت بين تطوير أكاديمي وتحسين بيئي وتقني وإداري.",
      "حصلت مبادرة الفصل الذكي على المركز الأول في مسابقة الابتكار على مستوى الإدارة التعليمية.",
      "ساهمت مبادرة المعلم الباحث في إنتاج 5 أبحاث إجرائية طبق نتائجها مباشرة في تحسين الممارسات الصفية.",
      "نجحت مبادرة الفسحة الإيجابية في خفض المشكلات السلوكية أثناء الفسح بنسبة 60% خلال فصل دراسي.",
      "تم توثيق ونشر جميع المبادرات في دليل خاص بالمدرسة وتبادلها مع مدارس أخرى لتعميم الفائدة."
    ],
    "steps": [
      "تشجيع تقديم أفكار المبادرات من جميع منسوبي المدرسة عبر نماذج مقترحة ومنصات اقتراح مفتوحة.",
      "فرز وتقييم الأفكار المقدمة وفق معايير واضحة كالأثر والتكلفة والقابلية للتطبيق والابتكار.",
      "تكوين فر عمل لكل مبادرة موافق عليها مع تحديد قائد وميزانية وخطة زمنية واضحة للتنفيذ.",
      "تنفيذ المبادرة وفق الخطة مع المرونة في التعديل بناءً على التغذية الراجعة والتقييم المستمر.",
      "تقييم أثر المبادرة بعد فترة زمنية كافية وتوثيق النتائج والدروس المستفادة ونشر النجاحات."
    ],
    "strategies": [
      "عقد حلقات عصف ذهني ومنافسات لأفضل فكرة ابتكارية مع تقديم جوائز رمزية للمبادرات الفائزة.",
      "تبني منهجية التصميم التفكيري في تطوير المبادرات بدءاً من التعاطف وحتى النموذج الأولي.",
      "إنشاء حاضنة أو مسرعة أعمال مصغرة داخل المدرسة لدعم وتحويل الأفكار إلى مشاريع قابلة للتنفيذ.",
      "الشراكة مع مؤسسات الابتكار الخارجية كمراكز الابتكار في الجامعات أو شركات التقنية للاستفادة من خبراتها.",
      "تفعيل مفهوم اليوم المفتوح للابتكار حيث يقدم الطلاب والمعلمون مشاريعهم الابتكارية في معرض مفتوح."
    ],
    "strengths": [
      "تنوع مصادر الأفكار الابتكارية من طلاب ومعلمين وإداريين مما أظهر ثراء في وجهات النظر والخبرات.",
      "الدعم الإداري الكبير للمبادرات وتذليل العقبات الإجرائية والمالية التي تواجهها مما ساعد في نجاحها.",
      "المرونة في تجريب الأفكار وتقبل الفشل كجزء من عملية التعلم مما شجع على الجرأة في الابتكار.",
      "الأثر الإيجابي المباشر لمعظم المبادرات على تحسين البيئة التعليمية ورفع كفاءة العمليات المدرسية.",
      "نجاح بعض المبادرات في خلق مصادر دخل إضافية للمدرسة أو توفير في النفقات من خلال حلول مبتكرة."
    ],
    "improve": [
      "تطوير نظام أكثر موضوعية وشفافية لتقييم الأفكار المقدمة واختيار الأفضل منها للتنفيذ.",
      "زيادة الميزانية المخصصة لدعم المبادرات الابتكارية وخاصة تلك التي تتطلب تجهيزات تقنية متقدمة.",
      "تدريب منسوبي المدرسة على مهارات الابتكار وتنمية التفكير الإبداعي وأساليب حل المشكلات بطريقة ابتكارية.",
      "تحسين آلية قياس أثر المبادرات على المدى الطويل وليس فقط التقييم المباشر بعد التنفيذ.",
      "تعزيز التواصل مع مبادرات مماثلة في مدارس أخرى لتبادل الخبرات وتجنب تكرار الجهود."
    ],
    "recomm": [
      "إدراج الابتكار كمحور أساسي في الخطة الإستراتيجية للمدرسة مع تخصيص مؤشرات أداء لقياسه.",
      "إنشاء فريق ابتكار دائم في المدرسة مكلف بمتابعة ودعم جميع المبادرات والتواصل مع الجهات الداعمة.",
      "توثيق جميع المبادرات في قاعدة بيانات إلكترونية تسهل البحث فيها والاستفادة منها في المستقبل.",
      "ربط المبادرات الابتكارية الناجحة ببرامج التطوير الوظيفي والتقدير للمشاركين فيها كحافز مستمر.",
      "فتح قنوات للتعاون مع القطاع الخاص لدعم وتبني المبادرات المتميزة وتطويرها على نطاق أوسع."
    ]
  },

  "تقرير حل مشكلة تربوية": {
    "goal": [
      "تشخيص المشكلات التربوية بدقة وتحليل أسبابها الجذرية وتطوير حلول عملية وفعالة لمعالجتها ومنع تكرارها.",
      "تحسين البيئة التعليمية والصحية النفسية للطلاب والمعلمين من خلال معالجة المشكلات التي تعيق العملية التعليمية.",
      "تعزيز مهارات حل المشكلات لدى الكادر التعليمي والإداري وتبني منهجية علمية في التعامل مع التحديات اليومية.",
      "توفير إطار عمل منظم لمعالجة المشكلات يضمن المشاركة والشفافية والعدالة في اتخاذ القرارات.",
      "تحقيق استقرار العملية التعليمية وضمان استمراريتها بجودة عالية عبر التعامل الاستباقي مع المشكلات المحتملة."
    ],
    "summary": [
      "تم تشخيص ومعالجة مشكلة تدني مستوى الطلاب في مهارات القراءة في الصفوف الأولية عبر برنامج متكامل.",
      "عولجت مشكلة التأخر الصباحي المزمن لدى 20% من الطلاب عبر تطبيق نظام تحفيزي وحوافز جماعية وفردية.",
      "تم حل مشكلة النزاعات بين الطلاب أثناء الفسح عبر تفعيل برنامج أصدقاء الفسحة وإشراك الطلاب في الإشراف.",
      "تعاملت المدرسة مع مشكلة عزوف أولياء الأمور عن الاجتماعات عبر تحويلها لورش تفاعلية واستخدام منصات رقمية.",
      "تم رفع تقرير مفصل عن كل مشكلة وطريقة حلها وأثر الحل ليكون مرجعاً في حال تكرار مشكلات مشابهة."
    ],
    "steps": [
      "رصد وتحديد المشكلة بدقة وجمع البيانات والمعلومات الكافية عنها من مصادر متعددة ووجهات نظر مختلفة.",
      "تحليل المشكلة لتحديد أسبابها الجذرية باستخدام أدوات تحليلية كشجرة المشكلة أو تحليل السبب والنتيجة.",
      "اقتراح مجموعة من الحلول البديلة وتقييم كل منها بناءً على المعايير المتاحة كالتكلفة والوقت والفعالية.",
      "اختيار الحل الأنسب وتطبيقه وفق خطة عمل محددة المعالم والأدوار والمسؤوليات والجدول الزمني.",
      "متابعة تنفيذ الحل وتقييم نتائجه ومدى فعاليته في حل المشكلة وإجراء التعديلات اللازمة إذا تطلب الأمر."
    ],
    "strategies": [
      "استخدام منهجية العصف الذهني لجمع أكبر عدد ممكن من الحلول المبتكرة للمشكلة من فريق العمل.",
      "تبني أسلوب حل المشكلات التعاوني عبر تشكيل فريق متعدد التخصصات لمعالجة المشكلة من زوايا مختلفة.",
      "التطبيق العملي لمنهجية DMAIC المستخدمة في إدارة الجودة (التعريف، القياس، التحليل، التحسين، الرقابة).",
      "استخدام أسلوب التدخل المبني على الأدلة حيث تستند الحلول إلى نتائج أبحاث ودراسات سابقة ناجحة.",
      "تفعيل مبدأ المشاركة بإشراك المتأثرين بالمشكلة (الطلاب، المعلمين، أولياء الأمور) في عملية حلها."
    ],
    "strengths": [
      "الدقة في تشخيص المشكلة والابتعاد عن التخمين عبر الاعتماد على البيانات والمؤشرات الملموسة.",
      "الشفافية في التعامل مع المشكلات وعدم التستر عليها مما سمح بمعالجتها بشكل جذري وشامل.",
      "المرونة في تطبيق الحلول والقدرة على التعديل السريع بناءً على التغذية الراجعة أثناء التنفيذ.",
      "الاستفادة من الخبرات المتراكمة داخل المدرسة وخارجها في إيجاد حلول مجربة وفعالة للمشكلات.",
      "تحويل المشكلات إلى فرص للتعلم والتطوير حيث أنتجت بعض الحلول ممارسات جديدة ومبتكرة."
    ],
    "improve": [
      "تطوير نظام إنذار مبكر لاكتشاف المشكلات في مراحلها الأولى قبل أن تتفاقم وتصعب معالجتها.",
      "توثيق أكثر دقة للمشكلات التي تم حلها والدروس المستفادة منها في قاعدة معرفية يسهل الرجوع إليها.",
      "تدريب أعضاء الهيئة التعليمية والإدارية على منهجيات حل المشكلات بشكل عملي وتطبيقي.",
      "تخصيص ميزانية طارئة للتعامل مع المشكلات غير المتوقعة التي تتطلب موارد مالية سريعة.",
      "تحسين آلية التواصل مع أولياء الأمور والمجتمع المحلي في معالجة المشكلات ذات البعد المجتمعي."
    ],
    "recomm": [
      "اعتماد نموذج موحد لحل المشكلات في المدرسة يضمن الاتساق والكفاءة في التعامل مع جميع التحديات.",
      "إنشاء فريق تدخل سريع مختص بالتعامل مع المشكلات الطارئة والعاجلة لضمان الاستجابة الفورية.",
      "ربط حل المشكلات بخطط التحسين المستمر للمدرسة وجعلها جزءاً من تقييم الأداء المؤسسي السنوي.",
      "تشجيع ثقافة الإبلاغ عن المشكلات دون خوف من العقاب لضمان اكتشافها ومعالجتها في الوقت المناسب.",
      "عقد ورش عمل دورية لعرض أبرز المشكلات التي تم حلها وطرق حلها لتعميم الفائدة وبناء الخبرات."
    ]
  },

  "تقرير توظيف الذكاء الاصطناعي": {
    "goal": [
      "استثمار تقنيات الذكاء الاصطناعي في تحسين العملية التعليمية وتقديم تجارب تعلم مخصصة وفعالة للطلاب.",
      "تطوير أدوات تقييم وتحليل ذكية تساعد في فهم احتياجات الطلاب الفردية وتقديم توصيات تعليمية دقيقة.",
      "تخفيف العبء الإداري على المعلمين عبر أتمتة المهام الروتينية وتوفير الوقت للتركيز على الجوانب الإبداعية.",
      "تطوير مهارات القرن الحادي والعشرين لدى الطلاب وتعريفهم بتقنيات المستقبل وإعدادهم للعصر الرقمي.",
      "تحويل البيانات التعليمية إلى رؤى قابلة للتنفيذ لدعم اتخاذ القرارات التربوية المستنيرة والفعالة."
    ],
    "summary": [
      "تم تطبيق نظام ذكاء اصطناعي لتقييم مقالات الطلاب في مادة اللغة العربية وتقديم تغذية راجعة فورية.",
      "استخدمت أداة ذكاء اصطناعي لتخصيص مسارات التعلم للطلاب بناءً على أدائهم السابق ونمط تعلمهم.",
      "ساهم روبوت محادثة في الإجابة على استفسارات الطلاب وأولياء الأمور على مدار 24 ساعة يومياً.",
      "حللت خوارزميات الذكاء الاصطناعي أنماط الأخطاء الشائعة في الرياضيات واقترحت أنشطة علاجية مستهدفة.",
      "تم استخدام الذكاء الاصطناعي في مراقبة الامتحانات الإلكترونية والكشف عن محاولات الغش بشكل فوري."
    ],
    "steps": [
      "دراسة الاحتياجات التعليمية والإدارية التي يمكن أن يلبيها الذكاء الاصطناعي وتحديد الأولويات للتطبيق.",
      "بحث واختيار الأدوات والتطبيقات المناسبة التي تتوافق مع الإمكانيات المالية والفنية للمدرسة.",
      "تدريب المعلمين والطلاب على استخدام هذه الأدوات وفهم مخرجاتها وكيفية الاستفادة منها بشكل أمثل.",
      "تنفيذ التجارب الأولية على نطاق محدود ثم التوسع التدريجي بعد تقييم الفعالية ومعالجة السلبيات.",
      "متابعة الأداء وتقييم الأثر التعليمي للأدوات المستخدمة وتحديثها أو تغييرها بناءً على النتائج."
    ],
    "strategies": [
      "استخدام أنظمة التوصية الذكية لاقتراح مصادر تعلم وأنشطة تناسب مستوى كل طالب واحتياجاته.",
      "توظيف معالجة اللغة الطبيعية في تقييم الإجابات المقالية وتحليل مشاعر الطلاب من كتاباتهم.",
      "استخدام التعلم الآلي للتنبؤ بالطلاب المعرضين للتعثر الدراسي والتدخل المبكر لمساعدتهم.",
      "دمج روبوتات المحادثة في المنصات التعليمية لتقديم الدعم الآني والإجابة على الأسئلة المتكررة.",
      "استخدام تحليل البيانات التعليمية لاستخراج أنماط التعلم وتقديم رؤى للمعلمين واتخاذ القرارات."
    ],
    "strengths": [
      "تقديم تعلم مخصص وفردي للطلاب يتناسب مع سرعتهم وأسلوبهم التعليمي مما رفع من فاعلية التعلم.",
      "دقة وسرعة التحليل التي تفوق القدرات البشرية في معالجة كميات كبيرة من البيانات التعليمية.",
      "التقليل من الأخطاء البشرية في التصحيح والتقييم وزيادة الموضوعية في إعطاء الدرجات والتغذية الراجعة.",
      "تحرير وقت المعلم من المهام الروتينية كالتصحيح وإدخال الدرجات للتركيز على الإبداع والتفاعل مع الطلاب.",
      "جذب انتباه الطلاب وتحفيزهم عبر استخدام تقنيات حديثة تلامس اهتماماتهم وتواكب عصرهم الرقمي."
    ],
    "improve": [
      "توفير بنية تحتية تقنية قوية وأجهزة حديثة قادرة على تشغيل تطبيقات الذكاء الاصطناعي بكفاءة.",
      "تطوير محتوى تعليمي عالي الجودة ومناسب للاستخدام مع أدوات الذكاء الاصطناعي بلغة عربية سليمة.",
      "معالجة مخاوف الخصوصية والأمان المتعلقة ببيانات الطلاب عند استخدام تطبيقات الذكاء الاصطناعي.",
      "تدريب متخصص للمعلمين على تفسير مخرجات الذكاء الاصطناعي ودمجها في خططهم التدريسية بفاعلية.",
      "مواكبة التطور السريع في مجال الذكاء الاصطناعي وتحديث الأدوات المستخدمة باستمرار."
    ],
    "recomm": [
      "البدء بمشاريع ذكاء اصطناعي صغيرة ومحدودة ثم التوسع تدريجياً مع تراكم الخبرة والثقة في النتائج.",
      "إنشاء فريق تقني وتربوي مختص بمتابعة تطورات الذكاء الاصطناعي وتقييم فرص تطبيقه في المدرسة.",
      "تشجيع البحث والتطوير المحلي في مجال الذكاء الاصطناعي التربوي عبر مسابقات ودعم مشاريع الطلاب.",
      "تأسيس شراكات مع شركات تقنية وجامعات محلية للاستفادة من خبراتها في تطبيقات الذكاء الاصطناعي.",
      "إعداد برنامج توعوي لأولياء الأمور يشرح فوائد ومخاطر الذكاء الاصطناعي في التعليم وكيفية التعامل معه."
    ]
  },

  "تقرير الفصول المقلوبة": {
    "goal": [
      "قلب النموذج التعليمي التقليدي حيث يدرس الطالب المحتوى الجديد في المنزل ويخصص وقت الحصة للتطبيق والمناقشة.",
      "زيادة تفاعل الطلاب ومشاركتهم الفعالة داخل الصف عبر تحويل دور المعلم من ملقن إلى ميسر وموجه.",
      "تنمية مهارات التعلم الذاتي والمسؤولية الشخصية لدى الطلاب من خلال الاعتماد على أنفسهم في استيعاب الأساسيات.",
      "تخصيص وقت الحصة لأنشطة تعلم أعمق كحل المشكلات المعقدة والمناقشات الجماعية والتطبيقات العملية.",
      "تمكين المعلم من تقديم دعم فردي مكثف للطلاب خلال الحصة حيث يكون الجميع مستعدين للمناقشة والتطبيق."
    ],
    "summary": [
      "طُبقت استراتيجية الفصل المقلوب في 4 فصول بمادة العلوم حيث شاهد الطالب فيديوهات تعليمية في المنزل.",
      "خصص وقت الحصة للتجارب العملية وحل المسائل المعقدة والمناقشات الجماعية مما رفع مستوى التفاعل إلى 90%.",
      "أظهرت النتائج تحسناً في متوسط درجات الطلاب بنسبة 15% مقارنة بالفصول التي تدرس بالطريقة التقليدية.",
      "أعرب 80% من الطلاب عن رضاهم عن النموذج الجديد وأشاروا إلى زيادة ثقتهم في فهم المادة العلمية.",
      "واجه التطبيق بعض التحديات مع طلاب لا يملكون اتصال إنترنت في المنزل وتم توفير بدائل مناسبة لهم."
    ],
    "steps": [
      "إعداد محتوى تعليمي رقمي (فيديوهات، عروض، قراءات) يغطي المفاهيم الأساسية للدرس ورفعه على منصة المدرسة.",
      "توجيه الطلاب لمشاهدة المحتوى وإعداد ملاحظاتهم وأسئلتهم قبل الحصة مع تحديد مهمة تحضيرية بسيطة.",
      "بداية الحصة بالتحقق من فهم الطلاب للمحتوى عبر مناقشة سريعة أو اختبار قصير إلكتروني.",
      "تخصيص الجزء الأكبر من الحصة لأنشطة تطبيقية وعمل جماعي وحل مشكلات تحت إشراف وتوجيه المعلم.",
      "ختام الحصة بتلخيص النتائج وتوضيح الواجب المنزلي (الذي يكون عادة استكمال التطبيق أو البحث المعمق)."
    ],
    "strategies": [
      "استخدام فيديوهات تعليمية قصيرة (5-7 دقائق) من إنتاج المعلم أو مقاطع مختارة من مصادر موثوقة.",
      "تفعيل المناقشات الصفية الموجهة التي تبدأ بأسئلة الطلاب وتتطور إلى حوار معمق ومنظم.",
      "التعلم القائم على المشاريع داخل الحصة حيث يعمل الطلاب في مجموعات على إنتاج حلول لمشكلات حقيقية.",
      "التدريس الأقراني حيث يشرك الطلاب بعضهم بعضاً في شرح المفاهيم الصعبة وتعلمها بشكل تعاوني.",
      "استخدام استراتيجية المحطات داخل الفصل لممارسة مهارات مختلفة متعلقة بنفس الموضوع."
    ],
    "strengths": [
      "ارتفاع ملحوظ في تفاعل ومشاركة الطلاب داخل الحصة حيث أصبحوا شركاء فعالين في عملية التعلم.",
      "تحسن كبير في مهارات التعلم الذاتي والبحث والاستقصاء لدى الطلاب نتيجة الاعتماد على أنفسهم في التحضير.",
      "تمكين المعلم من تقديم دعم فردي حقيقي للطلاب الذين يحتاجون مساعدة أثناء الأنشطة التطبيقية.",
      "زيادة عمق الفهم والتطبيق للمفاهيم العلمية حيث يتم التركيز على الجانب التطبيقي الأصعب داخل الصف.",
      "مرونة التعلم حيث يمكن للطالب مشاهدة المحتوى بالسرعة التي تناسبه ومراجعته أكثر من مرة إذا احتاج."
    ],
    "improve": [
      "توفير دعم تقني لجميع الطلاب لضمان وصولهم للمحتوى الرقمي في المنزل عبر أجهزة واتصال مناسب.",
      "تدريب المعلمين على إنتاج محتوى تعليمي رقمي جذاب وفعال وتصميم أنشطة صفية تفاعلية مبتكرة.",
      "تطوير آليات للتحقق من تحضير الطلاب للمحاضرة وتشجيعهم على الالتزام بالمهمة التحضيرية.",
      "تصميم محتوى تعليمي مناسب لذوي الاحتياجات الخاصة والطلاب الذين يواجهون صعوبات في التعلم الذاتي.",
      "توسيع تطبيق الفصل المقلوب ليشمل مواد دراسية أكثر وتقييم فاعليتها في كل مادة على حدة."
    ],
    "recomm": [
      "البدء بتطبيق الفصل المقلوب بشكل جزئي في بعض الدروس قبل التعميم على المنهج بأكمله.",
      "إنشاء بنك فيديوهات تعليمية مشترك بين معلمي المادة لتقليل الجهد وتبادل الموارد عالية الجودة.",
      "عقد ورش عمل لأولياء الأمور لشرح فلسفة الفصل المقلوب وكيف يمكنهم دعم أبنائهم في المنزل.",
      "دمج الفصل المقلوب مع استراتيجيات تعلم أخرى كالتعلم القائم على المشاريع أو التعلم الخدمي.",
      "إجراء دراسات مقارنة مستمرة لقياس أثر الفصل المقلوب على التحصيل الدراسي والاتجاهات نحو المادة."
    ]
  },

  "تقرير تطوير البيئة الصفية": {
    "goal": [
      "تحويل الفصول الدراسية إلى بيئات تعلم جاذبة ومحفزة تدعم تنوع أنماط التعلم وتلبي الاحتياجات النفسية للطلاب.",
      "تحسين الترتيب الفيزيائي للفصل ليكون أكثر مرونة ودعمًا للتعلم النشط والتعاوني والتفاعلي بمختلف أشكاله.",
      "تعزيز الجوانب الجمالية والبصرية للفصل عبر استخدام الألوان والرسومات والإضاءة المناسبة لخلق جو إيجابي.",
      "توفير موارد ومرافق تعليمية متنوعة داخل الفصل تسهل عملية التعليم والتعلم وتشجع الاستكشاف والابتكار.",
      "تمكين المعلم والطلاب من المشاركة في تصميم وتطوير بيئتهم الصفية لزيادة الشعور بالانتماء والمسؤولية."
    ],
    "summary": [
      "تم تجديد وتطوير 10 فصول دراسية لتتضمن مناطق تعلم مختلفة (منطقة فردية، جماعية، قراءة، تقنية).",
      "أضيفت جدران تفاعلية ولوحات ذكية وتم تحسين نظام الإضاءة والتهوية في جميع الفصول المطورة.",
      "شارك الطلاب في تزيين فصولهم برسومات وأعمال فنية تعكس شخصيتهم واهتماماتهم الأكاديمية.",
      "ساهم التطوير في خفض نسبة السلوكيات غير المرغوبة ورفع مستوى تفاعل الطلاب مع البيئة الصفية.",
      "أعرب 95% من المعلمين عن رضاهم عن البيئة الصفية الجديدة وأثنوا على تأثيرها الإيجابي في التعليم."
    ],
    "steps": [
      "تقييم الوضع الحالي للفصول الدراسية وتحديد نقاط القوة والضعف عبر استبيانات للمعلمين والطلاب.",
      "وضع خطة تطوير شاملة تشمل الجوانب الفيزيائية (الأثاث، الإضاءة، التهوية) والتعليمية (الموارد، التقنية).",
      "تنفيذ عمليات التطوير بالتنسيق مع إدارة المدرسة وأقسام الصيانة مع إشراك الطلاب في بعض المراحل.",
      "تجهيز الفصول بالموارد التعليمية اللازمة كالكتب والألعاب التعليمية والأدوات التقنية المناسبة.",
      "تدريب المعلمين على الاستفادة المثلى من البيئة الصفية الجديدة وتصميم أنشطة تناسب تخطيطها."
    ],
    "strategies": [
      "اعتماد تخطيط مرن للفصل يمكن إعادة ترتيبه بسهولة ليناسب أنماط تعلم مختلفة (فردي، جماعي، حلقي).",
      "تخصيص زوايا تعلم متخصصة داخل الفصل (زاوية القراءة، زاوية العلوم، زاوية الفن، زاوية التقنية).",
      "استخدام الألوان النفسية المناسبة على الجدران والأثاث لتحفيز التركيز والإبداع والهدوء حسب المنطقة.",
      "تعليق أعمال الطلاب وإنتاجاتهم الفنية والعلمية على الجدران لتعزيز الثقة وتوثيق التقدم التعليمي.",
      "دمج عناصر الطبيعة في الفصل عبر نباتات طبيعية وإضاءة طبيعية لخلق بيئة مريحة وملهمة."
    ],
    "strengths": [
      "تحسن ملحوظ في سلوكيات الطلاب وتركيزهم نتيجة لبيئة التعلم المريحة والمنظمة والمحفزة بصرياً.",
      "زيادة فاعلية استراتيجيات التعلم النشط والتعاوني بسبب المرونة في ترتيب الفصل وتنوع مساحاته.",
      "ارتفاع مستوى الرضا والانتماء لدى الطلاب الذين شاركوا في تطوير فصولهم وشعروا بملكيتها.",
      "تحسين الصورة العامة للمدرسة وجاذبيتها للزوار وأولياء الأمور الذين يزورون الفصول المطورة.",
      "استغلال أفضل للمساحات الصفية وتحويل الزوايا المهملة إلى مساحات تعليمية منتجة وفعالة."
    ],
    "improve": [
      "توفير ميزانية أكبر لتطوير جميع الفصول وليس فقط جزء منها لتحقيق العدالة بين الصفوف المختلفة.",
      "تحسين الصيانة الدورية للفصول المطورة للحفاظ على جودتها ومظهرها الجذاب لفترة أطول.",
      "توفير مخزن مناسب داخل أو قريب من كل فصل لحفظ المواد والأدوات التعليمية بشكل منظم.",
      "مراعاة احتياجات ذوي الإعاقة في تصميم الفصول لتكون بيئات شاملة ومناسبة للجميع.",
      "إجراء دراسات أكثر دقة لقياس الأثر الأكاديمي لتطوير البيئة الصفية على التحصيل الدراسي."
    ],
    "recomm": [
      "الاستمرار في تطوير الفصول الدراسية تدريجياً لجعل جميع فصول المدرسة بيئات تعلم مثالية.",
      "إنشاء فريق تطوير بيئة صفية دائم في المدرسة لمتابعة الاحتياجات والتجديدات بشكل مستمر.",
      "تخصيص جزء من ميزانية الأنشطة الطلابية لتطوير الفصول بما يعكس اهتمامات الطلاب واقتراحاتهم.",
      "توثيق عملية تطوير الفصول عبر صور وفيديوهات قبل وبعد لتعميم الفكرة على مدارس أخرى.",
      "ربط تطوير البيئة الصفية ببرامج تدريب المعلمين على استراتيجيات التدريس الفعالة في البيئات المحسنة."
    ]
  },

  "تقرير الوسائل التعليمية المبتكرة": {
    "goal": [
      "توظيف وسائل تعليمية مبتكرة ومتنوعة تناسب العصر الرقمي وتلبي احتياجات الطلاب المختلفة وتجذب انتباههم.",
      "تحسين جودة العرض التعليمي وتسهيل فهم المفاهيم المجردة والمعقدة عبر وسائل بصرية وسمعية وحركية مبتكرة.",
      "تشجيع الإبداع والابتكار في تصميم وإنتاج الوسائل التعليمية من قبل المعلمين والطلاب باستخدام مواد متاحة.",
      "تطوير مهارات التفكير العليا لدى الطلاب عبر وسائل تعليمية تحفز الاكتشاف والاستقصاء وحل المشكلات.",
      "خلق تجارب تعلم غنية وممتعة تدمج بين العالمين المادي والرقمي وتثري البيئة التعليمية بموارد متنوعة."
    ],
    "summary": [
      "تم تصميم 20 وسيلة تعليمية مبتكرة من قبل المعلمين والطلاب تغطي مواد الرياضيات والعلوم واللغة العربية.",
      "شملت الوسائل نماذج مجسمة تفاعلية وألعاب تعليمية رقمية وواقع معزز وملصقات ذكية قابلة للمسح الضوئي.",
      "ساهمت الوسائل في خفض وقت شرح المفاهيم الصعبة بنسبة 40% ورفعت مستوى استيعاب الطلاب لها بشكل ملحوظ.",
      "فازت 3 وسائل تعليمية من إنتاج المدرسة بجوائز في معرض الوسائل التعليمية على مستوى المنطقة التعليمية.",
      "تم توثيق جميع الوسائل في دليل إلكتروني مع فيديوهات توضيحية لكيفية استخدامها لتعميم الفائدة."
    ],
    "steps": [
      "تحليل المنهج الدراسي وتحديد الدروس والمفاهيم التي تحتاج لوسائل تعليمية مبتكرة لتوضيحها.",
      "تصميم الوسيلة مع مراعاة الأهداف التعليمية والفئة العمرية والتكلفة والمواد المتاحة للتنفيذ.",
      "إنتاج الوسيلة باستخدام مواد مناسبة وتقنيات متاحة مع إشراك الطلاب في عملية التصنيع عند الإمكان.",
      "تجريب الوسيلة على عينة صغيرة من الطلاب وجمع التغذية الراجعة لتحسينها قبل التعميم.",
      "تطبيق الوسيلة في الحصة الدراسية وتقييم أثرها على التعلم وتوثيق التجربة للاستفادة المستقبلية."
    ],
    "strategies": [
      "استخدام تقنية الواقع المعزز لتحويل الصور والرسومات إلى نماذج ثلاثية الأبعاد تفاعلية.",
      "تصميم ألعاب تعليمية رقمية تدمج عناصر التحدي والمكافأة في تعلم المفاهيم الدراسية.",
      "إنتاج نماذج مجسمة قابلة للتحريك تساعد في فهم العمليات الديناميكية والمعقدة.",
      "استخدام القصص الرقمية التفاعلية لتقديم المعلومات في قالب قصصي مشوق.",
      "تصميم محطات تعلم تحتوي كل منها على وسيلة تعليمية مختلفة لنفس المفهوم."
    ],
    "strengths": [
      "زيادة كبيرة في دافعية الطلاب للتعلم وانخراطهم في الأنشطة الصفية بسبب عنصر التشويق والإبداع.",
      "توضيح المفاهيم المجردة والصعبة بطرق ملموسة وبصرية سهلت على الطلاب استيعابها وتذكرها.",
      "تنمية مهارات التفكير الإبداعي وحل المشكلات لدى الطلاب الذين شاركوا في تصميم الوسائل.",
      "مرونة الوسائل وإمكانية استخدامها في أكثر من درس أو مادة دراسية مما يزيد من قيمتها.",
      "تحسين كفاءة المعلم في توصيل المعلومات وتقليل الجهد المبذول في الشرح والتكرار."
    ],
    "improve": [
      "توفير ورشة عمل مجهزة بالأدوات والمواد اللازمة لتصنيع الوسائل التعليمية داخل المدرسة.",
      "تدريب المعلمين على أحدث تقنيات إنتاج الوسائل التعليمية الرقمية والمادية بجودة عالية.",
      "إنشاء نظام لإعارة الوسائل التعليمية بين معلمي المدرسة لتعظيم الاستفادة منها.",
      "تخصيص ميزانية سنوية لتصنيع وتطوير الوسائل التعليمية المبتكرة وتجديد المخزون منها.",
      "توثيق أثر كل وسيلة على التحصيل الدراسي عبر دراسات مقارنة لمعرفة الأكثر فاعلية."
    ],
    "recomm": [
      "إنشاء بنك وسائل تعليمية مبتكرة في المدرسة يوثق جميع الوسائل المنتجة وطريقة استخدامها.",
      "عقد مسابقة سنوية لأفضل وسيلة تعليمية مبتكرة وتكريم الفائزين من المعلمين والطلاب.",
      "تأسيس نادي الوسائل التعليمية المبتكرة لتدريب الطلاب على تصميم وإنتاج وسائل تعليمية.",
      "نشر تجارب المدرسة الناجحة في إنتاج الوسائل عبر قنوات التواصل الاجتماعي والمنصات التعليمية.",
      "تعزيز التعاون مع مؤسسات المجتمع المحلي لدعم إنتاج الوسائل التعليمية المبتكرة وتطويرها."
    ]
  },

  "تقرير المناوبة والفسحة": {
    "goal": [
      "ضمان سلامة وأمن الطلاب خلال فترة الفسحة والمناوبة المدرسية عبر إشراف فعال ومنتظم ومتواصل.",
      "تنظيم عملية الخروج والدخول للفسحة والمناوبة بسلاسة ومنع الازدحام والتدافع الذي قد يؤدي لحوادث.",
      "توفير بيئة آمنة وممتعة خلال الفسحة تسمح للطلاب بالترويح عن أنفسهم وممارسة الأنشطة الحركية المناسبة.",
      "مراقبة سلوكيات الطلاب خلال الفسحة وتوجيههم نحو السلوكيات الإيجابية والحد من المشكلات السلوكية.",
      "توزيع مهام المناوبة بين المعلمين والإداريين بعدالة ووضوح لضمان التغطية الشاملة لجميع مناطق المدرسة."
    ],
    "summary": [
      "تم تنظيم 3 فسحات يومية بمناوبة 15 معلماً وإدارياً موزعين على جميع مرافق وساحات المدرسة.",
      "طبقت نظام الفسحة المرحلية حيث يخرج طلاب كل مرحلة في وقت مختلف لمنع الازدحام وتحسين الإشراف.",
      "وفرت المدرسة ألعاباً حركية آمنة في الساحات وأنشطة هادئة في المكتبة للطلاب الذين يفضلون الهدوء.",
      "انخفضت المشكلات السلوكية خلال الفسحة بنسبة 70% بعد تطبيق نظام النقاط للمجموعات المنضبطة.",
      "تم تسجيل صفر حادثة أمنية خلال الفصل الدراسي بفضل فعالية نظام المناوبة والتدريب على الطوارئ."
    ],
    "steps": [
      "تحديد مناطق الفسحة والساحات والمرافق التي تحتاج إشرافاً وتقسيمها إلى قطاعات واضحة المعالم.",
      "إعداد جدول المناوبة الأسبوعي وتوزيعه على المعلمين مع توضيح مناطق المسؤولية والواجبات المطلوبة.",
      "إجراء تدريب للمعلمين المشرفين على بروتوكولات السلامة والإسعافات الأولية وكيفية التعامل مع الحالات الطارئة.",
      "تنفيذ المناوبة حسب الجدول مع ارتداء سترات أو شارات تعريفية للمشرفين لتسهيل التعرف عليهم.",
      "تسجيل أي ملاحظات أو حوادث خلال الفسحة في سجل خاص ومتابعتها مع إدارة المدرسة والإرشاد الطلابي."
    ],
    "strategies": [
      "نظام المشرف المتجول حيث يتحرك المشرف بين المناطق المختلفة بدلاً من الوقوف في مكان ثابت.",
      "تفعيل برنامج قادة الفسحة حيث يشارك طلاب متطوعون في الإشراف الخفيف وتوجيه زملائهم.",
      "تخصيص مناطق لأنشطة محددة (منطقة الألعاب، منطقة الجلوس، منطقة القراءة) وتنظيم تدفق الطلاب بينها.",
      "استخدام صفارات أو إشارات صوتية محددة لتنبيه الطلاب بنهاية الفسحة وبداية الاستعداد للدخول.",
      "تطبيق نظام الفسحة الإيجابية بمكافأة الفصول المنضبطة بحصص ألعاب إضافية أو أنشطة ترفيهية."
    ],
    "strengths": [
      "انتظام وانضباط كبير في عملية خروج ودخول الطلاب للفسحة دون حدوث تدافع أو ازدحام خطير.",
      "فعالية الإشراف وانتشار المشرفين في جميع المناطق مما حد من السلوكيات السلبية وزاد الشعور بالأمن.",
      "تنوع الأنشطة المتاحة خلال الفسحة والتي لبت احتياجات الطلاب المختلفة (حركية، فنية، هادئة).",
      "التزام المعلمين بأدوارهم في المناوبة وروح المسؤولية العالية التي أظهروها خلال أداء المهمة.",
      "تحسن العلاقات بين الطلاب والمشرفين نتيجة التفاعل الإيجابي خارج إطار الحصة الدراسية الرسمية."
    ],
    "improve": [
      "توفير مزيد من الظل في الساحات خاصة في فصل الصيف عبر مظلات أو أشجار لتوفير بيئة مريحة.",
      "زيادة عدد المشرفين الذكور في مدارس البنين والإناث في مدارس البنات لتحسين الفاعلية والملاءمة.",
      "تدريب المشرفين على مهارات التواصل الفعال مع الطلاب خلال الفسحة وحل النزاعات بطرق تربوية.",
      "تحسين نظام التواصل بين المشرفين خلال الفسحة عبر أجهزة اتصال لاسلكية للتعامل السريع مع الحوادث.",
      "تخصيص مناطق منفصلة للطلاب ذوي الاحتياجات الخاصة لتوفير فسحة آمنة ومناسبة لقدراتهم."
    ],
    "recomm": [
      "الاستمرار في نظام الفسحة المرحلية وتعميمه على جميع الصفوف لما أظهره من فوائد في التنظيم والأمن.",
      "تطوير الساحات المدرسية وتجهيزها بمعدات ألعاب آمنة وملاعب مصغرة لتشجيع النشاط الحركي الصحي.",
      "تنويع أنشطة الفسحة عبر برنامج أسبوعي يشمل مسابقات ثقافية وعروض فنية قصيرة وأنشطة جماعية.",
      "إشراك أولياء الأمور المتطوعين في الإشراف على الفسحة لتعزيز الشراكة وتقليل العبء على المعلمين.",
      "ربط سلوك الطلاب خلال الفسحة بنظام الحوافز والعقوبات المدرسية لتعزيز الانضباط الإيجابي."
    ]
  },

  "تقرير سجل التواصل مع أولياء الأمور": {
    "goal": [
      "بناء وتوثيق قنوات اتصال فعالة ومنتظمة مع أولياء الأمور لتعزيز الشراكة في تربية وتعليم الأبناء.",
      "إطلاع أولياء الأمور بشكل دوري على أداء أبنائهم الأكاديمي والسلوكي وتطورهم العام في المدرسة.",
      "تلقّي ملاحظات ومقترحات أولياء الأمور والاستفادة منها في تطوير العمل المدرسي وخدماتها التعليمية.",
      "توفير الدعم والتوجيه التربوي لأولياء الأمور لتمكينهم من المساهمة الفعالة في تعلم أبنائهم في المنزل.",
      "توثيق جميع أشكال التواصل مع أولياء الأمور لأغراض المتابعة والتقييم والمراجعة المستقبلية."
    ],
    "summary": [
      "تم إجراء 320 اتصالاً هاتفياً و150 زيارة افتراضية وإرسال 850 رسالة نصية لأولياء الأمور خلال الفصل.",
      "عُقد 4 اجتماعات عامة لأولياء الأمور ونُظمت 12 ورشة عمل تثقيفية في مواضيع تربوية متنوعة.",
      "استخدمت منصة نون للتواصل اليومي حيث بلغت نسبة تفاعل أولياء الأمور مع المنشورات 65%.",
      "ساهم التواصل الفعال في خفض نسبة الغياب غير المبرر وزيادة مشاركة أولياء الأمور في الفعاليات.",
      "وثق سجل التواصل جميع التفاعلات مع أولياء الأمور مما سهل متابعة الحالات الفردية وتقييم الأثر."
    ],
    "steps": [
      "إنشاء قاعدة بيانات محدثة لأولياء الأمور تتضمن وسائل الاتصال المفضلة وأوقات المناسبة للاتصال.",
      "تحديد خطة اتصال سنوية تشمل اتصالات دورية وطارئة ووسائل اتصال متنوعة (هاتف، رسائل، منصات).",
      "تنفيذ أنشطة التواصل حسب الخطة مع تسجيل ملخص لكل اتصال أو لقاء في السجل الخاص بكل طالب.",
      "تحليل ردود أفعال أولياء الأمور وتغذيتهم الراجعة وتصنيفها للاستفادة منها في التحسين المستمر.",
      "تقييم فاعلية أنشطة التواصل بشكل دوري عبر استبيانات وقياس مؤشرات مثل نسبة الحضور والاستجابة."
    ],
    "strategies": [
      "استخدام الرسائل النصية القصيرة للتواصل العاجل والمختصر حول مستجدات الطالب أو المدرسة.",
      "تفعيل المنصات الإلكترونية والتطبيقات الذكية للتواصل اليومي ومشاركة الصور والتقارير الفورية.",
      "إجراء اتصالات هاتفية إيجابية للإبلاغ عن إنجازات الطالب وليس فقط المشكلات.",
      "تنظيم مقاهي الأهالي كلقاءات غير رسمية لمناقشة مواضيع تربوية في أجوة ودية.",
      "تفويض بعض مهام التواصل للطلاب أنفسهم كإيصال تقارير أو دعوات لأولياء أمورهم لتعزيز المسؤولية."
    ],
    "strengths": [
      "تنوع قنوات التواصل الذي أتاح لأولياء الأمور اختيار الوسيلة المناسبة لهم مما زاد من معدل الاستجابة.",
      "الانتظام في التواصل الذي خلق ثقة متبادلة وجعل أولياء الأمور شركاء حقيقيين في العملية التعليمية.",
      "الشفافية في نقل المعلومات حول أداء الطلاب مما قلل من سوء الفهم والاتصالات الاستفسارية الطارئة.",
      "الاستجابة السريعة لاستفسارات وشكاوى أولياء الأمور مما عزز صورتهم الإيجابية عن إدارة المدرسة.",
      "استخدام البيانات المسجلة في توجيه الجهود نحو أولياء الأمور الأقل تفاعلاً لزيادة مشاركتهم."
    ],
    "improve": [
      "تحسين آلية تحديث بيانات الاتصال لأولياء الأمور بشكل أسرع وأدق للوصول إليهم عند الحاجة.",
      "توفير خدمة ترجمة أو تواصل بلغات أخرى لأولياء الأمور غير الناطقين باللغة العربية.",
      "تدريب المعلمين على مهارات التواصل الفعال مع أولياء الأمور وخاصة في الحالات الصعبة أو الحساسة.",
      "تخصيص وقت محدد في جدول المعلم للتواصل مع أولياء الأمور لضمان عدم إهماله بسبب الأعباء الأخرى.",
      "زيادة التركيز على التواصل مع أولياء أمور الطلاب المتفوقين والمتميزين لتقدير جهودهم ودعم استمرارية التميز."
    ],
    "recomm": [
      "الاستمرار في تنويع وسائل التواصل وتبني الوسائل الحديثة التي تواكب تطور تقنيات الاتصال.",
      "إنشاء مجلس لأولياء الأمور بشكل رسمي يمثلهم ويعمل كقناة اتصال دائمة ومؤثرة مع إدارة المدرسة.",
      "تطوير نظام إلكتروني متكامل لإدارة وتوثيق جميع اتصالات المدرسة مع أولياء الأمور بشكل مركزي.",
      "عقد شراكات مع مؤسسات مجتمعية لتقديم خدمات استشارية ودعم نفسي وتربوي لأولياء الأمور.",
      "ربط فعالية التواصل مع أولياء الأمور بمؤشرات أداء المدرسة وجعلها جزءاً من تقييم جودتها."
    ]
  },

  "تقرير جرد المختبرات وغرف المصادر": {
    "goal": [
      "ضمان جاهزية وصيانة المختبرات العلمية وغرف المصادر التعليمية وتجهيزاتها لتكون بيئات تعلم فعالة وآمنة.",
      "تحديث وتطوير الأجهزة والأدوات والمواد التعليمية في المختبرات وغرف المصادر بما يتناسب مع المناهج الحديثة.",
      "تنظيم عمليات جرد دورية دقيقة للموارد والأجهزة لضمان سلامتها وفعاليتها وملاءمتها للاستخدام التعليمي.",
      "توفير بيئة عمل آمنة للمعلمين والطلاب في المختبرات عبر الالتزام بمعايير السلامة والصحة المهنية.",
      "تحقيق الاستفادة المثلى من الموارد المتاحة وتقليل الهدر والفاقد عبر إدارة فعالة للمخزون والمستلزمات."
    ],
    "summary": [
      "تم إجراء جرد شامل لمختبر العلوم وغرفة مصادر التعلم والوسائل التعليمية في نهاية الفصل الدراسي.",
      "كشف الجرد عن وجود 85% من الأجهزة بحالة جيدة و10% بحاجة صيانة و5% غير صالحة للاستخدام.",
      "تم صيانة 15 جهازاً وتجهيز 8 أجهزة جديدة وشراء مواد استهلاكية تكفي للفصل الدراسي القادم.",
      "نظمت المخازن ووضعت البطاقات التعريفية على جميع المواد وسجلت في قاعدة بيانات إلكترونية.",
      "أعدت خطة صيانة دورية وتدريب على الاستخدام الآمن للأجهزة لجميع معلمي العلوم والطلاب."
    ],
    "steps": [
      "تحديد موعد الجرد وتشكيل فريق عمل مكون من مختصين في المواد العلمية وأمناء المخازن.",
      "فرز وتصنيف جميع الأجهزة والأدوات والمواد حسب نوعها وحالتها ومدى صلاحيتها للاستخدام.",
      "إعداد قوائم الجرد والتأكد من مطابقة الأرقام الفعلية مع السجلات الرسمية للمخزون.",
      "تسجيل الملاحظات حول الحاجة للصيانة أو الاستبدال وإعداد تقرير مفصل بنتائج الجرد.",
      "رفع التقرير لإدارة المدرسة لوضع خطة التطوير والصيانة والميزانية اللازمة للتحسينات."
    ],
    "strategies": [
      "استخدام نظام الترميز بالألوان لتصنيف المواد حسب خطورتها أو نوع استخدامها.",
      "تبني نظام الجرد الدوري حيث يتم جرد قسم مختلف من المخزون كل أسبوع.",
      "استخدام التطبيقات الإلكترونية للجرد عبر أجهزة الماسح الضوئي لقراءة الباركود على المواد.",
      "تنفيذ نظام المكان المحدد لكل شيء لتنظيم التخزين وسرعة الوصول.",
      "تفعيل برنامج الصيانة الوقائية للأجهزة الحساسة حسب جدول زمني."
    ],
    "strengths": [
      "دقة التنظيم والترتيب التي سهلت عملية الجرد والوصول إلى المواد عند الحاجة بسرعة كبيرة.",
      "الالتزام العالي بمعايير السلامة في تخزين المواد الكيميائية والأدوات الحادة والأجهزة الكهربائية.",
      "استفادة المعلمين والطلاب من الأجهزة والمواد الحديثة التي وفرت فرص تعلم عملية غنية.",
      "انخفاض نسبة الكسر والفقدان في المواد نتيجة للتنظيم الجيد والرقابة المستمرة على الاستخدام.",
      "تطوير مهارات إدارية وفنية لدى القائمين على المختبرات وغرف المصادر من خلال التدريب المستمر."
    ],
    "improve": [
      "زيادة الميزانية المخصصة لتجديد الأجهزة القديمة وشراء أجهزة وتقنيات أكثر تطوراً وتنوعاً.",
      "توفير مساحة أكبر للمختبرات وغرف المصادر لاستيعاب الأجهزة الحديثة والأنشطة العملية الجماعية.",
      "تدريب جميع معلمي العلوم على الاستخدام الآمن والصحيح لجميع الأجهزة والمواد في المختبر.",
      "تحسين نظام التهوية والإضاءة في المختبرات وغرف المصادر لتوفير بيئة عمل أكثر راحة وأماناً.",
      "تطوير نظام إعارة المواد والأجهزة للطلاب للمشاريع البحثية خارج أوقات الدوام المدرسي."
    ],
    "recomm": [
      "الاستمرار في إجراء الجرد الدوري كل فصل دراسي وتوثيق النتائج لمقارنة التطور عبر الزمن.",
      "إنشاء قاعدة بيانات إلكترونية شاملة للمخزون تسمح بالبحث السريع وتتبع حالة كل مادة أو جهاز.",
      "عقد شراكات مع الجامعات والمؤسسات البحثية للحصول على أجهزة متطورة مستعملة بأسعار رمزية.",
      "تفعيل برنامج المختبر المفتوح حيث يمكن للطلاب المهتمين استخدام المختبر تحت الإشراف بعد الدوام.",
      "ربط تطوير المختبرات وغرف المصادر بخطة التحسين المستمر للمدرسة وجعلها أحد مؤشرات الجودة."
    ]
  },

  "تقرير إدارة الأزمات": {
    "goal": [
      "وضع وتنفيذ خطط استباقية للتعامل مع الأزمات والطوارئ المحتملة في البيئة المدرسية بكفاءة وسرعة.",
      "ضمان سلامة وصحة جميع منسوبي المدرسة (طلاب، معلمين، إداريين) في حالات الطوارئ والأزمات المختلفة.",
      "تحديد الأدوار والمسؤوليات بوضوح خلال الأزمات لضمان التنسيق الفعال والاستجابة المنظمة والسريعة.",
      "تخفيف الآثار السلبية للأزمات على سير العملية التعليمية واستئناف الأنشطة المدرسية بأسرع وقت ممكن.",
      "بناء ثقافة الوعي والاستعداد لدى جميع منسوبي المدرسة للتعامل مع الأزمات عبر التدريب والتوعية المستمرة."
    ],
    "summary": [
      "وضعت المدرسة خطة إدارة أزمات شاملة تغطي 10 سيناريوهات محتملة (حريق، حادث، أمراض، تخريب).",
      "تم تنفيذ 3 تدريبات لإخلاء المبنى المدرسي خلال العام بنسبة مشاركة 100% من الطلاب والمعلمين.",
      "تم التعامل بنجاح مع أزمة انقطاع المياه لمدة يومين عبر خطة بديلة وتوفير مياه معبأة.",
      "كشف اختبار تقييم جاهزية إدارة الأزمات عن تحقيق المدرسة 85% من معايير الجاهزية المطلوبة.",
      "وثقت جميع التجارب والدروس المستفادة في سجل إدارة الأزمات لتحسين الخطط المستقبلية."
    ],
    "steps": [
      "تشكيل فريق إدارة الأزمات المدرسي وتحديد قائد الأزمة ونوابه والمهام الموكلة لكل عضو.",
      "تحليل المخاطر المحتملة في البيئة المدرسية ووضع سيناريوهات استجابة مفصلة لكل نوع من الأزمات.",
      "إعداد خطة اتصال طارئة تحتوي على أرقام هواتف الجهات المعنية (الدفاع المدني، الصحة، الشرطة).",
      "تنفيذ تدريبات وتجارب عملية منتظمة على خطط الطوارئ مع تقييم الأداء وتصحيح الأخطاء.",
      "مراجعة وتحديث خطط إدارة الأزمات بشكل دوري بناءً على التجارب والتغيرات في البيئة المدرسية."
    ],
    "strategies": [
      "اعتماد نموذج الأربع مراحل لإدارة الأزمات: المنع، الاستعداد، المواجهة، التعافي.",
      "استخدام نظام الإنذار المبكر للكشف عن المؤشرات الدالة على أزمة محتملة.",
      "تفعيل غرفة عمليات طارئة مجهزة بوسائل اتصال ومعلومات أثناء الأزمة.",
      "تنفيذ تدريبات مفاجئة دون إعلام مسبق لاختبار سرعة الاستجابة وتصحيح نقاط الضعف.",
      "استخدام تقنيات المحاكاة لتدريب فريق إدارة الأزمات على سيناريوهات معقدة وواقعية."
    ],
    "strengths": [
      "سرعة الاستجابة والتنفيذ خلال التدريبات الفعلية مما يدل على فهم جيد للأدوار والمسؤوليات.",
      "التجهيزات الجيدة لأدوات السلامة (طفايات، إسعافات أولية، لافتات إخلاء) وصيانتها الدورية.",
      "التعاون الكبير بين جميع أقسام المدرسة خلال الأزمات والتدريبات وروح الفريق العالية.",
      "الشفافية في التواصل مع أولياء الأمور خلال الأزمات الفعلية مما قلل من القلق وسوء الفهم.",
      "القدرة على العودة السريعة للعملية التعليمية بعد انتهاء الأزمة بفضل التخطيط المسبق الجيد."
    ],
    "improve": [
      "توفير تدريب أكثر تخصصاً لأعضاء فريق إدارة الأزمات في مجالات الإسعافات الأولية المتقدمة.",
      "تحسين البنية التحتية للمدرسة لتكون أكثر مقاومة للمخاطر (مخارج طوارئ إضافية، أنظمة إنذار).",
      "تطوير خطط طوارئ أكثر تفصيلاً تراعي الاحتياجات الخاصة لذوي الإعاقة والطلاب أصحاب الأمراض المزمنة.",
      "إجراء تقييمات أكثر واقعية للتدريبات عبر مراقبين خارجيين لتقديم تغذية راجعة أكثر موضوعية.",
      "زيادة الميزانية المخصصة لصيانة وتجديد أدوات السلامة وتجهيزات الطوارئ بشكل دوري."
    ],
    "recomm": [
      "الاستمرار في عقد تدريبات إدارة الأزمات بشكل دوري وجعلها جزءاً من الثقافة المدرسية الدائمة.",
      "إنشاء شراكات مع الجهات المختصة (الدفاع المدني، الهلال الأحمر) للاستفادة من خبراتها في التدريب.",
      "تطوير تطبيق هاتفي خاص بإدارة الأزمات في المدرسة يرسل تنبيهات ويعطي تعليمات فورية أثناء الطوارئ.",
      "إشراك ممثلين من الطلاب في فريق إدارة الأزمات لتدريبهم وتوعيتهم وجعلهم سفراء للسلامة بين أقرانهم.",
      "توثيق ونشر تجارب المدرسة الناجحة في إدارة الأزمات لتعميم الفائدة على المدارس الأخرى في المنطقة."
    ]
  },

  "تقرير نقل أثر التدريب": {
    "goal": [
      "ضمان تطبيق المهارات والمعارف المكتسبة من البرامج التدريبية في الممارسة العملية اليومية للمتدربين.",
      "قياس وتحسين العائد على الاستثمار في التدريب من خلال رصد تأثير التدريب على أداء المعلمين والطلاب.",
      "توفير الدعم والمتابعة اللازمة للمتدربين لتذليل العقبات التي تواجههم في تطبيق ما تعلموه بعد التدريب.",
      "تحويل التدريب من حدث منعزل إلى عملية مستمرة للتطوير المهني عبر خطة واضحة لنقل الأثر وتعميم الفائدة.",
      "بناء ثقافة التعلم التنظيمي حيث يتم تبادل المعرفة والمهارات الجديدة بين جميع أعضاء الهيئة التعليمية."
    ],
    "summary": [
      "تم متابعة تطبيق 15 معلماً لمهارات التعلم النشط التي تدربوا عليها وظهر تحسن في ممارسات 12 منهم.",
      "طبق 80% من المعلمين المدربين على استراتيجيات التقويم التكويني تقنيات جديدة في تقييم طلابهم.",
      "أنتج المعلمون الذين تلقوا تدريباً على البحث الإجرائي 5 أبحاث طبقت نتائجها في تحسين التدريس.",
      "ارتفعت نسبة رضا الطلاب عن الدروس التي يقدمها المعلمون المتدربون بنسبة 25% بعد 3 أشهر من التدريب.",
      "ووثقت خطط نقل الأثر وتقارير المتابعة في ملف خاص لكل برنامج تدريبي لتقييم فاعليته المستقبلية."
    ],
    "steps": [
      "تحديد أهداف نقل الأثر المطلوبة من كل برنامج تدريبي قبل البدء فيه وربطها بأهداف المدرسة.",
      "تطوير خطة عمل فردية لكل متدرب بعد انتهاء التدريب تحدد المهارات المطلوب تطبيقها وآلية المتابعة.",
      "توفير الدعم اللازم للمتدربين عبر جلسات تبادل خبرات وتوجيه من الأقران وموارد إضافية.",
      "متابعة وتقييم تطبيق المهارات عبر الملاحظة الصفية وتحليل أعمال الطلاب ومقابلات مع المتدربين.",
      "تقييم أثر التدريب على نواتج التعلم للطلاب ومستوى رضاهم ورفع التقارير النهائية للإدارة."
    ],
    "strategies": [
      "نظام المعلم المرشد حيث يربط كل متدرب بزميل أكثر خبرة لدعمه في التطبيق.",
      "عقد جلسات ما بعد التدريب لمناقشة التحديات وتبادل الحلول والدروس.",
      "استخدام خطة التطبيق العملي التي يعدها المتدرب بنفسه تحت إشراف المدرب.",
      "تفعيل مجتمعات الممارسة حول موضوع التدريب لاستمرار التعلم الجماعي.",
      "المراقبة الصفية التطويرية لتقديم تغذية راجعة بناءة على التطبيق."
    ],
    "strengths": [
      "ارتفاع مستوى التزام المعلمين بتطبيق ما تعلموه نتيجة للمتابعة المنظمة والدعم المستمر.",
      "تحسن ملموس في الممارسات الصفية وجودة التدريس لدى الغالبية العظمى من المعلمين المتدربين.",
      "انتقال الأثر بشكل واضح إلى أداء الطلاب ونتائجهم الأكاديمية مما يبرر الاستثمار في التدريب.",
      "بناء قدرات داخلية من المعلمين الذين أصبحوا مدربين لزملائهم وناقلين للمعرفة.",
      "تطوير نظام تقييم متكامل للتدريب يركز على النتائج وليس فقط رضا المشاركين عن البرنامج."
    ],
    "improve": [
      "تخصيص وقت محمي في جدول المعلمين لتطبيق المهارات الجديدة والتخطيط للدروس باستخدامها.",
      "تحسين آلية اختيار البرامج التدريبية لضمان ملاءمتها للاحتياجات الحقيقية والسياق المدرسي.",
      "توفير الموارد والأدوات المساعدة اللازمة لتطبيق المهارات الجديدة (مواد، تقنيات، أجهزة).",
      "إشراك قادة المدرسة بشكل أكثر فعالية في دعم وتشجيع نقل أثر التدريب وخلق بيئة محفزة.",
      "قياس الأثر طويل المدى للتدريب وليس فقط المباشر لتقييم استمرارية التطبيق واستدامة النتائج."
    ],
    "recomm": [
      "ربط برامج التدريب ونقل أثرها بخطط التطوير المهني الفردية وتقييم الأداء السنوي للمعلمين.",
      "إنشاء حاضنة أو صندوق دعم مالي صغير للمبادرات التي يطلقها المعلمون بعد التدريب لتطبيق مهاراتهم.",
      "توثيق ونشر قصص النجاح في نقل أثر التدريب لتحفيز الآخرين وتقديم نماذج عملية للتطبيق.",
      "تطوير مؤشرات أداء رئيسية محددة لنقل أثر التدريب ومراقبتها بشكل دوري ومنتظم.",
      "عقد شراكات مع مؤسسات تدريبية متميزة تضمن جودة البرامج ودعم ما بعد التدريب لنقل الأثر."
    ]
  },

  "تقرير المعلم الصغير": {
    "goal": [
      "تنمية مهارات القيادة والثقة بالنفس والتعبير الشفهي لدى الطلاب من خلال منحهم دور المعلم داخل الصف.",
      "تعميق فهم الطالب للمادة العلمية عبر شرحها لزملائه مما يعزز استيعابه ويطور مهاراته التعليمية.",
      "تشجيع التعلم التعاوني بين الأقران وجعل التعليم عملية تشاركية نشطة بدلاً من كونها أحادية الاتجاه.",
      "اكتشاف وتنمية المواهب التدريسية والقيادية لدى الطلاب في مراحل مبكرة وتوجيهها بشكل إيجابي.",
      "تخفيف العبء عن المعلم في بعض الأحيان عبر إشراك طلاب متميزين في تقديم أجزاء بسيطة من الدرس."
    ],
    "summary": [
      "طُبق برنامج المعلم الصغير في 5 فصول حيث تولى 20 طالباً تقديم أجزاء من الدروس لزملائهم.",
      "أظهر الطلاب المعلمون الصغار قدرة متميزة على الشرح وإدارة النقاش واستخدام الوسائل التعليمية.",
      "تحسنت درجات الطلاب الذين شاركوا كمعلمين صغار في المواد التي قاموا بتدريسها بنسبة 15% في المتوسط.",
      "ارتفعت ثقة الطلاب المشاركين بأنفسهم وأصبحوا أكثر جرأة في التحدث أمام الجمهور والمشاركة الصفية.",
      "تفاعل زملاء الفصل بشكل إيجابي مع المعلمين الصغار وكانوا أكثر انضباطاً وتفاعلاً خلال شرحهم."
    ],
    "steps": [
      "اختيار الطلاب الذين سيشاركون كمعلمين صغار بناءً على معايير محددة (الفهم الجيد، الثقة، الرغبة).",
      "تدريب الطلاب المختارين على مهارات التدريس الأساسية (التخطيط، الشرح، إدارة الفصل، طرح الأسئلة).",
      "تحديد الجزء المناسب من الدرس الذي سيقوم الطالب بتدريسه وإعداده معه مسبقاً وتجهيز الوسائل اللازمة.",
      "تنفيذ درس المعلم الصغير تحت إشراف المعلم الأصلي الذي يتدخل عند الحاجة للتوجيه أو التصحيح.",
      "تقييم أداء المعلم الصغير من قبل المعلم والطلاب وتقديم تغذية راجعة بناءة لتطوير أدائه."
    ],
    "strategies": [
      "استراتيجية الطالب الخبير حيث يتخصص طالب في موضوع معين ويشرحه للفصل.",
      "نظام المعلم المساعد حيث يساعد طالب المعلم في أنشطة وتصحيح بسيط.",
      "مشروع فصل بكامله من الطلاب حيث يقوم الطلاب بتدريس وحدة دراسية كاملة تحت إشراف المعلم.",
      "استخدام تقنية التدريس الأقراني المتبادل حيث يدرس الطلاب في أزواج.",
      "برنامج المعلم الضيف حيث يدعو الفصل طالباً من فصل آخر لشرح موضوع."
    ],
    "strengths": [
      "زيادة كبيرة في استيعاب الطلاب المعلمين الصغار للمفاهيم التي قاموا بتدريسها نتيجة التحضير والشرح.",
      "تحسن البيئة الصفية وتحولها إلى بيئة أكثر ديمقراطية وتعاوناً حيث يشعر الطلاب بملكية أكبر للتعلم.",
      "اكتشاف مواهب تدريسية وقيادية غير متوقعة لدى طلاب لم تكن تظهر في الأنشطة التقليدية.",
      "تنمية مهارات القرن الحادي والعشرين مثل التواصل، التفكير النقدي، التعاون، الإبداع لدى المشاركين.",
      "تخفيف العبء النفسي على بعض الطلاب الخجولين الذين أصبحوا أكثر انفتاحاً بعد تجربة الوقوف أمام الفصل."
    ],
    "improve": [
      "ضمان مشاركة جميع الطلاب وليس فقط المتفوقين أو الجريئين عبر تدريب مجموعات متعددة وتناوب الأدوار.",
      "توفير وقت كافٍ لتدريب الطلاب على مهارات التدريس قبل البدء في التطبيق لضمان جودة الأداء.",
      "تجهيز مواد ووسائل تعليمية مبسطة ومناسبة لعمر الطلاب تسهل عليهم عملية الشرح والتقديم.",
      "متابعة أثر التجربة على التحصيل الدراسي للطلاب المتلقيين للدرس من زملائهم لضمان الفائدة للجميع.",
      "معالجة أي مشاعر سلبية قد تنشأ بين الطلاب نتيجة للتنافس على دور المعلم الصغير بإدارة حكيمة."
    ],
    "recomm": [
      "الاستمرار في برنامج المعلم الصغير وتوسيعه ليشمل جميع الصفوف والمواد الدراسية المختلفة.",
      "إنشاء نادي للمعلمين الصغار يلتقي دورياً لتبادل الخبرات وتطوير المهارات التدريسية والقيادية.",
      "توثيق تجارب المعلمين الصغار الناجحة عبر فيديوهات قصيرة وعرضها في الاجتماعات المدرسية.",
      "ربط برنامج المعلم الصغير ببرامج رعاية الموهوبين واكتشاف المواهب التعليمية في سن مبكرة.",
      "إشراك أولياء الأمور في تقييم أداء أبنائهم كمعلمين صغار وتعزيز الشراكة في تنمية مهاراتهم."
    ]
  },

  "تقرير إدارة الاجتماعات": {
    "goal": [
      "تنظيم وإدارة الاجتماعات المدرسية بفاعلية لتحقيق أهدافها في الوقت المحدد وبأقصى قدر من الإنتاجية.",
      "ضمان مشاركة فعالة لجميع الأعضاء وتوظيف آرائهم وخبراتهم في صنع القرارات وتحسين العمل المدرسي.",
      "توثيق القرارات والتوصيات الصادرة عن الاجتماعات ومتابعة تنفيذها لضمان ترجمتها إلى إجراءات واقعية.",
      "تحسين مهارات القيادة والتيسير لدى مديري الاجتماعات ورفع كفاءة المشاركين في الحضور والمشاركة.",
      "تقليل الوقت والجهد المهدر في الاجتماعات غير المنتجة وزيادة العائد من الاجتماعات على أداء المدرسة."
    ],
    "summary": [
      "عُقد 12 اجتماعاً رسمياً لفريق القيادة المدرسية خلال الفصل الدراسي بمتوسط نسبة حضور 95%.",
      "طبقت قواعد اجتماعات فعالة تشمل جدول أعمال مسبق، وقت محدد، وتوثيق القرارات خلال 24 ساعة.",
      "نتج عن الاجتماعات 25 قراراً تنفيذياً تم تنفيذ 80% منها بنجاح قبل نهاية الفصل الدراسي.",
      "استخدمت أدوات تيسير بصرية وتفاعلية رقمية لضمان مشاركة جميع الأعضاء وتنظيم النقاش.",
      "انخفض متوسط مدة الاجتماعات من 90 إلى 60 دقيقة مع زيادة في الإنتاجية بنسبة 40%."
    ],
    "steps": [
      "التخطيط المسبق للاجتماع بإعداد جدول أعمال واضح وإرساله للمشاركين مع المواد التحضيرية مسبقاً.",
      "بدء الاجتماع في الوقت المحدد ومراجعة جدول الأعمال والاتفاق على التوقعات ومدة الاجتماع.",
      "إدارة النقاش بطريقة منظمة تضمن مشاركة الجميع والتركيز على الموضوع وعدم الخروج عنه.",
      "اختتام الاجتماع بتلخيص القرارات والتوصيات وتحديد المهام والمسؤوليات ومواعيد التسليم.",
      "إعداد محضر الاجتماع وإرساله للمشاركين خلال 24 ساعة ومتابعة تنفيذ القرارات في الاجتماعات التالية."
    ],
    "strategies": [
      "استخدام تقنية الوقت المحدد لكل بند لمنع الإطالة والتركيز على النقاط الأساسية.",
      "تفعيل قاعدة الهواتف الصامتة لضمان انتباه المشاركين وعدم تشتتهم خلال الاجتماع.",
      "استخدام أدوات التصويت السريع أو استطلاع الرأي لاتخاذ القرارات في المواضيع الخلافية.",
      "تطبيق مبدأ رئيس الاجتماع الدوار لتدريب جميع الأعضاء على مهارات التيسير.",
      "اعتماد أسلوب الوقت المنتج حيث يخصص جزء من الاجتماع لحل مشكلة محددة بعمق."
    ],
    "strengths": [
      "الالتزام بالوقت وانضباط المشاركين مما أدى إلى اختصار المدة وزيادة التركيز على الأهداف.",
      "فعالية التوثيق والمتابعة التي ضمنت تنفيذ القرارات وعدم ضياعها أو نسيانها بعد الاجتماع.",
      "تحسن مهارات التيسير والقيادة لدى مديري الاجتماعات والقدرة على إدارة النقاشات بفاعلية.",
      "مشاركة أعضاء الفريق بشكل متوازن وظهور أفكار واقتراحات قيمة من مختلف التخصصات والخبرات.",
      "تحويل الاجتماعات من جلسات إعلامية إلى حلقات عمل منتجة تخرج بقرارات وإجراءات قابلة للتنفيذ."
    ],
    "improve": [
      "تحسين جودة المواد التحضيرية المقدمة قبل الاجتماع لتمكين المشاركين من الإعداد الجيد للمناقشة.",
      "تخفيف عدد الاجتماعات ودمج بعضها لتقليل العبء على المشاركين وترك وقت أكبر للعمل التنفيذي.",
      "تدريب المشاركين على مهارات المشاركة الفعالة في الاجتماعات وتقديم الآراء بتركيز ووضوح.",
      "توفير وسائل تقنية أفضل للاجتماعات الهجينة (حضورية وافتراضية) لضمان مشاركة متساوية للجميع.",
      "تقييم فاعلية الاجتماعات بشكل دوري عبر استبيانات قصيرة للمشاركين لمعرفة نقاط القوة والضعف."
    ],
    "recomm": [
      "الاستمرار في تطبيق معايير الاجتماعات الفعالة وتعميمها على جميع أنواع الاجتماعات في المدرسة.",
      "اعتماد نموذج موحد لإعداد محاضر الاجتماعات وتوثيق القرارات لتسهيل المتابعة والمراجعة.",
      "تخصيص وقت في نهاية كل اجتماع للتفكير التقييمي حول جودة الاجتماع وكيفية تحسينه في المستقبل.",
      "إنشاء سجل إلكتروني مركزي لجميع اجتماعات المدرسة يسهل الرجوع إليه وتتبع القرارات والتوصيات.",
      "عقد ورش عمل تدريبية منتظمة لمهارات إدارة الاجتماعات للمعلمين والإداريين لرفع كفاءة المشاركة."
    ]
  },

  "تقرير الاختبارات الذكية": {
    "goal": [
      "تطوير أدوات تقييم ذكية تستخدم التقنيات الحديثة لقياس نواتج التعلم بدقة وكفاءة عالية وموضوعية.",
      "توفير تغذية راجعة فورية ومفصلة للطلاب تساعدهم في تحديد نقاط القوة والضعف وتحسين أدائهم التعليمي.",
      "تخفيف العبء على المعلمين في عمليات التصحيح والتحليل عبر أتمتة عمليات التقييم باستخدام التقنيات الذكية.",
      "تخصيص اختبارات تتناسب مع مستوى كل طالب لقياس مدى تقدمه الفعلي بدقة متناسبة مع قدراته.",
      "تحليل نتائج الاختبارات باستخدام تقنيات الذكاء الاصطناعي لاستخراج رؤى تربوية تدعم عملية اتخاذ القرار."
    ],
    "summary": [
      "تم تطبيق نظام الاختبارات الذكية في 8 مواد دراسية شملت 350 طالباً بمختلف المستويات التعليمية.",
      "استخدمت منصة إلكترونية متطورة تقدم اختبارات تكيفية تتغير صعوبتها بناءً على إجابات الطالب السابقة.",
      "حصل الطلاب على تقارير تحليلية فورية بعد الاختبار تبين نقاط القوة والضعف والمهارات التي تحتاج تطويراً.",
      "أظهرت النتائج دقة عالية في قياس المستويات الحقيقية للطلاب مقارنة بالاختبارات التقليدية الورقية.",
      "ساهم النظام في توفير أكثر من 40 ساعة عمل أسبوعية كانت تخصص سابقاً للتصحيح والتحليل اليدوي."
    ],
    "steps": [
      "اختيار منصة الاختبارات الذكية المناسبة التي تتوافق مع احتياجات المدرسة وإمكانياتها التقنية والمالية.",
      "تصميم بنك أسئلة ذكي متنوع ومصنف حسب المستويات والمهارات والمعايير التعليمية المطلوبة.",
      "تدريب المعلمين على استخدام المنصة وإنشاء الاختبارات وتحليل النتائج واستخراج التقارير التحليلية.",
      "تطبيق الاختبارات على عينات صغيرة أولاً ثم التوسع التدريجي مع تقييم الفاعلية ومعالجة التحديات.",
      "تحليل النتائج باستخدام أدوات الذكاء الاصطناعي واستخراج رؤى تربوية تدعم خطط التحسين والتطوير."
    ],
    "strategies": [
      "استخدام الاختبارات التكيفية التي تتغير صعوبتها تلقائياً بناءً على أداء الطالب لقياس المستوى الحقيقي بدقة.",
      "توظيف تقنيات الذكاء الاصطناعي في تصحيح الأسئلة المقالية وتحليل أنماط الأخطاء والضعف لدى الطلاب.",
      "تطبيق نظام التغذية الراجعة التفسيرية التي تشرح للطالب سبب الخطأ وتقدم مصادر للتعلم الإضافي.",
      "دمج عناصر الألعاب والتحديات في الاختبارات لزيادة دافعية الطلاب وتخفيف حدة القلق من الاختبارات.",
      "استخدام تحليلات التعلم لرسم خرائط التقدم الفردي والجماعي وتحديد أنماط التعلم الأكثر فعالية."
    ],
    "strengths": [
      "دقة عالية في قياس المستويات الحقيقية للطلاب وتحديد الفجوات التعليمية بدقة غير متوفرة في الاختبارات التقليدية.",
      "سرعة الحصول على النتائج والتقارير التحليلية التي تمكن من اتخاذ قرارات تدخلية سريعة وفعالة.",
      "تخصيص التغذية الراجعة لكل طالب حسب أدائه مما يزيد من فاعلية عملية التعلم والتحسين المستمر.",
      "توفير الوقت والجهد الكبير للمعلمين في عمليات التصحيح والتحليل والتركيز على الجوانب التعليمية الأكثر أهمية.",
      "زيادة دافعية الطلاب للاختبارات نتيجة لعناصر التشويق والتحدي والتغذية الراجعة الفورية والمفصلة."
    ],
    "improve": [
      "توفير بنية تحتية تقنية قوية وأجهزة كافية لضمان سير الاختبارات بسلاسة دون مشكلات فنية تعيق الأداء.",
      "تطوير محتوى عربي أكثر تنوعاً وجودة لبنك الأسئلة يتناسب مع المناهج المحلية والمستويات المختلفة.",
      "تدريب المعلمين على تفسير التقارير التحليلية المعقدة واستخدامها في تخطيط الدروس والتدخلات العلاجية.",
      "معالجة مخاوف الخصوصية والأمان المتعلقة ببيانات الطلاب عند استخدام منصات الاختبارات الذكية.",
      "توسيع نطاق تطبيق النظام ليشمل جميع المواد الدراسية والصفوف التعليمية في المدرسة."
    ],
    "recomm": [
      "الاستمرار في تطوير نظام الاختبارات الذكية ودمج المزيد من تقنيات الذكاء الاصطناعي لتحسين الدقة والكفاءة.",
      "إنشاء فريق تقني وتربوي مختص بمتابعة تطورات الاختبارات الذكية وتقييم فرص تطبيقها في المدرسة.",
      "عقد شراكات مع مؤسسات تعليمية وبحثية لتطوير محتوى اختبارات ذكي يتناسب مع الاحتياجات المحلية.",
      "إعداد برنامج تدريبي متكامل للمعلمين والطلاب على استخدام النظام والاستفادة القصوى من مخرجاته.",
      "توثيق ونشر تجارب المدرسة الناجحة في تطبيق الاختبارات الذكية لتعميم الفائدة على المدارس الأخرى."
    ]
  },
  "تقرير المحتوى الرقمي المنتج": {
    "goal": [
      "تنمية مهارات الطلاب في إنتاج مواد تعليمية رقمية تدعم فهم زملائهم للمفاهيم الدراسية بشكل مبتكر وواضح.",
      "تعزيز قدرة الطلاب على تحويل المعرفة النظرية إلى عروض رقمية تفاعلية تسهل عملية الاستيعاب والتعلم النشط.",
      "تشجيع العمل الجماعي والتعاون بين الطلاب من خلال تصميم مشاريع رقمية مشتركة تعكس تكامل المهارات الفردية.",
      "بناء مكتبة رقمية مدرسية من إنتاج الطلاب لدعم التعلم الذاتي وتوفير موارد تعليمية متنوعة للفصول الدراسية.",
      "تعزيز ثقة الطلاب بقدراتهم الإبداعية من خلال عرض منتجاتهم الرقمية وتلقي ملاحظات بناءة من المعلمين والأقران."
    ],
    "summary": [
      "أنتج الطلاب 45 عملاً رقمياً خلال الفصل الدراسي بتنوع بين عروض تقديمية ومقاطع مرئية وملصقات تعليمية.",
      "أظهرت الأعمال التزاماً بالمعايير التعليمية وارتباطاً واضحاً بالأهداف المعرفية للمواد الدراسية المحددة.",
      "تفاعل المعلمون مع المشروع من خلال توجيه الطلاب في مراحل التصميم وتقييم الجودة التعليمية للمحتوى المنتج.",
      "تم استخدام المنتجات الرقمية في الفصول الدراسية كوسائل إيضاح داعمة للشرح التقليدي للمفاهيم الصعبة.",
      "شاركت المدرسة بثلاثة أعمال في معرض المحتوى التعليمي المحلي وحصلت على تقدير لتميزها التربوي."
    ],
    "steps": [
      "تشكيل لجنة تخطيط من المعلمين لتحديد معايير المحتوى الرقمي وربطه بالأهداف التعليمية للمواد الدراسية.",
      "توزيع الطلاب على مجموعات عمل وفق مهاراتهم التقنية واهتماماتهم المعرفية في مجالات دراسية مختلفة.",
      "توفير جلسات تدريبية أساسية حول برامج تصميم مناسبة للمرحلة العمرية وقابلة للتطبيق في السياق المدرسي.",
      "متابعة تقدم المشاريع أسبوعياً وتقديم تغذية راجعة حول تحسين الجودة التعليمية للمواد المنتجة.",
      "تنظيم عرض نهائي للمشاريع المكتملة وتوثيقها في قاعدة بيانات المدرسة للإفادة منها في الأعوام القادمة."
    ],
    "strategies": [
      "اعتماد استراتيجية المشروع التعليمي القائم على إنتاج مادة تعليمية كبديل عن التقييمات الكتابية التقليدية.",
      "تشكيل فرق تبادل معرفي حيث ينتج طلاب الصفوف العليا محتوى تعليمياً لصالح طلاب الصفوف الدنيا.",
      "دمج عناصر التفكير التصميمي في عملية إنتاج المحتوى لضمان مراعاة احتياجات المستخدم النهائي.",
      "تخصيص حصص للنقاش الجماعي حول فعالية المواد المنتجة ومدى إسهامها في توضيح المفاهيم التعليمية.",
      "استحداث سجل إنجاز رقمي لكل طالب يحتوي على الأعمال المنتجة كجزء من ملف الإنجاز الشامل."
    ],
    "strengths": [
      "ارتفاع مستوى إتقان الطلاب للمهارات التقنية الأساسية اللازمة لتصميم وعرض المعلومات بشكل منظم.",
      "تحسن ملحوظ في فهم الطلاب المنتجين للمفاهيم التي عملوا عليها نتيجة لعمليات البحث والتحضير المتعمقة.",
      "توفير موارد تعليمية محلية منخفضة التكلفة قابلة للتطوير وإعادة الاستخدام في سياقات تعليمية مختلفة.",
      "تنمية مهارات إدارة المشروع لدى الطلاب من خلال التخطيط الزمني وتوزيع المهام ضمن فريق العمل.",
      "خلق قناة تواصل إيجابية بين الطلاب المتفوقين تقنياً وزملائهم الذين يحتاجون دعمًا في استيعاب المواد."
    ],
    "improve": [
      "تخصيص وقت كافٍ في الجدول المدرسي للعمل على المشاريع الرقمية لتجنب إثقال كاهل الطلاب بواجبات إضافية.",
      "توفير قائمة موحدة ومجانية للبرامج والتطبيقات الموصى بها لضمان تكافؤ الفرص بين جميع الطلاب.",
      "تطوير أدلة إرشادية مبسطة للطلاب حول معايير الجودة التعليمية للمحتوى الرقمي وطرق قياسها.",
      "زيادة تدريب المعلمين على منهجيات تقييم المحتوى الرقمي والتمييز بين جودته التقنية وجودته التعليمية.",
      "إنشاء نظام للحفاظ على حقوق الملكية الفكرية للطلاب وحفظها ضمن أرشيف المدرسة الرسمي."
    ],
    "recomm": [
      "إدماج مشروع المحتوى الرقمي المنتج بشكل رسمي في الخطة السنوية للمدرسة وتحديد موازنة مالية لدعمه.",
      "تكوين فريق دعم فني من الطلاب المتطوعين لتقديم المساعدة التقنية الأولية لأقرانهم خلال فترة التنفيذ.",
      "عقد شراكات مع مكتبات رقمية محلية لنشر أفضل الأعمال والاستفادة من ملاحظات متخصصين خارجيين.",
      "ربط المشروع ببرنامج التطوير المهني للمعلمين لضمان استمرارية التطوير وتحسين الممارسات سنوياً.",
      "توثيق التجربة بشكل منهجي وإعداد تقرير سنوي يقيس أثر المشروع على التحصيل الدراسي والبيئة التعليمية."
    ]
  },

  "تقرير تعزيز السلوك الإيجابي": {
    "goal": [
      "بناء بيئة مدرسية محفزة تركز على تعزيز القيم السلوكية الإيجابية وتقدير الجهود المبذولة في التحلي بالأخلاق الحميدة.",
      "تطوير وعي الطالب بمسؤولياته تجاه نفسه وزملائه ومجتمع المدرسة من خلال أنشطة منهجية وغير منهجية هادفة.",
      "تعزيز الانتماء للمدرسة وتحسين الصورة الذاتية للطلاب من خلال برامج التكريم العلني للممارسات السلوكية الجيدة.",
      "خفض معدلات السلوكيات غير المرغوب فيها عبر تفعيل أنظمة داعمة تركز على التوجيه والإرشاد بدلاً من العقاب فقط.",
      "توفير الدعم النفسي والاجتماعي للطلاب الذين يواجهون صعوبات سلوكية لمساعدتهم على الاندماج الإيجابي في المجتمع المدرسي."
    ],
    "summary": [
      "انخفض عدد التقارير السلوكية السلبية المسجلة رسمياً بنسبة 30% خلال الفصل الدراسي بعد تطبيق البرنامج.",
      "تم تكريم 150 طالباً في فئات متنوعة مثل التعاون والنظام والمبادرة والصدق في التعامل داخل المدرسة.",
      "أظهرت نتائج استبيان الرضا ارتفاعاً في شعور الطلاب بالأمان والاحترام المتبادل داخل الحرم المدرسي.",
      "شارك 80% من طلاب المدرسة في فعاليات أسبوع القيم الذي ركز على تعزيز سلوكيات محددة بشكل عملي.",
      "تم تدريب 20 معلماً على استراتيجيات التعامل الإيجابي مع السلوك وتطبيق أساليب الإرشاد الفردي والجماعي."
    ],
    "steps": [
      "تشكيل لجنة للإرشاد السلوكي تضم مرشدين طلابيين ومعلمين للإشراف على تصميم وتنفيذ البرنامج.",
      "تحديد مجموعة من القيم والممارسات السلوكية المستهدفة للتعزيز وصياغتها بلغة واضحة ومفهومة للطلاب.",
      "تصميم نظام للملاحظة والتسجيل يرصد الممارسات الإيجابية اليومية للطلاب في مختلف أماكن المدرسة.",
      "تفعيل برنامج تكريم أسبوعي وشهري للطلاب المتميزين سلوكياً مع إشراك أولياء الأمور في حفلات التكريم.",
      "تنظيم جلسات إرشادية فردية وجماعية للطلاب الذين يحتاجون دعمًا في تعديل بعض السلوكيات غير المرغوب فيها."
    ],
    "strategies": [
      "اعتماد استراتيجية الاصطفاء الإيجابي من خلال ملاحظة وتقدير السلوك الجيد فور حدوثه وتعزيزه علنياً.",
      "تفعيل عقود السلوك بين الطالب والمرشد لتحقيق أهداف سلوكية قابلة للقياس خلال فترة زمنية محددة.",
      "استخدام أسلوب النمذجة حيث يقوم طلاب قدوة بنقل الخبرات الإيجابية ومشاركة قصص نجاحهم السلوكي.",
      "تطبيق استراتيجية الدائرة في الفصول لجلسات حوارية أسبوعية تناقش قيماً وسلوكيات محددة بقيادة الطلاب.",
      "إشراك الطلاب في تصميم مواد توعوية مثل ملصقات وفيديوهات قصيرة تعكس القيم السلوكية المستهدفة في المدرسة."
    ],
    "strengths": [
      "تحسن المناخ العام للمدرسة وزيادة الشعور بالمسؤولية الجماعية لدى الطلاب تجاه نظافة وأمن البيئة المدرسية.",
      "ارتفاع مستوى التفاعل الإيجابي بين الطلاب أنفسهم وبين الطلاب والمعلمين خلال اليوم الدراسي.",
      "زيادة وعي الطلاب بالعواقب الإيجابية للسلوك الحسن وانعكاسه على سمعتهم وتقدمهم الدراسي والاجتماعي.",
      "فعالية نظام التكريم في تحفيز عدد كبير من الطلاب، خاصة من الفئات الهادئة وغير الظاهرة في الأنشطة الأكاديمية.",
      "نجاح النهج الإرشادي الداعم في احتواء العديد من الحالات السلوكية قبل تصاعدها إلى مشكلات انضباطية كبيرة."
    ],
    "improve": [
      "ضرورة تحقيق التوازن بين تكريم السلوك الظاهر مثل النظام وتكريم السلوك الباطن مثل الصدق والضمير الحي.",
      "تحسين آليات رصد السلوك الإيجابي في الأماكن غير الصفية كالملاعب والفسحة لضمان الشمولية والعدالة.",
      "تضمين أولياء الأمور بشكل أكثر فعالية في برامج التوعية والتوجيه الأسري لدعم استمرارية السلوك الإيجابي في المنزل.",
      "تخصيص وقت كافٍ في جدول المرشدين الطلابيين لمتابعة الحالات الفردية وتنفيذ الخطط العلاجية المناسبة.",
      "تقييم أثر البرنامج على التحصيل الدراسي للطلاب لربط التحسن السلوكي بالتحسين في النتائج الأكاديمية."
    ],
    "recomm": [
      "الاستمرار في البرنامج مع إدخال تحسينات سنوية بناءً على تحليل النتائج وملاحظات المجتمع المدرسي بأكمله.",
      "إنشاء سجل القيم الإلكتروني لكل طالب لتوثيق إنجازاته السلوكية على مدى سنوات الدراسة في المدرسة.",
      "عقد شراكات مع مؤسسات مجتمعية لتنظيم زيارات وأنشطة تطبيقية تعزز القيم الاجتماعية خارج إطار المدرسة.",
      "إدراج تقارير السلوك الإيجابي ضمن التقارير الشهرية المرسلة لأولياء الأمور إلى جانب التقارير الأكاديمية.",
      "توثيق الممارسات الناجحة في تعزيز السلوك ونشرها بين المعلمين لضمان استمرارية وتوحيد المنهجية المتبعة."
    ]
  },

  "تقرير سجل الدرجات الإلكتروني": {
    "goal": [
      "تطوير نظام مركزي دقيق لتسجيل ومتابعة التقييمات الدراسية للطلاب يسهل عملية التحليل واتخاذ القرارات التربوية.",
      "تحسين دقة عمليات رصد الدرجات وحساب المتوسطات عبر أتمتة العمليات الحسابية وتقليل الأخطاء البشرية اليدوية.",
      "توفير بيانات آنية وموثوقة للمعلمين والإدارة وأولياء الأمور تمكن من متابعة التقدم الدراسي للطالب بشكل مستمر.",
      "دعم عملية التقويم التكويني من خلال تسجيل نتائج التقييمات القصيرة والمهام اليومية بانتظام وسهولة.",
      "إتاحة توليد تقارير إحصائية وتحليلية تفصيلية تساهم في تقييم أداء الطلاب والفصول والمناهج الدراسية."
    ],
    "summary": [
      "تم نقل سجلات الدرجات لجميع المواد والصفوف إلى النظام الإلكتروني بنسبة اكتمال وصلت إلى 100%.",
      "أصبح بإمكان أولياء الأمور الاطلاع على درجات أبنائهم وتحصيلهم المباشر عبر منصة إلكترونية آمنة.",
      "انخفضت الشكاوى المتعلقة بأخطاء في جمع أو حساب الدرجات النهائية للطلاب بنسبة كبيرة.",
      "وفر النظام للمعلمين أكثر من 5 ساعات أسبوعياً كانت تُستهلك في العمليات الحسابية والتدوين اليدوي.",
      "تم استخدام البيانات في تحليل الاتجاهات الدراسية وتحديد المواد والفصول التي تحتاج إلى دعم إضافي."
    ],
    "steps": [
      "اختيار نظام إلكتروني يتناسب مع احتياجات المدرسة من حيث السعة والتكلفة وسهولة الاستخدام.",
      "تدريب جميع المعلمين والإداريين المعنيين على إدخال البيانات واستخراج التقارير الأساسية من النظام.",
      "إنشاء قاعدة بيانات موحدة لجميع الطالب وربطها بالنظام الأكاديمي الرئيسي للمدرسة.",
      "تحديد سياسة واضحة لمواعيد إدخال الدرجات ومسؤولية كل معلم تجاه دقة وانتظام تحديث البيانات.",
      "إطلاق بوابة أولياء الأمور وتدريبهم على آلية الدخول والمتابعة مع ضمان سرية وخصوصية المعلومات."
    ],
    "strategies": [
      "اعتماد مبدأ الإدخال الفوري للدرجات بعد تصحيح أي اختبار أو تقييم لضمان تحديث البيانات باستمرار.",
      "استخدام إشعارات آلية ترسل للمعلمين لتذكيرهم بمواعيد إدخال الدرجات أو استكمال البيانات الناقصة.",
      "تطبيق آليات تحقق تلقائية للبيانات المدخلة مثل نطاق الدرجة المسموح به لتقليل نسبة الأخطاء.",
      "تفعيل خاصية التنبيهات الآلية لأولياء الأمور عند تسجيل درجة منخفضة بشكل استثنائي لابنهم.",
      "ربط النظام بسجل الحضور والانصراف للحصول على صورة شاملة عن أداء الطالب الدراسي والسلوكي."
    ],
    "strengths": [
      "زيادة الشفافية في عملية التقييم وإتاحة المعلومات بشكل عادل لجميع الأطراف المعنية كالطالب وولي الأمر والمعلم.",
      "دقة عالية في النتائج النهائية وإمكانية التدقيق والمراجعة بسهولة عند وجود أي استفسار أو شكوى.",
      "توفير وقت وجهد كبير للمعلمين يمكن استثماره في التحضير للدروس والأنشطة التعليمية التفاعلية.",
      "إمكانية إجراء مقارنات إحصائية بين أداء الفصول المختلفة والمواد الدراسية عبر السنوات.",
      "تحسين التواصل بين المدرسة والمنزل من خلال توفير قناة واضحة للمتابعة الأكاديمية المستمرة."
    ],
    "improve": [
      "ضمان استقرار الاتصال بالإنترنت وتوافر أجهزة مناسبة لجميع المعلمين لتسهيل عملية الإدخال بانتظام.",
      "تطوير واجهة استخدام أكثر بساطة وسلاسة للمعلمين الأقل خبرة في التعامل مع الأنظمة الإلكترونية.",
      "تضمين إمكانية إدخال ملاحظات نوعية وصفية إلى جانب الدرجات الرقمية لتقديم صورة أوضح عن أداء الطالب.",
      "تحسين آليات الأمان وحماية البيانات الشخصية للطلاب ومنع الوصول غير المصرح به للمعلومات الحساسة.",
      "توفير دعم فني سريع ومستمر داخل المدرسة لحل المشكلات التقنية الطارئة التي قد تعيق العمل."
    ],
    "recomm": [
      "الاستمرار في تطوير النظام وربطه بأنظمة إدارية أخرى في المدرسة كمكتبة ونشاط لإنشاء بيئة إلكترونية متكاملة.",
      "عقد ورش عمل دورية للمعلمين لاستعراض الميزات الجديدة وتعزيز أفضل الممارسات في استخدام النظام.",
      "إعداد دليل إرشادي مفصل ومصور باللغة العربية لكل من المعلمين وأولياء الأمور لشرح كافة إجراءات النظام.",
      "استخدام البيانات المجمعة في إجراء بحوث إجرائية داخلية لدراسة العوامل المؤثرة على التحصيل الدراسي.",
      "تقييم رضا المستفيدين كالمعلمين وأولياء الأمور عن الخدمة بشكل دوري واعتماد ملاحظاتهم في تطوير النظام."
    ]
  },

  "تقرير مقارنة السلاسل الزمنية": {
    "goal": [
      "تحليل اتجاهات الأداء الأكاديمي للطلاب عبر فترات زمنية متتالية لتحديد أنماط التحسن أو التراجع في التحصيل الدراسي.",
      "مقارنة نتائج التقييمات الدورية كالشهرية والفصلية والسنوية لتقييم فاعلية البرامج التدريسية والتدخلات العلاجية المطبقة.",
      "دراسة تأثير المتغيرات الخارجية كالتغير في المنهج أو طريقة التدريس على مستوى تحصيل الطلاب عبر الزمن.",
      "توفير أدلة مبنية على بيانات لدعم عمليات اتخاذ القرار التربوي المتعلقة بتطوير المناهج وتحسين الممارسات التعليمية.",
      "تدريب الكوادر التعليمية على قراءة وتحليل البيانات الزمنية واستخلاص الدلالات التربوية منها بشكل منهجي."
    ],
    "summary": [
      "تم إجراء تحليل مقارن لنتائج الطلاب في الاختبارات الفصلية على مدى ثلاث سنوات دراسية متتالية.",
      "أظهر التحليل تحسناً مطرداً في متوسط درجات المواد العلمية بنسبة 15% منذ تطبيق الاستراتيجيات الجديدة.",
      "كشف التحليل عن ثبات الأداء في مواد اللغة العربية بينما لوحظ تذبذب ملحوظ في نتائج مادة الرياضيات.",
      "ساعدت المقارنات الزمنية في تحديد الفصول الدراسية التي تحتاج إلى دعم مكثف بناءً على اتجاهات أدائها.",
      "تم تقديم ورشة عمل للمعلمين لشرح نتائج التحليل وكيفية الاستفادة منها في تخطيط الدروس."
    ],
    "steps": [
      "جمع البيانات التاريخية للنتائج الأكاديمية للطلاب والفصول من السجلات الإلكترونية والورقية الموثقة.",
      "تنظيم البيانات وتبويبها حسب المتغيرات الرئيسية كالمادة والصف والفصل الدراسي والسنة في جداول منظمة.",
      "استخدام أدوات تحليلية بسيطة مثل حساب المتوسطات والاتجاه العام لمقارنة الأداء عبر الفترات الزمنية.",
      "تمثيل البيانات بيانياً باستخدام المخططات الخطية والعمودية لتوضيح الاتجاهات والمقارنات بشكل مرئي.",
      "تحليل النتائج وتفسيرها تربوياً ووضع فرضيات للأسباب الكامنة وراء أنماط الأداء الملاحظة."
    ],
    "strategies": [
      "استخدام استراتيجية المقارنة المرجعية الذاتية حيث تتم مقارنة أداء المدرسة أو الفصل بأدائه السابق.",
      "تطبيق تحليل الاتجاه العام لتحديد ما إذا كان مستوى التحصيل في تحسن مستمر أو ثابت أو في انحدار.",
      "مقارنة سلاسل البيانات لفترات زمنية متماثلة كفصل الربيع من كل عام لاستبعاد تأثير العوامل الموسمية.",
      "اعتماد أسلوب تحليل الفجوة لتحديد الفروق بين الأداء الفعلي والأداء المستهدف عبر السنوات.",
      "استخدام مؤشرات النمو لقياس مقدار التقدم الأكاديمي الذي يحققه الطالب أو الفصل من سنة إلى أخرى."
    ],
    "strengths": [
      "توفير صورة شاملة وموضوعية عن مسيرة التقدم الأكاديمي للمدرسة بعيداً عن الانطباعات الشخصية المؤقتة.",
      "الكشف المبكر عن المشكلات أو التراجعات الدراسية مما يمكن من التدخل السريع لمعالجتها قبل استفحالها.",
      "دعم عمليات التخطيط الاستراتيجي للمدرسة من خلال الاعتماد على تحليل كمي للاتجاهات التاريخية للأداء.",
      "رفع وعي المعلمين بأهمية البيانات التاريخية في تقييم فاعلية أساليبهم التدريسية وتحسينها باستمرار.",
      "تمكين إدارة المدرسة من تقديم تقارير دقيقة وموثقة للجهات المشرفة عن تطور الأداء التعليمي عبر الزمن."
    ],
    "improve": [
      "تحسين جودة واتساق البيانات المجمعة على مر السنين لضمان إمكانية إجراء مقارنات ذات دلالة إحصائية.",
      "تضمين بيانات نوعية كطرق التدريس المستخدمة والبرامج الداعمة في التحليل لفهم أسباب الاتجاهات الملاحظة.",
      "تدريب عدد أكبر من المعلمين على المبادئ الأساسية لتحليل البيانات الزمنية وتفسير المخططات البيانية.",
      "إجراء مقارنات زمنية لمتغيرات أوسع تشمل الجانب السلوكي والاجتماعي إلى جانب الجانب الأكاديمي.",
      "استخدام برمجيات تحليل أكثر تطوراً لإجراء مقارنات إحصائية معقدة واستخراج رؤى أعمق من البيانات."
    ],
    "recomm": [
      "إدماج تحليل السلاسل الزمنية كممارسة روتينية في نهاية كل عام دراسي لتقييم الأثر التراكمي للجهود المبذولة.",
      "إنشاء أرشيف رقمي مركزي ومنظم لجميع النتائج الأكاديمية التاريخية لتسهيل عملية الوصول والتحليل في المستقبل.",
      "تخصيص جزء من اجتماعات مجالس المادة لمناقشة نتائج التحليلات الزمنية ووضع خطط تطوير استباقية.",
      "نشر موجز مبسط لاتجاهات الأداء العام عبر السنوات للهيئة التعليمية والمجتمع المدرسي لتعزيز الشفافية.",
      "التعاون مع مختصين في القياس والتقويم من خارج المدرسة لمراجعة منهجية التحليل ونتائجه بشكل دوري."
    ]
  },

  "تقرير سجل التغذية الراجعة من الطلاب": {
    "goal": [
      "جمع آراء ومقترحات الطلاب بشكل منهجي حول جوانب مختلفة من العملية التعليمية لتحسين جودة الخدمات المقدمة لهم.",
      "تعزيز شعور الطلاب بالانتماء والمشاركة الفاعلة من خلال إتاحة فرص حقيقية للتعبير عن آرائهم وسماعها.",
      "تطوير مهارات الطلاب في النقد البناء والتقييم الموضوعي من خلال صياغة ملاحظات واضحة ومحددة وهادفة.",
      "توفير بيانات واقعية من منظور المستفيد الرئيسي وهو الطالب تدعم عمليات صنع القرار التربوي في المدرسة.",
      "بناء ثقافة الحوار والشفافية داخل المجتمع المدرسي عبر إقامة قنوات اتصال فعالة بين الطلاب والإدارة."
    ],
    "summary": [
      "تم تطبيق استبيان تغذية راجعة شمل 300 طالب وطالبة من مختلف الصفوف حول المناخ المدرسي والأنشطة.",
      "كشف الاستبيان عن ارتفاع مستوى الرضا عن الأنشطة اللاصفية بينما أشارت نتائج أقل حول تنوع أساليب التدريس.",
      "تم عقد ثلاث جلسات حوارية مفتوحة مع ممثلين من الطلاب لمناقشة النتائج وتلقي مقترحات إضافية بشكل مباشر.",
      "أعدت الإدارة خطة عمل قصيرة المدى تتضمن 10 إجراءات ملموسة للاستجابة لأهم الملاحظات التي وردت.",
      "أعرب 85% من الطلاب الذين شاركوا عن ثقتهم بأن ملاحظاتهم ستؤخذ على محمل الجد وسيتم العمل عليها."
    ],
    "steps": [
      "تصميم أدوات جمع متنوعة كاستبيانات ومقابلات جماعية وصناديق اقتراحات تناسب الفئات العمرية المختلفة.",
      "تحديد مواعيد دورية لجمع التغذية الراجعة كنهاية كل فصل دراسي وإعلام الطلاب بها مسبقاً.",
      "توزيع الاستبيانات وإدارتها بطرق تضمن سرية المشاركين وحرية تعبيرهم دون أي ضغوط أو تخوف.",
      "تحليل البيانات المجمعة بشكل موضوعي وتصنيف الملاحظات حسب الأولوية والتكرار والمجال كالتعليمي والإداري والبيئي.",
      "إعداد تقرير تواصلي مبسط بنتائج التحليل وعرضه على الطلاب مع خطة الاستجابة المزمعة من قبل الإدارة."
    ],
    "strategies": [
      "استخدام استبيانات رقمية مجهولة المصدر لتشجيع الطلاب الخجولين على التعبير بصراحة عن آرائهم.",
      "تفعيل مجلس الطلاب كقناة رسمية ودائمة لتلقي الملاحظات ونقلها للإدارة بشكل منظم ودوري.",
      "اعتماد أسلوب جلسات الاستماع المباشرة بين فريق الإدارة ومجموعات صغيرة من الطلاب لمناقشة قضايا محددة.",
      "تطبيق نموذج الدورة السريعة للتغذية الراجعة حيث يتم جمع الملاحظات حول حدث معين فور انتهائه.",
      "إنشاء لوحة الإنجاز والمتابعة في مكان بارز لعرض أبرز الملاحظات والإجراءات المتخذة للاستجابة لها."
    ],
    "strengths": [
      "تعزيز الثقة المتبادلة بين الطلاب والإدارة من خلال الاستماع الفعال والاستجابة العملية للملاحظات المقدمة.",
      "الحصول على رؤى قيمة من داخل الصفوف قد لا يلاحظها المعلم أو الإدارة من منظورهم المختلف.",
      "اكتشاف مبكر للمشكلات البسيطة قبل أن تتحول إلى قضايا معقدة تؤثر سلباً على البيئة التعليمية.",
      "تنمية الشعور بالمسؤولية لدى الطلاب تجاه مدرستهم وتحفيزهم للمساهمة في تطويرها وتحسينها.",
      "توفير مؤشرات حقيقية لقياس رضا المستفيدين يمكن استخدامها في عمليات التقييم المؤسسي الشامل."
    ],
    "improve": [
      "توعية الطلاب بشكل أكبر حول كيفية تقديم ملاحظات بناءة وواقعية تركز على الحلول وليس فقط انتقاد المشكلات.",
      "ضمان تمثيل جميع الفئات الطلابية كالمتفوقين ومتوسطي التحصيل وذوي الصعوبات في عملية جمع الآراء.",
      "تسريع وتيرة الاستجابة للإجراءات البسيطة التي لا تحتاج إلى تخطيط طويل لإثبات جدية التعامل مع الملاحظات.",
      "تطوير أدوات جمع تغذية راجعة تناسب الطلاب الأصغر سناً في الصفوف الأولية باستخدام أساليب أكثر إبداعاً.",
      "ربط نتائج التغذية الراجعة من الطلاب ببيانات أخرى كالتحصيل الدراسي لفهم أعمق للعلاقات السببية."
    ],
    "recomm": [
      "إدراج عملية جمع وتحليل التغذية الراجعة من الطلاب ضمن السياسة التطويرية الرسمية للمدرسة بشكل دائم.",
      "تشكيل فريق عمل مشترك من المعلمين والطلاب لمتابعة تنفيذ خطة الاستجابة والإشراف على فعاليتها.",
      "نشر تقرير سنوي موجز للطلاب وأولياء أمورهم يلخص أبرز الملاحظات والإنجازات المتحققة بناءً عليها.",
      "عقد ورش عمل للمعلمين حول كيفية الاستفادة من ملاحظات الطلاب في تطوير أدائهم التدريسي بشكل شخصي.",
      "الاستفادة من التغذية الراجعة في عملية التطوير المهني للمعلمين من خلال تحديد مجالات التدريب الأكثر حاجة."
    ]
  },

  "تقرير البحث الإجرائي": {
    "goal": [
      "تمكين المعلمين من دراسة المشكلات التعليمية داخل صفوفهم بشكل منهجي وتطبيق حلول عملية قائمة على الأدلة والملاحظة.",
      "ربط الممارسة التدريسية بالتفكير الناقد والاستقصاء المنظم لتحسين فعالية التعليم والتعلم في السياق الصفي الحقيقي.",
      "تطوير ثقافة التعلم المستمر والمجتمع المهني التشاركي بين المعلمين من خلال مناقشة القضايا التربوية وإيجاد حلول لها.",
      "توفير معارف وممارسات جديدة نابعة من أرض الواقع المدرسي وذات فائدة مباشرة في معالجة التحديات اليومية.",
      "رفع الكفاءة المهنية للمعلمين عبر تدريبهم على منهجيات البحث البسيط وجمع البيانات وتحليلها وتفسير النتائج."
    ],
    "summary": [
      "أجرى 12 معلماً بحوثاً إجرائية فردية وجماعية خلال العام الدراسي حول مواضيع مثل مشاركة الطلاب وعلاج الضعف.",
      "ركزت البحوث على قضايا حقيقية واجهها المعلمون في فصولهم وتم تطبيق حلول وتقييم أثرها بشكل منهجي.",
      "نتج عن البحوث تطوير 8 استراتيجيات جديدة تم تعميم بعضها على معلمي المادة الواحدة لتحقيق الفائدة الأوسع.",
      "عرض المعلمون نتائج أبحاثهم في ملتقى تربوي داخلي وتبادلوا الخبرات والأفكار لتحسين الممارسات الصفية.",
      "أشار 90% من المعلمين المشاركين إلى أن التجربة ساهمت في تغيير نظرتهم للتحديات وطريقة تعاملهم معها."
    ],
    "steps": [
      "تحديد المشكلة أو التحدي التربوي بوضوح من قبل المعلم بناءً على ملاحظاته المباشرة داخل الغرفة الصفية.",
      "مراجعة أدبيات تربوية بسيطة متعلقة بالمشكلة لوضع إطار نظري مبدئي وتحديد استراتيجيات تدخل محتملة.",
      "تطبيق الاستراتيجية المختارة وجمع بيانات عن أثرها باستخدام أدوات مناسبة كالملاحظة والمقابلات ونتائج الطلاب.",
      "تحليل البيانات المجمعة وتفسير النتائج لتقييم مدى فعالية الاستراتيجية في معالجة المشكلة أو التحدي.",
      "توثيق البحث في تقرير مبسط ومناقشة النتائج مع الزملاء والإدارة واتخاذ قرار بشأن تعميم الاستفادة."
    ],
    "strategies": [
      "اعتماد استراتيجية دورة التحسين السريعة التي تتبع خطوات التخطيط والتنفيذ والمراقبة والتفكير والتعديل.",
      "تطبيق نموذج البحث التعاوني حيث يعمل فريق من المعلمين على دراسة مشكلة مشتركة وتطوير حل جماعي لها.",
      "استخدام يوميات المعلم كأداة لجمع بيانات وصفية غنية عن التفاعلات الصفية وتطور الموقف قيد الدراسة.",
      "تفعيل مجتمعات الممارسة المهنية كحاضنة لمناقشة تقدم الأبحاث الإجرائية وتقديم الدعم والتغذية الراجعة.",
      "ربط موضوع البحث الإجرائي بخطة التطوير المهني الفردية للمعلم لتحقيق التكامل بين التعلم والتطبيق."
    ],
    "strengths": [
      "معالجة مشكلات تعليمية حقيقية وملموسة من جذورها بدلاً من الاكتفاء بالتعامل مع أعراضها السطحية فقط.",
      "تمكين المعلمين وإعطاؤهم دور الباحث الفعال الذي يساهم في توليد المعرفة وليس مجرد تطبيقها من مصادر خارجية.",
      "خلق بيئة مدرسية داعمة للابتكار والتجريب حيث يُشجع المعلم على تجربة أساليب جديدة دون خوف من الفشل.",
      "تحسين مخرجات التعلم للطلاب بشكل مباشر نتيجة لتطبيق استراتيجيات محسنة ومبنية على فهم أعمق لواقعهم.",
      "بناء روابط أقوى بين المعلمين من خلال العمل التعاوني على القضايا المهنية وتبادل الخبرات الناجحة."
    ],
    "improve": [
      "تخفيف العبء التدريسي على المعلمين الباحثين لتوفير وقت كافٍ لجمع البيانات وتحليلها وتوثيق البحث بشكل جيد.",
      "توفير مرشد أو مختص في منهجية البحث الإجرائي ليدعم المعلمين وخصوصاً المبتدئين منهم في خطوات البحث.",
      "تسهيل الوصول للمصادر والمراجع التربوية الأساسية التي يحتاجها المعلمون لدعم أطرهم النظرية البسيطة.",
      "تعميم ثقافة مشاركة النتائج حتى السلبية منها كفرص للتعلم الجماعي دون خوف من الأحكام المسبقة.",
      "ربط نتائج البحوث الإجرائية بخطة تطوير المدرسة الشاملة واعتماد ما يثبت نجاحه من استراتيجيات كممارسات معتمدة."
    ],
    "recomm": [
      "تخصيص جزء من وقت الاجتماعات الدورية للمعلمين لعرض مختصر لبحوثهم الإجرائية ونقاشها مع الزملاء.",
      "إنشاء أرشيف إلكتروني بسيط في المدرسة لتخزين تقارير البحوث الإجرائية والاستفادة منها كمراجع مستقبلية.",
      "تنظيم ملتقى سنوي داخلي لعرض أبرز البحوث وتكريم المعلمين الذين قدموا أبحاثاً متميزة وعملية.",
      "تشجيع المعلمين على نشر بحوثهم في مجلات تربوية محلية أو مشاركتها في مؤتمرات تعليمية بسيطة.",
      "دمج مهارات البحث الإجرائي الأساسية في برنامج الاستقبال والتأهيل للمعلمين الجدد في المدرسة."
    ]
  },

  "تقرير معرفة الميول والاتجاهات": {
    "goal": [
      "اكتشاف اهتمامات وقدرات واتجاهات الطلاب النفسية والاجتماعية لتوجيههم تربوياً ومهنياً بشكل مبكر وفعال.",
      "توفير بيانات شخصية عن كل طالب تساعد المعلمين على تلبية احتياجاته التعليمية والنفسية بشكل فردي.",
      "تطوير برامج الأنشطة اللاصفية والمسارات الاختيارية بما يتوافق مع الميول السائدة لدى مجتمع الطلاب.",
      "مساعدة الطلاب على فهم ذواتهم بشكل أفضل واتخاذ قرارات أكثر وعياً فيما يخص مسارهم الدراسي والمهني.",
      "بناء قاعدة معلوماتية لرعاية المواهب الخاصة وتقديم الدعم المناسب للطلاب ذوي الميول غير التقليدية أو النادرة."
    ],
    "summary": [
      "تم تطبيق مجموعة من الاستبيانات والمقاييس المعيارية البسيطة لاستكشاف ميول 400 طالب في المرحلة المتوسطة.",
      "كشفت النتائج عن تنوع كبير في الاهتمامات، مع ميل واضح نحو المجالات التقنية والفنية لدى نسبة كبيرة.",
      "تم عقد جلسات إرشادية فردية مع 50 طالباً أظهرت نتائجهم تناقضاً بين ميولهم وقدراتهم الأكاديمية الفعلية.",
      "استخدمت النتائج في توجيه الطلاب نحو الأندية والأنشطة المناسبة وإثراء المكتبة بمواد تتناسب مع اهتماماتهم.",
      "أبدى أولياء الأمور ارتياحهم للمبادرة وطلبوا المزيد من الجلسات الإرشادية لمساعدة أبنائهم في اختيار التخصص."
    ],
    "steps": [
      "اختيار وتصميم أدوات قياس مناسبة للمرحلة العمرية كاستبيانات وقوائم اهتمامات ورسوم ومقابلات.",
      "توعية الطلاب وأولياء أمورهم بأهداف عملية الاستكشاف وضمان السرية التامة للبيانات الشخصية المجمعة.",
      "تطبيق الأدوات في أجواء مريحة وخالية من الضغط مع توضيح أنه لا توجد إجابات صحيحة أو خاطئة.",
      "تحليل النتائج إحصائياً ونوعياً وتصنيف الطلاب إلى فئات وفقاً لأنماط الميول والاتجاهات السائدة.",
      "إعداد تقرير شامل وتقديم التوصيات التربوية والإرشادية المناسبة لكل فئة أو لكل حالة فردية بارزة."
    ],
    "strategies": [
      "استخدام استراتيجية الملف الشخصي الشامل الذي يجمع بيانات عن الميول والهوايات والسمات الشخصية للطالب.",
      "تطبيق نموذج المراقبة المنظمة في الأنشطة الحرة والفنية والرياضية لاكتشاف الميول بشكل طبيعي غير مقنن.",
      "اعتماد أسلوب المقابلة الإرشادية شبه المقننة لمناقشة اهتمامات الطالب وأحلامه المستقبلية بعمق أكبر.",
      "تفعيل اليوم المفتوح للمهن والاهتمامات حيث يلتقي الطلاب بمتخصصين من مجالات متنوعة تثير اهتمامهم.",
      "استخدام منصات رقمية تفاعلية تقدم للطالب استكشافاً ذاتياً لميوله من خلال ألعاب وأنشطة تنافسية بسيطة."
    ],
    "strengths": [
      "تقديم صورة شاملة للطالب تتجاوز الجانب الأكاديمي فقط، مما يساهم في فهمه كشخصية متكاملة القوى والاهتمامات.",
      "اكتشاف مواهب واهتمامات خفية لدى طلاب قد لا تظهر في الإطار الأكاديمي التقليدي للفصل الدراسي.",
      "توجيه الموارد المدرسية كالمكتبة والمختبرات والأندية لتلبية احتياجات حقيقية وموثقة لدى الطلاب.",
      "تحسين العلاقة بين المرشد الطلابي والطالب من خلال مناقشات تعتمد على بيانات موضوعية عن شخصيته واهتماماته.",
      "توفير أساس علمي وعملي لبرامج التوجيه المهني والإرشاد الأكاديمي في المراحل الدراسية اللاحقة."
    ],
    "improve": [
      "تحديث أدوات القياس بانتظام لمواكبة التغيرات السريعة في اهتمامات الأجيال الجديدة والمجالات الناشئة.",
      "تجنب وصم الطلاب بتصنيفات ثابتة بناءً على نتائج الميول والتأكيد على أنها مؤشرات ديناميكية قابلة للتغير.",
      "دمج نتائج ميول الطلاب مع نتائج التحصيل الدراسي لتقديم توجيه أكثر واقعية وتكاملاً بين الرغبة والقدرة.",
      "توسيع نطاق الاستكشاف ليشمل ميول الطالب نحو أنماط التعلم وبيئات العمل المفضلة لديه، وليس فقط المجالات.",
      "توفير تدريب أكثر تخصصاً للمرشدين الطلابيين على تفسير نتائج مقاييس الميول والتعامل مع الحالات الخاصة."
    ],
    "recomm": [
      "الاستمرار في تطبيق برنامج استكشاف الميول بشكل دوري كل سنتين أو ثلاث لتتبع تطور اهتمامات الطلاب.",
      "إنشاء خريطة المواهب والاهتمامات للمدرسة تساعد في تكوين فرق للأنشطة والمسابقات الخارجية بكفاءة.",
      "عقد لقاءات توعوية لأولياء الأمور حول كيفية دعم ميول أبنائهم في المنزل دون إثقال كاهلهم بتوقعات مبالغ فيها.",
      "تطوير شراكات مع مؤسسات المجتمع المحلي كالمتاحف والمراكز التقنية لتنظيم زيارات تتناسب مع اهتمامات الطلاب.",
      "اعتماد نتائج استكشاف الميول كأحد المدخلات الرئيسية في عملية تطوير المناهج الإثرائية والأنشطة اللاصفية."
    ]
  },

  "تقرير عضوية لجنة التميز والجودة": {
    "goal": [
      "متابعة وضمان تطبيق معايير الجودة الشاملة في جميع الجوانب الأكاديمية والإدارية والخدمية داخل المدرسة.",
      "تطوير وتحسين العمليات المدرسية بشكل مستمر من خلال تقييم الأداء واقتراح خطط التحسين المناسبة لها.",
      "تعزيز ثقافة التميز والتحسين المستمر بين جميع أعضاء الهيئة التعليمية والإدارية والطلابية في المدرسة.",
      "التحضير والمشاركة الفاعلة في عمليات التقييم الخارجي والاعتماد المدرسي من قبل الجهات الرسمية المختصة.",
      "توثيق الممارسات الناجحة ووضع مؤشرات أداء لقياس التقدم نحو تحقيق الأهداف الاستراتيجية للمدرسة."
    ],
    "summary": [
      "انعقدت اللجنة 8 مرات خلال العام الدراسي وناقشت محاور رئيسية مثل جودة الخطط الدراسية والتقييم.",
      "أجرت اللجنة 3 مراجعات داخلية لعمليات مختارة وقدمت تقارير تضمنت 25 توصية للتحسين الفوري والمستقبلي.",
      "تم تحديث 40% من الوثائق والسياسات الإجرائية بناءً على نتائج المراجعات الداخلية وملاحظات اللجنة.",
      "نجحت المدرسة في اجتياز عملية التقييم الخارجي الأولي وحصلت على تقييم مطابق في 85% من المعايير.",
      "انخفض عدد الشكاوى الواردة من أولياء الأمور بنسبة 20% بعد تطبيق بعض إجراءات التحسين التي اقترحتها اللجنة."
    ],
    "steps": [
      "تشكيل اللجنة من أعضاء يمثلون مختلف الإدارات والمعلمين والمرشدين لضمان رؤية شاملة ومتكاملة.",
      "وضع خطة عمل سنوية مفصلة للجنة تحدد مواعيد الاجتماعات والمحاور الرئيسية للمراجعة والتطوير.",
      "تنفيذ عمليات المراجعة الداخلية وفق منهجية محددة تشمل جمع الأدلة وتحليلها ومقارنتها مع المعايير المعتمدة.",
      "إعداد تقارير نتائج المراجعة وتقديمها لإدارة المدرسة مع توصيات عملية ومحددة زمنياً للتحسين.",
      "متابعة تنفيذ توصيات التحسين والتأكد من إغلاق الملاحظات وتوثيق الإجراءات التصحيحية المتخذة."
    ],
    "strategies": [
      "اعتماد استراتيجية دورة ديمنج وهي التخطيط والتنفيذ والمراجعة والتطوير كإطار عام لعمل اللجنة.",
      "تطبيق نموذج مراجعة الأقران بين المعلمين أو بين الأقسام لتبادل الخبرات وتقييم الممارسات بشكل تعاوني.",
      "استخدام مقاييس الأداء الرئيسية لتتبع تقدم المدرسة في تحقيق أهدافها الكمية والنوعية بشكل موضوعي.",
      "تفعيل صناديق اقتراحات التحسين لتشجيع جميع العاملين والطلاب على الإسهام بأفكار لتحسين الجودة.",
      "اعتماد أسلوب تحليل السبب الجذري للمشكلات المتكررة بدلاً من معالجة الأعراض فقط لضمان استدامة الحلول."
    ],
    "strengths": [
      "خلق وعي جماعي بأهمية الجودة والتميز وانتقالها من كونها مسؤولية إدارة فقط إلى مسؤولية جميع العاملين.",
      "تحسين تناسق واتساق الممارسات بين المعلمين والإدارات المختلفة نتيجة لوضع سياسات وإجراءات موحدة.",
      "رفع مستوى الشفافية والمساءلة الداخلية من خلال وجود آلية منهجية للمراجعة والتقييم المستمر للأداء.",
      "الاستعداد الأفضل للمدرسة لعمليات التقييم والاعتماد الخارجي مما يقلل التوتر ويزيد فرص النجاح.",
      "بناء قاعدة وثائقية قوية للمدرسة تسهل عملية نقل المعرفة والإجراءات للمعلمين والإداريين الجدد."
    ],
    "improve": [
      "زيادة مشاركة الطلاب وأولياء الأمور في عمليات المراجعة الداخلية للحصول على منظور أكثر شمولية.",
      "تخصيص وقت محدد من جدول أعضاء اللجنة لمهام الجودة لتجنب تعارضها مع مسؤولياتهم التدريسية والإدارية الأساسية.",
      "توظيف أدوات تقنية أكثر تطوراً في جمع وتحليل بيانات مؤشرات الأداء لتوفير الوقت وزيادة الدقة.",
      "تدريب أعضاء اللجنة بشكل مكثف على منهجيات المراجعة الداخلية وتحليل البيانات وكتابة التقارير الفنية.",
      "ربط نتائج مؤشرات الأداء ومخرجات اللجنة بشكل أوضح بخطة التحسين المدرسي السنوية وميزانيتها."
    ],
    "recomm": [
      "الاستمرار في دعم عمل اللجنة وتوفير الموارد اللازمة لها لتحقيق أهدافها المتمثلة في التطوير المستمر.",
      "عقد ورش عمل تعريفية دورية لجميع منسوبي المدرسة حول سياسات الجودة المعتمدة ودور كل فرد فيها.",
      "إنشاء مكتبة إلكترونية مركزية لوثائق الجودة والسياسات لضمان سهولة الوصول إليها من قبل الجميع.",
      "الاحتفال والاعتراف بالإنجازات والتحسينات الناجحة التي تحققت بفضل اقتراحات وتوصيات لجنة الجودة.",
      "تبادل الخبرات مع لجان الجودة في مدارس أخرى عبر زيارة تبادلية أو عقد لقاءات افتراضية لتعميم الفائدة."
    ]
  },

  "تقرير عضوية لجنة التدقيق": {
    "goal": [
      "التحقق من دقة وسلامة السجلات المالية والإدارية للمدرسة ومدى التزامها باللوائح والأنظمة المعمول بها.",
      "ضمان الاستخدام الفعال والشفاف للموارد المالية للمدرسة والإنفاق وفقاً للأولويات والميزانيات المعتمدة.",
      "مراجعة عمليات الشراء والمخازن والمستودعات لضمان تطبيق إجراءات الرقابة الداخلية المناسبة والحفاظ على الممتلكات.",
      "تقييم كفاءة وفعالية النظم المحاسبية والإدارية المتبعة في المدرسة واقتراح التحسينات اللازمة لتعزيزها.",
      "تعزيز الثقة بين المدرسة وأصحاب المصلحة كالوزارة وأولياء الأمور من خلال ضمان النزاهة والمساءلة المالية."
    ],
    "summary": [
      "أجرت اللجنة 4 جولات تدقيقية خلال العام وراجعت 100% من العمليات والمستندات المالية الكبرى.",
      "تم تصحيح 5 حالات عدم مطابقة طفيفة تتعلق بتوثيق عمليات الصرف النقدي وتسوية المبالغ المستردة.",
      "أكدت اللجنة التزام المدرسة الكامل بالتعليمات المالية الصادرة وخلو سجلاتها من أي مخالفات جسيمة.",
      "نتج عن التوصيات تحسين في نظام أرشفة الفواتير والإيصالات مما سهل عملية المراجعة والمتابعة الدورية.",
      "رفعت اللجنة تقريرها الختامي لإدارة المدرسة والجهة المشرفة مع خطة عمل لمعالجة الملاحظات الطفيفة."
    ],
    "steps": [
      "تحديد نطاق وجدول زمني للتدقيق الداخلي بناءً على تقييم للمخاطر وأهمية المجالات المختلفة للمدرسة.",
      "فحص عينات عشوائية من المستندات المالية كالفواتير والإيصالات وعروض أسعار ودفاتر الشيكات والتحقق من صحتها.",
      "مقارنة العمليات المسجلة مع اللوائح المالية المعمول بها والتحقق من وجود التوثيق والإجراءات اللازمة.",
      "إجراء جولات ميدانية للمخازن والمستودعات والمقاصف للتحقق من الموجودات الفعلية ومطابقتها للسجلات.",
      "إعداد تقرير تدقيق واضح يبين الملاحظات وتوصيات التحسين ومناقشته مع المسؤولين قبل رفعه رسمياً."
    ],
    "strategies": [
      "اعتماد استراتيجية التدقيق القائم على المخاطر للتركيز على المجالات الأكثر عرضة للخطأ أو سوء الاستخدام.",
      "تطبيق أسلوب التدقيق المفاجئ لعمليات محددة كالمقصف المدرسي للحصول على صورة واقعية عن الأداء.",
      "استخدام قوائم المراجعة المعيارية لضمان شمولية عملية التدقيق وعدم إغفال أي بند مهم من بنود الرقابة.",
      "تفعيل تحليل البيانات المالية البسيط كالمقارنة بين المصروفات والميزانيات لتحديد أي أنماط إنفاق غير معتادة.",
      "الاعتماد على أخذ العينات العشوائية والانتقائية لتقييم مدى فعالية الرقابة الداخلية في العمليات المختلفة."
    ],
    "strengths": [
      "ضمان أعلى مستويات النزاهة والدقة في التعاملات المالية للمدرسة وحماية ممتلكاتها من أي إهمال أو سوء استخدام.",
      "اكتشاف الثغرات أو نقاط الضعف في الإجراءات المالية مبكراً ومعالجتها قبل أن تتحول إلى مشكلات كبيرة.",
      "رفع مستوى الوعي والمسؤولية لدى جميع العاملين في التعامل مع المال العام والموارد المدرسية الأخرى.",
      "توفير ضمانة موضوعية للإدارة والجهات المشرفة على سلامة الوضع المالي والإداري للمدرسة.",
      "تحسين سمعة المدرسة كمؤسسة تعليمية ملتزمة بقواعد الحوكمة الرشيدة والشفافية المالية والإدارية."
    ],
    "improve": [
      "توفير تدريب متخصص لأعضاء لجنة التدقيق على أحدث المعايير والإجراءات المحاسبية والتدقيقية المناسبة للمدارس.",
      "تطوير واستخدام نماذج تقارير تدقيق إلكترونية تسهل عملية التوثيق والمتابعة وتقليل الأخطاء اليدوية.",
      "زيادة التنسيق بين لجنة التدقيق ولجنة المشتريات والمخازن لضمان التكامل في عملية المراجعة والرقابة.",
      "إجراء تدقيقات ميدانية أكثر تكراراً للمقصف المدرسي ونشاطات الجمعية التعاونية لضمان شفافية تعاملاتها.",
      "تعميم مخرجات التدقيق بما لا يخل بالسرية على لجان المدرسة الأخرى لدعم عملية التحسين الشامل."
    ],
    "recomm": [
      "الاستمرار في تفعيل دور لجنة التدقيق الداخلي وجعل اجتماعاتها ونشاطاتها جزءاً أساسياً من خطة المدرسة السنوية.",
      "إشراك عضو من أولياء الأمور ذوي الخبرة المالية أو المحاسبية في لجنة التدقيق لتعزيز الشفافية والثقة المجتمعية.",
      "توثيق جميع إجراءات وسياسات التدقيق الداخلي في دليل عمل واضح يضمن استمرارية العمل حتى مع تغير الأعضاء.",
      "ربط نتائج التقارير التدقيقية ببرامج التطوير المهني للموظفين الإداريين في المجال المالي والمخزني.",
      "التواصل مع أقسام التدقيق في المدارس المماثلة لتبادل الخبرات والأفضل الممارسات في مجال الرقابة المدرسية."
    ]
  },

  "تقرير رعاية الطلاب المتأخرين دراسيًا": {
    "goal": [
      "تحديد الطلاب الذين يعانون من تأخر دراسي مبكراً وتشخيص أسباب هذا التأخر سواء كانت أكاديمية أو نفسية أو اجتماعية.",
      "توفير برامج علاجية وتعليمية داعمة ومكثفة تتناسب مع احتياجات كل طالب متأخر لمساعدته على تجاوز صعوباته.",
      "متابعة التقدم الأكاديمي للطلاب المستهدفين بشكل دوري وتقييم فعالية البرامج العلاجية المقدمة لهم.",
      "دعم الثقة النفسية للطالب المتأخر وتعزيز دافعيته للتعلم من خلال خلق تجارب نجاح صغيرة ومتكررة تناسب مستواه.",
      "إشراك أولياء أمور الطلاب المتأخرين في خطة الرعاية وتقديم التوجيه اللازم لهم لدعم أبنائهم في المنزل بشكل فعال."
    ],
    "summary": [
      "تم تحديد 45 طالباً من مختلف الصفوف كحالات تحتاج إلى رعاية بسبب تأخرهم الملحوظ في مادة أساسية أو أكثر.",
      "وضعت خطط فردية للرعاية شملت حصص تقوية وبرامج علاجية نفسية واجتماعية ومتابعة يومية من المرشدين.",
      "أظهر 70% من الطلاب المستهدفين تحسناً في درجاتهم يتراوح بين 10% إلى 30% في نهاية الفصل الدراسي.",
      "انخفضت نسبة الغياب غير المبرر لدى هذه الفئة من الطلاب بعد تطبيق برنامج الرعاية والدعم النفسي المكثف.",
      "أعرب أولياء أمور 80% من الحالات عن ارتياحهم للجهود المبذولة وملاحظتهم لتحسن في سلوك أبنائهم تجاه المدرسة."
    ],
    "steps": [
      "تحليل نتائج التقييمات المستمرة والاختبارات الفصلية للكشف المبكر عن الطلاب المتأخرين دراسياً في كل صف.",
      "تشخيص أسباب التأخر من خلال مقابلات مع الطالب وولي الأمر والمعلمين ودراسة ملفه الأكاديمي والسلوكي.",
      "تصميم خطة رعاية فردية لكل طالب تحدد الأهداف العلاجية والإجراءات والمسؤوليات والجدول الزمني للتنفيذ.",
      "تنفيذ الخطة عبر توفير حصص علاجية مكثفة في المواد المستهدفة وجلسات إرشادية فردية وجماعية داعمة.",
      "متابعة التقدم أسبوعياً عبر تقييمات قصيرة وملاحظات المعلمين وتعديل الخطة عند الضرورة لتحقيق أفضل النتائج."
    ],
    "strategies": [
      "اعتماد استراتيجية التدخل المبكر والمكثف بمجرد ظهور علامات التأخر وعدم الانتظار حتى نهاية العام الدراسي.",
      "تطبيق نموذج الاستجابة للتدخل الذي يتدرج في تقديم الدعم من العام إلى المكثف جداً وفقاً لاستجابة الطالب.",
      "استخدام التعليم العلاجي المصغر في مجموعات صغيرة جداً مكونة من 2-3 طلاب لمعالجة صعوبات تعلم محددة بدقة.",
      "تفعيل عقد النجاح بين الطالب والمعلم أو المرشد لتحقيق أهداف أكاديمية وسلوكية صغيرة وقابلة للقياس.",
      "إشراك الطلاب المتفوقين كمساعدين تعليميين لأقرانهم المتأخرين في جو تعاوني يخلق روابط إيجابية."
    ],
    "strengths": [
      "تحقيق تقدم أكاديمي ملموس لدى نسبة كبيرة من الطلاب المستهدفين وإعادتهم إلى مسار التعلم الطبيعي مع أقرانهم.",
      "تحسن واضح في الحالة النفسية والاجتماعية للطلاب المتأخرين وزيادة انتمائهم للمدرسة ورغبتهم في الحضور.",
      "اكتساب المعلمين مهارات جديدة في التعامل مع الفروق الفردية وتصميم أنشطة تعليمية داعمة ومتنوعة المستويات.",
      "بناء شراكة فعالة مع أولياء الأمور الذين أصبحوا أكثر تفهماً لمشكلات أبنائهم وأكثر استعداداً للتعاون مع المدرسة.",
      "خلق وعي جماعي داخل المجتمع المدرسي بأهمية دعم الفئات الأقل حظاً وتقديم المساعدة لها دون وصم أو تشهير."
    ],
    "improve": [
      "زيادة عدد المعلمين المدربين على التعامل مع صعوبات التعلم وتطوير أدوات تشخيص أكثر دقة للكشف عن الأسباب الجذرية.",
      "توفير مواد تعليمية ووسائل إيضاح مناسبة للتعليم العلاجي تناسب أنماط التعلم المختلفة للطلاب المتأخرين.",
      "مراعاة العبء الزائد على المعلمين الذين يقدمون حصص العلاج وتخفيف بعض المهام الإدارية عنهم لتركيز جهودهم.",
      "توسيع نطاق الرعاية ليشمل الطلاب المتأخرين بسبب عوامل سلوكية أو انضباطية وليس فقط لأسباب أكاديمية بحتة.",
      "إجراء تقييمات منتظمة لمدى استمرارية التحسن الذي يحرزه الطلاب بعد انتهاء برنامج الرعاية المكثف لفترة محددة."
    ],
    "recomm": [
      "الاستمرار في برنامج الرعاية وتطويره ليصبح جزءاً أساسياً من الخدمات التعليمية الداعمة التي تقدمها المدرسة.",
      "إنشاء قاعدة بيانات إلكترونية متابعة للحالات تسجل كل مراحل التشخيص والعلاج والمتابعة لكل طالب مستهدف.",
      "عقد لقاءات دورية لأولياء أمور الطلاب المتأخرين كمجموعة دعم لتشارك الخبرات وتلقي التوجيه الجمعي.",
      "تكريم الطلاب الذين أظهروا تحسناً ملحوظاً في نهاية كل فصل دراسي لتشجيعهم وتحفيز الآخرين على السير على خطاهم.",
      "توثيق استراتيجيات التدخل الناجحة ونماذج الخطط الفردية لإنشاء مرجعية تدريبية للمعلمين الجدد في هذا المجال."
    ]
  },

  "تقرير دراسة حالة": {
    "goal": [
      "فهم وضع طالب معين أو حالة تربوية خاصة بعمق من خلال جمع وتحليل بيانات شاملة من مصادر متعددة ووجهات نظر مختلفة.",
      "تشخيص المشكلات التربوية أو النفسية أو الاجتماعية المعقدة التي يعاني منها الطالب بشكل منهجي ودقيق.",
      "وضع خطة تدخل فردية شاملة ومتكاملة تستند إلى تحليل علمي للعوامل المؤثرة في الحالة قيد الدراسة.",
      "تطوير مهارات المعلمين والمرشدين في الملاحظة المنظمة والتحليل النوعي وتقديم الدعم المخصص للحالات الفردية.",
      "توفير نموذج توثيقي مفصل يمكن الرجوع إليه لمتابعة تطور الحالة أو نقل المعلومات للمختصين عند الحاجة للاستشارة."
    ],
    "summary": [
      "تم إجراء 5 دراسات حالة خلال العام الدراسي لحالات طلابية متنوعة شملت صعوبات تعلم وعزلة اجتماعية وسلوك عدواني.",
      "اعتمدت الدراسات على مقابلات مع الطالب وأسرته ومعلميه ومراجعة سجلاته الأكاديمية والسلوكية على مدى سنتين.",
      "نتج عن كل دراسة خطة علاجية فردية متعددة الجوانب كالأكاديمية والنفسية والسلوكية والأسرية ومتابعة أسبوعية مكثفة.",
      "أظهرت 4 من أصل 5 حالات تحسناً كبيراً في المجال المستهدف بعد 3 أشهر من تطبيق خطة التدخل والتوجيه.",
      "تم توثيق جميع الدراسات في أرشيف سري وتمت مناقشة النتائج العامة مع الحفاظ على السرية في ورشة عمل للمعلمين."
    ],
    "steps": [
      "اختيار الحالة بناءً على استمرارية المشكلة وتعقيدها وعدم استجابتها للتدخلات العادية الروتينية المقدمة.",
      "جمع البيانات من مصادر متعددة كملاحظات معلمين ومقابلات مع الطالب والأسرة واختبارات نفسية أو أكاديمية بسيطة.",
      "تنظيم وتحليل البيانات لتحديد الأنماط والعوامل المساهمة في المشكلة ووضع فرضية تفسيرية مبدئية للحالة.",
      "صياغة خطة تدخل شاملة تحدد الأهداف والاستراتيجيات والمسؤوليات والجدول الزمني وطرق قياس التقدم.",
      "تنفيذ الخطة ومتابعة الحالة أسبوعياً وتقييم مدى فعالية التدخلات وتعديلها عند الضرورة لتحقيق النتائج المرجوة."
    ],
    "strategies": [
      "اعتماد منهج الدراسة الطولية لمتابعة تطور الحالة عبر الزمن بدلاً من الاكتفاء بصورة لَحظية عن وضعها.",
      "استخدام خريطة العلاقات الأسرية والاجتماعية لفهم شبكة الدعم والتأثيرات المحيطة بالطالب داخل وخارج المدرسة.",
      "تطبيق تحليل ABC وهو السلوك والظروف السابقة والنتائج لفهم ديناميكية السلوك المشكل وتحديد محفزاته وعواقبه.",
      "اعتماد أسلوب مجموعة دراسة الحالة التي تضم معلمي الطالب والمرشد وولي الأمر للتشاور وصياغة الخطة الجماعية.",
      "توظيف المقاييس النفسية أو التربوية المعيارية البسيطة عند الحاجة للحصول على بيانات قابلة للمقارنة."
    ],
    "strengths": [
      "تقديم فهم عميق وشامل للحالات المعقدة التي تفشل الأساليب العامة في معالجتها بشكل مناسب وفعال.",
      "تطوير مقاربة فردية وإنسانية تركز على احتياجات الطالب الخاصة بعيداً عن التعامل النمطي مع المشكلات.",
      "بناء جسر تواصل وتعاون قوي بين المدرسة والأسرة من خلال العمل المشترك على فهم ودعم حالة الابن.",
      "رفع مستوى الكفاءة المهنية للمعلمين المشاركين في دراسة الحالة من خلال التعلم العملي على التحليل والتشخيص.",
      "توفير سجل توثيقي دقيق يساعد في نقل الحالة بين المراحل الدراسية أو عند تحويلها لمختص خارجي إذا لزم الأمر."
    ],
    "improve": [
      "ضمان سرية المعلومات المجمعة والحساسة بشكل صارم وتقنين الوصول إليها فقط للأشخاص المعنيين مباشرة بالحالة.",
      "تحديد وقت مخصص في جدول المعلمين والمرشدين لأعمال دراسة الحالة ومتابعتها لضمان عدم إهمالها بسبب الانشغالات.",
      "توفير إشراف من قبل مختص نفسي أو تربوي ذي خبرة على عملية دراسة الحالة لضمان منهجيتها ودقة تحليلها.",
      "توحيد نموذج تقرير دراسة الحالة المستخدم في المدرسة ليشمل جميع العناصر الأساسية ويسهل عملية الأرشيف والمراجعة.",
      "توسيع دائرة الحالات المدروسة لتشمل طلاباً ذوي إنجازات عالية أو سلوكيات استثنائية إيجابية لفهم عوامل النجاح."
    ],
    "recomm": [
      "الاستمرار في إجراء دراسات حالة لعدد محدود من الحالات الأكثر تعقيداً سنوياً كجزء من برنامج الرعاية المتقدمة.",
      "إنشاء أرشيف مركزي مشفر لدراسات الحالة مع ضوابط وصول صارمة لحماية الخصوصية مع الاستفادة منها لأغراض البحث الداخلي.",
      "عقد ورشة عمل نصف سنوية لعرض دراسات حالة منتهية مع حذف البيانات الشخصية كتدريب تطبيقي للمعلمين الجدد.",
      "تشجيع المعلمين على كتابة ملاحظاتهم التحليلية الأولية عن أي طالب يثير قلقهم كمقدمة ممكنة لدراسة حالة مستقبلية.",
      "التنسيق مع عيادات الإرشاد الأسري أو مراكز صعوبات التعلم في المنطقة لإمكانية تحويل الحالات التي تتجاوز إمكانيات المدرسة."
    ]
  },

  "تقرير تحليل النتائج": {
    "goal": [
      "دراسة النتائج الأكاديمية للطلاب بشكل إحصائي وتحليلي لتحديد نقاط القوة والضعف في التحصيل الدراسي العام.",
      "مقارنة أداء الطلاب والفصول والمواد الدراسية المختلفة لاكتشاف الأنماط والاتجاهات العامة والاستثناءات.",
      "تقييم فاعلية المناهج وطرق التدريس والتقييم من خلال ربطها بنتائج التحصيل الفعلية للطلاب في الاختبارات.",
      "توفير بيانات موضوعية وكمية تدعم عملية اتخاذ القرارات التربوية المتعلقة بالتطوير وتحسين الأداء التعليمي.",
      "تحديد الفجوات التعليمية والفئات الطلابية الأكثر احتياجاً للدعم وتوجيه الموارد والجهود العلاجية نحوها."
    ],
    "summary": [
      "تم تحليل نتائج الفصل الدراسي الأول لجميع الصفوف وشملت 12 مادة دراسية وبلغ عدد العينات 8000 درجة.",
      "أظهر التحليل تفوقاً واضحاً في المواد الأدبية بينما كانت نتائج المواد العلمية والرياضيات أقل بمتوسط 15%.",
      "تم تحديد 3 فصول دراسية كحالات ناجحة أفضل ممارسة وفحص العوامل المشتركة في بيئتها التعليمية.",
      "كشف التحليل عن وجود علاقة إيجابية بين انتظام الحضور والمشاركة الصفية وارتفاع مستوى التحصيل الدراسي.",
      "رفعت نتائج التحليل مع توصيات عملية إلى لجان المناهج والتخطيط لاعتمادها في وضع خطط التحسين للفصل القادم."
    ],
    "steps": [
      "جمع البيانات الخام للنتائج من السجلات الإلكترونية والورقية وتنظيمها في جداول حسب المتغيرات المطلوبة كالمادة والصف والجنس.",
      "حساب المؤشرات الإحصائية الأساسية مثل المتوسطات والنسب المئوية والانحراف المعياري للمقارنة بين المجموعات المختلفة.",
      "تحويل البيانات إلى تمثيلات بيانية كمخططات عمودية ودائرية وخطية لتوضيح الأنماط والاختلافات بشكل بصري سهل الفهم.",
      "تحليل النتائج وتفسيرها تربوياً بوضع فرضيات للأسباب الكامنة وراء الاتجاهات الملاحظة وربطها بالسياق التعليمي.",
      "صياغة التوصيات المبنية على الأدلة والموجهة نحو تحسين عمليات التدريس والتعلم والتقييم في المجالات الضعيفة."
    ],
    "strategies": [
      "استخدام التحليل المقارن بين أداء الفصول في المادة الواحدة أو أداء الصف الواحد في المواد المختلفة.",
      "تطبيق تحليل التباين البسيط لفهم مدى انتشار الدرجات وتحديد ما إذا كان الضعف عاماً أم مركزاً في فئة محددة.",
      "اعتماد أسلوب تحليل الاتجاه لمقارنة النتائج الحالية مع نتائج الفصول السابقة لنفس الصفوف لتقييم التقدم أو التراجع.",
      "استخدام خرائط الحرارة أو الترميز اللوني في الجداول لتحديد مناطق القوة بالأخضر والضعف بالأحمر بسرعة.",
      "تطبيق تحليل الفجوة بين الأداء الحقيقي والأداء المستهدف أو المتوقع لكل مادة أو لكل مجموعة طلابية."
    ],
    "strengths": [
      "توفير صورة شاملة وموضوعية عن الواقع الأكاديمي للمدرسة بعيداً عن الانطباعات الشخصية أو العشوائية.",
      "الكشف المبكر والدقيق عن المجالات أو المهارات التعليمية التي تحتاج إلى مراجعة وتدخل عاجل من قبل المعلمين.",
      "دعم ثقافة اتخاذ القرارات المبنية على الأدلة والبيانات داخل المدرسة في جميع الجوانب التعليمية.",
      "تمكين إدارة المدرسة من تقديم تقارير دقيقة وواضحة للجهات المشرفة عن مستويات التحصيل والتحديات القائمة.",
      "تحفيز التنافس الإيجابي بين المعلمين والفصول من خلال المقارنات الموضوعية والشفافة للأداء النسبي."
    ],
    "improve": [
      "تضمين تحليل النتائج التكوينية كالاختبارات القصيرة والمشاريع وليس فقط النتائج النهائية الفصلية للحصول على صورة أدق.",
      "تدريب عدد أكبر من المعلمين على المبادئ الأساسية لتحليل البيانات واستخراج الدلالات التربوية منها.",
      "استخدام برامج تحليل بيانات أكثر تطوراً تسمح بإجراء تحليلات متقاطعة ومعقدة بجهد ووقت أقل.",
      "إجراء مقابلات نوعية مع عينات من الطلاب ذوي الأداء المنخفض أو المرتفع لفهم العوامل الخلفية التي لا تظهر في الأرقام.",
      "ربط تحليل النتائج الأكاديمية ببيانات الحضور والانصراف والسلوك لاستكشاف العلاقات والتأثيرات المتبادلة."
    ],
    "recomm": [
      "إجراء تحليل شامل للنتائج في نهاية كل فصل دراسي وعرض موجزاته في اجتماع عام للمعلمين في بداية الفصل التالي.",
      "إنشاء فريق تحليل بيانات صغير من المعلمين المهتمين لتولي هذه المهمة وتطوير كفاءاتهم فيها بشكل مستمر.",
      "تطوير لوحة مؤشرات أداء رقمية داشبورد تعرض النتائج الرئيسية والمقارنات بشكل مباشر ومحدث للإدارة والمعلمين.",
      "عقد ورش عمل للمعلمين حول كيفية استخدام نتائج التحليل في تخطيط دروسهم ووضع استراتيجيات علاجية لفصولهم.",
      "مشاركة نتائج التحليل ضمن الحدود المناسبة مع أولياء الأمور لتعزيز الشفافية وشرح خطط التحسين المدرسية."
    ]
  },

  "تقرير تفعيل حصص النشاط": {
    "goal": [
      "تحويل حصص النشاط من وقت فراغ غير منظم إلى فرص تعليمية ممتعة تعزز المهارات الحياتية والمواهب الشخصية للطلاب.",
      "توفير بيئة تعلم غير رسمية تشجع على الإبداع والاستكشاف والتعاون بين الطلاب خارج نطاق الضغوط الأكاديمية التقليدية.",
      "تنمية الجوانب الاجتماعية والعاطفية والجسدية للطالب من خلال ممارسة أنشطة متنوعة تناسب اهتماماته وقدراته.",
      "اكتشاف مواهب الطلاب في مجالات غير أكاديمية كالفنية والرياضية والتقنية والقيادية وتقديم الدعم اللازم لصقلها.",
      "تعزيز الانتماء للمدرسة وخلق ذكريات إيجابية لدى الطالب من خلال تجارب ممتعة وهادفة في أجواء ودية ومرحة."
    ],
    "summary": [
      "تم تفعيل 10 أندية نشاط مختلفة كالرياضية والفنية والعلمية والثقافية وشارك فيها 85% من طلاب المدرسة.",
      "نظمت 3 معارض لأعمال الأنشطة الفنية والعلمية و5 مسابقات داخلية بين الفصول في مجالات متنوعة.",
      "شارك طلاب النشاط في 4 فعاليات مجتمعية خارجية مثل تنظيف حديقة عامة وزيارة دار للمسنين.",
      "انخفضت المشكلات السلوكية في أوقات الفراغ بنسبة ملحوظة نتيجة لوجود بدائل جاذبة ومنظمة للطاقة الطلابية.",
      "أعرب أولياء الأمور عن ارتياحهم لتنوع الخيارات وتحسن الروح المعنوية والمهارات الاجتماعية لأبنائهم."
    ],
    "steps": [
      "تشكيل لجنة للنشاط الطلابي تقوم بتصميم خطة سنوية شاملة وتحديد الأندية والفعاليات المقرر تنفيذها.",
      "توزيع استبيان للطلاب لاستطلاع رغباتهم واهتماماتهم وبناءً على النتائج يتم تحديد أولويات الأنشطة المطروحة.",
      "توفير المكان والمواد والتجهيزات الأساسية اللازمة لكل نشاط وتكليف مشرفين متخصصين أو متطوعين للإشراف.",
      "تنفيذ الأنشطة وفق جدول زمني أسبوعي ثابت مع تخصيص وقت لعرض منتجات وإنجازات كل نادي بشكل دوري.",
      "تقييم أثر الأنشطة عبر ملاحظات المشرفين واستبيانات رضا الطلاب وربطها بتحسن مؤشرات أخرى مثل الحضور."
    ],
    "strategies": [
      "اعتماد استراتيجية الأندية الطلابية ذاتية الإدارة حيث يشارك الطلاب في تنظيم وإدارة النادي تحت الإشراف.",
      "تطبيق نموذج الدورات القصيرة حيث يشارك الطالب في نشاط محدد لمدة 6-8 أسابيع ثم ينتقل إلى نشاط آخر.",
      "استخدام أسلوب المشروع المجتمعي كإطار للنشاط حيث يعمل الطلاب على تحقيق هدف خدمي أو بيئي محدد.",
      "تفعيل النشاط الدامج الذي يشارك فيه طلاب من فئات عمرية وقدرات أكاديمية مختلفة في فريق واحد.",
      "اعتماد نظام النقاط أو الشارات لتتبع مشاركة الطالب وإنجازاته في مختلف الأنشطة وتحفيز الاستمرارية."
    ],
    "strengths": [
      "اكتشاف وتنمية مواهب طلابية لم تكن لتظهر في الإطار الأكاديمي الصافي مما وسع مفهوم النجاح والتميز في المدرسة.",
      "تحسين الصحة النفسية والجسدية للطلاب وتخفيف الضغوط الدراسية من خلال ممارسة الهوايات والأنشطة المحببة.",
      "بناء علاقات إيجابية بين الطلاب من مختلف الصفوف والفصول وتعزيز روح العمل الجماعي والتعاون فيما بينهم.",
      "تحسين صورة المدرسة في المجتمع المحلي من خلال المشاركة في الفعاليات والخدمات التطوعية الخارجية.",
      "توفير منصة للطلاب الخجولين أو منخفضي التحصيل ليثبتوا ذاتهم ويكسبوا الثقة من خلال مجالات تتفوق فيها مواهبهم."
    ],
    "improve": [
      "توفير ميزانية مالية أكبر ومستقرة للنشاط الطلابي لتأمين المواد والتجهيزات اللازمة وتنظيم رحلات وأنشطة خارجية.",
      "تدريب مشرفي الأنشطة على مهارات إدارة المجموعات وتنظيم الأنشطة غير الصفية وتحفيز المشاركة الطلابية.",
      "تحسين التنسيق بين مشرفي النشاط ومعلمي المواد لربط بعض الأنشطة بالمنهج الدراسي وتعزيز التعلم بالتجربة.",
      "زيادة عدد الخيارات المتاحة للطلاب ذوي الاهتمامات النادرة أو محدودة الانتشار داخل مجتمع المدرسة.",
      "توثيق إنجازات وأنشطة الأندية بشكل أفضل بالصور والفيديوهات لعرضها ونشر ثقافة النشاط بين الطلاب الجدد."
    ],
    "recomm": [
      "الاستمرار في تطوير برنامج النشاط وجعله جزءاً لا يتجزأ من الهوية التربوية للمدرسة وخطتها التعليمية السنوية.",
      "إنشاء مجلس طلابي للنشاط يضم ممثلين عن الأندية المختلفة للمشاركة في التخطيط واتخاذ القرارات المتعلقة به.",
      "توقيع اتفاقيات شراكة مع أندية رياضية أو مراكز ثقافية محلية لاستضافة مدربين أو تنظيم زيارات تعليمية.",
      "إدراج شهادة مشاركة في الأنشطة كجزء من ملف إنجاز الطالب عند تخرجه لتوثيق خبراته غير الأكاديمية.",
      "تنظيم يوم مفتوح سنوي مهرجان النشاط يدعى له أولياء الأمور لمشاهدة عروض وإنجازات أبنائهم في مختلف المجالات."
    ]
  },

  "تقرير التدريب على الاختبارات المعيارية": {
    "goal": [
      "تهيئة الطلاب نفسياً وأكاديمياً لأداء الاختبارات المعيارية الوطنية والدولية بشكل يقلل القلق ويزيد الثقة بالنفس.",
      "تعريف الطالب ببنية وشكل وطبيعة أسئلة الاختبارات المعيارية التي تختلف عن الاختبارات الصفية التقليدية.",
      "تنمية المهارات الإستراتيجية والإجرائية اللازمة لإدارة الوقت والتركيز أثناء أداء الاختبارات الطويلة والمكثفة.",
      "تحديد نقاط القوة والضعف لدى الطلاب في المهارات الأساسية التي تقيسها هذه الاختبارات كالاستيعاب والتحليل والحساب.",
      "رفع مستوى أداء المدرسة في الاختبارات المعيارية من خلال تحسين استعداد الطلاب وتقليل الأخطاء الناتجة عن عدم المعرفة بالإجراءات."
    ],
    "summary": [
      "نفذ برنامج تدريبي لـ 120 طالباً في الصف السادس والثالث متوسط استعداداً للاختبارات الوطنية المركزية.",
      "شمل البرنامج 15 حصة تدريبية موزعة على 5 أسابيع ركزت على مهارات حل الأسئلة وإدارة الوقت والتحكم في القلق.",
      "أظهرت نتائج الاختبارات التجريبية تحسناً في متوسط الدرجات بنسبة 18% مقارنة بأداء نفس المجموعة قبل التدريب.",
      "انخفضت نسبة الطلاب الذين لم يكملوا الإجابة على جميع الأسئلة بسبب ضيق الوقت من 30% إلى 5% بعد التدريب.",
      "أبدى أولياء الأمور تقديرهم للجهد وأشاروا إلى ملاحظة تحسن في ثقة أبنائهم وهدوئهم النفسي قبل الاختبار الفعلي."
    ],
    "steps": [
      "تحليل نماذج من الاختبارات المعيارية السابقة لفهم هيكلها وأنواع الأسئلة والمهارات الأساسية المطلوبة.",
      "تصميم برنامج تدريبي متدرج يبدأ بتعريف عام وينتهي باختبارات تجريبية تحاكي الاختبار الحقيقي في ظروف مشابهة.",
      "توزيع الطلاب على مجموعات صغيرة حسب مستوياتهم الأولية لتقديم تدريب أكثر تخصصاً وتلبية للاحتياجات الفردية.",
      "تنفيذ جلسات التدريب من قبل معلمين مدربين تركز على شرح استراتيجيات الحل وليس فقط المحتوى المعرفي.",
      "إجراء تقييمات دورية قصيرة واختبار تجريبي نهائي مع تقديم تغذية راجعة مفصلة لكل طالب عن أدائه ونقاط تحسنه."
    ],
    "strategies": [
      "استخدام استراتيجية الاختبارات المختصرة المتكررة لتعويد الطالب على ضغط الوقت وشكل الأسئلة بشكل تدريجي.",
      "تطبيق أسلوب التدريب على القلق من خلال تمارين الاسترخاء البسيطة وتقنيات التنفس قبل وأثناء الجلسات التدريبية.",
      "اعتماد نموذج التعليم الاستراتيجي الصريح حيث يشرح المدرب تفكيره بصوت عالٍ أثناء حل سؤال معياري خطوة بخطوة.",
      "تفعيل استراتيجية التدريب الذاتي الموجه عبر منصة إلكترونية تقدم تمارين تفاعلية وتقارير عن التقدم الفردي.",
      "استخدام تحليل الأخطاء الشائعة حيث يركز التدريب على الأنماط المتكررة للأخطاء التي يرتكبها الطلاب في هذه الاختبارات."
    ],
    "strengths": [
      "زيادة كبيرة في ثقة الطلاب بأنفسهم وتراجع ملحوظ في مشاعر الخوف والارتباك تجاه فكرة الاختبارات المعيارية.",
      "تحسين مهارات الطلاب في استيعاب التعليمات وقراءة الأسئلة الطويلة والمعقدة بتركيز ودقة أعلى من السابق.",
      "اكتساب الطلاب استراتيجيات عملية لإدارة الوقت وتوزيعه على أقسام الاختبار المختلفة مما حسن من اكتمال إجاباتهم.",
      "رفع مستوى الوعي لدى المعلمين بأهمية تدريب الطلاب على مهارات الاختبار وليس فقط تقديم المحتوى التعليمي المجرد.",
      "تحسين ترتيب المدرسة على مستوى المدارس المشاركة في الاختبارات الوطنية نتيجة للتحسن الجماعي في أداء الطلاب."
    ],
    "improve": [
      "بدء برامج التدريب في مراحل دراسية أبكر كالصف الرابع مثلاً لبناء المهارات الأساسية بشكل تراكمي وليس عاجلاً.",
      "توفير مواد تدريبية أكثر تنوعاً وأقرب محاكاة للاختبارات الفعلية من حيث الصعوبة والتنوع في صياغة الأسئلة.",
      "إشراك أولياء الأمور في جلسة توعوية واحدة على الأقل لشرح دورهم في دعم أبنائهم نفسياً وليس أكاديمياً خلال هذه الفترة.",
      "تخصيص وقت أكبر للتدريب على الجزء الكتابي أو المقالي في الاختبارات التي تتضمنه، حيث يحتاج الطالب لمهارات مختلفة.",
      "تقييم الأثر الطويل الأمد للتدريب على أداء الطلاب في الاختبارات الفعلية ومقارنته مع فوج لم يتلقَ التدريب."
    ],
    "recomm": [
      "الاستمرار في عقد برنامج تدريبي سنوي للصفوف المستهدفة بالاختبارات المعيارية وجعله جزءاً من الجدول الدراسي الاعتيادي.",
      "إنشاء بنك إلكتروني للأسئلة التدريبية مصنف حسب المهارة والمستوى ليمكن الطلاب من التدرب الذاتي خارج أوقات الحصص.",
      "تكوين فريق تدريب من المعلمين المتميزين في هذا المجال وتدريبهم بشكل متقدم ليكونوا مدربين لزملائهم في السنوات القادمة.",
      "توثيق نتائج الاختبارات التجريبية وتحليلها بشكل مفصل لتحديد المهارات الأكثر ضعفاً لدى الطلاب وتصميم تدريبات علاجية لها.",
      "التواصل مع مدارس أخرى لتبادل الخبرات والمواد التدريبية الناجحة في هذا المجال لتحقيق فائدة تعاونية على نطاق أوسع."
    ]
  },

  "تقرير مبادرة تطوعية": {
    "goal": [
      "تعزيز قيم العطاء والتطوع وخدمة المجتمع لدى الطلاب من خلال مشاركتهم في أعمال تطوعية منظمة وهادفة.",
      "ربط الطالب بمجتمعه المحلي وزيادة وعيه بالمشكلات والاحتياجات الاجتماعية والبيئية من حوله.",
      "تنمية مهارات العمل الجماعي والقيادة والتخطيط لدى الطلاب في سياقات عملية حقيقية خارج الفصل الدراسي.",
      "توفير فرص للطلاب لتطبيق المعارف والمهارات التي تعلموها في المدرسة لخدمة قضايا إنسانية أو بيئية حقيقية.",
      "بناء صورة إيجابية عن المدرسة كمؤسسة فاعلة ومتفاعلة مع محيطها الاجتماعي ومسؤولة تجاه قضايا المجتمع."
    ],
    "summary": [
      "نفذت المدرسة 5 مبادرات تطوعية رئيسية خلال العام شملت 200 طالب متطوع و50 من المعلمين والإداريين.",
      "تضمنت المبادرات حملة نظافة لحي المدرسة، وتجميل جداريات داخلية، وجمع تبرعات لعائلة محتاجة، وزراعة 100 شجرة.",
      "استفاد من المبادرات المباشرة أكثر من 500 فرد من المجتمع المحلي وحظيت بتغطية إعلامية محلية إيجابية.",
      "سجل الطلاب المتطوعون أكثر من 1000 ساعة تطوعية معتمدة في سجلاتهم الشخصية للمشاركة المجتمعية.",
      "أعربت الجهات المستفيدة كالبلدية وجمعية خيرية عن تقديرها العميق وتعاونها المستقبلي مع المدرسة."
    ],
    "steps": [
      "تشكيل فريق تنسيق التطوع المدرسي من طلاب ومعلمين لوضع خطة للمبادرات التطوعية للعام الدراسي.",
      "استطلاع آراء الطلاب حول القضايا المجتمعية التي يهتمون بها وتصميم المبادرات بناءً على رغباتهم وإمكاناتهم.",
      "التنسيق مع الجهات المستفيدة أو الشريكة كالبلدية والجمعيات الخيرية للحصول على التصاريح اللازمة والدعم اللوجستي.",
      "تعبئة المتطوعين وتدريبهم على المهام المطلوبة وتوضيح أهداف المبادرة وسلوكيات العمل التطوعي المناسبة.",
      "تنفيذ المبادرة مع التوثيق المصور والفيديو وتقييم الأثر في نهايتها وتكريم المشاركين المتميزين."
    ],
    "strategies": [
      "اعتماد استراتيجية التطوع القائم على المهارات حيث يقدم الطالب خدمة مرتبطة بموهبته كالرسم والتصوير والحاسوب.",
      "تطبيق نموذج التعلم الخدمي حيث يكون التطوع جزءاً من متطلب دراسي في مادة ما كالتربية الاجتماعية.",
      "استخدام أسلوب التحدي التطوعي بين الفصول حيث يتنافس الفصول على تحقيق أكبر عدد من ساعات التطوع أو الأثر.",
      "تفعيل التطوع الافتراضي لمشاريع يمكن إنجازها عن بعد مثل تصميم منشورات توعوية أو ترجمة مواد لجهات غير ربحية.",
      "اعتماد نظام الساعات المعتمدة للتطوع حيث يحصل الطالب على شهادة معتمدة تفيد في مستقبله الأكاديمي أو المهني."
    ],
    "strengths": [
      "تنمية الشعور بالمسؤولية الاجتماعية والمواطنة الفاعلة لدى الطلاب وتحويلهم من متلقين إلى فاعلين في مجتمعهم.",
      "تحسين مهارات التواصل والتفاوض والعمل الجماعي للطلاب في بيئات حقيقية تتضمن التعامل مع أشخاص من خارج المدرسة.",
      "كسر الروتين المدرسي وخلق ذكريات إيجابية ومشاعر فخر وانتماء قوية للمدرسة لدى الطلاب المشاركين.",
      "تغيير النظرة النمطية عن الشباب ورفع مكانة المدرسة في المجتمع المحلي كمصدر للخير والعطاء والوعي.",
      "اكتشاف قدرات قيادية ومبادرات شخصية لدى طلاب لم تكن ظاهرة في السياق الأكاديمي التقليدي داخل الفصل."
    ],
    "improve": [
      "تنويع فرص التطوع لتشمل مجالات أخرى مثل التطوع مع ذوي الاحتياجات الخاصة أو كبار السن أو في المجال الصحي التوعوي.",
      "زيادة التوعية بأهمية الاستدامة في العمل التطوعي، بحيث لا يكون حدثاً لمرة واحدة بل مشروعاً مستمراً له أثر تراكمي.",
      "تحسين عملية قياس وتقييم الأثر الحقيقي للمبادرات التطوعية على المجتمع المستفيد بشكل موضوعي وليس فقط كمياً.",
      "توفير تأمين صحي أو إجراءات سلامة أكثر صرامة للطلاب أثناء المشاركة في بعض الأنشطة التطوعية الخارجية التي قد تنطوي على مخاطر.",
      "إشراك أولياء أمور الطلاب كمتطوعين مع أبنائهم في بعض المبادرات لتعزيز الشراكة بين المدرسة والأسرة في خدمة المجتمع."
    ],
    "recomm": [
      "الاستمرار في دعم وتوسيع نطاق العمل التطوعي المدرسي واعتباره ركيزة أساسية من ركائز الخطة التربوية السنوية.",
      "إنشاء نادي التطوع ككيان رسمي دائم في المدرسة يديره الطلاب بأنفسهم تحت إشراف معلم مشرف.",
      "توقيع اتفاقيات شراكة طويلة الأمد مع جهتين أو ثلاث من مؤسسات المجتمع المحلي لضمان استمرارية وتنوع فرص التطوع.",
      "إدراج ملف الإنجاز التطوعي كجزء من ملف التخرج الخاص بالطالب، مع ذكر المهارات التي اكتسبها من كل تجربة.",
      "تنظيم حفل تكريم سنوي كبير للمتطوعين المتميزين من الطلاب والمعلمين ودعوة ممثلين عن المجتمع المحلي للمشاركة فيه."
    ]
  }
}
// النصوص الافتراضية (للتقارير الأخرى)
const defaultTexts = {
    goal: ["الهدف التربوي"],
    summary: ["النبذة المختصرة"],
    steps: ["إجراءات التنفيذ"],
    strategies: ["الاستراتيجيات"],
    strengths: ["نقاط القوة"],
    improve: ["نقاط التحسين"],
    recomm: ["التوصيات"]
};

let counters = {goal:0,summary:0,steps:0,strategies:0,strengths:0,improve:0,recomm:0};
let currentReportType = "تقرير نشاط إثرائي";

function getCurrentTexts() {
    const reportType = document.getElementById('reportType').value;
    return autoTextsByReportType[reportType] || defaultTexts;
}

function autoFill(id){
    const texts = getCurrentTexts();
    if (texts[id] && texts[id].length > 0) {
        counters[id] = (counters[id] + 1) % texts[id].length;
        document.getElementById(id).value = texts[id][counters[id]];
        updateReport();
    } else {
        alert("لا توجد نصوص ذكية متاحة لهذا الحقل في التقرير الحالي");
    }
}

function handleReportType(){
    const reportType = document.getElementById('reportType').value;
    currentReportType = reportType;
    
    // إعادة تعيين العدادات عند تغيير نوع التقرير
    counters = {goal:0,summary:0,steps:0,strategies:0,strengths:0,improve:0,recomm:0};
    
    // إظهار/إخفاء حقل الإدخال للنوع "أخرى"
    document.getElementById('reportTypeInput').style.display = (reportType === "أخرى") ? "block" : "none";
    updateReport();
}

function updateReport(){
    document.getElementById('educationBox').innerText = document.getElementById('education').value;
    document.getElementById('schoolBox').innerText = document.getElementById('school').value;
    document.getElementById('termBox').innerText = document.getElementById('term').value;
    document.getElementById('gradeBox').innerText = document.getElementById('grade').value;
    document.getElementById('subjectBox').innerText = document.getElementById('subject').value;
    document.getElementById('targetBox').innerText = document.getElementById('target').value;
    document.getElementById('countBox').innerText = document.getElementById('count').value;
    document.getElementById('placeBox').innerText = document.getElementById('place').value;
    document.getElementById('teacherBox').innerText = document.getElementById('teacher').value;
    document.getElementById('principalBox').innerText = document.getElementById('principal').value;
    document.getElementById('teacherTypeBox').innerText = document.getElementById('teacherType').value;
    document.getElementById('principalTypeBox').innerText = document.getElementById('principalType').value;
    const reportType = document.getElementById('reportType').value;
    document.getElementById('reportTypeBox').innerText = (reportType === "أخرى") ? document.getElementById('reportTypeInput').value : reportType;
    document.getElementById('goalBox').innerText = document.getElementById('goal').value;
    document.getElementById('summaryBox').innerText = document.getElementById('summary').value;
    document.getElementById('stepsBox').innerText = document.getElementById('steps').value;
    document.getElementById('strategiesBox').innerText = document.getElementById('strategies').value;
    document.getElementById('strengthsBox').innerText = document.getElementById('strengths').value;
    document.getElementById('improveBox').innerText = document.getElementById('improve').value;
    document.getElementById('recommBox').innerText = document.getElementById('recomm').value;
}

function loadImage(input,target){
    let r = new FileReader();
    r.onload = () => document.getElementById(target).innerHTML = `<img src="${r.result}">`;
    r.readAsDataURL(input.files[0]);
}

// دالة جديدة لحفظ بيانات المعلم فقط
function saveTeacherData(){
    // البيانات التي سيتم حفظها
    const teacherData = {
        education: document.getElementById('education').value,
        school: document.getElementById('school').value,
        grade: document.getElementById('grade').value,
        subject: document.getElementById('subject').value,
        target: document.getElementById('target').value,
        place: document.getElementById('place').value
    };
    
    // حفظ البيانات في localStorage
    localStorage.setItem('teacherData', JSON.stringify(teacherData));
    
    // عرض إشعار النجاح
    showNotification('تم حفظ بيانات المعلم بنجاح!');
    
    console.log('بيانات المعلم المحفوظة:', teacherData);
}

// دالة لعرض الإشعارات
function showNotification(message) {
    const notification = document.getElementById('saveNotification');
    notification.querySelector('span').textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// دالة لتحميل بيانات المعلم المحفوظة عند تشغيل الصفحة
function loadTeacherData() {
    const savedData = localStorage.getItem('teacherData');
    
    if (savedData) {
        const teacherData = JSON.parse(savedData);
        
        document.getElementById('education').value = teacherData.education || '';
        document.getElementById('school').value = teacherData.school || '';
        document.getElementById('grade').value = teacherData.grade || '';
        document.getElementById('subject').value = teacherData.subject || '';
        document.getElementById('target').value = teacherData.target || '';
        document.getElementById('place').value = teacherData.place || '';
        
        updateReport();
        console.log('بيانات المعلم المحملة:', teacherData);
    }
}

// وظائف الدعم الفني
function openSupportModal() {
    document.getElementById('supportModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // منع التمرير عند فتح النافذة
}

function closeSupportModal() {
    document.getElementById('supportModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // إعادة التمرير
}

// إغلاق النافذة عند النقر خارجها
document.getElementById('supportModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSupportModal();
    }
});

// إرسال بريد إلكتروني
function sendEmailSupport() {
    const name = document.getElementById('supportName').value || 'مستخدم بدون اسم';
    const phone = document.getElementById('supportPhone').value || 'لم يتم تقديمه';
    const issue = document.getElementById('supportIssue').value || 'لا توجد تفاصيل';
    
    const subject = encodeURIComponent('طلب دعم فني - أداة إصدار التقارير');
    const body = encodeURIComponent(`الاسم: ${name}\nرقم التواصل: ${phone}\n\nتفاصيل المشكلة:\n${issue}\n\n---\nتم الإرسال من أداة إصدار التقارير`);
    
    window.location.href = `mailto:iFahadenglish@gmail.com?subject=${subject}&body=${body}`;
    
    // إغلاق النافذة بعد إرسال البريد
    setTimeout(closeSupportModal, 500);
}

// إرسال رسالة واتساب
function sendWhatsAppSupport() {
    const name = document.getElementById('supportName').value || 'مستخدم بدون اسم';
    const phone = document.getElementById('supportPhone').value || 'لم يتم تقديمه';
    const issue = document.getElementById('supportIssue').value || 'لا توجد تفاصيل';
    
    const message = encodeURIComponent(`طلب دعم فني - أداة إصدار التقارير\n\nالاسم: ${name}\nرقم التواصل: ${phone}\n\nتفاصيل المشكلة:\n${issue}\n\n---\nتم الإرسال من أداة إصدار التقارير`);
    
    window.open(`https://wa.me/966597077245?text=${message}`, '_blank');
    
    // إغلاق النافذة بعد فتح الواتساب
    setTimeout(closeSupportModal, 500);
}

function clearData(){
    if(confirm("هل أنت متأكد من مسح جميع البيانات؟")){
        localStorage.clear();
        location.reload();
    }
}

function downloadPDF(){
    document.querySelector('.control-bar').style.visibility = 'hidden';
    document.querySelector('.top-marquee').style.visibility = 'hidden';
    document.body.style.margin = "0";
    document.body.style.background = "white";

    // إظهار قسم PDF قبل التحميل
    const reportContent = document.getElementById('report-content');
    reportContent.style.display = 'block';
    reportContent.style.visibility = 'visible';
    reportContent.style.opacity = '1';
    reportContent.style.position = 'relative';
    reportContent.style.top = '0';
    reportContent.style.left = '0';

    html2pdf().set({
        filename: "report.pdf",
        html2canvas: {
            scale: 3,
            useCORS: true,
            scrollY: 0,
            backgroundColor: '#ffffff',
            onclone: function(clonedDoc) {
                clonedDoc.getElementById('report-content').style.background = '#ffffff';
                clonedDoc.querySelectorAll('*').forEach(el => {
                    el.style.color = '';
                    el.style.backgroundColor = '';
                });
            }
        },
        jsPDF: {unit: "mm", format: "a4", orientation: "portrait"}
    })
    .from(reportContent)
    .save()
    .then(() => {
        document.querySelector('.control-bar').style.visibility = 'visible';
        document.querySelector('.top-marquee').style.visibility = 'visible';
        document.body.style.margin = "";
        document.body.style.background = "#f9fcfb";
        reportContent.style.display = 'none';
        showNotification("تم تنزيل التقرير بصيغة PDF ✓");
    });
}

async function sharePDFWhatsApp(){
    document.querySelector('.control-bar').style.visibility = 'hidden';
    document.querySelector('.top-marquee').style.visibility = 'hidden';
    document.body.style.margin = "0";
    document.body.style.background = "white";

    const reportContent = document.getElementById('report-content');
    reportContent.style.display = 'block';
    reportContent.style.visibility = 'visible';
    reportContent.style.opacity = '1';
    reportContent.style.position = 'relative';
    reportContent.style.top = '0';
    reportContent.style.left = '0';

    await html2pdf().set({
        margin: 0,
        image: {type: "jpeg", quality: 1},
        html2canvas: {
            scale: 3,
            scrollY: 0,
            useCORS: true,
            backgroundColor: '#ffffff',
            onclone: function(clonedDoc) {
                clonedDoc.getElementById('report-content').style.background = '#ffffff';
            }
        },
        jsPDF: {unit: "mm", format: "a4", orientation: "portrait"}
    })
    .from(reportContent)
    .toPdf()
    .output('blob')
    .then((pdfBlob) => {
        document.querySelector('.control-bar').style.visibility = 'visible';
        document.querySelector('.top-marquee').style.visibility = 'visible';
        document.body.style.margin = "";
        document.body.style.background = "#f9fcfb";
        reportContent.style.display = 'none';

        let file = new File([pdfBlob], "report.pdf", {type: "application/pdf"});
        if(navigator.canShare && navigator.canShare({files:[file]})){
            navigator.share({files:[file], title: "تقرير جاهز", text: "تقرير مهني جاهز للتحميل"});
        } else {
            let url = URL.createObjectURL(pdfBlob);
            window.open(`https://wa.me/?text=${encodeURIComponent("تقرير مهني جاهز للتحميل\n" + url)}`, "_blank");
        }
    });
}

async function loadDates(){
    let g = new Date();
    document.getElementById('gDate').innerText = g.toLocaleDateString('ar-EG') + " م";
    try {
        let r = await fetch(`https://api.aladhan.com/v1/gToH?date=${g.getDate()}-${g.getMonth()+1}-${g.getFullYear()}`);
        let j = await r.json();
        let h = j.data.hijri;
        document.getElementById('hDate').innerText = `${h.weekday.ar} ${h.day} ${h.month.ar} ${h.year} هـ`;
    } catch {
        document.getElementById('hDate').innerText = "--";
    }
}

// منع التكبير على الأجهزة المحمولة
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// عند تحميل الصفحة
window.onload = function() {
    loadDates();
    loadTeacherData(); // تحميل بيانات المعلم المحفوظة
    updateReport();
    
    // تحسين الأداء على الأجهزة المحمولة
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}
</script>

</body>
</html>