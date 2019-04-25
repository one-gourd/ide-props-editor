import { StringEditor } from "./propEditor/string";
import { EnumEditor } from "./propEditor/enum";
import { BooleanEditor } from "./propEditor/boolean";
import { IdEditor } from "./propEditor/id";
import { NumberEditor } from "./propEditor/number";
import React from "react";

export enum TYPE {
  string = 'string',
  boolean = 'boolean',
  enum = 'enum'
}

export interface editorsType {
  [index: string]: any;
  string: React.FunctionComponent<any> | React.Component<any,any>;
  enum: React.FunctionComponent<any> | React.Component<any,any>;
  boolean: React.FunctionComponent<any> | React.Component<any,any>;
  id: React.FunctionComponent<any> | React.Component<any,any>;
  number: React.FunctionComponent<any> | React.Component<any,any>;
}

export const editors: editorsType = {
  "string": StringEditor,
  "enum": EnumEditor,
  "boolean": BooleanEditor,
  "id": IdEditor,
  "number": NumberEditor
};