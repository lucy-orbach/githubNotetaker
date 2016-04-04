let api = {
	getBio(username) {
		username = username.toLowerCase().trim();
		let url = `https://api.github.com/users/${username}`;
		return fetch(url).then(resp => resp.json());
	},
	getRepos(username) {
		username = username.toLowerCase().trim();
		let url = `https://api.github.com/users/${username}/repos`;
		return fetch(url).then(resp => resp.json());
	},
	getNotes(username) {
		let url = `https://rnative-notetaker.firebaseio.com/${username}.json`;
		return fetch(url).then(resp => resp.json());
	},
	addNote(username) {
		username = username.toLowerCase().trim();
		let url = `https://rnative-notetaker.firebaseio.com/${username}.json`;
		return fetch(url, {
			method: 'post',
			body: JSON.stringify(note) }).then(resp => resp.json());
	}
};

module.exports = api;