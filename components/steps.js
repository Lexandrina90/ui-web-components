class Steps extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const steps = document.createElement('div');
    steps.classList.add('steps');
    const count = 3;
    for (let i = 1; i<=count; i++) {
      const step = document.createElement('div');
      step.classList.add('step');
      
      const icon = document.createElement('i');
      icon.classList.add('icon');
      step.appendChild(icon);

      const slotIcon = document.createElement('slot');
      slotIcon.name = `icon-${i}`;
      icon.appendChild (slotIcon);

      const content = document.createElement('div');
      content.classList.add('content');
      

      const slotTitle = document.createElement('slot');
      slotTitle.name = `title-${i}`;
      content.appendChild(slotTitle);

      const slotDescription = document.createElement('slot');
      slotDescription.name = `description-${i}`;
      content.appendChild(slotDescription);

      const firstStep = steps.querySelector('.step');
        if (firstStep) {
          firstStep.classList.add('active');
        }
      
        step.onclick = () => {
          const activeStep = shadow.querySelectorAll('.step.active');
          activeStep.forEach((activeStep) => {
          activeStep.classList.remove('active');
        });
        step.classList.add('active');
        }

      step.appendChild(content);
      steps.appendChild(step);
    }

    const styles = `
      .steps {
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
      .step {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--toggle-bg-color);
        padding: 12px;
        padding-left: 25px;
        position: relative;
      }
      .step:first-child {
        border-radius: 8px 0px 0px 8px;
        border-right: none;
      }
      .step:last-child {
        border-radius: 0px 8px 8px 0px;
        border-left: none;
      }
      .step:not(:last-child)::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: medium none;
        top: 50%;
        right:0;
        z-index: 2;
        background: #fff;
        transform: translateY(-50%) translateX(53%) rotate(-45deg);
        border-right: 1px solid var(--toggle-bg-color);
        border-bottom: 1px solid var(--toggle-bg-color);
      }
      .content {
        margin-left: 12px;
      }
      ::slotted([slot^="title"]) {
        font-weight: bold;
      }
      .step.active {
        background: var(--steps-active-bg);
      }
      .step.active::after {
        background: var(--steps-active-bg);
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(steps);
    shadow.appendChild(style);
  }
}  
customElements.define('custom-steps', Steps);