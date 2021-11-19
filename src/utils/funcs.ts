import { formatRelative } from 'date-fns'
import { ru } from "date-fns/locale";

type TSetCookieProps = {
  expires?: number | Date | string;
  path?: string;
}

export function setCookie(name: string, value: string, props: TSetCookieProps = {}) {
  props = {
    path: '/',
    ...props
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = (props as { [key: string]: string | boolean })[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  if (matches) return decodeURIComponent(matches[1]);
}

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}

export function isEmptyObj(obj: {}) {
  for (let key in obj) {
    return false;
  }
  return true;
}

export function getDate(date: string | undefined): string | null {
  if (!date) return null;
  return formatRelative(new Date(date), new Date(), { locale: ru })
}