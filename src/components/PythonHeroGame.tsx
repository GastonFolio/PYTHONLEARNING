import { useEffect, useRef, useState } from 'react';
import { completeGame, loadProgress } from '../data/storage';
import { ArrowLeft, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

// ============================================================
// SUPER PYTHON HERO — platformer style Super Mario (canvas 2D)
// Cours, saute, écrase les bugs 🐛, ramasse les pièces 🪙,
// atteins le drapeau 🏁 sur 3 niveaux. 100% local, sans asset.
// ============================================================

const W = 960;
const H = 540;
const GROUND_H = 64;
const GY = H - GROUND_H; // haut du sol
const GRAV = 0.6;
const JUMP = -13.2;
const SPEED = 4.4;

interface Plat { x: number; y: number; w: number; h: number }
interface CoinDef { x: number; y: number }
interface EnemyDef { x: number; y: number; minX: number; maxX: number }
interface LevelDef {
  name: string;
  hint: string;
  width: number;
  plats: Plat[];
  coins: CoinDef[];
  enemies: EnemyDef[];
  spawn: { x: number; y: number };
}

// Sauts sûrs : hauteur max ~140px, portée ~180px. Gaps <= 110px.
const LEVELS: LevelDef[] = [
  {
    name: 'Niveau 1 — La Plaine du Print',
    hint: '← → pour courir, Espace pour sauter. Écrase les bugs en leur sautant dessus !',
    width: 3000,
    plats: [
      { x: 0, y: GY, w: 700, h: GROUND_H },
      { x: 810, y: GY, w: 500, h: GROUND_H },
      { x: 1420, y: GY - 90, w: 180, h: 24 },
      { x: 1420, y: GY, w: 620, h: GROUND_H },
      { x: 2150, y: GY, w: 300, h: GROUND_H },
      { x: 2560, y: GY, w: 440, h: GROUND_H },
    ],
    coins: [
      { x: 350, y: GY - 60 }, { x: 400, y: GY - 90 }, { x: 450, y: GY - 60 },
      { x: 950, y: GY - 60 }, { x: 1000, y: GY - 60 },
      { x: 1460, y: GY - 150 }, { x: 1520, y: GY - 150 },
      { x: 1700, y: GY - 60 }, { x: 1760, y: GY - 90 }, { x: 1820, y: GY - 60 },
      { x: 2260, y: GY - 60 }, { x: 2700, y: GY - 60 },
    ],
    enemies: [
      { x: 950, y: GY - 34, minX: 830, maxX: 1250 },
      { x: 1700, y: GY - 34, minX: 1440, maxX: 1990 },
    ],
    spawn: { x: 60, y: GY - 100 },
  },
  {
    name: 'Niveau 2 — Les Boucles Ennemies',
    hint: 'Des plateformes flottantes et plus de bugs. Les pièces guident les bons sauts.',
    width: 3400,
    plats: [
      { x: 0, y: GY, w: 520, h: GROUND_H },
      { x: 620, y: GY - 80, w: 150, h: 24 },
      { x: 870, y: GY - 160, w: 150, h: 24 },
      { x: 1120, y: GY, w: 480, h: GROUND_H },
      { x: 1700, y: GY - 90, w: 140, h: 24 },
      { x: 1700, y: GY, w: 560, h: GROUND_H },
      { x: 2370, y: GY - 110, w: 150, h: 24 },
      { x: 2620, y: GY, w: 780, h: GROUND_H },
    ],
    coins: [
      { x: 640, y: GY - 140 }, { x: 890, y: GY - 220 },
      { x: 1250, y: GY - 60 }, { x: 1310, y: GY - 90 }, { x: 1370, y: GY - 60 },
      { x: 1720, y: GY - 150 }, { x: 1900, y: GY - 60 }, { x: 1960, y: GY - 60 },
      { x: 2390, y: GY - 170 }, { x: 2750, y: GY - 60 }, { x: 2810, y: GY - 90 }, { x: 2870, y: GY - 60 },
    ],
    enemies: [
      { x: 1200, y: GY - 34, minX: 1130, maxX: 1550 },
      { x: 1800, y: GY - 34, minX: 1710, maxX: 2210 },
      { x: 2050, y: GY - 34, minX: 1710, maxX: 2210 },
      { x: 2750, y: GY - 34, minX: 2630, maxX: 3050 },
    ],
    spawn: { x: 60, y: GY - 100 },
  },
  {
    name: 'Niveau 3 — Le Donjon du Bug Final',
    hint: 'Le gant final : sauts précis, patrouilles croisées. Le drapeau est proche !',
    width: 3600,
    plats: [
      { x: 0, y: GY, w: 420, h: GROUND_H },
      { x: 520, y: GY - 70, w: 130, h: 24 },
      { x: 750, y: GY - 140, w: 130, h: 24 },
      { x: 980, y: GY, w: 380, h: GROUND_H },
      { x: 1460, y: GY - 80, w: 130, h: 24 },
      { x: 1460, y: GY, w: 500, h: GROUND_H },
      { x: 2060, y: GY - 100, w: 130, h: 24 },
      { x: 2290, y: GY - 170, w: 130, h: 24 },
      { x: 2520, y: GY, w: 1080, h: GROUND_H },
    ],
    coins: [
      { x: 540, y: GY - 130 }, { x: 770, y: GY - 200 },
      { x: 1100, y: GY - 60 }, { x: 1160, y: GY - 90 },
      { x: 1480, y: GY - 140 }, { x: 1600, y: GY - 60 }, { x: 1660, y: GY - 60 },
      { x: 2080, y: GY - 160 }, { x: 2310, y: GY - 230 },
      { x: 2700, y: GY - 60 }, { x: 2900, y: GY - 90 }, { x: 3100, y: GY - 60 },
    ],
    enemies: [
      { x: 1050, y: GY - 34, minX: 990, maxX: 1320 },
      { x: 1250, y: GY - 34, minX: 990, maxX: 1320 },
      { x: 1550, y: GY - 34, minX: 1470, maxX: 1920 },
      { x: 1800, y: GY - 34, minX: 1470, maxX: 1920 },
      { x: 2650, y: GY - 34, minX: 2530, maxX: 3000 },
      { x: 2950, y: GY - 34, minX: 2530, maxX: 3150 },
    ],
    spawn: { x: 60, y: GY - 100 },
  },
];

interface Coin { x: number; y: number; taken: boolean; phase: number }
interface Enemy { x: number; y: number; w: number; h: number; vx: number; minX: number; maxX: number; alive: boolean; squash: number }

interface Props {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  onProgressUpdate: () => void;
}

type Screen = 'playing' | 'paused' | 'levelClear' | 'gameOver' | 'victory';

export default function PythonHeroGame({ onNavigate, onProgressUpdate }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screen, setScreen] = useState<Screen>('playing');
  const [levelIdx, setLevelIdx] = useState(0);
  const [finalStats, setFinalStats] = useState({ score: 0, coins: 0, best: 0, firstWin: false });
  const stateRef = useRef({
    screen: 'playing' as Screen,
    levelIdx: 0,
    px: 0, py: 0, vx: 0, vy: 0, pw: 34, ph: 44, onGround: false, face: 1,
    lives: 3, score: 0, coins: 0, inv: 0, camX: 0, t: 0,
    coinsArr: [] as Coin[],
    enemies: [] as Enemy[],
    keys: { left: false, right: false, jump: false },
    muted: false,
  });
  const audioRef = useRef<AudioContext | null>(null);

  const setScreenBoth = (s: Screen) => {
    stateRef.current.screen = s;
    setScreen(s);
  };

  // ---------- sons (WebAudio, aucun asset) ----------
  const beep = (freq: number, dur = 0.09, type: OscillatorType = 'square', vol = 0.06) => {
    if (stateRef.current.muted) return;
    try {
      if (!audioRef.current) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioRef.current = new AC();
      }
      const ctx = audioRef.current;
      if (ctx.state === 'suspended') void ctx.resume();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.value = vol;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.stop(ctx.currentTime + dur);
    } catch {
      /* audio indisponible : jeu silencieux */
    }
  };

  const loadLevel = (idx: number, keepScore: boolean) => {
    const s = stateRef.current;
    const lv = LEVELS[idx];
    s.levelIdx = idx;
    setLevelIdx(idx);
    s.px = lv.spawn.x;
    s.py = lv.spawn.y;
    s.vx = 0; s.vy = 0; s.inv = 0; s.camX = 0;
    if (!keepScore) { s.score = 0; s.coins = 0; s.lives = 3; }
    s.coinsArr = lv.coins.map((c, i) => ({ ...c, taken: false, phase: i }));
    s.enemies = lv.enemies.map(e => ({ ...e, w: 34, h: 30, vx: 1, alive: true, squash: 0 }));
  };

  const hurt = () => {
    const s = stateRef.current;
    if (s.inv > 0) return;
    s.lives -= 1;
    beep(160, 0.25, 'sawtooth');
    if (s.lives <= 0) {
      setScreenBoth('gameOver');
    } else {
      // réapparition au spawn du niveau
      const lv = LEVELS[s.levelIdx];
      s.px = lv.spawn.x; s.py = lv.spawn.y;
      s.vx = 0; s.vy = 0; s.inv = 120;
    }
  };

  // ---------- boucle principale ----------
  useEffect(() => {
    loadLevel(0, false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      const k = e.key;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' '].includes(k)) e.preventDefault();
      if (k === 'ArrowLeft' || k === 'q' || k === 'Q') s.keys.left = down;
      if (k === 'ArrowRight' || k === 'd' || k === 'D') s.keys.right = down;
      if (k === 'ArrowUp' || k === ' ' || k === 'z' || k === 'Z') s.keys.jump = down;
      if (down && (k === 'p' || k === 'P' || k === 'Escape')) {
        setScreenBoth(s.screen === 'playing' ? 'paused' : s.screen === 'paused' ? 'playing' : s.screen);
      }
    };
    const kd = onKey(true);
    const ku = onKey(false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    let raf = 0;
    const overlap = (ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) =>
      ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;

    const step = () => {
      raf = requestAnimationFrame(step);
      if (s.screen !== 'playing') return;
      s.t += 1;
      const lv = LEVELS[s.levelIdx];

      // --- entrées ---
      const target = (s.keys.right ? SPEED : 0) - (s.keys.left ? SPEED : 0);
      s.vx += (target - s.vx) * 0.35;
      if (Math.abs(s.vx) < 0.05) s.vx = 0;
      if (target !== 0) s.face = target > 0 ? 1 : -1;
      if (s.keys.jump && s.onGround) {
        s.vy = JUMP;
        s.onGround = false;
        s.keys.jump = false;
        beep(520, 0.1);
      }

      // --- axe X ---
      s.px += s.vx;
      if (s.px < 0) s.px = 0;
      if (s.px > lv.width - s.pw) s.px = lv.width - s.pw;
      for (const p of lv.plats) {
        if (overlap(s.px, s.py, s.pw, s.ph, p.x, p.y, p.w, p.h)) {
          if (s.vx > 0) s.px = p.x - s.pw;
          else if (s.vx < 0) s.px = p.x + p.w;
          s.vx = 0;
        }
      }

      // --- axe Y ---
      s.vy = Math.min(s.vy + GRAV, 16);
      s.py += s.vy;
      s.onGround = false;
      for (const p of lv.plats) {
        if (overlap(s.px, s.py, s.pw, s.ph, p.x, p.y, p.w, p.h)) {
          if (s.vy > 0) { s.py = p.y - s.ph; s.vy = 0; s.onGround = true; }
          else if (s.vy < 0) { s.py = p.y + p.h; s.vy = 0; }
        }
      }

      // --- chute dans un trou ---
      if (s.py > H + 40) { hurt(); return; }
      if (s.inv > 0) s.inv -= 1;

      // --- ennemis ---
      for (const e of s.enemies) {
        if (!e.alive) { if (e.squash > 0) e.squash -= 1; continue; }
        e.x += e.vx;
        if (e.x < e.minX) { e.x = e.minX; e.vx = Math.abs(e.vx); }
        if (e.x + e.w > e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.vx); }
        if (overlap(s.px, s.py, s.pw, s.ph, e.x, e.y, e.w, e.h)) {
          const stomp = s.vy > 0 && s.py + s.ph - e.y < 22;
          if (stomp) {
            e.alive = false; e.squash = 24;
            s.score += 100;
            s.vy = -8.5;
            beep(700, 0.08);
          } else {
            hurt();
            if (s.screen !== 'playing') return;
            s.vx = e.x + e.w / 2 < s.px + s.pw / 2 ? 5 : -5;
            s.vy = -7;
          }
        }
      }

      // --- pièces ---
      for (const c of s.coinsArr) {
        if (c.taken) continue;
        if (overlap(s.px, s.py, s.pw, s.ph, c.x - 12, c.y - 12, 24, 24)) {
          c.taken = true;
          s.coins += 1;
          s.score += 50;
          beep(880, 0.07);
          setTimeout(() => beep(1320, 0.09), 60);
        }
      }

      // --- drapeau ---
      const goalX = lv.width - 90;
      if (s.px + s.pw >= goalX && s.py + s.ph >= GY - 160) {
        s.score += s.lives * 100;
        if (s.levelIdx >= LEVELS.length - 1) {
          const wasCompleted = (() => {
            try { return (loadProgress().completedGames || []).includes('python-hero'); } catch { return false; }
          })();
          completeGame('python-hero', s.score, 50);
          onProgressUpdate();
          const best = (() => {
            try { return loadProgress().gameScores['python-hero'] || s.score; } catch { return s.score; }
          })();
          setFinalStats({ score: s.score, coins: s.coins, best, firstWin: !wasCompleted });
          setScreenBoth('victory');
          beep(660, 0.12); setTimeout(() => beep(880, 0.12), 130); setTimeout(() => beep(1100, 0.25), 260);
        } else {
          setScreenBoth('levelClear');
          beep(660, 0.1); setTimeout(() => beep(990, 0.15), 110);
        }
        return;
      }

      // --- caméra ---
      s.camX = Math.max(0, Math.min(s.px - W * 0.38, lv.width - W));

      draw(ctx);
    };

    const draw = (c: CanvasRenderingContext2D) => {
      const lv = LEVELS[s.levelIdx];
      // ciel
      const sky = c.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#5c9ded');
      sky.addColorStop(1, '#bfe3ff');
      c.fillStyle = sky;
      c.fillRect(0, 0, W, H);
      // nuages + collines (parallaxe simple)
      c.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < 6; i++) {
        const cx = ((i * 430 - s.camX * 0.3) % (lv.width)) % (W + 200) - 100;
        const cy = 60 + (i % 3) * 45;
        c.beginPath();
        c.ellipse(cx < 0 ? cx + W + 200 : cx, cy, 46, 20, 0, 0, Math.PI * 2);
        c.ellipse((cx < 0 ? cx + W + 200 : cx) + 30, cy + 6, 34, 16, 0, 0, Math.PI * 2);
        c.fill();
      }
      c.fillStyle = '#7ec850';
      for (let i = 0; i < 5; i++) {
        const hx = i * 700 - (s.camX * 0.5 % 700);
        c.beginPath();
        c.arc(hx, H, 260, Math.PI, 0);
        c.fill();
      }

      c.save();
      c.translate(-s.camX, 0);

      // plateformes façon Mario : brique + herbe
      for (const p of lv.plats) {
        const isGround = p.h >= GROUND_H;
        c.fillStyle = isGround ? '#c0703a' : '#e8a04c';
        c.fillRect(p.x, p.y, p.w, p.h);
        c.fillStyle = isGround ? '#8a4f24' : '#b8772f';
        for (let bx = p.x; bx < p.x + p.w; bx += 32) {
          c.fillRect(bx, p.y, 2, p.h);
        }
        c.fillStyle = '#3fae4a';
        c.fillRect(p.x, p.y, p.w, 10);
        c.fillStyle = '#2c7f34';
        c.fillRect(p.x, p.y + 10, p.w, 4);
      }

      // pièces (pulsation)
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      for (const cn of s.coinsArr) {
        if (cn.taken) continue;
        const pulse = 1 + Math.sin((s.t + cn.phase * 9) * 0.12) * 0.12;
        c.font = `${Math.round(26 * pulse)}px serif`;
        c.fillText('🪙', cn.x, cn.y);
      }

      // drapeau
      const goalX = lv.width - 90;
      c.fillStyle = '#8a8a8a';
      c.fillRect(goalX + 30, GY - 160, 6, 160);
      c.font = '34px serif';
      c.fillText('🏁', goalX + 52, GY - 148);
      c.fillStyle = 'rgba(0,0,0,0.35)';
      c.font = 'bold 15px sans-serif';
      c.fillText('ARRIVÉE', goalX + 40, GY - 180);

      // ennemis bugs
      for (const e of s.enemies) {
        if (!e.alive && e.squash <= 0) continue;
        if (!e.alive) {
          c.font = '26px serif';
          c.fillText('💥', e.x + e.w / 2, e.y + 10);
          continue;
        }
        const wob = Math.sin(s.t * 0.25) * 2;
        c.font = '30px serif';
        c.fillText('🐛', e.x + e.w / 2, e.y + e.h / 2 + wob);
      }

      // héros python (clignote si invincible)
      if (!(s.inv > 0 && Math.floor(s.t / 5) % 2 === 0)) {
        // cape
        c.fillStyle = '#d63b3b';
        const capeX = s.face === 1 ? s.px - 12 : s.px + s.pw - 2;
        c.beginPath();
        c.moveTo(s.face === 1 ? s.px + 4 : s.px + s.pw - 4, s.py + 8);
        c.lineTo(capeX + (s.face === 1 ? 0 : 14), s.py + 30 + Math.sin(s.t * 0.2) * 3);
        c.lineTo(s.face === 1 ? s.px + 4 : s.px + s.pw - 4, s.py + 34);
        c.fill();
        // corps
        c.fillStyle = '#3776ab';
        c.beginPath();
        c.roundRect(s.px, s.py, s.pw, s.ph, 10);
        c.fill();
        // ventre jaune
        c.fillStyle = '#ffd43b';
        c.beginPath();
        c.roundRect(s.px + 7, s.py + 16, s.pw - 14, s.ph - 22, 7);
        c.fill();
        // yeux
        const ex = s.face === 1 ? s.px + 20 : s.px + 6;
        c.fillStyle = '#fff';
        c.beginPath(); c.arc(ex, s.py + 10, 6, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(ex + (s.face === 1 ? 8 : 6), s.py + 10, 6, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#111';
        c.beginPath(); c.arc(ex + (s.face === 1 ? 2 : 0), s.py + 10, 2.6, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(ex + (s.face === 1 ? 10 : 6), s.py + 10, 2.6, 0, Math.PI * 2); c.fill();
      }

      c.restore();

      // HUD dans le canvas
      c.fillStyle = 'rgba(0,0,0,0.45)';
      c.beginPath();
      c.roundRect(10, 10, 300, 64, 12);
      c.fill();
      c.fillStyle = '#fff';
      c.font = 'bold 17px sans-serif';
      c.textAlign = 'left';
      c.textBaseline = 'alphabetic';
      c.fillText(`⭐ ${s.score}`, 24, 36);
      c.fillText(`🪙 ${s.coins}`, 130, 36);
      c.fillText('❤️'.repeat(Math.max(0, s.lives)) || '💀', 24, 62);
      c.fillStyle = '#ffd43b';
      c.textAlign = 'right';
      c.fillText(lv.name, W - 16, 36);
      c.fillStyle = '#fff';
      c.font = '13px sans-serif';
      c.fillText('P : pause', W - 16, 58);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const press = (key: 'left' | 'right' | 'jump', down: boolean) => {
    stateRef.current.keys[key] = down;
  };

  const nextLevel = () => {
    loadLevel(stateRef.current.levelIdx + 1, true);
    setScreenBoth('playing');
  };

  const retryAll = () => {
    loadLevel(0, false);
    setScreenBoth('playing');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => onNavigate('jeux')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Retour aux divertissements
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            🐍 Super <span className="gradient-text">Python Hero</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">{LEVELS[levelIdx].name} — {LEVELS[levelIdx].hint}</p>
        </div>

        <div className="relative glass rounded-2xl overflow-hidden">
          <canvas ref={canvasRef} width={W} height={H} className="w-full h-auto block" />

          {/* PAUSE */}
          {screen === 'paused' && (
            <Overlay title="⏸️ Pause" onResume={() => setScreenBoth('playing')} resumeLabel="Reprendre" />
          )}

          {/* FIN DE NIVEAU */}
          {screen === 'levelClear' && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center animate-slide-up">
                <div className="text-6xl mb-4">🏁</div>
                <h2 className="text-3xl font-bold text-white mb-2">Niveau terminé !</h2>
                <p className="text-gray-300 mb-6">Bonus de vies : +{stateRef.current.lives * 100} ⭐</p>
                <button
                  onClick={nextLevel}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-lg hover:-translate-y-0.5 transition-all"
                >
                  Niveau suivant → ({LEVELS[levelIdx + 1].name})
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER */}
          {screen === 'gameOver' && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center animate-slide-up">
                <div className="text-6xl mb-4">💀</div>
                <h2 className="text-3xl font-bold text-white mb-2">Partie terminée !</h2>
                <p className="text-gray-300 mb-6">Les bugs ont eu raison du héros... retente ta chance !</p>
                <button
                  onClick={retryAll}
                  className="flex items-center gap-2 mx-auto px-8 py-3 rounded-xl bg-gradient-to-r from-python-blue to-python-blue/80 text-white font-bold text-lg hover:-translate-y-0.5 transition-all"
                >
                  <RotateCcw size={18} /> Recommencer
                </button>
              </div>
            </div>
          )}

          {/* VICTOIRE */}
          {screen === 'victory' && (
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
              <div className="text-center animate-slide-up px-6">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-bold text-white mb-2">Tu as sauvé le Royaume Python !</h2>
                <p className="text-gray-300 mb-1">Score : <strong className="text-python-yellow">{finalStats.score} ⭐</strong> • Pièces : {finalStats.coins} 🪙</p>
                <p className="text-gray-400 text-sm mb-6">
                  Record : {finalStats.best} ⭐ {finalStats.firstWin ? '• +50 XP gagnés ! 🎮 Badge débloqué.' : '• (+50 XP déjà obtenus)'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={retryAll}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all mx-auto"
                  >
                    <RotateCcw size={18} /> Rejouer
                  </button>
                  <button
                    onClick={() => onNavigate('jeux')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-python-blue to-python-blue/80 text-white font-bold transition-all mx-auto"
                  >
                    Retour aux jeux
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contrôles */}
        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <CtrlBtn label="◀" onDown={() => press('left', true)} onUp={() => press('left', false)} />
            <CtrlBtn label="▶" onDown={() => press('right', true)} onUp={() => press('right', false)} />
            <CtrlBtn label="⤒ SAUT" wide onDown={() => press('jump', true)} onUp={() => press('jump', false)} />
          </div>
          <div className="hidden sm:block text-xs text-gray-500">
            Clavier : <strong className="text-gray-300">← →</strong> courir • <strong className="text-gray-300">Espace</strong> sauter • <strong className="text-gray-300">P</strong> pause
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { stateRef.current.muted = !stateRef.current.muted; setScreen(s => s); }}
              className="p-2.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5"
              title="Son on/off"
            >
              {stateRef.current.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              onClick={() => setScreenBoth(screen === 'playing' ? 'paused' : 'playing')}
              className="p-2.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5"
              title="Pause"
            >
              {screen === 'paused' ? <Play size={18} /> : <Pause size={18} />}
            </button>
            <button
              onClick={retryAll}
              className="p-2.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5"
              title="Recommencer"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Overlay({ title, onResume, resumeLabel }: { title: string; onResume: () => void; resumeLabel: string }) {
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        <button
          onClick={onResume}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-python-blue to-python-blue/80 text-white font-bold text-lg"
        >
          {resumeLabel}
        </button>
      </div>
    </div>
  );
}

function CtrlBtn({ label, onDown, onUp, wide }: { label: string; onDown: () => void; onUp: () => void; wide?: boolean }) {
  return (
    <button
      onPointerDown={e => { e.preventDefault(); onDown(); }}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onPointerCancel={onUp}
      onContextMenu={e => e.preventDefault()}
      className={`select-none touch-none rounded-xl border border-white/20 bg-white/5 active:bg-python-blue/40 text-white font-bold text-lg ${wide ? 'px-6 py-3' : 'w-14 h-14'} flex items-center justify-center`}
    >
      {label}
    </button>
  );
}
