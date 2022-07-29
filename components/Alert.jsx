import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Alert = ({ description, iconClass, classes }) => {
    let icon;

    switch (iconClass) {
        case 'error':
            icon = 'fa-triangle-exclamation';
            break;
        case 'warning':
            icon = 'fa-triangle-exclamation';
        default:
            icon = 'fa-circle-check';
    }

    return (
        <div className={`alert ${iconClass} ${classes}`}>
            <FontAwesomeIcon icon={`fa-solid ${icon}`}
                className={`alert_icon`} />
            <p className={`alert_text`} role="alert">
                {description}
            </p>
        </div>
    );
};

export default Alert;
