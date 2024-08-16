// hangulHelper.ts

import { type Cho, type Jung, type Jong, CHO, JUNG, JONG } from "@/HangulTypes";
// 초성, 중성, 종성 배열 선언

const HANGUL_OFFSET = 0xac00;

function _isCho(char: string): char is Cho {
  return CHO.includes(char as Cho);
}

function _isJung(char: string): char is Jung {
  return JUNG.includes(char as Jung);
}

function _isJong(char: string): char is Jong {
  return JONG.includes(char as Jong);
}

function _isHangul(c: number): boolean {
  return 0xac00 <= c && c <= 0xd7a3;
}

// Disassemble Function
function disassembleHangul(string: string): string[] {
  if (string === null) {
    throw new Error("Arguments cannot be null");
  }

  const result: string[] = [];
  const length = string.length;

  for (let i = 0; i < length; i++) {
    const char = string[i];

    // 백스페이스 처리
    if (char === "\\" && i < length - 1 && string[i + 1] === "b") {
      result.push("\b");
      i++; // Skip the 'b' character
    }
    // 줄바꿈 처리
    else if (char === "\\" && i < length - 1 && string[i + 1] === "n") {
      result.push("\n");
      i++; // Skip the 'n' character
    } else {
      let code = char.charCodeAt(0);

      if (_isHangul(code)) {
        code -= HANGUL_OFFSET;

        const jongIndex = code % 28;
        const jungIndex = Math.floor((code - jongIndex) / 28) % 21;
        const choIndex = Math.floor((code - jongIndex) / 28 / 21);

        const cho = CHO[choIndex];
        const jung = JUNG[jungIndex];
        const jong = jongIndex === 0 ? "" : JONG[jongIndex];

        result.push(cho);

        // 중성 처리
        result.push(jung);

        // 종성 처리
        if (jong) {
          result.push(jong);
        }
      } else {
        result.push(char); // 한글이 아닌 경우 그대로 추가
      }
    }
  }

  return result;
}

function assembleHangul(disassembled: string[]): string {
  let result = "";
  let cho: Cho | undefined;
  let jung: Jung | undefined;
  let jong: Jong | undefined;

  for (let i = 0; i < disassembled.length; i++) {
    const char = disassembled[i];

    if (char === "\b") {
      // 백스페이스 문자를 만나면 마지막 한글 글자를 삭제
      if (result.length > 0) {
        const lastChar = result[result.length - 1];
        if (_isHangul(lastChar.charCodeAt(0))) {
          result = result.slice(0, -1);
        } else {
          result = result.slice(0, -1);
        }
      }
      [cho, jung, jong] = [undefined, undefined, undefined];
    } else if (_isCho(char)) {
      if (cho && jung) {
        if (jong) {
          result += combineHangul(cho, jung, jong);

          [cho, jung, jong] = [char, undefined, undefined];
        } else {
          if (i + 1 < disassembled.length && _isJung(disassembled[i + 1])) {
            result += combineHangul(cho, jung);

            [cho, jung] = [char, undefined];
          } else {
            jong = char as Jong;
          }
        }
      } else {
        cho = char;
      }
    } else if (_isJung(char)) {
      if (jung) {
        result += combineHangul(cho, jung, jong);

        [cho, jung, jong] = [undefined, char, undefined];
      } else {
        jung = char;
      }
    } else if (_isJong(char)) {
      if (jung) {
        if (jong) {
          result += combineHangul(cho, jung, jong);

          [cho, jung, jong] = [undefined, undefined, char];
        } else {
          jong = char;
        }
      } else {
        result += combineHangul(cho, jung, jong);

        [cho, jung, jong] = [char as Cho, undefined, undefined];
      }
    } else {
      result += combineHangul(cho, jung, jong);
      result += char;

      [cho, jung, jong] = [undefined, undefined, undefined];
    }
  }

  if (cho || jung || jong) {
    result += combineHangul(cho, jung, jong);
  }

  return result;
}

// Combine Hangul function to create a complete Hangul character
function combineHangul(cho?: Cho, jung?: Jung, jong?: Jong): string {
  if (!cho || !jung) {
    return cho ?? jung ?? "";
  }

  const choIndex = CHO.indexOf(cho);
  const jungIndex = JUNG.indexOf(jung);
  const jongIndex = jong ? JONG.indexOf(jong) : 0;

  if (choIndex === -1 || jungIndex === -1 || (jong && jongIndex === -1)) {
    return cho + jung + (jong ?? "");
  }

  const code = HANGUL_OFFSET + (choIndex * 21 + jungIndex) * 28 + jongIndex;
  return String.fromCharCode(code);
}

export { disassembleHangul, assembleHangul };
