import React, { ChangeEvent, ChangeEventHandler, FormEvent, PropsWithChildren, useState } from "react";
import {FormContext, FormContextProviderProps} from "./context";

export interface FormProps<T extends unknown = {}> extends FormContextProviderProps<T> {
  /**
   * Class to apply to the form element
   */
  className?: string;
}

const Form = <T extends unknown>({children, className, initialValues, onSubmit,}: PropsWithChildren<FormProps<T>>) => {

  const [formValues, setFormValues] = useState<T>(initialValues ?? {} as T);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.(formValues);
  }

  const onInputChangedHandler: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev: any) => ({
      ...prev,
      [event.currentTarget.name]: event.currentTarget.value,
    }));
  }

  return (<FormContext.Provider value={{
    formValues: formValues as {}, // really weird casting required by typescript, I guess?
    initialValues,
    onInputChanged: onInputChangedHandler,
  }}>
    <form className={className} noValidate onSubmit={handleSubmit}>
      {children}
    </form>
  </FormContext.Provider>);

};

export default Form;
