import FacuiltyDashboard from "../pages/faculty/FacuiltyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyStudents from "../pages/faculty/MyStudents";

export const facultyPaths = [
    {
        name: "Dashboard",
        path: 'dashboard',
        element: <FacuiltyDashboard/>
    },
    {
        name: "My Courses",
        path: "courses",
        element: <MyCourses/>
    },
    {
        path: "courses/:registerSemesterId/:courseId",
        element: <MyStudents/>
    }
]