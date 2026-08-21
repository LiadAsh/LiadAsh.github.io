import { InputHandler } from './Input.js';
import { Player } from './Player.js';
import { RoomMap } from './Map.js';
import { Textbox } from './Textbox.js';

export class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.input = new InputHandler();
    this.player = new Player(152, 120);
    this.map = new RoomMap();
    this.textbox = new Textbox();

    // Fade Transition States: 'none', 'out', 'in'
    this.fadeAlpha = 0;
    this.fadeState = 'none';

    this.lastTime = 0;
    this.accumulatedTime = 0;
    this.step = 1 / 60;
  }

  start() {
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(currentTime) {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    this.accumulatedTime += Math.min(deltaTime, 0.1);

    while (this.accumulatedTime >= this.step) {
      this.update(this.step);
      this.accumulatedTime -= this.step;
    }

    this.render();
    this.input.resetPressed();
    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    // Handle Room Transition Fading
    if (this.fadeState === 'out') {
      this.fadeAlpha += dt * 2.5;
      if (this.fadeAlpha >= 1) {
        this.fadeAlpha = 1;
        
        // Swap rooms at peak dark
        if (this.map.currentRoom === 'bedroom') {
          this.map.loadRoom('hallway');
          this.player.x = 152;
          this.player.y = 45;
          this.player.facing = 'down';
        } else {
          this.map.loadRoom('bedroom');
          this.player.x = 144;
          this.player.y = 185;
          this.player.facing = 'up';
        }

        this.fadeState = 'in';
      }
      return;
    }

    if (this.fadeState === 'in') {
      this.fadeAlpha -= dt * 2.5;
      if (this.fadeAlpha <= 0) {
        this.fadeAlpha = 0;
        this.fadeState = 'none';
      }
    }

    // Lock player during textboxes
    if (this.textbox.visible) {
      this.textbox.update(this.input);
      return;
    }

    this.player.update(this.input, this.map);

    // Dialogue Triggering
    if (this.input.isPressed('confirm')) {
      const targetPoint = this.player.getInteractionTile();
      const object = this.map.getInteractableAt(targetPoint);
      if (object) {
        this.textbox.start(object.dialogue);
      }
    }

    // Transition Triggering
    if (this.map.checkDoor(this.player.getBounds()) && this.fadeState === 'none') {
      this.fadeState = 'out';
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    // Scale 320x240 coordinate system up to full 640x480 canvas
    this.ctx.scale(2, 2);
    this.ctx.imageSmoothingEnabled = false;

    // World & Entities
    this.map.render(this.ctx);
    this.player.render(this.ctx);

    // Dialogue UI
    this.textbox.render(this.ctx);

    // Fade Transition Mask
    if (this.fadeAlpha > 0) {
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
      this.ctx.fillRect(0, 0, 320, 240);
    }

    this.ctx.restore();
  }
}
