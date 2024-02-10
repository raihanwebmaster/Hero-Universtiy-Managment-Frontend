/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Button, Col, Flex } from 'antd';
import { toast } from 'sonner';
import { TResponse } from '../../../types';
import { useAddCourseMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import UNForm from '../../../components/form/UNForm';
import UNInput from '../../../components/form/UNInput';
import UNSelect from '../../../components/form/UNSelect';

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
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
    <Flex justify="center" align="center">
      <Col span={6}>
        <UNForm onSubmit={onSubmit}>
          <UNInput type="text" name="title" label="Title" />
          <UNInput type="text" name="prefix" label="Prefix" />
          <UNInput type="text" name="code" label="Code" />
          <UNInput type="text" name="credits" label="Credits" />
          <UNSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="preRequisiteCourses"
          />
          <Button htmlType="submit">Submit</Button>
        </UNForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;