<template>
  <div class="example-container">
    <h2>Typing Effect with Custom Class and Style</h2>
    <div class="typing-box">
      <HangulTyping
        text="안녕하세요.\n 커스텀 클래스와 스타일을 적용한 예제입니다."
        customClass="custom-typing-class"
        :customStyle="{ color: 'blue', fontSize: '20px' }"
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
.custom-typing-class {
  font-family: "Courier New", Courier, monospace;
}
</style>
