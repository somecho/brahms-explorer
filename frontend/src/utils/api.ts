import { getCookie } from "react-use-cookie";
import { Params } from "../types/Params";

/**
 * Formats an array of words to be sent via URL query string
 * @param {String[]} arr An array of words (Strings)
 * @return {String} The words formatted into a no-space comma separated string
 */
export function buildKeywordsQuery(arr: string[]): string {
	let query = "";
	for (let i = 0; i < arr.length; i++) {
		query += arr[i];
		if (i !== arr.length - 1) {
			query += ",";
		}
	}
	return query;
};

/**
 * Creates a query string which can be appended to a URL
 * @param {UrlParams} params An object of keys and value to be turned into a query string
 * @return {String} the resulting query string
 */
export function buildQueryString(params: Params): string {
	let queryParams = new URLSearchParams();
	Object.keys(params).forEach((key) => {
		if (params[key]) {
			queryParams.append(key, params[key].toString());
		}
	});
	return queryParams.toString();
}

export function getUrl(): string {
	return import.meta.env.PROD ? import.meta.env.VITE_PROD_ENDPOINT : import.meta.env.VITE_DEV_ENDPOINT;
}

export async function queryAPI<T>(endpoint: string, params: Params = {}): Promise<T> {
	return fetch(`${getUrl()}/api/${endpoint}?${buildQueryString(params)}`)
		.then(res => res.json())
}

export async function checkIsAdmin() {
	const url = getUrl()
	return fetch(`${url}/api/isAdmin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ accessToken: getCookie("access_token") })
	})
}


export function deletePiece(id: number, onConfirm: () => void) {
	fetch(`${getUrl()}/api/piece/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ accessToken: getCookie("access_token") })
	}).then(_ => {
		onConfirm()
	})
}


