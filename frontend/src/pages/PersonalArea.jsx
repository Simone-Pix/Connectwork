import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export default function PersonalArea() {
  const { user, isAuthenticated, loading } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [emailValue, setEmailValue] = useState(user?.email || "");

  if (loading) {
    return (
      <div className="hero">
        <div className="heroContent text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="hero">
        <div className="heroContent text-white text-center">
          <h1 className="text-3xl font-bold mb-4">Not Logged In</h1>
          <p className="text-gray-300">Please login to access your personal area.</p>
        </div>
      </div>
    );
  }

  // Rotta update per email non ancora settata placeholder per mail
  const handleSaveEmail = async () => {
    try {
      console.log("Email salvata →", emailValue);

      // qui dovrai inserire la fetch reale:
      // await fetch("/api/users/update-email", { ... })

      setIsEditing(false);
    } catch (e) {
      console.error("Errore salvataggio email:", e);
    }
  };

  return (
    <main className="hero">
      <div className="heroContent">
        <div className="configurator text-black">
          <h2 className="section-title">Personal Area</h2>
          <p className="section-subtitle">Manage your profile information</p>

          <div className="wrapper-1-step">

            {/* --- ID --- */}
            <div className="mb-6">
              <label className="block text-orange-500 mb-2 font-semibold">
                User ID
              </label>
              <input
                type="text"
                value={user.id}
                disabled
                className="input-step2 bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* --- ROLE --- */}
            <div className="mb-6">
              <label className="block text-orange-500 mb-2 font-semibold">
                Role
              </label>
              <input
                type="text"
                value={user.role}
                disabled
                className="input-step2 bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* --- EMAIL (modificabile) --- */}
            <div className="mb-6">
              <label className="block text-orange-500 mb-2 font-semibold">
                Email
              </label>

              <div className="flex items-center gap-4">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  disabled={!isEditing}
                  className={`
                    input-step2 
                    ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}
                  `}
                />

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                  >
                    Change
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveEmail}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEmailValue(user.email);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
