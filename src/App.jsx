import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import FindJobs from "./pages/FindJobs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Role from "./pages/Role";
import VerifyOtp from "./pages/VerifyOtp";
import ErrorPage from "./pages/ErrorPage";
import StudentJobPost from "./pages/StudentJobPost";
import JobDetailsForm from "./pages/JobDetailsForm";
import UserDetailsForm from "./pages/UserDetailsForm";
import AddressForm from "./pages/AddressForm";
import EducationForm from "./pages/EducationForm";

import { setAuthToken } from "./apis/client";   // ✅ import karo
import ProtectedRoute from "./pages/ProtectedRoute";
import AppInitializer from "./components/AppInitializer";
import FindJobById from "./pages/FindJobById";
import Logout from "./pages/Logout";
import AdminLayout from "./layouts/AdminLayout";
import Jobrequests from "./pages/admin/Jobrequests";
import JobrequestById from "./pages/admin/JobrequestById";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DemoSchedules from "./pages/admin/DemoSchedules";
import PostDemoSchedules from "./pages/admin/PostDemoSchedules";
import DemoSchedulesById from "./pages/admin/DemoSchedulesById";
import TutorAssignments from "./pages/admin/TutorAssignments";
import TutorAssignmentById from "./pages/admin/TutorAssignmentById";
import GuestRoute from "./pages/GuestRoute";
import Users from "./pages/admin/Users";
import UserById from "./pages/admin/UserById";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ResendEmail from "./pages/ResendEmail";


const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
if (token) {
  setAuthToken(token);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestRoute>
        <Role />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/verifyOtp",
    element: (
      <GuestRoute>
        <VerifyOtp />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: (
      <GuestRoute>
        <ForgotPassword />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password",
    element: (
      <GuestRoute>
        <ResetPassword />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/resend-email",
    element: (
      <GuestRoute>
        <ResendEmail />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/create-student-profile",
    element: <StudentJobPost />,
    errorElement: <ErrorPage />,
    children: [
      { path: "job-post-form", element: <JobDetailsForm /> },
      { path: "user-details-form", element: <UserDetailsForm /> },
      { path: "address-form", element: <AddressForm /> },
      { path: "education-form", element: <EducationForm /> },
    ],
  },

  // ✅ App routes (Student/Teacher/Admin allowed)
  {
    path: "/app",
    element: <ProtectedRoute allowedRoles={["Student", "Teacher", "Admin"]} />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "courses", element: <Courses /> },
          { path: "profile/:id", element: <Profile /> },
          { path: "settings", element: <Settings /> },
          { path: "logout", element: <Logout /> },
          { path: "find-jobs", element: <FindJobs /> },
          { path: "find-jobs/:id", element: <FindJobById /> },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["Admin"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "requests", element: <Jobrequests /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "users", element: <Users /> },
          { path: "users/:User_Id", element: <UserById /> },
          { path: "request/:id", element: <JobrequestById /> },
          { path: "demoSchedules", element: <DemoSchedules /> },
          { path: "demoSchedules/:demoId", element: <DemoSchedulesById /> },
          { path: "postDemoSchedules", element: <PostDemoSchedules /> },
          { path: "tutorAssignments", element: <TutorAssignments /> },
          { path: "tutorAssignments/:id", element: <TutorAssignmentById /> },
        ],
      },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;