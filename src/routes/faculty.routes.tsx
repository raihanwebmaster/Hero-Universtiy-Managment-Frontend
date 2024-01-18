import FacuiltyDashboard from "../pages/faculty/FacuiltyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse";

export const facultyPaths = [
    {
        name: "Dashboard",
        path: 'dashboard',
        element: <FacuiltyDashboard/>
    },
    {
        name: "Offered Course",
        path: "offered-course",
        element: <OfferedCourse/>
    }
]