import zxcvbn from "zxcvbn";


const checkPasswordRequirements = (password) => {
    return {
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
        length: password.length >= 8,
    };
};


export const getPasswordStrength = (password) => {

    if (!password) {
        return {
            score: 0,
            label: "",
            color: "",
            requirements: {},
            valid: false,
        };
    }


    const requirements = checkPasswordRequirements(password);


    const isValid = Object.values(requirements)
        .every(Boolean);


    // IMPORTANT:
    // Don't show Good/Strong if requirements fail
    if (!isValid) {

        return {
            score: 1,
            label: "Weak",
            color: "text-red-500",
            requirements,
            valid: false,
        };
    }


    const result = zxcvbn(password);


    const strength = {
        0: {
            label: "Very Weak",
            color: "text-red-600",
        },

        1: {
            label: "Weak",
            color: "text-red-500",
        },

        2: {
            label: "Fair",
            color: "text-yellow-500",
        },

        3: {
            label: "Good",
            color: "text-blue-500",
        },

        4: {
            label: "Strong",
            color: "text-green-600",
        },
    };


    return {
        score: result.score,
        label: strength[result.score].label,
        color: strength[result.score].color,
        requirements,
        valid: true,
    };
};