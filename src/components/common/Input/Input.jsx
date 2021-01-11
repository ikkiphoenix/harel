import React from 'react';
import styled from 'styled-components';
import styles from './Input.module.css';

const InputStyled = styled.input`
    border-color:${props => props.error ? 'red' : ''};
    &:focus {
        border-color:${props => props.error ? 'red' : ''};
    }
`;

const Input = React.memo(({inputRef,error,...props}) => {

    return <div className={styles.container}>
        <InputStyled
        ref={inputRef}
        className={styles.container__input}
        error={error} 
        {...props}
        />
    </div>;
});

export default Input;