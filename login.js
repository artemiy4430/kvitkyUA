let inputEmail = document.getElementById('logemail')
let inputPassword = document.getElementById('logpass')
let email = inputEmail.value
let password = inputPassword.value

const formSubmitButton = document.querySelector('.btn')

formSubmitButton.addEventListener('click', event => {
	event.preventDefault()

	const formEmail = document.getElementById('logemail').value
	const formPassword = document.getElementById('logpass').value

	if (formEmail === 'Admin' && formPassword === 'Admin') {
		const allUsersData = JSON.parse(localStorage.getItem('allUsersData'))
		if (allUsersData) {
			console.log('Registered Users:')
			allUsersData.forEach((user, index) => {
				console.log(`User ${index + 1}:`)
				console.log(`Email: ${user.email}`)
				console.log(`Password: ${user.password}`)
			})
		} else {
			console.log('No registered users found.')
		}
		window.location.href = './index.html'
	} else {
		const storedUserData = JSON.parse(localStorage.getItem('userData'))
		if (
			storedUserData &&
			formEmail === storedUserData.email &&
			formPassword === storedUserData.password
		) {
			window.location.href = './index.html'
		} else {
			alert('Password or login is incorrect')
		}
	}
})

let showPasswordButton = document.querySelector('.show-password-btn')
showPasswordButton.addEventListener('click', showPassword)

function showPassword() {
	let inputPassword = document.getElementById('logpass')
	inputPassword.type = 'text'
	setTimeout(() => {
		inputPassword.type = 'password'
	}, 2000)
}
