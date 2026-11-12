const TILE = 32;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 448;
const PLAYER_SPEED = 220;
const JUMP_SPEED = 480;
const ENEMY_SPEED = 60;
const START_LIVES = 3;

function textStyle(size, color){
    return {
        fontFamily: "Arial",
        fontSize: size + "px",
        color: color,
        fontStyle: "bold",
    };
}

class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene")
    }

    create(){
        // paintbrush
        const g = this.make.graphics({x: 0, y: 0, add: false});

        // Ground/Platform Tiles
        g.fillStyle(0x0f6b6b, 1).fillRect(0, 0, TILE, TILE);
        g.fillStyle(0x2fb5a8, 1).fillRect(0, 0, TILE, 8);
        g.lineStyle(2, 0x06383a, 1).strokeRect(1, 1, TILE - 2, TILE - 2);
        g.generateTexture("tile", TILE, TILE);
        g.clear();

        // Player
        g.fillStyle(0xff7a59, 1).fillRoundedRect(0, 0, 28, 40, 8);
        g.fillStyle(0xffffff, 1).fillCircle(9, 14, 5).fillCircle(19, 14, 5);
        g.fillStyle(0x222222, 1).fillCircle(10, 14, 2.5).fillCircle(20, 14, 2.5);
        g.generateTexture("player", 28, 40);
        g.clear();

        g.destroy();
        this.scene.start("MenuScene")
    }
}

class MenuScene extends Phaser.Scene {
    constructor(){
        super("MenuScene");
    }

    create(){
        this.cameras.main.setBackgroundColor("#bfe9ff");
        this.add
            .text(GAME_WIDTH / 2, 120, "Coin Dash", textStyle(72, "#0f6b6b"))
            .setOrigin(0.5);
        
        const help = "Arrow keys or A/D to move\nUp, W or Space to jump";
        this.add
            .text(GAME_WIDTH / 2, 225, help, { ...textStyle(24, "#06383a"), align: "center"})
            .setOrigin(0.5);
        
        const promptStyle = textStyle(28, "#06383a");
        const prompt = this.add
            .text(GAME_WIDTH / 2, 340, "Press SPACE or click to start", promptStyle)
            .setOrigin(0.5);
        this.tweens.add({
            targets: prompt,
            alpha: 0.2,
            duration: 600,
            yoyo: true,
            repeat: -1
        });

        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("GameScene"));
        this.input.once("pointerdown", () => this.scene.start("GameScene"));
    }
}

class GameScene extends Phaser.Scene {
    constructor(){
        super("GameScene");
    }

    create(){
        this.cameras.main.setBackgroundColor("#bfe9ff");
    }
}

class EndScene extends Phaser.Scene {
    constructor(){
        super("EndScene");
    }

    init(data){
        this.won = data.won;
        this.finalScore = data.score;
    }

    create(){
        this.cameras.main.setBackgroundColor(this.won ? "#0f6b6b" : "#3a1d1d");

        const title = this.won ? "You win!" : "GAME OVER!";
        this.add.text(GAME_WIDTH / 2, 130, title, textStyle(72, "#ffffff")).setOrigin(0.5);
        this.add
            .text(GAME_WIDTH / 2, 230, "Score: " + this.finalScore, textStyle(36, "#ffe27a"))
            .setOrigin(0.5);
        const small = textStyle(26, "#ffffff");
        this.add
            .text(GAME_WIDTH / 2, 330, "Press R or click to play again", small)
            .setOrigin(0.5);

        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("GameScene"));
        this.input.once("pointerdown", () => this.scene.start("GameScene"));
    }
}

const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: "game",
    physics: {
        default: "arcade",
        arcade: {gravity: {y: 900}, debug: false},
    },
    scale: {mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH},
    scene: [BootScene, MenuScene, GameScene, EndScene]
};

new Phaser.Game(config);