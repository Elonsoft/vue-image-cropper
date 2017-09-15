# vue-image-uploader
Image uploader and cropper for Vue.js

## Installation

NPM:
```bash
npm install --save vue-image-uploader
```

## Usage
```html
<template>
  <vue-image-uploader></vue-image-uploader> 
</template>

<script>
 import VueImageUploader from 'vue-image-uploader';
 
 export default {
   components: {
     VueImageUploader
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