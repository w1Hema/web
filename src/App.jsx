import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, Award, Play, CheckCircle, Search, Star, LogOut, BookOpen, Crown, Sun, Moon,
  Atom, Sparkles, GraduationCap, Calculator, Compass, Brain, Send, X, MessageSquare, ArrowLeft, ArrowRight, Trophy, Clock, Menu, Download, Smartphone,
  Code, Terminal, Mail, Phone, Cpu, Globe, MessageCircle, MapPin
} from 'lucide-react';

const snowflakesList = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 15 + 10,
  delay: Math.random() * 10,
  duration: Math.random() * 15 + 15,
  opacity: Math.random() * 0.4 + 0.2,
  char: Math.random() > 0.3 ? '❄' : '🌹'
}));

export default function App() {
  const [view, setView] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([1]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Exam State
  const [showExam, setShowExam] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [examScore, setExamScore] = useState(0);

  const examQuestions = [
    { q: "ما هو الهدف الرئيسي من هذه الحصة؟", options: ["فهم الأساسيات والتطبيق عليها", "حفظ القوانين فقط بدون فهم", "تخطي الفيديوهات والاعتماد على الملخصات", "لا شيء مما سبق"], answer: 0 },
    { q: "أي من التالي يعتبر التطبيق العملي الأفضل للدرس للحصول على الدرجة النهائية؟", options: ["قراءة الدرس فقط قبل الامتحان", "حل التمارين بيدك ومراجعة الأخطاء", "مشاهدة الفيديو مرة أخرى بدون تطبيق", "حفظ الأسئلة الشائعة فقط"], answer: 1 },
    { q: "لضمان الدرجة النهائية يجب عليك:", options: ["التركيز في التكات والأسئلة غير النمطية", "تجاهل الأسئلة الصعبة التي لم تأت من قبل", "تأجيل المذاكرة لليلة الامتحان", "حضور الحصة دون مراجعتها"], answer: 0 }
  ];

  const subjects = [
    { id: 'arabic', name: 'اللغة العربية', icon: 'BookOpen', color: '#3b82f6', description: 'النحو، النصوص، القراءة، والقصة' },
    { id: 'english', name: 'اللغة الإنجليزية', icon: 'MessageSquare', color: '#10b981', description: 'القواعد، الكلمات، والترجمة' },
    { id: 'math', name: 'الرياضيات', icon: 'Calculator', color: '#f59e0b', description: 'الجبر، الهندسة، وحساب المثلثات' },
    { id: 'science', name: 'العلوم والأحياء', icon: 'Atom', color: '#8b5cf6', description: 'الفيزياء، الكيمياء، والأحياء' },
    { id: 'social', name: 'الدراسات الاجتماعية', icon: 'Compass', color: '#ec4899', description: 'التاريخ والجغرافيا' },
    { id: 'french', name: 'اللغة الأجنبية الثانية', icon: 'Star', color: '#06b6d4', description: 'الفرنسية، الألمانية، والإيطالية' },
  ];

  const getSubjectIcon = (iconName) => {
    switch(iconName) {
      case 'BookOpen': return <BookOpen size={40} />;
      case 'MessageSquare': return <MessageSquare size={40} />;
      case 'Calculator': return <Calculator size={40} />;
      case 'Atom': return <Atom size={40} />;
      case 'Compass': return <Compass size={40} />;
      case 'Star': return <Star size={40} />;
      default: return <BookOpen size={40} />;
    }
  };

  const courseLessons = [
    { id: 1, title: 'الحصة 1: مراجعة شاملة وحل أسئلة النظام الجديد', duration: '45:20', description: 'شرح مبسط لأهم التكات والأفكار الخاصة بالمنهج لضمان الدرجة النهائية.' },
    { id: 2, title: 'الحصة 2: شرح التكات والأفكار المتقدمة', duration: '32:15', description: 'نتناول في هذه الحصة أدق التفاصيل في المنهج للوصول لأعلى الدرجات.' },
    { id: 3, title: 'الحصة 3: حل تدريبات وامتحانات السنين السابقة', duration: '50:10', description: 'تطبيق عملي على كل ما سبق من خلال امتحانات رسمية ووزارية.' },
    { id: 4, title: 'الحصة 4: المراجعة النهائية (الجزء الأول)', duration: '41:05', description: 'الجزء الأول من المراجعة النهائية المكثفة، لا تفوتها.' },
    { id: 5, title: 'الحصة 5: المراجعة النهائية (الجزء الثاني)', duration: '38:40', description: 'الجزء الثاني من ليلة الامتحان وأهم الأسئلة المتوقعة.' },
    { id: 6, title: 'الحصة 6: البث المباشر المفتوح للأسئلة', duration: '55:30', description: 'جلسة للإجابة عن أسئلة واستفسارات الطلبة خطوة بخطوة.' },
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // ----------------------------------------------------
  // GPA Simulator State & Calculations
  // ----------------------------------------------------
  const [prepGrades, setPrepGrades] = useState([
    { id: 1, subject: 'اللغة العربية', score: 72, max: 80 },
    { id: 2, subject: 'اللغة الإنجليزية', score: 54, max: 60 },
    { id: 3, subject: 'الرياضيات', score: 56, max: 60 },
    { id: 4, subject: 'العلوم', score: 36, max: 40 },
    { id: 5, subject: 'الدراسات الاجتماعية', score: 38, max: 40 },
  ]);

  const handleGradeChange = (id, newScore) => {
    setPrepGrades(prev => prev.map(s => {
      if (s.id === id) {
        const parsed = parseFloat(newScore) || 0;
        return { ...s, score: Math.min(s.max, Math.max(0, parsed)) };
      }
      return s;
    }));
  };

  const totalScore = prepGrades.reduce((sum, s) => sum + s.score, 0);
  const totalMax = prepGrades.reduce((sum, s) => sum + s.max, 0);
  const percentage = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;

  const getEvaluation = (pct) => {
    if (pct >= 95) return { text: 'امتياز مع مرتبة الشرف 🏆 - مستوى أسطوري!', color: 'var(--success)' };
    if (pct >= 85) return { text: 'ممتاز جداً 🌟 - أنت قريب جداً من القمة!', color: 'var(--primary)' };
    if (pct >= 75) return { text: 'جيد جداً 👍 - أداء ممتاز ورائع!', color: '#2563eb' };
    if (pct >= 60) return { text: 'جيد 📚 - انضم لمراجعات القمة لتتحسن أكثر!', color: '#ca8a04' };
    return { text: 'تحتاج إلى تأسيس ⚠️ - انضم لمجموعات التأسيس فوراً!', color: 'var(--danger)' };
  };

  const evaluation = getEvaluation(percentage);

  // ----------------------------------------------------
  // Interactive Smart Schedule State
  // ----------------------------------------------------
  const [activeStage, setActiveStage] = useState('secondary');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const scheduleData = {
    prep: [
      { id: 1, subject: 'اللغة العربية', teacher: 'أ. محمد عبد الرحمن', days: 'السبت والثلاثاء', time: '04:00 مساءً', room: 'قاعة الأمل', level: 'الصف الثالث الإعدادي' },
      { id: 2, subject: 'الرياضيات', teacher: 'أ. أحمد الدمرداش', days: 'الأحد والأربعاء', time: '05:30 مساءً', room: 'قاعة ابن سينا', level: 'الصف الثالث الإعدادي' },
      { id: 3, subject: 'العلوم', teacher: 'أ. محمود إبراهيم', days: 'الإثنين والخميس', time: '03:00 مساءً', room: 'قاعة القمة 1', level: 'الصف الثاني الإعدادي' },
    ],
    secondary: [
      { id: 4, subject: 'الفيزياء', teacher: 'د. عاصم الشرقاوي', days: 'السبت والثلاثاء', time: '06:00 مساءً', room: 'قاعة ابن خلدون', level: 'الصف الثالث الثانوي' },
      { id: 5, subject: 'اللغة الإنجليزية', teacher: 'أ. كريم عبد الله', days: 'الأحد والأربعاء', time: '07:30 مساءً', room: 'قاعة القمة 2', level: 'الصف الثالث الثانوي' },
      { id: 6, subject: 'الكيمياء', teacher: 'أ. سامر الجارحي', days: 'الإثنين والخميس', time: '05:00 مساءً', room: 'قاعة ابن سينا', level: 'الصف الأول الثانوي' },
    ]
  };

  const handleBookSeat = (className, teacher) => {
    setBookingSuccess(`تم تسجيل طلب حجز مقعدك في مجموعة (${className}) مع (${teacher}) بنجاح! سنتواصل معك للتأكيد.`);
    setTimeout(() => setBookingSuccess(null), 5000);
  };

  // ----------------------------------------------------
  // Honor Roll Leaderboard Search
  // ----------------------------------------------------
  const [searchStudent, setSearchStudent] = useState('');
  const studentsHonor = [
    { rank: 1, name: 'عمر أحمد محمود', grade: 'الثالث الثانوي', score: '99.5%', xp: 2450, badge: 'ملك الفيزياء 👑' },
    { rank: 2, name: 'سارة محمد علي', grade: 'الثالث الإعدادي', score: '98.8%', xp: 2180, badge: 'بطلة الرياضيات 📐' },
    { rank: 3, name: 'عبد الرحمن حسن', grade: 'الثاني الثانوي', score: '98.2%', xp: 1920, badge: 'المثابر المتميز 🧪' },
    { rank: 4, name: 'فاطمة إبراهيم سعيد', grade: 'الأول الثانوي', score: '97.9%', xp: 1750, badge: 'شعلة العلوم 🧬' },
    { rank: 5, name: 'محمد مصطفى كامل', grade: 'الثالث الإعدادي', score: '97.4%', xp: 1650, badge: 'قارئ القمة 📖' },
  ];

  const filteredStudents = studentsHonor.filter(s => 
    s.name.includes(searchStudent) || s.grade.includes(searchStudent) || s.badge.includes(searchStudent)
  );

  // ----------------------------------------------------
  // Floating AI Chat Assistant
  // ----------------------------------------------------
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'أهلاً بك في سنتر القمة! 🎓 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن المواعيد، المدرسين، أو كيفية التسجيل.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'يسعدنا تواصلك معنا! لمزيد من التفاصيل الدقيقة وحجز المجموعات، يمكنك الاتصال أو مراسلتنا مباشرة على رقم السنتر: 01012345678 أو زيارة مقرنا الرئيسي.';
      const query = currentInput.toLowerCase();
      if (query.includes('موعد') || query.includes('مواعيد') || query.includes('جدول') || query.includes('وقت')) {
        replyText = 'جدول المجموعات تفاعلي ومتوفر بالكامل في الصفحة الرئيسية! يمكنك التبديل بين مجموعات الإعدادي والثانوي في "جدول الحصص الذكي" لمعرفة التفاصيل بدقة.';
      } else if (query.includes('مدرس') || query.includes('اساتذ') || query.includes('معلم') || query.includes('مين')) {
        replyText = 'نخبة من خيرة الأساتذة متواجدون معنا: أ. أحمد الدمرداش في الرياضيات، د. عاصم الشرقاوي في الفيزياء، وأ. سامر الجارحي في الكيمياء.';
      } else if (query.includes('سعر') || query.includes('اشتراك') || query.includes('فلوس') || query.includes('تمن')) {
        replyText = 'تتميز أسعار مجموعات السنتر بأنها مناسبة ورمزية وتختلف حسب المادة والمرحلة. اضغط على زر "احجز مقعدك" في جدول المجموعات وسنقوم بالاتصال بك لتأكيد التفاصيل والأسعار.';
      } else if (query.includes('شاطر') || query.includes('متفوق') || query.includes('اوائل') || query.includes('لوحة')) {
        replyText = 'الطلاب الأوائل يحصلون على جوائز نقدية وشارات تميز ونقاط تفاعلية! يمكنك متابعة قائمة المتصدرين في قسم "لوحة الشرف" بالصفحة الرئيسية.';
      } else if (query.includes('عنوان') || query.includes('مقر') || query.includes('فين') || query.includes('مكان')) {
        replyText = 'مقر سنتر القمة مجهز بالكامل بأحدث التقنيات والشاشات التفاعلية، ويقع في العنوان الرئيسي للسنتر (شارع الجمهورية - أمام المحطة). بانتظار تشريفكم!';
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: replyText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="app-container" style={{ overflowX: 'hidden', width: '100%', position: 'relative' }}>
      {/* Premium Animated Background & Floating Educational Shapes */}
      <div className="animated-bg">
        <BookOpen className="edu-shape shape-1" />
        <Atom className="edu-shape shape-2" />
        <Crown className="edu-shape shape-3" />
        <Award className="edu-shape shape-4" />
        <Sparkles className="edu-shape shape-5" />
        <Star className="edu-shape shape-6" />
      </div>

      {/* Navbar (White/Gold & Dark Leather Adaptable Theme) */}
      <header className="glass-panel" style={{
        position: 'sticky', top: 0, zIndex: 100, borderRadius: 0, border: 'none',
        borderBottom: '2px solid var(--primary)', margin: 0, padding: '12px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        width: '100%', overflow: 'visible'
      }}>
        {/* Logo and branding area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }} onClick={() => setView('home')}>
          <div className="logo-frame">
            <img src="/logo.png" alt="سنتر القمة" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
          </div>
          <span className="logo-text-brand" style={{ whiteSpace: 'nowrap' }}>سنتر القمة</span>
        </div>

        {/* Navigation links */}
        <nav className="desktop-only main-nav">
          <button onClick={() => setView('home')} className={view === 'home' ? 'active-nav' : ''}>الرئيسية</button>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            if (isLoggedIn) setView('dashboard');
            else setShowLoginPrompt(true);
          }} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            فيديوهات السنتر
            <span style={{ background: 'var(--primary)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>PRO</span>
          </a>
          <a href="#interactive-tools">أدوات تفاعلية</a>
          <a href="#teachers">نخبة المعلمين</a>
          <a href="#services">خدماتنا</a>
          <button onClick={() => setView('developer')} className={view === 'developer' ? 'active-nav' : ''} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: view === 'developer' ? 'var(--primary)' : 'var(--text-main)', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Code size={16} color={view === 'developer' ? 'var(--primary)' : 'currentColor'} /> المطور
          </button>
        </nav>

        {/* Theme and login controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={toggleTheme} style={{
            background: 'var(--light)', color: 'var(--text-main)', width: '40px', height: '40px',
            borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
            border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', flexShrink: 0
          }}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="btn-secondary btn-login" onClick={() => setView('login')}>
            <Crown size={16} />
            <span className="login-text">دخول الطالب</span>
          </button>
          <button className="mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
            background: 'var(--light)', color: 'var(--text-main)', width: '40px', height: '40px',
            borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center',
            border: '1px solid var(--border-color)', cursor: 'pointer', flexShrink: 0
          }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="animate-fade-in" style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: 'var(--glass-bg)', backdropFilter: 'blur(20px)',
            borderBottom: '2px solid var(--primary)', padding: '20px',
            display: 'flex', flexDirection: 'column', gap: '15px',
            boxShadow: 'var(--shadow-lg)', zIndex: 99
          }}>
            <button onClick={() => { setView('home'); setMobileMenuOpen(false); }} className={view === 'home' ? 'active-nav' : ''} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '18px', fontWeight: 'bold', textAlign: 'right', padding: '10px' }}>الرئيسية</button>
            <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); if (isLoggedIn) setView('dashboard'); else setShowLoginPrompt(true); }} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-main)', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', padding: '10px' }}>
              فيديوهات السنتر <span style={{ background: 'var(--primary)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>PRO</span>
            </a>
            <a href="#interactive-tools" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', padding: '10px' }}>أدوات تفاعلية</a>
            <a href="#teachers" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', padding: '10px' }}>نخبة المعلمين</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', padding: '10px' }}>خدماتنا</a>
            <button onClick={() => { setView('developer'); setMobileMenuOpen(false); }} className={view === 'developer' ? 'active-nav' : ''} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: view === 'developer' ? 'var(--primary)' : 'var(--text-main)', fontSize: '18px', fontWeight: 'bold', padding: '10px', cursor: 'pointer' }}>
              <Code size={20} color={view === 'developer' ? 'var(--primary)' : 'currentColor'} /> المطور
            </button>
          </div>
        )}
      </header>

      {/* Main Content Wrap */}
      <main className="main-content">
        {view === 'home' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '70px' }}>
            
            {/* Hero Section */}
            <section className="hero-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="hero-top-badge desktop-only">
                  <Crown size={16} color="var(--primary)" /> سنتر القمة - طموحنا فوق.. هدفنا القمة
                </div>
                <h2 className="hero-title">
                  أقوى التأسيس والمراجعات مع <span className="hero-title-highlight">نخبة الأساتذة</span>
                </h2>
                <p className="hero-subtitle">
                  انضم الآن لأقوى مجموعات الشرح التفاعلي والمراجعات النهائية للمرحلة الإعدادية والثانوية. قاعات مجهزة بالكامل، امتحانات دورية، ومتابعة دقيقة مع ولي الأمر.
                </p>
                
                {/* Search / CTA panel */}
                <div className="glass-panel" style={{ display: 'flex', padding: '8px', borderRadius: '50px', gap: '8px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', color: 'var(--primary)' }}>
                    <Search size={20} />
                  </div>
                  <input type="text" placeholder="ابحث عن مادة، أو معلم..." style={{
                    flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', fontSize: '15px', fontWeight: '600', minWidth: 0
                  }} />
                  <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '15px', flexShrink: 0 }}>بحث</button>
                </div>

                {/* App Download CTA */}
                <div className="app-download-cta">
                  <div className="app-download-title">
                    <Sparkles size={20} color="var(--primary)" />
                    حمل البرنامج التعليمي الخاص بطلاب السنتر الآن
                  </div>
                  <div className="app-download-buttons">
                    <a href="/elqema-app.apk" download className="golden-download-btn">
                      <div className="btn-icon">
                        <Download size={22} />
                      </div>
                      <div className="btn-text">
                        <span className="main-text">تنزيل التطبيق</span>
                        <span className="sub-text">ملف APK للأندرويد</span>
                      </div>
                      <Smartphone size={24} className="device-icon" />
                    </a>
                    <div className="exclusive-badge">
                      <Shield size={18} />
                      <span>لطلاب القمة فقط</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teachers Display / Image Container */}
              <div className="hero-image-container">
                {/* Soft Floating Glow Background */}
                <div className="animate-glow" style={{
                  position: 'absolute', bottom: '10%', width: 'min(100%, 450px)', height: '70%',
                  background: 'radial-gradient(circle, rgba(202,138,4,0.25) 0%, transparent 70%)',
                  borderRadius: '50%',
                  zIndex: 1
                }}></div>

                {/* The transparent teachers image floating */}
                <div className="animate-float" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <img src="/teachers-group.png" alt="نخبة أساتذة القمة" style={{ 
                    height: '100%', maxWidth: '100%', objectFit: 'contain', 
                    filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.35))',
                    transformOrigin: 'bottom center', transform: 'scale(1.25)'
                  }} />
                </div>
                
                {/* Floating badge with fixed contrast colors */}
                <div className="glass-panel animate-float floating-badge-container">
                  <div style={{ background: 'var(--primary)', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="floating-badge-contrast" style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>تأسيس شامل</h4>
                    <p className="floating-badge-subtext" style={{ margin: 0, fontSize: '12px', fontWeight: '600' }}>ملازم حصرية ومراجعات</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Statistics Panel */}
            <section className="dark-leather-panel stats-panel">
              <div>
                <h3 style={{ fontSize: '38px', color: 'var(--primary-light)', textShadow: '0 0 10px rgba(254, 240, 138, 0.4)' }}>+15</h3>
                <p style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginTop: '8px' }}>معلم خبير ومخضرم</p>
              </div>
              <div>
                <h3 style={{ fontSize: '38px', color: 'var(--primary-light)', textShadow: '0 0 10px rgba(254, 240, 138, 0.4)' }}>+20</h3>
                <p style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginTop: '8px' }}>مجموعة تعليمية أسبوعية</p>
              </div>
              <div>
                <h3 style={{ fontSize: '38px', color: 'var(--primary-light)', textShadow: '0 0 10px rgba(254, 240, 138, 0.4)' }}>99%</h3>
                <p style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginTop: '8px' }}>معدل تفوق وتخرج الأوائل</p>
              </div>
            </section>

            {/* Booking seat alert banner */}
            {bookingSuccess && (
              <div className="glass-panel" style={{
                padding: '20px', borderLeft: '6px solid var(--success)', background: 'rgba(22, 163, 74, 0.1)',
                color: 'var(--text-main)', fontWeight: '700', fontSize: '16px', textAlign: 'center',
                animation: 'fadeInUp 0.5s ease'
              }}>
                {bookingSuccess}
              </div>
            )}

            {/* Interactive Educational Tools Section */}
            <section id="interactive-tools" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '800', marginBottom: '8px' }}>
                  <Calculator size={22} /> الأدوات التعليمية والأنشطة الذكية
                </div>
                <h2 style={{ color: 'var(--text-main)', fontSize: '32px' }}>تفاعل مع أدوات <span style={{ color: 'var(--primary)' }}>القمة الرقمية</span></h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '6px' }}>نظام ذكي لمحاكاة الدرجات ومطابقة المواعيد ودعم المتصدرين</p>
              </div>

              {/* GPA Simulator & Honor Roll List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                
                {/* GPA Grade Simulator */}
                <div className="grade-simulator-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '22px', color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Brain size={22} color="var(--primary)" />
                      حاسبة الدرجات ومعدل التفوق
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                      اسحب شريط الدرجات لكل مادة لترى تقييمك ومعدلك الدراسي المتوقع فوراً.
                    </p>

                    {/* Inputs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {prepGrades.map((s) => (
                        <div key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700' }}>
                            <span style={{ color: 'var(--text-main)' }}>{s.subject}</span>
                            <span style={{ color: 'var(--primary)' }}>{s.score} / {s.max} درجة</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max={s.max} 
                            value={s.score} 
                            onChange={(e) => handleGradeChange(s.id, e.target.value)} 
                            style={{ 
                              width: '100%', 
                              accentColor: 'var(--primary)',
                              cursor: 'pointer',
                              height: '6px',
                              borderRadius: '3px'
                            }} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculations Dial */}
                  <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '20px', borderTop: '1px dashed var(--border-color)' }}>
                    <div className="grade-result-dial">
                      <span className="grade-result-percentage">{percentage.toFixed(1)}%</span>
                      <span className="grade-result-label">النسبة المتوقعة</span>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '800', color: evaluation.color, marginTop: '10px', padding: '8px', background: 'var(--background)', borderRadius: '10px' }}>
                      {evaluation.text}
                    </div>
                  </div>
                </div>

                {/* Honor Roll & Leaderboard */}
                <div className="grade-simulator-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '22px', color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Trophy size={22} color="var(--primary)" />
                    لوحة شرف أوائل السنتر
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                    قائمة بأسماء الطلبة الأكثر تفوقاً وحصاداً لنقاط التعلم والتميز الأكاديمي.
                  </p>

                  {/* Search Input inside leaderboard */}
                  <div className="glass-panel" style={{ display: 'flex', padding: '6px 12px', borderRadius: '30px', gap: '8px', marginBottom: '20px', boxShadow: 'none', border: '1.5px solid var(--border-color)' }}>
                    <Search size={16} style={{ color: 'var(--text-muted)', alignSelf: 'center' }} />
                    <input 
                      type="text" 
                      placeholder="ابحث عن طالب، صف دراسي، أو لقب..." 
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                      style={{
                        flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', fontSize: '14px', fontWeight: '600'
                      }} 
                    />
                  </div>

                  {/* Leaderboard List */}
                  <div className="leaderboard-list">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <div key={student.rank} className="leaderboard-item">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className={`rank-badge ${student.rank <= 3 ? `rank-${student.rank}` : 'rank-other'}`}>
                              {student.rank}
                            </div>
                            <div>
                              <h4 style={{ fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>{student.name}</h4>
                              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{student.grade} - {student.badge}</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary)' }}>{student.score}</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{student.xp} نقطة XP</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                        لا يوجد نتائج تطابق البحث الحالي
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Interactive Smart Class Schedule */}
              <div className="grade-simulator-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '25px' }}>
                  <div>
                    <h3 style={{ fontSize: '22px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Clock size={22} color="var(--primary)" />
                      مواعيد الحجز في السنتر
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
                      اختر مرحلتك الدراسية لمعرفة الأيام والمواعيد المتاحة للحجز في السنتر.
                    </p>
                  </div>

                  {/* Stage Switch Tabs */}
                  <div className="schedule-tabs-container" style={{ margin: 0 }}>
                    <button 
                      className={`schedule-tab-btn ${activeStage === 'prep' ? 'active' : ''}`}
                      onClick={() => setActiveStage('prep')}
                    >
                      المرحلة الإعدادية
                    </button>
                    <button 
                      className={`schedule-tab-btn ${activeStage === 'secondary' ? 'active' : ''}`}
                      onClick={() => setActiveStage('secondary')}
                    >
                      المرحلة الثانوية
                    </button>
                  </div>
                </div>

                {/* Schedule Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {scheduleData[activeStage].map((item) => (
                    <div key={item.id} className="schedule-card">
                      <span className="schedule-badge">{item.level}</span>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '20px 0 14px 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold' }}>🗓️ الأيام:</span> {item.days}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold' }}>⏰ الموعد:</span> {item.time}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold' }}>🏫 القاعة:</span> {item.room}
                        </div>
                      </div>

                      <button 
                        className="btn-primary" 
                        style={{ width: '100%', padding: '10px 0', fontSize: '14px', marginTop: '10px' }}
                        onClick={() => handleBookSeat(item.subject, item.teacher)}
                      >
                        احجز مقعدك الآن
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Teachers Section */}
            <section id="teachers" style={{ padding: '20px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '800', marginBottom: '8px' }}>
                  <Users size={22} /> الهيئة التعليمية بالسنتر
                </div>
                <h2 style={{ color: 'var(--text-main)', fontSize: '32px' }}>نخبة من <span style={{ color: 'var(--primary)' }}>أفضل مدرسي ومربي</span> الأجيال</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '6px' }}>مدرسون خبراء متخصصون في شرح المناهج وتبسيط المعلومة للوصول للقمة</p>
              </div>
              
              <div className="mobile-carousel">
                <div className="glass-panel glass-panel-hover" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px auto' }}>
                    <Users size={40} />
                  </div>
                  <h3 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '8px' }}>أ. أحمد الدمرداش</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>مدرس خبير في الرياضيات</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>شرح مبسط وهندسي للجبر والهندسة وحساب المثلثات لكافة المراحل الإعدادية والثانوية.</p>
                </div>
                <div className="glass-panel glass-panel-hover" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px auto' }}>
                    <Brain size={40} />
                  </div>
                  <h3 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '8px' }}>د. عاصم الشرقاوي</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>دكتور وخبير الفيزياء</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>تبسيط أفكار المسائل الكهربية والحديثة بالأنيميشن والتجارب المعملية الممتازة.</p>
                </div>
                <div className="glass-panel glass-panel-hover" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px auto' }}>
                    <Atom size={40} />
                  </div>
                  <h3 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '8px' }}>أ. سامر الجارحي</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>مدرس خبير في الكيمياء</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>ربط المعادلات العضوية والغير عضوية وتأسيس متكامل لطلاب الثانوية العامة.</p>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section id="services" style={{ padding: '20px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '800', marginBottom: '8px' }}>
                  <Shield size={22} /> مميزات سنتر القمة التعليمي
                </div>
                <h2 style={{ color: 'var(--text-main)', fontSize: '32px' }}>ماذا نقدم بـ <span style={{ color: 'var(--primary)' }}>السنتر والموقع</span>؟</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '6px' }}>بيئة متكاملة تضمن راحة الطالب وولي الأمر والارتقاء الأكاديمي المستمر</p>
              </div>
              <div className="mobile-carousel">
                <div className="glass-panel glass-panel-hover" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ color: 'var(--primary)', background: 'var(--light)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1.5px solid var(--border-color)' }}>
                    <Users size={30} />
                  </div>
                  <h3 style={{ fontSize: '20px', color: 'var(--text-main)' }}>شرح تفاعلي ومجموعات</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    قاعات مجهزة بأحدث وسائل العرض وشاشات ذكية متطورة لشرح المناهج مع نخبة المدرسين.
                  </p>
                </div>
                <div className="glass-panel glass-panel-hover" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ color: 'var(--primary)', background: 'var(--light)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1.5px solid var(--border-color)' }}>
                    <BookOpen size={30} />
                  </div>
                  <h3 style={{ fontSize: '20px', color: 'var(--text-main)' }}>ملازم حصرية ومراجعات</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    ملخصات وملازم حصرية تلخص المناهج بدقة وتدريبات مستمرة متوافقة مع الأنماط الحديثة.
                  </p>
                </div>
                <div className="glass-panel glass-panel-hover" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ color: 'var(--primary)', background: 'var(--light)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1.5px solid var(--border-color)' }}>
                    <Shield size={30} />
                  </div>
                  <h3 style={{ fontSize: '20px', color: 'var(--text-main)' }}>تقييمات ومتابعة أولياء الأمور</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    امتحانات أسبوعية دورية لتقييم فهم الطلاب وإشعارات وتقارير فورية ترسل لولي الأمر بانتظام.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Animated Location Footer */}
            <footer className="footer-location animate-fade-in" style={{ marginTop: '100px', padding: '60px 20px 40px', position: 'relative', overflow: 'hidden' }}>
              <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '50px', borderRadius: '30px', textAlign: 'center', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', border: '1px solid rgba(234, 179, 8, 0.3)', background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(30px)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.5 }}></div>
                
                <div className="location-pulse-icon" style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.05))', color: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 30px rgba(234, 179, 8, 0.2)', border: '1px solid rgba(234, 179, 8, 0.4)' }}>
                  <MapPin size={45} />
                </div>
                
                <h2 className="location-title">مقر السنتر الرئيسي</h2>
                
                <div className="location-address-box">
                  <Compass size={30} className="location-compass-icon" color="var(--primary)" />
                  <p className="location-address-text">
                    كفر الدوار - البيضا - عزب طه - شارع الطيار العالي
                  </p>
                </div>
                
                <div style={{ width: '100%', height: '350px', marginTop: '15px', marginBottom: '10px', borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(234, 179, 8, 0.2)', boxShadow: '0 15px 30px rgba(0,0,0,0.6)', background: '#000' }}>
                  <iframe 
                    src="https://maps.google.com/maps?q=كفر%20الدوار%20البيضا%20عزب%20طه%20شارع%20الطيار%20العالي&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقع السنتر على خرائط جوجل"
                  ></iframe>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0, marginTop: '10px' }}>
                  نحن في انتظارك لتبدأ رحلة التفوق والنجاح معنا! 👑
                </p>
              </div>
            </footer>
          </div>
        )}

        {view === 'developer' && (
          <div className="developer-page animate-fade-in">
            <div className="bg-grid-dev"></div>
            <div className="glowing-orb orb-1"></div>
            <div className="glowing-orb orb-2"></div>
            
            {/* Snowfall simulation */}
            <div className="snow-container">
              {snowflakesList.map(sf => (
                <div 
                  key={sf.id} 
                  className="snowflake" 
                  style={{
                    left: `${sf.left}%`,
                    fontSize: `${sf.size}px`,
                    animationDelay: `${sf.delay}s`,
                    animationDuration: `${sf.duration}s`,
                    opacity: sf.opacity,
                    filter: sf.char === '🌹' ? 'drop-shadow(0 0 5px rgba(255,0,0,0.5))' : undefined
                  }}
                >
                  {sf.char}
                </div>
              ))}
            </div>
            
            <div className="dev-card">
              <div className="dev-avatar-container">
                <div className="dev-avatar">
                  <img src="https://i.ibb.co/wNvLrcQR/image.png" alt="Developer Ibrahim" />
                </div>
              </div>
              
              <h1 className="dev-title" style={{ fontSize: '32px' }}>M/IBRAHIM FATHY IBRAHIM</h1>
              <p className="dev-subtitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Terminal size={18} /> Senior Web & App Developer</p>
              
              <div className="dev-skills">
                <span className="dev-skill-badge"><Code size={14} /> Full Stack Development</span>
                <span className="dev-skill-badge"><Cpu size={14} /> AI Integration</span>
                <span className="dev-skill-badge"><Smartphone size={14} /> React Native</span>
                <span className="dev-skill-badge"><Globe size={14} /> UI/UX Design</span>
              </div>
              
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '40px', fontSize: '15px' }}>
                We build scalable, high-performance, and visually stunning applications that push the boundaries of modern web technologies. Excellence is not an act, but a habit.
              </p>
              
              <div className="dev-contact-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                <a href="tel:+2010939229945" className="dev-contact-btn" title="Phone: 010939229945" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                  <Phone size={24} />
                </a>
                <a href="https://wa.me/201202060839" target="_blank" rel="noopener noreferrer" className="dev-contact-btn" title="WhatsApp: 01202060839" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.3)' }}>
                  <MessageSquare size={24} />
                </a>
                <a href="https://facebook.com/w1Hema" target="_blank" rel="noopener noreferrer" className="dev-contact-btn" title="Facebook: w1Hema" style={{ background: 'rgba(24, 119, 242, 0.1)', color: '#1877f2', borderColor: 'rgba(24, 119, 242, 0.3)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://t.me/w1Hema" target="_blank" rel="noopener noreferrer" className="dev-contact-btn" title="Telegram: w1Hema" style={{ background: 'rgba(0, 136, 204, 0.1)', color: '#0088cc', borderColor: 'rgba(0, 136, 204, 0.3)' }}>
                  <Send size={24} />
                </a>
                <a href="https://discordapp.com/users/w1Hema" target="_blank" rel="noopener noreferrer" className="dev-contact-btn" title="Discord: w1Hema" style={{ background: 'rgba(88, 101, 242, 0.1)', color: '#5865F2', borderColor: 'rgba(88, 101, 242, 0.3)' }}>
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
          </div>
        )}

        {view === 'login' && (
          <div className="login-page-container animate-fade-in">
            <div className="login-box glass-panel">
              <div className="login-header">
                <div className="login-logo animate-float">
                  <Crown size={40} color="var(--primary)" />
                </div>
                <h2>تسجيل بيانات الطالب</h2>
                <p>أدخل بياناتك لفتح قسم الفيديوهات التعليمية</p>
              </div>
              
              <form className="login-form" onSubmit={(e) => { 
                e.preventDefault(); 
                setIsLoggedIn(true); 
                if (rememberMe) {
                  localStorage.setItem('isLoggedIn', 'true');
                }
                setView('dashboard'); 
              }}>
                <div className="input-group">
                  <label>اسم الطالب (ثلاثي)</label>
                  <div className="input-wrapper">
                    <input type="text" placeholder="أدخل اسمك بالكامل..." required />
                    <Users size={20} className="input-icon" />
                  </div>
                </div>
                
                <div className="input-group">
                  <label>كود السنتر</label>
                  <div className="input-wrapper">
                    <input type="text" placeholder="أدخل الكود الخاص بك..." required />
                    <Shield size={20} className="input-icon" />
                  </div>
                </div>

                <div className="input-group">
                  <label>المرحلة الدراسية</label>
                  <div className="input-wrapper">
                    <select required className="custom-select" defaultValue="">
                      <option value="" disabled>اختر صفك الدراسي...</option>
                      <option value="prep1">الصف الأول الإعدادي</option>
                      <option value="prep2">الصف الثاني الإعدادي</option>
                      <option value="prep3">الصف الثالث الإعدادي</option>
                      <option value="sec1">الصف الأول الثانوي</option>
                      <option value="sec2">الصف الثاني الثانوي</option>
                      <option value="sec3">الصف الثالث الثانوي</option>
                    </select>
                    <GraduationCap size={20} className="input-icon" />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', justifyContent: 'flex-start' }}>
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                  />
                  <label htmlFor="rememberMe" style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', margin: 0, userSelect: 'none' }}>
                    حفظ بيانات الدخول على هذا الجهاز
                  </label>
                </div>
                
                <button type="submit" className="golden-download-btn login-submit-btn" style={{ width: '100%', justifyContent: 'center' }}>
                  <div className="btn-text" style={{ textAlign: 'center' }}>
                    <span className="main-text">دخول وفتح الفيديوهات</span>
                  </div>
                </button>
              </form>
            </div>
            
            <button className="back-to-home" onClick={() => setView('home')}>
              <ArrowRight size={18} />
              العودة للرئيسية
            </button>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="dashboard-container animate-fade-in" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '30px', minHeight: '80vh' }}>
            <div className="dashboard-header glass-panel" style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: 'var(--text-main)', marginBottom: '5px' }}>أهلاً بك يا بطل في منصة القمة</h2>
                <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>اختر المادة الدراسية للبدء</p>
              </div>
              <button onClick={() => { setIsLoggedIn(false); localStorage.removeItem('isLoggedIn'); setView('home'); }} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                <LogOut size={18} /> <span className="desktop-only">تسجيل الخروج</span>
              </button>
            </div>
            
            <div className="subjects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {subjects.map((subject) => (
                <div key={subject.id} className="subject-card glass-panel glass-panel-hover" onClick={() => { setSelectedSubject(subject); setActiveLesson(courseLessons[0]); setView('player'); }} style={{ padding: '30px', borderRadius: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px', transition: 'all 0.3s' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `linear-gradient(135deg, ${subject.color}22, ${subject.color}11)`, color: subject.color, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px', border: `1px solid ${subject.color}44` }}>
                    {getSubjectIcon(subject.icon)}
                  </div>
                  <h3 style={{ fontSize: '22px', color: 'var(--text-main)', margin: 0, fontWeight: '800' }}>{subject.name}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{subject.description}</p>
                  <div style={{ marginTop: '5px', color: 'var(--primary)', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Play size={16} /> تصفح الحصص
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {view === 'player' && activeLesson && (
          <div className="player-page animate-fade-in" style={{ padding: '30px 20px', maxWidth: '1400px', margin: '0 auto', minHeight: '80vh' }}>
            
            {/* Header / Back */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <button onClick={() => setView('dashboard')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px' }}>
                <ArrowRight size={18} /> <span className="desktop-only">العودة للمواد</span>
              </button>
              <h2 style={{ fontSize: '20px', color: 'var(--text-main)', margin: 0, fontWeight: '800' }}>منصة القمة للفيديوهات</h2>
            </div>

            <div className="player-layout">
              {/* Main Player Area */}
              <div className="player-main">
                {showExam ? (
                  <div className="exam-wrapper glass-panel animate-fade-in" style={{ padding: '40px', borderRadius: '16px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '24px', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Brain color="var(--primary)" /> اختبار الحصة: {activeLesson.title}
                      </h3>
                      <button onClick={() => setShowExam(false)} className="btn-secondary" style={{ padding: '8px', borderRadius: '50%' }}>
                        <X size={20} />
                      </button>
                    </div>

                    {examResult !== null ? (
                      <div className="exam-result animate-fade-in" style={{ textAlign: 'center', margin: 'auto' }}>
                        <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px', borderRadius: '50%', background: examResult >= 2 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: examResult >= 2 ? '#10b981' : '#ef4444', marginBottom: '20px' }}>
                          {examResult >= 2 ? <Trophy size={50} /> : <X size={50} />}
                        </div>
                        <h2 style={{ color: 'var(--text-main)', fontSize: '28px', marginBottom: '10px' }}>
                          {examResult >= 2 ? 'نجاح مبهر! أسطورة!' : 'حاول مرة أخرى يا بطل!'}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '30px' }}>
                          لقد حصلت على {examResult} من {examQuestions.length}
                        </p>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                          {examResult >= 2 && !completedLessons.includes(activeLesson.id) && (
                            <button 
                              className="golden-download-btn"
                              onClick={() => {
                                setCompletedLessons([...completedLessons, activeLesson.id]);
                                setShowExam(false);
                              }}
                            >
                              <div className="btn-text">
                                <span className="main-text" style={{ fontSize: '16px' }}>متابعة وتأكيد الإنجاز <CheckCircle size={18} style={{ display: 'inline-block', verticalAlign: 'middle' }} /></span>
                              </div>
                            </button>
                          )}
                          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px' }} onClick={() => setShowExam(false)}>
                            العودة للحصة <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="exam-question animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                          <span>السؤال {currentQuestion + 1} من {examQuestions.length}</span>
                        </div>
                        <h4 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '30px', lineHeight: '1.5' }}>
                          {examQuestions[currentQuestion].q}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                          {examQuestions[currentQuestion].options.map((opt, idx) => (
                            <button 
                              key={idx}
                              onClick={() => setSelectedAnswer(idx)}
                              style={{
                                padding: '15px 20px',
                                borderRadius: '12px',
                                border: selectedAnswer === idx ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                                background: selectedAnswer === idx ? 'rgba(234, 179, 8, 0.1)' : 'rgba(0,0,0,0.02)',
                                color: 'var(--text-main)',
                                fontSize: '16px',
                                textAlign: 'right',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px'
                              }}
                            >
                              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: selectedAnswer === idx ? '6px solid var(--primary)' : '2px solid var(--text-muted)', transition: 'all 0.2s ease' }}></div>
                              {opt}
                            </button>
                          ))}
                        </div>
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                          <button 
                            className="golden-download-btn" 
                            disabled={selectedAnswer === null}
                            style={{ opacity: selectedAnswer === null ? 0.5 : 1, width: 'auto' }}
                            onClick={() => {
                              const isCorrect = selectedAnswer === examQuestions[currentQuestion].answer;
                              const newScore = isCorrect ? examScore + 1 : examScore;
                              if (isCorrect) setExamScore(newScore);
                              
                              if (currentQuestion === examQuestions.length - 1) {
                                setExamResult(newScore);
                              } else {
                                setCurrentQuestion(currentQuestion + 1);
                                setSelectedAnswer(null);
                              }
                            }}
                          >
                            <div className="btn-text" style={{ padding: '0 20px' }}>
                              <span className="main-text" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                                {currentQuestion === examQuestions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'} <ArrowLeft size={18} />
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="video-wrapper">
                    {/* Using a placeholder for the actual video player */}
                    <video 
                      controls 
                      poster={`https://placehold.co/1280x720/1e293b/fbbf24?text=${encodeURIComponent(activeLesson.title)}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                      autoPlay
                      key={activeLesson.id}
                    >
                      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                  </div>
                )}
                
                <div className="glass-panel" style={{ marginTop: '20px', padding: '24px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                      <h1 style={{ fontSize: '24px', color: 'var(--text-main)', marginBottom: '10px', fontWeight: '800' }}>{activeLesson.title}</h1>
                      <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '15px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16} /> {activeLesson.duration}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Users size={16} /> 2.4k طالب مسجل</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button 
                        className="btn-primary"
                        style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => {
                          setShowExam(true);
                          setCurrentQuestion(0);
                          setSelectedAnswer(null);
                          setExamResult(null);
                          setExamScore(0);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Brain size={20} /> <span style={{ fontSize: '15px' }}>اختبار الحصة</span>
                      </button>
                      <button 
                      className={`golden-download-btn ${completedLessons.includes(activeLesson.id) ? 'completed' : ''}`}
                      style={{ 
                        padding: '10px 24px', 
                        background: completedLessons.includes(activeLesson.id) ? 'var(--success, #10b981)' : '',
                        borderColor: completedLessons.includes(activeLesson.id) ? 'transparent' : '',
                        animation: completedLessons.includes(activeLesson.id) ? 'none' : ''
                      }}
                      onClick={() => {
                        if(!completedLessons.includes(activeLesson.id)) {
                          setCompletedLessons([...completedLessons, activeLesson.id]);
                        }
                      }}
                    >
                      <div className="btn-text" style={{ textAlign: 'center', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                        {completedLessons.includes(activeLesson.id) ? (
                          <><CheckCircle size={20} /> <span className="main-text" style={{ fontSize: '15px' }}>تم الإنجاز</span></>
                        ) : (
                          <><Play size={20} /> <span className="main-text" style={{ fontSize: '15px' }}>تحديد كـ "مكتمل"</span></>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
                  
                <hr style={{ borderTop: '1px solid var(--border-color)', margin: '15px 0' }} />
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8' }}>
                    {activeLesson.description}
                  </p>
                </div>
              </div>

              {/* Sidebar Playlist Area */}
              <div className="player-sidebar glass-panel" style={{ borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={20} color="var(--primary)" /> قائمة الحصص
                  </h3>
                  
                  {/* Progress Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 'bold' }}>
                    <span>نسبة الإنجاز</span>
                    <span style={{ color: 'var(--primary)' }}>{Math.round((completedLessons.length / courseLessons.length) * 100)}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      background: 'linear-gradient(90deg, var(--primary), #ca8a04)', 
                      width: `${(completedLessons.length / courseLessons.length) * 100}%`,
                      transition: 'width 0.5s ease-out'
                    }}></div>
                  </div>
                </div>

                <div className="playlist-items" style={{ overflowY: 'auto', flex: 1 }}>
                  {courseLessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={`playlist-item ${activeLesson.id === lesson.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveLesson(lesson);
                        setShowExam(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="item-icon">
                        {completedLessons.includes(lesson.id) ? (
                          <CheckCircle size={18} style={{ color: 'var(--success, #10b981)' }} />
                        ) : activeLesson.id === lesson.id ? (
                          <Play size={18} color="var(--primary)" />
                        ) : (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-muted)' }}></div>
                        )}
                      </div>
                      <div className="item-details">
                        <h4>{lesson.title}</h4>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Chat Components - Only visible on Home Page */}
      {view === 'home' && (
        <>
          {/* Floating AI Chat Assistant Trigger Button */}
          <div className="ai-chat-bubble" onClick={() => setChatOpen(!chatOpen)}>
            {chatOpen ? <X size={26} /> : <MessageSquare size={26} />}
          </div>

          {/* Floating AI Chat Assistant Window */}
          {chatOpen && (
            <div className="ai-chat-window animate-fade-in">
              {/* Header */}
              <div className="ai-chat-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: 'white', color: 'var(--primary)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>مساعد القمة الذكي</h4>
                    <span style={{ fontSize: '10px', opacity: 0.85 }}>متصل حالياً ومستعد</span>
                  </div>
                </div>
                <button style={{ background: 'none', color: 'white' }} onClick={() => setChatOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              {/* Messages Body */}
              <div className="ai-chat-body">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-message ai" style={{ display: 'flex', alignItems: 'center', padding: '8px 12px' }}>
                    <div className="ai-typing-dots">
                      <div className="ai-typing-dot"></div>
                      <div className="ai-typing-dot"></div>
                      <div className="ai-typing-dot"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form className="ai-chat-input-area" onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  placeholder="اكتب سؤالك هنا..." 
                  className="ai-chat-input"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button type="submit" style={{ background: 'none', color: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                  <Send size={20} />
                </button>
              </form>
            </div>
          )}
        </>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="modal-overlay animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ padding: '40px', borderRadius: '20px', maxWidth: '450px', textAlign: 'center', position: 'relative', margin: '20px' }}>
            <button onClick={() => setShowLoginPrompt(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' }}>
              <Shield size={40} />
            </div>
            <h2 style={{ fontSize: '24px', color: 'var(--text-main)', marginBottom: '15px' }}>عفواً، الدخول للطلاب فقط!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
              محتوى "فيديوهات السنتر" مخصص لطلاب السنتر فقط. إذا كان لديك حساب يمكنك تسجيل الدخول، أو يمكنك التواصل معنا للانضمام للسنتر الأونلاين.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button 
                className="golden-download-btn"
                onClick={() => { setShowLoginPrompt(false); setView('login'); }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <div className="btn-text">
                  <span className="main-text">تسجيل الدخول</span>
                </div>
              </button>
              <a 
                href="https://wa.me/201000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', textDecoration: 'none', color: 'var(--success, #10b981)', border: '2px solid rgba(16, 185, 129, 0.2)' }}
              >
                 تواصل معنا عبر واتساب للتسجيل
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
