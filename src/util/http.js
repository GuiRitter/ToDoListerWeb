export const getUrlWithSearchParams = (url, params) => {
	const urlSearchParams = (new URLSearchParams(params)).toString();
	if (urlSearchParams){
		return `${url}?${urlSearchParams}`;
	}
	return url;
};
