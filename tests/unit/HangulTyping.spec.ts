import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import HangulTyping from "@/HangulTyping.vue";

const waitForTyping = async (
  text: string,
  interval: number,
  humanize: number
) => {
  const totalInterval = text.length * (interval + humanize) + 2000;
  await new Promise((resolve) => setTimeout(resolve, totalInterval));
};

describe("HangulTyping.vue", () => {
  it("renders props.text when passed", async () => {
    const text = "안녕하세요, 여기는 타이핑 효과 컴포넌트입니다.";
    const wrapper = mount(HangulTyping, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    // 텍스트 전체가 타이핑될 때까지 충분히 기다립니다.
    await waitForTyping(text, 50, 30);

    expect(wrapper.text()).toBe(text);
  }, 8000);

  it("pauses and resumes typing", async () => {
    const text = "타이핑 효과를 일시정지하고 다시 시작합니다.";
    const wrapper = mount(HangulTyping, {
      props: { text, intervalType: 50, humanize: 30, isPaused: false },
    });

    // 잠깐 타이핑한 후, 일시정지
    await new Promise((resolve) => setTimeout(resolve, 500));
    await wrapper.setProps({ isPaused: true });

    // 일시정지 후 1초 기다린 다음, 재개
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await wrapper.setProps({ isPaused: false });

    await waitForTyping(text, 50, 30);

    // 최종적으로 텍스트가 완성되는지 확인
    expect(wrapper.text()).toBe(text);
  }, 8000); // 타임아웃을 10초로 설정

  it("handles backspace character", async () => {
    const text = "이것은\b\b\b 백스페이스 효과";
    const wrapper = mount(HangulTyping, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    await waitForTyping(text, 50, 30);

    expect(wrapper.text()).toBe("백스페이스 효과");
  });

  it("hides cursor after typing ends", async () => {
    const text = "커서가 깜빡이다가 타이핑이 종료되면 사라집니다.";
    const wrapper = mount(HangulTyping, {
      props: { text, intervalType: 50, humanize: 30, showCursor: true },
    });

    await waitForTyping(text, 50, 30);

    await nextTick();

    const cursorElement = wrapper.find(".cursor");
    const cursorStyle = getComputedStyle(cursorElement.element);
    expect(cursorStyle.display).toBe("none");
  });

  it("handles newline character", async () => {
    const text = "첫 번째 줄입니다.\n두 번째 줄입니다.";
    const wrapper = mount(HangulTyping, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    await waitForTyping(text, 50, 30);

    // span 태그들을 가져옵니다.
    const spans = wrapper.findAll("span");

    // 첫 번째 span의 텍스트가 '첫 번째 줄입니다.'인지 확인합니다.
    expect(spans[0].text()).toBe("첫 번째 줄입니다.");

    // 두 번째 span의 텍스트가 '두 번째 줄입니다.'인지 확인합니다.
    expect(spans[1].text()).toBe("두 번째 줄입니다.");

    // 두 span 사이에 <br> 태그가 존재하는지 확인합니다.
    const brTag = wrapper.find("br");
    expect(brTag.exists()).toBe(true);

    // <br> 태그가 정확히 첫 번째 span과 두 번째 span 사이에 있는지 확인합니다.
    expect(brTag.element.nextElementSibling).toBe(spans[1].element);
  });

  it("keeps cursor after typing ends when cursorAfterTyping is true", async () => {
    const text = "커서가 타이핑 종료 후에도 유지됩니다.";
    const wrapper = mount(HangulTyping, {
      props: {
        text,
        intervalType: 50,
        humanize: 30,
        showCursor: true,
        cursorAfterTyping: true,
      },
    });

    await waitForTyping(text, 50, 30);

    const cursorElement = wrapper.find(".cursor");
    expect(cursorElement.exists()).toBe(true);
  });

  it("logs typing start and end events correctly", async () => {
    const text = "이 예제는 타이핑 이벤트 로그를 확인합니다.";
    const consoleLogMock = vi.spyOn(console, "log").mockImplementation(() => {
      // 의도적으로 비어 있는 함수입니다. (Mocking 목적)
    });

    mount(HangulTyping, {
      props: {
        text,
        intervalType: 50,
        humanize: 0, // 정확한 이벤트 순서 확인을 위해 humanize를 0으로 설정
        showCursor: true,
        onTypingStart: () => {
          console.log("타이핑 시작");
        },
        onTypingEnd: () => {
          console.log("타이핑 종료");
        },
      },
    });

    await waitForTyping(text, 50, 0);

    await nextTick();

    // 콘솔에 찍힌 로그 순서를 확인합니다.
    expect(consoleLogMock).toHaveBeenNthCalledWith(1, "타이핑 시작");
    expect(consoleLogMock).toHaveBeenNthCalledWith(2, "타이핑 종료");

    consoleLogMock.mockRestore(); // 모킹된 콘솔 로그를 원래 상태로 되돌립니다.
  });
});
