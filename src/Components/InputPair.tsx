import React, { FC, memo } from 'react';
import styled from 'styled-components';

interface InputPairProps {
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => Promise<void>;
  placeholder?: string;
  buttonText?: string;
}

const Container = styled.div`
  margin: 20px;
  text-align: center;
  display: flex;
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
  ({ value, onChange, onSubmit, placeholder, buttonText = 'Submit' }) => {
    return (
      <Container>
        <StyledInput
          type="text"
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
        />
        <StyledButton onClick={onSubmit}>{buttonText}</StyledButton>
      </Container>
    );
  }
);

export default InputPair;
