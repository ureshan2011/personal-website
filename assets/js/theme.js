(function(){
    const themeLink = document.getElementById('theme-link');
    const toggles = document.querySelectorAll('.theme-toggle');
    if(!themeLink) return;
    function setTheme(theme){
        themeLink.setAttribute('href','assets/css/'+theme+'.css');
        localStorage.setItem('theme',theme);
        toggles.forEach(btn=>btn.textContent = theme === 'dark' ? '☀️' : '🌙');
    }
    const saved = localStorage.getItem('theme') || 'color';
    setTheme(saved);
    toggles.forEach(btn=>btn.addEventListener('click',()=>{
        const current = localStorage.getItem('theme') || 'color';
        const next = current === 'dark' ? 'color' : 'dark';
        setTheme(next);
    }));
})();
