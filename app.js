/* ==========================================================================
   AETHER ACADEMY CORE JAVASCRIPT REDESIGN WITH FLUID CURSOR AND 3D TILT
   ========================================================================== */

const translations = {
    en: {
        nav_title: "Aether Academy | The Premium Future Learning Platform",
        nav_home: "Home",
        nav_categories: "Categories",
        nav_courses: "Courses",
        nav_reviews: "Reviews",
        nav_faq: "FAQ",
        nav_browse: "Browse Paths",
        nav_start: "Start Now",
        hero_badge: "Next Generation Learning Experience",
        hero_title_1: "Unleash your journey into the world of",
        hero_title_2: "Future Knowledge",
        hero_subtitle: "A premium interactive learning environment enhanced with 3D interactive spaces, cutting-edge curricula, and guidance from top tech experts.",
        hero_btn_discover: "Discover Courses",
        hero_btn_demo: "Interactive Demo",
        hero_feature_1: "Certified Paths",
        hero_feature_2: "Interactive Labs",
        scroll_down: "Scroll Down",
        stat_1: "Ultra-High End Courses",
        stat_2: "Cosmos Explorers Joined",
        stat_3: "Direct Success Rate",
        stat_4: "Expert Space Mentors",
        cat_tagline: "DISCOVER PATHWAYS",
        cat_title: "Explore by Premium Academy Categories",
        cat_desc: "Unlock curated pathways crafted by masterminds to transition your skills into the next technological paradigm.",
        cat_1_title: "Artificial Intelligence & Neural Nets",
        cat_1_desc: "Deep learning models, neural processing architecture, and neuromorphic engineering.",
        cat_2_title: "Creative Arts & Spatial Designs",
        cat_2_desc: "Cinematic editing, interactive WebGL design, spatial interfaces, and 3D modeling.",
        cat_3_title: "Business Growth & Tokenomics",
        cat_3_desc: "Capital management, startup expansion models, and descentralized economic networks.",
        cat_4_title: "Quantum Data & High Computing",
        cat_4_desc: "Quantum informatics, multi-threaded database systems, and cryptographic integrity.",
        cat_5_title: "Linguistic Coding & Semantics",
        cat_5_desc: "Advanced lexical analysis, NLP pipelines, and conceptual communications.",
        cat_6_title: "Bio-Informatics & Genomics",
        cat_6_desc: "Genomic sequencing pipelines, bio-computational modeling, and protein folding.",
        cat_placeholders: "Placeholders Only",
        courses_tagline: "TECH SPACE ACADEMY",
        courses_title: "Professional Foundation Tracks",
        courses_desc: "Start your educational journey now with the comprehensive tech foundation package at a special limited-time discount.",
        course_discount: "50% OFF",
        course_1_tag: "Software Engineering",
        course_1_title: "Comprehensive Programming Foundation",
        course_1_desc: "Start your programming journey from scratch. Learn programming logic, thinking algorithms, and basic data structures with powerful languages like Python and JS.",
        course_1_hours: "24 Hours",
        course_1_lessons: "42 Lessons",
        course_2_tag: "Artificial Intelligence",
        course_2_title: "Artificial Intelligence Foundation",
        course_2_desc: "Understand the principles of intelligent machines. Explore neural networks, Natural Language Processing (NLP), and deep learning with modern generative models.",
        course_2_hours: "36 Hours",
        course_2_lessons: "58 Lessons",
        course_3_tag: "Network Engineering",
        course_3_title: "Computer Networks Foundation",
        course_3_desc: "Learn the architecture of global data transmission. Understand essential web protocols, DNS architecture, cybersecurity principles, and firewall protection.",
        course_3_hours: "18 Hours",
        course_3_lessons: "30 Lessons",
        btn_enroll: "Enroll Now",
        courses_alert: "The 50% discount offer is valid for a limited time. Register now to secure your seat in the upcoming batch.",
        courses_action_btn: "Get the Full Package",
        test_tagline: "FEEDBACK HARMONICS",
        test_title: "Cosmos Traveler Insights",
        test_desc: "Read the experience profiles recorded from our alpha testers who completed courses simulations.",
        faq_tagline: "DECRYPTER SYSTEM",
        faq_title: "Frequently Asked Questions",
        faq_desc: "Browse core information regarding space node licensing, academy systems, and learning paths.",
        faq_1_q: "How do I unlock interactive learning paths?",
        faq_1_a: "Once the syllabus node is finalized, travelers can register an Aether account, execute a node connection, and immediately gain access to real-time interactive sandboxes directly in the web browser.",
        faq_2_q: "Are these certificates accredited globally?",
        faq_2_a: "Yes. Every academy track has a unique cryptographic hash registered on our validation matrix, confirming curriculum completion and technical mastery to global enterprises.",
        faq_3_q: "Can I learn at my own speed?",
        faq_3_a: "Absolutely. The platform utilizes custom learning states saved directly to your profile. Explore advanced models or repeat modules as many times as necessary with 24/7 server access.",
        faq_4_q: "What hardware is required for the 3D visual environments?",
        faq_4_a: "No specialized hardware is required. The rendering pipeline is highly optimized via WebGL/Three.js to ensure standard laptops, smartphones, and tablets run simulations smoothly at 60 FPS.",
        news_title: "Initialize Your Quantum Ascent",
        news_desc: "Enter your transmission coordinates to receive priority invitations for next-generation course cohorts.",
        news_btn: "Transmit Core",
        footer_brand: "Pioneering the next era of tech-driven learning. Immersive environments, verified masteries, unlimited potential.",
        footer_col_1_title: "COSMOS PATHS",
        footer_col_1_1: "Neural Learning",
        footer_col_1_2: "Quantum Dev",
        footer_col_1_3: "Tokenomics",
        footer_col_1_4: "Visual Designs",
        footer_col_2_title: "SYSTEM CORE",
        footer_col_2_1: "Syllabus Network",
        footer_col_2_2: "Interactive Labs",
        footer_col_2_3: "Validation Keys",
        footer_col_2_4: "Server Status",
        footer_col_3_title: "ACADEMY INFO",
        footer_col_3_1: "Travel Log",
        footer_col_3_2: "Research Labs",
        footer_col_3_3: "Documentation",
        footer_col_3_4: "Core Licensing",
        footer_copy: "© 2026 Aether Academy. All simulated interfaces reserved.",
        footer_bot_3: "System Integrity",
        auth_title_login: "Log In",
        auth_title_signup: "Sign Up",
        auth_subtitle: "Gateway to the Technological Future",
        auth_forgot: "Forgot Password?",
        auth_btn_login: "Log In",
        auth_btn_signup: "Sign Up",
        auth_or: "Or Sign In Using",
        auth_logout: "Log Out"
    },
    ar: {
        nav_title: "أكاديمية إيثر | منصة التعليم المستقبلية الفاخرة",
        nav_home: "الرئيسية",
        nav_categories: "المجالات",
        nav_courses: "الكورسات",
        nav_reviews: "الآراء",
        nav_faq: "الأسئلة الشائعة",
        nav_browse: "تصفح المسارات",
        nav_start: "ابدأ الآن",
        hero_badge: "تجربة تعليمية من الجيل القادم",
        hero_title_1: "أطلق العنان لرحلتك في عالم",
        hero_title_2: "المعرفة المستقبلية",
        hero_subtitle: "بيئة تعليمية تفاعلية فاخرة معززة ببيئات ثلاثية الأبعاد، مناهج متطورة، وتوجيه من نخبة الخبراء.",
        hero_btn_discover: "اكتشف الكورسات",
        hero_btn_demo: "عرض تفاعلي",
        hero_feature_1: "مسارات معتمدة",
        hero_feature_2: "مختبرات تفاعلية",
        scroll_down: "انزل للأسفل",
        stat_1: "كورسات احترافية",
        stat_2: "طالب انضموا",
        stat_3: "نسبة نجاح",
        stat_4: "خبراء فضاء",
        cat_tagline: "اكتشف المسارات",
        cat_title: "تصفح حسب مجالات الأكاديمية",
        cat_desc: "افتح مسارات منسقة بعناية لنقل مهاراتك إلى المستوى التقني التالي.",
        cat_1_title: "الذكاء الاصطناعي والشبكات العصبية",
        cat_1_desc: "نماذج التعلم العميق، معمارية المعالجة العصبية، والهندسة العصبية.",
        cat_2_title: "الفنون الإبداعية والتصميم المكاني",
        cat_2_desc: "التحرير السينمائي، تصميم WebGL التفاعلي، والنمذجة ثلاثية الأبعاد.",
        cat_3_title: "نمو الأعمال واقتصاديات التوكن",
        cat_3_desc: "إدارة رأس المال، نماذج توسع الشركات الناشئة، والشبكات الاقتصادية اللامركزية.",
        cat_4_title: "البيانات الكمية والحوسبة العالية",
        cat_4_desc: "المعلوماتية الكمية، أنظمة قواعد البيانات متعددة الخيوط، والنزاهة التشفيرية.",
        cat_5_title: "البرمجة اللغوية والدلالات",
        cat_5_desc: "التحليل المعجمي المتقدم، خطوط أنابيب معالجة اللغات الطبيعية، والتواصل المفاهيمي.",
        cat_6_title: "المعلوماتية الحيوية وعلم الجينوم",
        cat_6_desc: "تسلسل الجينوم، النمذجة الحيوية الحاسوبية، وطي البروتين.",
        cat_placeholders: "نصوص تجريبية",
        courses_tagline: "أكاديمية الفضاء التقني",
        courses_title: "المسارات التأسيسية الاحترافية",
        courses_desc: "ابدأ مسارك التعليمي الآن مع باقة التأسيس التكنولوجي الشاملة بخصم خاص.",
        course_discount: "خصم 50%",
        course_1_tag: "هندسة البرمجيات",
        course_1_title: "تأسيس البرمجة الشامل",
        course_1_desc: "ابدأ رحلتك البرمجية من الصفر. تعلم المنطق البرمجي مع Python و JS.",
        course_1_hours: "24 ساعة",
        course_1_lessons: "42 درس",
        course_2_tag: "الذكاء الاصطناعي",
        course_2_title: "تأسيس الذكاء الاصطناعي",
        course_2_desc: "استكشف الشبكات العصبية ومعالجة اللغات الطبيعية والتعلم العميق.",
        course_2_hours: "36 ساعة",
        course_2_lessons: "58 درس",
        course_3_tag: "هندسة الشبكات",
        course_3_title: "تأسيس شبكات الحاسوب",
        course_3_desc: "تعلم بروتوكولات الويب الأساسية، بنية الـ DNS، ومبادئ الأمن السيبراني.",
        course_3_hours: "18 ساعة",
        course_3_lessons: "30 درس",
        btn_enroll: "سجل الآن",
        courses_alert: "العرض الخاص بالخصم (50%) سارٍ لفترة محدودة. سجل الآن لضمان مقعدك.",
        courses_action_btn: "احصل على الباقة الكاملة",
        test_tagline: "تناغم التقييمات",
        test_title: "آراء طلابنا",
        test_desc: "اقرأ التقييمات الحية لطلابنا الذين أكملوا محاكاة الكورسات.",
        faq_tagline: "نظام الأسئلة",
        faq_title: "الأسئلة الشائعة",
        faq_desc: "تصفح المعلومات الأساسية حول أنظمة الأكاديمية ومسارات التعلم.",
        faq_1_q: "كيف يمكنني فتح مسارات التعلم؟",
        faq_1_a: "بمجرد التسجيل، ستتمكن من الوصول لبيئات التعلم التفاعلية في متصفحك.",
        faq_2_q: "هل الشهادات معتمدة عالميا؟",
        faq_2_a: "نعم. يتم تسجيل كل مسار بتشفير لضمان التوثيق المعتمد.",
        faq_3_q: "هل يمكنني التعلم بالسرعة التي تناسبني؟",
        faq_3_a: "بالتأكيد. يمكنك تكرار الدروس قدر ما تشاء مع وصول 24/7.",
        faq_4_q: "ما هي الأجهزة المطلوبة؟",
        faq_4_a: "لا حاجة لأجهزة قوية، النظام محسّن ليعمل على جميع الأجهزة بـ 60 إطار بالثانية.",
        news_title: "ابدأ رحلتك الآن",
        news_desc: "أدخل بريدك الإلكتروني لتلقي دعوات الأولوية للدفعات القادمة.",
        news_btn: "إرسال البيانات",
        footer_brand: "نقود الجيل القادم من التعلم التكنولوجي. بيئات تفاعلية، ومهارات معتمدة.",
        footer_col_1_title: "مسارات الكون",
        footer_col_1_1: "التعلم العصبي",
        footer_col_1_2: "برمجة الكم",
        footer_col_1_3: "الاقتصاد الرقمي",
        footer_col_1_4: "التصاميم المرئية",
        footer_col_2_title: "نواة النظام",
        footer_col_2_1: "المنهج الدراسي",
        footer_col_2_2: "المختبرات التفاعلية",
        footer_col_2_3: "مفاتيح التحقق",
        footer_col_2_4: "حالة السيرفر",
        footer_col_3_title: "معلومات الأكاديمية",
        footer_col_3_1: "سجل الرحلات",
        footer_col_3_2: "مختبرات الأبحاث",
        footer_col_3_3: "التوثيق",
        footer_col_3_4: "التراخيص الأساسية",
        footer_copy: "© 2026 أكاديمية إيثر. جميع الحقوق محفوظة.",
        footer_bot_3: "نزاهة النظام",
        auth_title_login: "تسجيل الدخول",
        auth_title_signup: "إنشاء حساب",
        auth_subtitle: "بوابة العبور للمستقبل التقني",
        auth_forgot: "نسيت كلمة المرور؟",
        auth_btn_login: "تسجيل الدخول",
        auth_btn_signup: "إنشاء حساب",
        auth_or: "أو سجل الدخول بواسطة",
        auth_logout: "تسجيل الخروج"
    },
    fr: {
        nav_title: "Aether Academy | La plateforme d'apprentissage de l'avenir",
        nav_home: "Accueil",
        nav_categories: "Catégories",
        nav_courses: "Cours",
        nav_reviews: "Avis",
        nav_faq: "FAQ",
        nav_browse: "Parcourir",
        nav_start: "Commencer",
        hero_badge: "Expérience d'apprentissage de nouvelle génération",
        hero_title_1: "Libérez votre voyage dans le monde de",
        hero_title_2: "La Connaissance Future",
        hero_subtitle: "Un environnement d'apprentissage interactif premium enrichi d'espaces 3D interactifs et de programmes d'avant-garde.",
        hero_btn_discover: "Découvrir les Cours",
        hero_btn_demo: "Démo Interactive",
        hero_feature_1: "Parcours Certifiés",
        hero_feature_2: "Laboratoires Interactifs",
        scroll_down: "Défiler vers le bas",
        stat_1: "Cours Haut de Gamme",
        stat_2: "Explorateurs Inscrits",
        stat_3: "Taux de Réussite",
        stat_4: "Mentors Experts",
        cat_tagline: "DÉCOUVRIR LES PARCOURS",
        cat_title: "Explorez par Catégories de l'Académie",
        cat_desc: "Débloquez des parcours soigneusement conçus pour faire passer vos compétences au prochain paradigme technologique.",
        cat_1_title: "Intelligence Artificielle et Réseaux Neuronaux",
        cat_1_desc: "Modèles d'apprentissage profond et ingénierie neuromorphique.",
        cat_2_title: "Arts Créatifs et Designs Spatiaux",
        cat_2_desc: "Montage cinématique, design interactif WebGL et modélisation 3D.",
        cat_3_title: "Croissance Commerciale et Tokenomics",
        cat_3_desc: "Gestion du capital, modèles d'expansion de startups et réseaux décentralisés.",
        cat_4_title: "Données Quantiques et Haute Informatique",
        cat_4_desc: "Informatique quantique, bases de données multithread et intégrité cryptographique.",
        cat_5_title: "Codage Linguistique et Sémantique",
        cat_5_desc: "Analyse lexicale avancée, pipelines NLP et communications conceptuelles.",
        cat_6_title: "Bio-Informatique et Génomique",
        cat_6_desc: "Pipelines de séquençage génomique et modélisation bio-informatique.",
        cat_placeholders: "Espaces Réservés",
        courses_tagline: "ACADÉMIE DE L'ESPACE TECH",
        courses_title: "Parcours Fondamentaux Professionnels",
        courses_desc: "Commencez votre parcours éducatif maintenant avec le package fondation technique complet avec une réduction limitée.",
        course_discount: "-50%",
        course_1_tag: "Ingénierie Logicielle",
        course_1_title: "Fondements Complets de la Programmation",
        course_1_desc: "Apprenez la logique de programmation, les algorithmes de pensée avec Python et JS.",
        course_1_hours: "24 Heures",
        course_1_lessons: "42 Leçons",
        course_2_tag: "Intelligence Artificielle",
        course_2_title: "Fondements de l'Intelligence Artificielle",
        course_2_desc: "Explorez les réseaux de neurones, le traitement du langage naturel (NLP) et l'apprentissage profond.",
        course_2_hours: "36 Heures",
        course_2_lessons: "58 Leçons",
        course_3_tag: "Ingénierie Réseaux",
        course_3_title: "Fondements des Réseaux Informatiques",
        course_3_desc: "Comprendre les protocoles web essentiels, l'architecture DNS et les principes de cybersécurité.",
        course_3_hours: "18 Heures",
        course_3_lessons: "30 Leçons",
        btn_enroll: "S'inscrire",
        courses_alert: "L'offre de réduction de 50% est valable pour une durée limitée. Inscrivez-vous dès maintenant.",
        courses_action_btn: "Obtenir le Package",
        test_tagline: "HARMONIQUES DES RETOURS",
        test_title: "Aperçus des Voyageurs du Cosmos",
        test_desc: "Lisez les profils d'expérience enregistrés par nos testeurs alpha.",
        faq_tagline: "SYSTÈME DE DÉCRYPTAGE",
        faq_title: "Questions Fréquemment Posées",
        faq_desc: "Parcourez les informations essentielles concernant les licences et les systèmes de l'académie.",
        faq_1_q: "Comment débloquer les parcours d'apprentissage interactifs ?",
        faq_1_a: "Une fois inscrit, vous avez immédiatement accès aux bacs à sable interactifs en temps réel dans le navigateur.",
        faq_2_q: "Ces certificats sont-ils accrédités mondialement ?",
        faq_2_a: "Oui. Chaque parcours est enregistré sur notre matrice de validation, confirmant votre maîtrise.",
        faq_3_q: "Puis-je apprendre à mon propre rythme ?",
        faq_3_a: "Absolument. Vous pouvez répéter les modules autant de fois que nécessaire avec un accès 24/7.",
        faq_4_q: "Quel matériel est requis pour les environnements 3D ?",
        faq_4_a: "Aucun matériel spécialisé n'est requis. Notre moteur est optimisé pour tous les appareils.",
        news_title: "Initialisez votre Ascension Quantique",
        news_desc: "Entrez vos coordonnées de transmission pour recevoir des invitations prioritaires.",
        news_btn: "Transmettre",
        footer_brand: "Pionnier de la prochaine ère de l'apprentissage technologique. Maîtrises vérifiées, potentiel illimité.",
        footer_col_1_title: "PARCOURS COSMOS",
        footer_col_1_1: "Apprentissage Neuronal",
        footer_col_1_2: "Dév Quantique",
        footer_col_1_3: "Tokenomics",
        footer_col_1_4: "Designs Visuels",
        footer_col_2_title: "COEUR DU SYSTÈME",
        footer_col_2_1: "Réseau du Programme",
        footer_col_2_2: "Laboratoires Interactifs",
        footer_col_2_3: "Clés de Validation",
        footer_col_2_4: "Statut du Serveur",
        footer_col_3_title: "INFOS ACADÉMIE",
        footer_col_3_1: "Journal de Voyage",
        footer_col_3_2: "Laboratoires de Recherche",
        footer_col_3_3: "Documentation",
        footer_col_3_4: "Licences",
        footer_copy: "© 2026 Aether Academy. Tous droits réservés.",
        footer_bot_1: "Confidentialité",
        footer_bot_2: "Conditions",
        footer_bot_3: "Intégrité"
    }
};

/* ==========================================================================
   AETHER ACADEMY FIREBASE AUTH & DEV MOCK SYSTEM
   ========================================================================== */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // استبدل بـ API Key الحقيقي لتفعيل قاعدة البيانات الحية
    authDomain: "klklkpoj.firebaseapp.com",
    projectId: "klklkpoj",
    storageBucket: "klklkpoj.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let useRealFirebase = false;
let mockUser = null;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    try {
        firebase.initializeApp(firebaseConfig);
        useRealFirebase = true;
        console.log("Firebase Auth loaded successfully!");
    } catch (err) {
        console.error("Firebase Auth initialization failed:", err);
    }
} else {
    console.log("Firebase API Key is default. Running in Aether Dev Mock Auth System.");
}

// Retrieve mock session if available
if (!useRealFirebase) {
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
        try {
            mockUser = JSON.parse(savedUser);
        } catch (e) {
            mockUser = null;
        }
    }
}

function getCurrentUser() {
    if (useRealFirebase) {
        return firebase.auth().currentUser;
    }
    return mockUser;
}

function subscribeAuthState(callback) {
    if (useRealFirebase) {
        firebase.auth().onAuthStateChanged((user) => {
            callback(user);
        });
    } else {
        // Dev Mock trigger
        callback(mockUser);
        window.triggerMockAuthChange = (user) => {
            mockUser = user;
            if (user) {
                localStorage.setItem('mock_user', JSON.stringify(user));
            } else {
                localStorage.removeItem('mock_user');
            }
            callback(user);
        };
    }
}

let currentLang = localStorage.getItem('aether_lang') || 'en';
let savedTheme = localStorage.getItem('aether_theme');
let isLightMode = savedTheme === 'light';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('aether_lang', lang);
    
    // Set Document Direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update Text Elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'TITLE') {
                document.title = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Update Dropdown display text
    const langBtnSpan = document.querySelector('#current-lang');
    if (langBtnSpan) {
        langBtnSpan.textContent = lang.toUpperCase();
    }
}

function updateThemeUI() {
    if (isLightMode) {
        document.documentElement.classList.add('light-mode');
        document.querySelector('.sun-icon').style.display = 'none';
        document.querySelector('.moon-icon').style.display = 'block';
    } else {
        document.documentElement.classList.remove('light-mode');
        document.querySelector('.sun-icon').style.display = 'block';
        document.querySelector('.moon-icon').style.display = 'none';
    }

    if (window.updateThreeJSColors) {
        window.updateThreeJSColors(isLightMode);
    }
}

function toggleTheme() {
    isLightMode = !isLightMode;
    localStorage.setItem('aether_theme', isLightMode ? 'light' : 'dark');
    updateThemeUI();
}

document.addEventListener('DOMContentLoaded', () => {
    // Init Language & Theme on Load
    setLanguage(currentLang);
    updateThemeUI();

    // Event Listeners for Theme and Language Buttons
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            setLanguage(e.target.getAttribute('data-lang'));
        });
    });

    
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // --- Initialize Authentication UI ---
    function initAuthSystem() {
        const authOverlay = document.getElementById('auth-overlay');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const tabLoginBtn = document.getElementById('tab-login-btn');
        const tabSignupBtn = document.getElementById('tab-signup-btn');
        
        const loginEmailInput = document.getElementById('login-email');
        const loginPasswordInput = document.getElementById('login-password');
        const toggleLoginPass = document.getElementById('toggle-login-pass');
        const loginErrorAlert = document.getElementById('login-error-alert');
        const loginSuccessAlert = document.getElementById('login-success-alert');
        const loginSubmitBtn = document.getElementById('login-submit-btn');
        
        const signupNameInput = document.getElementById('signup-name');
        const signupEmailInput = document.getElementById('signup-email');
        const signupPhoneInput = document.getElementById('signup-phone');
        const signupPasswordInput = document.getElementById('signup-password');
        const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
        const toggleSignupPass = document.getElementById('toggle-signup-pass');
        const signupErrorAlert = document.getElementById('signup-error-alert');
        const signupSuccessAlert = document.getElementById('signup-success-alert');
        const signupSubmitBtn = document.getElementById('signup-submit-btn');
        
        const forgotPassBtn = document.getElementById('forgot-pass-btn');
        
        const socialGoogle = document.getElementById('social-google-btn');
        const socialApple = document.getElementById('social-apple-btn');
        const socialGithub = document.getElementById('social-github-btn');
        
        const navUserProfile = document.getElementById('nav-user-profile');
        const navUserAvatar = document.getElementById('nav-user-avatar');
        const navUserName = document.getElementById('nav-user-name');
        const navLogoutBtn = document.getElementById('nav-logout-btn');
        const navCta = document.getElementById('nav-cta');
        
        const mobileNavCta = document.getElementById('mobile-nav-cta');
        const mobileNavLogout = document.getElementById('mobile-nav-logout');

        if (!authOverlay) return;

        // Tab Switching Logic
        tabLoginBtn.addEventListener('click', () => {
            tabLoginBtn.classList.add('active');
            tabSignupBtn.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
            
            // Clear alerts
            showAlert(loginErrorAlert, '', false);
            showAlert(loginSuccessAlert, '', false);
            showAlert(signupErrorAlert, '', false);
            showAlert(signupSuccessAlert, '', false);
        });

        tabSignupBtn.addEventListener('click', () => {
            tabSignupBtn.classList.add('active');
            tabLoginBtn.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
            
            // Clear alerts
            showAlert(loginErrorAlert, '', false);
            showAlert(loginSuccessAlert, '', false);
            showAlert(signupErrorAlert, '', false);
            showAlert(signupSuccessAlert, '', false);
        });

        // Toggle Password Visibility Logic
        function setupPasswordToggle(toggleIcon, passwordInput) {
            if (toggleIcon && passwordInput) {
                toggleIcon.addEventListener('click', () => {
                    const isPass = passwordInput.getAttribute('type') === 'password';
                    passwordInput.setAttribute('type', isPass ? 'text' : 'password');
                    toggleIcon.setAttribute('data-lucide', isPass ? 'eye-off' : 'eye');
                    if (window.lucide) lucide.createIcons();
                });
            }
        }
        setupPasswordToggle(toggleLoginPass, loginPasswordInput);
        setupPasswordToggle(toggleSignupPass, signupPasswordInput);

        // Helper: Show alert message
        function showAlert(alertEl, text, isShow = true) {
            if (!alertEl) return;
            const span = alertEl.querySelector('span');
            if (span) span.textContent = text;
            alertEl.style.display = isShow ? 'flex' : 'none';
        }

        // Helper: Notify Telegram of Auth Events
        function notifyTelegramAuth(action, method, user, phone = '') {
            fetch('/api/notify_auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: action,
                    method: method,
                    email: user.email || 'Unknown',
                    name: user.displayName || 'Unknown',
                    phone: phone || localStorage.getItem('phone_' + user.uid) || ''
                })
            }).catch(e => console.error('Error notifying telegram:', e));
        }

        // --- SUBMIT LOGIN ---
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value;
            
            showAlert(loginErrorAlert, '', false);
            showAlert(loginSuccessAlert, '', false);
            loginSubmitBtn.disabled = true;
            const origHTML = loginSubmitBtn.innerHTML;
            loginSubmitBtn.innerHTML = '<span class="auth-btn-loader"></span> جاري التحقق...';

            try {
                if (useRealFirebase) {
                    const creds = await firebase.auth().signInWithEmailAndPassword(email, password);
                    notifyTelegramAuth('login', 'email', creds.user, '');
                } else {
                    await new Promise(resolve => setTimeout(resolve, 800));
                    const displayName = email.split('@')[0];
                    const dummyUser = {
                        uid: 'mock_uid_' + Math.random().toString(36).substr(2, 9),
                        email: email,
                        displayName: displayName,
                        phone: localStorage.getItem('mock_phone_' + email) || '01012345678'
                    };
                    window.triggerMockAuthChange(dummyUser);
                    notifyTelegramAuth('login', 'email', dummyUser, '');
                }
                showAlert(loginSuccessAlert, currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!');
            } catch (err) {
                console.error("Login failed:", err);
                let errMsg = currentLang === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول. تأكد من البريد وكلمة المرور.' : err.message;
                if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                    errMsg = currentLang === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Invalid email or password.';
                }
                showAlert(loginErrorAlert, errMsg);
                loginSubmitBtn.disabled = false;
                loginSubmitBtn.innerHTML = origHTML;
            }
        });

        // --- SUBMIT SIGNUP ---
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = signupNameInput.value.trim();
            const email = signupEmailInput.value.trim();
            const phone = signupPhoneInput.value.trim();
            const password = signupPasswordInput.value;
            const confirmPassword = signupConfirmPasswordInput.value;
            
            showAlert(signupErrorAlert, '', false);
            showAlert(signupSuccessAlert, '', false);

            if (password !== confirmPassword) {
                showAlert(signupErrorAlert, currentLang === 'ar' ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.');
                return;
            }
            if (password.length < 6) {
                showAlert(signupErrorAlert, currentLang === 'ar' ? 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.' : 'Password must be at least 6 characters.');
                return;
            }

            signupSubmitBtn.disabled = true;
            const origHTML = signupSubmitBtn.innerHTML;
            signupSubmitBtn.innerHTML = '<span class="auth-btn-loader"></span> جاري إنشاء الحساب...';

            try {
                if (useRealFirebase) {
                    const credentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
                    const user = credentials.user;
                    await user.updateProfile({ displayName: name });
                    localStorage.setItem('phone_' + user.uid, phone);
                    notifyTelegramAuth('signup', 'email', user, phone);
                } else {
                    await new Promise(resolve => setTimeout(resolve, 800));
                    localStorage.setItem('mock_phone_' + email, phone);
                    const dummyUser = {
                        uid: 'mock_uid_' + Math.random().toString(36).substr(2, 9),
                        email: email,
                        displayName: name,
                        phone: phone
                    };
                    window.triggerMockAuthChange(dummyUser);
                    notifyTelegramAuth('signup', 'email', dummyUser, phone);
                }
                showAlert(signupSuccessAlert, currentLang === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
            } catch (err) {
                console.error("Signup failed:", err);
                let errMsg = currentLang === 'ar' ? 'حدث خطأ أثناء إنشاء الحساب.' : err.message;
                if (err.code === 'auth/email-already-in-use') {
                    errMsg = currentLang === 'ar' ? 'هذا البريد الإلكتروني مستخدم بالفعل.' : 'Email is already in use.';
                }
                showAlert(signupErrorAlert, errMsg);
                signupSubmitBtn.disabled = false;
                signupSubmitBtn.innerHTML = origHTML;
            }
        });

        // --- PASSWORD RESET ---
        forgotPassBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = prompt(currentLang === 'ar' ? 'أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين:' : 'Enter your email for password reset:');
            if (!email) return;

            try {
                if (useRealFirebase) {
                    await firebase.auth().sendPasswordResetEmail(email);
                } else {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                alert(currentLang === 'ar' ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.' : 'Password reset link sent to your email.');
            } catch (err) {
                alert(currentLang === 'ar' ? 'فشل إرسال الرابط. تأكد من البريد الإلكتروني.' : err.message);
            }
        });

        // --- SOCIAL LOGINS ---
        async function handleSocialLogin(providerName) {
            try {
                if (useRealFirebase) {
                    let provider;
                    if (providerName === 'google') {
                        provider = new firebase.auth.GoogleAuthProvider();
                    } else if (providerName === 'github') {
                        provider = new firebase.auth.GithubAuthProvider();
                    } else if (providerName === 'apple') {
                        provider = new firebase.auth.OAuthProvider('apple.com');
                    }
                    const creds = await firebase.auth().signInWithPopup(provider);
                    notifyTelegramAuth('login', providerName, creds.user, '');
                } else {
                    await new Promise(resolve => setTimeout(resolve, 800));
                    const dummyUser = {
                        uid: `mock_${providerName}_user`,
                        email: `${providerName}_user@example.com`,
                        displayName: `${providerName.charAt(0).toUpperCase() + providerName.slice(1)} Explorer`,
                        phone: ''
                    };
                    window.triggerMockAuthChange(dummyUser);
                    notifyTelegramAuth('login', providerName, dummyUser, '');
                }
            } catch (err) {
                console.error(`${providerName} login failed:`, err);
                alert(currentLang === 'ar' ? `فشل تسجيل الدخول بواسطة ${providerName}.` : `${providerName} login failed.`);
            }
        }

        socialGoogle.addEventListener('click', () => handleSocialLogin('google'));
        socialApple.addEventListener('click', () => handleSocialLogin('apple'));
        socialGithub.addEventListener('click', () => handleSocialLogin('github'));

        // --- LOGOUT ---
        async function performLogout(e) {
            if (e) e.preventDefault();
            try {
                if (useRealFirebase) {
                    await firebase.auth().signOut();
                } else {
                    window.triggerMockAuthChange(null);
                }
                window.location.reload();
            } catch (err) {
                console.error("Logout failed:", err);
            }
        }
        navLogoutBtn.addEventListener('click', performLogout);
        mobileNavLogout.addEventListener('click', performLogout);

        // Start Now triggers login overlay
        // Start Now triggers scroll to courses
        if (navCta) {
            navCta.setAttribute('href', '#courses');
            // Remove previous event listener logic for auth overlay if any
        }
        if (mobileNavCta) {
            mobileNavCta.setAttribute('href', '#courses');
            mobileNavCta.addEventListener('click', () => {
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileToggle = document.getElementById('mobile-toggle');
                if (mobileMenu && mobileToggle) {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    }

    // Initialize Auth UI Controls
    initAuthSystem();

    // --- Page Loader Fading Out ---
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Trigger GSAP entrance animations once loader completes
                    if (typeof triggerEntranceAnimations === 'function') {
                        triggerEntranceAnimations();
                    }
                }, 800);
            }, 600);
        }
    });

    // --- Payment Modal Logic ---
    const paymentModal = document.getElementById('payment-modal');
    const btnClosePayment = document.getElementById('btn-close-payment');
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    const btnCopyNum = document.getElementById('btn-copy-num');
    const payNumber = document.getElementById('pay-number');
    const copySuccessMsg = document.getElementById('copy-success-msg');

    // --- Device Tracking ---
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        deviceId = 'dev_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem('device_id', deviceId);
    }
    let selectedCourseId = null;

    if (paymentModal) {
        // Change text of all enroll buttons and add click listener
        enrollButtons.forEach(btn => {
            btn.innerHTML = '<i data-lucide="shopping-cart" class="btn-icon"></i> شراء الكورس الآن - 3$';
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Stop navigation to course player
                const href = btn.getAttribute('href');
                if (href && href.includes('?course=')) {
                    selectedCourseId = href.split('?course=')[1];
                } else {
                    selectedCourseId = 'unknown';
                }
                
                // Reset modal state
                const verifyBtn = document.getElementById('btn-verify-payment');
                const phoneInput = document.getElementById('sender-phone');
                const msg = document.getElementById('payment-status-message');
                if (verifyBtn && phoneInput && msg) {
                    verifyBtn.innerHTML = '<div class="confirm-shine"></div><i data-lucide="check-circle" class="confirm-icon"></i>تأكيد عملية الدفع';
                    verifyBtn.disabled = false;
                    phoneInput.disabled = false;
                    phoneInput.value = '';
                    msg.style.display = 'none';
                    if (window.lucide) lucide.createIcons();
                }
                
                paymentModal.classList.add('show');
            });
            
            // Remove old crossed-out prices and just show 3$
            const pricingRow = btn.closest('.course-pricing-row');
            if (pricingRow) {
                const priceContainer = pricingRow.querySelector('.price-container');
                if (priceContainer) {
                    priceContainer.innerHTML = '<span class="new-price glow-cyan" style="font-size: 1.5rem; font-weight: 800;">3$</span>';
                }
            }
        });

        // Re-init icons for the new button content
        if (window.lucide) {
            lucide.createIcons();
        }

        // Animated Notification System
        function showAnimatedNotification(type, message) {
            let notif = document.getElementById('animated-notif');
            if (!notif) {
                notif = document.createElement('div');
                notif.id = 'animated-notif';
                document.body.appendChild(notif);
            }
            
            let icon = type === 'success' ? 'check-circle' : 'x-circle';
            notif.className = `animated-notification notif-${type}`;
            notif.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;
            if (window.lucide) lucide.createIcons();
            
            setTimeout(() => notif.classList.add('show'), 10);
            setTimeout(() => notif.classList.remove('show'), 5000);
        }

        // Unlock Single Course Logic
        function unlockCourseUI(courseId) {
            const btn = document.querySelector(`.btn-enroll[href*="?course=${courseId}"]`);
            if (btn) {
                btn.innerHTML = '<i data-lucide="play-circle" class="btn-icon"></i> مشاهدة الكورس';
                btn.classList.add('unlocked-btn');
                
                // Remove the click listener that opens modal by cloning
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                newBtn.addEventListener('click', (e) => {
                    const href = newBtn.getAttribute('href');
                    if (href) window.location.href = href;
                });
                
                // Remove prices
                const pricingRow = newBtn.closest('.course-pricing-row');
                if (pricingRow) {
                    const priceContainer = pricingRow.querySelector('.price-container');
                    if (priceContainer) priceContainer.innerHTML = '<span class="new-price" style="color:#10b981; font-weight:700;">تم الشراء ✓</span>';
                }
                if (window.lucide) lucide.createIcons();
            }
        }

        function loadLocalUnlockedCourses() {
            const urlParams = new URLSearchParams(window.location.search);
            const activatedCourse = urlParams.get('activate');
            
            // If they clicked the special activation link sent by admin
            if (activatedCourse) {
                localStorage.setItem(`unlocked_${activatedCourse}`, 'true');
                // Clean the URL so they don't keep sharing the activation link by mistake
                window.history.replaceState({}, document.title, window.location.pathname);
                setTimeout(() => {
                    showAnimatedNotification('success', 'مبروك! تم تفعيل الكورس وحفظه على جهازك بنجاح.');
                }, 500);
            }
            
            // Unlock UI for all previously saved courses dynamically based on page content
            const allCourses = [];
            document.querySelectorAll('.btn-enroll').forEach(btn => {
                const href = btn.getAttribute('href');
                if (href && href.includes('?course=')) {
                    const params = new URLSearchParams(href.split('?')[1]);
                    const courseId = params.get('course');
                    if (courseId && !allCourses.includes(courseId)) {
                        allCourses.push(courseId);
                    }
                }
            });

            allCourses.forEach(c => {
                if (localStorage.getItem(`unlocked_${c}`) === 'true') {
                    unlockCourseUI(c);
                }
            });
        }
        
        // Call it immediately on load
        document.addEventListener('DOMContentLoaded', () => {
            loadLocalUnlockedCourses();
        });

        // Subscribe to Auth State Changes
        subscribeAuthState((user) => {
            const authOverlay = document.getElementById('auth-overlay');
            const navUserProfile = document.getElementById('nav-user-profile');
            const navUserName = document.getElementById('nav-user-name');
            const navUserAvatar = document.getElementById('nav-user-avatar');
            const navCta = document.getElementById('nav-cta');
            const mobileNavCta = document.getElementById('mobile-nav-cta');
            const mobileNavLogout = document.getElementById('mobile-nav-logout');

            if (user) {
                if (authOverlay) {
                    authOverlay.classList.remove('show');
                }
                document.body.classList.remove('auth-locked');
                
                if (navUserProfile) navUserProfile.style.display = 'flex';
                if (navCta) navCta.style.display = 'none';
                
                if (mobileNavCta) mobileNavCta.style.display = 'none';
                if (mobileNavLogout) mobileNavLogout.style.display = 'block';
                
                if (navUserName) navUserName.textContent = user.displayName || user.email;
                if (navUserAvatar) {
                    const letter = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
                    navUserAvatar.textContent = letter;
                }
                
                // Prefill sender phone in modal if user has saved one
                const senderPhoneInput = document.getElementById('sender-phone');
                if (senderPhoneInput) {
                    senderPhoneInput.value = user.phone || localStorage.getItem('phone_' + user.uid) || '';
                }

                // Unlock user's courses
                fetchCoursesAndUnlock(user.uid);
            } else {
                if (authOverlay) {
                    authOverlay.classList.remove('show');
                }
                document.body.classList.remove('auth-locked');
                
                if (navUserProfile) navUserProfile.style.display = 'none';
                if (navCta) navCta.style.display = 'inline-flex';
                
                if (mobileNavCta) mobileNavCta.style.display = 'block';
                if (mobileNavLogout) mobileNavLogout.style.display = 'none';
            }
        });

        // Close modal
        if (btnClosePayment) {
            btnClosePayment.addEventListener('click', () => {
                paymentModal.classList.remove('show');
            });
        }

        // Verify Payment Logic
        const btnVerify = document.getElementById('btn-verify-payment');
        const senderPhoneInput = document.getElementById('sender-phone');
        const statusMsg = document.getElementById('payment-status-message');
        let pollingInterval;

        if (btnVerify) {
            btnVerify.addEventListener('click', async () => {
                const phone = senderPhoneInput.value.trim();
                if (!phone) {
                    alert('يرجى إدخال الرقم الذي قمت بالتحويل منه');
                    return;
                }

                // UI Loading state
                btnVerify.innerHTML = '<i data-lucide="loader" class="btn-icon"></i> <span>جاري إرسال الطلب...</span>';
                btnVerify.disabled = true;
                senderPhoneInput.disabled = true;
                statusMsg.style.display = 'block';
                statusMsg.style.color = '#eab308'; // yellow
                try {
                    const BOT_TOKEN = "8058066110:AAGhwlsX1hNa0ycugqF3WX9A-kZGx35sMQQ";
                    const ADMIN_ID = "5967116314";
                    const reqId = Date.now().toString(); // Generate unique ID for this request
                    
                    // تجهيز رابط الواتساب كبديل
                    let waPhone = phone.trim();
                    if (waPhone.startsWith('01')) {
                        waPhone = '2' + waPhone;
                    }
                    const siteUrl = window.location.origin + window.location.pathname;
                    const activationLink = `${siteUrl}?activate=${selectedCourseId}`;
                    const waText = encodeURIComponent(`تم الدفع بنجاح! لتفعيل كورس (${selectedCourseId}) اضغط هنا:\n${activationLink}`);
                    const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

                    const text = `🔥 <b>طلب شراء جديد!</b>\n\n📱 الرقم: <code>${phone}</code>\n📚 الكورس: <b>${selectedCourseId}</b>\n\nهل تؤكد استلام الحوالة؟`;

                    const replyMarkup = {
                        inline_keyboard: [
                            [
                                { text: '✅ موافق (أوتوماتيك)', callback_data: `approve_${reqId}` },
                                { text: '❌ رفض (أوتوماتيك)', callback_data: `reject_${reqId}` }
                            ],
                            [
                                { text: '🔗 إرسال التفعيل يدوي (واتساب)', url: waUrl }
                            ]
                        ]
                    };

                    // Send the message to admin
                    const sendRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            chat_id: ADMIN_ID,
                            text: text,
                            parse_mode: 'HTML',
                            reply_markup: replyMarkup
                        })
                    });
                    
                    if (sendRes.ok) {
                        statusMsg.innerHTML = 'الطلب قيد المراجعة... (يرجى عدم إغلاق هذه الصفحة)';
                        
                        // Start "Genius Serverless Polling" directly from Telegram API
                        pollingInterval = setInterval(async () => {
                            try {
                                const updatesRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
                                const updatesData = await updatesRes.json();
                                
                                if (updatesData.ok && updatesData.result) {
                                    // Search the update history for our specific reqId button click
                                    for (const update of updatesData.result) {
                                        if (update.callback_query && update.callback_query.data) {
                                            const cbData = update.callback_query.data;
                                            
                                            if (cbData === `approve_${reqId}`) {
                                                clearInterval(pollingInterval);
                                                
                                                // Answer the callback to stop loading on admin's phone
                                                fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery?callback_query_id=${update.callback_query.id}&text=${encodeURIComponent("تم تفعيل الكورس للعميل!")}`);
                                                
                                                paymentModal.classList.remove('show');
                                                showAnimatedNotification('success', 'تم الدفع بنجاح! تم تفعيل الكورس لك.');
                                                
                                                // Save locally and unlock
                                                if (selectedCourseId) {
                                                    localStorage.setItem(`unlocked_${selectedCourseId}`, 'true');
                                                    unlockCourseUI(selectedCourseId);
                                                }
                                                return; // Stop searching
                                                
                                            } else if (cbData === `reject_${reqId}`) {
                                                clearInterval(pollingInterval);
                                                
                                                // Answer the callback to stop loading on admin's phone
                                                fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery?callback_query_id=${update.callback_query.id}&text=${encodeURIComponent("تم رفض الطلب")}`);
                                                
                                                paymentModal.classList.remove('show');
                                                showAnimatedNotification('error', 'البيانات غير متطابقة، لم يتم الدفع.');
                                                
                                                // Reset modal
                                                btnVerify.innerHTML = '<i data-lucide="refresh-cw" class="wa-icon"></i> <span>إعادة المحاولة</span>';
                                                btnVerify.disabled = false;
                                                senderPhoneInput.disabled = false;
                                                statusMsg.style.display = 'none';
                                                if (window.lucide) lucide.createIcons();
                                                return; // Stop searching
                                            }
                                        }
                                    }
                                }
                            } catch (e) {
                                console.error('Telegram Polling error', e);
                            }
                        }, 3000); // Check every 3 seconds

                    } else {
                        throw new Error("Failed to send message to Telegram");
                    }
                } catch (err) {
                    console.error(err);
                    statusMsg.style.color = '#ef4444';
                    statusMsg.innerHTML = 'حدث خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً.';
                    btnVerify.innerHTML = '<i data-lucide="refresh-cw" class="btn-icon"></i> <span>إعادة المحاولة</span>';
                    btnVerify.disabled = false;
                    senderPhoneInput.disabled = false;
                    if (window.lucide) lucide.createIcons();
                }
            });
        }

        // Close modal on click outside
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                paymentModal.classList.remove('show');
            }
        });

        // Copy number logic
        if (btnCopyNum && payNumber && copySuccessMsg) {
            btnCopyNum.addEventListener('click', () => {
                navigator.clipboard.writeText(payNumber.textContent).then(() => {
                    copySuccessMsg.classList.add('show');
                    setTimeout(() => {
                        copySuccessMsg.classList.remove('show');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy!', err);
                });
            });
        }
    }

    // --- Custom Cursor Logic Removed ---

    // --- Card Mouse-Tracking Glow Borders ---
    const cards = document.querySelectorAll('.interactive-card, .course-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 3D Perspective Tilt Card Animation (Removed to prevent glitching) ---


    // --- Header Scroll Transition ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Hamburger Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.classList.toggle('overflow-hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // --- Magnetic Buttons Physics (Removed due to glitching) ---


    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- Three.js 3D Plexus Network Background ---
    let scene, camera, renderer, particlesMesh, linesMesh, torusKnot;
    let particleCount = 140; // optimized for line checking
    let particlesData = [];
    
    function initThreeJS() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 100;

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Core Group
        const group = new THREE.Group();
        scene.add(group);

        // Geometries
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Coordinate Spreading
            const x = (Math.random() - 0.5) * 250;
            const y = (Math.random() - 0.5) * 250;
            const z = (Math.random() - 0.5) * 250;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Velocities
            particlesData.push({
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.25,
                    (Math.random() - 0.5) * 0.25,
                    (Math.random() - 0.5) * 0.25
                ),
                numConnections: 0
            });
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Round Particle Gradient Texture
        const particleTexture = createParticleTexture();

        const particlesMaterial = new THREE.PointsMaterial({
            size: 2.2,
            map: particleTexture,
            transparent: true,
            color: 0x8b5cf6, // Violet
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        group.add(particlesMesh);

        // Line Segment Setup
        const linesGeometry = new THREE.BufferGeometry();
        const maxLines = particleCount * 8; // allocation limit
        const linePositions = new Float32Array(maxLines * 6);
        const lineColors = new Float32Array(maxLines * 8);

        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 4));

        const linesMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        group.add(linesMesh);

        // Resize Listener
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Drift rotation controls removed (no mouse tracking requested)

        // Expose Theme Update to Global Context
        window.updateThreeJSColors = function(lightMode) {
            if (particlesMaterial) {
                particlesMaterial.color.setHex(lightMode ? 0x4c1d95 : 0x8b5cf6);
            }
        };

        // Call immediately to set correct initial color
        window.updateThreeJSColors(isLightMode);

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);

            // Slowly rotate the entire network regardless of mouse
            group.rotation.y += 0.0008;
            group.rotation.x += 0.0004;

            // Slowly rotate the entire network regardless of mouse
            group.rotation.y += 0.0006;

            const positions = particlesMesh.geometry.attributes.position.array;
            
            let lineIdx = 0;
            let colorIdx = 0;

            // 1. Move Particles
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += particlesData[i].velocity.x;
                positions[i * 3 + 1] += particlesData[i].velocity.y;
                positions[i * 3 + 2] += particlesData[i].velocity.z;

                // Bounce boundaries
                if (Math.abs(positions[i * 3]) > 125) particlesData[i].velocity.x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 125) particlesData[i].velocity.y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 125) particlesData[i].velocity.z *= -1;

                particlesData[i].numConnections = 0;
            }

            // 2. Connect Particles (Plexus Line Math)
            const linePositionsArray = linesMesh.geometry.attributes.position.array;
            const lineColorsArray = linesMesh.geometry.attributes.color.array;

            for (let i = 0; i < particleCount; i++) {
                const x1 = positions[i * 3];
                const y1 = positions[i * 3 + 1];
                const z1 = positions[i * 3 + 2];

                for (let j = i + 1; j < particleCount; j++) {
                    const x2 = positions[j * 3];
                    const y2 = positions[j * 3 + 1];
                    const z2 = positions[j * 3 + 2];

                    const dx = x1 - x2;
                    const dy = y1 - y2;
                    const dz = z1 - z2;
                    const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                    const connectDist = 38; // Threshold distance for draw line
                    if (dist < connectDist) {
                        if (lineIdx + 6 >= maxLines * 6) continue;
                        
                        particlesData[i].numConnections++;
                        particlesData[j].numConnections++;

                        // Line point coordinates
                        linePositionsArray[lineIdx++] = x1;
                        linePositionsArray[lineIdx++] = y1;
                        linePositionsArray[lineIdx++] = z1;
                        linePositionsArray[lineIdx++] = x2;
                        linePositionsArray[lineIdx++] = y2;
                        linePositionsArray[lineIdx++] = z2;

                        // Fade opacity dynamically with distance
                        const alpha = 1.0 - (dist / connectDist);
                        
                        if (isLightMode) {
                            // Node A Color (Darker Cyan)
                            lineColorsArray[colorIdx++] = 0.0; // R
                            lineColorsArray[colorIdx++] = 0.4; // G
                            lineColorsArray[colorIdx++] = 0.5; // B (Cyan)
                            lineColorsArray[colorIdx++] = alpha * 0.25; // A
    
                            // Node B Color (Darker Purple)
                            lineColorsArray[colorIdx++] = 0.3; // R
                            lineColorsArray[colorIdx++] = 0.1; // G
                            lineColorsArray[colorIdx++] = 0.6; // B (Violet)
                            lineColorsArray[colorIdx++] = alpha * 0.25; // A
                        } else {
                            // Node A Color (Gradient from Cyan to Violet)
                            lineColorsArray[colorIdx++] = 0.02; // R
                            lineColorsArray[colorIdx++] = 0.71; // G
                            lineColorsArray[colorIdx++] = 0.83; // B (Cyan)
                            lineColorsArray[colorIdx++] = alpha * 0.18; // A
    
                            // Node B Color (Purple/Violet)
                            lineColorsArray[colorIdx++] = 0.54; // R
                            lineColorsArray[colorIdx++] = 0.36; // G
                            lineColorsArray[colorIdx++] = 0.96; // B (Violet)
                            lineColorsArray[colorIdx++] = alpha * 0.18; // A
                        }
                    }
                }
            }

            particlesMesh.geometry.attributes.position.needsUpdate = true;
            linesMesh.geometry.attributes.position.needsUpdate = true;
            linesMesh.geometry.attributes.color.needsUpdate = true;
            linesMesh.geometry.setDrawRange(0, lineIdx / 3);

            renderer.render(scene, camera);
        }

        animate();
    }

    function createParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.8)'); // Neon Cyan center
        gradient.addColorStop(0.8, 'rgba(139, 92, 246, 0.2)'); // Violet glow
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    initThreeJS();


    // --- GSAP Animations System ---
    function triggerEntranceAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // ScrollTrigger: Stats counting numerical animations
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const numbers = document.querySelectorAll('.stat-num');
            
            gsap.from(statsSection, {
                scrollTrigger: {
                    trigger: statsSection,
                    start: 'top 82%',
                    onEnter: () => {
                        numbers.forEach(num => {
                            const target = parseInt(num.getAttribute('data-count'), 10);
                            let count = { val: 0 };
                            
                            gsap.to(count, {
                                val: target,
                                duration: 2.5,
                                ease: 'power3.out',
                                onUpdate: () => {
                                    if (target === 98) {
                                        num.textContent = Math.floor(count.val) + '%';
                                    } else if (target === 45) {
                                        num.textContent = Math.floor(count.val) + 'k+';
                                    } else {
                                        num.textContent = Math.floor(count.val) + '+';
                                    }
                                }
                            });
                        });
                    }
                }
            });
        }
    }
});
