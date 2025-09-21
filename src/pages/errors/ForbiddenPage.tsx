import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LocationState {
  from?: {
    pathname: string;
  };
  requiredPermissions?: string[];
}

const ForbiddenPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        {/* 403 Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t("errors.403.title", "Access Forbidden")}
        </h1>

        {/* Error Message */}
        <p className="text-gray-700 mb-6">
          {t(
            "errors.403.message",
            "You don't have the required permissions to access this page."
          )}
        </p>

        {/* Additional Info */}
        {state?.from?.pathname && (
          <p className="text-sm text-gray-500 mb-4">
            {t("errors.403.attempted", "Attempted to access:")}{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              {state.from.pathname}
            </code>
          </p>
        )}

        {/* Required Permissions */}
        {state?.requiredPermissions && state.requiredPermissions.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              {t("errors.403.requiredPermissions", "Required permissions:")}
            </p>
            <div className="text-xs text-gray-500">
              {state.requiredPermissions.map((permission) => (
                <span
                  key={permission}
                  className="inline-block bg-gray-100 px-2 py-1 rounded mr-1 mb-1"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {t("errors.403.goToDashboard", "Go to Dashboard")}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            {t("errors.403.goBack", "Go Back")}
          </button>
        </div>

        {/* Contact Support */}
        <p className="text-xs text-gray-500 mt-6">
          {t(
            "errors.403.contact",
            "If you believe this is an error, please contact your administrator."
          )}
        </p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
