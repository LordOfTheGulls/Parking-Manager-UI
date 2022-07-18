import { Paging } from "../paging/paging";
import { Sorting } from "../sorting/sorting";

export interface FilterDto {
    paging: Paging;
    sorting?: Sorting[] | null;
}