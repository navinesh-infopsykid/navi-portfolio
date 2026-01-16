import * as React from "react";

// Define a proper JSXElement type without using `any`
export type JSXElement = React.ReactElement<React.PropsWithChildren<unknown>>;
