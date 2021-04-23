const Model = require(`../model/model`);
const bcrypt = require('bcryptjs');

const findUser = async (userData) => {
    const { email, password } = userData;
    const doc = await Model.cycvuser.findOne({ email });
    if (doc) {
        const _doc_password = doc.password;
        const isMatch = bcrypt.compareSync(password, _doc_password);
        if (isMatch) {
            return { token: `${doc._id}-${doc.name}`, messenger: "successfully!" }
        }
        return { messenger: "authenticate fail!" }
    }
    return null;
}
//
// /auth/login
//
exports.generateToken = async (request, response) => {
    const { email, password } = request.body;
    let sendData = await findUser({ email, password });
    if (sendData) {
        console.log(`login - found token:`, sendData)
        response.send(sendData);
        return;
    }
    response.status(404).send({ messenger: "there is no result for that user!" });
}
//
// /auth/signup
//
exports.createUser = async (request, response) => {
    if (!request.body) {
        response.status(404).send({ messenger: "content cannot be empty!" });
        return;
    }
    const { email, name, password } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await findUser({ email });
    if (user) {
        return response.send({ messenger: "The user have already initialized in our database!" });
    }
    const cycv = new Model.cycvuser({
        email, password: hash, name
    });
    cycv.save(cycv)
        .then(doc => {
            response.send({ token: `${doc._id}-${doc.name}`, messenger: "successfully!" });
        })
        .catch(err => {
            response.status(500).send({ messenger: err })
        })
}