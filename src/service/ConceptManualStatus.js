/**
 * Class to save and handle which concepts added or removed by manual interaction.
 * Is used to update the concept tree without further api requests.
 */
class ConceptManualStatus {
    constructor() {
        this.hide = new Map();
        this.show = new Map();
    }

    showConcept(concept) {
        this.show.set(concept.id, concept);
        if(this.hide.has(concept.id)) {
            this.hide.delete(concept.id);
        }
    }

    hideConcept(concept) {
        this.hide.set(concept.id, concept);
        if(this.show.has(concept.id)) {
            this.show.delete(concept.id);
        }
    }

    updateConcepts(concepts) {
        console.log(this);
        this.hide.forEach(function(val, key) {
            if(concepts.has(key)) {
                concepts.delete(key);
            }
        });

        this.show.forEach(function(val, key) {
            if(!concepts.has(key)) {
                concepts.set(key, val);
            }
        });

        return concepts;
    }

    isConceptActive(id) {
        return this.show.has(id);
    }
}

export default ConceptManualStatus;
