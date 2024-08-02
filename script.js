class ItemsList {
	constructor(List, numb = 4) {
		this.List = List
		this.numb = numb
		this.currentPage = 1
		this.render()
	}

	getPaginatedItems() {
		const startIndex = (this.currentPage - 1) * this.numb
		const endIndex = startIndex + this.numb
		return this.List.slice(startIndex, endIndex)
	}

	getTotalPages() {
		return Math.ceil(this.List.length / this.numb)
	}

	goToPage(page) {
		if (page > 0 && page <= this.getTotalPages()) {
			this.currentPage = page
			this.render()
			this.updatePagination()
		}
	}

	attachEventListeners() {
		const viewButtons = document.querySelectorAll('.itemsList-element__btn')
		viewButtons.forEach(button => {
			button.addEventListener('click', event => {
				const id = event.currentTarget.getAttribute('data-id')
				this.displayElement(id)
			})
		})
	}

	attachEventListenersName() {
		const names = document.querySelectorAll('.itemsList-element__name')
		names.forEach(name => {
			name.addEventListener('click', event => {
				const id = event.currentTarget.getAttribute('data-id')
				this.displayElement(id)
			})
		})
	}

	displayElement(id) {
		const element = this.List.find(item => item.id === id)
		let htmlListElement = ''

		if (element) {
			const { cdate, name, price, img } = element

			htmlListElement += ` 
                <li class="itemsList-elementEL"> 
                    <img class="itemsList-element__img" src="${img}" alt="${name}"> 
                    <div class="itemsList-element__container"> 
                        <span class="itemsList-element__name">${name}</span> 
                        <span class="itemsList-element__date">дата: ${cdate}</span> 
                        <span class="itemsList-element__price">ціна: ${price} UAH</span> 
                        <button class="itemsList-element__btn">купити</button> 
                    </div> 
                </li>`
		}

		const itemsListElement = document.getElementById('ItemsList')
		if (itemsListElement) {
			const originalHtmlCatalog = itemsListElement.innerHTML
			itemsListElement.innerHTML = htmlListElement
			document.querySelector('.wrapper').style.display = 'none'

			const tooltip = document.querySelector('.tooltip')
			if (tooltip) {
				tooltip.style.display = 'inline-block'
				tooltip.addEventListener('click', () => {
					document.querySelector('.wrapper').style.display = 'block'
					tooltip.style.display = 'none'
					itemsListElement.innerHTML = originalHtmlCatalog
					this.render()
				})
			}
			this.attachEventListeners()
			this.attachEventListenersName()
		}
	}

	render() {
		let htmlCatalog = ''
		this.getPaginatedItems().forEach(({ id, cdate, name, price, img }) => {
			htmlCatalog += ` 
                <li class="itemsList-element"> 
                    <img class="itemsList-element__img" src="${img}" alt="${name}"> 
                    <div class="itemsList-element__hover"> 
                        <span data-id="${id}" class="itemsList-element__name">${name}</span> 
                        <span class="itemsList-element__date">${cdate}</span> 
                        <span class="itemsList-element__price">${price} UAH</span> 
                        <button data-id="${id}" class="itemsList-element__btn">переглянути</button> 
                    </div> 
                </li>`
		})

		const html = ` 
            <ul class="itemsList-container"> 
                ${htmlCatalog} 
            </ul> 
            <div class="pagination"> 
                <button
class="pagination__button" onclick="ItemsListPage.goToPage(${
			this.currentPage - 1
		})" ${this.currentPage === 1 ? 'disabled' : ''}>&#10094;</button> 
                <div class="pagination-dots"></div> 
                <button class="pagination__button" onclick="ItemsListPage.goToPage(${
									this.currentPage + 1
								})" ${
			this.currentPage === this.getTotalPages() ? 'disabled' : ''
		}>&#10095;</button> 
            </div>`

		const itemListElement = document.getElementById('ItemsList')
		itemListElement.innerHTML = html

		this.createPagination()
		this.updatePagination()
		this.attachEventListeners()
		this.attachEventListenersName()
	}

	createPagination() {
		const paginationNumbers = document.querySelector('.pagination-dots')
		if (!paginationNumbers) return

		paginationNumbers.innerHTML = ''
		for (let i = 1; i <= this.getTotalPages(); i++) {
			const element = document.createElement('span')
			element.classList.add('pagination-dot')
			element.textContent = i
			element.addEventListener('click', () => this.goToPage(i))
			paginationNumbers.appendChild(element)
		}
	}

	updatePagination() {
		const elements = document.querySelectorAll('.pagination-dot')
		elements.forEach((element, index) => {
			if (index === this.currentPage - 1) {
				element.classList.add('active')
			} else {
				element.classList.remove('active')
			}
		})
	}
}

const ItemsListPage = new ItemsList(List)
document.addEventListener('DOMContentLoaded', () => {
	let userAccount = document.querySelector('.user_account')
	if (userAccount) {
		userAccount.addEventListener('click', () => {
			window.location.href = './login.html'
		})
	}
})