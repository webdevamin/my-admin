import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlertError = ({ description, classes }) => {
    return (
        <div className={`flex items-center gap-5 rounded-xl p-5 mb-8 
        shadow error bg-rose-200 ${classes}`}>
            <FontAwesomeIcon icon={`fa-solid fa-triangle-exclamation bg-rose-200`}
                className={`error_icon`} />
            <p className={`error_icon`} role="alert">
                {description}
            </p>
        </div>
    );
};

export default AlertError;
