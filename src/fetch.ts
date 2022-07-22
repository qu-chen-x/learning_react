type FetchWrapper = (
  input: string,
  init?: RequestInit | undefined
) => Promise<Response>;

const apiURL = process.env.REACT_APP_API_URL as string;
const isCompleteUrl = (url: string) => /^(http)|(https):\/\//.test(url);

const fetchWrapper: FetchWrapper = async function fetchWrapper(input, init) {
  const url = isCompleteUrl(input)
    ? input
    : `${apiURL}/${input.replace(/^\//, "")}`;
  const response = await fetch(url, init);
  if (response.ok) {
    return response;
  }
  return Promise.reject(response);
};

export default fetchWrapper;
export type { FetchWrapper };
