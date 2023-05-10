const RandExp = require('randexp');

exports.randomData = () => {
    console.log('jksdj')
    return {name: 'kakashi', username: new RandExp(/^[a-z A-Z 0-9]+$/).gen(), email: new RandExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).gen(), password: new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).gen()}
    // const randomString = new RandExp(/^[a-z A-Z 0-9]+$/).gen();
    // return randomString;
}