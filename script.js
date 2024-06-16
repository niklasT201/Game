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
    grounded: false,
    defaultJumpForce: 12, // Default jump force
};

const keys = {
    left: false,
    right: false,
    space: false,
    sprint: false
};

const gravity = 0.5;

const levels = [
     // Level 1
     {
        platforms: [
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
        ],
        enemies: [
            { x: 8 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 8 * gridSize, initialY: 13 * gridSize },
            { x: 24 * gridSize, y: 7 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 24 * gridSize, initialY: 7 * gridSize },
            { x: 38 * gridSize, y: 11 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 38 * gridSize, initialY: 11 * gridSize }
        ],
        goal: { x: 66 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize },
        jumpPowerUp: { x: 20 * gridSize, y: 10 * gridSize, width: gridSize, height: gridSize, active: true }
    },
    // Level 2
    {
        platforms: [
            { x: 0, y: 15 * gridSize, width: 20 * gridSize, height: gridSize }, // ground
            { x: 5 * gridSize, y: 10 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 9 * gridSize, y: 7 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 13 * gridSize, y: 10 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 18 * gridSize, y: 12 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 24 * gridSize, y: 8 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 30 * gridSize, y: 14 * gridSize, width: 5 * gridSize, height: gridSize },
            { x: 37 * gridSize, y: 10 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 41 * gridSize, y: 7 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 45 * gridSize, y: 5 * gridSize, width: 5 * gridSize, height: gridSize },
            { x: 52 * gridSize, y: 12 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 56 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 66 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize },
        ],
        enemies: [
            { x: 10 * gridSize, y: 9 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 10 * gridSize, initialY: 9 * gridSize },
            { x: 22 * gridSize, y: 11 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 22 * gridSize, initialY: 11 * gridSize },
            { x: 35 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 35 * gridSize, initialY: 13 * gridSize }
        ],
        goal: { x: 66 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize },
        jumpPowerUp: { x: 25 * gridSize, y: 7 * gridSize, width: gridSize, height: gridSize, active: true }
    },
     // Level 3
     {
        platforms: [
            { x: 0, y: 15 * gridSize, width: 20 * gridSize, height: gridSize }, // ground
            { x: 4 * gridSize, y: 12 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 10 * gridSize, y: 10 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 18 * gridSize, y: 13 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 24 * gridSize, y: 9 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 30 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 36 * gridSize, y: 8 * gridSize, width: 5 * gridSize, height: gridSize },
            { x: 45 * gridSize, y: 11 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 50 * gridSize, y: 7 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 57 * gridSize, y: 10 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 64 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize }
        ],
        enemies: [
            { x: 6 * gridSize, y: 11 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 6 * gridSize, initialY: 11 * gridSize },
            { x: 26 * gridSize, y: 8 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 26 * gridSize, initialY: 8 * gridSize },
            { x: 48 * gridSize, y: 6 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 48 * gridSize, initialY: 6 * gridSize }
        ],
        goal: { x: 64 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize },
        jumpPowerUp: { x: 35 * gridSize, y: 7 * gridSize, width: gridSize, height: gridSize, active: true }
    },
    // Level 4
    {
        platforms: [
            { x: 0, y: 15 * gridSize, width: 20 * gridSize, height: gridSize }, // ground
            { x: 3 * gridSize, y: 10 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 8 * gridSize, y: 8 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 15 * gridSize, y: 11 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 21 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 28 * gridSize, y: 9 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 35 * gridSize, y: 12 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 42 * gridSize, y: 10 * gridSize, width: 5 * gridSize, height: gridSize },
            { x: 50 * gridSize, y: 7 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 55 * gridSize, y: 11 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 62 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize }
        ],
        enemies: [
            { x: 9 * gridSize, y: 7 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 9 * gridSize, initialY: 7 * gridSize },
            { x: 23 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 23 * gridSize, initialY: 13 * gridSize },
            { x: 37 * gridSize, y: 11 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 37 * gridSize, initialY: 11 * gridSize }
        ],
        goal: { x: 62 * gridSize, y: 13 * gridSize, width: gridSize, height: gridSize },
        jumpPowerUp: { x: 27 * gridSize, y: 8 * gridSize, width: gridSize, height: gridSize, active: true }
    },
    // Level 5
    {
        platforms: [
            { x: 0, y: 15 * gridSize, width: 20 * gridSize, height: gridSize }, // ground
            { x: 6 * gridSize, y: 9 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 12 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 20 * gridSize, y: 11 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 27 * gridSize, y: 8 * gridSize, width: 5 * gridSize, height: gridSize },
            { x: 34 * gridSize, y: 12 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 42 * gridSize, y: 10 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 49 * gridSize, y: 7 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 55 * gridSize, y: 14 * gridSize, width: 4 * gridSize, height: gridSize },
            { x: 62 * gridSize, y: 8 * gridSize, width: 3 * gridSize, height: gridSize },
            { x: 68 * gridSize, y: 11 * gridSize, width: 4 * gridSize, height: gridSize }
        ],
        enemies: [
            { x: 8 * gridSize, y: 8 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 8 * gridSize, initialY: 8 * gridSize },
            { x: 22 * gridSize, y: 10 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 22 * gridSize, initialY: 10 * gridSize },
            { x: 38 * gridSize, y: 11 * gridSize, width: gridSize, height: gridSize, speed: 2, direction: 1, velocityY: 0, grounded: false, initialX: 38 * gridSize, initialY: 11 * gridSize }
        ],
        goal: { x: 68 * gridSize, y: 10 * gridSize, width: gridSize, height: gridSize },
        jumpPowerUp: { x: 33 * gridSize, y: 6 * gridSize, width: gridSize, height: gridSize, active: true }
    },
];

let currentLevel = 0;
let gameState = 'start';
let platforms = levels[currentLevel].platforms;
let enemies = [];
let goal = levels[currentLevel].goal;
let jumpPowerUp = levels[currentLevel].jumpPowerUp;
let jumpPowerUpActive = false;
let jumpPowerUpTimer = null;
let jumpPowerUpStartTime = null;

function initializeEnemies() {
    enemies = levels[currentLevel].enemies.map(enemy => ({ ...enemy }));
}

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

function drawJumpPowerUp() {
    if (jumpPowerUp.active) {
        ctx.fillStyle = '#ffff00'; // Yellow color for the power-up
        ctx.fillRect(jumpPowerUp.x - camera.x, jumpPowerUp.y, jumpPowerUp.width, jumpPowerUp.height);
    }
}

function drawDisplay() {
    // Draw level text
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(`Level: ${currentLevel + 1}`, 100, 200); // Display current level

    if (jumpPowerUpActive) {
        const elapsedTime = (Date.now() - jumpPowerUpStartTime) / 1000; // Time in seconds
        const remainingTime = Math.max(10 - elapsedTime, 0).toFixed(1); // Calculate remaining time
        ctx.font = '20px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(`Power Up: ${remainingTime} s`, 135, 250); // Display remaining time
    }
}


function handleEnemyCollision(enemy) {
    const isPlayerAboveEnemy = player.y + player.height - player.velocityY <= enemy.y;

    if (isPlayerAboveEnemy) {
        // Player jumps on enemy
        player.velocityY = -player.jumpForce / 0.9; // Make the player jump a bit when stomping
        enemies.splice(enemies.indexOf(enemy), 1); // Remove the enemy
    } else {
        // Reset game state on collision
        gameState = 'gameOver';
    }
}

function resetPlayer() {
    player.x = 1 * gridSize;
    player.y = 14 * gridSize;
    player.velocityX = 0;
    player.velocityY = 0;
    player.grounded = false;
    player.jumpForce = player.defaultJumpForce;
    jumpPowerUpActive = false;
}

function switchToNextLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
        alert('You have completed all levels!');
        currentLevel = 0;
    }
    platforms = levels[currentLevel].platforms;
    goal = levels[currentLevel].goal;
    jumpPowerUp = levels[currentLevel].jumpPowerUp;
    resetPlayer();
    initializeEnemies();
}

function updatePlayer() {
    let currentSpeed = player.speed;
    if (keys.sprint) {
        currentSpeed *= 1.5;
    }

    if (keys.left) {
        player.velocityX = -currentSpeed;
    } else if (keys.right) {
        player.velocityX = currentSpeed;
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
            handleEnemyCollision(enemy); // Handle collision with the enemy
        }
    });

    // Check if player reaches the goal
    if (player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y) {
        alert('You reached the goal!');
        switchToNextLevel();
    }

    // Check collision with jump power-up
    if (jumpPowerUp.active &&
        player.x < jumpPowerUp.x + jumpPowerUp.width &&
        player.x + player.width > jumpPowerUp.x &&
        player.y < jumpPowerUp.y + jumpPowerUp.height &&
        player.y + player.height > jumpPowerUp.y) {
        jumpPowerUp.active = false;
        activateJumpPowerUp();
    }

    // Reset player if they fall off the platforms
    if (player.y > canvas.height) {
        gameState = 'gameOver';
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

function activateJumpPowerUp() {
    if (!jumpPowerUpActive) {
        player.jumpForce *= 1.5;
        jumpPowerUpActive = true;
        jumpPowerUpStartTime = Date.now();
        jumpPowerUpTimer = setTimeout(() => {
            player.jumpForce = player.defaultJumpForce;
            jumpPowerUpActive = false;
        }, 10000); // 10 seconds duration
    } else {
        clearTimeout(jumpPowerUpTimer); // Clear the previous timer
        jumpPowerUpStartTime = Date.now(); // Reset the start time
        jumpPowerUpTimer = setTimeout(() => {
            player.jumpForce = player.defaultJumpForce;
            jumpPowerUpActive = false;
        }, 10000); // Reset the timer to 10 seconds
    }
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
   /*  function updateCamera() {
        camera.x = player.x - canvas.width / 2 + player.width / 2;
    } */
}

function drawStartMenu() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Press Enter to Start', canvas.width / 2, canvas.height / 2);
}

function drawPauseMenu() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px sans-serif';
    ctx.fillText('Press P to Resume', canvas.width / 2, canvas.height / 2 + 40);
}

function drawGameOverMenu() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px sans-serif';
    ctx.fillText('Press Enter to Restart', canvas.width / 2, canvas.height / 2 + 40);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (gameState) {
        case 'start':
            drawStartMenu();
            break;
        case 'playing':
            platforms.forEach(drawPlatform);
            updatePlayer();
            updateEnemies();
            updateCamera();
            drawPlayer();
            enemies.forEach(drawEnemy);
            drawGoal();
            drawJumpPowerUp();
            drawDisplay();
            break;
        case 'paused':
            drawPauseMenu();
            break;
        case 'gameOver':
            drawGameOverMenu();
            break;
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'A') keys.left = true;
    if (event.key === 'd' || event.key === 'D') keys.right = true;
    if (event.key === ' ' || event.key === 'w' || event.key === 'W') keys.space = true;
    if (event.key === 'Shift') keys.sprint = true;

    if (event.key === 'Enter') {
        if (gameState === 'start' || gameState === 'gameOver') {
            gameState = 'playing';
            resetPlayer();
            initializeEnemies(); // Reset enemies when the game starts
        }
    }

    if (event.key === 'p' || event.key === 'P') {
        if (gameState === 'playing') {
            gameState = 'paused';
        } else if (gameState === 'paused') {
            gameState = 'playing';
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a' || event.key === 'A') keys.left = false;
    if (event.key === 'd' || event.key === 'D') keys.right = false;
    if (event.key === ' ' || event.key === 'w' || event.key === 'W') keys.space = false;
    if (event.key === 'Shift') keys.sprint = false;
});

initializeEnemies(); // Initialize enemies when the game loads
gameLoop();
