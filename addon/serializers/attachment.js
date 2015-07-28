import DS from "ember-data";

export default DS.RESTSerializer.extend({
    primaryKey: "id",
    normalize: function (type, hash) {
        var rev, self;
        self = this;
        rev = hash._rev || hash.rev;
        this.store.find(hash.model_name, hash.doc_id).then(function (document) {
            if (document.get("_data.rev") !== rev) {
                if (self.getIntRevision(document.get("_data.rev")) < self.getIntRevision(rev)) {
                    return document.set("_data.rev", rev);
                }
            }
        });
        return this._super(type, hash);
    },
    getIntRevision: function (revision) {
        return parseInt(revision.split("-")[0]);
    },
    normalizeId: function (hash) {
        hash.id = hash._id || hash.id;
        return hash.id;
    }
});
