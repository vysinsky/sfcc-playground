export function getMethodBadgeBg(method: 'GET' | 'POST') {
  switch (method) {
    case 'GET':
      return 'purple';
    case 'POST':
      return 'cyan';
  }
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

const badgeStylesCache: {
  [key: string]: {
    backgroundColor: string;
    color: string;
    marginBottom: number;
    marginTop: number;
    fontSize: any;
  };
} = {};

export function cartridgeBadgeStyles(str: string = '') {
  if (badgeStylesCache[str]) {
    return badgeStylesCache[str];
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 6) - hash);
  }
  const hex = [];
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    hex[i] = ('00' + value.toString(16)).substr(-2);
  }

  const rgb = hexToRgb(hex.join(''));

  const brightness = Math.round(
    (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  );

  const textColor = brightness > 125 ? 'black' : 'white';

  badgeStylesCache[str] = {
    backgroundColor: `#${hex.join('')}`,
    color: textColor,
    marginTop: 5,
    marginBottom: 5,
    fontSize: '.8rem',
  };

  return badgeStylesCache[str];
}
