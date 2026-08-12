import api from "../lib/axios";

const getDoctors = async ({
    page = 1,
    limit = 10,
    signal,
}) => {
    const { data } = await api.get(
        "/api/admin/all-doctors",
        {
            params: {
                page,
                limit,
            },
            signal,
        }
    );

    return data;
};

const changeDoctorAvailability = async (docId) => {
    const { data } = await api.post(
        "/api/admin/availability",
        { docId }
    );

    return data;
};

export { getDoctors, changeDoctorAvailability };