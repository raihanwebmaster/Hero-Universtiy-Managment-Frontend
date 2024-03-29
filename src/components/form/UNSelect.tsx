/** @format */

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TUNSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: 'multiple' | undefined;
};

const UNSelect = ({ label, name, options, disabled , mode}: TUNSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select mode={mode} style={{ width: "100%" }} {...field} options={options} disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UNSelect;
