import { Criteria } from "./Ordering";

export interface Button {
	text: string,
	field: Criteria
}


export const sortButtons: Button[] = [
	{ text: "Title", field: "title" },
	{ text: "Subtitle", field: "subtitle" },
	{ text: "Composer first name", field: "firstName" },
	{ text: "Composer last name", field: "lastName" },
	{ text: "Year", field: "year" },
];

export const orderButtons: Button[] = [
	{ text: "asc", field: "true" },
	{ text: "desc", field: "false" },
];


