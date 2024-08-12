# Hangul Typing Component

![Codecov](https://codecov.io/gh/dvlpDana/vue-hangul-typing/branch/main/graph/badge.svg)


https://github.com/user-attachments/assets/31338d1b-fcae-4be1-996a-9043d6d2a3f4


한글 자음 모음 결합에 타이핑 효과를 제공하는 Vue.js 컴포넌트로, 커스터마이징 가능한 타이핑 속도, 사람처럼 보이는 타이핑 간격, 텍스트 추가, 애니메이션 반복, 사용자 정의 스타일 및 클래스를 지원합니다.

## 특징

- 커스터마이징 가능한 타이핑 속도 및 간격
- 사람처럼 보이는 타이핑 효과
- 애니메이션 반복
- 사용자 정의 스타일 및 클래스 적용
- 백스페이스 및 줄바꿈("\b", "\n") 지원
- 타이핑 종료 후 커서 유지 옵션

## 설치

컴포넌트를 설치하려면 npm을 사용할 수 있습니다.

```bash
npm install hangul-typing
```


## Props

|Prop|Type|Default|Description|
|---|---|---|---|
|text|String|null|표시할 텍스트입니다. 제공되지 않으면 지정된 선택기의 텍스트를 사용합니다.|
|intervalType|Number|120|각 문자를 타이핑하는 간격입니다.
|humanize|Number⎪Function|null|간격을 랜덤화하여 사람처럼 보이도록 합니다. Number가 제공되면 0부터 해당 숫자 사이의 랜덤 값을 간격에 추가합니다. Function이 제공되면 기본 간격을 인수로 받고 새로운 간격을 반환해야 합니다.
|selector|String|null|텍스트 내용을 사용할 요소를 선택하는 CSS 선택기입니다.
|customClass|String|""|타이핑 요소에 적용할 사용자 정의 클래스입니다.
|customStyle|Object|{}|타이핑 요소에 적용할 사용자 정의 스타일입니다.
|showCursor|Boolean|false|타이핑 동안 커서를 표시할지 여부를 설정합니다.
|cursorAfterTyping|Boolean|false|타이핑 종료 후 커서를 유지할지 여부를 설정합니다.
|repeat|Boolean|false|타이핑 애니메이션을 반복할지 여부를 설정합니다.

## Events
이 컴포넌트는 타이핑 상태와 관련된 몇 가지 이벤트를 제공합니다. 이 이벤트들은 컴포넌트 외부에서 타이핑 과정에 반응하기 위해 사용할 수 있습니다.

|Events|Description|
|---|---|
|typing-start| 타이핑이 시작될 때 발생합니다.|
|typing-end| 타이핑이 완료될 때 발생합니다.|

이벤트는 다음과 같이 사용할 수 있습니다.

```vue
<template>
  <div class="example-container">
    <h2>Typing Effect with Time Tracking</h2>
    <div class="typing-box">
      <HangulTyping
        text="이 예제는 타이핑 소요 시간을 계산합니다."
        :showCursor="true"
        @typing-end="handleTypingEnd"
        @typing-start="handleTypingStart"
      />
    </div>
    <p class="computed-time" v-if="typingCompleted">
      타이핑 완료: {{ typingTime }}초 소요되었습니다!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HangulTyping from "@/HangulTyping.vue";

const typingCompleted = ref(false);
const typingTime = ref(0);
let startTime = 0;

const handleTypingStart = () => {
  console.log("타이핑 시작됨"); // 디버깅을 위한 로그 출력
  startTime = Date.now();
  typingCompleted.value = false;
};

const handleTypingEnd = () => {
  console.log("타이핑 종료됨"); // 디버깅을 위한 로그 출력
  if (startTime === 0) {
    console.error("타이핑이 시작되지 않았습니다.");
    return;
  }

  const endTime = Date.now();
  typingTime.value = parseFloat(((endTime - startTime) / 1000).toFixed(2));
  typingCompleted.value = true;
  startTime = 0; // reset
};
</script>
```


## Usage

프로젝트에서 컴포넌트를 import하여 사용합니다.

#### 기본 사용법
```vue
<template>
  <div class="example-container">
    <h2>Basic Typing Effect</h2>
    <div class="typing-box">
      <HangulTyping
        text="안녕하세요.\n기본 예제입니다."
      />
    </div>
  </div>
</template>
```

#### 타이핑 효과 중간에 일시정지 및 재개
```vue
<template>
  <div class="example-container">
    <h2>Typing Effect with Pause and Resume</h2>
    <div class="typing-box">
      <HangulTyping
        ref="HangulTyping"
        text="타이핑 효과를 일시정지하고 다시 시작합니다."
        :intervalType="50"
        :humanize="20"
        :showCursor="true"
      />
    </div>
    <div class="button-group">
      <button @click="pauseTyping">Pause</button>
      <button @click="resumeTyping">Resume</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HangulTyping from "@/HangulTyping.vue";

const pauseTyping = () => {
  HangulTyping.value.pauseTyping();
};

const resumeTyping = () => {
  HangulTyping.value.resumeTyping();
};

</script>
```

#### 컴포넌트 외부의 특정 요소에서 텍스트를 선택하여 타이핑 효과를 적용
```vue
<template>
  <div class="example-container">
    <h2>Typing Effect with Selector</h2>
    <div class="source-text" id="source-text">
      이 텍스트는 외부 요소에서 가져와 타이핑 됩니다.
    </div>
    <div class="typing-box">
      <HangulTyping
        selector="#source-text"
        :intervalType="100"
        :showCursor="true"
        :cursorAfterTyping="true"
      />
    </div>
  </div>
</template>
```

## Contributing

이 프로젝트에 기여하고 싶다면, GitHub 저장소에서 issue나 pull request를 제출해주세요.

## License

This project is licensed under the MIT License.
