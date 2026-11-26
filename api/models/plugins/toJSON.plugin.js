// Cleans every document before it is sent as JSON:
//   _id → id, removes __v and password
const toJSONPlugin = (schema) => {
    schema.set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            const { _id, password, ...rest } = ret;
            return { id: _id?.toString(), ...rest }; // put id first for readability
        },
    });
};

module.exports = toJSONPlugin;
