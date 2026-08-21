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

    // Transition State
    this.fadeAlpha = 0;
    this.isTransitioning = false;

    this.lastTime = 0;
    this.accumulatedTime = 0;
    this.step = 1 / 60; // Fixed update time step (60fps)
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
    if (this.isTransitioning) {
      this.fadeAlpha = Math.min(1, this.fadeAlpha + dt * 1.5);
      return;
    }

    if (this.textbox.visible) {
      this.textbox.update(this.input);
      return;
    }

    this.player.update(this.input, this.map);

    // Check Dialogue Trigger
    if (this.input.isPressed('confirm')) {
      const targetPoint = this.player.getInteractionTile();
      const object = this.map.getInteractableAt(targetPoint);
      if (object) {
        this.textbox.start(object.dialogue);
      }
    }

    // Check Transition Trigger
    if (this.map.checkDoor(this.player.getBounds())) {
      this.isTransitioning = true;
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // World Render
    this.map.render(this.ctx);
    this.player.render(this.ctx);

    // UI Render
    this.textbox.render(this.ctx);

    // Screen Fade Effect
    if (this.fadeAlpha > 0) {
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}