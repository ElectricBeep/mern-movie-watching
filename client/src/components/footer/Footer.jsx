import "./footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerWrapper">

                <div className="footerTop">
                    Questions? Contact us.
                </div>
                <div className="footerBot">
                    <div className="footerBotItems">
                        <p>FAQ</p>
                        <p>Investor Relations</p>
                        <p>Privacy</p>
                        <p>Speed Test</p>
                    </div>
                    <div className="footerBotItems">
                        <p>Help Center</p>
                        <p>Jobs</p>
                        <p>Cookie Preferences</p>
                        <p>Legal Notices</p>
                    </div>
                    <div className="footerBotItems">
                        <p>Account</p>
                        <p>Ways to Watch</p>
                        <p>Corporate Information</p>
                        <p>Only on MovieWatching</p>
                    </div>
                    <div className="footerBotItems">
                        <p>Media Center</p>
                        <p>Terms of Use</p>
                        <p>Contact us</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer