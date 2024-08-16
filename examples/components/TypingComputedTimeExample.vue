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

<script lang="ts">
import { ref } from "vue";
import HangulTyping from "../../src/HangulTyping.vue";

const typingCompleted = ref(false);
const typingTime = ref(0);
let startTime = 0;

const handleTypingStart = () => {
  console.log("타이핑 시작됨"); // 디버깅을 위한 로그 출력
  startTime = Date.now();
  typingCompleted.value = false;
};

const handleTypingEnd = () => {
  if (startTime === 0) {
    console.error("타이핑이 시작되지 않았습니다.");
    return;
  }

  const endTime = Date.now();
  typingTime.value = parseFloat(((endTime - startTime) / 1000).toFixed(2));
  typingCompleted.value = true;
  startTime = 0; // reset
};

export default {
  components: {
    HangulTyping,
  },
  setup() {
    return {
      typingCompleted,
      typingTime,
      handleTypingStart,
      handleTypingEnd,
    };
  },
};
</script>

<style scoped>
.computed-time {
  font-size: 1.2em;
  color: #007bff;
  text-align: center;
  margin-top: 20px;
}
</style>
