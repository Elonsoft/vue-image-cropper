<template>
  <div :style="[containerSize, styles]" class="vue-image-uploader">
    <preview
      v-if="image"
      :auto-crop="autoCrop"
      :image="image"
      :imageSizes="imageSizes"
      :locales="locales"
      :cropOptions="cropOptions"
      :styles="styles"
      @remove="removeImage"
      @cropped="imageCropped">
    </preview>
    <upload-form
      v-else
      :accept="accept"
      :locales="locales"
      @image-selected="imageSelected">
    </upload-form>
  </div>
</template>

<script>
  import accept from 'attr-accept';
  import UploadForm from './UploadForm.vue';
  import Preview from './Preview.vue';

  export default {
    name: 'vue-image-uploader',
    props: {
      path: { type: String },
      accept: { default: '*' },
      styles: {
        type: Object,
        default() {
          return {}
        }
      },
      locales: {
        type: Object,
        default() {
          return {
            title: 'Drop file here or click to select file',
            cancel: 'Cancel',
            confirm: 'Confirm'
          }
        }
      },
      cropOptions: {
        type: Object,
        default() {
          return {
            aspectRatio: NaN,
            height: 0,
            width: 0
          }
        }
      }
    },
    data() {
      return {
        autoCrop: !this.path,
        image: this.path,
        imageSizes: {
          height: 0,
          width: 0
        }
      }
    },
    computed: {
      containerSize() {
        let { height, width } = this.cropOptions;
        height = height || 400;
        width = width || 600;
        return {
          height: `${height}px`,
          width: `${width}px`
        }
      }
    },
    methods: {
      imageSelected(file) {
        if (this.accept !== '*' && !accept(file, this.accept) || !accept(file, 'image/*')) {
          this.$emit('error', 'accept');
        } else {
          this.toDataUrl(file);
        }
      },
      toDataUrl(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ({ target }) => {
          this.image = target.result;

          // Getting sizes of image
          const img = new Image();
          img.src = target.result;
          img.onload = () => {
            const { height, width } = img;
            this.imageSizes.height = height;
            this.imageSizes.width = width;
          }
        }
      },
      imageCropped(image) {
        this.$emit('cropped', image);
      },
      removeImage() {
        this.image = null;
        this.autoCrop = true;
        this.$emit('removed');
      }
    },
    components: {
      UploadForm,
      Preview
    }
  }
</script>

<style lang="scss" scoped>
  .vue-image-uploader {
    overflow: hidden;
  }
</style>
