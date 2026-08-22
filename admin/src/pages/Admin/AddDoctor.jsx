import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const { backendUrl, aToken } = useContext(AdminContext);

  useEffect(() => {
    if (!docImg) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(docImg);
    setImagePreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [docImg]);

  const resetForm = () => {
    setDocImg(null);
    setName("");
    setEmail("");
    setPassword("");
    setExperience("1 Year");
    setFees("");
    setAbout("");
    setSpeciality("General physician");
    setDegree("");
    setAddress1("");
    setAddress2("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!docImg) {
      toast.error("Please select a doctor image.");
      return;
    }

    if (!name.trim()) {
      toast.error("Doctor name is required.");
      return;
    }

    if (!email.trim()) {
      toast.error("Doctor email is required.");
      return;
    }

    if (!password.trim()) {
      toast.error("Doctor password is required.");
      return;
    }

    if (!fees || Number(fees) < 0) {
      toast.error("Please enter a valid consultation fee.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", String(Number(fees)));
      formData.append("about", about.trim());
      formData.append("speciality", speciality);
      formData.append("degree", degree.trim());

      formData.append(
        "address",
        JSON.stringify({
          line1: address1.trim(),
          line2: address2.trim(),
        }),
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message || "Doctor added successfully.");
        resetForm();
      } else {
        toast.error(data.message || "Failed to add doctor.");
      }
    } catch (error) {
      console.error("Add doctor error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding doctor.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <div className="w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-lg border border-gray-200 bg-white px-8 py-8">
        <div className="mb-8 flex items-center gap-4 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="h-16 w-16 rounded-full bg-gray-100 object-cover"
              src={imagePreview || assets.upload_area}
              alt="Doctor"
            />
          </label>

          <input
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                setDocImg(file);
              }
            }}
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
          />

          <div>
            <p className="text-sm">
              Upload doctor
              <br />
              picture
            </p>

            <p className="mt-1 text-xs text-gray-400">JPG, PNG or WEBP</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-8 text-gray-600 lg:flex-row">
          <div className="flex w-full flex-col gap-5 lg:w-1/2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Doctor name</label>

              <input
                onChange={(event) => setName(event.target.value)}
                value={name}
                className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400"
                type="text"
                placeholder="Dr. Sarah Patel"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Doctor Email</label>

              <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400"
                type="email"
                placeholder="doctor@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Doctor password</label>

              <input
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Doctor experience</label>

              <select
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 outline-none transition focus:border-gray-400"
                onChange={(event) => setExperience(event.target.value)}
                value={experience}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="7 Year">7 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="9 Year">9 Years</option>
                <option value="10 Year">10 Years</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Consultation Fee</label>

              <input
                onChange={(event) => setFees(event.target.value)}
                value={fees}
                className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400"
                type="number"
                min="0"
                placeholder="30"
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-5 lg:w-1/2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Speciality</label>

              <select
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 outline-none transition focus:border-gray-400"
                onChange={(event) => setSpeciality(event.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Education</label>

              <input
                onChange={(event) => setDegree(event.target.value)}
                value={degree}
                className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400"
                type="text"
                placeholder="MBBS"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Address</label>

              <input
                onChange={(event) => setAddress1(event.target.value)}
                value={address1}
                className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400"
                type="text"
                placeholder="Address line 1"
                required
              />

              <input
                onChange={(event) => setAddress2(event.target.value)}
                value={address2}
                className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none transition focus:border-gray-400"
                type="text"
                placeholder="Address line 2"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-1.5 block text-sm text-gray-600">
            About Doctor
          </label>

          <textarea
            onChange={(event) => setAbout(event.target.value)}
            value={about}
            className="w-full resize-none rounded-md border border-gray-200 px-4 py-2 outline-none transition focus:border-gray-400"
            placeholder="Write about doctor"
            required
            rows={5}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 rounded-full bg-primary px-10 py-3 text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Adding Doctor..." : "Add Doctor"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;