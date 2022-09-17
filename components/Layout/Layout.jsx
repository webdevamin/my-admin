const Layout = ({ children }) => {
    return (
        <>
            <div className="py-8 w-10/12 lg:w-10/12 mx-auto max-w-xl relative">
                {children}
            </div>
        </>
    );
}

export default Layout;