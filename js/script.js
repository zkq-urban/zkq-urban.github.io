// 语言切换功能 v1.2 - 修复 HTML 标签渲染问题
let currentLanguage = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // 更新所有有 data-en 和 data-zh 属性的元素
    document.querySelectorAll('[data-en][data-zh]').forEach(element => {
        const content = lang === 'en' 
            ? element.getAttribute('data-en') 
            : element.getAttribute('data-zh');
        
        // 强制使用 innerHTML 以解析 <br> 等标签
        element.innerHTML = content;
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

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        themeBtn.title = 'Switch to Dark Mode';
    } else {
        body.classList.remove('light-mode');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        themeBtn.title = 'Switch to Light Mode';
    }
}

// 页面加载时设置语言和主题
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLanguage);
    setTheme(currentTheme);
    
    // 语言切换按钮事件监听
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLang = currentLanguage === 'en' ? 'zh' : 'en';
            setLanguage(newLang);
        });
    }
    
    // 主题切换按钮事件监听
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});