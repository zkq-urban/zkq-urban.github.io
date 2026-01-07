// 语言切换功能
let currentLanguage = localStorage.getItem('language') || 'zh';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // 更新所有有 data-en 和 data-zh 属性的元素
    document.querySelectorAll('[data-en][data-zh]').forEach(element => {
        if (lang === 'en') {
            element.innerHTML = element.getAttribute('data-en');
        } else {
            element.innerHTML = element.getAttribute('data-zh');
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
    
    // 语言切换按钮事件监听
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLang = currentLanguage === 'en' ? 'zh' : 'en';
            setLanguage(newLang);
        });
    }
});