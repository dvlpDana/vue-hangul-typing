<template>
  <div>
    <h1>Vue 한글 타이핑 효과 컴포넌트</h1>
    <div class="grid-container">
      <BasicExample />
      <CusorExample />
      <IntervalHumanizeExample />
      <CustomStyleExample />
      <RepeatExample />
      <SelectorExample />
      <PauseResumeExample />
      <TypingComputedTimeExample />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BasicExample from "./components/BasicExample.vue";
import IntervalHumanizeExample from "./components/IntervalHumanizeExample.vue";
import CustomStyleExample from "./components/CustomStyleExample.vue";
import RepeatExample from "./components/RepeatExample.vue";
import PauseResumeExample from "./components/PauseResumeExample.vue";
import CusorExample from "./components/CursorExample.vue";
import SelectorExample from "./components/SelectorExample.vue";
import TypingComputedTimeExample from "./components/TypingComputedTimeExample.vue";

export default defineComponent({
  components: {
    BasicExample,
    IntervalHumanizeExample,
    CustomStyleExample,
    RepeatExample,
    PauseResumeExample,
    CusorExample,
    SelectorExample,
    TypingComputedTimeExample,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  line-height: 1.6;
  background-color: #f4f4f4;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
}

div {
  margin: 20px 0;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1,
h2 {
  font-family: "Roboto", sans-serif;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  gap: 20px;
}

.example-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.typing-box {
  width: 80%;
  max-width: 600px;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #333;
  margin-top: 20px;
}

.button-group {
  text-align: center;
}

.control-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 5px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.control-button:hover {
  background-color: #0056b3;
}

.control-button:active {
  background-color: #004494;
}
</style>
