export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 19;
    this.height = 28;
    
    this.boxOffset = { x: 3, y: 16, w: 13, h: 12 };

    this.walkSpeed = 1.35;
    this.runSpeed = 2.4;
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
      if (dy > 0) this.facing = 'down';
      if (dx < 0) this.facing = 'left';
      if (dx > 0) this.facing = 'right';

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
      if (!map.checkCollision(this.x, nextY)) {
        this.y = nextY;
      }

      this.animTimer += input.isHeld('cancel') ? 1.8 : 1;
      if (this.animTimer >= 10) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 4;
      }
    } else {
      this.animFrame = 0;
    }
  }

  render(ctx) {
    const px = Math.round(this.x);
    const py = Math.round(this.y);

    // Bobbing step offset
    const stepY = (this.animFrame === 1 || this.animFrame === 3) ? -1 : 0;

    // Hair
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(px + 2, py + stepY, 15, 10);

    // Skin (Cyan Light World/Dark World Tone)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(px + 4, py + 8 + stepY, 11, 6);

    // Green Torso with Yellow Stripe
    ctx.fillStyle = '#15803d';
    ctx.fillRect(px + 3, py + 13 + stepY, 13, 9);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(px + 3, py + 17 + stepY, 13, 2);

    // Dark Pants & Shoes
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(px + 4, py + 22, 11, 6);

    // Face / Direction Detailing
    if (this.facing === 'down') {
      ctx.fillStyle = '#0f172a'; // Bangs over eyes
      ctx.fillRect(px + 3, py + 6 + stepY, 13, 5);
    } else if (this.facing === 'left') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(px + 1, py + 4 + stepY, 6, 12);
    } else if (this.facing === 'right') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(px + 12, py + 4 + stepY, 6, 12);
    }
  }
}
