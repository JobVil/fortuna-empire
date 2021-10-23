import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import React, { FC } from "react";

type EditableRowProps = {
  defaultValue: string | number;
  onChange: (nextValue: string) => void;
};

export const EditableRow: FC<EditableRowProps> = (props) => {
  return (
    <Editable
      defaultValue={String(props.defaultValue)}
      colorScheme={"purple"}
      onChange={props.onChange}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
};
