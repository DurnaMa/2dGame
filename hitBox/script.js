const ENTITIES = [
  {
    id: 'rogue',
    name: 'Rogue (Spieler)',
    width: 200,
    height: 200,
    offset: { top: 90, left: 35, right: 90, bottom: 25 },
    color: '#4dabf7',
  },
  {
    id: 'bigknight',
    name: 'BigKnight',
    width: 300,
    height: 300,
    offset: { top: 95, left: 115, right: 105, bottom: 100 },
    color: '#ff6b6b',
  },
  {
    id: 'dragon',
    name: 'Dragon',
    width: 300,
    height: 300,
    offset: { top: 112, left: 40, right: 88, bottom: 113 },
    color: '#ff6b6b',
  },
  {
    id: 'endboss',
    name: 'Endboss',
    width: 400,
    height: 400,
    offset: { top: 125, left: 165, right: 75, bottom: 75 },
    color: '#be4bdb',
  },
];

const state = {};

function init() {
  buildCards();
}

function buildCards() {
  const grid = document.getElementById('grid');

  ENTITIES.forEach((entity, idx) => {
    state[entity.id] = {
      img: null,
      offset: { ...entity.offset },
    };

    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.idx = idx;

    card.innerHTML = `<h2>${entity.name} <span style="color:#555;font-size:10px">${entity.width}×${entity.height}px</span></h2>`;

    // Canvas
    const canvasH = Math.round(entity.height * (320 / entity.width));
    const canvas = document.createElement('canvas');
    canvas.id = `canvas-${entity.id}`;
    canvas.width = 320;
    canvas.height = canvasH;
    card.appendChild(canvas);

    // Legende
    const legend = document.createElement('div');
    legend.className = 'legend';
    legend.innerHTML = `
      <span><div class="dot" style="border:1.5px dashed rgba(74,192,255,0.8)"></div>Sprite-Rahmen (blau)</span>
      <span><div class="dot" style="background:${entity.color}"></div>Hitbox (rot)</span>
    `;
    card.appendChild(legend);

    // Upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.id = `file-${entity.id}`;

    const uploadBtn = document.createElement('label');
    uploadBtn.className = 'upload-btn';
    uploadBtn.htmlFor = `file-${entity.id}`;
    uploadBtn.textContent = '📂 Sprite-Bild hochladen (optional)';

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          state[entity.id].img = img;
          renderCanvas(entity);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
      uploadBtn.textContent = `✅ ${file.name}`;
    });

    card.appendChild(fileInput);
    card.appendChild(uploadBtn);

    // Schieberegler
    const sliders = document.createElement('div');
    sliders.className = 'sliders';

    ['top', 'left', 'right', 'bottom'].forEach((side) => {
      const maxVal =
        side === 'top' || side === 'bottom' ? Math.round(entity.height * 0.85) : Math.round(entity.width * 0.85);

      const row = document.createElement('div');
      row.className = 'slider-row';

      const lbl = document.createElement('label');
      lbl.textContent = { top: 'Oben:', left: 'Links:', right: 'Rechts:', bottom: 'Unten:' }[side];
      row.appendChild(lbl);

      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = 0;
      slider.max = maxVal;
      slider.value = entity.offset[side];

      const num = document.createElement('input');
      num.type = 'number';
      num.min = 0;
      num.max = maxVal;
      num.value = entity.offset[side];

      const sync = (val) => {
        const v = Math.max(0, Math.min(maxVal, parseInt(val) || 0));
        slider.value = v;
        num.value = v;
        state[entity.id].offset[side] = v;
        renderCanvas(entity);
        updateInfo(entity);
      };

      slider.addEventListener('input', () => sync(slider.value));
      num.addEventListener('input', () => sync(num.value));

      row.appendChild(slider);
      row.appendChild(num);
      sliders.appendChild(row);
    });

    card.appendChild(sliders);

    // Info
    const info = document.createElement('div');
    info.className = 'info';
    info.id = `info-${entity.id}`;
    card.appendChild(info);

    // Copy-Button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = '📋 Config-Werte kopieren';
    copyBtn.addEventListener('click', () => {
      const o = state[entity.id].offset;
      const text = `// ${entity.name} — config.class.js
${entity.id.toUpperCase()}: {
  OFFSET: {
    TOP:    ${o.top},
    LEFT:   ${o.left},
    RIGHT:  ${o.right},
    BOTTOM: ${o.bottom},
  },
}`;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '✅ Kopiert!';
        setTimeout(() => (copyBtn.textContent = '📋 Config-Werte kopieren'), 1500);
      });
    });
    card.appendChild(copyBtn);

    grid.appendChild(card);

    renderCanvas(entity);
    updateInfo(entity);
  });
}

function renderCanvas(entity) {
  const canvas = document.getElementById(`canvas-${entity.id}`);
  const ctx = canvas.getContext('2d');
  const cw = canvas.width;
  const ch = canvas.height;
  const sx = cw / entity.width;
  const sy = ch / entity.height;

  ctx.clearRect(0, 0, cw, ch);

  const { img, offset } = state[entity.id];

  // Sprite-Bild
  if (img) {
    ctx.globalAlpha = 1;
    ctx.drawImage(img, 0, 0, cw, ch);
  }

  // Sprite-Rahmen (blau gestrichelt = drawBorder)
  ctx.globalAlpha = 1;
  ctx.strokeStyle = 'rgba(74,192,255,0.9)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(1, 1, cw - 2, ch - 2);
  ctx.setLineDash([]);

  // Hitbox (rot = drawCollisionBorder)
  const hbX = offset.left * sx;
  const hbY = offset.top * sy;
  const hbW = (entity.width - offset.left - offset.right) * sx;
  const hbH = (entity.height - offset.top - offset.bottom) * sy;

  ctx.globalAlpha = 0.18;
  ctx.fillStyle = entity.color;
  ctx.fillRect(hbX, hbY, hbW, hbH);

  ctx.globalAlpha = 1;
  ctx.strokeStyle = entity.color;
  ctx.lineWidth = 2;
  ctx.strokeRect(hbX, hbY, hbW, hbH);

  // Mittelkreuz
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(cw / 2, 0);
  ctx.lineTo(cw / 2, ch);
  ctx.moveTo(0, ch / 2);
  ctx.lineTo(cw, ch / 2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function updateInfo(entity) {
  const { offset } = state[entity.id];
  const hbW = entity.width - offset.left - offset.right;
  const hbH = entity.height - offset.top - offset.bottom;
  const pW = Math.round((hbW / entity.width) * 100);
  const pH = Math.round((hbH / entity.height) * 100);

  const warns = [];
  if (hbW <= 0) warns.push('Breite ist 0 oder negativ!');
  if (hbH <= 0) warns.push('Höhe ist 0 oder negativ!');
  if (pW < 10) warns.push(`Sehr schmale Hitbox (${pW}%)`);
  if (pH < 10) warns.push(`Sehr flache Hitbox (${pH}%)`);

  document.getElementById(`info-${entity.id}`).innerHTML = `
    Hitbox: <b>${Math.max(0, hbW)} × ${Math.max(0, hbH)} px</b>
    &nbsp;(<span class="${warns.length ? 'warn' : 'ok'}">${pW}% × ${pH}%</span>)<br>
    Offsets → Oben:${offset.top} / Links:${offset.left} / Rechts:${offset.right} / Unten:${offset.bottom}
    ${
    warns.length
      ? '<br><span class="warn">⚠️ ' + warns.join(' | ') + '</span>'
      : '<br><span class="ok">✅ Sieht gut aus</span>'
  }
  `;
}