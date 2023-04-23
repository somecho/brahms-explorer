import { Params } from "../types/Params";
/**
 * Creates a query string which can be appended to a URL
 * @param {UrlParams} params An object of keys and value to be turned into a query string
 * @return {String} the resulting query string
 */
export function buildQueryString(params: Params ): string {
	let queryParams = new URLSearchParams();
	Object.keys(params).forEach((key) => {
		queryParams.append(key, params[key].toString());
	});
	return queryParams.toString();
}

export async function queryAPI<T>(endpoint: string, params: Params = {}): Promise<T> {
	const url = "https://brahms-crud.onrender.com";
	return fetch(`${url}/api/${endpoint}?${buildQueryString(params)}`)
		.then(res => res.json())
}
