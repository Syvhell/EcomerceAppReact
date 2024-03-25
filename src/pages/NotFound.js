import Error from "../components/Error";

export default function NotFound() {
  const data = {
    title: (
      <>
        404 - Not Found{" "}
        <span
          style={{
            backgroundColor: "red",
            padding: "5px",
            borderRadius: "50%",
          }}
        >
          <i
            className="fa fa-times"
            aria-hidden="true"
            style={{ color: "white" }}
          ></i>
        </span>
      </>
    ),
    description: "The page you are looking is not found",
    destination: "/",
    label: "Go Back",
  };
  return <Error data={data} />;
}
