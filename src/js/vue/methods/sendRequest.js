const sendRequest = function (email, password, fname, lname) {
    this.loading = true;

    const sendData = { email, fname, lname, password };

    fetch('/register', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
    })
        .then(res => {
            this.loading = false;

            if (res.status === 404) this.emailTaken = true;
            if (res.status === 200) {
                window.location = '/success';
            }
        })
        .catch(err => {
            this.loading = false;
            console.log('fetch err', err);
        });
};

export default sendRequest;