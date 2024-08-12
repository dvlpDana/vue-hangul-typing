<template>
  <div class="example-container">
    <h2>Typing Effect with Pause and Resume</h2>
    <div class="typing-box">
      <HangulTyping
        ref="HangulTyping"
        text="안녕하세요.\n 일시정지와 재개를 지원하는 예제입니다."
        :intervalType="80"
        :isPaused="isPaused"
      />
    </div>
    <div class="button-group">
      <button class="control-button pause-button" @click="pauseTyping">
        일시정지
      </button>
      <button class="control-button resume-button" @click="resumeTyping">
        재개
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import HangulTyping from "../../src/HangulTyping.vue";

export default {
  components: {
    HangulTyping,
  },
  setup() {
    const isPaused = ref(false);

    const pauseTyping = () => {
      isPaused.value = true;
    };

    const resumeTyping = () => {
      isPaused.value = false;
    };

    return {
      isPaused,
      pauseTyping,
      resumeTyping,
    };
  },
};
</script>

<style scope>
.pause-button {
  background-color: #f44336;
}

.pause-button:hover {
  background-color: #d32f2f;
}

.pause-button:active {
  background-color: #b71c1c;
}

.resume-button {
  background-color: #4caf50;
}

.resume-button:hover {
  background-color: #388e3c;
}

.resume-button:active {
  background-color: #2e7d32;
}
</style>
