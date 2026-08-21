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
        { x: 0, y: 0, w: 320, h: 48 },    // Top Wall
        { x: 0, y: 0, w: 20, h: 240 },    // Left Wall
        { x: 300, y: 0, w: 20, h: 240 },  // Right Wall
        { x: 0, y: 224, w: 130, h: 16 },  // Bottom Wall Left
        { x: 170, y: 224, w: 150, h: 16 }  // Bottom Wall Right
      ];

      this.interactables = [
        {
          id: 'bed',
          x: 28, y: 40, w: 44, h: 68,
          dialogue: ["* (It's Kris's bed.)", "* (The blankets are neatly arranged, but cold.)"]
        },
        {
          id: 'shelf',
          x: 225, y: 32, w: 55, h: 36,
          dialogue: ["* (A dusty bookshelf.)", "* (Contains old game guides and unread novels.)"]
        },
        {
          id: 'carpet',
          x: 120, y: 110, w: 80, h: 50,
          dialogue: ["* (A soft patterned rug.)"]
        }
      ];

      this.door = { x: 130, y: 226, w: 40, h: 14 };

    } else if (roomId === 'hallway') {
      this.colliders = [
        { x: 0, y: 0, w: 130, h: 36 },    // Top Wall Left
        { x: 170, y: 0, w: 150, h: 36 },  // Top Wall Right
        { x: 0, y: 0, w: 20, h: 240 },    // Left Wall
        { x: 300, y: 0, w: 20, h: 240 },  // Right Wall
        { x: 0, y: 224, w: 320, h: 16 }   // Bottom Wall
      ];

      this.interactables = [
        {
          id: 'plant',
          x: 28, y: 32, w: 28, h: 32,
          dialogue: ["* (A well-watered houseplant.)"]
        }
      ];

      this.door = { x: 130, y: 12, w: 40, h: 18 };
    }

    // Append interactable objects to physics collision list
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
      // Wood Floor Planks
      ctx.fillStyle = '#2b1b2e';
      ctx.fillRect(0, 0, 320, 240);
      ctx.fillStyle = '#1f1222';
      for (let y = 48; y < 224; y += 16) {
        ctx.fillRect(0, y, 320, 1);
      }

      // Walls
      ctx.fillStyle = '#120815';
      ctx.fillRect(0, 0, 320, 48);
      ctx.fillRect(0, 0, 20, 240);
      ctx.fillRect(300, 0, 20, 240);
      ctx.fillRect(0, 224, 320, 16);

      // Window Light Rays
      ctx.fillStyle = 'rgba(253, 224, 71, 0.08)';
      ctx.beginPath();
      ctx.moveTo(140, 48);
      ctx.lineTo(185, 48);
      ctx.lineTo(235, 190);
      ctx.lineTo(165, 190);
      ctx.fill();

      // Oval Carpet
      ctx.fillStyle = '#6b21a8';
      ctx.fillRect(120, 110, 80, 50);
      ctx.fillStyle = '#581c87';
      ctx.fillRect(123, 113, 74, 44);

      // Bed (Headboard, Pillow, Quilt)
      ctx.fillStyle = '#3f2314'; ctx.fillRect(28, 40, 44, 16); // Headboard
      ctx.fillStyle = '#e2e8f0'; ctx.fillRect(34, 46, 32, 12); // Pillow
      ctx.fillStyle = '#991b1b'; ctx.fillRect(32, 58, 36, 50); // Red Quilt
      ctx.fillStyle = '#7f1d1d'; ctx.fillRect(32, 70, 36, 4);  // Quilt Stripe

      // Bookshelf
      ctx.fillStyle = '#451a03'; ctx.fillRect(225, 32, 55, 36);
      ctx.fillStyle = '#1e3a8a'; ctx.fillRect(232, 38, 6, 14);
      ctx.fillStyle = '#b91c1c'; ctx.fillRect(240, 36, 8, 16);
      ctx.fillStyle = '#047857'; ctx.fillRect(250, 39, 7, 13);
      ctx.fillStyle = '#d97706'; ctx.fillRect(260, 37, 9, 15);

      // Doorway Threshold
      ctx.fillStyle = '#000000';
      ctx.fillRect(130, 224, 40, 16);

    } else if (this.currentRoom === 'hallway') {
      // Hallway Flooring
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, 320, 240);

      // Walls
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 320, 36);
      ctx.fillRect(0, 0, 20, 240);
      ctx.fillRect(300, 0, 20, 240);
      ctx.fillRect(0, 224, 320, 16);

      // Door Frame Back to Bedroom
      ctx.fillStyle = '#451a03';
      ctx.fillRect(130, 8, 40, 28);
      ctx.fillStyle = '#000000';
      ctx.fillRect(134, 12, 32, 24);

      // Houseplant
      ctx.fillStyle = '#c2410c'; ctx.fillRect(33, 46, 18, 18);
      ctx.fillStyle = '#15803d'; ctx.fillRect(29, 32, 26, 16);
    }
  }
}
