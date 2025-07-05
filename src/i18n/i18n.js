import tr from '/src/assets/locales/tr.json';
import en from '/src/assets/locales/en.json';
import { useLanguageStore } from '../store/';

const translations = {
  tr,
  en,
};

export const t = (key, value) => {
  const { lang } = useLanguageStore();
  const obj = translations[lang];
  const msg = key.split('.').reduce((first, next) => first?.[next], obj) || key;
  return value
    ? Object.entries(value).reduce(
        (first, [key, value]) => first.replace(`\${${key}}`, value),
        msg
      )
    : msg;
};
