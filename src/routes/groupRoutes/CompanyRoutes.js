import React from "react";
import CompanyList from "../../components/admin/company/CompanyList";
import CompanyCreate from "../../components/admin/company/CompanyCreate";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../../components/RequireAuth";

const CompanyRoutes = () => {
    return (
        <Routes path='company'>
            <Route element={<RequireAuth allowedPermission="company-list" />}>
                <Route path="list" element={<CompanyList />} />
            </Route>
            <Route element={<RequireAuth allowedPermission="company-create" />}>
                <Route path="create" element={<CompanyCreate />} />
            </Route>
            <Route element={<RequireAuth allowedPermission="company-update" />}>
                <Route path=":id" element={<CompanyCreate />} />
            </Route>
        </Routes>
    );
};

export default CompanyRoutes;
