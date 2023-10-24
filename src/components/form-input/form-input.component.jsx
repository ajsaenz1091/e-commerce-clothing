import { Group, FromInputLabel, Input } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <fromInputLabel
          shrink={otherProps.value.length}
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </fromInputLabel>
      )}
    </Group>
  );
};

export default FormInput;