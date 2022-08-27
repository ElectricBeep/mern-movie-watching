import "./reports.css";

const Reports = ({ type }) => {
    return (
        <div className="reports">
            {type === "report" ? (
                <>
                    <div className="reportsTitle">Reports</div>
                    <div className="reportsText">
                        No reports to show right now.
                    </div>
                </>
            ) : (
                <>
                    <div className="reportsTitle">Messages</div>
                    <div className="reportsText">
                        No messages to show right now.
                    </div>
                </>
            )}
        </div>
    )
}

export default Reports