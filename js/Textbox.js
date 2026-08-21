export class Textbox {
  constructor() {
    this.visible = false;
    this.textQueue = [];
    this.currentText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.timer = 0;
    this.speed = 2; // Frames per character
    this.isFinished = false;

    // Web Audio Synthesizer for Deltarune Text Blip
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
    osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.audioCtx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.04);
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
      this.isFinished = false;
    } else {
      this.visible = false;
      this.isFinished = true;
    }
  }

  update(input) {
    if (!this.visible) return;

    if (input.isPressed('confirm')) {
      if (this.charIndex < this.currentText.length) {
        // Fast-forward text
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

    // Middle Black Box
    ctx.fillStyle = '#000000';
    ctx.fillRect(19, 163, 282, 62);

    // Inner Thin White Line Border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.strokeRect(21.5, 165.5, 277, 57);

    // Text Rendering
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px "VT323", monospace';
    ctx.textBaseline = 'top';

    const maxCharsPerLine = 32;
    const words = this.displayedText.split(' ');
    let line = '';
    let y = 173;

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      if (testLine.length > maxCharsPerLine && i > 0) {
        ctx.fillText(line, 32, y);
        line = words[i] + ' ';
        y += 18;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 32, y);
  }
}