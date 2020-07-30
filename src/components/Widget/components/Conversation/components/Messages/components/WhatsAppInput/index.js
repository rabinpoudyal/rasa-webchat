import React, { useState, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    addUserMessage,
    emitUserMessage,
    setButtons,
    toggleInputDisabled,
    changeInputFieldHint,
} from 'actions';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './styles.scss';

const WhatsAppInput = props => {
    // window.WebChat.toggleInputDisabled();
    //this.props.changeInputFieldHint('Please enter in the box!!');
    const [value, setValue] = useState('');
    const [buttonDisabled, toggleDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('');

    const sendPhoneNumber = (e, value) => {
        if (value.length > 9 && value.length < 15) {
            e.preventDefault();
            console.log(value);
            setButtonText(buttonText => 'Sent!!');
            window.WebChat.send('/enter_data' + JSON.stringify({ whatsapp_id: value }));
            toggleDisabled(buttonDisabled => true);
        } else {
            setButtonText(buttonText => 'Phone Number is not correct. Enter again');
        }
    };
    return (
        <div className="center-whatsapp-container">
            <div className="opt-in-status">{buttonText}</div>
            <PhoneInput
                disabled={buttonDisabled}
                className="whatsapp-input"
                placeholder="Enter WhatsApp number"
                value={value}
                onChange={setValue}
            />
            <button onClick={e => sendPhoneNumber(e, value)} className="whatsapp-button">
                Send
            </button>
        </div>
    );
};

const mapStateToProps = state => ({
    inputState: state.behavior.get('disabledInput'),
});

const mapDispatchToProps = dispatch => ({
    toggleInputDisabled: () => dispatch(toggleInputDisabled()),
    changeInputFieldHint: val => dispatch(changeInputFieldHint(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WhatsAppInput);
