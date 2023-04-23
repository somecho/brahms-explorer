import { Criteria } from "./Ordering";

export interface Params {
	[key: string]: string | boolean | number | Criteria
}


