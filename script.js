const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 32;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

const player = {
    x: 1 * gridSize,
    y: 14 * gridSize,
    width: gridSize,
    height: gridSize,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpForce: 12,
    grounded: false
};

const keys = {
    left: false,
    right: false,
    space: false
};

const gravity = 0.5;
const platforms = [
    { x: 0, y: 15 * gridSize, width: 20 * gridSize, height: gridSize }, // ground
    { x: 6 * gridSize, y: 12 * gridSize, width: 3 * gridSize, height: gridSize },
    { x: 10 * gridSize, y: 14 * gridSize, width: 3 * gridSize, height: gridSize },
    { x: 15 * gridSize, y: 10 * gridSize, width: 4 * gridSize, height: gridSize },
    { x: 22 * gridSize, y: 8 * gridSize, width: 3 * gridSize, height: gridSize },
    { x: 26 * gridSize, y: 11 * gridSize, width: 4 * gridSize, height: gridSize },
    { x: 30 * gridSize, y: 14 * gridSize, width: 5 * gridSize, height: gridSize },
    { x: 36 * gridSize, y: 12 * gridSize, width: 4 * gridSize, height: gridSize },
    { x: 41 * gridSize, y: 9 * gridSize, width: 3 * gridSize, height: gridSize },
    { x: 45 * gridSize, y: 7 * gridSize, width: 5 * gridSize, height: gridSize },
    { x: 52 * gridSize, y: 12 * gridSize, width: 3 * gridSize, height: gridSize },
    { x: 56 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize },
    { x: 66 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize },
];

const enemies = [
    { x: 8 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false },
    { x: 24 * gridSize, y: 7 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false },
    { x: 38 * gridSize, y: 11 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false }
];

const goal = { x: 66 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize };

function drawPlatform(platform) {
    ctx.fillStyle = '#654321';
    ctx.fillRect(platform.x - camera.x, platform.y, platform.width, platform.height);
}

function drawPlayer() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(player.x - camera.x, player.y, player.width, player.height);
}

function drawEnemy(enemy) {
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(enemy.x - camera.x, enemy.y, enemy.width, enemy.height);
}

function drawGoal() {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(goal.x - camera.x, goal.y, goal.width, goal.height);
}

function updatePlayer() {
    if (keys.left) {
        player.velocityX = -player.speed;
    } else if (keys.right) {
        player.velocityX = player.speed;
    } else {
        player.velocityX = 0;
    }

    if (keys.space && player.grounded) {
        player.velocityY = -player.jumpForce;
        player.grounded = false;
    }

    player.velocityY += gravity;

    player.x += player.velocityX;
    player.y += player.velocityY;

    // Collision with platforms
    player.grounded = false;
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {

            // Check from which side the player is colliding
            if (player.y + player.height - player.velocityY <= platform.y) { // from top
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.grounded = true;
            } else if (player.y - player.velocityY >= platform.y + platform.height) { // from bottom
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            } else if (player.x + player.width - player.velocityX <= platform.x) { // from left
                player.x = platform.x - player.width;
                player.velocityX = 0;
            } else if (player.x - player.velocityX >= platform.x + platform.width) { // from right
                player.x = platform.x + platform.width;
                player.velocityX = 0;
            }
        }
    });

    // Prevent player from going out of bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > platforms[platforms.length - 1].x + platforms[platforms.length - 1].width) {
        player.x = platforms[platforms.length - 1].x + platforms[platforms.length - 1].width - player.width;
    }

    // Check collision with enemies
    enemies.forEach(enemy => {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            // Reset player position on collision
            player.x = 1 * gridSize;
            player.y = 14 * gridSize;
        }
    });

    // Check if player reaches the goal
    if (player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y) {
        alert('You reached the goal!');
        player.x = 1 * gridSize;
        player.y = 14 * gridSize;
    }

    // Reset player if they fall off the platforms
    if (player.y > canvas.height) {
        player.x = 1 * gridSize;
        player.y = 14 * gridSize;
    }
}

function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.velocityY += gravity;

        enemy.x += enemy.speed * enemy.direction;
        enemy.y += enemy.velocityY;

        // Collision with platforms
        enemy.grounded = false;
        platforms.forEach(platform => {
            if (enemy.x < platform.x + platform.width &&
                enemy.x + enemy.width > platform.x &&
                enemy.y < platform.y + platform.height &&
                enemy.y + enemy.height > platform.y) {

                if (enemy.y + enemy.height - enemy.velocityY <= platform.y) { // from top
                    enemy.y = platform.y - enemy.height;
                    enemy.velocityY = 0;
                    enemy.grounded = true;
                } else if (enemy.y - enemy.velocityY >= platform.y + platform.height) { // from bottom
                    enemy.y = platform.y + platform.height;
                    enemy.velocityY = 0;
                } else if (enemy.x + enemy.width - enemy.speed * enemy.direction <= platform.x) { // from left
                    enemy.x = platform.x - enemy.width;
                    enemy.direction *= -1;
                } else if (enemy.x - enemy.speed * enemy.direction >= platform.x + platform.width) { // from right
                    enemy.x = platform.x + platform.width;
                    enemy.direction *= -1;
                }
            }
        });

        // Reverse direction when hitting screen edges
        if (enemy.x < 0 || enemy.x + enemy.width > gridWidth * gridSize) {
            enemy.direction *= -1;
        }
    });
}

const camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

function updateCamera() {
    camera.x = player.x - canvas.width / 2 + player.width / 2;
    if (camera.x < 0) camera.x = 0;
    if (camera.x + camera.width > platforms[platforms.length - 1].x + platforms[platforms.length - 1].width) {
        camera.x = platforms[platforms.length - 1].x + platforms[platforms.length - 1].width - camera.width;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platforms.forEach(drawPlatform);
    updatePlayer();
    updateEnemies();
    updateCamera();
    drawPlayer();
    enemies.forEach(drawEnemy);
    drawGoal();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'A') keys.left = true;
    if (event.key === 'd' || event.key === 'D') keys.right = true;
    if (event.key === ' ' || event.key === 'w' || event.key === 'W') keys.space = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a' || event.key === 'A') keys.left = false;
    if (event.key === 'd' || event.key === 'D') keys.right = false;
    if (event.key === ' ' || event.key === 'w' || event.key === 'W') keys.space = false;
});

gameLoop();