const mongoose = require('mongoose');
const User = require('../models/userModel');

const seedUsers = async () => {
    try {
        // Connect to the database
        await mongoose.connect('mongodb://127.0.0.1:27017/Coder')

        console.log('Database Connected');

        // Clear the existing users
        await User.deleteMany({});
        console.log('Existing users removed');

        // Seed data
        const users = [
            {
                username: 'Eric Assem',
                email: 'eric.assem@example.com',
                role: 'admin',
                password: 'secureAdminPassword', 
            },
            {
                username: 'Jane Doe',
                email: 'jane.doe@example.com',
                role: 'secretary',
                password: 'secureSecretaryPassword', 
            },
            {
                username: 'John Smith',
                email: 'john.smith@example.com',
                role: 'generalManager',
                password: 'secureManagerPassword', 
            },
            {
                username: 'Alice Johnson',
                email: 'alice.johnson@example.com',
                role: 'headofMarket',
                password: 'secureMarketPassword', 
            },
        ];

        // Create users with hashed passwords
        for (const user of users) {
            const newUser = new User({
                username: user.username,
                email: user.email,
                role: user.role,
            });
            await User.register(newUser, user.password);
            console.log(`User ${user.username} created`);
        }

        console.log('All users seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedUsers();
