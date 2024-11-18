const mongoose = require('mongoose');
const Booking = require('../models/Booking');  // Adjust the path if necessary

const seedBookings = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Coder');
        console.log('Database Connected');

        await Booking.deleteMany({});
        console.log('Existing bookings removed');

        const bookings = [
            {
                fullname: 'Eric Assem',
                email: 'eric.assem@example.com',
                company: 'Coder Inc.',
                position: 'CEO',
                service: 'Digital Solutions',
                digitalService: 'webDevelopment',
                appointmentType: 'Virtual',
                description: 'Looking to discuss a new website for the company.',
            },
            {
                fullname: 'Jane Doe',
                email: 'jane.doe@example.com',
                company: 'TechCorp',
                position: 'Lead Developer',
                service: 'Information Technology',
                itService: 'customSoftware',
                appointmentType: 'In-person',
                description: 'Discussing custom software for managing internal workflows.',
            },
            {
                fullname: 'John Smith',
                email: 'john.smith@example.com',
                company: 'DataSolutions',
                position: 'Data Scientist',
                service: 'Information Technology',
                itService: 'aiBigData',
                appointmentType: 'Virtual',
                description: 'Analyzing the potential for AI in our data analytics process.',
            },
            {
                fullname: 'Alice Johnson',
                email: 'alice.johnson@example.com',
                company: 'BioTech Innovations',
                position: 'R&D Director',
                service: 'Blockchain & Engineering',
                engineeringService: 'bitcoinMining',
                appointmentType: 'In-person',
                description: 'Meeting to explore blockchain applications for biotechnology.',
            },
            {
                fullname: 'Bob Brown',
                email: 'bob.brown@example.com',
                company: 'CloudTech Solutions',
                position: 'Cloud Architect',
                service: 'Information Technology',
                itService: 'cloudCybersecurity',
                appointmentType: 'Virtual',
                description: 'Discussing the integration of cybersecurity into cloud systems.',
            },
            {
                fullname: 'Clara White',
                email: 'clara.white@example.com',
                company: 'GreenTech',
                position: 'Environmental Engineer',
                service: 'Blockchain & Engineering',
                engineeringService: 'roboticsCommunication',
                appointmentType: 'In-person',
                description: 'Exploring the use of robotics in environmental conservation.',
            },
            {
                fullname: 'David Wilson',
                email: 'david.wilson@example.com',
                company: 'FutureTech',
                position: 'AI Specialist',
                service: 'Information Technology',
                itService: 'businessAutomation',
                appointmentType: 'Virtual',
                description: 'Looking for automated solutions for business processes.',
            },
            {
                fullname: 'Eva Turner',
                email: 'eva.turner@example.com',
                company: 'TechVision',
                position: 'Software Engineer',
                service: 'Digital Solutions',
                digitalService: 'eCommerce',
                appointmentType: 'In-person',
                description: 'Consultation regarding an e-commerce platform.',
            },
            {
                fullname: 'George Green',
                email: 'george.green@example.com',
                company: 'HealthTech',
                position: 'Tech Lead',
                service: 'Blockchain & Engineering',
                engineeringService: 'biomedicalEngineering',
                appointmentType: 'Virtual',
                description: 'Exploring blockchain applications in healthcare and biomedical engineering.',
            },
            {
                fullname: 'Hannah Lee',
                email: 'hannah.lee@example.com',
                company: 'SmartTech',
                position: 'Systems Engineer',
                service: 'Information Technology',
                itService: 'digitalForensics',
                appointmentType: 'In-person',
                description: 'Meeting to discuss digital forensics and cybersecurity.',
                approved: true
            }
        ];

        // Create bookings
        for (const booking of bookings) {
            const newBooking = new Booking({
                fullname: booking.fullname,
                email: booking.email,
                company: booking.company,
                position: booking.position,
                service: booking.service,
                digitalService: booking.digitalService,
                itService: booking.itService,
                engineeringService: booking.engineeringService,
                appointmentType: booking.appointmentType,
                description: booking.description,
                approved: booking.approved,
            });
            await newBooking.save();
            console.log(`Booking for ${booking.fullname} created`);
        }

        console.log('All bookings seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedBookings();
