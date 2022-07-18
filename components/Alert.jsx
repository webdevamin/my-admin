import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Alert = ({ description, classname }) => {
    let icon;

    switch (classname) {
        case 'error':
            icon = 'fa-triangle-exclamation';
            break;
        case 'warning':
            icon = 'fa-triangle-exclamation';
        default:
            icon = 'fa-circle-check';
    }

    return (
        <div className={`alert ${classname}`}>
            <FontAwesomeIcon icon={`fa-solid ${icon}`}
                className={`alert_icon`} />
            <p className={`alert_text`} role="alert">
                {description}
            </p>
        </div>
    );
};

export default Alert;
