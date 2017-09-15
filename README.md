# vue-image-cropper
Image uploader and cropper for Vue.js

## Installation

NPM:
```bash
npm install --save vue-image-cropper
```

## Usage
```html
<template>
  <vue-image-cropper></vue-image-cropper> 
</template>

<script>
 import VueImageCropper from 'vue-image-cropper';
 
 export default {
   components: {
     VueImageCropper
   }
 };
</script>
```

## Options

### accept
Value of "accept" attribute for file input
* Type: `string`

### cropOptions
* Type: `Object`

Properties and default values:
```json
aspectRatio: NaN,
height: 0,
width: 0
```

### locales
* Type: `Object`

Properties and default values:
```json
title: 'Drop file here or click to select file',
cancel: 'Cancel',
confirm: 'Confirm'
```

### path
Path to image or base64
* Type: `string`


### styles
* Type: `Object`