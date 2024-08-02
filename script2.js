document.addEventListener('DOMContentLoaded', () => {
	const formSubmitButton = document.querySelector('.btn')
	const showPasswordButtons = document.querySelectorAll('.show-password-btn')

	// Show/Hide Password Functionality
	showPasswordButtons.forEach(button => {
		button.addEventListener('click', () => {
			const passwordFields = document.querySelectorAll(
				'#password, #passwordConfirm'
			)
			passwordFields.forEach(field => {
				if (field.type === 'password') {
					field.type = 'text'
				} else {
					field.type = 'password'
				}
			})
		})
	})

	// Handle form submission
	formSubmitButton.addEventListener('click', event => {
		event.preventDefault() // Prevent the default form submission behavior
		const formEmail = document.querySelector('#inputEmail').value
		const formPassword = document.querySelector('#password').value
		const formPasswordConfirm = document.querySelector('#passwordConfirm').value

		if (formEmail === '' || formPassword === '' || formPasswordConfirm === '') {
			alert('Please fill in all fields')
			return
		}

		if (formPassword !== formPasswordConfirm) {
			alert('Passwords do not match')
			return
		}

		if (!formEmail.includes('.') || !formEmail.includes('@')) {
			alert('Invalid email format')
			return
		}

		const userData = {
			email: formEmail,
			password: formPassword,
		}

		localStorage.setItem('userData', JSON.stringify(userData))
		console.log('Registration successful')
		window.location.href = './login.html'
	})
})
