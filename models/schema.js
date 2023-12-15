// Schemas for the users who would use the Boostr Mentorship platform, ranging from 
// students to mentors, useful for backend data validation and sanitization on signUp :)
const schemas = {
    student: {
        email: { type: 'string', required: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // Simple regex for email validation
        phone: { type: 'string', required: false, regex: /^\+?[1-9]\d{1,14}$/ }, // E.164 format
        password: { type: 'string', required: true, minLength: 6 },
        fullName: { type: 'string', required: true },
        university: { type: 'string', required: true },
        major: { type: 'string', required: true },
        graduationYear: { type: 'number', required: true },
        bio: { type: 'string', required: false, maxLength: 500 }, // Optional biography
        interests: { type: 'array', required: false }, // Array of strings representing student interests
    },
    mentor: {
        email: { type: 'string', required: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { type: 'string', required: false, regex: /^\+?[1-9]\d{1,14}$/ },
        password: { type: 'string', required: true, minLength: 6 },
        fullName: { type: 'string', required: true },
        company: { type: 'string', required: true },
        position: { type: 'string', required: true },
        industry: { type: 'string', required: true },
        skills: { type: 'array', required: true }, // Array of strings representing professional skills
        bio: { type: 'string', required: false, maxLength: 500 }, // Optional short biography
        yearsOfExperience: { type: 'number', required: true },
    },
};

module.exports = schemas;
