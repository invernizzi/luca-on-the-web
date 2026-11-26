<template>
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    <canvas ref="canvas" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

type ArrayWithAtLeastOneElement<T> = [T, ...T[]];
type ArrayWithThreeElements<T> = [T, T, T];

const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrame: number | null = null;
let grid: boolean[][] = [[false]];
let nextGrid: boolean[][] = [[false]];
const cellSize = 8;
const stepIntervalMs = 110;
let lastStepTime = 0;
let width = 0;
let height = 0;
let gliderInterval: number | null = null;
let reducedMotion = false;
let motionQuery: MediaQueryList | null = null;

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
  const cornerX = width - 22;
  const cornerY = height - 18;

  const pattern: ArrayWithAtLeastOneElement<
    ArrayWithAtLeastOneElement<number>
  > = [
    [0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1],
  ];

  placePattern(pattern, cornerX, cornerY);

  // Gliders triggering an active Methuselah reaction across the viewport
  const gliderPositions: ArrayWithAtLeastOneElement<{ x: number; y: number }> =
    [
      { x: 14, y: 10 },
      { x: 30, y: 20 },
      { x: 50, y: 15 },
      { x: 118, y: 16 },
    ];

  gliderPositions.forEach((pos) => {
    placePattern(gliderPattern, pos.x, pos.y);
  });

  placePattern(flippedGlider, 70, 25);

  const preRunSteps = 1158;
  const trailWarmupSteps = 18;

  for (let step = 0; step < preRunSteps - trailWarmupSteps; step++) {
    updateGrid();
  }

  ctx.fillStyle = "#0d0d0f";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  for (let step = 0; step < trailWarmupSteps; step++) {
    updateGrid();
    drawGrid(step === trailWarmupSteps - 1);
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

  const temp = grid;
  grid = nextGrid;
  nextGrid = temp;
};

const drawGrid = (brightLiveFrame = true) => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  // Crisp trail decay on obsidian ground — zero blur, no CRT scanline
  ctx.fillStyle = "rgba(13, 13, 15, 0.24)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  ctx.fillStyle = brightLiveFrame
    ? "rgba(255, 157, 2, 0.22)"
    : "rgba(255, 157, 2, 0.08)";

  for (let y = 0; y < height; y++) {
    const gridRow = grid[y];
    if (!gridRow) continue;
    for (let x = 0; x < width; x++) {
      if (gridRow[x]) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }
};

const stopLoop = () => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  if (gliderInterval !== null) {
    clearInterval(gliderInterval);
    gliderInterval = null;
  }
};

const animate = (timestamp: number) => {
  if (reducedMotion || document.hidden) {
    animationFrame = null;
    return;
  }
  if (timestamp - lastStepTime >= stepIntervalMs) {
    lastStepTime = timestamp;
    updateGrid();
    drawGrid(true);
  }
  animationFrame = requestAnimationFrame(animate);
};

const addRandomGlider = () => {
  if (document.hidden || reducedMotion) return;
  const pattern = Math.random() > 0.5 ? gliderPattern : flippedGlider;

  const padding = 10;
  const maxX = Math.max(1, width - pattern[0].length - 2 * padding);
  const maxY = Math.max(1, height - pattern.length - 2 * padding);
  const randomX = Math.floor(Math.random() * maxX) + padding;
  const randomY = Math.floor(Math.random() * maxY) + padding;

  placePattern(pattern, randomX, randomY);
};

const startLoop = () => {
  if (reducedMotion || document.hidden) return;
  if (animationFrame === null) {
    lastStepTime = performance.now();
    animationFrame = requestAnimationFrame(animate);
  }
  if (gliderInterval === null) {
    gliderInterval = window.setInterval(addRandomGlider, 10000);
  }
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopLoop();
  } else {
    startLoop();
  }
};

const handleMotionChange = (event: MediaQueryListEvent) => {
  reducedMotion = event.matches;
  if (reducedMotion) {
    stopLoop();
  } else {
    startLoop();
  }
};

onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotion = motionQuery.matches;

  initGrid();
  if (!reducedMotion) {
    startLoop();
  }
  window.addEventListener("resize", initGrid);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  motionQuery.addEventListener("change", handleMotionChange);
});

onUnmounted(() => {
  stopLoop();
  window.removeEventListener("resize", initGrid);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  motionQuery?.removeEventListener("change", handleMotionChange);
});
</script>
