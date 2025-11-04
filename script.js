// رابط Google Apps Script (استبدل بالرابط الذي أعطيته)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxhoX_QTwmzq7xVThH13IoUxe4WKX0U5aK8Wptc513Ohh94uUToSyfWNj32mve_A5Yi/exec";


// حالة المستخدم الحالي
let currentUser = null; // { code, name, phone }
let currentUserType = null; // 'student' | 'teacher'


// قائمة تجريبية مؤقتة من الدارسين — يستحسن جلبها من الشيت لاحقًا
let students = [
{ code: 'DM34TA35', name: 'مارفي رامي صادق', phone: '01221316921', class: 'تمهيدي' },
{ code: 'ST123ABC', name: 'مارك مجدي', phone: '0123456789', class: 'إعدادي' }
];


// ---------- عناصر DOM ----------
const el = (id) => document.getElementById(id);


// تبويبات تسجيل الدخول
document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', (e) => {
document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
e.currentTarget.classList.add('active');
const target = e.currentTarget.dataset.target;
document.getElementById('student-panel').style.display = target === 'student' ? 'block' : 'none';
document.getElementById('teacher-panel').style.display = target === 'teacher' ? 'block' : 'none';
}));


// تسجيل دخول دارس
el('btn-student-login').addEventListener('click', () => {
const code = el('student-code').value.trim().toUpperCase();
if(!code){ el('login-msg').textContent = 'أدخل كود الدارس'; el('login-msg').className='small muted'; return; }
const s = students.find(x=>x.code.toUpperCase()===code);
if(!s){ el('login-msg').textContent = 'كود غير موجود'; el('login-msg').className='small muted'; return; }
currentUser = s; currentUserType = 'student';
showStudentDashboard();
el('login-msg').textContent = 'تم الدخول';
});


// زر تعبئة بيانات تجريبية
el('btn-demo-fill').addEventListener('click', ()=>{
el('student-code').value = students[0].code;
});


// تسجيل دخول خادم (تجريبي - تقبل أي مدخل)
el('btn-teacher-login').addEventListener('click', ()=>{
const code = el('teacher-code').value.trim();
const pass = el('teacher-pass').value.trim();
if(!code || !pass){ el('login-msg').textContent = 'أدخل كود الخادم وكلمة المرور'; return; }
currentUser = { code, name: 'خادم تجريبي' };
currentUserType = 'teacher';
showTeacherDashboard();
el('login-msg').textContent = 'تم الدخول كخادم';
});


// عرض لوحة الدارس
function showStudentDashboard(){
document.getElementById('login-card').style.display = 'none';
document.getElementById('student-dashboard').style.display = 'block';
el('sd-name').textContent = currentUser.name || '-';
el('sd-code').textContent = currentUser.code || '-';
el('sd-phone').textContent = currentUser.phone || '-';
}


// عرض لوحة الخادم
function showTeacherDashboard(){
document.getElementById('login-card').style.display = 'none';
document.getElementById('teacher-dashboard').style.display = 'block';
}


// تسجيل خروج
el('btn-student-logout').addEventListener('click', logout);
el(
