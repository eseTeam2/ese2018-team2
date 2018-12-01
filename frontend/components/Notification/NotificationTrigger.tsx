import {ReactNode} from "react";

interface NotificationTriggerProps {
    action: (e) => void;
    children: ReactNode;
}

const NotificationTigger: React.SFC<NotificationTriggerProps> = ({action, children}) => (
    <React.Fragment>
        {children}
    </React.Fragment>

);

export default NotificationTigger;