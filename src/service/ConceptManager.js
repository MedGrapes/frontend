class ConceptManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    getConceptProperty(id, cb) {

        fetch("http://localhost:8090/concept/get?id="+id)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            cb(json);
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }
}

export default ConceptManager;
