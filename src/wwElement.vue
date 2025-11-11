<template>
  <div class="image-upload-component">
    <!-- Hidden File Input (always present) -->
    <input
      ref="fileInput"
      type="file"
      :accept="acceptAttribute"
      class="file-input"
      @change="handleFileSelect"
    />

    <!-- Upload Area (shown when no image OR when preview is disabled) -->
    <div
      v-if="!selectedImage || !showPreview"
      class="upload-area"
      :class="{ 'is-dragging': isDragging, 'is-disabled': isDisabled }"
      :style="uploadAreaStyle"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Upload Icon -->
      <div v-if="showUploadIcon" class="upload-icon" :style="uploadIconStyle">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>

      <!-- Upload Text -->
      <div class="upload-text" :style="uploadTextStyle">
        {{ uploadAreaText }}
      </div>

      <!-- Upload Subtext -->
      <div v-if="uploadAreaSubtext" class="upload-subtext" :style="uploadSubtextStyle">
        {{ uploadAreaSubtext }}
      </div>
    </div>

    <!-- Preview Area (shown when image is selected AND preview is enabled) -->
    <div v-if="selectedImage && showPreview" class="preview-area">
      <!-- Image Preview -->
      <div class="image-preview-container" :style="previewContainerStyle">
        <img
          :src="selectedImage"
          :alt="fileName"
          class="image-preview"
          :style="previewImageStyle"
        />
      </div>

      <!-- Image Info -->
      <div class="image-info">
        <div class="image-name">{{ fileName }}</div>
        <div class="image-size">{{ formattedFileSize }}</div>
      </div>
    </div>

    <!-- Action Buttons (shown when image is selected, regardless of preview) -->
    <div v-if="selectedImage" class="action-buttons" :style="actionButtonsStyle">
      <button
        class="action-button cancel-button"
        :style="cancelButtonStyle"
        @click="handleCancel"
      >
        {{ cancelButtonLabel }}
      </button>
      <button
        class="action-button change-button"
        :style="changeButtonStyle"
        @click="handleChangeImage"
      >
        {{ changeImageButtonLabel }}
      </button>
      <button
        v-if="showSaveButton"
        class="action-button save-button"
        :style="saveButtonStyle"
        @click="handleSave"
      >
        {{ saveButtonLabel }}
      </button>
    </div>

    <!-- Error Message -->
    <transition name="error-fade">
      <div v-if="errorMessage" class="error-message" :style="errorMessageStyle">
        <span class="error-icon">⚠</span>
        <span>{{ errorMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'ImageUpload',
  props: {
    content: {
      type: Object,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    /* wwEditor:start */
    wwEditorState: {
      type: Object,
      required: true
    }
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Refs
    const fileInput = ref(null);
    const isDragging = ref(false);
    const isDisabled = ref(false);
    const errorMessage = ref('');

    // Component Variables
    const { value: selectedImage, setValue: setSelectedImage } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'selectedImage',
      type: 'string',
      defaultValue: ''
    });

    const { value: fileName, setValue: setFileName } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'fileName',
      type: 'string',
      defaultValue: ''
    });

    const { value: fileSize, setValue: setFileSize } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'fileSize',
      type: 'number',
      defaultValue: 0
    });

    const { value: fileType, setValue: setFileType } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'fileType',
      type: 'string',
      defaultValue: ''
    });

    const { value: fileData, setValue: setFileData } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'fileData',
      type: 'object',
      defaultValue: null
    });

    // Computed Properties
    const acceptAttribute = computed(() => {
      const format = props.content?.acceptedFormats || 'image/*';
      if (format === 'custom') {
        return props.content?.customAcceptedFormats || 'image/*';
      }
      return format;
    });

    const maxFileSizeBytes = computed(() => {
      const sizeMB = props.content?.maxFileSize || 5;
      return sizeMB * 1024 * 1024;
    });

    const formattedFileSize = computed(() => {
      if (!fileSize.value) return '';
      const sizeKB = fileSize.value / 1024;
      if (sizeKB < 1024) {
        return `${sizeKB.toFixed(2)} KB`;
      }
      return `${(sizeKB / 1024).toFixed(2)} MB`;
    });

    // Style Computed Properties
    const uploadAreaStyle = computed(() => ({
      borderStyle: props.content?.uploadAreaBorderStyle || 'dashed',
      borderWidth: props.content?.uploadAreaBorderWidth || '2px',
      borderColor: isDragging.value
        ? props.content?.uploadAreaHoverBorderColor || '#4299e1'
        : props.content?.uploadAreaBorderColor || '#cbd5e0',
      backgroundColor: isDragging.value
        ? props.content?.uploadAreaHoverBackgroundColor || '#ebf8ff'
        : props.content?.uploadAreaBackgroundColor || '#f7fafc',
      borderRadius: props.content?.uploadAreaBorderRadius || '8px',
      padding: props.content?.uploadAreaPadding || '32px'
    }));

    const uploadIconStyle = computed(() => ({
      width: props.content?.uploadIconSize || '48px',
      height: props.content?.uploadIconSize || '48px',
      color: props.content?.uploadIconColor || '#a0aec0'
    }));

    const uploadTextStyle = computed(() => ({
      color: props.content?.uploadTextColor || '#2d3748',
      fontSize: props.content?.uploadTextFontSize || '16px'
    }));

    const uploadSubtextStyle = computed(() => ({
      color: props.content?.uploadSubtextColor || '#718096',
      fontSize: props.content?.uploadSubtextFontSize || '14px'
    }));

    const previewContainerStyle = computed(() => ({
      width: props.content?.previewWidth || '300px',
      height: props.content?.previewHeight || 'auto',
      borderRadius: props.content?.previewBorderRadius || '8px',
      borderWidth: props.content?.previewBorderWidth || '1px',
      borderColor: props.content?.previewBorderColor || '#e2e8f0',
      borderStyle: 'solid'
    }));

    const previewImageStyle = computed(() => ({
      objectFit: props.content?.previewObjectFit || 'contain',
      borderRadius: props.content?.previewBorderRadius || '8px'
    }));

    const actionButtonsStyle = computed(() => ({
      gap: props.content?.buttonGap || '12px'
    }));

    const cancelButtonStyle = computed(() => ({
      backgroundColor: props.content?.cancelButtonBackgroundColor || '#e53e3e',
      color: props.content?.cancelButtonTextColor || '#ffffff',
      padding: props.content?.buttonPadding || '10px 20px',
      borderRadius: props.content?.buttonBorderRadius || '6px',
      fontSize: props.content?.buttonFontSize || '14px'
    }));

    const changeButtonStyle = computed(() => ({
      backgroundColor: props.content?.changeButtonBackgroundColor || '#4299e1',
      color: props.content?.changeButtonTextColor || '#ffffff',
      padding: props.content?.buttonPadding || '10px 20px',
      borderRadius: props.content?.buttonBorderRadius || '6px',
      fontSize: props.content?.buttonFontSize || '14px'
    }));

    const errorMessageStyle = computed(() => ({
      color: props.content?.errorMessageColor || '#e53e3e',
      fontSize: props.content?.errorMessageFontSize || '14px'
    }));

    // Text Labels
    const uploadAreaText = computed(() => props.content?.uploadAreaText || 'Click or drag image to upload');
    const uploadAreaSubtext = computed(() => props.content?.uploadAreaSubtext || 'PNG, JPG up to 5MB');
    const showUploadIcon = computed(() => props.content?.showUploadIcon !== false);
    const cancelButtonLabel = computed(() => props.content?.cancelButtonLabel || 'Remove');
    const changeImageButtonLabel = computed(() => props.content?.changeImageButtonLabel || 'Change Image');

    // Methods
    const validateFile = (file) => {
      // Clear previous error
      errorMessage.value = '';

      // Check file type
      const acceptedFormats = acceptAttribute.value.split(',').map(f => f.trim());
      const isValidType = acceptedFormats.some(format => {
        if (format === 'image/*') {
          return file.type.startsWith('image/');
        }
        return file.type === format;
      });

      if (!isValidType) {
        const errorMsg = `Invalid file type. Accepted formats: ${acceptedFormats.join(', ')}`;
        errorMessage.value = errorMsg;

        emit('trigger-event', {
          name: 'uploadError',
          event: {
            errorType: 'invalid_type',
            errorMessage: errorMsg,
            fileName: file.name,
            fileSize: file.size
          }
        });

        return false;
      }

      // Check file size
      if (file.size > maxFileSizeBytes.value) {
        const maxSizeMB = (maxFileSizeBytes.value / 1024 / 1024).toFixed(2);
        const errorMsg = `File too large. Maximum size: ${maxSizeMB}MB`;
        errorMessage.value = errorMsg;

        emit('trigger-event', {
          name: 'uploadError',
          event: {
            errorType: 'file_too_large',
            errorMessage: errorMsg,
            fileName: file.name,
            fileSize: file.size
          }
        });

        return false;
      }

      return true;
    };

    const processFile = (file) => {
      if (!validateFile(file)) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target.result;

        setSelectedImage(dataUrl);
        setFileName(file.name);
        setFileSize(file.size);
        setFileType(file.type);
        setFileData({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        });

        emit('trigger-event', {
          name: 'imageSelected',
          event: {
            file: file,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            dataUrl: dataUrl
          }
        });

        // Clear error message on success
        errorMessage.value = '';
      };

      reader.onerror = () => {
        const errorMsg = 'Error reading file';
        errorMessage.value = errorMsg;

        emit('trigger-event', {
          name: 'uploadError',
          event: {
            errorType: 'read_error',
            errorMessage: errorMsg,
            fileName: file.name,
            fileSize: file.size
          }
        });
      };

      reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
      if (isEditing.value || isDisabled.value) return;
      fileInput.value?.click();
    };

    const handleFileSelect = (event) => {
      if (isEditing.value) return;

      const file = event.target.files?.[0];
      if (file) {
        processFile(file);
      }

      // Reset input value to allow selecting the same file again
      if (fileInput.value) {
        fileInput.value.value = '';
      }
    };

    const handleDragOver = (event) => {
      if (isEditing.value || isDisabled.value) return;
      event.preventDefault();
      isDragging.value = true;
    };

    const handleDragLeave = (event) => {
      if (isEditing.value) return;
      event.preventDefault();
      isDragging.value = false;
    };

    const handleDrop = (event) => {
      if (isEditing.value || isDisabled.value) return;

      event.preventDefault();
      isDragging.value = false;

      const file = event.dataTransfer?.files?.[0];
      if (file) {
        processFile(file);
      }
    };

    const handleCancel = () => {
      if (isEditing.value) return;

      setSelectedImage('');
      setFileName('');
      setFileSize(0);
      setFileType('');
      setFileData(null);
      errorMessage.value = '';

      emit('trigger-event', {
        name: 'imageRemoved',
        event: {}
      });
    };

    const handleChangeImage = () => {
      if (isEditing.value || isDisabled.value) return;
      fileInput.value?.click();
    };

    const handleSave = () => {
      if (isEditing.value) return;

      emit('trigger-event', {
        name: 'imageSaved',
        event: {
          fileName: fileName.value,
          fileSize: fileSize.value,
          fileType: fileType.value,
          dataUrl: selectedImage.value,
          fileData: fileData.value
        }
      });
    };

    const clearImage = () => {
      handleCancel();
      return true;
    };

    // Auto-hide error message after 5 seconds
    watch(errorMessage, (newError) => {
      if (newError) {
        setTimeout(() => {
          if (errorMessage.value === newError) {
            errorMessage.value = '';
          }
        }, 5000);
      }
    });

    return {
      // Refs
      fileInput,
      isDragging,
      isDisabled,
      errorMessage,

      // Component Variables
      selectedImage,
      fileName,
      fileSize,
      formattedFileSize,

      // Computed
      acceptAttribute,
      uploadAreaText,
      uploadAreaSubtext,
      showUploadIcon,
      showSaveButton: computed(() => props.content?.showSaveButton !== false),
      showPreview: computed(() => props.content?.showPreview !== false),
      cancelButtonLabel,
      changeImageButtonLabel,
      saveButtonLabel: computed(() => props.content?.saveButtonLabel || 'Save'),

      // Styles
      uploadAreaStyle,
      uploadIconStyle,
      uploadTextStyle,
      uploadSubtextStyle,
      previewContainerStyle,
      previewImageStyle,
      actionButtonsStyle,
      cancelButtonStyle,
      changeButtonStyle,
      saveButtonStyle: computed(() => ({
        backgroundColor: props.content?.saveButtonBackgroundColor || '#48bb78',
        color: props.content?.saveButtonTextColor || '#ffffff',
        padding: props.content?.buttonPadding || '10px 20px',
        borderRadius: props.content?.buttonBorderRadius || '6px',
        fontSize: props.content?.buttonFontSize || '14px'
      })),
      errorMessageStyle,

      // Methods
      triggerFileInput,
      handleFileSelect,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleCancel,
      handleChangeImage,
      handleSave,
      clearImage
    };
  }
};
</script>

<style scoped lang="scss">
.image-upload-component {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  .file-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:hover:not(.is-disabled) {
      transform: translateY(-2px);
    }

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .upload-icon {
      transition: transform 0.3s ease;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &:hover .upload-icon {
      transform: scale(1.1);
    }

    .upload-text {
      font-weight: 600;
      text-align: center;
    }

    .upload-subtext {
      text-align: center;
    }
  }

  .preview-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;

    .image-preview-container {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f7fafc;

      .image-preview {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .image-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      width: 100%;

      .image-name {
        font-size: 14px;
        font-weight: 600;
        color: #2d3748;
        word-break: break-word;
        text-align: center;
      }

      .image-size {
        font-size: 12px;
        color: #718096;
      }
    }
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    .action-button {
      border: none;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      outline: none;
      white-space: nowrap;

      &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background-color: #fff5f5;
    border: 1px solid currentColor;
    border-radius: 6px;
    font-weight: 500;

    .error-icon {
      font-size: 18px;
      flex-shrink: 0;
    }
  }
}

.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.3s ease;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
