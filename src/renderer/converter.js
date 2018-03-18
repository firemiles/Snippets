import languages from './assets/data/languages';

const converter = {
  languageToExtension(language) {
    if (languages.filter(l => l.name === language).length > 0) {
      return languages.filter(l => l.name === language)[0].extension;
    }
    return 'txt';
  },
  extensionToLanguage(extension) {
    if (languages.filter(l => l.extension === extension).length > 0) {
      return languages.filter(l => l.extension === extension)[0].name;
    }
    return 'text';
  },
};

export default converter;
