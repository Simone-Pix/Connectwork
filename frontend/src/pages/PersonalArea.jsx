import { useAuthContext } from "../Contexts/AuthContext"

function PersonalArea() {
  const { user } = useAuthContext();

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">

        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Area personale
        </h1>

        {!user ? (
          <p className="text-gray-600">Nessun utente loggato.</p>
        ) : (
          <div className="space-y-4">

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg">
                <span className="font-semibold text-blue-900">ID: </span>
                {user.id}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg">
                <span className="font-semibold text-blue-900">Email: </span>
                {user.email}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg">
                <span className="font-semibold text-blue-900">Ruolo: </span>
                {user.role}
              </p>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}

export default PersonalArea;
