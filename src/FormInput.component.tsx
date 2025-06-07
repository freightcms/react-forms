import React, { useMemo } from "react";
import { useFormContext } from "./context";
import { mergeStyles } from "./styles";

export interface TextFormInputProps {
  label: {
    className?: string;
    text?: string;
    title?: string;
    id?: string;
    name?: string;
  },
  input: {
    prefixElement: React.ReactNode;
    posfixElement: React.ReactNode;
    required?: boolean;
    name: string;
    id: string;
  }
}

const TextFormInput = ({label, input}: TextFormInputProps) => {

  const {
    formValues = {},
    onInputChanged
  } = useFormContext();

  const inputStyle = useMemo(() => {
    return mergeStyles({}, {
      borderLeft: { [Boolean(input.prefixElement) as any]: "none" },
      borderRight: { [Boolean(input.posfixElement) as any]: "none" }
    });
  }, [input.prefixElement, input.posfixElement]);

  return (<>
    {label.text ? (<label role="label" htmlFor={input.id} className={label.className}>{label.text}</label>) : null}
    <div role="group" style={{display: "flex", flexDirection: "column" }}>
      <div role="group" style={{display: 'flex', flexDirection: 'row', flexGrow: 1}}>
        {input.prefixElement}
        <input type="text" value={formValues[input.name]} required={input.required} aria-required={input.required} onChange={onInputChanged} style={inputStyle}  />
        {input.posfixElement}
      </div>
      <span>Error Message Here</span>
    </div>
  </>);
}

export default TextFormInput;
