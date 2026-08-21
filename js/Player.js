import { drawPixelMatrix, PALETTE, KRIS_DOWN, KRIS_UP, KRIS_LEFT, KRIS_RIGHT } from './Sprites.js';

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 17;
    this.height = 18;
    this.boxOffset = { x: 2, y: 10, w: 13, h: 8 };

    this.walkSpeed = 1.35;
    this.runSpeed = 2.3;
    this.facing = 'down';
    this.isMoving = false;

    this.animFrame = 0;
    this.animTimer = 0;
  }

  getBounds(targetX = this.x, targetY = this.y) {
    return {
      x: targetX + this.boxOffset.x,
      y: targetY + this.boxOffset.y,
      w: this.boxOffset.w,
      h: this.boxOffset.h
    };
  }

  getInteractionTile() {
    let checkX = this.x + this.boxOffset.x + this.boxOffset.w / 2;
    let checkY = this.y + this.boxOffset.y + this.boxOffset.h / 2;

    const reach = 14;
    if (this.facing === 'up') checkY -= reach;
    if (this.facing === 'down') checkY += reach;
    if (this.facing === 'left') checkX -= reach;
    if (this.facing === 'right') checkX += reach;

    return { x: checkX, y: checkY };
  }

  update(input, map) {
    let dx = 0;
    let dy = 0;

    if (input.isHeld('left')) dx -= 1;
    if (input.isHeld('right')) dx += 1;
    if (input.isHeld('up')) dy -= 1;
    if (input.isHeld('down')) dy += 1;

    this.isMoving = dx !== 0 || dy !== 0;

    if (this.isMoving) {
      if (dy < 0) this.facing = 'up';
      else if (dy > 0) this.facing = 'down';
      else if (dx < 0) this.facing = 'left';
      else if (dx > 0) this.facing = 'right';

      const speed = input.isHeld('cancel') ? this.runSpeed : this.walkSpeed;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      const nextX = this.x + dx * speed;
      if (!map.checkCollision(this.getBounds(nextX, this.y))) {
        this.x = nextX;
      }

      const nextY = this.y + dy * speed;
      if (!map.checkCollision(this.getBounds(this.x, nextY))) {
        this.y = nextY;
      }

      this.animTimer += input.isHeld('cancel') ? 1.8 : 1;
      if (this.animTimer >= 8) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 4;
      }
    } else {
      this.animFrame = 0;
    }
  }

  render(ctx) {
    let spriteMatrix = KRIS_DOWN;
    if (this.facing === 'up') spriteMatrix = KRIS_UP;
    if (this.facing === 'left') spriteMatrix = KRIS_LEFT;
    if (this.facing === 'right') spriteMatrix = KRIS_RIGHT;

    // Walk Bobbing Offset
    const bobY = (this.animFrame === 1) ? -1 : (this.animFrame === 3) ? 1 : 0;

    drawPixelMatrix(
      ctx,
      spriteMatrix,
      PALETTE,
      Math.round(this.x),
      Math.round(this.y) + bobY,
      1
    );
  }
}
