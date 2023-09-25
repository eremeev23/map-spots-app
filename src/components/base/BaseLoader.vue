<template>
  <div>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "BaseLoader",
};
</script>

<style scoped lang="scss">
div {
  position: fixed;
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  background-color: rgba(17 17 17 / .4);
  z-index: 9999;

  span {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    border: 4px solid;
    border-right-color: transparent;
    animation: rotation .8s linear infinite;
  }
}

@keyframes rotation {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(359deg);
  }
}
</style>
