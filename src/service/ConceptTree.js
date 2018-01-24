/**
 * Datastructure which transforms the api request to an easy parsable tree structure.
 */
class ConceptTree {

    /**
     * Initialize with raw json response from api request.
     * @param  {array} conceptJson json response
     */
    constructor(conceptJson) {
        this.conceptJson = conceptJson;
        this.conceptManualStatus = null;
    }

    /**
     * Get set of all unique registered annotators.
     * @return {Set}
     */
    getAnnotator() {
        var annotatorSet = new Set();
        Object.values(this.conceptJson.concepts).forEach(function(concept) {
            Object.keys(concept.annotator).forEach(function(annotator) {
                annotatorSet.add(annotator);
            });
        });

        return annotatorSet;
    }

    /**
     * Check if annotator occurs in specific list of concepts.
     * @param  {array} conceptList    list of concepts
     * @param  {String} annotatorCheck annotator to compare with
     * @return {bool}
     */
    annotatorHasConcept(conceptList, annotatorCheck) {
        var ret = false;

        conceptList.map(function(concept) {
            Object.keys(concept.annotator).forEach(function(annotator) {
                if(annotatorCheck == annotator) {
                    ret = true;
                }
            });
        });

        return ret;
    }

    /**
     * Check if annotator which parameter occurs in specific list of concepts.
     * @param  {array} conceptList    list of concepts
     * @param  {String} annotatorCheck annotator to compare with
     * @param  {String} parameterCheck parameter of annotator to compare with
     * @return {bool}
     */
    parameterHasConcept(conceptList, annotatorCheck, parameterCheck) {
        var ret = false;

        conceptList.map(function(concept) {
            if(concept.annotator.hasOwnProperty(annotatorCheck)){
                concept.annotator[annotatorCheck].map(function(parameter) {
                    if(parameter == parameterCheck) {
                        ret = true;
                    }
                });
            }
        });

        return ret;
    }

    /**
     * Get all parameter of annotator.
     * @param  {String} annotator annotator
     * @return {Set}
     */
    getParameter(annotator) {
        var parameterSet = new Set();
        Object.values(this.conceptJson.concepts).forEach(function(concept) {
            if(concept.annotator.hasOwnProperty(annotator)){
                concept.annotator[annotator].map(function(parameter) {
                    parameterSet.add(parameter);
                });
            }
        });

        return parameterSet;
    }

    /**
     * Get concepts which has a specific annotator parameter combination.
     * @param  {String} annotator
     * @param  {String} parameter
     * @return {Set}
     */
    getConcepts(annotator, parameter) {
        var concepts = new Map();
        Object.values(this.conceptJson.concepts).forEach(function(concept) {
            if(concept.annotator.hasOwnProperty(annotator)) {
                if(concept.annotator[annotator].indexOf(parameter) >= 0) {
                    concepts.set(concept.id, concept);
                }
            }
        });

        if(annotator == "manual" && this.conceptManualStatus) {
            concepts = this.conceptManualStatus.updateConcepts(concepts);
        }
        return concepts;
    }

    applyManualConcepts(conceptManualStatus) {
        this.conceptManualStatus = conceptManualStatus;
    }

    isManualConceptActive(id) {
        if(this.conceptManualStatus) {
            return this.conceptManualStatus.isConceptActive(id);
        }
        return false;
    }
}

export default ConceptTree;
