function apiUrl(path) {
  const root =
    typeof window.__APP_ROOT__ === 'string' ? window.__APP_ROOT__.replace(/\/$/, '') : '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return root ? `${root}${p}` : p;
}

// =============== DOM ===============
const el = {
  charMain: document.getElementById('charMain'),
  charSplit: document.getElementById('charSplit'),
  btnToggle: document.getElementById('btnToggle'),
  btnApply: document.getElementById('btnApply'),
  input: document.getElementById('charInput'),
  countHint: document.getElementById('countHint'),
  textPreview: document.getElementById('textPreview'),
  textOverlay: document.getElementById('textOverlay'),
  overlayText: document.getElementById('overlayText'),
  btnOverlayClose: document.getElementById('btnOverlayClose'),
  zoomRange: document.getElementById('zoomRange'),
  zoomLabel: document.getElementById('zoomLabel'),
  btnMinus: document.getElementById('btnMinus'),
  btnPlus: document.getElementById('btnPlus'),
  btnReset: document.getElementById('btnReset'),
  presetChars: document.getElementById('presetChars'),
  btnClearHistory: document.getElementById('btnClearHistory'),
  textHistoryList: document.getElementById('textHistoryList'),
  btnClearTextHistory: document.getElementById('btnClearTextHistory'),
  radicalGridMain: document.getElementById('radicalGridMain'),
  radicalGridAffix: document.getElementById('radicalGridAffix'),
  detectedRadicals: document.getElementById('detectedRadicals'),
  tabRadical: document.getElementById('tabRadical'),
  tabStroke: document.getElementById('tabStroke'),
  tabCustom: document.getElementById('tabCustom'),
  pageRadicals: document.getElementById('pageRadicals'),
  pageStrokes: document.getElementById('pageStrokes'),
  pageCustom: document.getElementById('pageCustom'),
  customPartsSummary: document.getElementById('customPartsSummary'),
  charContainer: document.querySelector('.char-container'),
  copybookGridOverlay: document.getElementById('copybookGridOverlay'),
  detectedStrokes: document.getElementById('detectedStrokes'),
  strokeGridBase: document.getElementById('strokeGridBase'),

  cameraFloat: document.querySelector('.camera-float'),
  cameraHeader: document.querySelector('.camera-header'),
  video: document.getElementById('video'),
  canvas: document.getElementById('canvas'),
  status: document.getElementById('status'),
  gestureBar: document.getElementById('gestureBar'),

  fontInput: document.getElementById('fontInput'),
  btnFontApply: document.getElementById('btnFontApply'),

  btnRadicalResetOrder: document.getElementById('btnRadicalResetOrder'),
  togglePhysics: document.getElementById('togglePhysics'),
  sensRange: document.getElementById('sensRange'),
  sensLabel: document.getElementById('sensLabel'),
  btnGestureLock: document.getElementById('btnGestureLock'),

  pickedRadical: document.getElementById('pickedRadical'),
  fixTypeRadical: document.getElementById('fixTypeRadical'),
  fixTypeStroke: document.getElementById('fixTypeStroke'),

  btnFixOpenTop: document.getElementById('btnFixOpenTop'),
  btnFixOpenStroke: document.getElementById('btnFixOpenStroke'),
  fixOverlay: document.getElementById('fixOverlay'),
  btnFixClose: document.getElementById('btnFixClose'),
  fixChar: document.getElementById('fixChar'),
  fixRadicals: document.getElementById('fixRadicals'),
  fixPicker: document.getElementById('fixRadicalPicker'),
  btnFixSave: document.getElementById('btnFixSave'),
  btnFixDelete: document.getElementById('btnFixDelete'),

  btnExportPng: document.getElementById('btnExportPng'),
  btnOpenRegularUpload: document.getElementById('btnOpenRegularUpload'),
  btnOpenCustomUpload: document.getElementById('btnOpenCustomUpload'),
  regularUploadOverlay: document.getElementById('regularUploadOverlay'),
  btnRegularUploadClose: document.getElementById('btnRegularUploadClose'),
  regularContextHint: document.getElementById('regularContextHint'),
  regularSubRadical: document.getElementById('regularSubRadical'),
  regularSubStroke: document.getElementById('regularSubStroke'),
  regularRadicalBlock: document.getElementById('regularRadicalBlock'),
  regularStrokeBlock: document.getElementById('regularStrokeBlock'),
  regularRadicalPicker: document.getElementById('regularRadicalPicker'),
  regularStrokePicker: document.getElementById('regularStrokePicker'),
  regularPickedRadicalLabel: document.getElementById('regularPickedRadicalLabel'),
  regularPickedStrokeLabel: document.getElementById('regularPickedStrokeLabel'),
  regularFileInput: document.getElementById('regularFileInput'),
  btnRegularApply: document.getElementById('btnRegularApply'),
  btnRegularClearOne: document.getElementById('btnRegularClearOne'),
  btnRegularClearAllRad: document.getElementById('btnRegularClearAllRad'),
  btnRegularClearAllStr: document.getElementById('btnRegularClearAllStr'),
  regularReuseGallery: document.getElementById('regularReuseGallery'),
  customUploadOverlay: document.getElementById('customUploadOverlay'),
  btnCustomUploadClose: document.getElementById('btnCustomUploadClose'),
  customUnifiedSentencePick: document.getElementById('customUnifiedSentencePick'),
  customModalPartsGallery: document.getElementById('customModalPartsGallery'),
  customCommonAlias: document.getElementById('customCommonAlias'),
  customSharedSlot: document.getElementById('customSharedSlot'),
  customBatchSlot: document.getElementById('customBatchSlot'),
  customClearSlot: document.getElementById('customClearSlot'),
  customSharedFile: document.getElementById('customSharedFile'),
  btnCustomSharedApply: document.getElementById('btnCustomSharedApply'),
  customBatchFiles: document.getElementById('customBatchFiles'),
  btnCustomBatchApply: document.getElementById('btnCustomBatchApply'),
  btnCustomModalClearSlot: document.getElementById('btnCustomModalClearSlot'),
  btnCustomModalClearAll: document.getElementById('btnCustomModalClearAll'),
  btnExportJpg: document.getElementById('btnExportJpg'),
  btnExportPdf: document.getElementById('btnExportPdf'),
  btnPrintCopy: document.getElementById('btnPrintCopy'),
  btnShareCopy: document.getElementById('btnShareCopy'),
  btnSavePsd: document.getElementById('btnSavePsd'),
  fontSizeRange: document.getElementById('fontSizeRange'),
  fontWeightRange: document.getElementById('fontWeightRange'),
  fontColor: document.getElementById('fontColor'),
  fontOpacityRange: document.getElementById('fontOpacityRange'),
  btnApplyStyleSelected: document.getElementById('btnApplyStyleSelected'),
  btnApplyStyleAll: document.getElementById('btnApplyStyleAll'),
  loadingOverlay: document.getElementById('loadingOverlay'),
};

// =============== keys / state ===============
const K = {
  FREQ: 'hanzi_freq_v1',
  SPLIT_CACHE: 'hanzi_split_cache_v2',
  FONT: 'hanzi_font_family_v1',
  CAMERA: 'hanzi_camera_float_v1',
  RADICAL_STYLE: 'hanzi_radical_style_v1',
  STROKE_STYLE: 'hanzi_stroke_style_v1',
  CORRECTION: 'hanzi_corrections_v1',
  TEXT_HISTORY: 'hanzi_text_history_v1',
  CUSTOM_PART: 'hanzi_custom_part_v1',
};

let currentText = (el.charMain?.textContent || '春').trim() || '春';
let splitBasis = 'radical'; // radical | stroke
let scale = 1;
const minScale = 0.6;
const maxScale = 3.0;

let gestureLocked = false;
let sensitivity = 1.0;
let physicsEnabled = true;

let pickedRadical = '';
let pickedStroke = '';
let regularModalMode = 'radical';
let regModalRadPick = '';
let regModalStrPick = '';
const customUploadSelectedChars = new Set();
let fixType = 'radical';
let copyTpl = 'none';
let assetList = [];

// gesture selection via pinch
let pinchActive = false;
let gestureSelectedIdx = -1;

// physics
let physicsRaf = 0;
const physicsState = new Map(); // element -> {vx,vy,dragging}

// tooltip
let tooltipEl = null;

// =============== utilities ===============
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const isChineseChar = (ch) => /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(ch);

function openOverlayEl(node) {
  if (!node) return;
  node.classList.add('show');
  node.setAttribute('aria-hidden', 'false');
}
function closeOverlayEl(node) {
  if (!node) return;
  node.classList.remove('show');
  node.setAttribute('aria-hidden', 'true');
}

function setStatus(text) {
  if (el.status) el.status.textContent = text;
}
function setGestureBar(text) {
  if (el.gestureBar) el.gestureBar.textContent = `手势：${text || '—'}`;
}

function setScale(next) {
  scale = clamp(next, minScale, maxScale);
  if (el.charMain) el.charMain.style.transform = `scale(${scale})`;
  if (el.zoomRange) el.zoomRange.value = String(scale);
  if (el.zoomLabel) el.zoomLabel.textContent = `${scale.toFixed(2)}x`;
}

function applySpanStyle(nodes) {
  const size = Number(el.fontSizeRange?.value || 42);
  const weight = Number(el.fontWeightRange?.value || 900);
  const color = String(el.fontColor?.value || '#111111');
  const opacity = Number(el.fontOpacityRange?.value || 1);
  for (const n of nodes) {
    const fs = clamp(size, 16, 120);
    n.style.fontSize = `${fs}px`;
    n.style.fontWeight = `${clamp(weight, 100, 950)}`;
    n.style.color = color;
    n.style.opacity = String(clamp(opacity, 0.1, 1));
    const img = n.querySelector('.radical-img');
    if (img instanceof HTMLImageElement) {
      img.style.width = `${fs}px`;
      img.style.height = `${fs}px`;
      img.style.objectFit = 'contain';
    }
    const mask = n.querySelector('.radical-mask');
    if (mask instanceof HTMLElement) {
      mask.style.width = `${fs}px`;
      mask.style.height = `${fs}px`;
      const ring = Math.max(0, Math.round((clamp(weight, 100, 950) - 100) / 220));
      const shadow = [];
      for (let i = 1; i <= ring; i++) shadow.push(`0 0 0 ${i * 0.35}px ${color}`);
      mask.style.filter = shadow.length ? `drop-shadow(${shadow.join(') drop-shadow(')})` : '';
    }
  }
}

function applyStyleRealtime() {
  const all = Array.from(el.charSplit?.querySelectorAll('span') || []);
  if (!all.length) return;
  applySpanStyle(all);
}

function autoResizeTextarea() {
  if (!(el.input instanceof HTMLTextAreaElement)) return;
  el.input.style.height = 'auto';
  const max = 160;
  el.input.style.height = `${Math.min(max, el.input.scrollHeight)}px`;
}

function updatePreview() {
  if (!el.textPreview) return;
  const v = String(el.input?.value || '').trim();
  if (!v) {
    el.textPreview.classList.add('empty');
    el.textPreview.textContent = '输入内容会在这里预览（过长可点击展开）';
    return;
  }
  el.textPreview.classList.remove('empty');
  el.textPreview.textContent = v;
}

function getInputChineseUniqueInOrder() {
  const t = String(el.input?.value || currentText || '');
  const seen = new Set();
  const out = [];
  for (const ch of Array.from(t)) {
    if (!isChineseChar(ch) || seen.has(ch)) continue;
    seen.add(ch);
    out.push(ch);
  }
  return out;
}

// =============== localStorage helpers ===============
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

/** 导出/截图前等待字体与连续两帧布局，避免量错位置 */
async function waitFontsAndDoubleRaf() {
  if (document.fonts?.ready) {
    try { await document.fonts.ready; } catch {}
  }
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
}

function normalizeCustomMap(m) {
  if (!m || typeof m !== 'object') return { radical: {}, stroke: {}, shared: {}, unified: {} };
  return {
    radical: m.radical && typeof m.radical === 'object' ? m.radical : {},
    stroke: m.stroke && typeof m.stroke === 'object' ? m.stroke : {},
    shared: m.shared && typeof m.shared === 'object' ? m.shared : {},
    unified: m.unified && typeof m.unified === 'object' ? m.unified : {},
  };
}
function loadCustomPartMap() {
  const raw = loadJSON(K.CUSTOM_PART, null);
  return normalizeCustomMap(raw);
}
function saveCustomPartMap(m) {
  saveJSON(K.CUSTOM_PART, normalizeCustomMap(m));
}
function countSharedRefs(m, sid) {
  const tag = `@${sid}`;
  let c = 0;
  for (const mode of ['radical', 'stroke', 'unified']) {
    const br = m[mode] || {};
    for (const ch of Object.keys(br)) {
      const o = br[ch] || {};
      for (const idx of Object.keys(o)) if (o[idx] === tag) c += 1;
    }
  }
  return c;
}
function removeSharedIfOrphan(m, sid) {
  if (!sid || !m.shared || !m.shared[sid]) return;
  if (countSharedRefs(m, sid) <= 0) delete m.shared[sid];
}
function nextCustomSharedId(m) {
  let max = 0;
  for (const k of Object.keys(m.shared || {})) {
    const mm = /^sat(\d+)$/.exec(k);
    if (mm) max = Math.max(max, parseInt(mm[1], 10));
  }
  return `sat${max + 1}`;
}
function resolveCustomStoredImage(m, v) {
  if (typeof v !== 'string') return '';
  if (v.startsWith('@')) {
    const ent = (m.shared || {})[v.slice(1)];
    return ent && typeof ent.dataUrl === 'string' && ent.dataUrl.startsWith('data:image') ? ent.dataUrl : '';
  }
  return v.startsWith('data:image') ? v : '';
}
function getCustomPartDataUrl(mode, ch, idx0) {
  const m = loadCustomPartMap();
  const idx = String(idx0);
  const uval = (m.unified?.[ch] || {})[idx];
  const fromUnified = resolveCustomStoredImage(m, uval);
  if (fromUnified) return fromUnified;
  const branch = m[mode] || {};
  const v = (branch[ch] || {})[idx] || '';
  return resolveCustomStoredImage(m, v);
}

/** Slot indices that have custom unified/shared uploads (sorted). Drives stage layout when non-null. */
function getUnifiedSlotIndicesWithContent(m, ch) {
  const u = m.unified?.[ch];
  if (!u || typeof u !== 'object') return null;
  const keys = Object.keys(u)
    .filter((k) => u[k] != null && String(u[k]).trim() !== '')
    .map(Number)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
  return keys.length ? keys : null;
}
function setUnifiedCustomPartDataUrl(ch, idx0, dataUrl) {
  const m = loadCustomPartMap();
  if (!m.unified) m.unified = {};
  const k = String(idx0);
  const oldVal = m.unified[ch]?.[k];
  if (oldVal !== undefined) {
    delete m.unified[ch][k];
    if (typeof oldVal === 'string' && oldVal.startsWith('@')) removeSharedIfOrphan(m, oldVal.slice(1));
  }
  if (dataUrl) {
    if (!m.unified[ch]) m.unified[ch] = {};
    m.unified[ch][k] = dataUrl;
  }
  if (m.unified[ch] && !Object.keys(m.unified[ch]).length) delete m.unified[ch];
  saveCustomPartMap(m);
}
function setCustomPartDataUrl(mode, ch, idx0, dataUrl) {
  const m = loadCustomPartMap();
  if (!m[mode]) m[mode] = {};
  const k = String(idx0);
  const oldVal = m[mode][ch]?.[k];
  if (oldVal !== undefined) {
    delete m[mode][ch][k];
    if (typeof oldVal === 'string' && oldVal.startsWith('@')) removeSharedIfOrphan(m, oldVal.slice(1));
  }
  if (dataUrl) {
    if (!m[mode][ch]) m[mode][ch] = {};
    m[mode][ch][k] = dataUrl;
  }
  if (m[mode][ch] && !Object.keys(m[mode][ch]).length) delete m[mode][ch];
  saveCustomPartMap(m);
}
function bindSharedCustomPart(slotIdx0, chars, dataUrl, alias) {
  const m = loadCustomPartMap();
  const sid = nextCustomSharedId(m);
  if (!m.shared) m.shared = {};
  m.shared[sid] = {
    dataUrl,
    alias: String(alias || sid).trim() || sid,
    chars: chars.slice(),
  };
  const k = String(slotIdx0);
  if (!m.unified) m.unified = {};
  for (const ch of chars) {
    const oldVal = m.unified[ch]?.[k];
    if (oldVal !== undefined) {
      delete m.unified[ch][k];
      if (typeof oldVal === 'string' && oldVal.startsWith('@')) removeSharedIfOrphan(m, oldVal.slice(1));
    }
    if (!m.unified[ch]) m.unified[ch] = {};
    m.unified[ch][k] = `@${sid}`;
  }
  saveCustomPartMap(m);
  return sid;
}
function clearAllCustomParts() {
  saveCustomPartMap({ radical: {}, stroke: {}, shared: {}, unified: {} });
}

async function loadAssets() {
  try {
    const resp = await fetch(apiUrl('/api/assets'));
    const data = await resp.json();
    if (data?.ok && Array.isArray(data.files)) assetList = data.files;
  } catch {
    assetList = [];
  }
}

function normalizeAssetName(name) {
  return decodeURIComponent(String(name || ''))
    .replace(/\.[^.]+$/, '')
    .replace(/[_\-\s]+/g, '')
    .toLowerCase();
}

function hasAll(name, parts) {
  return parts.every((p) => name.includes(p));
}

function isTemplateAssetName(name) {
  const n = normalizeAssetName(name);
  return (
    (n.includes('单字') && (n.includes('方格') || n.includes('田字格') || n.includes('线条'))) ||
    (n.includes('方格') || n.includes('田字格') || n.includes('线条'))
  );
}

function isLikelyStrokeAssetName(name) {
  const n = normalizeAssetName(name);
  return n.includes('笔画') || n.includes('stroke');
}

async function urlToDataUrl(url) {
  const resp = await fetch(url);
  const blob = await resp.blob();
  return await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result || ''));
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

async function applyBuiltinRadicalStylesIfEmpty() {
  const exists = loadRadicalStyles();
  if (Object.keys(exists).length) return;
  const candidates = assetList.filter((a) => !isTemplateAssetName(a?.name) && !isLikelyStrokeAssetName(a?.name));
  const map = {};
  for (const item of candidates) {
    const raw = String(item?.name || '').replace(/\.[^.]+$/, '');
    const key = normalizeRadical(raw);
    if (!isAllowedRadical(key)) continue;
    try {
      map[key] = await urlToDataUrl(item.url);
    } catch {}
  }
  if (Object.keys(map).length) saveRadicalStyles(map);
}

function renderLineGalleries() {
  renderRegularReuseGallery();
}

function renderRegularReuseGallery() {
  const root = el.regularReuseGallery;
  if (!root) return;
  root.innerHTML = '';
  let list = assetList.filter((a) => {
    if (isTemplateAssetName(a?.name)) return false;
    const raw = String(a?.name || '').replace(/\.[^.]+$/, '').trim();
    const key = normalizeRadical(raw.slice(0, 1));
    return isAllowedRadical(key);
  });
  if (!list.length) list = assetList.filter((a) => !isTemplateAssetName(a?.name));
  for (const item of list.slice(0, 48)) {
    const d = document.createElement('div');
    d.className = 'line-item';
    d.style.backgroundImage = `url("${item.url}")`;
    d.title = item.name || '线稿';
    d.dataset.assetUrl = item.url;
    root.appendChild(d);
  }
  const rmap = loadRadicalStyles();
  for (const key of Object.keys(rmap)) {
    const url = rmap[key];
    if (typeof url !== 'string' || !url.startsWith('data:image')) continue;
    const d = document.createElement('div');
    d.className = 'line-item';
    d.style.backgroundImage = `url("${url}")`;
    d.title = `已上传部首 ${key}`;
    d.dataset.reuseRad = key;
    d.dataset.dataUrl = url;
    root.appendChild(d);
  }
  const smap = loadStrokeStyles();
  for (const s of STROKES_32) {
    const url = smap[s];
    if (!url) continue;
    const d = document.createElement('div');
    d.className = 'line-item';
    d.style.backgroundImage = `url("${url}")`;
    d.title = `${s} ${STROKE_NAME[s] || '笔画'}`;
    d.dataset.reuseStr = s;
    d.dataset.dataUrl = url;
    root.appendChild(d);
  }
}

function getTemplateBackground(tpl) {
  if (!assetList.length) return '';
  const single = copyChars().length <= 1;
  const files = assetList.map((a) => ({ ...a, n: normalizeAssetName(a.name) }));
  const pickByParts = (parts, excludeSingle = false) => {
    const hit = files.find((f) => hasAll(f.n, parts) && (!excludeSingle || !f.n.includes('单字')));
    return hit?.url || '';
  };
  const map = single
    ? {
        tian: pickByParts(['单字', '田字格']),
        square: pickByParts(['单字', '方格']),
        lines: pickByParts(['单字', '线条']),
        blank: '',
        huigong: pickByParts(['单字', '方格']),
      }
    : {
        tian: pickByParts(['田字格'], true),
        square: pickByParts(['方格'], true),
        lines: pickByParts(['线条'], true),
        blank: '',
        huigong: pickByParts(['方格'], true),
      };
  return map[tpl] || '';
}

function refreshCopybookStageOverlay() {
  const o = el.copybookGridOverlay;
  if (!o) return;
  o.innerHTML = '';
  if (!copyTpl || copyTpl === 'none' || copyTpl === 'blank') {
    o.setAttribute('aria-hidden', 'true');
    return;
  }
  const bgUrl = getTemplateBackground(copyTpl);
  if (bgUrl) {
    o.setAttribute('aria-hidden', 'true');
    return;
  }
  o.setAttribute('aria-hidden', 'false');
  const n = countForCopybook();
  if (copyTpl === 'lines') {
    const wrap = document.createElement('div');
    wrap.className = 'copy-lines-stage';
    for (let i = 0; i < n; i++) {
      const line = document.createElement('div');
      line.className = 'copy-line-stage';
      wrap.appendChild(line);
    }
    o.appendChild(wrap);
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'copy-grid-stage';
  for (let i = 0; i < n; i++) {
    const cell = document.createElement('div');
    cell.className = 'copy-cell-stage';
    if (copyTpl === 'tian' || copyTpl === 'huigong') drawCellLines(copyTpl, cell);
    if (copyTpl === 'square') {
      cell.style.border = '1px solid rgba(148,163,184,0.9)';
      cell.style.borderRadius = '8px';
    }
    grid.appendChild(cell);
  }
  o.appendChild(grid);
}

function applyTemplateToStage() {
  if (!el.charContainer) return;
  if (!copyTpl || copyTpl === 'none') {
    el.charContainer.style.backgroundImage = '';
    el.charContainer.style.background = 'linear-gradient(180deg, #f7fbff, #ffffff)';
    refreshCopybookStageOverlay();
    return;
  }
  const bg = getTemplateBackground(copyTpl);
  if (bg) {
    el.charContainer.style.backgroundImage = `url("${bg}")`;
    el.charContainer.style.backgroundSize = 'cover';
    el.charContainer.style.backgroundPosition = 'center';
  } else {
    el.charContainer.style.backgroundImage = '';
    el.charContainer.style.background = 'linear-gradient(180deg, #f7fbff, #ffffff)';
  }
  refreshCopybookStageOverlay();
}

function setCopyTpl(tpl) {
  let t = tpl || 'none';
  if (t === 'blank') t = 'none';
  copyTpl = t;
  document.querySelectorAll('.copy-tpl-opt').forEach((b) => {
    if (!(b instanceof HTMLElement)) return;
    b.classList.toggle('active', b.dataset.tpl === copyTpl);
  });
  applyTemplateToStage();
}

function pushTextHistory(text) {
  const t = String(text || '').trim();
  if (!t) return;
  const list = loadJSON(K.TEXT_HISTORY, []);
  const next = [t, ...list.filter((x) => x !== t)].slice(0, 80);
  saveJSON(K.TEXT_HISTORY, next);
}

function renderTextHistory() {
  if (!el.textHistoryList) return;
  const list = loadJSON(K.TEXT_HISTORY, []);
  el.textHistoryList.innerHTML = '';
  for (const item of list) {
    const d = document.createElement('div');
    d.className = 'history-item';
    d.textContent = item;
    d.title = item;
    d.dataset.text = item;
    el.textHistoryList.appendChild(d);
  }
}

// =============== font ===============
function applyFontFamily(value) {
  const v = String(value || '').trim();
  if (!v) {
    document.documentElement.style.removeProperty('--app-font');
    return;
  }
  const stack = v.includes(',') ? v : `"${v}"`;
  document.documentElement.style.setProperty('--app-font', `${stack}, "Microsoft YaHei", sans-serif`);
}

function initFont() {
  const saved = (localStorage.getItem(K.FONT) || '').trim();
  if (el.fontInput) el.fontInput.value = saved;
  if (saved) applyFontFamily(saved);
  el.btnFontApply?.addEventListener('click', () => {
    const v = String(el.fontInput?.value || '').trim();
    try { localStorage.setItem(K.FONT, v); } catch {}
    applyFontFamily(v);
    if (splitMode || gestureSplitHold) generateSplit(currentText);
  });
}

// =============== camera float drag/resize persist ===============
function saveCameraState() {
  if (!el.cameraFloat) return;
  const r = el.cameraFloat.getBoundingClientRect();
  saveJSON(K.CAMERA, { left: r.left, top: r.top, width: r.width, height: r.height });
}
function applyCameraState() {
  if (!el.cameraFloat) return;
  const s = loadJSON(K.CAMERA, null);
  if (!s) return;
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const h = typeof window !== 'undefined' ? window.innerHeight : 800;
  if (typeof s.left === 'number' && typeof s.top === 'number') {
    const fw = typeof s.width === 'number' ? s.width : 320;
    const fh = typeof s.height === 'number' ? s.height : 210;
    const cx = s.left + fw / 2;
    const cy = s.top + fh / 2;
    const off = cx < -80 || cy < -80 || cx > w + 80 || cy > h + 80;
    if (off) {
      try { localStorage.removeItem(K.CAMERA); } catch {}
      el.cameraFloat.style.left = '';
      el.cameraFloat.style.top = '';
      el.cameraFloat.style.right = '';
      return;
    }
    el.cameraFloat.style.left = `${s.left}px`;
    el.cameraFloat.style.top = `${s.top}px`;
    el.cameraFloat.style.right = 'auto';
  }
  if (typeof s.width === 'number') el.cameraFloat.style.width = `${s.width}px`;
  if (typeof s.height === 'number') el.cameraFloat.style.height = `${s.height}px`;
}
function enableCameraDrag() {
  if (!el.cameraFloat || !el.cameraHeader) return;
  let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
  el.cameraHeader.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    el.cameraHeader.setPointerCapture(e.pointerId);
    const r = el.cameraFloat.getBoundingClientRect();
    sx = e.clientX; sy = e.clientY;
    sl = r.left; st = r.top;
    el.cameraFloat.style.left = `${r.left}px`;
    el.cameraFloat.style.top = `${r.top}px`;
    el.cameraFloat.style.right = 'auto';
  });
  el.cameraHeader.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    el.cameraFloat.style.left = `${sl + dx}px`;
    el.cameraFloat.style.top = `${st + dy}px`;
  });
  const end = (e) => {
    if (!dragging) return;
    dragging = false;
    try { el.cameraHeader.releasePointerCapture(e.pointerId); } catch {}
    saveCameraState();
  };
  el.cameraHeader.addEventListener('pointerup', end);
  el.cameraHeader.addEventListener('pointercancel', end);

  const ro = new ResizeObserver(saveCameraState);
  ro.observe(el.cameraFloat);

  window.addEventListener('resize', () => applyCameraState());
}

// =============== frequency (common chars) ===============
const DEFAULT_COMMON = ['福', '春', '喜', '囍', '和', '富', '年', '好'];
function bumpFreq(ch) {
  const m = loadJSON(K.FREQ, {});
  m[ch] = (Number(m[ch]) || 0) + 1;
  saveJSON(K.FREQ, m);
}
function renderCommonChars() {
  if (!el.presetChars) return;
  const m = loadJSON(K.FREQ, {});
  for (const c of DEFAULT_COMMON) if (m[c] == null) m[c] = 0;
  const items = Object.entries(m)
    .filter(([c]) => typeof c === 'string' && c.length === 1)
    .sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0))
    .map(([c]) => c);
  el.presetChars.innerHTML = '';
  for (const c of items) {
    const b = document.createElement('button');
    b.className = 'chip';
    b.type = 'button';
    b.textContent = c;
    b.dataset.char = c;
    el.presetChars.appendChild(b);
  }
}

// =============== radical lists (201+99, simplified-focused) ===============
const RADICALS_MAIN_201_RAW = `一 (横) 丨 (竖) 丶 (点) 丿 (撇) 乙 (折) 二 (二) 亠 (京字头) 人 (人) 儿 (儿) 入 (入) 八 (八) 冂 (同字框) 冖 (秃宝盖) 冫 (两点水) 几 (几) 凵 (凶字框) 刀 (刀) 力 (力) 勹 (包字头) 匕 (匕) 匚 (三框) 十 (十) 卜 (卜) 卩 (单耳旁) 厂 (厂字头) 厶 (厶) 又 (又) 口 (口) 囗 (国字框) 土 (土) 士 (士) 夂 (折文) 夊 (夊) 夕 (夕) 大 (大) 女 (女) 子 (子) 宀 (宝盖头) 寸 (寸) 小 (小) 尢 (尤字旁) 尸 (尸) 屮 (屮) 山 (山) 川 (川) 工 (工) 己 (己) 巾 (巾) 干 (干) 幺 (幺) 广 (广字头) 廴 (建之旁) 廾 (弄字底) 弋 (弋) 弓 (弓) 彐 (彐) 彡 (三撇) 彳 (双人旁) 心 (心) 戈 (戈) 户 (户) 手 (手) 支 (支) 攵 (反文) 文 (文) 斗 (斗) 斤 (斤) 方 (方) 无 (无) 日 (日) 曰 (曰) 月 (月) 木 (木) 欠 (欠) 止 (止) 歹 (歹) 殳 (殳) 比 (比) 毛 (毛) 氏 (氏) 气 (气) 水 (水) 火 (火) 爪 (爪) 父 (父) 爻 (爻) 爿 (爿) 片 (片) 牙 (牙) 牛 (牛) 犬 (犬) 玄 (玄) 玉 (玉) 瓜 (瓜) 瓦 (瓦) 甘 (甘) 生 (生) 用 (用) 田 (田) 疋 (疋) 疒 (病字头) 癶 (登字头) 白 (白) 皮 (皮) 皿 (皿) 目 (目) 矛 (矛) 矢 (矢) 石 (石) 示 (示) 禸 (禸) 禾 (禾) 穴 (穴宝盖) 立 (立) 竹 (竹) 米 (米) 糸 (糸→繁体，简体：纟) 缶 (缶) 网 (网) 羊 (羊) 羽 (羽) 老 (老) 而 (而) 耒 (耒) 耳 (耳) 聿 (聿) 肉 (肉) 臣 (臣) 自 (自) 至 (至) 臼 (臼) 舌 (舌) 舛 (舛) 舟 (舟) 色 (色) 艸 (艸→繁体，简体：艹) 虫 (虫) 血 (血) 行 (行) 衣 (衣) 襾 (襾) 见 (见→繁：見) 角 (角) 言 (言→繁：言，简体：讠) 谷 (谷) 豆 (豆) 豕 (豕) 豸 (豸) 贝 (贝→繁：貝) 赤 (赤) 走 (走) 足 (足) 身 (身) 车 (车→繁：車) 辛 (辛) 辰 (辰) 辶 (走之底→繁：辵) 邑 (邑) 酉 (酉) 釆 (釆) 里 (里) 金 (金→简体：钅) 长 (长→繁：長) 门 (门→繁：門) 阜 (阜) 隶 (隶) 隹 (隹) 雨 (雨) 青 (青) 非 (非) 面 (面) 革 (革) 韦 (韦→繁：韋) 音 (音) 页 (页→繁：頁) 风 (风→繁：風) 飞 (飞→繁：飛) 食 (食→简体：饣) 首 (首) 香 (香) 马 (马→繁：馬) 骨 (骨) 高 (高) 髟 (髟) 斗 (斗→繁：鬥) 鬯 (鬯) 鬲 (鬲) 鬼 (鬼) 鱼 (鱼→繁：魚) 鸟 (鸟→繁：鳥) 卤 (卤→繁：鹵) 鹿 (鹿) 麦 (麦→繁：麥) 麻 (麻) 黄 (黄→繁：黃) 黍 (黍) 黑 (黑) 黹 (黹) 黾 (黾→繁：黽) 鼎 (鼎) 鼓 (鼓)`;
const RADICALS_AFFIX_99_RAW = `丿 (撇) 乛 (横钩) 亻 (单人旁) 勹 (包字头) 冂 (同字框) 冖 (秃宝盖) 冫 (两点水) 刂 (立刀旁) 匚 (三框) 卩 (单耳旁) 阝 (双耳旁) 厶 (厶) 囗 (国字框) 土 (土) 艹 (草字头) 屮 (屮) 巛 (巛) 巾 (巾) 彳 (双人旁) 彡 (三撇) 扌 (提手旁) 攵 (反文) 斤 (斤) 方 (方) 无 (无) 日 (日) 曰 (曰) 月 (月) 木 (木) 欠 (欠) 止 (止) 歹 (歹) 殳 (殳) 比 (比) 毛 (毛) 氏 (氏) 气 (气) 氵 (三点水) 灬 (四点底) 爫 (爪字头) 父 (父) 爻 (爻) 爿 (爿) 片 (片) 牙 (牙) 牜 (牛字旁) 犭 (反犬旁) 玄 (玄) 王 (王字旁) 瓜 (瓜) 瓦 (瓦) 甘 (甘) 生 (生) 用 (用) 田 (田) 疋 (疋) 疒 (病字头) 癶 (登字头) 白 (白) 皮 (皮) 皿 (皿) 目 (目) 矛 (矛) 矢 (矢) 石 (石) 礻 (示字旁) 禸 (禸) 禾 (禾) 穴 (穴宝盖) 立 (立) 竹 (竹) 米 (米) 纟 (绞丝旁→繁：糹) 缶 (缶) 罒 (四字头) 羊 (羊) 羽 (羽) 老 (老) 而 (而) 耒 (耒) 耳 (耳) 聿 (聿) 肉 (肉) 臣 (臣) 自 (自) 至 (至) 臼 (臼) 舌 (舌) 舛 (舛) 舟 (舟) 色 (色) 虫 (虫) 血 (血) 行 (行) 衤 (衣字旁) 襾 (襾) 见 (见→繁：見) 角 (角) 讠 (言字旁→繁：訁)`;


function parseRadicalPairs(raw) {
  const res = [];
  const re = /(\S)\s*\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(raw))) {
    const rawRad = m[1];
    const body = m[2];
    const name = body.split('→')[0].split('，')[0].trim();
    let simp = rawRad;
    let trad = '';
    const simpMatch = body.match(/简体：([^\s，)]+)/);
    if (simpMatch) simp = simpMatch[1].trim();
    const tradMatch = body.match(/繁：([^\s，)]+)/);
    if (tradMatch) trad = tradMatch[1].trim();
    else if (body.includes('→繁')) trad = rawRad;
    const fallbackTrad = {
      '纟': '糹', '艹': '艸', '见': '見', '贝': '貝', '车': '車', '门': '門',
      '页': '頁', '风': '風', '飞': '飛', '马': '馬', '鱼': '魚', '鸟': '鳥',
      '卤': '鹵', '麦': '麥', '黄': '黃', '黾': '黽', '斗': '鬥', '辶': '辵',
      '讠': '訁', '钅': '金', '饣': '食',
    };
    if (!trad && fallbackTrad[simp]) trad = fallbackTrad[simp];
    res.push({ radical: simp, name, trad });
  }
  return res;
}

const RADICALS_MAIN_201 = parseRadicalPairs(RADICALS_MAIN_201_RAW);
const RADICALS_AFFIX_99 = parseRadicalPairs(RADICALS_AFFIX_99_RAW);

const RADICAL_NAME = new Map();
const RADICAL_TRAD = new Map();
for (const x of RADICALS_MAIN_201) { RADICAL_NAME.set(x.radical, x.name); if (x.trad) RADICAL_TRAD.set(x.radical, x.trad); }
for (const x of RADICALS_AFFIX_99) { RADICAL_NAME.set(x.radical, x.name); if (x.trad) RADICAL_TRAD.set(x.radical, x.trad); }

function isAllowedRadical(r) {
  return !!r && RADICAL_NAME.has(r);
}

/** 部首模式：表内偏旁 + 模型常返回的整字结构部件（如 别→另+刂） */
function isValidRadicalModePart(r) {
  const s = String(r || '').trim();
  if (!s) return false;
  if ([...s].length !== 1) return false;
  if (isAllowedRadical(s) || s === '阝') return true;
  return isChineseChar(s);
}

const STROKES_32 = [
  '丶','一','丨','丿','㇏','㇀','𠃍','㇇','乛','𠃌','㇊','㇍','㇅','⺄','㇈','㇌',
  '㇋','𠄎','㇎','𠄌','𠃊','亅','㇄','乚','ㄣ','㇉','ㄑ','𠃋','㇁','㇂','㇃'
];
const STROKE_NAME = {
  '丶':'点','一':'横','丨':'竖','丿':'撇','㇏':'捺','㇀':'提','𠃍':'横折','㇇':'横撇',
  '乛':'横钩','𠃌':'横折钩','㇊':'横折提','㇍':'横折弯','㇅':'横折折','⺄':'横斜钩',
  '㇈':'横折弯钩','㇌':'横撇弯钩','㇋':'横折折撇','𠄎':'横折折折钩','㇎':'横折折折',
  '𠄌':'竖提','𠃊':'竖折','亅':'竖钩','㇄':'竖弯','乚':'竖弯钩','ㄣ':'竖折撇',
  '㇉':'竖折折','ㄑ':'撇点','𠃋':'撇折','㇁':'弯钩','㇂':'斜钩','㇃':'卧钩'
};

function normalizeRadical(r) {
  const s = String(r || '').trim();
  if (!s) return s;
  const map = {
    '訁': '讠', '言': '讠',
    '糹': '纟', '糸': '纟',
    '艸': '艹',
    '見': '见',
    '貝': '贝',
    '車': '车',
    '門': '门',
    '頁': '页',
    '馬': '马',
    '魚': '鱼',
    '鳥': '鸟',
    '風': '风',
    '飛': '飞',
    '長': '长',
    '韋': '韦',
    '戶': '户',
    '辵': '辶',
    '犭': '犬',
    '牜': '牛',
  };
  return map[s] || s;
}

function normalizeStroke(s) {
  const raw = String(s || '').trim();
  if (!raw) return raw;
  const byName = {
    '点': '丶', '横': '一', '竖': '丨', '撇': '丿', '捺': '㇏', '提': '㇀',
    '横折': '𠃍', '横撇': '㇇', '横钩': '乛', '横折钩': '𠃌', '横折提': '㇊',
    '横折弯': '㇍', '横折折': '㇅', '横斜钩': '⺄', '横折弯钩': '㇈',
    '横撇弯钩': '㇌', '横折折撇': '㇋', '横折折折钩': '𠄎', '横折折折': '㇎',
    '竖提': '𠄌', '竖折': '𠃊', '竖钩': '亅', '竖弯': '㇄', '竖弯钩': '乚',
    '竖折撇': 'ㄣ', '竖折折': '㇉', '撇点': 'ㄑ', '撇折': '𠃋', '弯钩': '㇁',
    '斜钩': '㇂', '卧钩': '㇃',
  };
  return byName[raw] || raw;
}

function renderRadicals() {
  const render = (root, list) => {
    if (!root) return;
    root.innerHTML = '';
    for (const item of list) {
      const d = document.createElement('div');
      d.className = 'radical';
      d.textContent = item.radical;
      d.dataset.radical = item.radical;
      d.dataset.name = item.name;
      root.appendChild(d);
    }
  };
  render(el.radicalGridMain, RADICALS_MAIN_201);
  render(el.radicalGridAffix, RADICALS_AFFIX_99);
}

function highlightRadicals(parts) {
  const expanded = [];
  for (const p of (parts || [])) {
    const raw = String(p || '').trim();
    if (!raw) continue;
    expanded.push(normalizeRadical(raw), raw);
  }
  const set = new Set(expanded.filter(Boolean));

  const paint = (root) => {
    if (!root) return;
    root.querySelectorAll('[data-radical]').forEach((n) => {
      const r = n.getAttribute('data-radical');
      if (!r) return;
      n.classList.toggle('hit', set.has(r));
    });
  };
  paint(el.radicalGridMain);
  paint(el.radicalGridAffix);

  // detected tags
  if (el.detectedRadicals) {
    const shown = [];
    const seen = new Set();
    for (const r of set) {
      if (!RADICAL_NAME.has(r) || seen.has(r)) continue;
      seen.add(r);
      shown.push({ radical: r, name: RADICAL_NAME.get(r) });
    }
    el.detectedRadicals.innerHTML = '';
    for (const item of shown.slice(0, 18)) {
      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.innerHTML = `<span>${item.radical}</span><span class="tag-name">(${item.name})</span>`;
      el.detectedRadicals.appendChild(tag);
    }
  }
}

function renderUploadedPartsInto(root) {
  if (!root) return;
  const m = loadCustomPartMap();
  const unified = m.unified || {};
  const shared = m.shared || {};
  const charKeys = Object.keys(unified).filter((ch) => unified[ch] && Object.keys(unified[ch]).length);
  if (!charKeys.length) {
    root.innerHTML = '<span class="custom-status">暂无已上传拆解图</span>';
    return;
  }
  const wrap = document.createElement('div');
  wrap.className = 'uploaded-parts-wrap';
  charKeys.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN')).forEach((ch) => {
    const slots = unified[ch];
    const row = document.createElement('div');
    row.className = 'uploaded-char-row';
    const lab = document.createElement('span');
    lab.className = 'uploaded-char-label';
    lab.textContent = ch;
    const thumbs = document.createElement('div');
    thumbs.className = 'uploaded-thumbs';
    Object.keys(slots).sort((a, b) => Number(a) - Number(b)).forEach((idx) => {
      const val = slots[idx];
      let url = '';
      if (typeof val === 'string' && val.startsWith('@')) {
        const ent = shared[val.slice(1)];
        url = ent && typeof ent.dataUrl === 'string' ? ent.dataUrl : '';
      } else if (typeof val === 'string' && val.startsWith('data:')) url = val;
      if (!url) return;
      const im = document.createElement('div');
      im.className = 'uploaded-thumb';
      im.style.backgroundImage = `url("${url}")`;
      im.title = `${ch} · 槽位 ${Number(idx) + 1}`;
      thumbs.appendChild(im);
    });
    row.appendChild(lab);
    row.appendChild(thumbs);
    wrap.appendChild(row);
  });
  root.innerHTML = '';
  root.appendChild(wrap);
}

function renderUploadedPartsSummary() {
  renderUploadedPartsInto(el.customPartsSummary);
  renderUploadedPartsInto(el.customModalPartsGallery);
}

function renderStrokeGrid() {
  if (!el.strokeGridBase) return;
  el.strokeGridBase.innerHTML = '';
  for (const s of STROKES_32) {
    const d = document.createElement('div');
    d.className = 'radical';
    d.textContent = s;
    d.dataset.stroke = s;
    d.dataset.name = STROKE_NAME[s] || '笔画';
    d.title = STROKE_NAME[s] || s;
    el.strokeGridBase.appendChild(d);
  }
  if (el.strokeGridBase.dataset.boundClick !== '1') {
    el.strokeGridBase.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      const s = t.getAttribute('data-stroke');
      if (!s) return;
      pickedStroke = s;
      showTooltip(`${s}（${STROKE_NAME[s] || '笔画'}）`, e.clientX + 10, e.clientY + 10);
      window.clearTimeout(attachRadicalTooltip._timer);
      attachRadicalTooltip._timer = window.setTimeout(hideTooltip, 1500);
    });
    el.strokeGridBase.dataset.boundClick = '1';
  }
}

function highlightStrokes(parts) {
  const set = new Set((parts || []).map(String));
  if (el.strokeGridBase) {
    el.strokeGridBase.querySelectorAll('[data-stroke]').forEach((n) => {
      const s = n.getAttribute('data-stroke');
      n.classList.toggle('hit', !!s && set.has(s));
    });
  }
  if (el.detectedStrokes) {
    el.detectedStrokes.innerHTML = '';
    const used = Array.from(set).filter((s) => STROKES_32.includes(s));
    for (const s of used.slice(0, 24)) {
      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.innerHTML = `<span>${s}</span><span class="tag-name">(${STROKE_NAME[s] || '笔画'})</span>`;
      el.detectedStrokes.appendChild(tag);
    }
  }
}

function showTooltip(text, x, y) {
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'radical-tooltip';
    document.body.appendChild(tooltipEl);
  }
  tooltipEl.textContent = text;
  const pad = 12;
  tooltipEl.style.left = `${Math.min(window.innerWidth - pad, Math.max(pad, x))}px`;
  tooltipEl.style.top = `${Math.min(window.innerHeight - pad, Math.max(pad, y))}px`;
  tooltipEl.style.display = 'block';
}
function hideTooltip() {
  if (tooltipEl) tooltipEl.style.display = 'none';
}

function setPickedRadical(r) {
  pickedRadical = r || '';
  if (el.pickedRadical) el.pickedRadical.textContent = pickedRadical || '未选择';
}

function attachRadicalTooltip(root) {
  if (!root) return;
  root.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const r = t.getAttribute('data-radical');
    const name = t.getAttribute('data-name') || (r ? RADICAL_NAME.get(r) : '');
    if (!r || !name) return;
    setPickedRadical(r);
    const trad = RADICAL_TRAD.get(r) || '';
    const info = trad ? `${r} / ${trad}（${name}）` : `${r}（${name}）`;
    showTooltip(info, e.clientX + 10, e.clientY + 10);
    window.clearTimeout(attachRadicalTooltip._timer);
    attachRadicalTooltip._timer = window.setTimeout(hideTooltip, 1500);
  });
}
attachRadicalTooltip._timer = 0;

// =============== radical style upload (png <=200, transparent) ===============
function loadRadicalStyles() { return loadJSON(K.RADICAL_STYLE, {}); }
function saveRadicalStyles(map) { saveJSON(K.RADICAL_STYLE, map); }
function getRadicalStyleDataUrl(radical) {
  const map = loadRadicalStyles();
  const v = map[radical];
  return typeof v === 'string' && v.startsWith('data:image/png') ? v : '';
}
function setRadicalStyleDataUrl(radical, dataUrl) {
  const map = loadRadicalStyles();
  if (!dataUrl) delete map[radical];
  else map[radical] = dataUrl;
  saveRadicalStyles(map);
}
function clearAllRadicalStyles() { saveRadicalStyles({}); }

function loadStrokeStyles() { return loadJSON(K.STROKE_STYLE, {}); }
function saveStrokeStyles(map) { saveJSON(K.STROKE_STYLE, map); }
function getStrokeStyleDataUrl(stroke) {
  const map = loadStrokeStyles();
  const v = map[stroke];
  return typeof v === 'string' && v.startsWith('data:image/png') ? v : '';
}
function setStrokeStyleDataUrl(stroke, dataUrl) {
  const map = loadStrokeStyles();
  if (!dataUrl) delete map[stroke];
  else map[stroke] = dataUrl;
  saveStrokeStyles(map);
}
function clearAllStrokeStyles() { saveStrokeStyles({}); }

async function validatePngAndGetDataUrl(file) {
  if (!file) throw new Error('未选择文件');
  if (file.type !== 'image/png') throw new Error('仅支持 PNG');
  const buf = await file.arrayBuffer();
  const blob = new Blob([buf], { type: 'image/png' });
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    if (img.width > 200 || img.height > 200) throw new Error('图片尺寸需 ≤200×200');
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');
    if (!ctx) throw new Error('无法解析图片');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, img.width, img.height).data;
    let hasAlpha = false;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) { hasAlpha = true; break; }
    }
    if (!hasAlpha) throw new Error('需要透明底 PNG（含透明通道）');
    return c.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function syncRegularModalSubUI() {
  const rad = regularModalMode === 'radical';
  el.regularSubRadical?.classList.toggle('primary', rad);
  el.regularSubStroke?.classList.toggle('primary', !rad);
  if (el.regularRadicalBlock) el.regularRadicalBlock.style.display = rad ? '' : 'none';
  if (el.regularStrokeBlock) el.regularStrokeBlock.style.display = rad ? 'none' : '';
}

function renderRegularModalRadPicker() {
  const root = el.regularRadicalPicker;
  if (!root) return;
  root.innerHTML = '';
  for (const r of getAllRadicalsForPicker()) {
    const d = document.createElement('div');
    d.className = 'fix-rad';
    if (regModalRadPick === r) d.classList.add('on');
    d.textContent = r;
    d.dataset.rad = r;
    root.appendChild(d);
  }
  root.onclick = (e) => {
    const t = e.target && e.target.closest ? e.target.closest('[data-rad]') : null;
    if (!t) return;
    const r = t.getAttribute('data-rad');
    if (!r) return;
    regModalRadPick = r;
    if (el.regularPickedRadicalLabel) el.regularPickedRadicalLabel.textContent = r;
    renderRegularModalRadPicker();
  };
  if (el.regularPickedRadicalLabel) el.regularPickedRadicalLabel.textContent = regModalRadPick || '未选择';
}

function renderRegularModalStrPicker() {
  const root = el.regularStrokePicker;
  if (!root) return;
  root.innerHTML = '';
  for (const s of STROKES_32) {
    const d = document.createElement('div');
    d.className = 'fix-rad';
    if (regModalStrPick === s) d.classList.add('on');
    d.textContent = s;
    d.dataset.stk = s;
    d.title = STROKE_NAME[s] || s;
    root.appendChild(d);
  }
  root.onclick = (e) => {
    const t = e.target && e.target.closest ? e.target.closest('[data-stk]') : null;
    if (!t) return;
    const s = t.getAttribute('data-stk');
    if (!s) return;
    regModalStrPick = s;
    if (el.regularPickedStrokeLabel) {
      el.regularPickedStrokeLabel.textContent = `${s}（${STROKE_NAME[s] || '笔画'}）`;
    }
    renderRegularModalStrPicker();
  };
  if (el.regularPickedStrokeLabel) {
    el.regularPickedStrokeLabel.textContent = regModalStrPick
      ? `${regModalStrPick}（${STROKE_NAME[regModalStrPick] || '笔画'}）`
      : '未选择';
  }
}

function refreshRegularContextHint() {
  if (!el.regularContextHint) return;
  const uniq = getInputChineseUniqueInOrder();
  if (uniq.length <= 1) {
    el.regularContextHint.textContent = '单字或少字：先选「按偏旁部首」或「按笔画」，在列表中点选目标，再上传 PNG（可多选批量）。';
  } else {
    el.regularContextHint.textContent = `文稿中现有 ${uniq.length} 个不同汉字；部首/笔画线稿绑定后可在其他文稿中复用，右侧为线稿库。`;
  }
}

function initRegularUploadModal() {
  setPickedRadical('');
  el.btnOpenRegularUpload?.addEventListener('click', () => {
    refreshRegularContextHint();
    renderRegularReuseGallery();
    syncRegularModalSubUI();
    renderRegularModalRadPicker();
    renderRegularModalStrPicker();
    openOverlayEl(el.regularUploadOverlay);
  });
  el.btnRegularUploadClose?.addEventListener('click', () => closeOverlayEl(el.regularUploadOverlay));
  el.regularUploadOverlay?.addEventListener('click', (e) => {
    if (e.target === el.regularUploadOverlay) closeOverlayEl(el.regularUploadOverlay);
  });

  el.regularSubRadical?.addEventListener('click', () => {
    regularModalMode = 'radical';
    syncRegularModalSubUI();
  });
  el.regularSubStroke?.addEventListener('click', () => {
    regularModalMode = 'stroke';
    syncRegularModalSubUI();
  });

  el.btnRegularApply?.addEventListener('click', async () => {
    const files = Array.from(el.regularFileInput?.files || []);
    if (!files.length) return alert('请选择 PNG 文件');
    let ok = 0;
    if (regularModalMode === 'radical') {
      let firstConsumed = false;
      for (const f of files) {
        const nameKey = normalizeRadical(f.name.replace(/\.png$/i, '').trim());
        let key = '';
        if (isAllowedRadical(nameKey)) key = nameKey;
        else if (!firstConsumed && regModalRadPick) {
          key = regModalRadPick;
          firstConsumed = true;
        }
        if (!key) continue;
        try {
          const dataUrl = await validatePngAndGetDataUrl(f);
          setRadicalStyleDataUrl(key, dataUrl);
          ok += 1;
        } catch (e) {
          alert(e?.message || '图片校验失败');
          return;
        }
      }
      if (!ok) return alert('未能绑定：请点选部首，或使用「部首名.png」为文件命名');
    } else {
      if (!regModalStrPick) return alert('请先在笔画列表中点选一笔画');
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const nameKey = f.name.replace(/\.png$/i, '').trim();
        const key = STROKES_32.includes(nameKey) ? nameKey : (i === 0 ? regModalStrPick : STROKES_32[i]);
        if (!key) continue;
        try {
          const dataUrl = await validatePngAndGetDataUrl(f);
          setStrokeStyleDataUrl(key, dataUrl);
          ok += 1;
        } catch (e) {
          alert(e?.message || '图片校验失败');
          return;
        }
      }
      if (!ok) return alert('未能绑定笔画');
    }
    if (el.regularFileInput) el.regularFileInput.value = '';
    renderRegularReuseGallery();
    if (splitMode || gestureSplitHold) await generateSplit(currentText);
    alert(`已处理 ${ok} 个文件`);
  });

  el.btnRegularClearOne?.addEventListener('click', async () => {
    if (regularModalMode === 'radical') {
      if (!regModalRadPick) return alert('请先点选一个部首');
      setRadicalStyleDataUrl(regModalRadPick, '');
    } else {
      if (!regModalStrPick) return alert('请先点选一笔画');
      setStrokeStyleDataUrl(regModalStrPick, '');
    }
    renderRegularReuseGallery();
    if (splitMode || gestureSplitHold) await generateSplit(currentText);
  });
  el.btnRegularClearAllRad?.addEventListener('click', async () => {
    clearAllRadicalStyles();
    renderRegularReuseGallery();
    if (splitMode || gestureSplitHold) await generateSplit(currentText);
  });
  el.btnRegularClearAllStr?.addEventListener('click', async () => {
    clearAllStrokeStyles();
    renderRegularReuseGallery();
    if (splitMode || gestureSplitHold) await generateSplit(currentText);
  });

  el.regularReuseGallery?.addEventListener('click', async (e) => {
    const t = e.target instanceof HTMLElement ? e.target.closest('.line-item') : null;
    if (!t || !(t instanceof HTMLElement)) return;
    const assetUrl = t.dataset.assetUrl;
    const reuseRad = t.dataset.reuseRad;
    const reuseStr = t.dataset.reuseStr;
    const dataUrlDirect = t.dataset.dataUrl || '';
    try {
      if (regularModalMode === 'radical') {
        if (!regModalRadPick) return alert('请先在左侧点选一个部首');
        let dataUrl = '';
        if (assetUrl) dataUrl = await urlToDataUrl(assetUrl);
        else if (reuseRad && dataUrlDirect.startsWith('data:')) dataUrl = dataUrlDirect;
        else if (reuseStr && dataUrlDirect.startsWith('data:')) dataUrl = dataUrlDirect;
        if (!dataUrl) return;
        setRadicalStyleDataUrl(regModalRadPick, dataUrl);
      } else {
        if (!regModalStrPick) return alert('请先在左侧点选一笔画');
        let dataUrl = '';
        if (reuseStr && dataUrlDirect.startsWith('data:')) dataUrl = dataUrlDirect;
        else if (assetUrl) dataUrl = await urlToDataUrl(assetUrl);
        else if (reuseRad && dataUrlDirect.startsWith('data:')) dataUrl = dataUrlDirect;
        if (!dataUrl) return;
        setStrokeStyleDataUrl(regModalStrPick, dataUrl);
      }
      renderRegularReuseGallery();
      if (splitMode || gestureSplitHold) await generateSplit(currentText);
    } catch (err) {
      console.error(err);
    }
  });
}

function renderCustomUnifiedPick() {
  const root = el.customUnifiedSentencePick;
  if (!root) return;
  root.innerHTML = '';
  const uniq = getInputChineseUniqueInOrder();
  if (!uniq.length) {
    const s = document.createElement('span');
    s.className = 'custom-status';
    s.textContent = '请先在左侧输入汉字并点击「应用」。';
    root.appendChild(s);
    return;
  }
  for (const ch of uniq) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `sentence-char-chip${customUploadSelectedChars.has(ch) ? ' selected' : ''}`;
    b.textContent = ch;
    b.dataset.ch = ch;
    root.appendChild(b);
  }
}

function renderCustomUploadPickers() {
  renderCustomUnifiedPick();
}

function initCustomUploadModal() {
  el.btnOpenCustomUpload?.addEventListener('click', () => {
    renderCustomUploadPickers();
    renderUploadedPartsSummary();
    openOverlayEl(el.customUploadOverlay);
  });
  el.btnCustomUploadClose?.addEventListener('click', () => closeOverlayEl(el.customUploadOverlay));
  el.customUploadOverlay?.addEventListener('click', (e) => {
    if (e.target === el.customUploadOverlay) closeOverlayEl(el.customUploadOverlay);
  });

  el.customUnifiedSentencePick?.addEventListener('click', (e) => {
    const t = e.target instanceof HTMLElement ? e.target.closest('.sentence-char-chip') : null;
    if (!t || !t.dataset.ch) return;
    const ch = t.dataset.ch;
    if (customUploadSelectedChars.has(ch)) customUploadSelectedChars.delete(ch);
    else customUploadSelectedChars.add(ch);
    renderCustomUnifiedPick();
  });

  el.btnCustomSharedApply?.addEventListener('click', async () => {
    const chars = Array.from(customUploadSelectedChars).filter(isChineseChar);
    if (chars.length < 2) {
      return alert('公用组请在上方至少选择两个汉字；单字非公用请只选一字后使用②批量上传');
    }
    const alias = String(el.customCommonAlias?.value || '').trim();
    if (!alias) return alert('请填写共用组名（如 common1）');
    const slotStart = Math.max(0, Math.min(9, (Number(el.customSharedSlot?.value) || 1) - 1));
    const f = el.customSharedFile?.files?.[0];
    if (!f) return alert('请选择一张 PNG');
    if (!window.confirm(`所选 ${chars.length} 个字将共用同一拆解图（组名：${alias}）。请确认适合共用该线稿。`)) return;
    let dataUrl = '';
    try {
      dataUrl = await validatePngAndGetDataUrl(f);
    } catch (e) {
      return alert(e?.message || '图片校验失败');
    }
    bindSharedCustomPart(slotStart, chars, dataUrl, alias);
    if (el.customSharedFile) el.customSharedFile.value = '';
    await generateSplit(currentText);
    renderUploadedPartsSummary();
    alert('已建立公用组并绑定（内部 id：sat*）');
  });

  el.btnCustomBatchApply?.addEventListener('click', async () => {
    const files = Array.from(el.customBatchFiles?.files || []);
    if (!files.length) return alert('请选择 PNG 文件');
    const slotStart = Math.max(0, Math.min(9, (Number(el.customBatchSlot?.value) || 1) - 1));
    const sel = Array.from(customUploadSelectedChars).filter(isChineseChar);
    const batchCh = sel.length === 1 ? sel[0] : '';

    if (batchCh) {
      if (slotStart + files.length > 10) return alert('超出上限：每字最多 10 张（序号 1～10）');
      try {
        for (let i = 0; i < files.length; i++) {
          const dataUrl = await validatePngAndGetDataUrl(files[i]);
          setUnifiedCustomPartDataUrl(batchCh, slotStart + i, dataUrl);
        }
      } catch (e) {
        return alert(e?.message || '上传失败');
      }
    } else {
      if (sel.length > 1) return alert('非公用批量上传请只选一个字，或取消全部选择后用「汉字_序号.png」匹配');
      let ok = 0;
      for (const f of files) {
        const base = f.name.replace(/\.png$/i, '');
        const mm = base.match(/^(.+)_(\d+)$/);
        if (!mm) continue;
        const ch = Array.from(mm[1]).find(isChineseChar);
        const idx = parseInt(mm[2], 10) - 1;
        if (!ch || idx < 0 || idx > 9) continue;
        try {
          const dataUrl = await validatePngAndGetDataUrl(f);
          setUnifiedCustomPartDataUrl(ch, idx, dataUrl);
          ok += 1;
        } catch {}
      }
      if (!ok) {
        return alert('未能匹配：请在上方只选一个字再上传，或取消全部选择后用「汉字_序号.png」命名（序号 1～10）');
      }
    }

    if (el.customBatchFiles) el.customBatchFiles.value = '';
    await generateSplit(currentText);
    renderUploadedPartsSummary();
    alert('批量绑定完成');
  });

  el.btnCustomModalClearSlot?.addEventListener('click', async () => {
    const slotIdx = Math.max(0, Math.min(9, (Number(el.customClearSlot?.value) || 1) - 1));
    const chars = Array.from(customUploadSelectedChars).filter(isChineseChar);
    if (!chars.length) return alert('请先在上方选择要清除的汉字');
    for (const ch of chars) setUnifiedCustomPartDataUrl(ch, slotIdx, '');
    await generateSplit(currentText);
    renderUploadedPartsSummary();
  });

  el.btnCustomModalClearAll?.addEventListener('click', async () => {
    clearAllCustomParts();
    customUploadSelectedChars.clear();
    renderCustomUploadPickers();
    await generateSplit(currentText);
    renderUploadedPartsSummary();
    alert('已清空自定义拼装与共用组');
  });
}

// =============== corrections (local) ===============
function loadCorrections() { return loadJSON(K.CORRECTION, {}); }
function saveCorrections(map) { saveJSON(K.CORRECTION, map); }
function getCorrection(ch) {
  const m = loadCorrections();
  const v = m[ch];
  return Array.isArray(v) && v.length ? v.map(String) : null;
}
function setCorrection(ch, parts) {
  const m = loadCorrections();
  m[ch] = parts;
  saveCorrections(m);
}
function deleteCorrection(ch) {
  const m = loadCorrections();
  delete m[ch];
  saveCorrections(m);
}

function parseFixPartsInput(s) {
  const arr = String(s || '').trim().split(/\s+/).filter(Boolean);
  if (fixType === 'stroke') return arr;
  return arr.map((x) => normalizeRadical(x));
}

function getAllRadicalsForPicker() {
  const seen = new Set();
  const out = [];
  for (const item of RADICALS_MAIN_201) if (!seen.has(item.radical)) { seen.add(item.radical); out.push(item.radical); }
  for (const item of RADICALS_AFFIX_99) if (!seen.has(item.radical)) { seen.add(item.radical); out.push(item.radical); }
  return out;
}
function getFixSelectedSet() {
  return new Set(parseFixPartsInput(el.fixRadicals?.value || ''));
}
function setFixSelectedFromSet(set) {
  const arr = Array.from(set);
  arr.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
  if (el.fixRadicals) el.fixRadicals.value = arr.join(' ');
  if (el.fixPicker) {
    el.fixPicker.querySelectorAll('[data-rad]').forEach((node) => {
      const r = node.getAttribute('data-rad');
      if (!r) return;
      node.classList.toggle('on', set.has(r));
    });
  }
}
function renderFixRadicalPicker() {
  if (!el.fixPicker) return;
  const all = fixType === 'stroke' ? STROKES_32.slice() : getAllRadicalsForPicker();
  el.fixPicker.innerHTML = '';
  for (const r of all) {
    const d = document.createElement('div');
    d.className = 'fix-rad';
    d.textContent = r;
    d.dataset.rad = r;
    el.fixPicker.appendChild(d);
  }
  setFixSelectedFromSet(getFixSelectedSet());
  el.fixPicker.onclick = (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const r = t.getAttribute('data-rad');
    if (!r) return;
    const set = getFixSelectedSet();
    if (set.has(r)) set.delete(r); else set.add(r);
    setFixSelectedFromSet(set);
  };
}

function initFixModal() {
  function syncFixType(type) {
    fixType = type === 'stroke' ? 'stroke' : 'radical';
    el.fixTypeRadical?.classList.toggle('primary', fixType === 'radical');
    el.fixTypeStroke?.classList.toggle('primary', fixType === 'stroke');
    renderFixRadicalPicker();
  }
  function openFixOverlayWithType(type) {
    syncFixType(type);
    if (el.fixChar) el.fixChar.value = '';
    if (el.fixRadicals) el.fixRadicals.value = '';
    setFixSelectedFromSet(new Set());
    openOverlayEl(el.fixOverlay);
  }

  el.btnFixOpenTop?.addEventListener('click', () => openFixOverlayWithType('radical'));
  el.btnFixOpenStroke?.addEventListener('click', () => openFixOverlayWithType('stroke'));
  el.btnFixClose?.addEventListener('click', () => closeOverlayEl(el.fixOverlay));
  el.fixOverlay?.addEventListener('click', (e) => { if (e.target === el.fixOverlay) closeOverlayEl(el.fixOverlay); });

  el.fixTypeRadical?.addEventListener('click', () => syncFixType('radical'));
  el.fixTypeStroke?.addEventListener('click', () => syncFixType('stroke'));
  syncFixType('radical');

  el.btnFixSave?.addEventListener('click', async () => {
    const chars = Array.from(String(el.fixChar?.value || '').trim()).filter(isChineseChar);
    if (!chars.length) return alert('请输入至少一个汉字');
    const parts = parseFixPartsInput(el.fixRadicals?.value || '');
    if (!parts.length) return alert('请选择或输入纠错项');
    if (fixType === 'stroke') {
      const invalidStroke = parts.filter((r) => !STROKES_32.includes(r));
      if (invalidStroke.length) return alert(`包含不在32笔画中的内容：${invalidStroke.join(' ')}`);
    } else {
      const invalid = parts.filter((r) => !(isAllowedRadical(r) || r === '阝'));
      if (invalid.length) return alert(`包含不在部首表中的部首：${invalid.join(' ')}`);
    }
    for (const ch of chars) {
      setCorrection(`${fixType}:${ch}`, parts);
    }
    await generateSplit(currentText);
    alert(`已保存${chars.length}个字的纠错`);
  });
  el.btnFixDelete?.addEventListener('click', async () => {
    const chars = Array.from(String(el.fixChar?.value || '').trim()).filter(isChineseChar);
    if (!chars.length) return alert('请输入至少一个汉字');
    for (const ch of chars) deleteCorrection(`${fixType}:${ch}`);
    await generateSplit(currentText);
    alert(`已删除${chars.length}个字的纠错`);
  });
}

// =============== split cache ===============
function getCachedSplit(ch) {
  const m = loadJSON(K.SPLIT_CACHE, {});
  const v = m[`${splitBasis}:${ch}`] ?? m[ch];
  return Array.isArray(v) && v.length ? v.map(String) : null;
}
function setCachedSplit(ch, parts) {
  const m = loadJSON(K.SPLIT_CACHE, {});
  m[`${splitBasis}:${ch}`] = Array.isArray(parts) ? parts : [ch];
  saveJSON(K.SPLIT_CACHE, m);
}

async function fetchSplitFromServer(ch) {
  try {
    const resp = await fetch(apiUrl('/api/split_char'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ char: ch, mode: splitBasis }),
    });
    const data = await resp.json();
    if (!data.ok) {
      const msg = typeof data.error === 'string' ? data.error : '拆字接口失败';
      console.warn('[split_char]', msg);
      setStatus(msg);
      return [ch];
    }
    return Array.isArray(data.parts) && data.parts.length ? data.parts : [ch];
  } catch (e) {
    console.warn('[split_char] 网络异常', e);
    setStatus('拆字请求失败，请检查网络与后端是否启动');
    return [ch];
  }
}

async function splitOneChar(ch) {
  const corr = getCorrection(`${splitBasis}:${ch}`) || getCorrection(ch);
  if (corr) return corr;
  const cached = getCachedSplit(ch);
  if (cached) return cached;

  const fetched = await fetchSplitFromServer(ch);
  const cleaned = (fetched || [])
    .map((x) => (splitBasis === 'stroke' ? normalizeStroke(x) : normalizeRadical(x)))
    .filter(Boolean);
  const ok = splitBasis === 'stroke'
    ? cleaned.length > 0 && cleaned.every((r) => STROKES_32.includes(r))
    : cleaned.length > 0 && cleaned.every((r) => isValidRadicalModePart(r));
  const finalParts = ok ? cleaned : [ch];
  if (ok) setCachedSplit(ch, finalParts);
  return finalParts;
}

function setLoading(on) {
  if (!el.loadingOverlay) return;
  el.loadingOverlay.classList.toggle('show', !!on);
  if (on) {
    // loading: show sentence even in split mode
    el.charMain?.classList.remove('hidden');
    el.charSplit?.classList.remove('active');
    if (el.charSplit) el.charSplit.style.opacity = '0';
  } else {
    if (el.charSplit) el.charSplit.style.opacity = '';
    setSplitMode(splitMode || gestureSplitHold);
  }
}

// =============== main text ===============
function setText(text) {
  const next = String(text || '').trim().slice(0, 500);
  if (!next) return;
  currentText = next;
  pushTextHistory(currentText);
  if (el.charMain) el.charMain.textContent = currentText;
  if (el.countHint) el.countHint.textContent = `${currentText.length}/500`;

  const chars = Array.from(currentText).filter(isChineseChar);
  for (const ch of chars) bumpFreq(ch);
  renderCommonChars();
  renderTextHistory();
  applyTemplateToStage();
  renderUploadedPartsSummary();
}

// =============== physics ===============
function stopPhysics() {
  if (physicsRaf) cancelAnimationFrame(physicsRaf);
  physicsRaf = 0;
}

function startPhysics() {
  if (!physicsEnabled) return;
  if (physicsRaf) return;
  const step = () => {
    const container = el.charSplit?.parentElement;
    const rect = container?.getBoundingClientRect();
    if (rect) {
      const W = rect.width;
      const H = rect.height;
      for (const [node, st] of physicsState.entries()) {
        if (st.dragging) continue;
        const w = 56, h = 56;
        const g = 0.02 * sensitivity;
        st.vy += g;
        st.vx *= 0.992;
        st.vy *= 0.992;
        let x = Number(node.dataset.left || 0) + st.vx;
        let y = Number(node.dataset.top || 0) + st.vy;
        if (x < 0) { x = 0; st.vx = -st.vx * 0.8; }
        if (y < 0) { y = 0; st.vy = -st.vy * 0.8; }
        if (x > W - w) { x = W - w; st.vx = -st.vx * 0.8; }
        if (y > H - h) { y = H - h; st.vy = -st.vy * 0.8; }
        node.dataset.left = String(x);
        node.dataset.top = String(y);
        node.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
    physicsRaf = requestAnimationFrame(step);
  };
  physicsRaf = requestAnimationFrame(step);
}

function explodeRadicals() {
  for (const st of physicsState.values()) {
    st.vx = (Math.random() - 0.5) * 6 * sensitivity;
    st.vy = (Math.random() - 0.7) * 6 * sensitivity;
  }
}

function setPhysicsEnabled(on) {
  physicsEnabled = !!on;
  if (!physicsEnabled) stopPhysics();
  else startPhysics();
}

// =============== split mode and radicals layout ===============
let splitMode = false;
let gestureSplitHold = false;

function setToggleLabel(on) {
  if (!el.btnToggle) return;
  el.btnToggle.textContent = on ? '合并显示' : '拆分字部件';
}

async function setSplitMode(on) {
  setToggleLabel(on);
  if (!el.charSplit || !el.charMain) return;
  if (on) {
    if (!el.charSplit.innerHTML.trim()) await generateSplit(currentText);
    el.charMain.classList.add('hidden');
    el.charSplit.classList.add('active');
  } else {
    el.charMain.classList.remove('hidden');
    el.charSplit.classList.remove('active');
  }
}

function resetRadicalOrder() {
  el.charSplit?.querySelectorAll('span').forEach((node) => {
    const x = Number(node.dataset.initLeft || 0);
    const y = Number(node.dataset.initTop || 0);
    node.dataset.left = String(x);
    node.dataset.top = String(y);
    node.style.transform = `translate(${x}px, ${y}px)`;
  });
}

async function generateSplit(text) {
  if (!el.charSplit) return;
  const t = String(text || '').trim().slice(0, 500);
  if (!t) return;

  const seqChars = Array.from(t).filter(isChineseChar);
  const unique = Array.from(new Set(seqChars));
  if (!seqChars.length) {
    el.charSplit.innerHTML = '';
    highlightRadicals([]);
    return;
  }

  setStatus(`正在拆分（共 ${unique.length} 个不同汉字）...`);
  setLoading(true);

  const results = new Map();
  const concurrency = 5;
  let idx = 0;
  async function worker() {
    while (idx < unique.length) {
      const i = idx++;
      const ch = unique[i];
      try {
        const parts = await splitOneChar(ch);
        results.set(ch, parts);
      } catch {
        results.set(ch, [ch]);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, unique.length) }, worker));
  setLoading(false);
  setStatus('拆分完成');

  // ordered radicals list
  const ordered = [];
  const perChar = [];
  for (const ch of seqChars) {
    const parts = results.get(ch) || [ch];
    const arr = [];
    for (const p of parts) {
      const r = splitBasis === 'stroke' ? normalizeStroke(p) : normalizeRadical(p);
      if (!r) continue;
      ordered.push(r);
      arr.push(r);
    }
    perChar.push(arr);
  }

  // positions: simple text probe using current font size
  const container = el.charSplit.parentElement;
  const rect = container?.getBoundingClientRect();
  const W = rect?.width || 800;
  const H = rect?.height || 500;
  const mainCS = el.charMain ? window.getComputedStyle(el.charMain) : null;
  const baseFontSize = mainCS ? (parseFloat(mainCS.fontSize) || 42) : 42;
  const baseFontWeight = mainCS?.fontWeight || '800';
  const baseColor = mainCS?.color || '#111827';

  function measurePositions(chars) {
    if (!container || !el.charMain) return chars.map(() => ({ x: W / 2, y: H / 2, w: 40, h: 40 }));
    const probe = document.createElement('div');
    probe.style.position = 'absolute';
    probe.style.inset = '0';
    probe.style.visibility = 'hidden';
    probe.style.display = 'flex';
    probe.style.alignItems = 'center';
    probe.style.justifyContent = 'center';
    probe.style.pointerEvents = 'none';
    const inner = document.createElement('div');
    inner.style.maxWidth = '92%';
    inner.style.textAlign = 'center';
    inner.style.whiteSpace = 'pre-wrap';
    inner.style.wordBreak = 'break-word';
    const cs = window.getComputedStyle(el.charMain);
    inner.style.fontSize = cs.fontSize;
    inner.style.fontFamily = cs.fontFamily;
    inner.style.lineHeight = cs.lineHeight;
    inner.style.fontWeight = cs.fontWeight;
    const spans = chars.map((c) => {
      const s = document.createElement('span');
      s.style.display = 'inline-block';
      s.textContent = c;
      inner.appendChild(s);
      return s;
    });
    probe.appendChild(inner);
    container.appendChild(probe);
    const base = container.getBoundingClientRect();
    const out = spans.map((s) => {
      const r = s.getBoundingClientRect();
      return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2, w: r.width, h: r.height };
    });
    probe.remove();
    return out;
  }

  const positions = measurePositions(seqChars);

  el.charSplit.innerHTML = '';
  physicsState.clear();

  function makeDraggable(node) {
    let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
    node.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true;
      node.setPointerCapture(e.pointerId);
      node.style.cursor = 'grabbing';
      node.classList.add('selected');
      const ps = physicsState.get(node);
      if (ps) ps.dragging = true;
      sx = e.clientX; sy = e.clientY;
      sl = Number(node.dataset.left || 0);
      st = Number(node.dataset.top || 0);
    });
    node.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      const x = sl + dx;
      const y = st + dy;
      node.dataset.left = String(x);
      node.dataset.top = String(y);
      node.style.transform = `translate(${x}px, ${y}px)`;
    });
    const end = (e) => {
      if (!dragging) return;
      dragging = false;
      try { node.releasePointerCapture(e.pointerId); } catch {}
      node.style.cursor = 'grab';
      const ps = physicsState.get(node);
      if (ps) ps.dragging = false;
    };
    node.addEventListener('pointerup', end);
    node.addEventListener('pointercancel', end);
  }

  let globalIndex = 0;
  const cap = 120;
  const customPartMapSnapshot = loadCustomPartMap();
  // 勿把 globalIndex 写进外层条件：否则前若干字部件多时 cap 用尽，后面整字都不会生成 DOM
  for (let i = 0; i < perChar.length; i++) {
    const parts = perChar[i];
    const ch = seqChars[i];
    const slotIndices = getUnifiedSlotIndicesWithContent(customPartMapSnapshot, ch);
    let renderItems;
    if (slotIndices && slotIndices.length) {
      renderItems = slotIndices.map((slotIdx, j) => ({
        slotIdx,
        r: j < parts.length ? parts[j] : parts.length ? parts[parts.length - 1] : ch,
      }));
    } else {
      renderItems = parts.map((r, j) => ({ slotIdx: j, r }));
    }
    if (!renderItems.length) continue;
    const pos = positions[i] || { x: W / 2, y: H / 2, w: 40, h: 40 };
    const n = renderItems.length;
    const cols = Math.min(3, Math.max(1, Math.ceil(Math.sqrt(n))));
    const gap = Math.max(4, Math.min(10, (pos.w || baseFontSize) * 0.14));
    const cell = Math.max(16, Math.min(44, (pos.h || baseFontSize) * 0.92));
    const rows = Math.ceil(n / cols);
    const startX = pos.x - (cols * cell + (cols - 1) * gap) / 2;
    const startY = pos.y - (rows * cell + (rows - 1) * gap) / 2;
    for (let j = 0; j < renderItems.length && globalIndex < cap; j++) {
      const { slotIdx, r } = renderItems[j];
      const row = Math.floor(j / cols);
      const col = j % cols;
      const x = startX + col * (cell + gap);
      const y = startY + row * (cell + gap);
      const span = document.createElement('span');
      const fs = Math.max(14, Math.min(baseFontSize, (pos.h || baseFontSize) * 0.92));
      span.dataset.idx = String(globalIndex++);
      span.dataset.left = String(x);
      span.dataset.top = String(y);
      span.dataset.initLeft = String(x);
      span.dataset.initTop = String(y);
      span.style.fontSize = `${fs}px`;
      span.style.fontWeight = String(baseFontWeight);
      span.style.color = baseColor;
      span.style.opacity = '1';
      const customUrl = getCustomPartDataUrl(splitBasis, ch, slotIdx);
      const dataUrl = customUrl || (splitBasis === 'stroke' ? getStrokeStyleDataUrl(r) : getRadicalStyleDataUrl(r));
      if (dataUrl) {
        const mask = document.createElement('span');
        mask.className = 'radical-mask';
        mask.setAttribute('aria-label', r);
        mask.style.webkitMaskImage = `url("${dataUrl}")`;
        mask.style.maskImage = `url("${dataUrl}")`;
        mask.style.width = `${fs}px`;
        mask.style.height = `${fs}px`;
        span.appendChild(mask);
      } else {
        span.textContent = r;
      }
      span.style.transform = `translate(${x}px, ${y}px)`;
      physicsState.set(span, { vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, dragging: false });
      makeDraggable(span);
      el.charSplit.appendChild(span);
    }
  }

  highlightRadicals(ordered);
  if (splitBasis === 'stroke') {
    highlightStrokes(ordered.filter((x) => STROKES_32.includes(x)));
  } else {
    highlightStrokes([]);
  }
  if (physicsEnabled) { explodeRadicals(); startPhysics(); }
}

// =============== copybook templates ===============
function countForCopybook() {
  return Math.max(1, copyChars().length);
}

function copyChars() {
  const chars = Array.from(String(currentText || '').replace(/\s+/g, '')).filter((c) => c.trim());
  return chars.length ? chars : ['永'];
}

function drawCellLines(type, cell) {
  const line = (x1, y1, x2, y2, dashed) => {
    const d = document.createElement('div');
    d.style.position = 'absolute';
    d.style.left = `${x1}%`;
    d.style.top = `${y1}%`;
    d.style.width = `${x2 - x1}%`;
    d.style.height = `${y2 - y1}%`;
    d.style.borderTop = (y2 - y1 === 0) ? `1px ${dashed ? 'dashed' : 'solid'} #94a3b8` : 'none';
    d.style.borderLeft = (x2 - x1 === 0) ? `1px ${dashed ? 'dashed' : 'solid'} #94a3b8` : 'none';
    return d;
  };

  const addH = (p, dashed) => cell.appendChild(line(8, p, 92, p, dashed));
  const addV = (p, dashed) => cell.appendChild(line(p, 8, p, 92, dashed));

  if (type === 'tian' || type === 'huigong') {
    addH(50, false);
    addV(50, false);
  }
  if (type === 'huigong') {
    const inner = document.createElement('div');
    inner.style.position = 'absolute';
    inner.style.left = '18%';
    inner.style.top = '18%';
    inner.style.right = '18%';
    inner.style.bottom = '18%';
    inner.style.border = '1px solid #e5e7eb';
    inner.style.borderRadius = '10px';
    cell.appendChild(inner);
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function copyTplIsBlankish(t) {
  return !t || t === 'none' || t === 'blank';
}

/** 从 CDN 加载的 html-to-image UMD 挂在 globalThis.htmlToImage */
function getHtmlToImage() {
  const g = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {};
  const lib = g.htmlToImage;
  if (lib && typeof lib.toCanvas === 'function') return lib;
  return null;
}

/**
 * 字帖导出：直接截取 .char-container。
 * withWhiteBg：JPG/打印 铺白底；PNG 为 false 时透明底，并去掉选中蓝框/蓝圈与舞台渐变底。
 */
async function captureCharContainerToCanvas(withWhiteBg) {
  const cont = el.charContainer;
  if (!cont) {
    const c = document.createElement('canvas');
    c.width = 4;
    c.height = 4;
    return c;
  }
  await waitFontsAndDoubleRaf();

  const lib = getHtmlToImage();
  if (!lib) throw new Error('html-to-image 未加载');

  const dpr = typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1;
  const pixelRatio = Math.min(2.5, Math.max(1.5, dpr));

  const splitSpans = el.charSplit ? Array.from(el.charSplit.querySelectorAll(':scope > span')) : [];
  const classBackup = [];
  for (const span of splitSpans) {
    const hadSel = span.classList.contains('selected');
    const hadG = span.classList.contains('selected-gesture');
    if (hadSel || hadG) {
      classBackup.push({ span, hadSel, hadG });
      span.classList.remove('selected', 'selected-gesture');
    }
  }
  for (const span of splitSpans) {
    span.style.setProperty('outline', 'none', 'important');
    span.style.setProperty('box-shadow', 'none', 'important');
    span.style.setProperty('background', 'transparent', 'important');
  }

  const cellEls = Array.from(cont.querySelectorAll('.copy-cell-stage'));

  if (!withWhiteBg) {
    cont.style.setProperty('background', 'transparent', 'important');
    cont.style.setProperty('background-image', 'none', 'important');
    for (const cell of cellEls) {
      cell.style.setProperty('background', 'transparent', 'important');
    }
  }

  try {
    return await lib.toCanvas(cont, {
      pixelRatio,
      cacheBust: true,
      backgroundColor: withWhiteBg ? '#ffffff' : undefined,
      filter: (node) => {
        if (!(node instanceof HTMLElement)) return true;
        if (node.id === 'loadingOverlay' && !node.classList.contains('show')) return false;
        return true;
      },
    });
  } finally {
    for (const { span, hadSel, hadG } of classBackup) {
      if (hadSel) span.classList.add('selected');
      if (hadG) span.classList.add('selected-gesture');
    }
    for (const span of splitSpans) {
      span.style.removeProperty('outline');
      span.style.removeProperty('box-shadow');
      span.style.removeProperty('background');
    }
    if (!withWhiteBg) {
      cont.style.removeProperty('background');
      cont.style.removeProperty('background-image');
      for (const cell of cellEls) {
        cell.style.removeProperty('background');
      }
    }
  }
}

/** CDN 不可用时用手绘逻辑回退（不保证与复杂 CSS mask 完全一致） */
async function makeCopyCanvasFromStageLegacy(type, withWhiteBg) {
  const tpl = copyTplIsBlankish(type) ? 'none' : type;
  const chars = copyChars();
  const n = Math.max(1, chars.length);
  const mainStyle = el.charMain ? getComputedStyle(el.charMain) : null;
  const ff = mainStyle?.fontFamily || 'sans-serif';
  const fw = mainStyle?.fontWeight || '700';
  const colMain = mainStyle?.color || '#111827';

  await waitFontsAndDoubleRaf();

  const partSpans = el.charSplit
    ? Array.from(el.charSplit.children).filter((child) => child instanceof HTMLElement && child.tagName === 'SPAN')
    : [];
  const splitActive = partSpans.length > 0;
  const cont = el.charContainer;
  const rect = cont?.getBoundingClientRect() || { left: 0, top: 0, width: 640, height: 400 };
  const cw = Math.max(320, rect.width || 640);
  const ch = Math.max(200, rect.height || 400);
  const exportW = 900;
  const scale = exportW / cw;
  const exportH = Math.round(ch * scale);
  const pad = 16;
  const W = exportW + pad * 2;
  const H = exportH + pad * 2;

  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  if (!ctx) return c;

  if (withWhiteBg) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
  } else {
    ctx.clearRect(0, 0, W, H);
  }

  ctx.save();
  ctx.translate(pad, pad);

  if (tpl === 'lines') {
    ctx.strokeStyle = 'rgba(100,116,139,0.55)';
    ctx.lineWidth = 1;
    const bands = Math.max(n, 2);
    for (let i = 1; i < bands; i++) {
      const yy = (exportH / bands) * i;
      ctx.beginPath();
      ctx.moveTo(0, yy);
      ctx.lineTo(exportW, yy);
      ctx.stroke();
    }
  } else if (tpl === 'square' || tpl === 'tian' || tpl === 'huigong') {
    const cols = Math.min(8, n);
    const rows = Math.ceil(n / cols) || 1;
    const cellW = exportW / cols;
    const cellH = exportH / rows;
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols);
      const cl = i % cols;
      const x = cl * cellW;
      const y = r * cellH;
      ctx.strokeRect(x, y, cellW, cellH);
      if (tpl === 'tian' || tpl === 'huigong') {
        ctx.beginPath();
        ctx.moveTo(x + cellW / 2, y);
        ctx.lineTo(x + cellW / 2, y + cellH);
        ctx.moveTo(x, y + cellH / 2);
        ctx.lineTo(x + cellW, y + cellH / 2);
        ctx.stroke();
      }
    }
  }

  const loadImg = (src) => new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = src;
  });

  if (!splitActive) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colMain;
    const cols = Math.min(8, n);
    const rows = Math.ceil(n / cols) || 1;
    const cellW = exportW / cols;
    const cellH = exportH / rows;
    const fs = Math.min(72, Math.max(22, cellW * 0.42));
    ctx.font = `${fw} ${fs}px ${ff}`;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols);
      const cl = i % cols;
      ctx.fillText(chars[i], cl * cellW + cellW / 2, r * cellH + cellH / 2);
    }
    ctx.restore();
    return c;
  }

  for (const span of partSpans) {
    const sr = span.getBoundingClientRect();
    const cx = sr.left + sr.width / 2 - rect.left;
    const cy = sr.top + sr.height / 2 - rect.top;
    const x = cx * scale;
    const y = cy * scale;
    const cs = window.getComputedStyle(span);
    const fs = parseFloat(cs.fontSize) || 42;
    const mask = span.querySelector('.radical-mask');
    if (mask) {
      const mcs = window.getComputedStyle(mask);
      const mi = mcs.webkitMaskImage || mcs.maskImage || '';
      const m = /url\(["']?([^"')]+)/.exec(mi);
      let src = m ? m[1].trim() : '';
      if (src.startsWith('"') || src.startsWith("'")) src = src.slice(1, -1);
      if (src && src.startsWith('data:')) {
        try {
          const img = await loadImg(src);
          const mr = mask.getBoundingClientRect();
          const w = Math.max(8, mr.width * scale * 1.02);
          const h = Math.max(8, mr.height * scale * 1.02);
          const ox = x - w / 2;
          const oy = y - h / 2;
          const tint = mcs.color || cs.color || colMain;
          const op = parseFloat(mcs.opacity);
          ctx.save();
          if (Number.isFinite(op) && op < 1) ctx.globalAlpha = op;
          ctx.fillStyle = tint;
          ctx.fillRect(ox, oy, w, h);
          ctx.globalCompositeOperation = 'destination-in';
          ctx.drawImage(img, ox, oy, w, h);
          ctx.restore();
        } catch {}
      }
    } else {
      ctx.save();
      ctx.fillStyle = cs.color || colMain;
      const op = parseFloat(cs.opacity);
      if (Number.isFinite(op) && op < 1) ctx.globalAlpha = op;
      ctx.font = `${cs.fontWeight || fw} ${fs * scale}px ${cs.fontFamily || ff}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(span.textContent || '', x, y);
      ctx.restore();
    }
  }
  ctx.restore();
  return c;
}

async function makeCopyCanvasFromStage(type, withWhiteBg) {
  try {
    return await captureCharContainerToCanvas(withWhiteBg);
  } catch (e) {
    console.warn('DOM 截图导出失败，使用手绘回退', e);
    return makeCopyCanvasFromStageLegacy(type, withWhiteBg);
  }
}

function initCopyActions() {
  el.btnExportPng?.addEventListener('click', async () => {
    try {
      // DOM 截图：不铺白底，与舞台上渐变/字格一致
      const c = await makeCopyCanvasFromStage(copyTpl, false);
      c.toBlob((b) => b && downloadBlob(b, 'copybook.png'), 'image/png');
    } catch (e) {
      console.error(e);
      alert('导出失败');
    }
  });
  el.btnExportJpg?.addEventListener('click', async () => {
    try {
      const c = await makeCopyCanvasFromStage(copyTpl, true);
      c.toBlob((b) => b && downloadBlob(b, 'copybook.jpg'), 'image/jpeg', 0.95);
    } catch (e) {
      console.error(e);
      alert('导出失败');
    }
  });
  el.btnExportPdf?.addEventListener('click', async () => {
    try {
      const c = await makeCopyCanvasFromStage(copyTpl, true);
      const data = c.toDataURL('image/png');
      const w = window.open('', '_blank');
      if (!w) return;
      w.document.write(`<img src="${data}" style="max-width:100%">`);
      w.document.close();
      w.focus();
      w.print();
    } catch (e) {
      console.error(e);
      alert('导出失败');
    }
  });
  el.btnPrintCopy?.addEventListener('click', () => {
    window.print();
  });
  el.btnSavePsd?.addEventListener('click', () => {
    const payload = {
      type: 'copybook-project',
      template: copyTpl,
      text: currentText,
      createdAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'copybook.psd.json');
  });
  el.btnShareCopy?.addEventListener('click', async () => {
    const text = '字帖分享：小红书 / 微信 / 微博 / 抖音';
    try {
      if (navigator.share) await navigator.share({ title: '字帖分享', text });
      else await navigator.clipboard.writeText(text);
      alert('已触发分享（或已复制分享文案）');
    } catch {}
  });
}

function initCopybook() {
  document.querySelectorAll('.copy-tpl-opt').forEach((btn) => {
    btn.addEventListener('click', () => setCopyTpl(btn.dataset.tpl || 'none'));
  });
  setCopyTpl('none');
  initCopyActions();
}

// =============== right sidebar tab "flip" (radical / stroke) ===============
function initRightTabs() {
  if (!el.tabRadical || !el.tabStroke || !el.pageRadicals || !el.pageStrokes || !el.tabCustom || !el.pageCustom) return;
  const showCustom = () => {
    el.tabCustom.classList.add('active');
    el.tabRadical.classList.remove('active');
    el.tabStroke.classList.remove('active');
    el.pageCustom.classList.add('active');
    el.pageRadicals.classList.remove('active');
    el.pageStrokes.classList.remove('active');
  };
  const setTab = (which) => {
    if (which === 'custom') {
      showCustom();
      return;
    }
    el.tabCustom.classList.remove('active');
    el.pageCustom.classList.remove('active');
    const isRadical = which === 'radical';
    el.tabRadical.classList.toggle('active', isRadical);
    el.tabStroke.classList.toggle('active', !isRadical);
    el.pageRadicals.classList.toggle('active', isRadical);
    el.pageStrokes.classList.toggle('active', !isRadical);
    splitBasis = isRadical ? 'radical' : 'stroke';
    if (currentText) generateSplit(currentText);
  };
  el.tabRadical.addEventListener('click', () => setTab('radical'));
  el.tabStroke.addEventListener('click', () => setTab('stroke'));
  el.tabCustom.addEventListener('click', () => setTab('custom'));
  setTab('radical');
}

// =============== interactions: buttons/inputs ===============
el.btnApply?.addEventListener('click', () => {
  const t = String(el.input?.value || '').trim();
  if (!t) return;
  setText(t);
  generateSplit(t);
});

el.input?.addEventListener('input', () => {
  autoResizeTextarea();
  const v = String(el.input.value || '').slice(0, 500);
  if (el.countHint) el.countHint.textContent = `${v.length}/500`;
  updatePreview();
});

el.textPreview?.addEventListener('click', () => {
  const v = String(el.input?.value || '').trim();
  if (!v) return;
  const tooLong = v.length > 120 || (el.textPreview.scrollHeight > el.textPreview.clientHeight + 2);
  if (tooLong) {
    el.overlayText.textContent = v;
    openOverlayEl(el.textOverlay);
  }
});
el.btnOverlayClose?.addEventListener('click', () => closeOverlayEl(el.textOverlay));
el.textOverlay?.addEventListener('click', (e) => { if (e.target === el.textOverlay) closeOverlayEl(el.textOverlay); });

el.presetChars?.addEventListener('click', (e) => {
  const t = e.target;
  if (!(t instanceof HTMLElement)) return;
  const c = t.dataset.char;
  if (!c) return;
  el.input.value = c;
  setText(c);
  updatePreview();
  generateSplit(c);
});

el.btnClearHistory?.addEventListener('click', () => {
  try { localStorage.removeItem(K.FREQ); } catch {}
  renderCommonChars();
});
el.btnClearTextHistory?.addEventListener('click', () => {
  try { localStorage.removeItem(K.TEXT_HISTORY); } catch {}
  renderTextHistory();
});
el.textHistoryList?.addEventListener('click', (e) => {
  const t = e.target;
  if (!(t instanceof HTMLElement)) return;
  const text = t.dataset.text;
  if (!text) return;
  if (el.input) el.input.value = text;
  setText(text);
  updatePreview();
  autoResizeTextarea();
  generateSplit(text);
});

el.zoomRange?.addEventListener('input', () => {
  const v = Number(el.zoomRange.value);
  if (!Number.isFinite(v)) return;
  setScale(v);
});
el.btnMinus?.addEventListener('click', () => setScale(scale - 0.1));
el.btnPlus?.addEventListener('click', () => setScale(scale + 0.1));

el.btnReset?.addEventListener('click', () => {
  splitMode = false;
  gestureSplitHold = false;
  setSplitMode(false);
  setScale(1);
  el.input.value = '';
  setText('春');
  updatePreview();
});

el.btnToggle?.addEventListener('click', () => {
  splitMode = !splitMode;
  setSplitMode(splitMode || gestureSplitHold);
});

el.btnApplyStyleSelected?.addEventListener('click', () => {
  const nodes = Array.from(el.charSplit?.querySelectorAll('span.selected, span.selected-gesture') || []);
  if (!nodes.length) return alert('请先选中一个或多个部首/笔画');
  applySpanStyle(nodes);
});
el.btnApplyStyleAll?.addEventListener('click', () => {
  const nodes = Array.from(el.charSplit?.querySelectorAll('span') || []);
  applySpanStyle(nodes);
});
for (const node of [el.fontSizeRange, el.fontWeightRange, el.fontColor, el.fontOpacityRange]) {
  node?.addEventListener('input', applyStyleRealtime);
}

el.btnRadicalResetOrder?.addEventListener('click', resetRadicalOrder);

el.togglePhysics?.addEventListener('change', () => setPhysicsEnabled(el.togglePhysics.checked));
if (el.togglePhysics) setPhysicsEnabled(el.togglePhysics.checked);

el.sensRange?.addEventListener('input', () => {
  const v = Number(el.sensRange.value);
  if (!Number.isFinite(v)) return;
  sensitivity = v;
  if (el.sensLabel) el.sensLabel.textContent = v < 0.85 ? '低' : v > 1.25 ? '高' : '中';
});
if (el.sensRange) sensitivity = Number(el.sensRange.value) || 1.0;

function setGestureLock(on) {
  gestureLocked = !!on;
  if (el.btnGestureLock) el.btnGestureLock.textContent = gestureLocked ? '锁定中' : '解锁';
  setGestureBar(gestureLocked ? '锁定' : '—');
}
el.btnGestureLock?.addEventListener('click', () => setGestureLock(!gestureLocked));

// =============== gesture logic (MediaPipe Hands) ===============
const ctx2d = el.canvas?.getContext('2d');
let lastTwoHandDistance = null;

function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
function isFingerExtended(landmarks, tipIdx, pipIdx) {
  return landmarks[tipIdx].y < landmarks[pipIdx].y;
}
function isOpenPalm(landmarks) {
  const index = isFingerExtended(landmarks, 8, 6);
  const middle = isFingerExtended(landmarks, 12, 10);
  const ring = isFingerExtended(landmarks, 16, 14);
  const pinky = isFingerExtended(landmarks, 20, 18);
  return index && middle && ring && pinky;
}
function isFist(landmarks) {
  const index = !isFingerExtended(landmarks, 8, 6);
  const middle = !isFingerExtended(landmarks, 12, 10);
  const ring = !isFingerExtended(landmarks, 16, 14);
  const pinky = !isFingerExtended(landmarks, 20, 18);
  return index && middle && ring && pinky;
}
function isMiddleFinger(landmarks) {
  const index = !isFingerExtended(landmarks, 8, 6);
  const middle = isFingerExtended(landmarks, 12, 10);
  const ring = !isFingerExtended(landmarks, 16, 14);
  const pinky = !isFingerExtended(landmarks, 20, 18);
  return index && middle && ring && pinky;
}
function isPinching(landmarks) {
  const d = distance(landmarks[4], landmarks[8]);
  const thr = 0.045 * (1.25 / clamp(sensitivity, 0.5, 2));
  return d < thr;
}

function getVideoFrameSize() {
  const vd = el.video;
  if (!vd) return { w: 0, h: 0 };
  let w = vd.videoWidth || 0;
  let h = vd.videoHeight || 0;
  if (!w || !h) {
    try {
      const tracks = vd.srcObject && typeof vd.srcObject.getVideoTracks === 'function'
        ? vd.srcObject.getVideoTracks()
        : [];
      const s = tracks[0] && tracks[0].getSettings ? tracks[0].getSettings() : {};
      if (s.width && s.height) {
        w = s.width;
        h = s.height;
      }
    } catch {}
  }
  return { w, h };
}

/** 优先画 live video：results.image 在部分浏览器/WebGL 回传路径下 drawImage 会黑屏 */
function drawCameraSource(ctx, w, h, results) {
  const vd = el.video;
  const videoOk = vd && vd.readyState >= HTMLMediaElement.HAVE_METADATA && vd.videoWidth > 0 && vd.videoHeight > 0;
  if (videoOk) {
    ctx.drawImage(vd, 0, 0, w, h);
    return;
  }
  const img = results && results.image;
  if (!img) return;
  try {
    ctx.drawImage(img, 0, 0, w, h);
  } catch (e) {
    if (vd && vd.readyState >= HTMLMediaElement.HAVE_METADATA) {
      try {
        ctx.drawImage(vd, 0, 0, w, h);
      } catch {}
    }
  }
}

function onResults(results) {
  if (!el.video || !el.canvas || !ctx2d) return;
  let { w, h } = getVideoFrameSize();
  if (!w || !h) {
    const img = results.image;
    if (img instanceof HTMLVideoElement && img.videoWidth > 0) {
      w = img.videoWidth;
      h = img.videoHeight;
    } else if (img && typeof img.width === 'number' && img.width > 0) {
      w = img.width;
      h = img.height;
    }
  }
  if (!w || !h) {
    const r = el.canvas.getBoundingClientRect();
    w = Math.max(320, Math.round(r.width) || 320);
    h = Math.max(240, Math.round(r.height) || 240);
  }
  el.canvas.width = w;
  el.canvas.height = h;
  ctx2d.save();
  ctx2d.clearRect(0, 0, el.canvas.width, el.canvas.height);
  drawCameraSource(ctx2d, el.canvas.width, el.canvas.height, results);

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const hands = results.multiHandLandmarks;
    for (const lm of hands) {
      window.drawConnectors(ctx2d, lm, window.HAND_CONNECTIONS, { color: '#38bdf8', lineWidth: 3 });
      window.drawLandmarks(ctx2d, lm, { color: '#f97316', lineWidth: 1 });
    }

    if (gestureLocked) {
      setGestureBar('锁定');
      ctx2d.restore();
      return;
    }

    // pinch select + drag in split mode
    if (hands.length === 1 && (splitMode || gestureSplitHold)) {
      const only = hands[0];
      if (isMiddleFinger(only)) {
        setGestureBar('清除选择');
        el.charSplit?.querySelectorAll('span').forEach(n => n.classList.remove('selected-gesture'));
        gestureSelectedIdx = -1;
        for (const st of physicsState.values()) st.dragging = false;
      }

      if (isPinching(only)) {
        setGestureBar('捏合选中/拖拽');
        const tip = only[8];
        const container = el.charSplit?.parentElement;
        const rect = container?.getBoundingClientRect();
        const nodes = Array.from(el.charSplit?.querySelectorAll('span') || []);
        if (rect && nodes.length) {
          if (!pinchActive) {
            gestureSelectedIdx = (gestureSelectedIdx + 1) % nodes.length;
            nodes.forEach((n, idx) => n.classList.toggle('selected-gesture', idx === gestureSelectedIdx));
          }
          pinchActive = true;
          const target = nodes[Math.max(0, gestureSelectedIdx)];
          if (target) {
            const st = physicsState.get(target);
            if (st) st.dragging = true;
            const mirroredX = 1 - tip.x;
            const x = rect.left + mirroredX * rect.width;
            const y = rect.top + tip.y * rect.height;
            const nx = x - rect.left;
            const ny = y - rect.top;
            target.dataset.left = String(nx);
            target.dataset.top = String(ny);
            target.style.transform = `translate(${nx}px, ${ny}px)`;
          }
        } else {
          pinchActive = true;
        }
      } else {
        pinchActive = false;
        const nodes = Array.from(el.charSplit?.querySelectorAll('span') || []);
        const target = nodes[gestureSelectedIdx];
        if (target) {
          const st = physicsState.get(target);
          if (st) st.dragging = false;
        }
      }

      if (isFist(only)) {
        setGestureBar('握拳释放');
        for (const st of physicsState.values()) st.dragging = false;
      }
    }

    // two-hand zoom
    if (hands.length >= 2) {
      const pA = hands[0][8];
      const pB = hands[1][8];
      const d = distance(pA, pB);
      if (lastTwoHandDistance != null) {
        const delta = d - lastTwoHandDistance;
        setScale(scale + delta * 3.5);
      }
      lastTwoHandDistance = d;
      gestureSplitHold = false;
    } else {
      lastTwoHandDistance = null;
      const open = isOpenPalm(hands[0]);
      gestureSplitHold = open;
      setSplitMode(splitMode || gestureSplitHold);
    }
  } else {
    setStatus('未检测到手，请伸入画面...');
    lastTwoHandDistance = null;
    gestureSplitHold = false;
    setSplitMode(splitMode);
    setGestureBar('—');
  }

  ctx2d.restore();
}

async function initCameraAndHands() {
  if (!el.video) return;
  try {
    setStatus('请求摄像头权限中...');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    el.video.srcObject = stream;
    el.video.onloadedmetadata = async () => {
      el.video.muted = true;
      el.video.playsInline = true;
      try {
        await el.video.play();
      } catch (e) {
        console.warn('[camera] play()', e);
      }
      initHands();
    };
  } catch (e) {
    console.error(e);
    setStatus('无法访问摄像头，请检查权限或浏览器设置。');
  }
}

async function initHands() {
  const hands = new window.Hands({ locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
  hands.setOptions({ maxNumHands: 2, minDetectionConfidence: 0.7, minTrackingConfidence: 0.6, modelComplexity: 1 });
  hands.onResults(onResults);
  const camera = new window.Camera(el.video, {
    onFrame: async () => { await hands.send({ image: el.video }); },
    width: 960,
    height: 540,
  });
  camera.start();
  setStatus('摄像头已启动');
}

// =============== init ===============
async function init() {
  await loadAssets();
  await applyBuiltinRadicalStylesIfEmpty();
  renderLineGalleries();
  // defaults
  setScale(1);
  if (el.input) {
    el.input.value = currentText;
    autoResizeTextarea();
    if (el.countHint) el.countHint.textContent = `${currentText.length}/500`;
    updatePreview();
  }

  // bind radicals
  renderRadicals();
  renderStrokeGrid();
  attachRadicalTooltip(el.radicalGridMain);
  attachRadicalTooltip(el.radicalGridAffix);

  // picker + fixes
  renderFixRadicalPicker();
  initFixModal();

  // uploads（弹窗）
  initRegularUploadModal();
  initCustomUploadModal();

  // frequency
  renderCommonChars();
  renderTextHistory();

  // font/camera float
  initFont();
  applyCameraState();
  enableCameraDrag();

  // copybook
  initCopybook();
  initRightTabs();

  // start
  setText(currentText);
  initCameraAndHands();
}

window.addEventListener('load', () => { init(); });

