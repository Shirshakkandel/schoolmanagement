import styled from 'styled-components'

export const SButton = styled.button`
  padding: ${(p) => (p.p ? `${p.p}px` : '10px')};
  cursor: pointer;
  /* min-width: 80px; */
  width: ${(p) => (p.size ? `${p.size}px` : '')};
  font-weight: 600;
  outline: none;
  margin-top: 10px;
  margin-right: 5px;

  background: #4e6daf;
  background: ${(p) =>
    p.red
      ? '#c52020'
      : p.blue
      ? '#1919c0'
      : p.yellow
      ? '#adad1b'
      : p.green && '#06a306'};
  color: #ebdfdf;

  :focus {
    outline: none;
  }
  :hover {
    opacity: 0.9;
  }
  border-radius: 0.25rem;
  /* border: 1px solid black; */

  .heading {
    flex: 0.99;
  }

  @media (max-width: 786px) {
    width: ${(p) => p.responsive && `100%`};
  }
`
