export class Textbox {
  constructor() {
    this.visible = false;
    this.textQueue = [];
    this.currentText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.timer = 0;
    this.speed = 2;
    this.audioCtx = null;
  }

  initAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playBlip() {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(280, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.035);
    
    gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.035);
  }

  start(lines) {
    this.initAudio();
    this.textQueue = Array.isArray(lines) ? [...lines] : [lines];
    this.visible = true;
    this.advance();
  }

  advance() {
    if (this.textQueue.length > 0) {
      this.currentText = this.textQueue.shift();
      if (!this.currentText.startsWith('*')) {
        this.currentText = '* ' + this.currentText;
      }
      this.displayedText = "";
      this.charIndex = 0;
    } else {
      this.visible = false;
    }
  }

  update(input) {
    if (!this.visible) return;

    if (input.isPressed('confirm')) {
      if (this.charIndex < this.currentText.length) {
        this.displayedText = this.currentText;
        this.charIndex = this.currentText.length;
      } else {
        this.advance();
      }
      return;
    }

    if (this.charIndex < this.currentText.length) {
      this.timer++;
      if (this.timer >= this.speed) {
        this.timer = 0;
        const nextChar = this.currentText[this.charIndex];
        this.displayedText += nextChar;
        this.charIndex++;

        if (nextChar !== ' ' && nextChar !== '*') {
          this.playBlip();
        }
      }
    }
  }

  render(ctx) {
    if (!this.visible) return;

    // Outer White Box
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(16, 160, 288, 68);

    // Inner Black Box
    ctx.fillStyle = '#000000';
    ctx.fillRect(19, 163, 282, 62);

    // Crisp Pixel Text Setup
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textBaseline = 'top';

    // Multi-line Text Formatting
    const maxLineLength = 25;
    const words = this.displayedText.split(' ');
    let line = '';
    let y = 174;

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      if (testLine.length > maxLineLength && i > 0) {
        ctx.fillText(line.trimEnd(), 30, y);
        line = words[i] + ' ';
        y += 16;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trimEnd(), 30, y);
  }
}
