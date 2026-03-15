import { spriteSymbols } from "../generated/spriteSymbols";

export const iconSprite = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      dangerouslySetInnerHTML={{
        __html: spriteSymbols,
      }}
    />
  );
};