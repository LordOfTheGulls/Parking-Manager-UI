import { createReducer, on } from "@ngrx/store";
import { APPError } from "../actions/app.actions";

export interface AppState {};

const initialState: AppState = {
    
};

export const AppReducer = createReducer(
    initialState,
    on(APPError, (state: AppState, action) => (
       { ...state }
    ))
)