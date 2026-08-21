import React, { useState } from "react";
import NavBar from "../../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import Default from "../../assets/profile.avif";
import { toast } from "react-toastify";
import { updateuser } from "../../redux/features/authslice";
import { FcPrevious } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

// Defined OUTSIDE Profile so it isn't recreated on every re-render (fixes input focus loss)
function Field({ label, name, type = "text", value, placeholder, editing, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <span className="w-full sm:w-32 shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </span>
      {editing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      ) : (
        <span className="text-sm text-gray-800 dark:text-gray-100">
          {value || placeholder}
        </span>
      )}
    </div>
  );
}

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [editing, setediting] = useState(false);
  const [image, setimage] = useState(false);
  const dispatch = useDispatch();

  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    job: "",
    website: "",
    profile: "",
  });

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center dark:bg-black bg-gray-100 dark:text-white">
        Loading...
      </div>
    );
  }

  function handlechange(e) {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleEdit(e) {
    e.preventDefault();
    setdata({
      id: user.id,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      bio: user.bio || "",
      location: user.location || "",
      job: user.job || "",
      website: user.website || "",
      profile: user.profile || "",
    });
    setediting(true);
  }

  async function handlesubmit(e) {
    e.preventDefault();
    if (!data.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!data.email.trim()) {
      toast.error("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (
      !data.phone.trim() ||
      !data.bio.trim() ||
      !data.job.trim() ||
      !data.location.trim() ||
      !data.website.trim()
    ) {
      toast.error("please fill in all the field");
      return;
    }
    try {
      await dispatch(updateuser(data)).unwrap();
      toast("updated succefully");
      setediting(false);
    } catch (err) {
      toast.error(err?.message || "Update failed");
    }
  }

  function handleimage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const MAX_SIZE = 300;
      let { width, height } = img;

      if (width > height) {
        height *= MAX_SIZE / width;
        width = MAX_SIZE;
      } else {
        width *= MAX_SIZE / height;
        height = MAX_SIZE;
      }

      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);

      const compressed = canvas.toDataURL("image/jpeg", 0.7);

      try {
        await dispatch(
          updateuser({ id: user.id, profile: compressed })
        ).unwrap();
        toast.success("Profile picture updated");
        setimage(false);
      } catch (err) {
        toast.error(err?.message || "Upload failed");
      }
    };

    reader.onerror = () => toast.error("Couldn't read that file");
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen dark:bg-black bg-gray-100 dark:text-white text-black">
      <NavBar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/Home")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
            aria-label="Go back"
          >
            <FcPrevious className="size-6" />
          </button>
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>

        {/* Avatar card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <img
            src={user.profile || Default}
            alt="Profile"
            className="size-24 rounded-full object-cover ring-2 ring-indigo-500/30"
          />

          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>

            <button
              onClick={() => setimage(!image)}
              className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Change profile picture
            </button>

            {image && (
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleimage}
                className="mt-2 text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-white file:text-xs file:cursor-pointer hover:file:bg-indigo-700 transition"
              />
            )}
          </div>
        </div>

        <form onSubmit={handlesubmit} className="flex flex-col gap-6">
          {/* Personal information */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-base font-semibold mb-3">
              Personal information
            </h3>
            <Field
              label="Fullname"
              name="name"
              value={data.name}
              placeholder={user.name}
              editing={editing}
              onChange={handlechange}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={data.email}
              placeholder={user.email}
              editing={editing}
              onChange={handlechange}
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={data.phone}
              placeholder={user.phone || "Your phone number"}
              editing={editing}
              onChange={handlechange}
            />
            <Field
              label="Bio"
              name="bio"
              value={data.bio}
              placeholder={user.bio || "Describe yourself"}
              editing={editing}
              onChange={handlechange}
            />
          </section>

          {/* Additional information */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-base font-semibold mb-3">
              Additional information
            </h3>
            <Field
              label="Location"
              name="location"
              value={data.location}
              placeholder={user.location || "Your location"}
              editing={editing}
              onChange={handlechange}
            />
            <Field
              label="Job title"
              name="job"
              value={data.job}
              placeholder={user.job || "Your role"}
              editing={editing}
              onChange={handlechange}
            />
            <Field
              label="Website"
              name="website"
              value={data.website}
              placeholder={user.website || "Your website"}
              editing={editing}
              onChange={handlechange}
            />
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {editing && (
              <button
                type="button"
                onClick={() => setediting(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                Cancel
              </button>
            )}
            {editing ? (
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
