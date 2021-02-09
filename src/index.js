import './style.css'
import screen from './screen.svg'
const NS = 'http://www.w3.org/2000/svg'

document.querySelector('#svg-container').innerHTML = screen
const lines = document.querySelectorAll('g')
const elScroll = document.querySelector('#scroll')
const elMinimap = document.querySelector('#minimap')
const elThumb = document.querySelector('#thumb')

const handleClick = e => {
  const el = e.target
  const elText = document.querySelector(`#${el.dataset.info}`)
  el.isSelected = !el.isSelected

  if (el.isSelected) {
    elText.classList.add('selected')
    el.style.fill = '#ffcc00'
    el.style.stroke = '#666666'
    el.style.strokeWidth = '2px'
  }
  else {
    elText.classList.remove('selected')
    el.style.fill = '#ebebeb'
    el.style.stroke = '#000'
    el.style.strokeWidth = '1px'
  }

  console.log(el.dataset.info, el.isSelected)
}

lines.forEach((line, i) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const seats = line.querySelectorAll('path')

  seats.forEach((seat, j) => {
    let position = seat.getBoundingClientRect()
    let elText = document.createElementNS(NS, 'text')

    let seatId = letters[i] + (j + 1)
    elText.textContent = seatId
    elText.id = seatId

    const zoomFactor = 2.1315

    elText.setAttribute('x', position.x * zoomFactor + 19)
    elText.setAttribute('y', position.y * zoomFactor - 30)// + 25)
    elText.setAttribute('text-anchor', 'middle')

    seat.addEventListener('click', handleClick)
    seat.dataset.info = seatId

    line.appendChild(elText);
  })
})

elScroll.addEventListener('scroll', e => {
  const realWidth = 600;
  const miniWidth = 140; //elMinimap.clientWidth
  const percentLeft = e.target.scrollLeft / (realWidth + elScroll.clientWidth)

  const miniLeft = miniWidth * percentLeft
  renderThumb(miniLeft)
})

window.addEventListener('resize', () => renderThumb(0))

const renderThumb = (left) => {
  const realWidth = 600;
  const viewportScale = elScroll.clientWidth / realWidth
  elThumb.style.width = `${viewportScale * 100}px`
  elThumb.style.left = `${left}px`
}

renderThumb(0)