// Navegação entre páginas
const headerTitle = document.getElementById('header-title');
const navSobreNos = document.getElementById('nav-sobre-nos');
const navSobreProjeto = document.getElementById('nav-sobre-projeto');
const navContato = document.getElementById('nav-contato');
const navToggle = document.getElementById('nav-toggle');
const navElement = document.querySelector('nav');
const sobreNosSection = document.getElementById('sobre-nos');
const sobreProjetoSection = document.getElementById('sobre-projeto');
const contatoSection = document.getElementById('contato');
const homepageSections = document.querySelectorAll('.homepage-section');
const footer = document.getElementById('page-footer');

// Função para mostrar a homepage
function showHomepage() {
    homepageSections.forEach(section => {
        section.classList.remove('hide');
    });
sobreNosSection.classList.remove('show');
sobreProjetoSection.classList.remove('show');
contatoSection.classList.remove('show');
window.scrollTo({top: 0, behavior: 'smooth' });
}

// Função para mostrar a seção "Sobre Nós"
function showSobreNos() {
    homepageSections.forEach(section => {
        section.classList.add('hide');
    });
sobreNosSection.classList.add('show');
sobreProjetoSection.classList.remove('show');
contatoSection.classList.remove('show');
window.scrollTo({top: 0, behavior: 'smooth' });

// Animar os cards quando aparecer
setTimeout(() => {
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card, index) => {
    setTimeout(() => {
        card.classList.add('visible');
    }, index * 200);
    });
}, 100);
}

// Função para mostrar a seção "Sobre o Projeto"
function showSobreProjeto() {
    homepageSections.forEach(section => {
        section.classList.add('hide');
    });
sobreNosSection.classList.remove('show');
sobreProjetoSection.classList.add('show');
contatoSection.classList.remove('show');
window.scrollTo({top: 0, behavior: 'smooth' });

// Animar o conteúdo quando aparecer
setTimeout(() => {
    const projetoTexts = document.querySelectorAll('.projeto-text');
    projetoTexts.forEach(text => {
    text.classList.add('visible');
    });
}, 100);
}

// Função para mostrar a seção "Contato"
function showContato() {
    homepageSections.forEach(section => {
        section.classList.add('hide');
    });
sobreNosSection.classList.remove('show');
sobreProjetoSection.classList.remove('show');
contatoSection.classList.add('show');
window.scrollTo({top: 0, behavior: 'smooth' });

// Animar os cards de contato quando aparecer
setTimeout(() => {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
    setTimeout(() => {
        card.classList.add('visible');
    }, index * 200);
    });
}, 100);
}

// Event listeners
headerTitle.addEventListener('click', (e) => {
    e.preventDefault();
showHomepage();
});

navSobreNos.addEventListener('click', (e) => {
    e.preventDefault();
showSobreNos();
// fechar menu mobile após clique
if (navElement && navElement.classList.contains('mobile-hidden')) navElement.classList.remove('mobile-hidden');
});

navSobreProjeto.addEventListener('click', (e) => {
    e.preventDefault();
showSobreProjeto();
if (navElement && navElement.classList.contains('mobile-hidden')) navElement.classList.remove('mobile-hidden');
});

navContato.addEventListener('click', (e) => {
    e.preventDefault();
showContato();
if (navElement && navElement.classList.contains('mobile-hidden')) navElement.classList.remove('mobile-hidden');
});

// Toggle do menu mobile (abre/fecha)
if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (!navElement) return;
        // alterna classe que faz o nav aparecer no mobile
        if (navElement.classList.contains('mobile-hidden')) {
            navElement.classList.remove('mobile-hidden');
            navToggle.setAttribute('aria-expanded', 'true');
        } else {
            navElement.classList.add('mobile-hidden');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// PDF viewer uses default fragment in iframe src; no JS controls (CSS-only customization)

// Tradução: sistema simples baseado em divs/spans com atributo data-lang
const langToggleBtn = document.getElementById('lang-toggle-btn');
const SAVED_LANG_KEY = 'site-lang';

const langLabel = document.getElementById('lang-label');
function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        if (el.dataset.lang === lang) el.classList.add('visible-lang'); else el.classList.remove('visible-lang');
    });
// atualizar atributo lang do documento
document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';
localStorage.setItem(SAVED_LANG_KEY, lang);
if (langToggleBtn) {
    // atualizar apenas o rótulo interno, preservando o ícone
    if (langLabel) langLabel.textContent = (lang === 'pt') ? 'EN' : 'PT';
langToggleBtn.setAttribute('aria-pressed', (lang === 'en').toString());
}

    // Ajustar link do banner (href + title) quando existir
    const bannerLink = document.getElementById('banner-download');
    if (bannerLink) {
        const hrefPt = bannerLink.dataset.hrefPt;
        const hrefEn = bannerLink.dataset.hrefEn;
        if (lang === 'pt' && hrefPt) bannerLink.href = hrefPt;
        if (lang === 'en' && hrefEn) bannerLink.href = hrefEn;
        // atualizar title acessível
        bannerLink.title = (lang === 'pt') ? 'Baixar banner' : 'Download banner';
    }
}

// inicializar idioma (favor usar localStorage se disponível)
const initialLang = localStorage.getItem(SAVED_LANG_KEY) || 'pt';
setLang(initialLang);

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const current = localStorage.getItem(SAVED_LANG_KEY) || 'pt';
        const next = (current === 'pt') ? 'en' : 'pt';
        setLang(next);
    });
}

// Observadores para animações
const contents = document.querySelectorAll('.content');
const profileCards = document.querySelectorAll('.profile-card');
const projetoTexts = document.querySelectorAll('.projeto-text');
const contactCards = document.querySelectorAll('.contact-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

contents.forEach(content => {
    observer.observe(content);
});

// Observar cards de perfil apenas quando a seção estiver visível
const profileObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && sobreNosSection.classList.contains('show')) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

profileCards.forEach(card => {
    profileObserver.observe(card);
});

// Observar textos do projeto apenas quando a seção estiver visível
const projetoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && sobreProjetoSection.classList.contains('show')) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

projetoTexts.forEach(text => {
    projetoObserver.observe(text);
});

// Observar cards de contato apenas quando a seção estiver visível
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && contatoSection.classList.contains('show')) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

contactCards.forEach(card => {
    contactObserver.observe(card);
});

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.remove('hidden');
        }
    });
}, {
    threshold: 0.1
});

// Observar a última seção da homepage para mostrar o rodapé
const lastHomepageSection = document.querySelector('#ano2080');
if (lastHomepageSection) {
    footerObserver.observe(lastHomepageSection);
}

// --- Auto-hide header on scroll (hide when scrolling down, show when scrolling up) ---
(function() {
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
let ticking = false;
const headerEl = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
if (!ticking) {
    window.requestAnimationFrame(() => {
        // se moveu pra baixo e já passou um limiar, esconder
        if (currentY > lastScrollY + 10 && currentY > 100) {
            headerEl.classList.add('header-hidden');
        } else if (currentY < lastScrollY - 10) {
            // se moveu pra cima, mostrar
            headerEl.classList.remove('header-hidden');
        }
        lastScrollY = currentY <= 0 ? 0 : currentY;
        ticking = false;
    });
ticking = true;
    }
}, {passive: true });
})();

// Botão voltar ao topo no rodapé
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Ajusta padding-top do documento com base na altura real do header
(function adjustHeaderPadding() {
const headerEl = document.querySelector('header');
function update() {
    if (!headerEl) return;
const h = headerEl.offsetHeight;
document.documentElement.style.setProperty('--header-height', h + 'px');
}
// atualizar agora e ao redimensionar
update();
window.addEventListener('resize', update, {passive: true });
// também observe mudanças no header (por exemplo ao abrir menu mobile)
const ro = new ResizeObserver(update);
ro.observe(headerEl);
})();