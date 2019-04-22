import { StringEditor } from "./propEditor/string";
import React from "react";

export enum TYPE {
  string = 'string',
  boolean = 'boolean',
  enum = 'enum'
}

export interface editorsType {
  [index: string]: any;
  string: React.FunctionComponent<any> | React.Component<any,any>;
}

export const editors: editorsType = {
  "string": StringEditor
};