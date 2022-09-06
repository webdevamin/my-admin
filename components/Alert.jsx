import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Alert = ({ description, iconClass, classes }) => {
    let icon;
    let bgColor;
    let color;

    switch (iconClass) {
        case 'error':
            icon = 'fa-triangle-exclamation bg-rose-200';
            bgColor = 'bg-rose-200';
            color = 'error_icon';
            break;
        case 'warning':
            icon = 'fa-triangle-exclamation bg-amber-100';
            bgColor = 'bg-amber-100';
            color = 'warning_icon';
        default:
            icon = 'fa-circle-check bg-green';
            bgColor = 'bg-green';
            color = 'success_icon';
    }

    return (
        <div className={`flex items-center gap-5 rounded-xl p-5 mb-8 shadow
         ${iconClass} ${classes} ${bgColor}`}>
            <FontAwesomeIcon icon={`fa-solid ${icon}`}
                className={color} />
            <p className={color} role="alert">
                {description}
            </p>
        </div>
    );
};

export default Alert;
