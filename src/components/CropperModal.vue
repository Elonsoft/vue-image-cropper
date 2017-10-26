<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal__wrapper">
        <div class="modal__dialog">
          <vue-cropper
            v-if="image"
            ref='cropper'
            :guides="true"
            :view-mode="1"
            :aspect-ratio="cropOptions.aspectRatio"
            drag-mode="crop"
            :auto-crop-area="0.5"
            :min-container-width="250"
            :min-container-height="180"
            :src="image"
            alt="Source image"
            :img-style="{ width: '500px', height: '500px' }"
          />
          <actions class="cropper-actions">
            <button action-btn @click="rotate(-90)">
              <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"/>
              </svg>
            </button>
            <button action-btn @click="rotate(90)">
              <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/>
              </svg>
            </button>
          </actions>
          <div class="modal-actions">
            <button class="modal-actions__btn" @click="close">{{ locales.cancel }}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import VueCropper from './VueCropper';
  import Actions from './Actions.vue';

  export default {
    name: 'cropper-modal',
    props: {
      autoCropData: {
        required: true
      },
      image: {
        required: true
      },
      cropOptions: {
        type: Object,
        required: true
      },
      locales: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.setAutoCropData();
    },
    methods: {
      cropImage() {
        const { height, width } = this.cropOptions;
        const croppedImage = this
                              .$refs
                              .cropper
                              .getCroppedCanvas({ height, width })
                              .toDataURL();
                              
        this.$emit('cropped', croppedImage);
        this.close();
      },
      setAutoCropData() {
        if (this.autoCropData) {
          this.$refs.cropper.setData(this.autoCropData);
        }
      },
      rotate(degree) {
        this.$refs.cropper.rotate(degree);
      },
      close() {
        this.$parent.toggleCropperModal();
      }
    },
    components: {
      VueCropper,
      Actions
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.99);
    display: table;
    transition: opacity .3s ease;

    &__wrapper {
      align-items: center;
      display: flex;
      height: 100%;
      overflow: auto;
      width: 100%;
    }

    &__dialog {
      display: flex;
      flex-direction: column;
      max-width: 900px;
      height: 100%;
      min-height: 500px;
      max-height: 660px;
      width: 100%;
      margin: auto;
    }

    &-actions {
      $default: #ececec;
      $primary: #1c1c32;

      display: flex;
      justify-content: center;
      margin-top: 40px;

      &__btn {
        display: inline-block;
        padding: 8px 30px;
        background: $default;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        border-radius: 3px;
        border: none;
        cursor: pointer;
        color: #000;
        outline: none;
        transition: 0.2s;

        &:not(:last-child) {
          margin-right: 12px;
        }

        &:hover,
        &:focus {
          background: darken($default, 20%);
        }

        &_primary {
          background: $primary;
          color: $default;

          &:hover,
          &:focus {
            background: darken($primary, 5%);
          }
        }
      }
    }
  }

  .cropper-actions {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  /* Transition */
  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
