import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './styles.scss';

class SocialLogin extends PureComponent {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        if (window.FB) {
            window.FB.XFBML.parse(this._scope);
        }
    }

    getWebsiteUrl = () => {
        return window.location.href;
    }

    getArticleID = () => {
        try{
            let aid = window.trip101.draft_article_id;
            return aid;
        }catch{
            return 0;
        }
    }

        
    render() {
        const { app_id='123', page_id='123' } = this.props.message.facebook;
        const optin_for = this.props.message.facebook.optin_for[0];
        const article_id = this.getArticleID();
        const hash = `optin_for=${optin_for}+ref=${Math.random().toString(30).substr(2,28)}+aid=${article_id}`
                
        return (
            <div ref={(s) => this._scope = s} className="rw-replies">
                <div
                    className="fb-send-to-messenger"
                    messenger_app_id={app_id}
                    page_id={page_id}
                    data-ref={hash}
                    color="blue"
                    size="xlarge"
                >Loading...</div>
                <div>Type "menu" if you nneed help</div>
            </div>
        );
    }
}

SocialLogin.propTypes = {
    message: PROP_TYPES.CUSTOM_COMPONENT,
};

SocialLogin.defaultProps = {
    params: {},
};

export default SocialLogin;
