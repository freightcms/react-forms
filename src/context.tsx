import React, { ChangeEvent, ChangeEventHandler, createContext, FormEvent, PropsWithChildren, useContext, useState } from "react";

export interface FormContextType<T extends unknown = {}> {
  formValues: T;
  initialValues?: T|null
  onInputChanged: ChangeEventHandler
}

export const FormContext = createContext<FormContextType>({
  formValues: {},
  initialValues: {},
  onInputChanged: (_: ChangeEvent<HTMLInputElement>): void => {
    console.warn("On input changed context event handler not implemented")
  },
});

export interface FormContextProviderProps<T extends unknown> {
  initialValues?: T
  onSubmit?: (values: T) => void;
}

export const useFormContext = () => useContext(FormContext);

