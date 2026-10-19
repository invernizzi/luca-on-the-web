<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <canvas ref="canvas" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

type ArrayWithAtLeastOneElement<T> = [T, ...T[]];
type ArrayWithThreeElements<T> = [T, T, T];

const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrame: number;
let grid: boolean[][] = [[false]];
let nextGrid: boolean[][] = [[false]];
const cellSize = 8;
let width = 0;
let height = 0;
let scanLineY = 0;
const scanLineSpeed = 2;
let gliderInterval: number | null = null;

// Define patterns outside functions so they're available everywhere
const gliderPattern: ArrayWithThreeElements<ArrayWithThreeElements<number>> = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
];

const flippedGlider: ArrayWithThreeElements<ArrayWithThreeElements<number>> = [
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, 0],
];

const placePattern = (
  patternToPlace: readonly (readonly number[])[],
  startX: number,
  startY: number
) => {
  for (let y = 0; y < patternToPlace.length; y++) {
    const patternRow = patternToPlace[y];
    const gridY = startY + y;
    if (!patternRow || gridY < 0 || gridY >= height) continue;
    const gridRow = grid[gridY];
    if (!gridRow) continue;
    for (let x = 0; x < patternRow.length; x++) {
      const gridX = startX + x;
      if (gridX >= 0 && gridX < width) {
        gridRow[gridX] = patternRow[x] === 1;
      }
    }
  }
};

const initGrid = () => {
  // Set canvas size
  width = Math.ceil(window.innerWidth / cellSize);
  height = Math.ceil(window.innerHeight / cellSize);

  if (width < 1) return;
  if (height < 1) return;
  if (!canvas.value) return;

  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  canvas.value.width = width * cellSize;
  canvas.value.height = height * cellSize;

  // Initialize grids
  grid = Array.from({ length: height }, () => Array<boolean>(width).fill(false));
  nextGrid = Array.from({ length: height }, () =>
    Array<boolean>(width).fill(false)
  );

  // Create a diehard pattern in the lower right corner
  const cornerX = width - 20; // 20 cells from the right edge
  const cornerY = height - 15; // 15 cells from the bottom edge

  // Diehard pattern
  const pattern: ArrayWithAtLeastOneElement<
    ArrayWithAtLeastOneElement<number>
  > = [
    [0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1],
  ];

  // Place the pattern in the lower right corner
  placePattern(pattern, cornerX, cornerY);

  // Add gliders (flyers)
  // Glider at (16, 10) strikes the loaf + blinker formed by (30, 20) and the
  // flipped glider at (70, 25), triggering an active Methuselah reaction across
  // the left and right edges regardless of viewport dimensions.
  const gliderPositions: ArrayWithAtLeastOneElement<{ x: number; y: number }> =
    [
      { x: 16, y: 10 },
      { x: 30, y: 20 },
      { x: 50, y: 15 },
    ];

  // Place regular gliders
  gliderPositions.forEach((pos) => {
    placePattern(gliderPattern, pos.x, pos.y);
  });

  // Place flipped glider
  const flippedPos = { x: 70, y: 25 };
  placePattern(flippedGlider, flippedPos.x, flippedPos.y);

  // Pre-run the simulation up to just before the reaction finishes wrapping
  // across the right edge, and render the final warmup frames for natural fade trails.
  const preRunSteps = 1160;
  const trailWarmupSteps = 20;

  for (let step = 0; step < preRunSteps - trailWarmupSteps; step++) {
    updateGrid();
  }

  ctx.fillStyle = "rgb(21, 21, 21)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  for (let step = 0; step < trailWarmupSteps; step++) {
    updateGrid();
    drawGrid();
  }
};

const updateGrid = () => {
  const rowHasAlive = grid.map((row) => row.includes(true));

  for (let y = 0; y < height; y++) {
    const ym1 = y === 0 ? height - 1 : y - 1;
    const yp1 = y === height - 1 ? 0 : y + 1;
    const nextGridRow = nextGrid[y];
    if (!nextGridRow) continue;

    if (!rowHasAlive[ym1] && !rowHasAlive[y] && !rowHasAlive[yp1]) {
      nextGridRow.fill(false);
      continue;
    }

    const rowM1 = grid[ym1];
    const row0 = grid[y];
    const rowP1 = grid[yp1];
    if (!rowM1 || !row0 || !rowP1) continue;

    for (let x = 0; x < width; x++) {
      const xm1 = x === 0 ? width - 1 : x - 1;
      const xp1 = x === width - 1 ? 0 : x + 1;
      const neighbors =
        (rowM1[xm1] ? 1 : 0) +
        (rowM1[x] ? 1 : 0) +
        (rowM1[xp1] ? 1 : 0) +
        (row0[xm1] ? 1 : 0) +
        (row0[xp1] ? 1 : 0) +
        (rowP1[xm1] ? 1 : 0) +
        (rowP1[x] ? 1 : 0) +
        (rowP1[xp1] ? 1 : 0);

      const isAlive = Boolean(row0[x]);
      if (isAlive && (neighbors < 2 || neighbors > 3)) {
        nextGridRow[x] = false;
      } else if (!isAlive && neighbors === 3) {
        nextGridRow[x] = true;
      } else {
        nextGridRow[x] = isAlive;
      }
    }
  }

  // Swap grids
  const temp = grid;
  grid = nextGrid;
  nextGrid = temp;
};

const drawGrid = () => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  // Clear canvas with more pronounced fade effect
  ctx.fillStyle = "rgba(21, 21, 21, 0.25)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  // Draw scanning line with blur effect
  ctx.shadowColor = "rgba(255, 157, 2, 0.15)";
  ctx.shadowBlur = 10;
  ctx.strokeStyle = "rgba(255, 157, 2, 0.10)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, scanLineY);
  ctx.lineTo(canvas.value.width, scanLineY);
  ctx.stroke();

  // Reset shadow
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  // Update scan line position
  scanLineY += scanLineSpeed;
  if (scanLineY > canvas.value.height) {
    scanLineY = 0;
  }

  // Draw cells with very low opacity
  ctx.fillStyle = "rgba(255, 157, 2, 0.07)";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const gridRow = grid[y];
      if (!gridRow) continue;
      if (gridRow[x]) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }
};

const animate = () => {
  updateGrid();
  drawGrid();
  animationFrame = requestAnimationFrame(animate);
};

// Function to add a new glider at a random position
const addRandomGlider = () => {
  // Choose randomly between regular and flipped glider
  const pattern = Math.random() > 0.5 ? gliderPattern : flippedGlider;

  // Generate a random position, staying away from edges
  const padding = 10;
  const randomX =
    Math.floor(Math.random() * (width - pattern[0].length - 2 * padding)) +
    padding;
  const randomY =
    Math.floor(Math.random() * (height - pattern.length - 2 * padding)) +
    padding;

  // Place the glider
  placePattern(pattern, randomX, randomY);
};

onMounted(() => {
  initGrid();
  animate();
  window.addEventListener("resize", initGrid);

  // Start the interval to add new gliders every 10 seconds
  gliderInterval = window.setInterval(addRandomGlider, 10000);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
  window.removeEventListener("resize", initGrid);

  // Clear the interval when component is unmounted
  if (gliderInterval !== null) {
    clearInterval(gliderInterval);
  }
});
</script>
