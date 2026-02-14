// CONTADOR DE DÍAS
function initCounter() {
    // Cambia esta fecha a cuando se conocieron
    const startDate = new Date('2023-11-04');
    const today = new Date();
    
    const timeDiff = today - startDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    const counterEl = document.getElementById('counter');
    const counterTextEl = document.getElementById('counterText');
    
    if (counterEl) counterEl.textContent = daysDiff;
    
    const months = Math.floor(daysDiff / 30);
    const years = Math.floor(daysDiff / 365);
    
    let text = '';
    if (years > 0) {
        text = years + ' año' + (years > 1 ? 's' : '') + ' y ' + (months % 12) + ' meses';
    } else if (months > 0) {
        text = months + ' meses y ' + (daysDiff % 30) + ' días';
    } else {
        text = daysDiff + ' días juntos';
    }
    
    if (counterTextEl) counterTextEl.textContent = text;
}

// CARRUSEL
let currentSlide = 0;
const player = new Audio();

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    const dotsContainer = document.getElementById('dots');
    
    if (!dotsContainer) return;
    
    // Crear puntos
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        if (slides[n]) slides[n].classList.add('active');
        const dots = document.querySelectorAll('.dot');
        if (dots[n]) dots[n].classList.add('active');
    }
    
    window.goToSlide = function(n) {
        currentSlide = n;
        showSlide(currentSlide);
    };
    
    window.nextSlide = function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    };
    
    window.prevSlide = function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    };
    
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', window.nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', window.prevSlide);
    
    // Auto-avanzar cada 5 segundos
    setInterval(window.nextSlide, 5000);
}

// CONTROLES DE CANCIONES
let currentSongIndex = 0;
const songs = [
    {
        title: 'Una noche',
        artist: 'Llevo años perdio en ti... desde ese dia que te vi',
        url: 'songs/una-noche.mp3'
    },
    {
        title: 'Unico',
        artist: 'Asi es nuestro amor, muñequita mia',
        url: 'songs/unico.mp3'
    },
    {
        title: 'Paranormal',
        artist: 'La cancion que suena siempre que no estoy contigo vida mia',
        url: 'songs/paranormal.mp3'
    }
];

const titleElements = document.querySelectorAll('.song-title');
const artistElements = document.querySelectorAll('.song-artist');

songs.forEach((song, index) => {
    if (titleElements[index]) {
        titleElements[index].textContent = song.title;
    }

    if (artistElements[index]) {
        artistElements[index].textContent = song.artist || "Artista desconocido";
    }
});
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {

        // 1. Si la canción que clickeaste ya está sonando, la pausamos
        if (player.src.includes(songs[index].url) && !player.paused) {
            player.pause();
            btn.textContent = '▶'; // Cambiamos el icono a Play
        }
        else {
            player.src = songs[index].url;
            player.play();
            playButtons.forEach(b => b.textContent = '▶');
            btn.textContent = '⏸'; // Ponemos el icono de Pause
        }
    });
});

function initSongControls() {
    const prevSongBtn = document.getElementById('prevSongBtn');
    const nextSongBtn = document.getElementById('nextSongBtn');
    
    if (prevSongBtn) {
        prevSongBtn.addEventListener('click', function() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            updateActiveSongCard();
        });
    }
    
    if (nextSongBtn) {
        nextSongBtn.addEventListener('click', function() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            updateActiveSongCard();
        });
    }
    
    // Agregar click a los botones de play
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            currentSongIndex = index;
            updateActiveSongCard();
        });
    });
}

function updateActiveSongCard() {
    const cards = document.querySelectorAll('.song-card');
    cards.forEach((card, index) => {
        if (index === currentSongIndex) {
            card.classList.add('active-song');
        } else {
            card.classList.remove('active-song');
        }
    });
}

// CONTENIDO DEL SOBRE
function initEnvelope() {
    const envelopeContent = document.getElementById('envelopeContent');
    if (envelopeContent) {
        envelopeContent.innerHTML = 'Te amo más cada día que pasa. Gracias por ser mi razón para sonreír. 🌹✨';
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initCounter();
    initCarousel();
    initSongControls();
    initEnvelope();
});
