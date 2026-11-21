const progressBar = document.querySelector('.progress span')
const sections = [...document.querySelectorAll('article section[id]')]
const links = [...document.querySelectorAll('.section-nav a')]

function updatePageProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`
}

function updateActiveSection() {
  const current = sections.reduce((active, section) => {
    return window.scrollY + 150 >= section.offsetTop ? section : active
  }, sections[0])
  links.forEach((link) => link.classList.toggle('active', link.hash === `#${current?.id}`))
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'))
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})

window.addEventListener('scroll', () => {
  updatePageProgress()
  updateActiveSection()
}, { passive: true })
updatePageProgress()
updateActiveSection()
