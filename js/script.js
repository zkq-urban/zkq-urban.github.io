// 语言切换功能
let currentLanguage = localStorage.getItem('language') || 'zh';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // 更新所有有 data-en 和 data-zh 属性的元素
    document.querySelectorAll('[data-en][data-zh]').forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-zh');
        }
    });
    
    // 更新语言按钮
    const langBtn = document.getElementById('langToggle');
    if (lang === 'en') {
        langBtn.textContent = '中文';
        document.documentElement.lang = 'en';
    } else {
        langBtn.textContent = 'English';
        document.documentElement.lang = 'zh-CN';
    }
}

// 页面加载时设置语言
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLanguage);
});

// 语言切换按钮事件监听
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', function() {
        const newLang = currentLanguage === 'en' ? 'zh' : 'en';
        setLanguage(newLang);
    });
}

// 移动端导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// 添加滚动效果 - 当元素进入视窗时添加动画
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .publication, .project-card, .research-item, .skill-category');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 为动画元素添加初始样式
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const publications = document.querySelectorAll('.publication');
    const projectCards = document.querySelectorAll('.project-card');
    const researchItems = document.querySelectorAll('.research-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    const allAnimatedElements = [
        ...timelineItems,
        ...publications,
        ...projectCards,
        ...researchItems,
        ...skillCategories
    ];
    
    allAnimatedElements.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// 添加导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// 添加回到顶部按钮功能
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.id = 'backToTop';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3498db;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', addBackToTopButton);