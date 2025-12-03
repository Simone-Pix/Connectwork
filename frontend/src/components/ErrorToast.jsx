function ErrorToast({ show, message }) {
  return (
    <div
      className={
        "fixed top-20 right-6 z-50 transition-opacity duration-300 " +
        (show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
      }
    >
      <div
        className={
          "bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm w-80 flex items-start gap-3 transform transition-transform duration-300 " +
          (show ? "translate-y-0" : "-translate-y-4")
        }
      >
        <div className="flex-1">
          <h3 className="text-md font-bold">Errore</h3>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorToast;
