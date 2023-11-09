import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import PageNotFound from "../components/errors/404";
import Unauthorized from "../components/errors/401";
import ServerNotAvailable from "../components/errors/500";
import AdminPage from "../components/admin/Admin";
import RequireAuth from "../components/RequireAuth";
import UserList from "../components/admin/users/UserList";
import UserCreate from "../components/admin/users/UserCreate";
import PersistLogin from "../components/PersistLogin";
import UserProfile from "../components/admin/users/UserProfile";
import CompanyList from "../components/admin/company/CompanyList";
import CompanyCreate from "../components/admin/company/CompanyCreate";
import BranchList from "../components/admin/branch/BranchList";
import BranchCreate from "../components/admin/branch/BranchCreate";
import UserRoles from "../components/admin/users/UserRoles";
import RolesList from "../components/admin/roles/RolesList";
import RolesCreate from "../components/admin/roles/RolesCreate";
import Dashboard from "../components/admin/Dashboard";
import Setting from "../components/admin/Setting";
import InvoiceNotFound from "../components/errors/600";
import ProtectedRoute from "../components/ProtectedRoute";
import ActivityLog from "../components/systemAdmin/ActivityLog";
import ProfileList from "../components/admin/profile/ProfileList";
import ProfileCreate from "../components/admin/profile/ProfileCreate";
import UserChangePassword from "../components/admin/users/UserChangePassword";
import SysProtectedRoute from "../components/systemAdmin/SysProtectedRoute";
import SysAdmin from "../components/systemAdmin/SysAdmin";
import SysAdminLogin from "../components/systemAdmin/SysAdminLogin";
import AccountReceivableImport from "../components/admin/accountReceivable/AccountReceivableImport";
import AccountReceivableList from "../components/admin/accountReceivable/AccountReceivableList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="500" element={<ServerNotAvailable />} />
      <Route path="401" element={<Unauthorized />} />
      <Route path="600" element={<InvoiceNotFound />} />
      <Route path="login" element={<Login />} />
      <Route path="sys_login" element={<SysAdminLogin />} />
      <Route element={<SysProtectedRoute />}>
        <Route path="system_admin" element={<SysAdmin />}>
          <Route path="activity_log" element={<ActivityLog />} />
          <Route path="profile">
            <Route path="list" element={<ProfileList />} />
            <Route path="create" element={<ProfileCreate />} />
            <Route path=":id" element={<ProfileCreate />} />
          </Route>
          <Route path="company">
            <Route path="list" element={<CompanyList />} />
            <Route path="create" element={<CompanyCreate />} />
            <Route path=":id" element={<CompanyCreate />} />
          </Route>
          <Route path="branch">
            <Route path="list" element={<BranchList />} />
            <Route path="create" element={<BranchCreate />} />
            <Route path=":id" element={<BranchCreate />} />
          </Route>
        </Route>
      </Route>
      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<AdminPage />}>
            <Route path="account_receivable">
              <Route element={<RequireAuth allowedPermission="account-receivable-import" />}>
                <Route path="import" element={<AccountReceivableImport />} />
              </Route>
              <Route element={<RequireAuth allowedPermission="account-receivable-list" />}>
                <Route path="list" element={<AccountReceivableList />} />
              </Route>
            </Route>
            <Route
              path="change_password/:id"
              element={<UserChangePassword />}
            />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="setting" element={<Setting />} />
            <Route path="user">
              <Route element={<RequireAuth allowedPermission="user-list" />}>
                <Route path="list" element={<UserList />} />
              </Route>
              <Route element={<RequireAuth allowedPermission="user-create" />}>
                <Route path="create" element={<UserCreate />} />
              </Route>
              <Route element={<RequireAuth allowedPermission="user-update" />}>
                <Route path=":id" element={<UserCreate />} />
              </Route>
              <Route element={<RequireAuth allowedPermission="user-profile" />}>
                <Route path="profile/:id" element={<UserProfile />} />
              </Route>
              <Route element={<RequireAuth allowedPermission="user-roles" />}>
                <Route path="roles/:id" element={<UserRoles />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedPermission="role-list" />}>
              <Route path="roleslist" element={<RolesList />} />
            </Route>
            <Route element={<RequireAuth allowedPermission="role-create" />}>
              <Route path="rolecreate" element={<RolesCreate />} />
            </Route>
            <Route element={<RequireAuth allowedPermission="role-update" />}>
              <Route path="role/:id" element={<RolesCreate />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
