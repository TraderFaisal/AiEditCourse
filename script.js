// Add your real YouTube/MP4 links here. Leave blank to show the demo placeholder.
const VIDEO_URLS = {
  intro: "",
  main: "",
  product: "",
  cinematic: "",
  social: "",
  youtube: ""
};

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Course curriculum accordion
document.querySelectorAll('.module-head').forEach(button => {
  button.addEventListener('click', () => {
    const body = button.nextElementSibling;
    const willOpen = body.hidden;
    body.hidden = !willOpen;
    button.setAttribute('aria-expanded', String(willOpen));
    button.querySelector('.module-count').textContent =
      button.querySelector('.module-count').textContent.replace(/[＋−]/, willOpen ? '−' : '＋');
  });
});

// Demo video modal
const modal = document.querySelector('.video-modal');
const modalContent = document.querySelector('.modal-content');
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalContent.querySelector('iframe, video')?.remove();
}
document.querySelectorAll('[data-video]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.video;
    const url = VIDEO_URLS[key];
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    if (url) {
      const frame = document.createElement('iframe');
      frame.src = url;
      frame.title = 'Course demo video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      frame.style.cssText = 'width:100%;height:100%;border:0;border-radius:14px';
      modalContent.replaceChildren(frame);
    } else {
      modalContent.innerHTML = '<div class="modal-play">▶</div><h3>আপনার Demo Video এখানে যুক্ত করুন</h3><p>script.js ফাইলে VIDEO_URLS-এর মধ্যে video URL বসান।</p>';
    }
  });
});
document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.getElementById('year').textContent = new Date().getFullYear();
