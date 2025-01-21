import { SafeActionResult } from "next-safe-action";
import { z } from "zod";

/**
 * Determines if a server action is successful or not.
 * A server action is successful if it has a data property and no serverError property
 *
 * @param action Return value of a server action
 * @returns A boolean indicating if the action is successful
 */
export const isActionSuccessful = <T extends z.ZodType>(
  action?: SafeActionResult<string, T, readonly [], any, any>
): action is {
  data: T;
  serverError: undefined;
  validationError: undefined;
} => {
  if (!action) {
    return false;
  }

  if (action.serverError) {
    return false;
  }

  if (action.validationErrors) {
    return false;
  }

  return true;
};
