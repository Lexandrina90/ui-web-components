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

      step.appendChild(content);
      steps.appendChild(step);
    }

    const styles = ``;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(steps);
    shadow.appendChild(style);
  }
}  
customElements.define('custom-steps', Steps);