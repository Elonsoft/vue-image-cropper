<template>
  <div class="flash-message">
    <div class="flash-message__success">
      <div class="checkmark checkmark_draw"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: { type: String }
    }
  };
</script>

<style lang="scss" scoped="">
  @import "bourbon";

  .flash-message {
    align-items: center;
    background: rgba(#4caf50, 0.9);
    display: flex;
    justify-content: center;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    &__success {
      @include size(150px);

      position: relative;
      display: inline-block;
      vertical-align: top;
    }
  }

  .checkmark {
    $circle-size: 150px;

    $check-height: $circle-size/2;
    $check-width: $check-height/2;
    $check-left: $circle-size/6;
    $check-thickness: $circle-size/10;

    &_draw:after {
      @include animation-delay(500ms);
      @include animation-duration(1s);
      @include animation-timing-function(ease);
      @include animation-name (checkmark);
      @include transform(scaleX(-1) rotate(180deg + -45deg));
      @include animation-fill-mode(forwards);
    }

    border-radius: 5px;

    &:after {
      opacity: 1;
      height: $check-height;
      width: $check-width;
      @include transform-origin(left top);
      border-right: $check-thickness solid white;
      border-top: $check-thickness solid white;
      border-radius: 2.5px !important;
      content: '';
      left: $check-left;
      top: $check-height;
      position: absolute;
    }

    @include keyframes(checkmark) {
      0% { height: 0; width: 0; opacity: 1; }
      20% { height: 0; width: $check-width; opacity: 1; }
      40% { height: $check-height; width: $check-width; opacity: 1; }
      100% { height: $check-height; width: $check-width; opacity: 1; }
    }
  }
</style>