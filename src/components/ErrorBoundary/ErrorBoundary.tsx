import React, { useState, useEffect } from "react";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Uncaught error:", event.error);
      setHasError(true);
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      setHasError(true);
    };


    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler);
    };
  }, []);

  if (hasError) {
    return <ErrorPage />;
  }

  return <>{children}</>;
};

export default ErrorBoundary;


