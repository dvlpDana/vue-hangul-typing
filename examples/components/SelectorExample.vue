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

<script lang="ts">
import HangulTyping from "../../src/HangulTyping.vue";

export default {
  components: {
    HangulTyping,
  },
};
</script>

<style scoped>
.source-text {
  display: none; /* 소스 텍스트를 화면에 보이지 않게 처리할 수 있습니다. */
}
</style>
