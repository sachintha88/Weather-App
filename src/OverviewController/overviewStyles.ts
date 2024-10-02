import styled, { css } from 'styled-components';
import { GlassBox } from './StyledComponents';

const fullFlexStyles = css`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  ${fullFlexStyles}
`;

export const ColumnContainer = styled.div`
  ${fullFlexStyles}
  flex-direction: column;
`;

export const FlexContainer = styled.div`
  ${fullFlexStyles}
`;

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const MarginTopContainer = styled.div<{ marginTop: string }>`
  display: flex;
  margin-top: ${(props) => props.marginTop};
`;

export const GlassBoxStyledStretch = styled(GlassBox)<{
  minWidth?: string;
  flex?: string;
}>`
  min-width: ${(props) => props.minWidth || 'auto'};
  width: 100%;
  flex: ${(props) => props.flex || 'auto'};
`;

export const GlassBoxStyled = styled(GlassBox)<{
  minWidth?: string;
  flex?: string;
}>`
  min-width: ${(props) => props.minWidth || 'auto'};
  flex: ${(props) => props.flex || 'auto'};
`;

export const SidePaneContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;
