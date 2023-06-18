import { PatternFormat, InputAttributes } from "react-number-format";

export const InputPhone = (props: InputAttributes) => {
  return (
    <PatternFormat {...props} format="+7 (###) #### ###" mask="_" type="text" />
  );
};
