function SuccessToast({ show, message }) {
  return (
    <div
      className={
        "fixed inset-0 flex items-center justify-center " +
        "bg-black bg-opacity-30 transition-opacity duration-300 " +
        (show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
      }
    >
      <div
        className={
          "bg-green-500 text-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center transform transition-transform duration-300 " +
          (show ? "scale-100" : "scale-75")
        }
      >
        <h3 className="text-lg font-bold mb-2">Successo!</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}
export default SuccessToast;