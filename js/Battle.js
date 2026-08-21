import { drawPixelMatrix, PALETTE, SOUL_SPRITE, MONSTER_SPRITE } from './Sprites.js';

export class BattleEngine {
  constructor() {
    this.active = false;
    this.state = 'MENU'; // 'MENU', 'ENEMY_TURN', 'VICTORY'
    this.menuIndex = 0;
    this.options = ['FIGHT', 'ACT', 'ITEM', 'MERCY'];

    // Player Stats
    this.playerHp = 90;
    this.maxHp = 90;

    // Enemy Stats & Bullets
    this.enemyHp = 100;
    this.bullets = [];
    this.turnTimer = 0;

    // SOUL Position inside Bullet Box
    this.soul = { x: 156, y: 145, speed: 2 };
    this.box = { x: 110, y: 110, w: 100, h: 70 };
  }

  startBattle() {
    this.active = true;
    this.state = 'MENU';
    this.menuIndex = 0;
    this.enemyHp = 100;
    this.playerHp = 90;
  }

  update(input) {
    if (!this.active) return;

    if (this.state === 'MENU') {
      if (input.isPressed('left')) {
        this.menuIndex = (this.menuIndex - 1 + 4) % 4;
      }
      if (input.isPressed('right')) {
        this.menuIndex = (this.menuIndex + 1) % 4;
      }
      if (input.isPressed('confirm')) {
        if (this.menuIndex === 0) { // FIGHT
          this.enemyHp -= 35;
        } else if (this.menuIndex === 3) { // MERCY
          this.active = false; // Spare & exit
          return;
        }

        if (this.enemyHp <= 0) {
          this.active = false; // Defeated enemy
          return;
        }

        // Start Enemy Bullet Phase
        this.state = 'ENEMY_TURN';
        this.turnTimer = 0;
        this.soul.x = this.box.x + this.box.w / 2 - 4;
        this.soul.y = this.box.y + this.box.h / 2 - 4;
        this.spawnBullets();
      }
    } else if (this.state === 'ENEMY_TURN') {
      // SOUL Evasion Movement
      if (input.isHeld('left')) this.soul.x -= this.soul.speed;
      if (input.isHeld('right')) this.soul.x += this.soul.speed;
      if (input.isHeld('up')) this.soul.y -= this.soul.speed;
      if (input.isHeld('down')) this.soul.y += this.soul.speed;

      // SOUL Box Boundary Constraints
      this.soul.x = Math.max(this.box.x + 2, Math.min(this.box.x + this.box.w - 10, this.soul.x));
      this.soul.y = Math.max(this.box.y + 2, Math.min(this.box.y + this.box.h - 10, this.soul.y));

      // Update Bullets
      this.bullets.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        // Collision with SOUL
        if (
          this.soul.x < b.x + 4 &&
          this.soul.x + 8 > b.x &&
          this.soul.y < b.y + 4 &&
          this.soul.y + 8 > b.y
        ) {
          this.playerHp = Math.max(0, this.playerHp - 1);
        }
      });

      this.turnTimer++;
      if (this.turnTimer > 200) {
        this.state = 'MENU';
      }
    }
  }

  spawnBullets() {
    this.bullets = [];
    for (let i = 0; i < 6; i++) {
      this.bullets.push({
        x: this.box.x + Math.random() * (this.box.w - 10),
        y: this.box.y - 10 - i * 15,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1.2
      });
    }
  }

  render(ctx) {
    if (!this.active) return;

    // Dark Background
    ctx.fillStyle = '#0f0814';
    ctx.fillRect(0, 0, 320, 240);

    // Enemy Sprite
    drawPixelMatrix(ctx, MONSTER_SPRITE, PALETTE, 136, 25, 3);

    // Enemy Health Bar
    ctx.fillStyle = '#334155';
    ctx.fillRect(110, 80, 100, 6);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(110, 80, Math.max(0, this.enemyHp), 6);

    if (this.state === 'ENEMY_TURN') {
      // Bullet Box Frame
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.box.x, this.box.y, this.box.w, this.box.h);
      ctx.fillStyle = '#000000';
      ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);

      // Render SOUL
      drawPixelMatrix(ctx, SOUL_SPRITE, PALETTE, this.soul.x, this.soul.y, 1);

      // Render Bullets
      ctx.fillStyle = '#e0e7ff';
      this.bullets.forEach(b => {
        ctx.fillRect(Math.round(b.x), Math.round(b.y), 4, 4);
      });
    }

    // Deltarune Bottom HUD Panel
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 185, 320, 55);

    // Player Name & Health Display
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText(`KRIS   HP ${this.playerHp}/${this.maxHp}`, 20, 193);

    // Action Menu Buttons
    this.options.forEach((opt, idx) => {
      const bx = 16 + idx * 74;
      const by = 206;

      ctx.strokeStyle = (this.menuIndex === idx && this.state === 'MENU') ? '#facc15' : '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, 66, 22);

      ctx.fillStyle = (this.menuIndex === idx && this.state === 'MENU') ? '#facc15' : '#94a3b8';
      ctx.fillText(opt, bx + 8, by + 7);
    });
  }
}
