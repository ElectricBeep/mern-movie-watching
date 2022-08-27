import "./sidebar.css";
import {
    LineStyle,
    PermIdentity,
    ChatBubbleOutline,
    Report,
    PlayCircleFilledOutlined,
    FormatListBulleted
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/movies" className="link">
                            <li className="sidebarListItem">
                                <PlayCircleFilledOutlined className="sidebarIcon" />
                                Movies/Series
                            </li>
                        </Link>
                        <Link to="/lists" className="link">
                            <li className="sidebarListItem">
                                <FormatListBulleted className="sidebarIcon" />
                                Lists
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <Link to="/messages" className="link">
                            <li className="sidebarListItem">
                                <ChatBubbleOutline className="sidebarIcon" />
                                Messages
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <Link to="/reports" className="link">
                            <li className="sidebarListItem">
                                <Report className="sidebarIcon" />
                                Reports
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
