import { CSSProperties } from "react";

export type ToggleCssPropertyType = {
  [key in keyof CSSProperties]: object;
};

/**
 * Merges CSS Styles from the base style and the combined styles if the condition meets true
 */
export const mergeStyles = (
  base: Partial<CSSProperties>,
  additional: ToggleCssPropertyType,
): CSSProperties => {
  const result = Object.keys(additional).reduce((acc, styleKey) => {
    const enabledValue: string | number | Function = additional[styleKey][true];
    if (typeof enabledValue === "function") {
      acc[styleKey] = enabledValue();
    }
    if (typeof enabledValue === "string" || typeof enabledValue === "number") {
      acc[styleKey] = enabledValue;
    }
    if (enabledValue) {
      console.warn(
        "Unknown type for toggling styles with type",
        typeof enabledValue,
        "and value",
        enabledValue,
      );
    }
    return acc;
  }, base);
  return result;
};
