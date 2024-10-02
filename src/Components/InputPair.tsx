import React, { FC, memo } from 'react';
import styled from 'styled-components';

interface InputPairProps {
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  buttonText?: string;
  width?: string; // Add width prop
}

const Container = styled.div<{ width?: string }>`
  margin: 20px;
  text-align: center;
  display: flex;
  width: ${(props) => props.width || 'auto'}; // Apply width prop
`;

const StyledInput = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  border: none;
`;

const StyledButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
`;

const InputPair: FC<InputPairProps> = memo(
  ({
    value,
    onChange,
    onSubmit,
    placeholder,
    buttonText = 'Submit',
    width,
  }) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && onSubmit) {
        onSubmit(event);
      }
    };

    return (
      <Container width={width}>
        <StyledInput
          type="text"
          value={value ?? ''}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
        />
        <StyledButton onClick={onSubmit}>{buttonText}</StyledButton>
      </Container>
    );
  }
);

export default InputPair;
