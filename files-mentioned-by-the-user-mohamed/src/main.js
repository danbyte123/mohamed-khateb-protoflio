import './styles.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sceneState = {
  activePage: 'home',
  mouseX: 0,
  mouseY: 0,
  targetHue: 0.1,
};

const pageThemes = {
  home: { hue: 0.1, x: 1.65, y: -0.08, z: -1.25, mobileX: 1.55, mobileY: -2.55, mobileScale: 0.32, rot: 0.003 },
  experience: { hue: 0.12, x: 2.05, y: -0.18, z: -1.55, mobileX: 1.65, mobileY: -2.65, mobileScale: 0.3, rot: 0.005 },
  skills: { hue: 0.32, x: 2.25, y: -0.28, z: -1.9, mobileX: 1.72, mobileY: -2.75, mobileScale: 0.28, rot: 0.007 },
  contact: { hue: 0.08, x: 3.65, y: -0.05, z: -1.55, mobileX: 1.95, mobileY: -2.8, mobileScale: 0.28, rot: 0.004 },
};

const canvas = document.querySelector('#space-scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 7);

const group = new THREE.Group();
group.position.set(2.3, -0.05, -1);
scene.add(group);

const ambient = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambient);

const keyLight = new THREE.PointLight(0x78ffe6, 1.6, 20);
keyLight.position.set(3, 4, 5);
scene.add(keyLight);

const fillLight = new THREE.PointLight(0xffb86b, 0.7, 15);
fillLight.position.set(-4, -2, 4);
scene.add(fillLight);

const accentMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color().setHSL(sceneState.targetHue, 0.78, 0.55),
  metalness: 0.38,
  roughness: 0.24,
  emissive: new THREE.Color().setHSL(sceneState.targetHue, 0.7, 0.12),
});
const tuxGroup = new THREE.Group();
group.add(tuxGroup);

const blackMaterial = new THREE.MeshStandardMaterial({
  color: 0x050708,
  metalness: 0.18,
  roughness: 0.36,
  emissive: 0x020403,
});
const whiteMaterial = new THREE.MeshStandardMaterial({
  color: 0xf4f7ef,
  metalness: 0.08,
  roughness: 0.32,
  emissive: 0x111512,
});
const beakMaterial = new THREE.MeshStandardMaterial({
  color: 0xffb13d,
  metalness: 0.05,
  roughness: 0.3,
  emissive: 0x2c1200,
});
const eyeMaterial = new THREE.MeshStandardMaterial({
  color: 0x050505,
  metalness: 0.12,
  roughness: 0.18,
});

const body = new THREE.Mesh(new THREE.SphereGeometry(1.25, 48, 36), blackMaterial);
body.scale.set(1.02, 1.38, 0.72);
body.position.y = -0.42;
tuxGroup.add(body);

const belly = new THREE.Mesh(new THREE.SphereGeometry(0.92, 48, 30), whiteMaterial);
belly.scale.set(0.82, 1.12, 0.2);
belly.position.set(0, -0.55, 0.72);
tuxGroup.add(belly);

const head = new THREE.Mesh(new THREE.SphereGeometry(0.76, 48, 32), blackMaterial);
head.scale.set(1, 0.9, 0.82);
head.position.set(0, 0.96, 0.03);
tuxGroup.add(head);

const face = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 24), whiteMaterial);
face.scale.set(0.85, 0.58, 0.16);
face.position.set(0, 0.88, 0.59);
tuxGroup.add(face);

[-0.24, 0.24].forEach((x) => {
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 16), eyeMaterial);
  eye.position.set(x, 1.08, 0.73);
  tuxGroup.add(eye);
});

const beak = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.42, 4), beakMaterial);
beak.rotation.x = Math.PI / 2;
beak.rotation.z = Math.PI / 4;
beak.position.set(0, 0.88, 0.86);
tuxGroup.add(beak);

[-0.92, 0.92].forEach((x, index) => {
  const wing = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 20), blackMaterial);
  wing.scale.set(0.48, 1.18, 0.24);
  wing.rotation.z = (index === 0 ? 1 : -1) * 0.48;
  wing.position.set(x, -0.35, 0.08);
  tuxGroup.add(wing);

  const foot = new THREE.Mesh(new THREE.SphereGeometry(0.28, 30, 16), beakMaterial);
  foot.scale.set(1.15, 0.38, 0.58);
  foot.rotation.z = (index === 0 ? 1 : -1) * 0.2;
  foot.position.set(x * 0.42, -1.95, 0.56);
  tuxGroup.add(foot);
});

const halo = new THREE.Mesh(new THREE.TorusKnotGeometry(1.95, 0.025, 180, 10), accentMaterial);
halo.rotation.set(0.4, 0.1, 0.2);
tuxGroup.add(halo);

tuxGroup.rotation.set(0.02, -0.36, -0.04);

const wireMaterial = new THREE.MeshBasicMaterial({
  color: 0xffcf77,
  transparent: true,
  opacity: 0.26,
  wireframe: true,
});
const cube = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 2.6, 5, 5, 5), wireMaterial);
cube.rotation.set(0.4, 0.2, 0.1);
group.add(cube);

const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xffc18a,
  transparent: true,
  opacity: 0.22,
  wireframe: true,
});
const rings = [0.8, 1.35, 1.9].map((radius, index) => {
  const ring = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 1), ringMaterial.clone());
  ring.position.set(-2.1 + index * 1.35, 1.25 - index * 0.45, -0.7 - index * 0.25);
  group.add(ring);
  return ring;
});

const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });
const orbitMeshes = [2.3, 3.0, 3.7].map((radius, index) => {
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.006, 8, 150), orbitMaterial.clone());
  orbit.rotation.x = Math.PI / (2.5 + index * 0.35);
  orbit.rotation.y = index * 0.5;
  group.add(orbit);
  return orbit;
});

const particleGeometry = new THREE.BufferGeometry();
const particleCount = 850;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i += 1) {
  positions[i * 3] = (Math.random() - 0.5) * 14;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particles = new THREE.Points(
  particleGeometry,
  new THREE.PointsMaterial({ color: 0xd9fff9, size: 0.015, transparent: true, opacity: 0.72 }),
);
scene.add(particles);

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  const isMobile = window.innerWidth < 720;
  const theme = pageThemes[sceneState.activePage] ?? pageThemes.home;
  group.position.x = isMobile ? theme.mobileX : theme.x;
  group.position.y = isMobile ? theme.mobileY : theme.y;
  group.scale.setScalar(isMobile ? theme.mobileScale : 0.82);
};
window.addEventListener('resize', resize);
resize();

window.addEventListener('pointermove', (event) => {
  sceneState.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  sceneState.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('[data-page-link]')];
let activePage = document.querySelector('.page.is-active');

document.querySelectorAll('[data-split]').forEach((element) => {
  const words = element.textContent.trim().split(' ');
  element.textContent = '';
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'split-word';
    [...word].forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'split-char';
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });
    element.appendChild(wordSpan);
    if (wordIndex < words.length - 1) element.append(' ');
  });
});

function animatePage(page) {
  const targets = page.querySelectorAll('.eyebrow, h1, h2, .lead, .button, .terminal-line');
  const movingCards = page.querySelectorAll('.tilt-card, .timeline-card, .skill-card, .contact-card');
  const chars = page.querySelectorAll('.split-char');
  gsap.fromTo(
    targets,
    { y: 34, rotateX: 10 },
    { y: 0, rotateX: 0, duration: 0.78, ease: 'power3.out', stagger: 0.055 },
  );
  gsap.fromTo(
    movingCards,
    {
      x: (index) => (index % 2 === 0 ? 72 : -72),
      y: 42,
      rotateZ: (index) => (index % 2 === 0 ? 2.5 : -2.5),
      scale: 0.96,
    },
    {
      x: 0,
      y: 0,
      rotateZ: 0,
      scale: 1,
      duration: 0.72,
      ease: 'power4.out',
      stagger: 0.085,
    },
  );
  gsap.fromTo(
    chars,
    { yPercent: 36, rotateZ: 2 },
    { yPercent: 0, rotateZ: 0, duration: 0.72, ease: 'back.out(1.7)', stagger: { each: 0.018, from: 'start' } },
  );
  gsap.fromTo(
    page.querySelectorAll('.terminal-line'),
    { '--scan-x': '-120%' },
    { '--scan-x': '120%', duration: 1.2, ease: 'power2.inOut', stagger: 0.12 },
  );
}

function setActivePage(pageName) {
  const nextPage = document.querySelector(`[data-page="${pageName}"]`);
  if (!nextPage || nextPage === activePage) return;

  const theme = pageThemes[pageName] ?? pageThemes.home;
  sceneState.activePage = pageName;
  sceneState.targetHue = theme.hue;
  navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.pageLink === pageName));

  gsap.to(activePage, {
    autoAlpha: 0,
    y: -20,
    duration: 0.32,
    ease: 'power2.in',
    onComplete: () => {
      activePage.classList.remove('is-active');
      activePage = nextPage;
      nextPage.classList.add('is-active');
      gsap.set(nextPage, { y: 20, autoAlpha: 0 });
      const isMobile = window.innerWidth < 720;
      gsap.to(group.position, {
        x: isMobile ? theme.mobileX : theme.x,
        y: isMobile ? theme.mobileY : theme.y,
        z: theme.z,
        duration: 0.9,
        ease: 'power3.out',
      });
      gsap.to(group.scale, {
        x: isMobile ? theme.mobileScale : 0.82,
        y: isMobile ? theme.mobileScale : 0.82,
        z: isMobile ? theme.mobileScale : 0.82,
        duration: 0.9,
        ease: 'power3.out',
      });
      gsap.to(nextPage, {
        y: 0,
        autoAlpha: 1,
        duration: 0.42,
        ease: 'power2.out',
        onComplete: () => animatePage(nextPage),
      });
    },
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    window.location.hash = link.dataset.pageLink;
  });
});

window.addEventListener('hashchange', () => {
  setActivePage(window.location.hash.replace('#', '') || 'home');
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const pageName = anchor.getAttribute('href').replace('#', '');
    if (pageThemes[pageName]) {
      event.preventDefault();
      window.location.hash = pageName;
    }
  });
});

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.tabIndex = 0;
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const x = localX / rect.width - 0.5;
    const y = localY / rect.height - 0.5;
    card.style.setProperty('--card-x', `${localX}px`);
    card.style.setProperty('--card-y', `${localY}px`);
    gsap.to(card, {
      rotateY: x * 11,
      rotateX: -y * 11,
      x: x * 12,
      y: y * 10,
      duration: 0.32,
      ease: 'power2.out',
    });
  });
  card.addEventListener('pointerenter', () => {
    gsap.to(card, { '--card-glow': 1, duration: 0.22, ease: 'power2.out' });
  });
  card.addEventListener('pointerleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      '--card-glow': 0,
      duration: 0.58,
      ease: 'power3.out',
    });
  });
  card.addEventListener('pointerdown', () => {
    card.classList.add('is-card-active');
    gsap.fromTo(card, { scale: 0.985 }, { scale: 1.025, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.inOut' });
  });
  card.addEventListener('pointerup', () => {
    window.setTimeout(() => card.classList.remove('is-card-active'), 260);
  });
  card.addEventListener('focus', () => {
    gsap.to(card, { '--card-glow': 1, y: -6, duration: 0.24, ease: 'power2.out' });
  });
  card.addEventListener('blur', () => {
    card.classList.remove('is-card-active');
    gsap.to(card, { '--card-glow': 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.32, ease: 'power2.out' });
  });
});

const trailDots = Array.from({ length: 9 }, (_, index) => {
  const dot = document.createElement('span');
  dot.className = 'cursor-trail';
  dot.style.setProperty('--trail-size', `${18 - index}px`);
  document.body.appendChild(dot);
  return dot;
});

window.addEventListener('pointermove', (event) => {
  trailDots.forEach((dot, index) => {
    gsap.to(dot, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.18 + index * 0.035,
      ease: 'power3.out',
    });
  });
});

gsap.set(pages.filter((page) => !page.classList.contains('is-active')), { autoAlpha: 0 });
gsap.to('.brand', { y: -4, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
gsap.to('.nav-link.is-active', { boxShadow: '0 0 22px rgba(255, 207, 119, 0.26)', duration: 1.2, yoyo: true, repeat: -1 });
gsap.to('.button.primary', { scale: 1.035, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
gsap.to('.terminal-panel', { y: -8, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
gsap.to('.grain', { opacity: 0.28, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
animatePage(activePage);
setActivePage(window.location.hash.replace('#', '') || 'home');

function render() {
  const theme = pageThemes[sceneState.activePage] ?? pageThemes.home;
  tuxGroup.rotation.y += theme.rot * 1.25;
  tuxGroup.rotation.x += Math.sin(Date.now() * 0.001) * 0.0009;
  halo.rotation.x += theme.rot * 1.8;
  halo.rotation.y -= theme.rot * 1.25;
  cube.rotation.x -= theme.rot * 0.7;
  cube.rotation.y += theme.rot * 1.25;
  rings.forEach((ring, index) => {
    ring.rotation.x += theme.rot * (index + 1);
    ring.rotation.y -= theme.rot * (1.4 + index * 0.25);
    ring.position.y += Math.sin(Date.now() * 0.0014 + index) * 0.0009;
  });
  orbitMeshes.forEach((orbit, index) => {
    orbit.rotation.z += 0.0018 + index * 0.0007;
    orbit.material.opacity = 0.3 + Math.sin(Date.now() * 0.001 + index) * 0.12;
  });
  particles.rotation.y += 0.00045;
  particles.rotation.x += 0.0002;

  group.rotation.y += (sceneState.mouseX * 0.25 - group.rotation.y) * 0.035;
  group.rotation.x += (-sceneState.mouseY * 0.18 - group.rotation.x) * 0.035;
  keyLight.position.x = 3 + sceneState.mouseX * 1.2;
  keyLight.position.y = 4 - sceneState.mouseY * 1.1;

  const color = new THREE.Color().setHSL(sceneState.targetHue, 0.78, 0.55);
  const emissive = new THREE.Color().setHSL(sceneState.targetHue, 0.72, 0.14);
  accentMaterial.color.lerp(color, 0.04);
  accentMaterial.emissive.lerp(emissive, 0.04);
  keyLight.color.lerp(color, 0.04);
  fillLight.color.lerp(emissive, 0.035);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
