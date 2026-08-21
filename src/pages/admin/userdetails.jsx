import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getuserdetails,
  updateUserStatus,
} from "../../redux/features/adminslice";
import { toast } from "react-toastify";
import NavBar from "../../components/navbar";
import { FcPrevious } from "react-icons/fc";
import Default from "../../assets/profile.avif";

function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res = await dispatch(getuserdetails(id)).unwrap();
        setUser(res);
      } catch (err) {
        toast.error(err?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [dispatch, id]);

  const handleStatusChange = async () => {
    setUpdating(true);
    try {
      const res = await dispatch(
        updateUserStatus({
          id,
          active: !user.active,
        }),
      ).unwrap();

      setUser(res);
      toast.success(res.active ? "User activated" : "User deactivated");
    } catch (err) {
      toast.error(err?.message || "Failed to update user status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black bg-gray-100 dark:text-white">
        <div className="animate-pulse text-sm text-gray-500 dark:text-gray-400">
          Loading user details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black bg-gray-100 dark:text-white text-black">
      <NavBar />

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/admin")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
            aria-label="Back to admin"
          >
            <FcPrevious className="size-6" />
          </button>
          <h1 className="text-2xl font-semibold">User Details</h1>
        </div>

        {!user ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 text-center text-gray-500 dark:text-gray-400">
            User not found.
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center text-center">
            <img
              src={user.profile || Default}
              alt={user.name}
              className="size-24 rounded-full object-cover ring-2 ring-indigo-500/30 mb-4"
            />

            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>

            {/* Status badge */}
            <span
              className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                user.active
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  user.active ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {user.active ? "Active" : "Inactive"}
            </span>

            {/* Info list */}
            <div className="w-full mt-6 divide-y divide-gray-200 dark:divide-gray-800 text-left">
              <div className="flex justify-between py-2.5">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Role
                </span>
                <span className="text-sm capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between py-2.5 gap-4">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 shrink-0">
                  Bio
                </span>
                <span className="text-sm text-right">
                  {user.bio || "—"}
                </span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleStatusChange}
              disabled={updating}
              type="button"
              className={`mt-6 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                user.active
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {updating
                ? "Updating..."
                : user.active
                ? "Deactivate User"
                : "Activate User"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
