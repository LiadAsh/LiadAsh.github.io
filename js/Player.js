export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    
    // Collision bounding box offset (lower half of body)
    this.boxOffset = { x: 2, y: 8, w: 12, h: 8 };

    this.walkSpeed = 1.25;
    this.runSpeed = 2.25;
    this.facing = 'down'; // 'up', 'down', 'left', 'right'
    this.isMoving = false;

    // Sprite Animation States
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

    const reach = 12;
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
      // Set Facing Direction
      if (dy < 0) this.facing = 'up';
      if (dy > 0) this.facing = 'down';
      if (dx < 0) this.facing = 'left';
      if (dx > 0) this.facing = 'right';

      // Speed Modifier
      const currentSpeed = input.isHeld('cancel') ? this.runSpeed : this.walkSpeed;

      // Normalize diagonal speed
      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      // X-Axis Movement & Wall Sliding
      const nextX = this.x + dx * currentSpeed;
      if (!map.checkCollision(this.getBounds(nextX, this.y))) {
        this.x = nextX;
      }

      // Y-Axis Movement & Wall Sliding
      const nextY = this.y + dy * currentSpeed;
      if (!map.checkCollision(this.getBounds(this.x, nextY))) {
        this.y = nextY;
      }

      // Animation Timer
      this.animTimer += input.isHeld('cancel') ? 1.5 : 1;
      if (this.animTimer >= 10) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 4;
      }
    } else {
      this.animFrame = 0;
    }
  }

  render(ctx) {
    // Procedural Fallback Sprite (Kris Color Palette)
    ctx.fillStyle = '#00FFFF'; // Hair/Skin
    ctx.fillRect(this.x + 3, this.y, 10, 6);

    ctx.fillStyle = '#008000'; // Torso
    ctx.fillRect(this.x + 2, this.y + 6, 12, 6);

    ctx.fillStyle = '#000080'; // Legs
    ctx.fillRect(this.x + 3, this.y + 12, 10, 4);

    // Direction Indicator/Facing visor
    ctx.fillStyle = '#FF0000';
    if (this.facing === 'down') ctx.fillRect(this.x + 5, this.y + 4, 6, 2);
    if (this.facing === 'up') ctx.fillRect(this.x + 5, this.y + 1, 6, 2);
    if (this.facing === 'left') ctx.fillRect(this.x + 2, this.y + 3, 2, 4);
    if (this.facing === 'right') ctx.fillRect(this.x + 12, this.y + 3, 2, 4);
  }
}