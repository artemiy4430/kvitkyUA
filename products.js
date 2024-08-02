class Products {
	constructor(Catalog, numb = 10) {
		this.Catalog = Catalog
		this.numb = numb
		this.currentPage = 1
		this.render()
	}

	getPaginatedElements() {
		let startIndex = (this.currentPage - 1) * this.numb
		let endIndex = startIndex + this.numb
		return this.Catalog.slice(startIndex, endIndex)
	}

	getTotalPages() {
		return Math.ceil(this.Catalog.length / this.numb)
	}

	goToPage(page) {
		if (page > 0 && page <= this.getTotalPages()) {
			this.currentPage = page
			this.render()
			this.PaginationUpdate()
		}
	}
	attachEventListeners() {
		const viewButtons = document.querySelectorAll('.products-element__btn')
		viewButtons.forEach(button => {
			button.addEventListener('click', event => {
				const id = event.currentTarget.getAttribute('data-id')
				displayElement(id)
			})
		})
	}
	attachEventListenersName() {
		const names = document.querySelectorAll('.products-element__name')
		names.forEach(k => {
			k.addEventListener('click', event => {
				const id = event.currentTarget.getAttribute('data-id')
				displayElement(id)
			})
		})
	}

	render() {
		let htmlCatalog = ''
		this.getPaginatedElements().forEach(({ id, cdate, name, price, img }) => {
			htmlCatalog += `
                <li class="products-element">
                    <img class="products-element__img" src="${img}" alt="${name}">
                    <div class="products-element__hover">
                        <span data-id="${id}" class="products-element__name">${name}</span>
                        <span class="products-element__date">${cdate}</span>
                        <span class="products-element__price">${price} UAH</span>
                        <button data-id="${id}" class="products-element__btn">view</button>
                    </div>
                </li>
            `
		})

		const html = `
            <ul class="products-container">
                ${htmlCatalog}
            </ul>
            <div class="paginationOrder">
                <button class="pagination__btn" onclick="ProductsPage.goToPage(${
									this.currentPage - 1
								})" ${
			this.currentPage === 1 ? 'disabled' : ''
		}>&#10094;</button>
                <div class="pagination-numbers"></div>
                <button class="pagination__btn" onclick="ProductsPage.goToPage(${
									this.currentPage + 1
								})" ${
			this.currentPage === this.getTotalPages() ? 'disabled' : ''
		}>&#10095;</button>
            </div>
        `

		document.getElementById('products').innerHTML = html
		this.PaginationCreate()
		this.PaginationUpdate()
		this.attachEventListeners()
		this.attachEventListenersName()
	}

	PaginationCreate() {
		const paginationNumbers = document.querySelector('.pagination-numbers')
		if (!paginationNumbers) return
		paginationNumbers.innerHTML = ''
		for (let i = 1; i <= this.getTotalPages(); i++) {
			const element = document.createElement('span')
			element.classList.add('pagination-element')
			element.textContent = i
			element.addEventListener('click', () => {
				this.goToPage(i)
			})
			paginationNumbers.appendChild(element)
		}
	}

	PaginationUpdate() {
		const elements = document.querySelectorAll('.pagination-element')
		elements.forEach((element, index) => {
			if (index === this.currentPage - 1) {
				element.classList.add('active')
			} else {
				element.classList.remove('active')
			}
		})
	}
}

const ProductsPage = new Products(Catalog)
const searchInput = document.querySelector('.search')
const searchOptions = document.querySelector('.options')

function getOptions(word, Catalog) {
	const regex = new RegExp(word, 'gi')
	return Catalog.filter(c => c.name.match(regex))
}

function displayOptions() {
	const word = this.value
	const options = getOptions(word, Catalog)
	const html = options
		.map(item => {
			const regex = new RegExp(word, 'gi')
			const itemName = item.name.replace(
				regex,
				`<span class="hl">${word}</span>`
			)
			return `<li data-id="${item.id}"><span class="search-item">${itemName}</span></li>`
		})
		.slice(0, 5)
		.join('')
	searchOptions.innerHTML = html
	searchOptions.style.display = options.length ? 'block' : 'none'
	attachEventListenersOP()
}

function attachEventListenersOP() {
	const items = document.querySelectorAll('.search-item')
	items.forEach(item => {
		item.addEventListener('click', event => {
			const id = event.currentTarget.parentElement.getAttribute('data-id')
			displayElement(id)
		})
	})
}

document.getElementById('clearButton').addEventListener('click', function () {
	searchInput.value = ''
	searchOptions.innerHTML = ''
	searchOptions.style.display = 'none'
})

searchInput.addEventListener('input', displayOptions)
searchInput.addEventListener('keyup', displayOptions)

function displayConcert() {
	const concert = Catalog.filter(item => item.type === 'concert')
	let htmlCatalogConcert = ''
	concert.forEach(({ id, cdate, name, price, img }) => {
		htmlCatalogConcert += `
            <hr>
            <li class="concert-element">
                <img class="products-element__imgConcert" src="${img}" alt="${name}">
                <div class="products-elementConcert_container">
                    <span class="products-element__nameConcert">${name}</span>
                    <span class="products-element__dateConcert">${cdate}</span>
                    <span class="products-element__priceConcert">${price} UAH</span>
                    <button data-id="${id}" class=" products-element__btnConcert">view</button>
                </div>
            </li>
            <hr>
        `
	})

	const productsElement = document.getElementById('products')
	if (productsElement) {
		const originalHtmlCatalog = productsElement.innerHTML
		productsElement.innerHTML = htmlCatalogConcert
		document.querySelector('.concert_paragraph').style.display = 'block'
		document.querySelector('.wrapper').style.display = 'none'
		document.querySelector('.additional_text').style.display = 'none'

		const tooltip = document.querySelector('.tooltip')
		tooltip.style.display = 'inline-block'
		tooltip.addEventListener('click', () => {
			document.querySelector('.wrapper').style.display = 'block'
			document.querySelector('.additional_text').style.display = 'block'
			tooltip.style.display = 'none'
			document.querySelector('.concert_paragraph').style.display = 'none'
			productsElement.innerHTML = originalHtmlCatalog
			ProductsPage.render()
		})
		attachEventListenersConcert()
	}
}

function attachEventListenersConcert() {
	const viewButtons = document.querySelectorAll('.products-element__btnConcert')
	viewButtons.forEach(button => {
		button.addEventListener('click', event => {
			const id = event.currentTarget.getAttribute('data-id')
			displayElement(id)
		})
	})
}

document
	.querySelector('.page_container_itemC')
	.addEventListener('click', () => {
		document.querySelector('.comedy_paragraph').style.display = 'none'
		document.querySelector('.sport_paragraph').style.display = 'none'
		document.querySelector('.fest_paragraph').style.display = 'none'
		displayConcert()
	})

function displayComedy() {
	const comedy = Catalog.filter(item => item.type === 'comedy')
	let htmlCatalogComedy = ''
	comedy.forEach(({ id, type, cdate, name, price, img }) => {
		htmlCatalogComedy += `
                        <hr>
                        <li class="comedy-element">
                            <img class="products-element__imgComedy" src="${img}" alt="${name}">
                            <div class="products-elementComedy_container">
                                <span class="products-element__nameComedy">${name}</span>
                                <span class="products-element__dateComedy">${cdate}</span>
                                <span class="products-element__priceComedy">${price} UAH</span>
                                <button data-id="${id}" class="products-element__btnComedy">buy</button>
                            </div>
                        </li>
                        <hr>
                    `
	})
	const productsElement = document.getElementById('products')
	if (productsElement) {
		const originalHtmlCatalog = productsElement.innerHTML
		productsElement.innerHTML = htmlCatalogComedy
		document.querySelector('.comedy_paragraph').style.display = 'block'
		document.querySelector('.wrapper').style.display = 'none'
		document.querySelector('.additional_text').style.display = 'none'

		const tooltip = document.querySelector('.tooltip')
		tooltip.style.display = 'inline-block'
		tooltip.addEventListener('click', () => {
			document.querySelector('.wrapper').style.display = 'block'
			document.querySelector('.additional_text').style.display = 'block'
			tooltip.style.display = 'none'
			document.querySelector('.comedy_paragraph').style.display = 'none'
			document.getElementById('products').innerHTML = originalHtmlCatalog
			ProductsPage.render()
		})
		attachEventListenersComedy()
	}
}

function attachEventListenersComedy() {
	const viewButtons = document.querySelectorAll('.products-element__btnComedy')
	viewButtons.forEach(button => {
		button.addEventListener('click', event => {
			const id = event.currentTarget.getAttribute('data-id')
			displayElement(id)
		})
	})
}
document
	.querySelector('.page_container_itemSU')
	.addEventListener('click', () => {
		document.querySelector('.concert_paragraph').style.display = 'none'
		document.querySelector('.sport_paragraph').style.display = 'none'
		document.querySelector('.fest_paragraph').style.display = 'none'
		displayComedy()
	})

function displaySport() {
	const sport = Catalog.filter(item => item.type === 'sport')
	let htmlCatalogSport = ''
	sport.forEach(({ id, type, cdate, name, price, img }) => {
		htmlCatalogSport += `
    <hr>
    <li class="sport-element">
        <img class="products-element__imgSport" src="${img}" alt="${name}">
        <div class="products-elementSport_container">
            <span class="products-element__nameSport">${name}</span>
            <span class="products-element__dateSport">${cdate}</span>
            <span class="products-element__priceSport">${price} UAH</span>
            <button data-id="${id}" class="products-element__btnSport">buy</button>
        </div>
    </li>
    <hr>
                    `
	})
	const productsElement = document.getElementById('products')
	if (productsElement) {
		const originalHtmlCatalog = productsElement.innerHTML
		productsElement.innerHTML = htmlCatalogSport
		document.querySelector('.sport_paragraph').style.display = 'block'
		document.querySelector('.wrapper').style.display = 'none'
		document.querySelector('.additional_text').style.display = 'none'

		const tooltip = document.querySelector('.tooltip')
		tooltip.style.display = 'inline-block'
		tooltip.addEventListener('click', () => {
			document.querySelector('.wrapper').style.display = 'block'
			document.querySelector('.additional_text').style.display = 'block'
			tooltip.style.display = 'none'
			document.querySelector('.sport_paragraph').style.display = 'none'
			document.getElementById('products').innerHTML = originalHtmlCatalog
			ProductsPage.render()
		})
		attachEventListenersSport()
	}
}
function displayFest() {
	const fest = Catalog.filter(item => item.type === 'festival')
	let htmlCatalogFest = ''
	fest.forEach(({ id, type, cdate, name, price, img }) => {
		htmlCatalogFest += `
                        <hr>
                        <li class="fest-element">
                            <img class="products-element__imgFest" src="${img}" alt="${name}">
                            <div class="products-elementFest_container">
                                <span class="products-element__nameFest">${name}</span>
                                <span class="products-element__dateFest">${cdate}</span>
                                <span class="products-element__priceFest">${price} UAH</span>
                                <button data-is="${id}" class="products-element__btnFest">buy</button>
                            </div>
                        </li>
                        <hr>
                    `
	})

	const productsElement = document.getElementById('products')
	if (productsElement) {
		const originalHtmlCatalog = productsElement.innerHTML
		productsElement.innerHTML = htmlCatalogFest
		document.querySelector('.fest_paragraph').style.display = 'block'
		document.querySelector('.wrapper').style.display = 'none'
		document.querySelector('.additional_text').style.display = 'none'

		const tooltip = document.querySelector('.tooltip')
		tooltip.style.display = 'inline-block'
		tooltip.addEventListener('click', () => {
			document.querySelector('.wrapper').style.display = 'block'
			document.querySelector('.additional_text').style.display = 'block'
			tooltip.style.display = 'none'
			document.querySelector('.fest_paragraph').style.display = 'none'
			document.getElementById('products').innerHTML = originalHtmlCatalog
			ProductsPage.render()
		})
		attachEventListeners()
	}
}

function attachEventListeners() {
	const viewButtons = document.querySelectorAll('.products-element__btnFest')
	viewButtons.forEach(button => {
		button.addEventListener('click', event => {
			const id = event.currentTarget.getAttribute('data-id')
			displayElement(id)
		})
	})
}

document
	.querySelector('.page_container_itemFS')
	.addEventListener('click', () => {
		document.querySelector('.concert_paragraph').style.display = 'none'
		document.querySelector('.comedy_paragraph').style.display = 'none'
		document.querySelector('.sport_paragraph').style.display = 'none'
		displayFest()
	})

function attachEventListenersSport() {
	const viewButtons = document.querySelectorAll('.products-element__btnSport')
	viewButtons.forEach(button => {
		button.addEventListener('click', event => {
			const id = event.currentTarget.getAttribute('data-id')
			displayElement(id)
		})
	})
}

document
	.querySelector('.page_container_itemSP')
	.addEventListener('click', () => {
		document.querySelector('.concert_paragraph').style.display = 'none'
		document.querySelector('.comedy_paragraph').style.display = 'none'
		document.querySelector('.fest_paragraph').style.display = 'none'
		displaySport()
	})

function displayFest() {
	const fest = Catalog.filter(item => item.type === 'festival')
	let htmlCatalogFest = ''
	fest.forEach(({ id, type, cdate, name, price, img }) => {
		htmlCatalogFest += `
                        <hr>
                        <li class="fest-element">
                            <img class="products-element__imgFest" src="${img}" alt="${name}">
                            <div class="products-elementFest_container">
                                <span class="products-element__nameFest">${name}</span>
                                <span class="products-element__dateFest">${cdate}</span>
                                <span class="products-element__priceFest">${price} UAH</span>
                                <button data-id="${id}" class="products-element__btnFest">buy</button>
                            </div>
                        </li>
                        <hr>
                    `
	})

	const productsElement = document.getElementById('products')
	if (productsElement) {
		const originalHtmlCatalog = productsElement.innerHTML
		productsElement.innerHTML = htmlCatalogFest
		document.querySelector('.fest_paragraph').style.display = 'block'
		document.querySelector('.wrapper').style.display = 'none'
		document.querySelector('.additional_text').style.display = 'none'

		const tooltip = document.querySelector('.tooltip')
		tooltip.style.display = 'inline-block'
		tooltip.addEventListener('click', () => {
			document.querySelector('.wrapper').style.display = 'block'
			document.querySelector('.additional_text').style.display = 'block'
			tooltip.style.display = 'none'
			document.querySelector('.fest_paragraph').style.display = 'none'
			document.getElementById('products').innerHTML = originalHtmlCatalog
			ProductsPage.render()
		})
		attachEventListenersFest()
	}
}

function attachEventListenersFest() {
	const viewButtons = document.querySelectorAll('.products-element__btnFest')
	viewButtons.forEach(button => {
		button.addEventListener('click', event => {
			const id = event.currentTarget.getAttribute('data-id')
			displayElement(id)
		})
	})
}

document
	.querySelector('.page_container_itemFS')
	.addEventListener('click', () => {
		document.querySelector('.concert_paragraph').style.display = 'none'
		document.querySelector('.comedy_paragraph').style.display = 'none'
		document.querySelector('.sport_paragraph').style.display = 'none'
		displayFest()
	})

function displayElement(id) {
	const element = Catalog.find(item => item.id === id)
	let htmlCatalogElement = ''

	if (element) {
		const { cdate, name, price, img } = element

		htmlCatalogElement += `
            <li class="products-elementEL">
                <img class="products-element__img" src="${img}" alt="${name}">
								<div class="products-element_container">
                <span class="products-element__name">${name}</span>
                <span class="products-element__date">date:${cdate}</span>
                <span class="products-element__price">price: ${price} UAH</span>
                <button class="products-element__btn">buy</button>
								</div>
            </li>
        `
	}

	const productsElement = document.getElementById('products')
	if (productsElement) {
		const originalHtmlCatalog = productsElement.innerHTML
		productsElement.innerHTML = htmlCatalogElement
		document.querySelector('.wrapper').style.display = 'none'
		document.querySelector('.additional_text').style.display = 'none'
    

		const tooltip = document.querySelector('.tooltip')
		if (tooltip) {
			tooltip.style.display = 'inline-block'
			tooltip.addEventListener('click', () => {
				document.querySelector('.wrapper').style.display = 'block'
				document.querySelector('.additional_text').style.display = 'block'
				tooltip.style.display = 'none'
				productsElement.innerHTML = originalHtmlCatalog
				ProductsPage.render()
			})
		}
		attachEventListeners()
		attachEventListenersName()
	}
}
