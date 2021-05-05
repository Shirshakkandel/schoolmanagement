import styled from 'styled-components/macro'

export const TableStyle = styled.table`
  border-spacing: 0;
  width: 100%;
  table-layout: ${(p) => (p.width <= 1024 ? 'fixed' : '')};
  border: 1px solid #644040;

  th,
  td {
    text-align: left;
    border: 1.5px solid #332d2d;
    padding: ${(p) => (p.width <= 786 ? '10px' : '8px')};
    width: ${(p) => (p.width <= 786 ? '150px' : '100px')};
  }

  tr:first {
    width: '50px';
  }

  tr:nth-child(even) {
    background-color: #e9dddd;
  }

  .smallsize {
    width: ${(p) => (p.width <= 786 ? '80px' : '')};
  }
  .mediumSize {
    width: ${(p) => (p.width <= 786 ? '150px' : '')};
  }
  .bigSize {
    width: ${(p) => (p.width <= 786 ? '230px' : '')};
  }
`
