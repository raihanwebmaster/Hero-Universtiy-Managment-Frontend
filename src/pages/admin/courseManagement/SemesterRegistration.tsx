/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { FieldValues, SubmitHandler } from "react-hook-form";
import UNForm from "../../../components/form/UNForm";
import { Button, Col, Flex } from "antd";
import UNSelect from "../../../components/form/UNSelect";
import {semesterStatusOptions } from "../../../constants/semster";
import { useGetAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import UNDatePicker from "../../../components/form/UNDatePicker";
import UNInput from "../../../components/form/UNInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();

  const { data: academicSemester } = useGetAcademicSemestersQuery([
    { name: 'sort', value: 'year' },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Semester created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UNForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <UNSelect label="Academic Semester" name="academicSemester" options={academicSemesterOptions} />
          <UNSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <UNDatePicker name="startDate" label="Start Date" />
          <UNDatePicker name="endDate" label="End Date" />
          <UNInput type="text" name="minCredit" label="Min Credit" />
          <UNInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType='submit'>Submit</Button>
        </UNForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
