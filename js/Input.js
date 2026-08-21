export class InputHandler {
  constructor() {
    this.keys = {};
    this.pressed = {};

    const keyMap = {
      ArrowUp: 'up', KeyW: 'up',
      ArrowDown: 'down', KeyS: 'down',
      ArrowLeft: 'left', KeyA: 'left',
      ArrowRight: 'right', KeyD: 'right',
      KeyZ: 'confirm', Enter: 'confirm',
      KeyX: 'cancel', ShiftLeft: 'cancel', ShiftRight: 'cancel'
    };

    window.addEventListener('keydown', (e) => {
      const action = keyMap[e.code];
      if (action) {
        if (!this.keys[action]) this.pressed[action] = true;
        this.keys[action] = true;
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      const action = keyMap[e.code];
      if (action) {
        this.keys[action] = false;
        e.preventDefault();
      }
    });
  }

  isHeld(action) {
    return !!this.keys[action];
  }

  isPressed(action) {
    return !!this.pressed[action];
  }

  resetPressed() {
    this.pressed = {};
  }
}