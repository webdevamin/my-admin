import Seo from "./Seo";

const Layout = ({ children }) => {
    return (
        <div className="w-10/12 lg:w-10/12 mx-auto py-12">
            <Seo />
            <div className="max-w-xl mx-auto">{children}</div>
        </div>
    );
}

export default Layout;