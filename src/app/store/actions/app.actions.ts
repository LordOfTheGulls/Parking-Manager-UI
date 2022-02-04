import { createAction, props } from "@ngrx/store";

import { AppError } from "@models/error/app-error";

export const APPInit  = createAction('App Init');

export const APPError = createAction(
    'App Error', props<{ error: AppError }>()
);