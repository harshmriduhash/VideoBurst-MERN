import { CLEAR_ERRORS } from "./types";

// Close errors popup
export const popErrors = decoded => {
  return {
    type: CLEAR_ERRORS
  };
};
