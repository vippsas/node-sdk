/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

const defaultBackoffMsArray = [500, 1000, 2000, 5000] as const;

export const withRetries =
  <T extends any[], R>(fn: (...args: T) => Promise<R>, backoffMsArray: readonly number[] = defaultBackoffMsArray) =>
  async (...args: Parameters<typeof fn>) => {
    const maxRetries = backoffMsArray.length;
    let retryCount = 0;

    do {
      try {
        return await fn(...args);
      } catch (error) {
        const isLastAttempt = retryCount === backoffMsArray.length;
        if (isLastAttempt) {
          return Promise.reject(error);
        }
      }
      await new Promise((resolve) => {
        setTimeout(resolve, backoffMsArray[retryCount]);
      });
    } while (retryCount++ < maxRetries);

    return Promise.reject(
      new Error(
        `Internal error while retrying function ${fn.name}. retryCount: ${retryCount}, maxRetries: ${maxRetries}`,
      ),
    );
  };
