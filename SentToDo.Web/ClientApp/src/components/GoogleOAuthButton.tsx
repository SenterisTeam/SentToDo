import Google from '../images/Google__G__Logo.svg';
import './GoogleOAuthButton.scss';


function GoogleOAuthButton(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div role={"button"} className="google-btn" style={{maxWidth: "192px"}} {...props}>
        <div className="google-icon-wrapper">
            <img className="google-icon-svg" src={Google}/>
        </div>
        <p className="btn-text"><b>Continue with Google</b></p>
    </div>
}

export default GoogleOAuthButton;