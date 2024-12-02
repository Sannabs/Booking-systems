const mongoose = require('mongoose');
const Booking = require('../models/Booking');  

const seedBookings = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Coder');
        console.log('Database Connected');

        await Booking.deleteMany({});
        console.log('Existing bookings removed');

        const bookings = [
            {
                "fullname": "Eric Assem",
                "email": "eric.assem@example.com",
                "company": "Coder Inc.",
                "position": "CEO",
                "service": "Digital Solutions",
                "digitalService": "webDevelopment",
                "appointmentType": "Virtual",
                "description": "Looking to discuss a new website for the company.",
                "createdAt": "2024-06-19T05:38:22.119Z"
            },
            {
                "fullname": "Jane Doe",
                "email": "jane.doe@example.com",
                "company": "TechCorp",
                "position": "Lead Developer",
                "service": "Information Technology",
                "itService": "customSoftware",
                "appointmentType": "In-person",
                "description": "Discussing custom software for managing internal workflows.",
                "createdAt": "2024-10-22T10:01:57.321Z"
            },
            {
                "fullname": "John Smith",
                "email": "john.smith@example.com",
                "company": "DataSolutions",
                "position": "Data Scientist",
                "service": "Information Technology",
                "itService": "aiBigData",
                "appointmentType": "Virtual",
                "description": "Analyzing the potential for AI in our data analytics process.",
                "createdAt": "2024-08-15T07:27:05.287Z"
            },
            {
                "fullname": "Alice Johnson",
                "email": "alice.johnson@example.com",
                "company": "BioTech Innovations",
                "position": "R&D Director",
                "service": "Blockchain & Engineering",
                "engineeringService": "bitcoinMining",
                "appointmentType": "In-person",
                "description": "Meeting to explore blockchain applications for biotechnology.",
                "createdAt": "2024-11-10T03:59:12.182Z"
            },
            {
                "fullname": "Bob Brown",
                "email": "bob.brown@example.com",
                "company": "CloudTech Solutions",
                "position": "Cloud Architect",
                "service": "Information Technology",
                "itService": "cloudCybersecurity",
                "appointmentType": "Virtual",
                "description": "Discussing the integration of cybersecurity into cloud systems.",
                "createdAt": "2024-07-09T13:45:30.529Z"
            },
            {
                "fullname": "Clara White",
                "email": "clara.white@example.com",
                "company": "GreenTech",
                "position": "Environmental Engineer",
                "service": "Blockchain & Engineering",
                "engineeringService": "roboticsCommunication",
                "appointmentType": "In-person",
                "description": "Exploring the use of robotics in environmental conservation.",
                "createdAt": "2024-09-05T06:03:11.817Z"
            },
            {
                "fullname": "David Wilson",
                "email": "david.wilson@example.com",
                "company": "FutureTech",
                "position": "AI Specialist",
                "service": "Information Technology",
                "itService": "businessAutomation",
                "appointmentType": "Virtual",
                "description": "Looking for automated solutions for business processes.",
                "createdAt": "2024-06-10T12:24:09.111Z"
            },
            {
                "fullname": "Eva Turner",
                "email": "eva.turner@example.com",
                "company": "TechVision",
                "position": "Software Engineer",
                "service": "Digital Solutions",
                "digitalService": "eCommerce",
                "appointmentType": "In-person",
                "description": "Consultation regarding an e-commerce platform.",
                "createdAt": "2024-12-03T14:17:28.584Z"
            },
            {
                "fullname": "George Green",
                "email": "george.green@example.com",
                "company": "HealthTech",
                "position": "Tech Lead",
                "service": "Blockchain & Engineering",
                "engineeringService": "biomedicalEngineering",
                "appointmentType": "Virtual",
                "description": "Exploring blockchain applications in healthcare and biomedical engineering.",
                "createdAt": "2025-01-01T08:12:22.452Z"
            },
            {
                "fullname": "Hannah Lee",
                "email": "hannah.lee@example.com",
                "company": "SmartTech",
                "position": "Systems Engineer",
                "service": "Information Technology",
                "itService": "digitalForensics",
                "appointmentType": "In-person",
                "description": "Meeting to discuss digital forensics and cybersecurity.",
                "createdAt": "2024-05-23T02:46:33.924Z"
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
