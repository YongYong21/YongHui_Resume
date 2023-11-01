/** @jsxImportSource @emotion/react */
import { forwardRef, RefObject } from "react";
import { css } from "@emotion/react";

const loadingContainer = css`
  width: 100%;
  height: 100vh;

  overflow: hidden;
`;
const loadingTextList = css`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  font-size: 108px;
  font-weight: 700;

  white-space: nowrap;
`;
const loadingText = (textContent: string, delayTime: number) => css`
  white-space: nowrap;
  margin: 0;
  position: fixed;
  color: transparent;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::before {
    content: "${textContent}";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    overflow: hidden;

    background: linear-gradient(to left, #a2bef6 0%, #ffb8ec 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    border-image: linear-gradient(to left, #a2bef6 0%, #ffb8ec 100%);
    border-image-slice: 1;
    border-bottom: 3px solid transparent;

    animation: typing 2s ${delayTime}s steps(32) forwards;
  }
  @keyframes typing {
    0% {
      width: 0%;
      border-right: none;
    }
    1% {
      border-right: 2px solid #b1b4bd;
    }
    50% {
      width: 100%;
    }
    60% {
      width: 100%;
    }
    99% {
      border-right: 2px solid #b1b4bd;
    }
    100% {
      width: 0%;
      border-right: none;
    }
  }
`;

const LoadingCS = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} css={loadingContainer}>
      <div css={loadingTextList}>
        <span css={loadingText("Front End", 0)}> Front End</span>
        <span css={loadingText("My Page", 2)}> My Page</span>
        <span css={loadingText("By ParkYonghui", 4)}> By ParkYonghui</span>
      </div>
    </div>
  );
});

export default LoadingCS;
