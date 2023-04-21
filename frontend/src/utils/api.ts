interface UrlParams {
	[key: string]: number | boolean | number
}

interface queryResult {
	size?: number,
	newComposers?: number,
	newPieces?: number,
	timestamp?: string
}

function buildQueryString(params: UrlParams = {}) {
	let queryParams = new URLSearchParams();
	Object.keys(params).forEach((key) => {
		queryParams.append(key, params[key].toString());
	});
	return queryParams.toString();
}

export async function queryAPI(endpoint: string, params?: {}): Promise<queryResult> {
	const url = "https://brahms-crud.onrender.com";
	return fetch(`${url}/api/${endpoint}?${buildQueryString(params)}`)
		.then(res => res.json())
}
