<template>
  <div class="example-container">
    <h2>Cursor Typing Effect</h2>
    <div class="typing-box">
      <HangulTyping
        text="안녕하세요.\n 커서가 계속 깜빡이는 예제입니다."
        :showCursor="true"
        :cursorAfterTyping="true"
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
