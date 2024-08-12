<template>
  <div class="example-container">
    <h2>Typing Effect with Repeat</h2>
    <div class="typing-box">
      <HangulTyping
        text="안녕하세요.\n 반복을 지원하는 예제입니다."
        :intervalType="80"
        :repeat="true"
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
