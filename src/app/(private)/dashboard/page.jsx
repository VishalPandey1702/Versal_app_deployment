"use client";

import AdministrationDrawer from "@/app/Components/AdministrationDrawer";
import { useSession } from "next-auth/react";

export default function Page() {
  const dashboardArray = [
    { role: "STUDENT", drawer: ["Dashboard", "Feedback", "RaiseAIssue"] },
    { role: "WARDEN", drawer: ["Dashboard", "AddStudents", "View Issues"] },
    { role: "DSW", drawer: ["Dashboard"] },
    { role: "SYSADMIN", drawer: ["Dashboard", "SysAdminView"] },
    { role: "PARENT", drawer: ["Dashboard"] },
  ];
  const { data } = useSession();
  return (
    <>
      {data.user.role &&
        dashboardArray.map(
          (element, index) =>
            data.user.role === element.role && (
              <AdministrationDrawer
                key={index}
                role={data.user.role}
                drawerValue={dashboardArray[index]["drawer"]}
              />
            )
        )}
    </>
  );
}
