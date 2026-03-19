import { BiErrorCircle } from "react-icons/bi";

const ErrorMsg = ({ error }) => {
  // Handle different error formats
  const errorMessage =
    error?.data?.message ||
    error?.message ||
    error?.error ||
    "An unexpected error occurred";

  // Only log if it's a valid error object
  if (error && typeof error === "object") {
    console.error("Error:", errorMessage, error);
  }

  return (
    <div className="text-gray-100 h-full flex flex-col gap-2 justify-center items-center">
      {errorMessage !== "An unexpected error occurred" ? (
        <p className="text-gray-400">{errorMessage}</p>
      ) : (
        <>
          <BiErrorCircle className="text-red-500 text-3xl" />
          <h1 className="text-lg">An error has occured</h1>
        </>
      )}
    </div>
  );
};

export default ErrorMsg;
