import { describe, it, expect } from "vitest";
import { assembleHangul, disassembleHangul } from "@/hangulHelper";

describe("disassembleHangul", () => {
  it("한글 한 음절 분해", () => {
    const input = "가";
    const expectedOutput: string[] = ["ㄱ", "ㅏ"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("한글 두 음절 분해", () => {
    const input = "간다";
    const expectedOutput: string[] = ["ㄱ", "ㅏ", "ㄴ", "ㄷ", "ㅏ"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("한글과 영어가 섞인 문자열 분해", () => {
    const input = "가a";
    const expectedOutput: string[] = ["ㄱ", "ㅏ", "a"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("영어 문자열 분해", () => {
    const input = "abc";
    const expectedOutput: string[] = ["a", "b", "c"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("숫자 문자열 분해", () => {
    const input = "123";
    const expectedOutput: string[] = ["1", "2", "3"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("한글 종성이 있는 음절 분해", () => {
    const input = "닭";
    const expectedOutput: string[] = ["ㄷ", "ㅏ", "ㄺ"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("한글 복합 종성이 있는 음절 분해", () => {
    const input = "값";
    const expectedOutput: string[] = ["ㄱ", "ㅏ", "ㅄ"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("백스페이스 처리", () => {
    const input = "가\\b다";
    const expectedOutput: string[] = ["ㄱ", "ㅏ", "\b", "ㄷ", "ㅏ"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("복합 자모가 포함된 한글 분해", () => {
    const input = "괜찮다";
    const expectedOutput: string[] = [
      "ㄱ",
      "ㅙ",
      "ㄴ",
      "ㅊ",
      "ㅏ",
      "ㄶ",
      "ㄷ",
      "ㅏ",
    ];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("한글과 숫자가 섞인 문자열 분해", () => {
    const input = "가1다2";
    const expectedOutput: string[] = ["ㄱ", "ㅏ", "1", "ㄷ", "ㅏ", "2"];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });

  it("한글과 공백이 섞인 문자열 분해", () => {
    const input = "가 나 다";
    const expectedOutput: string[] = [
      "ㄱ",
      "ㅏ",
      " ",
      "ㄴ",
      "ㅏ",
      " ",
      "ㄷ",
      "ㅏ",
    ];
    const result = disassembleHangul(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe("assembleHangul", () => {
  it("초성만 있는 상태에서 백스페이스 입력", () => {
    const disassembled: string[] = ["ㄱ", "\b"];
    const result = assembleHangul(disassembled);
    expect(result).toBe(""); // "ㄱ"이 삭제되어 빈 문자열이 되어야 합니다.
  });

  it("중성만 있는 상태에서 백스페이스 입력", () => {
    const disassembled: string[] = ["ㅏ", "\b"];
    const result = assembleHangul(disassembled);
    expect(result).toBe(""); // "ㅏ"이 삭제되어 빈 문자열이 되어야 합니다.
  });

  it("종성만 있는 상태에서 백스페이스 입력", () => {
    const disassembled: string[] = ["ㄱ", "ㅏ", "ㄴ", "\b"];
    const result = assembleHangul(disassembled);
    expect(result).toBe(""); // "ㄴ"이 삭제되어 빈 문자열이 되어야 합니다.
  });

  it("한글과 영어/숫자가 섞인 상태에서 백스페이스 입력", () => {
    const disassembled: string[] = ["ㄱ", "ㅏ", "ㄴ", "a", "1", "\b"];
    const result = assembleHangul(disassembled);
    expect(result).toBe("간a"); // "1"이 삭제되어 "간a"가 되어야 합니다.
  });

  it("연속적인 백스페이스 입력", () => {
    const disassembled: string[] = ["ㄱ", "ㅏ", "ㄴ", "\b"];
    const result = assembleHangul(disassembled);
    expect(result).toBe(""); // "ㄱ", "ㅏ"가 모두 삭제되어 빈 문자열이 되어야 합니다.
  });

  it("초성+중성+종성 조합 후 연속 백스페이스 입력", () => {
    const disassembled: string[] = ["ㄱ", "ㅏ", "ㄴ", "\b"];
    const result = assembleHangul(disassembled);
    expect(result).toBe(""); // 모든 조합이 삭제되어 빈 문자열이 되어야 합니다.
  });

  it("한글 조합 + 백스페이스 + 새로 조합", () => {
    const disassembled: string[] = ["ㄱ", "ㅏ", "ㄴ", "\b", "ㄱ", "ㅏ"];
    const result = assembleHangul(disassembled);
    expect(result).toBe("가"); // "간" 삭제 후 "가"가 되어야 합니다.
  });

  it("백스페이스가 없는 경우 조합 테스트", () => {
    const disassembled: string[] = ["ㄱ", "ㅏ", "ㄴ", "ㄱ", "ㅏ"];
    const result = assembleHangul(disassembled);
    expect(result).toBe("간가"); // 조합이 모두 진행되어 "간가"가 되어야 합니다.
  });

  it("연속적으로 백스페이스가 아닌 문자 추가", () => {
    const disassembled: string[] = ["ㄱ", "ㅏ", "ㄴ", "ㄱ", "ㅏ", "a"];
    const result = assembleHangul(disassembled);
    expect(result).toBe("간가a"); // 조합 후 "간가a"가 되어야 합니다.
  });

  it("연속적으로 백스페이스로 전체 삭제 후 문자 추가", () => {
    const disassembled: string[] = [
      "ㄱ",
      "ㅏ",
      "ㄴ",
      "ㄱ",
      "ㅏ",
      "\b",
      "\b",
      "a",
    ];
    const result = assembleHangul(disassembled);
    expect(result).toBe("a"); // 모두 삭제 후 "a"가 되어야 합니다.
  });
});
