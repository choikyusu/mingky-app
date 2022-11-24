import styled from 'styled-components';

/* eslint-disable react/no-danger */
export function Event(props: { modalStatus: { id: any; data: any } }) {
  const { modalStatus } = props;
  return (
    <>
      <header className="dialog-header">
        <div
          dangerouslySetInnerHTML={{
            __html: modalStatus.data.event.name,
          }}
        />
      </header>
      <div className="dialog-body">
        <Wrapper>
          <div className="reset-content">
            <div
              dangerouslySetInnerHTML={{
                __html: modalStatus.data.event.description,
              }}
            />
          </div>
        </Wrapper>
      </div>
    </>
  );
}

const Wrapper = styled.div`
  padding: 16px 24px;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  min-height: 500px;

  .se-image {
    text-align: center;
    .se-image-resource {
      width: 70%;
    }
  }

  .se-text-paragraph {
    white-space: break-spaces;
  }

  .se-text-paragraph-align-center {
    text-align: center !important;
  }

  .se-component-content {
    .se-section-align-center {
      margin-right: auto;
      margin-left: auto;
    }
  }

  .se-sticker {
    text-align: center;
  }

  .se-oembed {
    text-align: center;
  }

  .se-section-oglink {
    width: 100%;
    max-width: 450px;

    .se-oglink-thumbnail {
      overflow: hidden;
      max-height: 450px;
      border: 1px solid rgba(0, 0, 0, 0.1);

      .se-oglink-thumbnail-resource {
        max-height: 450px;
        width: 100%;
        height: auto;
        vertical-align: top;
      }
    }
    .se-module-oglink {
      display: block;
      position: relative;
      width: 100%;
      background-color: #fff;
      text-decoration: none;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 8%);
      cursor: pointer;

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        content: '';
      }

      .se-oglink-info {
        padding: 21px 26px 18px;
        position: relative;
        display: block;
        line-height: 1.4;
        text-align: left;
        box-sizing: border-box;
        font-size: 0;
        outline: 1px solid rgba(0, 0, 0, 0.1);

        .se-oglink-info-container {
          display: inline-block;
          max-width: 100%;
          vertical-align: middle;

          .se-oglink-title {
            white-space: nowrap;
            word-wrap: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: block;
            line-height: 15px;
            font-weight: 700;
            font-size: 13px;
            color: #333;
            font-size: 15px;
          }
          .se-oglink-summary {
            margin-top: 7px;
            font-size: 13px;
            max-height: 34px;
            white-space: nowrap;
            word-wrap: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            line-height: 18px;
            color: #999;
          }
          .se-oglink-url {
            white-space: nowrap;
            word-wrap: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            margin-top: 5px;
            line-height: 15px;
            font-size: 13px;
            color: #00a832;
            text-decoration: none;
            margin-top: 9px;
          }
        }
      }
    }
  }
`;
