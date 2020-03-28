export class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    makeFetch(url, method='GET', body=undefined) {
        if (body) {
            body = JSON.stringify(body);
        }
        return fetch(`${this.baseUrl}/${url}`, {
            method,
            headers: this.headers,
            body
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                throw err
            });
    }
    getInitialCards() {
        return this.makeFetch(`cards`);     
    }

    setProfile() {
        return this.makeFetch(`users/me`)
            
    }
    updateProfile(userName, userJob) {
        return this.makeFetch(`users/me`, 'PATCH', {name: userName, about: userJob})
    }
    setCard(name, link) {
        return this.makeFetch(`cards`, 'POST', {name: name, link: link})  
    } 
    
}
	