import Seo from "./Seo";

const Layout = ({ children }) => {
    return (
        <>
            <Seo />
            <div className="w-10/12 lg:w-10/12 mx-auto py-8 max-w-xl">
                {children}
            </div>
        </>
    );
}

export default Layout;