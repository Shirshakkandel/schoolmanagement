import styled from 'styled-components/macro'

export const TableStyle = styled.table`
  border-spacing: 0;
  width: 100%;
  table-layout: ${(p) => (p.width <= 1024 ? 'fixed' : '')};
  /* table-layout: 'fixed'; */
  border: ${(p) => (p.loading ? '' : '1px solid #644040')};
  margin-bottom: 12px;

  th,
  td {
    text-align: ${(p) => (p.loading ? 'center' : 'left')};
    border: ${(p) => (p.loading ? '0' : '1.5px solid #332d2d')};
    padding: ${(p) => (p.width <= 786 ? '10px' : '8px')};
    width: ${(p) => (p.width <= 786 ? '150px' : '')};
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
    width: 230px;
    /* width: 230px; */
  }

  .emailSize {
    width: ${(p) => (p.width <= 786 ? '300px' : '250px')};
  }
`
