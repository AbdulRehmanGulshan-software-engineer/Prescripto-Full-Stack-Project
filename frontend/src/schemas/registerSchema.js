import { z } from "zod";


const commonPasswords = [
    "password",
    "password123",
    "12345678",
    "123456789",
    "qwerty",
    "admin123",
];


export const registerSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Name is too long")
        .regex(
            /^[A-Za-z\s'-]+$/,
            "Enter a valid name"
        ),


    email: z
        .string()
        .trim()
        .toLowerCase()
        .email(
            "Enter a valid email address"
        ),


    password: z
        .string()
        .min(
            8,
            "Password must be at least 8 characters"
        )

        .max(
            128,
            "Password is too long"
        )

        .regex(
            /[A-Z]/,
            "Must contain at least one uppercase letter"
        )

        .regex(
            /[a-z]/,
            "Must contain at least one lowercase letter"
        )

        .regex(
            /[0-9]/,
            "Must contain at least one number"
        )

        .regex(
            /[^A-Za-z0-9]/,
            "Must contain at least one special character"
        )

        .refine(
            (value)=> !/\s/.test(value),
            {
                message:
                "Password cannot contain spaces",
            }
        )

        .refine(
            (value)=>
                !commonPasswords.includes(
                    value.toLowerCase()
                ),
            {
                message:
                "This password is too common",
            }
        ),
});