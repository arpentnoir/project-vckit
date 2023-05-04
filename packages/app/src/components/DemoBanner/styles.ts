export const CSSRules = [
  `
  .banner {
      display: flex;
      @media (max-width: 1000px) {
          display: none;
      }
  }`,
  `
  .banner::before,
  .banner::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  `
 ];
