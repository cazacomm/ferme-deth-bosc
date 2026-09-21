/* =========================================================
   La Ferme Deth Bosc — hero3d.js
   Scène 3D du hero : des fruits et légumes stylisés qui
   dérivent lentement en profondeur, réagissent à la souris
   et au scroll. Procédural : aucun modèle à télécharger.
   ========================================================= */
import * as THREE from 'three';

const canvas = document.getElementById('hero-canvas');
if (canvas) init(canvas);

function init(canvas) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.matchMedia('(max-width: 760px)').matches;

  /* ---------- Renderer ---------- */
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: !isSmall, alpha: true, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x22412d, 0.034);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  /* ---------- Lumières ---------- */
  scene.add(new THREE.HemisphereLight(0xeaf7ec, 0x14281c, 1.05));

  const key = new THREE.DirectionalLight(0xfff0d8, 3.4);
  key.position.set(5, 7, 6);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xe08a4a, 2.1);
  rim.position.set(-7, -2, -4);
  scene.add(rim);

  const fill = new THREE.PointLight(0x9fd6a8, 1.2, 40);
  fill.position.set(-4, 3, 8);
  scene.add(fill);

  /* ---------- Palette produits ---------- */
  const KINDS = [
    { color: 0xD8402C, shape: 'round',  scale: 1.00, stem: 0x4E8A3C }, /* tomate    */
    { color: 0x4C9440, shape: 'long',   scale: 1.10, stem: 0x35662C }, /* courgette */
    { color: 0xEE8C25, shape: 'round',  scale: 0.92, stem: 0x7A6530 }, /* orange    */
    { color: 0x62397E, shape: 'long',   scale: 1.25, stem: 0x4E8A3C }, /* aubergine */
    { color: 0xA8C23F, shape: 'round',  scale: 0.88, stem: 0x5E7A2A }, /* pomme     */
    { color: 0xCE4A2C, shape: 'lumpy',  scale: 1.05, stem: 0x4E8A3C }, /* poivron   */
    { color: 0xEFC945, shape: 'round',  scale: 0.80, stem: 0x7A6530 }, /* citron    */
    { color: 0xCCA36A, shape: 'lumpy',  scale: 0.95, stem: null     }  /* pomme de terre */
  ];

  /* ---------- Fabrication des formes ---------- */
  function makeBody(kind) {
    let geo;
    const seg = isSmall ? 20 : 32;

    if (kind.shape === 'long') {
      geo = new THREE.CapsuleGeometry(0.5, 0.95, 6, seg);
    } else {
      geo = new THREE.SphereGeometry(0.72, seg, Math.round(seg * 0.7));
    }

    /* Déformation douce pour éviter la sphère parfaite */
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    const amp = kind.shape === 'lumpy' ? 0.14 : 0.055;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n =
        Math.sin(v.x * 3.1 + v.y * 2.3) * 0.5 +
        Math.sin(v.y * 4.2 + v.z * 1.9) * 0.3 +
        Math.sin(v.z * 2.7 + v.x * 3.4) * 0.2;
      v.multiplyScalar(1 + n * amp);
      if (kind.shape === 'round') v.y *= 0.9; /* légèrement aplati */
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: kind.color,
      roughness: 0.44,
      metalness: 0.02,
      flatShading: false
    });

    const group = new THREE.Group();
    group.add(new THREE.Mesh(geo, mat));

    if (kind.stem) {
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.085, 0.42, 8),
        new THREE.MeshStandardMaterial({ color: kind.stem, roughness: 0.85 })
      );
      stem.position.y = kind.shape === 'long' ? 1.05 : 0.7;
      stem.rotation.z = (Math.random() - 0.5) * 0.4;
      group.add(stem);

      /* une petite feuille */
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 10, 8),
        new THREE.MeshStandardMaterial({ color: 0x5FA847, roughness: 0.75 })
      );
      leaf.scale.set(1.5, 0.12, 0.7);
      leaf.position.set(0.16, stem.position.y + 0.12, 0);
      leaf.rotation.z = 0.35;
      group.add(leaf);
    }

    group.scale.setScalar(kind.scale);
    return group;
  }

  /* ---------- Peuplement ---------- */
  const COUNT = isSmall ? 9 : 16;
  const world = new THREE.Group();
  scene.add(world);

  const items = [];
  for (let i = 0; i < COUNT; i++) {
    const kind = KINDS[i % KINDS.length];
    const o = makeBody(kind);

    const depth = -20 + Math.random() * 22;
    const spread = 1 + Math.abs(depth) * 0.38;
    /* réparti sur toute la largeur, en évitant la colonne de texte à gauche */
    let x = (Math.random() - 0.35) * 11 * spread * 0.34;
    if (depth > -6 && x < 2.2) x += 3.4;
    o.position.set(
      x,
      (Math.random() - 0.5) * 8 * spread * 0.32,
      depth
    );
    o.rotation.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28);

    const s = 0.55 + Math.random() * 0.75;
    o.scale.multiplyScalar(s);

    items.push({
      o,
      spin: new THREE.Vector3(
        (Math.random() - 0.5) * 0.14,
        (Math.random() - 0.5) * 0.18,
        (Math.random() - 0.5) * 0.10
      ),
      phase: Math.random() * 6.28,
      floatAmp: 0.16 + Math.random() * 0.3,
      baseY: o.position.y
    });
    world.add(o);
  }

  /* ---------- Poussière lumineuse ---------- */
  const dustGeo = new THREE.BufferGeometry();
  const dustN = isSmall ? 60 : 140;
  const dustPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3]     = (Math.random() - 0.5) * 26;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
    dustPos[i * 3 + 2] = -20 + Math.random() * 24;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xF2D9B0, size: 0.07, transparent: true, opacity: 0.5,
    depthWrite: false, sizeAttenuation: true
  }));
  scene.add(dust);

  /* ---------- Interaction ---------- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollN = 0;

  if (!reduced) {
    window.addEventListener('pointermove', (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('scroll', () => {
      scrollN = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    }, { passive: true });
  }

  /* ---------- Resize ---------- */
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  /* ---------- Pause hors écran ---------- */
  let visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(canvas);
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) clock.getDelta(); /* évite un saut au retour */
  });

  /* ---------- Boucle ---------- */
  const clock = new THREE.Clock();

  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (!visible) return;

    pointer.x += (pointer.tx - pointer.x) * 0.045;
    pointer.y += (pointer.ty - pointer.y) * 0.045;

    for (const it of items) {
      it.o.rotation.x += it.spin.x * dt;
      it.o.rotation.y += it.spin.y * dt;
      it.o.rotation.z += it.spin.z * dt;
      it.o.position.y = it.baseY + Math.sin(t * 0.42 + it.phase) * it.floatAmp;
    }

    world.rotation.y = pointer.x * 0.13;
    world.rotation.x = pointer.y * 0.08;
    world.position.y = scrollN * 2.6;

    dust.rotation.y = t * 0.012;

    camera.position.x = pointer.x * 0.5;
    camera.position.y = -pointer.y * 0.35;
    camera.position.z = 14 - scrollN * 2.2;
    camera.lookAt(0, 0, -4);

    renderer.render(scene, camera);
  }

  if (reduced) {
    renderer.render(scene, camera);
  } else {
    frame();
  }

  requestAnimationFrame(() => canvas.classList.add('is-ready'));
}
