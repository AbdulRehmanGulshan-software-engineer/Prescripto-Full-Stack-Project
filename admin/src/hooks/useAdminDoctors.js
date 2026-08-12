import { useContext } from "react";
import { AdminDoctorsContext } from "../context/AdminDoctorsContext";

export const useAdminDoctors = () => {
    const context = useContext(AdminDoctorsContext);

    if (!context) {
        throw new Error(
            "useAdminDoctors must be used inside AdminDoctorsProvider"
        );
    }

    return context;
};