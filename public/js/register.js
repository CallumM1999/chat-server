const handleRegisterForm = e => {
	e.preventDefault();

	const email = e.target.email.value;
	const email_conf = e.target.email_conf.value;
	const fname = e.target.fname.value;
	const lname = e.target.lname.value;
	const password = e.target.password.value;
	const password_conf = e.target.password_conf.value;


	if (email && email_conf && fname && lname && password && password_conf) {
		const sendData = {
			email,
			fname,
			lname,
			password
		};

		console.log('sending request', sendData);

		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sendData)
		})
			.then(res => console.log('fetch response', res.status))
			.catch(err => console.log('fetch err', err));
	}



};
