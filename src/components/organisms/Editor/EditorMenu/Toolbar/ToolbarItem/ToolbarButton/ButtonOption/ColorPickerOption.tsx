import styled from 'styled-components';

const COLOR_LIST = [
  { rgb: 'rgb(153, 153, 153)', hex: '#999999' },
  { rgb: 'rgb(255, 205, 192)', hex: '#ffcdc0' },
  { rgb: 'rgb(255, 227, 200)', hex: '#ffe3c8' },
  { rgb: 'rgb(255, 248, 178)', hex: '#fff8b2' },
  { rgb: 'rgb(227, 253, 200)', hex: '#e3fdc8' },
  { rgb: 'rgb(194, 244, 219)', hex: '#c2f4db' },
  { rgb: 'rgb(189, 251, 250)', hex: '#bdfbfa' },
  { rgb: 'rgb(176, 241, 255)', hex: '#b0f1ff' },
  { rgb: 'rgb(155, 223, 255)', hex: '#9bdfff' },
  { rgb: 'rgb(253, 213, 245)', hex: '#fdd5f5' },
  { rgb: 'rgb(255, 183, 222)', hex: '#ffb7de' },
  { rgb: 'rgb(255, 255, 255)', hex: '#ffffff' },
  { rgb: 'rgb(119, 119, 119)', hex: '#777777' },
  { rgb: 'rgb(255, 173, 152)', hex: '#ffad98' },
  { rgb: 'rgb(255, 209, 164)', hex: '#ffd1a4' },
  { rgb: 'rgb(255, 245, 147)', hex: '#fff593' },
  { rgb: 'rgb(186, 223, 152)', hex: '#badf98' },
  { rgb: 'rgb(63, 204, 156)', hex: '#3fcc9c' },
  { rgb: 'rgb(21, 208, 202)', hex: '#15d0ca' },
  { rgb: 'rgb(40, 225, 255)', hex: '#28e1ff' },
  { rgb: 'rgb(91, 199, 255)', hex: '#5bc7ff' },
  { rgb: 'rgb(205, 139, 192)', hex: '#cd8bc0' },
  { rgb: 'rgb(255, 151, 193)', hex: '#ff97c1' },
  { rgb: 'rgb(247, 247, 247)', hex: '#f7f7f7' },
  { rgb: 'rgb(85, 85, 85)', hex: '#555555' },
  { rgb: 'rgb(255, 95, 69)', hex: '#ff5f45' },
  { rgb: 'rgb(255, 169, 79)', hex: '#ffa94f' },
  { rgb: 'rgb(255, 239, 52)', hex: '#ffef34' },
  { rgb: 'rgb(152, 211, 108)', hex: '#98d36c' },
  { rgb: 'rgb(0, 185, 118)', hex: '#00b976' },
  { rgb: 'rgb(0, 191, 181)', hex: '#00bfb5' },
  { rgb: 'rgb(0, 205, 255)', hex: '#00cdff' },
  { rgb: 'rgb(0, 149, 233)', hex: '#0095e9' },
  { rgb: 'rgb(188, 97, 171)', hex: '#bc61ab' },
  { rgb: 'rgb(255, 101, 168)', hex: '#ff65a8' },
  { rgb: 'rgb(226, 226, 226)', hex: '#e2e2e2' },
  { rgb: 'rgb(51, 51, 51)', hex: '#333333' },
  { rgb: 'rgb(255, 0, 16)', hex: '#ff0010' },
  { rgb: 'rgb(255, 147, 0)', hex: '#ff9300' },
  { rgb: 'rgb(255, 211, 0)', hex: '#ffd300' },
  { rgb: 'rgb(84, 184, 0)', hex: '#54b800' },
  { rgb: 'rgb(0, 168, 75)', hex: '#00a84b' },
  { rgb: 'rgb(0, 157, 145)', hex: '#009d91' },
  { rgb: 'rgb(0, 179, 242)', hex: '#00b3f2' },
  { rgb: 'rgb(0, 120, 203)', hex: '#0078cb' },
  { rgb: 'rgb(170, 31, 145)', hex: '#aa1f91' },
  { rgb: 'rgb(255, 0, 140)', hex: '#ff008c' },
  { rgb: 'rgb(194, 194, 194)', hex: '#c2c2c2' },
  { rgb: 'rgb(20, 20, 20)', hex: '#141414' },
  { rgb: 'rgb(186, 0, 0)', hex: '#ba0000' },
  { rgb: 'rgb(184, 92, 0)', hex: '#b85c00' },
  { rgb: 'rgb(172, 154, 0)', hex: '#ac9a00' },
  { rgb: 'rgb(54, 133, 30)', hex: '#36851e' },
  { rgb: 'rgb(0, 116, 51)', hex: '#007433' },
  { rgb: 'rgb(0, 117, 106)', hex: '#00756a' },
  { rgb: 'rgb(0, 122, 166)', hex: '#007aa6' },
  { rgb: 'rgb(0, 78, 130)', hex: '#004e82' },
  { rgb: 'rgb(116, 0, 96)', hex: '#740060' },
  { rgb: 'rgb(187, 0, 92)', hex: '#bb005c' },
  { rgb: 'rgb(156, 156, 156)', hex: '#9c9c9c' },
  { rgb: 'rgb(0, 0, 0)', hex: '#000000' },
  { rgb: 'rgb(112, 0, 1)', hex: '#700001' },
  { rgb: 'rgb(130, 63, 0)', hex: '#823f00' },
  { rgb: 'rgb(106, 95, 0)', hex: '#6a5f00' },
  { rgb: 'rgb(36, 91, 18)', hex: '#245b12' },
  { rgb: 'rgb(0, 78, 34)', hex: '#004e22' },
  { rgb: 'rgb(0, 85, 76)', hex: '#00554c' },
  { rgb: 'rgb(0, 78, 106)', hex: '#004e6a' },
  { rgb: 'rgb(0, 57, 96)', hex: '#003960' },
  { rgb: 'rgb(79, 0, 65)', hex: '#4f0041' },
  { rgb: 'rgb(131, 0, 65)', hex: '#830041' },
];

export const ColorPickerOption = (props: {
  name: string;
  bgColor: string;
  setIsOptionShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (type: string, value: string) => void;
}) => {
  const { name, bgColor, setIsOptionShow, onClick } = props;
  return (
    <Wrapper>
      <div className="se-color-swatches-preset">
        <ul
          onClick={e => {
            e.stopPropagation();
            const target = e.target as HTMLButtonElement;
            if (target.type === 'button') {
              if (setIsOptionShow) setIsOptionShow(false);
              const value = target.getAttribute('data-color');
              if (value) onClick(name, value);
            }
          }}
          className="se-color-swatches-list"
        >
          <li className="se-color-swatches-item">
            <button
              type="button"
              className="se-color-palette se-color-palette-no-color"
              data-color=""
              title="색상 없음"
            />
          </li>
          {COLOR_LIST.map(color => {
            return (
              <li className="se-color-swatches-item">
                <button
                  type="button"
                  className={`se-color-palette ${
                    bgColor.toUpperCase() === color.hex.toUpperCase()
                      ? 'se-is-selected'
                      : ''
                  }`}
                  data-color={color.hex}
                  title={color.hex}
                  style={{ backgroundColor: color.rgb }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: -121px;
  top: 29px;
  z-index: 100;
  border: 1px solid #c9c9c9;
  background-color: #fff;

  .se-color-swatches-preset {
    padding: 10px 8px;
    border-top: 1px solid hsla(0, 0%, 79%, 0.3);

    .se-color-swatches-list {
      display: flex;
      flex-wrap: wrap;
      width: 180px;
      margin-left: -1px;
      .se-color-swatches-item {
        position: relative;
        display: flex;

        .se-color-palette-no-color {
          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 13px;
            height: 13px;
            border: 1px solid #ccc;
            border-width: 0 1px 1px 0;
            box-shadow: inset 1px 1px 0 0 #ccc;
          }

          overflow: visible;
          position: relative;
          background: linear-gradient(
              -45deg,
              #fff 48%,
              #ff001e 0,
              #ff001e 52%,
              #fff 0
            )
            no-repeat;
          background-size: 100% 100%;
        }

        .se-color-palette {
          width: 15px;
          height: 15px;
          border: 1px solid #fff;
          border-width: 1px 0 0 1px;

          &:hover:after {
            display: block;
          }

          &.se-is-selected:after {
            display: block;
          }

          &:after {
            content: '';
            display: none;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 12px;
            height: 12px;
            border: 2px solid #444;
          }
        }
      }
    }
  }
`;
