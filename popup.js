const input = document.getElementById('inputText');

const maps = {
  bold: {
    A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊',
    L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕',
    W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙', a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠',
    h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫',
    s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳'
  },
  italic: {
    A: '𝐴', B: '𝐵', C: '𝐶', D: '𝐷', E: '𝐸', F: '𝐹', G: '𝐺', H: '𝐻', I: '𝐼', J: '𝐽', K: '𝐾',
    L: '𝐿', M: '𝑀', N: '𝑁', O: '𝑂', P: '𝑃', Q: '𝑄', R: '𝑅', S: '𝑆', T: '𝑇', U: '𝑈', V: '𝑉',
    W: '𝑊', X: '𝑋', Y: '𝑌', Z: '𝑍', a: '𝑎', b: '𝑏', c: '𝑐', d: '𝑑', e: '𝑒', f: '𝑓', g: '𝑔',
    h: 'ℎ', i: '𝑖', j: '𝑗', k: '𝑘', l: '𝑙', m: '𝑚', n: '𝑛', o: '𝑜', p: '𝑝', q: '𝑞', r: '𝑟',
    s: '𝑠', t: '𝑡', u: '𝑢', v: '𝑣', w: '𝑤', x: '𝑥', y: '𝑦', z: '𝑧'
  },
  boldItalic: {
    A: '𝑨', B: '𝑩', C: '𝑪', D: '𝑫', E: '𝑬', F: '𝑭', G: '𝑮', H: '𝑯', I: '𝑰', J: '𝑱', K: '𝑲',
    L: '𝑳', M: '𝑴', N: '𝑵', O: '𝑶', P: '𝑷', Q: '𝑸', R: '𝑹', S: '𝑺', T: '𝑻', U: '𝑼', V: '𝑽',
    W: '𝑾', X: '𝑿', Y: '𝒀', Z: '𝒁', a: '𝒂', b: '𝒃', c: '𝒄', d: '𝒅', e: '𝒆', f: '𝒇', g: '𝒈',
    h: '𝒉', i: '𝒊', j: '𝒋', k: '𝒌', l: '𝒍', m: '𝒎', n: '𝒏', o: '𝒐', p: '𝒑', q: '𝒒', r: '𝒓',
    s: '𝒔', t: '𝒕', u: '𝒖', v: '𝒗', w: '𝒘', x: '𝒙', y: '𝒚', z: '𝒛'
  },
  monospace: {
    A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺',
    L: '𝙻', M: '𝙼', N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅',
    W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉', a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐',
    h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖', n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛',
    s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣'
  }
};

function toPlain(text) {
  for (const style in maps) {
    const map = maps[style];
    for (const [key, value] of Object.entries(map)) {
      text = text.split(value).join(key);
    }
  }
  return text;
}

function formatSelection(styleKey) {
  const start = input.selectionStart;
  const end = input.selectionEnd;

  if (start === end) return;

  const scrollTop = input.scrollTop;

  const before = input.value.substring(0, start);
  const selected = input.value.substring(start, end);
  const after = input.value.substring(end);

  const plain = toPlain(selected);
  const styled = plain
    .split('')
    .map(char => maps[styleKey][char] || char)
    .join('');

  input.value = before + styled + after;

  input.focus();
  input.setSelectionRange(start, start + styled.length);

  input.scrollTop = scrollTop;
}

document.getElementById('boldBtn').addEventListener('click', () => formatSelection('bold'));
document.getElementById('italicBtn').addEventListener('click', () => formatSelection('italic'));
document.getElementById('boldItalicBtn').addEventListener('click', () => formatSelection('boldItalic'));
document.getElementById('monospaceBtn').addEventListener('click', () => formatSelection('monospace'));

document.getElementById('copyBtn').addEventListener('click', () => {
  input.select();
  document.execCommand('copy');
});

const bulletBtn = document.getElementById('bulletBtn');
const bulletDropdown = document.getElementById('bulletDropdown');

let currentBullet = '•'; 

bulletBtn.addEventListener('click', (e) => {
  if (e.offsetX > bulletBtn.offsetWidth - 24) {
    bulletBtn.parentElement.classList.toggle('show');
  } else {
    insertBullet(currentBullet);
  }
});

bulletDropdown.querySelectorAll('div').forEach(option => {
  option.addEventListener('click', () => {
    currentBullet = option.getAttribute('data-bullet');
    bulletBtn.innerText = `${currentBullet} Bullet`;

    insertBullet(currentBullet);
    bulletBtn.parentElement.classList.remove('show');
  });
});

function insertBullet(bullet) {
  const { selectionStart } = input;
  const lines = input.value.split('\n');

  let charCount = 0;
  let lineIndex = 0;
  for (; lineIndex < lines.length; lineIndex++) {
    if (selectionStart <= charCount + lines[lineIndex].length) break;
    charCount += lines[lineIndex].length + 1;
  }

  const line = lines[lineIndex].trimStart();
  const updatedLine = line.replace(/^([\u2022\u25AA\u2023\u2794\u2714\u2726\u26AB\u25E6])\s*/, '');

  lines[lineIndex] = `${bullet} ${updatedLine}`;
  input.value = lines.join('\n');
  input.focus();
}

window.addEventListener('click', e => {
  if (!bulletBtn.contains(e.target)) {
    bulletBtn.parentElement.classList.remove('show');
  }
});
