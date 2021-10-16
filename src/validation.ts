import { IIndexable } from './interfaces';
import { REQUIRED_PARAMS } from './constants';

export const validateParams = (params: unknown): void => {
  for (const key of REQUIRED_PARAMS) {
    if (
      (params as IIndexable)[key] === undefined ||
      (params as IIndexable)[key] === null
    ) {
      throw new Error(`${key} must be provided when initializing!`);
    }
  }
};
