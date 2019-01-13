import Vue from 'vue';
import checkForm from './methods/checkForm';
import sendRequest from './methods/sendRequest';

const form = new Vue({
	el: '#registerForm',
	data: {
		email: null,
		email_conf: null,
		fname: null,
		lname: null,
		password: null,
		password_conf: null,

		errors: {},
		loading: false,

		submitted: false,
		emailTaken: false,
	},
	methods: {
		checkForm,
		sendRequest
	}
});

export default form;