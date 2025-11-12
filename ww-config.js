export default {
  options: {
    displayAllowedValues: ['flex', 'inline-flex']
  },
  editor: {
    label: {
      en: 'Image Upload',
      pt: 'Upload de Imagem'
    },
    icon: 'image'
  },
  triggerEvents: [
    {
      name: 'imageSelected',
      label: { en: 'On image selected', pt: 'Ao selecionar imagem' },
      event: {
        file: null,
        fileName: '',
        fileSize: 0,
        fileType: '',
        dataUrl: ''
      },
      default: true
    },
    {
      name: 'imageSaved',
      label: { en: 'On image saved', pt: 'Ao salvar imagem' },
      event: {
        fileName: '',
        fileSize: 0,
        fileType: '',
        dataUrl: '',
        fileData: null
      }
    },
    {
      name: 'imageRemoved',
      label: { en: 'On image removed', pt: 'Ao remover imagem' },
      event: {}
    },
    {
      name: 'uploadError',
      label: { en: 'On upload error', pt: 'Ao encontrar erro' },
      event: {
        errorType: '',
        errorMessage: '',
        fileName: '',
        fileSize: 0
      }
    }
  ],
  actions: [
    {
      label: { en: 'Clear image', pt: 'Limpar imagem' },
      action: 'clearImage'
    },
    {
      label: { en: 'Trigger file input', pt: 'Abrir seletor de arquivo' },
      action: 'triggerFileInput'
    }
  ],
  properties: {
    // Upload Settings
    maxFileSize: {
      label: { en: 'Max File Size (MB)', pt: 'Tamanho Máximo (MB)' },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 5,
      options: {
        min: 0.1,
        max: 50,
        step: 0.1
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Maximum file size in megabytes'
      },
      propertyHelp: {
        tooltip: 'Maximum allowed file size in megabytes (e.g., 5 = 5MB)'
      }
      /* wwEditor:end */
    },
    acceptedFormats: {
      label: { en: 'Accepted Formats', pt: 'Formatos Aceitos' },
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'image/*',
      options: {
        options: [
          { value: 'image/*', label: 'All Images' },
          { value: 'image/jpeg,image/png', label: 'JPG, PNG' },
          { value: 'image/jpeg,image/png,image/webp', label: 'JPG, PNG, WebP' },
          { value: 'image/png', label: 'PNG only' },
          { value: 'image/jpeg', label: 'JPG only' },
          { value: 'custom', label: 'Custom' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Accepted file formats (MIME types)'
      },
      propertyHelp: {
        tooltip: 'Specify which image formats are accepted'
      }
      /* wwEditor:end */
    },
    customAcceptedFormats: {
      label: { en: 'Custom Formats', pt: 'Formatos Personalizados' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'image/jpeg,image/png,image/webp',
      options: {
        placeholder: 'image/jpeg,image/png'
      },
      hidden: content => content.acceptedFormats !== 'custom',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Comma-separated MIME types'
      },
      propertyHelp: {
        tooltip: 'Enter custom MIME types separated by commas'
      }
      /* wwEditor:end */
    },

    // Preview Settings
    previewWidth: {
      label: { en: 'Preview Width', pt: 'Largura da Prévia' },
      type: 'Length',
      section: 'settings',
      bindable: true,
      responsive: true,
      defaultValue: '300px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 50, max: 1000 },
          { value: '%', label: '%', min: 10, max: 100 },
          { value: 'auto', label: 'auto' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Width of the image preview'
      },
      propertyHelp: {
        tooltip: 'Set the width of the uploaded image preview'
      }
      /* wwEditor:end */
    },
    previewHeight: {
      label: { en: 'Preview Height', pt: 'Altura da Prévia' },
      type: 'Length',
      section: 'settings',
      bindable: true,
      responsive: true,
      defaultValue: 'auto',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 50, max: 1000 },
          { value: '%', label: '%', min: 10, max: 100 },
          { value: 'auto', label: 'auto' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Height of the image preview'
      },
      propertyHelp: {
        tooltip: 'Set the height of the uploaded image preview'
      }
      /* wwEditor:end */
    },
    previewObjectFit: {
      label: { en: 'Preview Object Fit', pt: 'Ajuste da Prévia' },
      type: 'TextRadioGroup',
      section: 'settings',
      bindable: true,
      defaultValue: 'contain',
      options: {
        choices: [
          { value: 'contain', title: 'Contain', icon: 'arrows-minimize' },
          { value: 'cover', title: 'Cover', icon: 'arrows-maximize' },
          { value: 'fill', title: 'Fill', icon: 'expand' },
          { value: 'none', title: 'None', icon: 'ban' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'How the image fits in the preview area'
      },
      propertyHelp: {
        tooltip: 'Defines how the image should fit within the preview container'
      }
      /* wwEditor:end */
    },

    // Upload Area Design
    uploadAreaText: {
      label: { en: 'Upload Area Text', pt: 'Texto da Área de Upload' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Click or drag image to upload',
      options: {
        placeholder: 'Enter upload text'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Text displayed in the upload area'
      }
      /* wwEditor:end */
    },
    uploadAreaSubtext: {
      label: { en: 'Upload Area Subtext', pt: 'Subtexto da Área' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'PNG, JPG up to 5MB',
      options: {
        placeholder: 'Enter subtext'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Subtext displayed in the upload area'
      }
      /* wwEditor:end */
    },
    showUploadIcon: {
      label: { en: 'Show Upload Icon', pt: 'Mostrar Ícone' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Show or hide upload icon'
      }
      /* wwEditor:end */
    },
    showSaveButton: {
      label: { en: 'Show Save Button', pt: 'Mostrar Botão Salvar' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Show or hide the save button'
      },
      propertyHelp: {
        tooltip: 'Toggle visibility of the Save button in the preview area'
      }
      /* wwEditor:end */
    },
    showPreview: {
      label: { en: 'Show Preview', pt: 'Mostrar Prévia' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Show or hide the image preview after upload'
      },
      propertyHelp: {
        tooltip: 'When disabled, the upload area remains visible after selecting an image'
      }
      /* wwEditor:end */
    },
    defaultImageUrl: {
      label: { en: 'Default Image URL', pt: 'URL da Imagem Padrão' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      options: {
        placeholder: 'https://example.com/default-image.jpg'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'URL of the image to display when no image is uploaded'
      },
      propertyHelp: {
        tooltip: 'Optional: Display a default image when the user has not uploaded any image yet'
      }
      /* wwEditor:end */
    },

    // Button Labels
    cancelButtonLabel: {
      label: { en: 'Cancel Button Label', pt: 'Texto Botão Cancelar' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Remove',
      options: {
        placeholder: 'Cancel'
      }
    },
    changeImageButtonLabel: {
      label: { en: 'Change Image Label', pt: 'Texto Trocar Imagem' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Change Image',
      options: {
        placeholder: 'Change'
      }
    },
    saveButtonLabel: {
      label: { en: 'Save Button Label', pt: 'Texto Botão Salvar' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Save',
      options: {
        placeholder: 'Save'
      }
    },

    // Style Properties - Upload Area
    uploadAreaBorderStyle: {
      label: { en: 'Upload Area Border Style', pt: 'Estilo da Borda' },
      type: 'TextSelect',
      section: 'style',
      bindable: true,
      defaultValue: 'dashed',
      options: {
        options: [
          { value: 'solid', label: 'Solid' },
          { value: 'dashed', label: 'Dashed' },
          { value: 'dotted', label: 'Dotted' },
          { value: 'none', label: 'None' }
        ]
      }
    },
    uploadAreaBorderWidth: {
      label: { en: 'Upload Area Border Width', pt: 'Largura da Borda' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '2px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 10 }
        ]
      }
    },
    uploadAreaBorderColor: {
      label: { en: 'Upload Area Border Color', pt: 'Cor da Borda' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#cbd5e0',
      options: {
        nullable: true
      }
    },
    uploadAreaBackgroundColor: {
      label: { en: 'Upload Area Background', pt: 'Fundo da Área' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#f7fafc',
      options: {
        nullable: true
      }
    },
    uploadAreaBorderRadius: {
      label: { en: 'Upload Area Border Radius', pt: 'Raio da Borda' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '8px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 50 }
        ]
      }
    },
    uploadAreaPadding: {
      label: { en: 'Upload Area Padding', pt: 'Espaçamento Interno' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '32px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Padding inside upload area'
      }
      /* wwEditor:end */
    },
    uploadAreaHoverBorderColor: {
      label: { en: 'Hover Border Color', pt: 'Cor da Borda (Hover)' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#4299e1',
      options: {
        nullable: true
      }
    },
    uploadAreaHoverBackgroundColor: {
      label: { en: 'Hover Background Color', pt: 'Cor de Fundo (Hover)' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ebf8ff',
      options: {
        nullable: true
      }
    },

    // Style Properties - Icon
    uploadIconSize: {
      label: { en: 'Upload Icon Size', pt: 'Tamanho do Ícone' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '48px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 16, max: 128 }
        ]
      }
    },
    uploadIconColor: {
      label: { en: 'Upload Icon Color', pt: 'Cor do Ícone' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#a0aec0',
      options: {
        nullable: true
      }
    },

    // Style Properties - Text
    uploadTextColor: {
      label: { en: 'Upload Text Color', pt: 'Cor do Texto' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#2d3748',
      options: {
        nullable: true
      }
    },
    uploadTextFontSize: {
      label: { en: 'Upload Text Font Size', pt: 'Tamanho da Fonte' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '16px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 32 }
        ]
      }
    },
    uploadSubtextColor: {
      label: { en: 'Subtext Color', pt: 'Cor do Subtexto' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#718096',
      options: {
        nullable: true
      }
    },
    uploadSubtextFontSize: {
      label: { en: 'Subtext Font Size', pt: 'Tamanho do Subtexto' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '14px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 24 }
        ]
      }
    },

    // Style Properties - Preview
    previewBorderRadius: {
      label: { en: 'Preview Border Radius', pt: 'Raio da Borda (Prévia)' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '8px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 50 }
        ]
      }
    },
    previewBorderWidth: {
      label: { en: 'Preview Border Width', pt: 'Largura da Borda (Prévia)' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '1px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 10 }
        ]
      }
    },
    previewBorderColor: {
      label: { en: 'Preview Border Color', pt: 'Cor da Borda (Prévia)' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#e2e8f0',
      options: {
        nullable: true
      }
    },

    // Style Properties - Buttons
    buttonGap: {
      label: { en: 'Buttons Gap', pt: 'Espaço entre Botões' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '12px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 50 }
        ]
      }
    },
    cancelButtonBackgroundColor: {
      label: { en: 'Cancel Button Background', pt: 'Fundo Botão Cancelar' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#e53e3e',
      options: {
        nullable: true
      }
    },
    cancelButtonTextColor: {
      label: { en: 'Cancel Button Text Color', pt: 'Cor Texto Cancelar' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ffffff',
      options: {
        nullable: true
      }
    },
    changeButtonBackgroundColor: {
      label: { en: 'Change Button Background', pt: 'Fundo Botão Trocar' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#4299e1',
      options: {
        nullable: true
      }
    },
    changeButtonTextColor: {
      label: { en: 'Change Button Text Color', pt: 'Cor Texto Trocar' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ffffff',
      options: {
        nullable: true
      }
    },
    saveButtonBackgroundColor: {
      label: { en: 'Save Button Background', pt: 'Fundo Botão Salvar' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#48bb78',
      options: {
        nullable: true
      }
    },
    saveButtonTextColor: {
      label: { en: 'Save Button Text Color', pt: 'Cor Texto Salvar' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ffffff',
      options: {
        nullable: true
      }
    },
    buttonPadding: {
      label: { en: 'Button Padding', pt: 'Espaçamento do Botão' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '10px 20px'
    },
    buttonBorderRadius: {
      label: { en: 'Button Border Radius', pt: 'Raio da Borda (Botão)' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '6px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 50 }
        ]
      }
    },
    buttonFontSize: {
      label: { en: 'Button Font Size', pt: 'Tamanho da Fonte (Botão)' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '14px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 24 }
        ]
      }
    },

    // Style Properties - Error Message
    errorMessageColor: {
      label: { en: 'Error Message Color', pt: 'Cor da Mensagem de Erro' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#e53e3e',
      options: {
        nullable: true
      }
    },
    errorMessageFontSize: {
      label: { en: 'Error Message Font Size', pt: 'Tamanho Fonte Erro' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '14px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 20 }
        ]
      }
    }
  }
};
