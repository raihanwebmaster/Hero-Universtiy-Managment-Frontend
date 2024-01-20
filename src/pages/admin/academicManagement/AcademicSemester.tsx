
import { useGetAllSemestersQuery } from '../../../redux/features/academicSemester/academicSemesterApi'

const AcademicSemester = () => {
  const {data} = useGetAllSemestersQuery(undefined)
  return (
    <div>AcademicSemester</div>
  )
}

export default AcademicSemester