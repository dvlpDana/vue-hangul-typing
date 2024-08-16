<template>
  <p ref="typingElement" :class="customClass" :style="computedCustomStyle">
    <template v-for="(c, index) in reContents" :key="index">
      <span>{{ c }}</span>
      <br v-if="index < reContents.length - 1" />
    </template>
    <span
      v-if="showCursor"
      class="cursor"
      :style="{
        display: isTyping || cursorAfterTyping ? 'inline-block' : 'none',
      }"
    ></span>
  </p>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  computed,
  onMounted,
  watch,
  onUnmounted,
} from "vue";

import { disassembleHangul, assembleHangul } from "@/hangulHelper";

export default defineComponent({
  name: "HangulTyping",
  props: {
    text: {
      type: String,
      default: null,
    },
    intervalType: {
      type: Number,
      default: 120,
    },
    humanize: {
      type: [Number, Function],
      default: null,
    },
    selector: {
      type: String,
      default: null,
    },
    customClass: {
      type: String,
      default: "",
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    repeat: {
      type: Boolean,
      default: false,
    },
    showCursor: {
      type: Boolean,
      default: false,
    },
    cursorAfterTyping: {
      type: Boolean,
      default: false,
    },
    isPaused: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["typing-start", "typing-end"],
  setup(props, { emit }) {
    const currentText = ref("");
    const typingInterval = ref<ReturnType<typeof setInterval> | undefined>(
      undefined,
    );
    const isTyping = ref(true);
    const currentIndex = ref(0);

    const getRandomInterval = (baseInterval: number) => {
      if (typeof props.humanize === "number") {
        return baseInterval + Math.random() * props.humanize;
      }
      if (typeof props.humanize === "function") {
        return props.humanize(baseInterval);
      }
      return baseInterval;
    };

    const updateText = (splitText: string[], assembledText: string[]) => {
      if (currentIndex.value < splitText.length) {
        assembledText.push(splitText[currentIndex.value]);
        currentText.value = assembleHangul(assembledText);
        currentIndex.value++;
      } else {
        clearInterval(typingInterval.value);
        isTyping.value = false;
        emit("typing-end"); // 타이핑 종료 이벤트 emit
        if (props.repeat) {
          currentIndex.value = 0;
          setTimeout(
            () => startTyping(),
            getRandomInterval(props.intervalType),
          );
        }
      }
    };

    const startTyping = () => {
      clearInterval(typingInterval.value);
      const textToType =
        props.text ||
        (props.selector &&
          document.querySelector(props.selector)?.textContent) ||
        "";
      if (textToType) {
        currentText.value = "";
        currentIndex.value = 0;
        isTyping.value = true;

        emit("typing-start"); // 타이핑 시작 이벤트 emit

        const splitText = disassembleHangul(textToType);
        const assembledText: string[] = [];
        typingInterval.value = setInterval(() => {
          if (!props.isPaused) {
            updateText(splitText, assembledText);
          }
        }, getRandomInterval(props.intervalType));
      }
    };

    const resetTyping = () => {
      if (typingInterval.value) {
        clearInterval(typingInterval.value);
      }
    };

    const computedCustomStyle = computed(() => {
      return {
        ...props.customStyle,
      };
    });

    const reContents = computed(() => currentText.value.split("\n"));

    onMounted(startTyping);
    onUnmounted(resetTyping);
    watch(() => props.text, startTyping);

    return {
      computedCustomStyle,
      currentText,
      isTyping,
      reContents,
    };
  },
});
</script>

<style scoped>
.cursor {
  width: 1px;
  height: 1.2em;
  background-color: #666;
  margin-left: 2px;
  position: relative;
  top: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
