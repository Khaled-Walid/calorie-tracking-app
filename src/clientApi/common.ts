async function fetchCommon(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }
  return response;
}

export async function fetchApi<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetchCommon(input, init);
  const json = await response.json();
  return json as T;
}

export async function fetchApiNoResponse(input: RequestInfo, init?: RequestInit): Promise<void> {
  await fetchCommon(input, init);
}
