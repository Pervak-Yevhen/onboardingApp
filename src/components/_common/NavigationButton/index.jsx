import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { AiOutlineLeft, AiOutlineRight  } from 'react-icons/ai'

import './index.css';

const NavigationButton = ({ right, text, onClick, size, disabled }) => {
    return (
        <button disabled={disabled} className={cn("NavigationButton", {
            "NavigationButton--disabled": disabled,
        })} onClick={onClick}>
            { right ? (<>{text}<AiOutlineRight size={size}/></>) : (<><AiOutlineLeft size={size}/>{text}</>)}
        </button>
    );
};

NavigationButton.defaultProps = {
    size: 25,
    right: false,
    disabled: false,
    text: '',
};

NavigationButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number,
    right: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.string,
};

export default NavigationButton;