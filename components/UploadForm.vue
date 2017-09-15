<template>
  <form class="upload-form">
    <label class="dropzone">
      <span class="dropzone__text">{{ locales.title }}</span>
      <input class="dropzone__input" type="file" :accept="accept" @change="selectImage">
    </label>
  </form>
</template>

<script>
export default {
  name: 'upload-form',
  props: {
    locales: {
      type: Object,
      required: true
    },
    accept: { required: true }
  },
  data() {
    return {
      isDragging: false,
      image: null
    }
  },
  mounted() {
    this.dndEvents();
  },
  watch: {
    image() {
      this.$emit('image-selected', this.image);
    }
  },
  methods: {
    dragenter(e) {
      this.isDragging = true;
      e.preventDefault();
    },

    dragleave(e) {
      e.preventDefault();
      this.isDragging = false;
    },

    dragover(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    },

    drop(e) {
      e.preventDefault();
      e.stopPropagation();

      this.file = e.dataTransfer.files[0];
      this.isDragging = false;
    },

    selectImage(e) {
      this.image = e.target.files[0];
    },

    dndEvents() {
      const dndEvents = ['dragenter', 'dragleave', 'dragover', 'drop'];
      dndEvents.forEach((event) => this.$el.addEventListener(event, this[event]));
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-form {
    height: 100%;
    width: 100%;
  }

  .dropzone {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    transition: 0.3s;
    width: 100%;

    &:hover {
      background: rgba(0, 0, 0, 0.07);
    }

    &__input {
      position: absolute;
      left: -9999px;
    }

    &__text {
      text-align: center;
    }
  }
</style>
