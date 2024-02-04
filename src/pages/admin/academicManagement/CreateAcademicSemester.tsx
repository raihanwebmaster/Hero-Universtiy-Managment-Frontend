/** @format */

import { FieldValues, SubmitHandler } from "react-hook-form";
import UNForm from "../../../components/form/UNForm";
import { Button, Col, Flex } from "antd";
import UNSelect from "../../../components/form/UNSelect";
import { semesterOptions } from "../../../constants/semster";
import { monthOptions, yearOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicSemester, TResponse } from "../../../types";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating..");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = await addAcademicSemester(semesterData) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res?.error?.data.message, {id: toastId})
      } else {
        toast.success("Semester  create succesfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went worng !!", { id: toastId });
    }
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UNForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <UNSelect label={"Name"} name={"name"} options={semesterOptions} />
          <UNSelect label={"Year"} name={"year"} options={yearOptions} />
          <UNSelect
            label={"Start Month"}
            name={"startMonth"}
            options={monthOptions}
          />
          <UNSelect
            label={"End Month"}
            name={"endMonth"}
            options={monthOptions}
          />
          <Button htmlType='submit'>Submit</Button>
        </UNForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
