<template>
  <div class="example-container">
    <h2>Typing Effect with Interval and Humanize</h2>
    <div class="typing-box">
      <HangulTyping
        text="안녕하세요.\n 시간 간격과 사람이 입력하는 듯한 효과를 적용한 예제입니다."
        :intervalType="100"
        :humanize="0.5"
      />
    </div>
  </div>
</template>

<script lang="ts">
import HangulTyping from "../../src/HangulTyping.vue";

export default {
  components: {
    HangulTyping,
  },
};
</script>
