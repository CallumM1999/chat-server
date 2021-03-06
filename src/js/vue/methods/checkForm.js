const checkForm = function (e) {
	e.preventDefault();

	this.submitted = true;
	this.emailTaken = false;
	this.errors = {};

	if (!this.email) this.errors.email = 'Email required.';
	else if (!this.email.match(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) this.errors.email = 'Email Invalid.';

	if (!this.email_conf) this.errors.email_conf = 'Confirm email required.';
	else if (this.email_conf !== this.email) this.errors.email_conf = 'Email fields don\'t match.';

	if (!this.fname) this.errors.fname = 'First name required.';
	else if (this.fname.length > 20) this.errors.fname = 'First name max length 20 characters.';

	if (!this.lname) this.errors.lname = 'Last name required.';
	else if (this.lname.length > 20) this.errors.lname = 'Last name max length 20 characters.';

	if (!this.password) this.errors.password = 'Password required.';
	else if (this.password.length < 8 || this.password.length > 100) this.errors.password = 'Password must be 8-100 characters.';

	if (!this.password_conf) this.errors.password_conf = 'Confirm password required.';
	else if (this.password_conf !== this.password) this.errors.password_conf = 'Password fields don\'t match.';

	if (Object.keys(this.errors).length === 0) this.sendRequest(this.email, this.password, this.fname, this.lname);
};


export default checkForm;