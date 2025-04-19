<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <canvas ref="canvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animationFrame: number
let grid: boolean[][] = []
let nextGrid: boolean[][] = []
const cellSize = 8
let width = 0
let height = 0
let scanLineY = 0
let scanLineSpeed = 2
let gliderInterval: number | null = null

// Define patterns outside functions so they're available everywhere
const gliderPattern = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1]
]

const flippedGlider = [
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, 0]
]

const initGrid = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Set canvas size
  width = Math.ceil(window.innerWidth / cellSize)
  height = Math.ceil(window.innerHeight / cellSize)
  canvas.value.width = width * cellSize
  canvas.value.height = height * cellSize

  // Initialize grids
  grid = Array(height).fill(null).map(() => Array(width).fill(false))
  nextGrid = Array(height).fill(null).map(() => Array(width).fill(false))

  // Create a diehard pattern in the lower right corner
  const cornerX = width - 20 // 20 cells from the right edge
  const cornerY = height - 15 // 15 cells from the bottom edge
  
  // Diehard pattern
  const pattern = [
    [0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1]
  ]

  // Place the pattern in the lower right corner
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[0].length; x++) {
      const gridX = cornerX + x
      const gridY = cornerY + y
      if (gridX >= 0 && gridX < width && gridY >= 0 && gridY < height) {
        grid[gridY][gridX] = pattern[y][x] === 1
      }
    }
  }

  // Add gliders (flyers)
  // Add gliders in different positions
  const gliderPositions = [
    { x: 10, y: 10 },
    { x: 30, y: 20 },
    { x: 50, y: 15 }
  ]
  
  // Place regular gliders
  gliderPositions.forEach(pos => {
    for (let y = 0; y < gliderPattern.length; y++) {
      for (let x = 0; x < gliderPattern[0].length; x++) {
        const gridX = pos.x + x
        const gridY = pos.y + y
        if (gridX >= 0 && gridX < width && gridY >= 0 && gridY < height) {
          grid[gridY][gridX] = gliderPattern[y][x] === 1
        }
      }
    }
  })

  // Place flipped glider
  const flippedPos = { x: 70, y: 25 }
  for (let y = 0; y < flippedGlider.length; y++) {
    for (let x = 0; x < flippedGlider[0].length; x++) {
      const gridX = flippedPos.x + x
      const gridY = flippedPos.y + y
      if (gridX >= 0 && gridX < width && gridY >= 0 && gridY < height) {
        grid[gridY][gridX] = flippedGlider[y][x] === 1
      }
    }
  }
}

const countNeighbors = (x: number, y: number): number => {
  let count = 0
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = (x + dx + width) % width
      const ny = (y + dy + height) % height
      if (grid[ny][nx]) count++
    }
  }
  return count
}

const updateGrid = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const neighbors = countNeighbors(x, y)
      const isAlive = grid[y][x]
      
      // Apply Conway's Game of Life rules
      if (isAlive && (neighbors < 2 || neighbors > 3)) {
        nextGrid[y][x] = false
      } else if (!isAlive && neighbors === 3) {
        nextGrid[y][x] = true
      } else {
        nextGrid[y][x] = isAlive
      }
    }
  }

  // Swap grids
  const temp = grid
  grid = nextGrid
  nextGrid = temp
}

const drawGrid = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Clear canvas with more pronounced fade effect
  ctx.fillStyle = 'rgba(21, 21, 21, 0.25)'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // Draw scanning line with blur effect
  ctx.shadowColor = 'rgba(255, 157, 2, 0.15)'
  ctx.shadowBlur = 10
  ctx.strokeStyle = 'rgba(255, 157, 2, 0.07)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, scanLineY)
  ctx.lineTo(canvas.value.width, scanLineY)
  ctx.stroke()
  
  // Reset shadow
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0

  // Update scan line position
  scanLineY += scanLineSpeed
  if (scanLineY > canvas.value.height) {
    scanLineY = 0
  }

  // Draw cells with very low opacity
  ctx.fillStyle = 'rgba(255, 157, 2, 0.05)'
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x]) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
      }
    }
  }
}

const animate = () => {
  updateGrid()
  drawGrid()
  animationFrame = requestAnimationFrame(animate)
}

// Function to add a new glider at a random position
const addRandomGlider = () => {
  // Choose randomly between regular and flipped glider
  const pattern = Math.random() > 0.5 ? gliderPattern : flippedGlider
  
  // Generate a random position, staying away from edges
  const padding = 10
  const randomX = Math.floor(Math.random() * (width - pattern[0].length - (2 * padding))) + padding
  const randomY = Math.floor(Math.random() * (height - pattern.length - (2 * padding))) + padding
  
  // Place the glider
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[0].length; x++) {
      const gridX = randomX + x
      const gridY = randomY + y
      if (gridX >= 0 && gridX < width && gridY >= 0 && gridY < height) {
        grid[gridY][gridX] = pattern[y][x] === 1
      }
    }
  }
}

onMounted(() => {
  initGrid()
  animate()
  window.addEventListener('resize', initGrid)
  
  // Start the interval to add new gliders every 20 seconds
  gliderInterval = window.setInterval(addRandomGlider, 20000)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', initGrid)
  
  // Clear the interval when component is unmounted
  if (gliderInterval !== null) {
    clearInterval(gliderInterval)
  }
})
</script> 