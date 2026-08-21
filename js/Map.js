export class RoomMap {
  constructor() {
    this.width = 320;
    this.height = 240;

    // Room Colliders (Outer Walls)
    this.colliders = [
      { x: 0, y: 0, w: 320, h: 40 },   // Top wall
      { x: 0, y: 0, w: 20, h: 240 },   // Left wall
      { x: 300, y: 0, w: 20, h: 240 }, // Right wall
      { x: 0, y: 220, w: 320, h: 20 }  // Bottom wall
    ];

    // Objects with visuals, collision, and dialogue
    this.interactables = [
      {
        id: 'bed',
        x: 30, y: 40, w: 40, h: 60,
        color: '#993333',
        label: 'Bed',
        dialogue: ["It's Kris's bed.", "It looks neatly unmade."]
      },
      {
        id: 'shelf',
        x: 230, y: 40, w: 50, h: 30,
        color: '#8B4513',
        label: 'Shelf',
        dialogue: ["The shelf is filled with old trophies and manuals."]
      }
    ];

    // Add interactable bounding boxes to solid colliders
    this.interactables.forEach(obj => {
      this.colliders.push({ x: obj.x, y: obj.y, w: obj.w, h: obj.h });
    });

    // Room Transition Trigger (South Doorway)
    this.door = { x: 140, y: 215, w: 40, h: 10 };
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
    // Floor
    ctx.fillStyle = '#2c1e38';
    ctx.fillRect(0, 0, this.width, this.height);

    // Walls
    ctx.fillStyle = '#140c1d';
    ctx.fillRect(0, 0, 320, 40);

    // Doorway Carpet
    ctx.fillStyle = '#552233';
    ctx.fillRect(this.door.x, this.door.y, this.door.w, this.door.h);

    // Render Interactable Objects
    this.interactables.forEach(obj => {
      ctx.fillStyle = obj.color;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
    });
  }
}