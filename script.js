// Global Variables
let currentWaterIntake = 0
const waterGoal = 2000
const weightData = JSON.parse(localStorage.getItem("weightData")) || []
const runData = JSON.parse(localStorage.getItem("runData")) || []

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  initializeApp()
})

// Initialize Application
function initializeApp() {
  // Remove loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen")
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 2000)

  // Initialize all components
  initializeNavigation()
  initializeHero()
  initializeNutrition()
  initializeExercises()
  initializeRunning()
  initializeTools()
  initializeBlog()
  initializeContact()
  initializeTheme()
  initializeScrollEffects()
  initializeBackToTop()

  // Load saved data
  loadWaterProgress()
  loadWeightChart()
  loadRunHistory()
}

// Navigation
function initializeNavigation() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const navbar = document.getElementById("navbar")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Active link highlighting
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Hero Section
function initializeHero() {
  // Typing animation
  const typingText = document.getElementById("typing-text")
  const words = ["bem-estar", "alimentação saudável", "exercícios", "corrida", "vida equilibrada"]
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeWriter() {
    const currentWord = words[wordIndex]

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1)
      charIndex++
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), 2000)
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      wordIndex = (wordIndex + 1) % words.length
    }

    const typingSpeed = isDeleting ? 50 : 100
    setTimeout(typeWriter, typingSpeed)
  }

  typeWriter()

  // Counter animation
  const counters = document.querySelectorAll(".stat-number")
  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const count = Number.parseInt(counter.innerText)
      const increment = target / 200

      if (count < target) {
        counter.innerText = Math.ceil(count + increment)
        setTimeout(animateCounters, 10)
      } else {
        counter.innerText = target.toLocaleString()
      }
    })
  }

  // Trigger counter animation when hero is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.unobserve(entry.target)
      }
    })
  })

  observer.observe(document.querySelector(".hero-stats"))
}

// Nutrition Section
function initializeNutrition() {
  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button and corresponding pane
      button.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })

  // Recipe filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      filterRecipes(filter)
    })
  })

  // Load recipes
  loadRecipes()

  // Initialize meal planner
  initializeMealPlanner()
}

// Load Recipes
function loadRecipes() {
  const recipes = [
    {
      id: 1,
      title: "Smoothie Verde Energizante",
      description: "Rico em vitaminas e minerais para começar o dia com energia.",
      category: "breakfast",
      time: "5 min",
      calories: "180 kcal",
      icon: "🥬",
    },
    {
      id: 2,
      title: "Salada de Quinoa Colorida",
      description: "Proteína completa com vegetais frescos e temperos naturais.",
      category: "lunch",
      time: "15 min",
      calories: "320 kcal",
      icon: "🥗",
    },
    {
      id: 3,
      title: "Salmão Grelhado com Legumes",
      description: "Ômega-3 e antioxidantes para uma refeição nutritiva.",
      category: "dinner",
      time: "25 min",
      calories: "450 kcal",
      icon: "🐟",
    },
    {
      id: 4,
      title: "Mix de Castanhas e Frutas",
      description: "Lanche saudável rico em gorduras boas e fibras.",
      category: "snack",
      time: "2 min",
      calories: "200 kcal",
      icon: "🥜",
    },
    {
      id: 5,
      title: "Aveia com Frutas Vermelhas",
      description: "Café da manhã rico em fibras e antioxidantes.",
      category: "breakfast",
      time: "10 min",
      calories: "250 kcal",
      icon: "🥣",
    },
    {
      id: 6,
      title: "Wrap de Frango e Vegetais",
      description: "Almoço prático e nutritivo para o dia a dia.",
      category: "lunch",
      time: "12 min",
      calories: "380 kcal",
      icon: "🌯",
    },
  ]

  const recipesGrid = document.getElementById("recipes-grid")
  recipesGrid.innerHTML = ""

  recipes.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe)
    recipesGrid.appendChild(recipeCard)
  })
}

// Create Recipe Card
function createRecipeCard(recipe) {
  const card = document.createElement("div")
  card.className = "recipe-card"
  card.setAttribute("data-category", recipe.category)

  card.innerHTML = `
        <div class="recipe-image">
            <span style="font-size: 4rem;">${recipe.icon}</span>
        </div>
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
                <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                <span><i class="fas fa-fire"></i> ${recipe.calories}</span>
                <span class="recipe-category">${getCategoryName(recipe.category)}</span>
            </div>
        </div>
    `

  card.addEventListener("click", () => {
    showRecipeModal(recipe)
  })

  return card
}

// Filter Recipes
function filterRecipes(filter) {
  const recipeCards = document.querySelectorAll(".recipe-card")

  recipeCards.forEach((card) => {
    if (filter === "all" || card.getAttribute("data-category") === filter) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Get Category Name
function getCategoryName(category) {
  const categories = {
    breakfast: "Café da Manhã",
    lunch: "Almoço",
    dinner: "Jantar",
    snack: "Lanche",
  }
  return categories[category] || category
}

// Show Recipe Modal
function showRecipeModal(recipe) {
  // Create modal (simplified version)
  alert(`Receita: ${recipe.title}\n\n${recipe.description}\n\nTempo: ${recipe.time}\nCalorias: ${recipe.calories}`)
}

// Initialize Meal Planner
function initializeMealPlanner() {
  const prevWeekBtn = document.getElementById("prev-week")
  const nextWeekBtn = document.getElementById("next-week")
  const currentWeekSpan = document.getElementById("current-week")
  const mealCalendar = document.getElementById("meal-calendar")

  const currentWeekStart = getWeekStart(new Date())

  function updateMealCalendar() {
    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    mealCalendar.innerHTML = ""

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)

      const dayCard = document.createElement("div")
      dayCard.className = "day-card"
      dayCard.innerHTML = `
                <div class="day-name">${weekDays[i]}</div>
                <div class="day-date">${date.getDate()}/${date.getMonth() + 1}</div>
                <div class="meal-item">Café: Aveia</div>
                <div class="meal-item">Almoço: Salada</div>
                <div class="meal-item">Jantar: Peixe</div>
            `
      mealCalendar.appendChild(dayCard)
    }

    currentWeekSpan.textContent = `${currentWeekStart.getDate()}/${currentWeekStart.getMonth() + 1} - ${new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).getDate()}/${new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).getMonth() + 1}`
  }

  prevWeekBtn.addEventListener("click", () => {
    currentWeekStart.setDate(currentWeekStart.getDate() - 7)
    updateMealCalendar()
  })

  nextWeekBtn.addEventListener("click", () => {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7)
    updateMealCalendar()
  })

  updateMealCalendar()
}

// Get Week Start
function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

// Exercises Section
function initializeExercises() {
  // Category cards click handlers
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category")
      showExerciseCategory(category)
    })
  })

  // Workout generator
  const generateWorkoutBtn = document.getElementById("generate-workout")
  generateWorkoutBtn.addEventListener("click", generateWorkout)
}

// Show Exercise Category
function showExerciseCategory(category) {
  const exercises = {
    strength: ["Flexões", "Agachamentos", "Prancha", "Burpees", "Abdominais"],
    cardio: ["Corrida", "Pular Corda", "Mountain Climbers", "Jumping Jacks", "High Knees"],
    flexibility: [
      "Alongamento de Panturrilha",
      "Yoga Cat-Cow",
      "Alongamento de Quadríceps",
      "Torção Espinal",
      "Alongamento de Ombros",
    ],
    hiit: ["Burpees", "Sprint no Lugar", "Squat Jumps", "Push-up to T", "Plank Jacks"],
  }

  const categoryExercises = exercises[category] || []
  alert(`Exercícios de ${category}:\n\n${categoryExercises.join("\n")}`)
}

// Generate Workout
function generateWorkout() {
  const fitnessLevel = document.getElementById("fitness-level").value
  const duration = Number.parseInt(document.getElementById("workout-duration").value)
  const generatedWorkout = document.getElementById("generated-workout")

  const exercises = [
    { name: "Aquecimento", duration: 5, description: "Movimentos leves para preparar o corpo" },
    { name: "Flexões", duration: 3, description: "3 séries de 10-15 repetições" },
    { name: "Agachamentos", duration: 4, description: "3 séries de 15-20 repetições" },
    { name: "Prancha", duration: 3, description: "3 séries de 30-60 segundos" },
    { name: "Burpees", duration: 5, description: "3 séries de 8-12 repetições" },
    { name: "Alongamento", duration: 5, description: "Relaxamento e flexibilidade" },
  ]

  let workoutHTML = "<h4>Seu Treino Personalizado</h4>"
  let totalTime = 0

  exercises.forEach((exercise) => {
    if (totalTime + exercise.duration <= duration) {
      workoutHTML += `
                <div class="workout-exercise">
                    <div>
                        <div class="exercise-name">${exercise.name}</div>
                        <div class="exercise-details">${exercise.description}</div>
                    </div>
                    <div class="exercise-duration">${exercise.duration} min</div>
                </div>
            `
      totalTime += exercise.duration
    }
  })

  workoutHTML += `<p><strong>Tempo total: ${totalTime} minutos</strong></p>`
  generatedWorkout.innerHTML = workoutHTML
  generatedWorkout.style.display = "block"
}

// Running Section
function initializeRunning() {
  // Pace calculator
  const calculatePaceBtn = document.getElementById("calculate-pace")
  calculatePaceBtn.addEventListener("click", calculatePace)

  // Run tracker
  const runForm = document.getElementById("run-form")
  runForm.addEventListener("submit", addRun)

  loadRunHistory()
}

// Calculate Pace
function calculatePace() {
  const distance = Number.parseFloat(document.getElementById("distance").value)
  const minutes = Number.parseInt(document.getElementById("minutes").value) || 0
  const seconds = Number.parseInt(document.getElementById("seconds").value) || 0
  const paceResult = document.getElementById("pace-result")

  if (!distance || (!minutes && !seconds)) {
    alert("Por favor, preencha todos os campos.")
    return
  }

  const totalMinutes = minutes + seconds / 60
  const paceMinutes = Math.floor(totalMinutes / distance)
  const paceSeconds = Math.round((totalMinutes / distance - paceMinutes) * 60)

  paceResult.innerHTML = `
        <h4>Seu Pace</h4>
        <p><strong>${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} min/km</strong></p>
        <p>Velocidade: ${(distance / (totalMinutes / 60)).toFixed(2)} km/h</p>
    `
  paceResult.style.display = "block"
}

// Add Run
function addRun(e) {
  e.preventDefault()

  const date = document.getElementById("run-date").value
  const distance = Number.parseFloat(document.getElementById("run-distance").value)
  const minutes = Number.parseInt(document.getElementById("run-minutes").value)
  const seconds = Number.parseInt(document.getElementById("run-seconds").value)

  if (!date || !distance || !minutes) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  const totalMinutes = minutes + seconds / 60
  const pace = totalMinutes / distance
  const paceMin = Math.floor(pace)
  const paceSec = Math.round((pace - paceMin) * 60)

  const run = {
    id: Date.now(),
    date: date,
    distance: distance,
    time: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    pace: `${paceMin}:${paceSec.toString().padStart(2, "0")}`,
  }

  runData.push(run)
  localStorage.setItem("runData", JSON.stringify(runData))

  loadRunHistory()
  e.target.reset()
}

// Load Run History
function loadRunHistory() {
  const runsList = document.getElementById("runs-list")
  runsList.innerHTML = ""

  if (runData.length === 0) {
    runsList.innerHTML = "<p>Nenhuma corrida registrada ainda.</p>"
    return
  }

  runData
    .slice(-5)
    .reverse()
    .forEach((run) => {
      const runItem = document.createElement("div")
      runItem.className = "run-item"
      runItem.innerHTML = `
            <div>
                <div class="run-date">${formatDate(run.date)}</div>
                <div class="run-details">${run.distance}km em ${run.time}</div>
            </div>
            <div class="run-pace">${run.pace}/km</div>
        `
      runsList.appendChild(runItem)
    })
}

// Tools Section
function initializeTools() {
  // BMI Calculator
  const calculateBMIBtn = document.getElementById("calculate-bmi")
  calculateBMIBtn.addEventListener("click", calculateBMI)

  // Calories Calculator
  const calculateCaloriesBtn = document.getElementById("calculate-calories")
  calculateCaloriesBtn.addEventListener("click", calculateCalories)

  // Weight Tracker
  const addWeightBtn = document.getElementById("add-weight")
  addWeightBtn.addEventListener("click", addWeight)

  loadWaterProgress()
  loadWeightChart()
}

// Calculate BMI
function calculateBMI() {
  const weight = Number.parseFloat(document.getElementById("weight").value)
  const height = Number.parseFloat(document.getElementById("height").value) / 100 // Convert to meters
  const result = document.getElementById("bmi-result")

  if (!weight || !height) {
    alert("Por favor, preencha peso e altura.")
    return
  }

  const bmi = weight / (height * height)
  let category = ""
  let className = ""

  if (bmi < 18.5) {
    category = "Abaixo do peso"
    className = "warning"
  } else if (bmi < 25) {
    category = "Peso normal"
    className = "success"
  } else if (bmi < 30) {
    category = "Sobrepeso"
    className = "warning"
  } else {
    category = "Obesidade"
    className = "danger"
  }

  result.innerHTML = `
        <h4>Seu IMC</h4>
        <p><strong>${bmi.toFixed(1)}</strong></p>
        <p>${category}</p>
    `
  result.className = `result ${className}`
  result.style.display = "block"
}

// Calculate Calories
function calculateCalories() {
  const weight = Number.parseFloat(document.getElementById("weight").value)
  const height = Number.parseFloat(document.getElementById("height").value)
  const age = Number.parseInt(document.getElementById("age").value)
  const gender = document.getElementById("gender").value
  const activity = Number.parseFloat(document.getElementById("activity").value)
  const result = document.getElementById("calories-result")

  if (!weight || !height || !age) {
    alert("Por favor, preencha todos os campos.")
    return
  }

  let bmr
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
  }

  const totalCalories = Math.round(bmr * activity)

  result.innerHTML = `
        <h4>Suas Calorias Diárias</h4>
        <p><strong>${totalCalories} kcal/dia</strong></p>
        <p>Para manter o peso atual</p>
    `
  result.className = "result success"
  result.style.display = "block"
}

// Water Tracker Functions
function addWater(amount) {
  currentWaterIntake += amount
  if (currentWaterIntake > waterGoal) {
    currentWaterIntake = waterGoal
  }
  updateWaterProgress()
  localStorage.setItem("waterIntake", currentWaterIntake.toString())
}

function resetWater() {
  currentWaterIntake = 0
  updateWaterProgress()
  localStorage.setItem("waterIntake", "0")
}

function updateWaterProgress() {
  const currentSpan = document.getElementById("water-current")
  const progressFill = document.getElementById("water-progress")

  currentSpan.textContent = `${currentWaterIntake}ml`
  const percentage = (currentWaterIntake / waterGoal) * 100
  progressFill.style.width = `${percentage}%`
}

function loadWaterProgress() {
  const saved = localStorage.getItem("waterIntake")
  if (saved) {
    currentWaterIntake = Number.parseInt(saved)
    updateWaterProgress()
  }
}

// Weight Tracker Functions
function addWeight() {
  const date = document.getElementById("weight-date").value
  const weight = Number.parseFloat(document.getElementById("weight-value").value)

  if (!date || !weight) {
    alert("Por favor, preencha data e peso.")
    return
  }

  const weightEntry = {
    date: date,
    weight: weight,
  }

  weightData.push(weightEntry)
  weightData.sort((a, b) => new Date(a.date) - new Date(b.date))

  localStorage.setItem("weightData", JSON.stringify(weightData))
  loadWeightChart()

  document.getElementById("weight-date").value = ""
  document.getElementById("weight-value").value = ""
}

function loadWeightChart() {
  const canvas = document.getElementById("weightCanvas")
  const ctx = canvas.getContext("2d")

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (weightData.length === 0) {
    ctx.fillStyle = "#666"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Nenhum dado de peso registrado", canvas.width / 2, canvas.height / 2)
    return
  }

  // Simple line chart implementation
  const padding = 40
  const chartWidth = canvas.width - 2 * padding
  const chartHeight = canvas.height - 2 * padding

  const weights = weightData.map((d) => d.weight)
  const minWeight = Math.min(...weights) - 2
  const maxWeight = Math.max(...weights) + 2

  // Draw axes
  ctx.strokeStyle = "#ddd"
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, canvas.height - padding)
  ctx.lineTo(canvas.width - padding, canvas.height - padding)
  ctx.stroke()

  // Draw data points and line
  if (weightData.length > 1) {
    ctx.strokeStyle = "#4CAF50"
    ctx.lineWidth = 2
    ctx.beginPath()

    weightData.forEach((data, index) => {
      const x = padding + (index / (weightData.length - 1)) * chartWidth
      const y = canvas.height - padding - ((data.weight - minWeight) / (maxWeight - minWeight)) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw point
      ctx.fillStyle = "#4CAF50"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    ctx.stroke()
  }
}

// Blog Section
function initializeBlog() {
  const blogFilters = document.querySelectorAll(".blog-filters .filter-btn")
  blogFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      blogFilters.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      filterBlogPosts(filter)
    })
  })

  loadBlogPosts()
}

// Load Blog Posts
function loadBlogPosts() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Alimentos que Aumentam a Energia",
      excerpt: "Descubra quais alimentos podem dar mais disposição para seu dia a dia.",
      category: "nutrition",
      date: "2024-01-15",
      readTime: "5 min",
      icon: "🥑",
    },
    {
      id: 2,
      title: "Como Começar a Correr: Guia Completo",
      excerpt: "Tudo que você precisa saber para dar os primeiros passos na corrida.",
      category: "running",
      date: "2024-01-12",
      readTime: "8 min",
      icon: "🏃",
    },
    {
      id: 3,
      title: "Exercícios para Fazer em Casa",
      excerpt: "Treino completo que você pode fazer no conforto da sua casa.",
      category: "fitness",
      date: "2024-01-10",
      readTime: "6 min",
      icon: "🏠",
    },
    {
      id: 4,
      title: "A Importância do Sono para a Saúde",
      excerpt: "Como uma boa noite de sono pode transformar sua qualidade de vida.",
      category: "wellness",
      date: "2024-01-08",
      readTime: "7 min",
      icon: "😴",
    },
    {
      id: 5,
      title: "Hidratação: Mais que Apenas Água",
      excerpt: "Entenda como se manter hidratado de forma eficiente.",
      category: "nutrition",
      date: "2024-01-05",
      readTime: "4 min",
      icon: "💧",
    },
    {
      id: 6,
      title: "Meditação para Iniciantes",
      excerpt: "Técnicas simples para começar a meditar hoje mesmo.",
      category: "wellness",
      date: "2024-01-03",
      readTime: "5 min",
      icon: "🧘",
    },
  ]

  const blogGrid = document.getElementById("blog-grid")
  blogGrid.innerHTML = ""

  blogPosts.forEach((post) => {
    const blogCard = createBlogCard(post)
    blogGrid.appendChild(blogCard)
  })
}

// Create Blog Card
function createBlogCard(post) {
  const card = document.createElement("div")
  card.className = "blog-card"
  card.setAttribute("data-category", post.category)

  card.innerHTML = `
        <div class="blog-image">
            <span style="font-size: 4rem;">${post.icon}</span>
        </div>
        <div class="blog-content">
            <span class="blog-category">${getCategoryName(post.category)}</span>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-meta">
                <span class="blog-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(post.date)}
                </span>
                <span class="blog-read-time">
                    <i class="fas fa-clock"></i>
                    ${post.readTime}
                </span>
            </div>
        </div>
    `

  card.addEventListener("click", () => {
    showBlogPost(post)
  })

  return card
}

// Filter Blog Posts
function filterBlogPosts(filter) {
  const blogCards = document.querySelectorAll(".blog-card")

  blogCards.forEach((card) => {
    if (filter === "all" || card.getAttribute("data-category") === filter) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Show Blog Post
function showBlogPost(post) {
  alert(
    `${post.title}\n\n${post.excerpt}\n\nCategoria: ${getCategoryName(post.category)}\nTempo de leitura: ${post.readTime}`,
  )
}

// Contact Section
function initializeContact() {
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", handleContactForm)
}

// Handle Contact Form
function handleContactForm(e) {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  if (!name || !email || !subject || !message) {
    alert("Por favor, preencha todos os campos.")
    return
  }

  // Simulate form submission
  alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
  e.target.reset()
}

// Theme Toggle
function initializeTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  const currentTheme = localStorage.getItem("theme") || "light"

  document.documentElement.setAttribute("data-theme", currentTheme)
  updateThemeIcon(currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)
  })
}

// Update Theme Icon
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("theme-toggle")
  const icon = themeToggle.querySelector("i")

  if (theme === "dark") {
    icon.className = "fas fa-sun"
  } else {
    icon.className = "fas fa-moon"
  }
}

// Scroll Effects
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll(
    ".section-header, .recipe-card, .tip-card, .category-card, .blog-card, .tool-card",
  )
  animatedElements.forEach((el, index) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Back to Top Button
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Utility Functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

// Newsletter Subscription
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      if (email) {
        alert("Obrigado por se inscrever! Você receberá nossas dicas semanais.")
        this.reset()
      }
    })
  }
})

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error)
})

// Performance Monitoring
window.addEventListener("load", () => {
  setTimeout(() => {
    const perfData = performance.getEntriesByType("navigation")[0]
    console.log("Page load time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
  }, 0)
})
