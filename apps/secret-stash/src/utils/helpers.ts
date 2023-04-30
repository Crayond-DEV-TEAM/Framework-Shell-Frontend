export function addQueryParamsToUrl(url: string, queryParams: Record<string, string>): string {
    const urlObject = new URL(url);

    Object.keys(queryParams).forEach((key) => {
        urlObject.searchParams.append(key, queryParams[key]);
    });

    return urlObject.toString();
}
