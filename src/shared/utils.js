export {
  between,
} from 'react-calendar/dist/shared/utils';

const isValidNumber = a => typeof a === 'number' && !isNaN(a);

const findInput = sibling => (element) => {
  const foundElement = element[sibling]; // Divider between inputs
  if (!foundElement) {
    return null;
  }
  return foundElement[sibling]; // Actual input
};

export const findPreviousInput = findInput('previousElementSibling');
export const findNextInput = findInput('nextElementSibling');
export const min = (...args) => Math.min(...args.filter(isValidNumber));
export const max = (...args) => Math.max(...args.filter(isValidNumber));
export const focus = element => element && element.focus();
export const select = element => element && element.select();

export const appendInputValue = (event, onChange) => {
  const { target, target: { value, max: maxValue }, key } = event;


  if (Number(value) > Number(maxValue)
    || Number(key) > Number(maxValue.charAt(0))
    || value.length >= maxValue.length) {
    const nextInput = findNextInput(target);

    if (Number(value) > Number(maxValue)) {
      target.value = maxValue;
      onChange(event);
    }

    focus(nextInput);
  }
};

export const updateInputWidth = (element) => {
  const span = document.createElement('span');
  span.innerHTML = element.value || element.placeholder;

  const container = element.parentElement;

  container.appendChild(span);

  const { width } = span.getBoundingClientRect();
  element.style.width = `${Math.ceil(width)}px`;

  container.removeChild(span);
};
