import style from './Button.module.css';
import styled from 'styled-components';

const StyledButton = styled.button`
        background-color:${props => props.displayColor};
        color:#fff;
        &:hover{
            background-color:${props => props.displayColorHover}
        }
`;

const Button = ({title,color,...props}) => {

    const setColorButton = (color,hover = false) => {
        let displayColor;
        switch (color) {
            case 'primary':
                displayColor = !hover ? '#1976d2' : 'rgb(17, 82, 147)';
                break;
            case 'secondary':
                displayColor = !hover ? 'rgb(220, 0, 78)' : 'rgb(154, 0, 54)';
                break;
            default:
                break;
        }
        return displayColor;
    }

    return <StyledButton 
        className={`${style.button} ${style.root}`}
        displayColor={setColorButton(color)}
        displayColorHover={setColorButton(color,true)}
        {...props}>
        {title}
    </StyledButton>;
}

export default Button;