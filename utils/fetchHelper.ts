interface IFetchProps {
  url: string;
  methodType?: string;
  headers?: any;
  body?: any;
}
export const customFetch = async (props: IFetchProps) => {
  const storedToken = localStorage.getItem("token");
  // const storedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MDI5MTI4MDUsImV4cCI6MTcwMjkxNjQwNX0.McrtjdK2aAjSC5vj8zcipa3yvNKXYt99wimVtE";

  try {
    const response = await fetch(props.url, {
      method: props.methodType || "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: storedToken as string,
        ...props.headers,
      },
    });
    //   const data = await response.json();
    return response.json();
  } catch (e) {
    console.log("error while making api call ");
  }
};
