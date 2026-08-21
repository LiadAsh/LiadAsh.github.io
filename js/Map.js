export class RoomMap {
  constructor() {
    this.width = 320;
    this.height = 240;
    this.loadRoom('bedroom');
  }

  loadRoom(roomId) {
    this.currentRoom = roomId;

    if (roomId === 'bedroom') {
      this.colliders = [
        { x: 0, y: 0, w: 320, h: 50 },   // Top Wall
        { x: 0, y: 0, w: 24, h: 240 },   // Left Wall
        { x: 296, y: 0, w: 24, h: 240 }, // Right Wall
        { x: 0, y: 216, w: 130, h: 24 }, // Bottom Wall Left
        { x: 170, y: 216, w: 150, h: 24 } // Bottom Wall Right
      ];

      this.interactables = [
        {
          id: 'bed',
          x: 35, y: 45, w: 42, h: 65,
          dialogue: ["It's Kris's bed.", "* (The blanket has a distinct lack of warmth.)"]
        },
        {
          id: 'shelf',
          x: 220, y: 35, w: 55, h: 32,
          dialogue: ["* (A dusty bookshelf.)", "* (Contains old game manuals and an unread book.)"]
        },
        {
          id: 'carpet',
          x: 120, y: 110, w: 80, h: 50,
          dialogue: ["* (A cozy brown rug sitting in the middle of the room.)"]
        }
      ];

      this.door = { x: 130, y: 218, w: 40, h: 10 };

    } else if (roomId === 'hallway') {
      this.colliders = [
        { x: 0, y: 0, w: 130, h: 40 },   // Top Wall Left
        { x: 170, y: 0, w: 150, h: 40 }, // Top Wall Right
        { x: 0, y: 0, w: 24, h: 240 },   // Left Wall
        { x: 296, y: 0, w: 24, h: 240 }, // Right Wall
        { x: 0, y: 216, w: 320, h: 24 }  // Bottom Wall
      ];

      this.interactables = [
        {
          id: 'stairs',
          x: 230, y: 30, w: 50, h: 40,
          dialogue: ["* (Stairs leading down to the living room.)"]
        },
        {
          id: 'plant',
          x: 35, y: 35, w: 25, h: 30,
          dialogue: ["* (A houseplant. It looks well cared for.)"]
        }
      ];

      this.door = { x: 130, y: 20, w: 40, h: 15 };
    }

    // Add interactables to physics colliders
    this.interactables.forEach(obj => {
      if (obj.id !== 'carpet') {
        this.colliders.push({ x: obj.x, y: obj.y, w: obj.w, h: obj.h });
      }
    });
  }

  checkCollision(rect) {
    return this.colliders.some(col => 
      rect.x < col.x + col.w &&
      rect.x + rect.w > col.x &&
      rect.y < col.y + col.h &&
      rect.y + rect.h > col.y
    );
  }

  getInteractableAt(point) {
    return this.interactables.find(obj =>
      point.x >= obj.x && point.x <= obj.x + obj.w &&
      point.y >= obj.y && point.y <= obj.y + obj.h
    );
  }

  checkDoor(rect) {
    return (
      rect.x < this.door.x + this.door.w &&
      rect.x + rect.w > this.door.x &&
      rect.y < this.door.y + this.door.h &&
      rect.y + rect.h > this.door.y
    );
  }

  render(ctx) {
    if (this.currentRoom === 'bedroom') {
      // Wood Floor
      ctx.fillStyle = '#2d1b2d';
      ctx.fillRect(0, 0, 320, 240);
      ctx.fillStyle = '#231423';
      for (let y = 50; y < 220; y += 16) {
        ctx.fillRect(0, y, 320, 1);
      }

      // Walls
      ctx.fillStyle = '#130a17';
      ctx.fillRect(0, 0, 320, 50);
      ctx.fillRect(0, 0, 24, 240);
      ctx.fillRect(296, 0, 24, 240);
      ctx.fillRect(0, 216, 320, 24);

      // Window Light Beam
      ctx.fillStyle = 'rgba(255, 235, 150, 0.08)';
      ctx.beginPath();
      ctx.moveTo(140, 50);
      ctx.lineTo(180, 50);
      ctx.lineTo(220, 180);
      ctx.lineTo(150, 180);
      ctx.fill();

      // Carpet
      ctx.fillStyle = '#5c3317';
      ctx.fillRect(120, 110, 80, 50);
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(123, 113, 74, 44);

      // Bed
      ctx.fillStyle = '#3e2723';
      ctx.fillRect(35, 45, 42, 65); // Frame
      ctx.fillStyle = '#90a4ae';
      ctx.fillRect(39, 48, 34, 14); // Pillow
      ctx.fillStyle = '#b71c1c';
      ctx.fillRect(39, 64, 34, 42); // Blanket

      // Shelf
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(220, 35, 55, 32);
      ctx.fillStyle = '#d81b60'; ctx.fillRect(226, 42, 6, 12);
      ctx.fillStyle = '#1e88e5'; ctx.fillRect(234, 40, 8, 14);
      ctx.fillStyle = '#fdd835'; ctx.fillRect(260, 38, 10, 16);

      // Door Mat / Exit Frame
      ctx.fillStyle = '#000000';
      ctx.fillRect(130, 216, 40, 24);

    } else if (this.currentRoom === 'hallway') {
      // Hallway Floor
      ctx.fillStyle = '#311b92';
      ctx.fillRect(0, 0, 320, 240);

      // Walls
      ctx.fillStyle = '#1a237e';
      ctx.fillRect(0, 0, 320, 40);
      ctx.fillRect(0, 0, 24, 240);
      ctx.fillRect(296, 0, 24, 240);
      ctx.fillRect(0, 216, 320, 24);

      // Door back to bedroom
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(130, 10, 40, 30);
      ctx.fillStyle = '#000000';
      ctx.fillRect(135, 15, 30, 25);

      // House Plant
      ctx.fillStyle = '#e65100';
      ctx.fillRect(38, 48, 18, 16); // Pot
      ctx.fillStyle = '#2e7d32';
      ctx.fillRect(34, 32, 26, 18); // Leaves
    }
  }
}
