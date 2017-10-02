<template>
  <div class="preview" :class="{ 'preview_processing': processing }">
    <spinner
      v-if="processing"
      class="preview__spinner"
      size="20"
      :line-fg-color="styles.color"
      line-bg-color="rgba(0, 0, 0, 0.2)">
    </spinner>
    <template v-else>
      <img :src="previewImage" class="preview__image">
      <actions class="preview__actions">
        <button action-btn @click.prevent="removeImage">
          <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
        <button action-btn @click.prevent="toggleCropperModal">
          <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </actions>
      <cropper-modal
        v-if="showCropperModal"
        :auto-crop-data="autoCropData"
        :image="image"
        :cropOptions="cropOptions"
        :locales="locales"
        @cropped="imageCropped">
       </cropper-modal>
    </template>

    <!-- Auto cropping image -->
    <div v-if="autoCrop" class="preview__auto-crop">
      <vue-cropper
        ref='cropper'
        :auto-crop="false"
        :guides="true"
        :view-mode="3"
        drag-mode="crop"
        :aspect-ratio="cropOptions.aspectRatio"
        :min-container-width="250"
        :min-container-height="180"
        :background="true"
        :src="image"
        alt="Source Image"
        :ready="cropperReady"
        :crop="imageAutoCropped"
        :img-style="{ width: '500px', height: '500px' }"
      ></vue-cropper>
    </div>
  </div>
</template>

<script>
  import VueCropper from './VueCropper';
  import Actions from './Actions.vue';
  import CropperModal from './CropperModal.vue';
  import smartcrop from 'smartcrop';
  import Spinner from 'vue-simple-spinner';

  export default {
    props: {
      autoCrop: {
        type: Boolean,
        default: true
      },
      image: {
        type: String,
        required: true
      },
      imageSizes: {
        type: Object,
        required: true
      },
      locales: {
        type: Object,
        required: true
      },
      cropOptions: {
        type: Object,
        required: true
      },
      styles: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        croppedImage: null,
        showCropperModal: false,
        processing: false
      }
    },
    mounted() {
      this.smartCrop();
    },
    computed: {
      previewImage() {
        return !this.autoCrop && !this.croppedImage ? this.image : this.croppedImage;
      },
      cropSizes() {
        const { height: originalHeight, width: originalWidth } = this.imageSizes;
        const aspectRatio = this.cropOptions.aspectRatio || originalWidth / originalHeight;
        let { height: scaledHeight, width: scaledWidth } = this.cropOptions;

        if (scaledWidth) {
          scaledHeight = scaledWidth / aspectRatio;
        } else if (scaledHeight) {
          scaledWidth = scaledHeight * aspectRatio;
        }

        return {
          height: Math.floor(scaledHeight || originalHeight),
          width: Math.floor(scaledWidth || originalWidth)
        }
      },
      autoCropData() {
        return this.$refs.cropper ? this.$refs.cropper.getData() : null;
      }
    },
    methods: {
      smartCrop() {
        if (this.autoCrop) {
          this.processing = true;

          const img = new Image();
          img.src = this.image;
          img.onload = () => {
            smartcrop
              .crop(img, this.cropSizes)
              .then(this.onSmartCropped);
          };
        }
      },
      cropperReady() {
        this.processing = false;
      },
      imageAutoCropped() {
        const { height, width } = this.cropOptions;
        const croppedImage = this
                              .$refs
                              .cropper
                              .getCroppedCanvas({ height, width })
                              .toDataURL();

        this.imageCropped(croppedImage);
      },
      imageCropped(image) {
        this.croppedImage = image;
        this.$emit('cropped', image);
      },
      removeImage() {
        this.$emit('remove');
      },
      toggleCropperModal() {
        this.showCropperModal = !this.showCropperModal;
      },
      onSmartCropped({ topCrop }) {
        const { x, y } = topCrop;
        const { cropper } = this.$refs.cropper;

        cropper.moveTo(x, y);
        cropper.crop();

        this.toggleCropperModal();
      }
    },
    components: {
      VueCropper,
      Actions,
      CropperModal,
      Spinner
    }
  };
</script>

<style lang="scss" scoped="">
  .preview {
    position: relative;
    height: 100%;
    overflow: hidden;
    width: 100%;

    &_processing {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    &__image {
      height: auto;
      width: 100%;
    }

    &__auto-crop {
      display: none;
    }

    &__actions {
      bottom: 15px;
      position: absolute;
      left: 0;
      right: 0;
    }
  }
</style>
