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
        { x: 0, y: 0, w: 320, h: 48 },
        { x: 0, y: 0, w: 20, h: 240 },
        { x: 300, y: 0, w: 20, h: 240 },
        { x: 0, y: 224, w: 130, h: 16 },
        { x: 170, y: 224, w: 150, h: 16 }
      ];

      this.interactables = [
        {
          id: 'bed',
          x: 28, y: 40, w: 44, h: 68,
          dialogue: ["* (It's Kris's bed.)", "* (The blankets are neatly arranged.)"]
        },
        {
          id: 'shelf',
          x: 225, y: 32, w: 55, h: 36,
          dialogue: ["* (A dusty bookshelf.)", "* (Contains old game guides.)"]
        }
      ];

      this.door = { x: 130, y: 226, w: 40, h: 14 };

    } else if (roomId === 'hallway') {
      this.colliders = [
        { x: 0, y: 0, w: 130, h: 36 },
        { x: 170, y: 0, w: 150, h: 36 },
        { x: 0, y: 0, w: 20, h: 240 },
        { x: 300, y: 0, w: 20, h: 240 },
        { x: 0, y: 224, w: 320, h: 16 }
      ];

      this.interactables = [
        {
          id: 'monster_npc',
          x: 145, y: 90, w: 30, h: 30,
          dialogue: ["* Rudinn appeared! Prepare to fight!"],
          isMonster: true
        }
      ];

      this.door = { x: 130, y: 12, w: 40, h: 18 };
    }

    this.interactables.forEach(obj => {
      this.colliders.push({ x: obj.x, y: obj.y, w: obj.w, h: obj.h });
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
      ctx.fillStyle = '#2b1b2e'; ctx.fillRect(0, 0, 320, 240);
      ctx.fillStyle = '#120815'; ctx.fillRect(0, 0, 320, 48); ctx.fillRect(0, 0, 20, 240); ctx.fillRect(300, 0, 20, 240); ctx.fillRect(0, 224, 320, 16);
      ctx.fillStyle = '#3f2314'; ctx.fillRect(28, 40, 44, 16);
      ctx.fillStyle = '#e2e8f0'; ctx.fillRect(34, 46, 32, 12);
      ctx.fillStyle = '#991b1b'; ctx.fillRect(32, 58, 36, 50);
      ctx.fillStyle = '#451a03'; ctx.fillRect(225, 32, 55, 36);
      ctx.fillStyle = '#000000'; ctx.fillRect(130, 224, 40, 16);
    } else if (this.currentRoom === 'hallway') {
      ctx.fillStyle = '#1e1b4b'; ctx.fillRect(0, 0, 320, 240);
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, 320, 36); ctx.fillRect(0, 0, 20, 240); ctx.fillRect(300, 0, 20, 240); ctx.fillRect(0, 224, 320, 16);
      ctx.fillStyle = '#451a03'; ctx.fillRect(130, 8, 40, 28);
      ctx.fillStyle = '#000000'; ctx.fillRect(134, 12, 32, 24);

      // Monster Sprite NPC
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(145, 90, 30, 30);
    }
  }
}
