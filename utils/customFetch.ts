import { TOKEN_KEY } from "./constants";

interface IFetchProps {
  url: string;
  methodType?: string;
  headers?: Record<string, string>;
  body?: any;
}

export const customFetch = async (props: IFetchProps) => {
  const storedToken = localStorage.getItem(TOKEN_KEY);

  try {
    const response = await fetch(props.url, {
      method: props.methodType || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: storedToken ? `Bearer ${storedToken}` : "",
        ...props.headers,
      },
      body: props.body ? JSON.stringify(props.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text(); // or handle other content types
    }
  } catch (error) {
    console.error("Error while making API call:", error);
    return { error: "Something went wrong" };
  }
};
