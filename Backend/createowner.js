const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');
const ownermodel = require('./Models/ownermodel');

async function createOwner() {
    // Connect using your config and database name
    await mongoose.connect(`${config.get('MONGO_URI')}/Irodov`);

    // Hash the password
    const hash = await bcrypt.hash('jdsir@123', 10); // Change 'yourpassword' to your desired password

    // Create the owner
    const owner = await ownermodel.create({
        fullname: 'Jdsir', // Change as needed
        email: 'jdsir@gmail.com', // Change as needed
        password: hash
       
    });

    console.log('Owner created:', owner);
    mongoose.disconnect();
}

createOwner();