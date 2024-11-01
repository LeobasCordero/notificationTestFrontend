import React from 'react';

interface SendButtonProps {
    onClick: () => void;
    disabled: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled} className='send-button'>
            Send
        </button>
    );
};

export default SendButton;
