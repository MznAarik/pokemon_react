import { Rings } from "react-loader-spinner";

export const loaders = () => {
    return (
        <Rings
            visible={true}
            height="100"
            width="100"
            color="cyan"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}