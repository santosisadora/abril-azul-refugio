// Modal Management
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button');

function openModal(title, content) {
    modalBody.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

closeButton.addEventListener('click', closeModal);

// Audio Management
const btnAudio = document.getElementById('btn-toggle-audio');
const ambientSound = document.getElementById('ambient-sound');
let isAudioPlaying = false;

btnAudio.addEventListener('click', () => {
    if (!isAudioPlaying) {
        // A-Frame sound component logic
        ambientSound.components.sound.playSound();
        btnAudio.textContent = '🔊 Pausar Áudio Ambiente';
        isAudioPlaying = true;
    } else {
        ambientSound.components.sound.pauseSound();
        btnAudio.textContent = '🔇 Iniciar Áudio Ambiente';
        isAudioPlaying = false;
    }
});

// A-Frame Component for Interaction
AFRAME.registerComponent('clickable', {
    init: function () {
        const el = this.el;
        const data = el.dataset;

        el.addEventListener('click', function () {
            if (data.title && data.content) {
                openModal(data.title, data.content);
            }
        });

        // Visual feedback on hover/fusing
        el.addEventListener('mouseenter', function () {
            el.setAttribute('animation__scale', {
                property: 'scale',
                to: '1.2 1.2 1.2',
                dur: 300
            });
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('animation__scale', {
                property: 'scale',
                to: '1 1 1',
                dur: 300
            });
        });
    }
});

// Ensure the scene is loaded before interacting with components
document.querySelector('a-scene').addEventListener('loaded', function () {
    console.log('Cena A-Frame carregada e pronta.');
});
