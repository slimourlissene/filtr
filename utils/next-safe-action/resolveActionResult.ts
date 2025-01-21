import { SafeActionResult } from "next-safe-action";
import { z } from "zod";
import { isActionSuccessful } from "./isActionSuccessful";

/**
 * Convert an action result to a promise that resolves to the parsed data
 *
 * @param action Return value of a server action
 * @returns A promise that resolves to parsed data
 */
export const resolveActionResult = async <
  T extends z.ZodType<any, z.ZodTypeDef, any>
>(
  action: Promise<
    SafeActionResult<string, z.infer<T>, readonly [], any, any> | undefined
  >
): Promise<z.infer<T>> => {
  return new Promise((resolve, reject) => {
    action
      .then((result) => {
        if (isActionSuccessful(result)) {
          resolve(result.data);
        } else {
          reject(result?.serverError ?? "Something went wrong");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
