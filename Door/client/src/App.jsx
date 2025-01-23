import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// layouts
import DefaultLayout from "./layouts/Default";
// import HorizontalLayout from "./layouts/Horizontal";
import "@mdi/font/css/materialdesignicons.min.css";
import AdminOffices from "./Pages/AdminDashboard/AdminOffices";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import ManagerLogin from "./Pages/ManagerLogin";
import AdminVerticalLayout from "./layouts/AdminVertical";
import ManagerVerticalLayout from "./layouts/ManagerVertical";
import ManagerProtectedRoute from "./utils/ManagerProtectedRoute";
import ManagerDashboard from "./Pages/ManagerDashboard/ManagerDashboard";
import Register from "./Pages/Register";
import Teams from "./Pages/ManagerDashboard/Teams";
import Task from "./Pages/ManagerDashboard/Task";
import AdminManager from "./Pages/AdminDashboard/AdminManager";
import AdminReport from "./Pages/AdminDashboard/AdminReport";
import ManagerRole from "./Pages/ManagerDashboard/ManagerRole";
import ManagerReport from "./Pages/ManagerDashboard/ManagerReport";
import TeamLeaderVerticalLayout from "./layouts/TeamLeaderVertical";
import TeamLeaderDashboard from "./Pages/Teamleader/TeamLeaderDashboard";
import TeamLeaderProtectedRoute from "./utils/TeamLeaderProtectedRoute";
import TeamLeaderReport from "./Pages/Teamleader/TeamleaderReport";
import TeamLeaderTeam from "./Pages/Teamleader/TeamLeaderTeam";
import TeamLeaderTask from "./Pages/Teamleader/TeamleaderTask";
import TeamMemberProtectedRoute from "./utils/TeamMemberProtectedRoute";
import TeamMemberVerticalLayout from "./layouts/TeamMemberVertical";
import TeamMemberReport from "./Pages/TeamMember/TeamMemberReport";
import TeamMemberTask from "./Pages/TeamMember/TeamMemberTask";
import TeamMemberDashboard from "./Pages/TeamMember/TeamMemberDashoard";
import VerifyEmail from "./Pages/VerifyEmail";
import RefreshLayout from "./layouts/RefreshLayout";
import ManagePositions from "./Pages/ManagerDashboard/ManagePositions";
// Lazy load components
const Homepage = React.lazy(() => import("./Pages/Landing/Homepage"));
const Offices = React.lazy(() => import("./Pages/Landing/Offices"));
const Purchase = React.lazy(() => import("./Pages/Purchase"));
const Login = React.lazy(() => import("./Pages/Login"));
const AdminDashboard = React.lazy(() =>
  import("./Pages/AdminDashboard/AdminDashboard")
);

// Loading component for suspense fallback
const loading = () => <div className=""></div>;

const App = () => {
  return (
    <Routes>
      {/* Public routes with DefaultLayout */}
      <Route element={<DefaultLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={loading()}>
              <Homepage />
            </Suspense>
          }
        />
        <Route
          path="/verify-email"
          element={
            <Suspense fallback={loading()}>
              <VerifyEmail />
            </Suspense>
          }
        />
        <Route
          path="/offices"
          element={
            <Suspense fallback={loading()}>
              <Offices />
            </Suspense>
          }
        />
        <Route
          path="/Purchase"
          element={
            <Suspense fallback={loading()}>
              <Purchase />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={loading()}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={loading()}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/payment/success"
          element={
            <Suspense fallback={loading()}>
              <ManagerLogin />
            </Suspense>
          }
        />
      </Route>

      {/* Admin routes with VerticalLayout */}
      <Route element={<RefreshLayout />}>
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminVerticalLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <Suspense fallback={loading()}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route
              path="/admin-offices"
              element={
                <Suspense fallback={loading()}>
                  <AdminOffices />
                </Suspense>
              }
            />
            <Route
              path="/admin-manager"
              element={
                <Suspense fallback={loading()}>
                  <AdminManager />
                </Suspense>
              }
            />
            <Route
              path="/admin-report"
              element={
                <Suspense fallback={loading()}>
                  <AdminReport />
                </Suspense>
              }
            />
            <Route
              path="/admin-manager"
              element={
                <Suspense fallback={loading()}>
                  <AdminManager />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>

      <Route element={<RefreshLayout />}>
        <Route element={<ManagerProtectedRoute />}>
          <Route element={<ManagerVerticalLayout />}>
            <Route
              path="/manager/dashboard"
              element={
                <Suspense fallback={loading()}>
                  <ManagerDashboard />
                </Suspense>
              }
            />
            <Route
              path="/manager/teams"
              element={
                <Suspense fallback={loading()}>
                  <Teams />
                </Suspense>
              }
            />
            <Route
              path="/manager/task"
              element={
                <Suspense fallback={loading()}>
                  <Task />
                </Suspense>
              }
            />
            <Route
              path="/manager/role"
              element={
                <Suspense fallback={loading()}>
                  <ManagerRole />
                </Suspense>
              }
            />
            <Route
              path="/manager/report"
              element={
                <Suspense fallback={loading()}>
                  <ManagerReport />
                </Suspense>
              }
            />
            <Route
              path="/manager/position"
              element={
                <Suspense fallback={loading()}>
                  <ManagePositions />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>

      <Route element={<RefreshLayout />}>
        <Route element={<TeamLeaderProtectedRoute />}>
          <Route element={<TeamLeaderVerticalLayout />}>
            <Route
              path="/teamleader/dashboard"
              element={
                <Suspense fallback={loading()}>
                  <TeamLeaderDashboard />
                </Suspense>
              }
            />
            <Route
              path="/teamleader/team"
              element={
                <Suspense fallback={loading()}>
                  <TeamLeaderTeam />
                </Suspense>
              }
            />
            <Route
              path="/teamleader/task"
              element={
                <Suspense fallback={loading()}>
                  <TeamLeaderTask />
                </Suspense>
              }
            />
            <Route
              path="/teamleader/report"
              element={
                <Suspense fallback={loading()}>
                  <TeamLeaderReport />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route element={<RefreshLayout />}>
        <Route element={<TeamMemberProtectedRoute />}>
          <Route element={<TeamMemberVerticalLayout />}>
            <Route
              path="/teammember/dashboard"
              element={
                <Suspense fallback={loading()}>
                  <TeamMemberDashboard />
                </Suspense>
              }
            />
            <Route
              path="/teammember/task"
              element={
                <Suspense fallback={loading()}>
                  <TeamMemberTask />
                </Suspense>
              }
            />
            <Route
              path="/teammember/report"
              element={
                <Suspense fallback={loading()}>
                  <TeamMemberReport />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
