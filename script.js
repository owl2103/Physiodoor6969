// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Initialize floating particles
  createFloatingParticles()

  // Mobile menu toggle
  hamburger?.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Initialize page
  showSection("home")

  // Initialize counters
  initializeCounters()

  // Initialize service filters
  initializeServiceFilters()

  // Add loading animation
  const elements = document.querySelectorAll(
    ".service-card, .testimonial-card, .contact-form, .contact-info, .package-card",
  )
  elements.forEach((el, index) => {
    el.classList.add("loading")
    setTimeout(() => {
      el.classList.add("loaded")
    }, 100 * index)
  })
})

// Create floating particles effect
function createFloatingParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 15 + "s"
    particle.style.animationDuration = Math.random() * 10 + 10 + "s"
    particlesContainer.appendChild(particle)
  }
}

// Section navigation
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Update navigation active state
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active")
    }
  })

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Navigation click handlers
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const sectionId = this.getAttribute("href").substring(1)
    showSection(sectionId)
  })
})

// WhatsApp Integration
function openWhatsApp() {
  const phoneNumber = "919547784509"
  const message = encodeURIComponent("Hi! I'm interested in booking a physiotherapy session. Can you help me?")
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappURL, "_blank")
}

// Emergency call function
function callEmergency() {
  window.location.href = "tel:9547784509"
}

// Testimonials carousel
let currentTestimonial = 0
const testimonials = document.querySelectorAll(".testimonial-slide")

function showTestimonial(index) {
  testimonials.forEach((slide) => slide.classList.remove("active"))
  if (testimonials[index]) {
    testimonials[index].classList.add("active")
  }
}

function changeTestimonial(direction) {
  currentTestimonial += direction

  if (currentTestimonial >= testimonials.length) {
    currentTestimonial = 0
  } else if (currentTestimonial < 0) {
    currentTestimonial = testimonials.length - 1
  }

  showTestimonial(currentTestimonial)
}

// Auto-rotate testimonials
setInterval(() => {
  changeTestimonial(1)
}, 6000)

// Counter animation
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  }

  // Intersection Observer for counters
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

// Service filters
function initializeServiceFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const serviceCards = document.querySelectorAll(".service-full-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      serviceCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
          card.style.animation = "fadeIn 0.5s ease-in-out"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Booking form steps
let currentStep = 1

function nextStep() {
  if (validateCurrentStep()) {
    if (currentStep < 3) {
      // Hide current step
      document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove("active")
      document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove("active")

      currentStep++

      // Show next step
      document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add("active")
      document.querySelector(`.step[data-step="${currentStep}"]`).classList.add("active")

      if (currentStep === 3) {
        updateBookingSummary()
      }
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove("active")
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove("active")

    currentStep--

    // Show previous step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add("active")
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add("active")
  }
}

function validateCurrentStep() {
  const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
  const requiredFields = currentStepElement.querySelectorAll("[required]")

  for (const field of requiredFields) {
    if (!field.value.trim()) {
      field.focus()
      alert("Please fill in all required fields.")
      return false
    }
  }

  return true
}

function updateServicePrice() {
  const serviceSelect = document.getElementById("service")
  const priceDisplay = document.getElementById("servicePrice")

  if (serviceSelect.value) {
    const price = serviceSelect.options[serviceSelect.selectedIndex].getAttribute("data-price")
    priceDisplay.textContent = `Session Fee: ₹${price}`
    priceDisplay.style.display = "block"
  } else {
    priceDisplay.style.display = "none"
  }
}

function updateBookingSummary() {
  const formData = new FormData(document.getElementById("bookingForm"))
  const summaryDiv = document.getElementById("bookingSummary")

  const summary = `
    <div class="summary-item">
      <strong>Name:</strong> ${formData.get("fullName")}
    </div>
    <div class="summary-item">
      <strong>Service:</strong> ${document.getElementById("service").options[document.getElementById("service").selectedIndex].text}
    </div>
    <div class="summary-item">
      <strong>Date & Time:</strong> ${formData.get("datetime")}
    </div>
    <div class="summary-item">
      <strong>Contact:</strong> ${formData.get("mobile")}
    </div>
    <div class="summary-item">
      <strong>Address:</strong> ${formData.get("address")}
    </div>
  `

  summaryDiv.innerHTML = summary
}

// Service booking functions
function bookService(serviceType) {
  showSection("booking")

  // Pre-select the service
  setTimeout(() => {
    const serviceSelect = document.getElementById("service")
    if (serviceSelect) {
      serviceSelect.value = serviceType
      updateServicePrice()
    }
  }, 100)
}

// Package booking functions
function bookPackage(packageType) {
  showSection("booking")

  // Pre-select the package
  setTimeout(() => {
    const serviceSelect = document.getElementById("service")
    if (serviceSelect) {
      if (packageType === "weekly") {
        serviceSelect.value = "weekly-package"
      } else if (packageType === "monthly") {
        serviceSelect.value = "monthly-package"
      }
      updateServicePrice()
    }
  }, 100)
}

// FAQ functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active")
  }
}

// Form submissions
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")

  // Show success message
  showSuccessMessage(
    `Thank you, ${name}! Your ${subject} message has been submitted successfully. We'll get back to you soon at ${email}.`,
  )

  // Reset form
  this.reset()
})

document.getElementById("bookingForm")?.addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const name = formData.get("fullName")
  const service = document.getElementById("service").options[document.getElementById("service").selectedIndex].text
  const datetime = formData.get("datetime")
  const mobile = formData.get("mobile")

  // Show appointment submitted message
  showSuccessMessage(
    `🎉 Your appointment has been submitted successfully!

Hi ${name},
Your ${service} session request for ${datetime} has been received.

We'll contact you at ${mobile} within 2 hours to confirm the details.

Thank you for choosing PhysioDoor!`,
  )

  // WhatsApp booking confirmation
  const whatsappMessage = encodeURIComponent(
    `🏥 *PHYSIODOOR BOOKING REQUEST*

` +
      `👤 *Patient:* ${name}
` +
      `🩺 *Service:* ${service}
` +
      `📅 *Date & Time:* ${datetime}
` +
      `📱 *Contact:* ${mobile}

` +
      `Please confirm this appointment. Thank you!`,
  )

  // Open WhatsApp with booking details
  setTimeout(() => {
    window.open(`https://wa.me/919547784509?text=${whatsappMessage}`, "_blank")
  }, 2000)

  // Reset form
  this.reset()
  currentStep = 1
  document.querySelectorAll(".form-step").forEach((step) => step.classList.remove("active"))
  document.querySelectorAll(".step").forEach((step) => step.classList.remove("active"))
  document.querySelector('.form-step[data-step="1"]').classList.add("active")
  document.querySelector('.step[data-step="1"]').classList.add("active")
})

// Success message function
function showSuccessMessage(message) {
  // Create success modal
  const modal = document.createElement("div")
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(10px);
  `

  const messageBox = document.createElement("div")
  messageBox.style.cssText = `
    background: rgba(26, 31, 46, 0.9);
    backdrop-filter: blur(20px);
    border: 2px solid var(--primary-teal);
    border-radius: 20px;
    padding: 3rem;
    max-width: 500px;
    text-align: center;
    color: var(--text-primary);
    box-shadow: var(--shadow-xl);
  `

  messageBox.innerHTML = `
    <div style="font-size: 3rem; color: var(--primary-teal); margin-bottom: 1rem;">
      <i class="fas fa-check-circle"></i>
    </div>
    <h3 style="margin-bottom: 1rem; color: var(--primary-teal);">Success!</h3>
    <p style="line-height: 1.6; margin-bottom: 2rem; white-space: pre-line;">${message}</p>
    <button onclick="this.closest('div').remove()" style="
      background: var(--primary-teal);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    ">OK</button>
  `

  modal.appendChild(messageBox)
  document.body.appendChild(modal)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove()
    }
  }, 5000)
}

// Emergency booking
function emergencyBooking() {
  if (confirm("This is for emergency physiotherapy needs. We'll contact you within 30 minutes. Continue?")) {
    const name = prompt("Your name:")
    const phone = prompt("Your phone number:")
    const issue = prompt("Brief description of the emergency:")

    if (name && phone && issue) {
      const whatsappMessage = encodeURIComponent(
        `🚨 *EMERGENCY PHYSIOTHERAPY REQUEST*

` +
          `👤 *Name:* ${name}
` +
          `📱 *Phone:* ${phone}
` +
          `🆘 *Issue:* ${issue}

` +
          `*URGENT: Please contact immediately*`,
      )

      alert("Emergency request submitted! We'll contact you within 30 minutes.")
      window.open(`https://wa.me/919547784509?text=${whatsappMessage}`, "_blank")
    }
  }
}

// Utility functions
function showTerms() {
  alert(
    "Terms & Conditions:\n\n1. All appointments must be confirmed 24 hours in advance\n2. Cancellation policy: 4 hours notice required\n3. Payment due at time of service\n4. Professional conduct expected from all parties",
  )
}

function showPrivacy() {
  alert(
    "Privacy Policy:\n\nWe protect your personal and medical information according to healthcare privacy standards. Your data is never shared with third parties without consent.",
  )
}

function showRefund() {
  alert(
    "Refund Policy:\n\n- Full refund for cancellations 24+ hours in advance\n- 50% refund for cancellations 4-24 hours in advance\n- No refund for same-day cancellations\n- Medical emergencies considered case-by-case",
  )
}

function showServiceAreas() {
  alert(
    "Service Areas in Pune:\n\n• Koregaon Park\n• Viman Nagar\n• Kharadi\n• Hadapsar\n• Baner\n• Wakad\n• Hinjewadi\n• Aundh\n• Shivaji Nagar\n• Camp Area\n\nAnd surrounding areas. Contact us for specific location confirmation.",
  )
}

function startAssessment() {
  alert("Health Assessment feature coming soon! For now, please book a consultation or contact us directly.")
}

// Smooth animations on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".service-card, .testimonial-card")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("loaded")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(26, 31, 46, 0.95)"
    navbar.style.backdropFilter = "blur(20px)"
  } else {
    navbar.style.background = "rgba(26, 31, 46, 0.8)"
    navbar.style.backdropFilter = "blur(20px)"
  }
})

// Performance optimization
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded")
    }
  })
}, observerOptions)

// Observe elements for lazy loading
document.querySelectorAll(".loading").forEach((el) => {
  observer.observe(el)
})

console.log("PhysioDoor website loaded successfully! 🏥✨")
