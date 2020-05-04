let app = new Vue({
    el: "#app",
    data: {
        errors: [],
        username: null,
        password: null,
        user: {},
        mail: null
    },
    methods: {
        createUser(e) {
            this.errors = [];

            if (!this.username) this.errors.push("Username required.");
            else if (!this.mail) this.errors.push("Mail required.");
            else if (!this.password) this.errors.push('Password required.');

            if (!this.errors.length)
            {
                this.user = {
                    username: this.username,
                    mail: this.mail,
                    password: this.password
                }
                axios.post('http://localhost:3000/__add@users/', this.user);
            }

            e.preventDefault();
        }
    }
})