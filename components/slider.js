class Slider extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const slider = document.createElement('div');
    slider.classList.add('fields');
    const count = 3;
    const labelSlot = document.createElement('slot');
    labelSlot.name = `label`;
    slider.appendChild(labelSlot);
    for (let i =1; i<= count; i++) {
      const field = document.createElement('div');
      field.classList.add('field');

      const sliderCheckbox = document.createElement('div');
      sliderCheckbox.classList.add('slider');
      field.appendChild(sliderCheckbox);

      const input = document.createElement('input');
      input.type= "radio";
      input.name = "slider-group";
      sliderCheckbox.appendChild(input);

      const span = document.createElement('span');
      sliderCheckbox.appendChild(span);

      const sliderSlot = document.createElement('slot');
      sliderSlot.name=`slider-${i}`;
      sliderCheckbox.appendChild(sliderSlot);

      const firstSpan = slider.querySelector('.slider span');
        if (firstSpan) {
          firstSpan.classList.add('active');
        }

      span.onclick = () => {
        const activeSpans = shadow.querySelectorAll('.slider span.active');
        activeSpans.forEach((activeSpan) => {
          activeSpan.classList.remove('active');
        });
        span.classList.add('active');
      };

      slider.appendChild(field);
    }
    const styles = `
      input {
        visibility: hidden;
      }
      .fields {
        display: flex;
        flex-direction: column;
      }
      .field {
        margin-top: 8px;
      }
      span {
        position: relative;
      }
      span::before {
        content: ' ';
        position: absolute;
        width: 58px;
        height: 3px;
        background: var(--slider-check-color);
        left: -20px;
        top: 10px;
      }
      span.active::before  {
        background: var(--slider-bg-color);
      }
      span.active::after {
        transition: 0.3s;
        left: 20px;
      }
      span::after {
        content: ' ';
        position: absolute;
        width: 21px;
        height: 21px;
        background: var(--slider-check-color);
        border-radius: 50%;
        border: 1px solid var(--slider-border-color);
        left: -21px;
        transition: 0.3s;
        cursor: pointer;
      }
      ::slotted([slot^="slider"]) {
        margin-left: 50px;
      }
    `;

    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(slider);
    shadow.appendChild(style);
  }

}
customElements.define('custom-slider', Slider);